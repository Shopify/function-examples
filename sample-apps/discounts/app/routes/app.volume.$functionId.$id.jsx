import { useEffect, useState } from "react";
import { useForm, useField } from "@shopify/react-form";

import {
  Banner,
  LegacyCard,
  Layout,
  Page,
  PageActions,
  TextField,
  VerticalStack,
} from "@shopify/polaris";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";

import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import {
  ActiveDatesCard,
  CombinationCard,
  DiscountClass,
  DiscountMethod,
  MethodCard,
  DiscountStatus,
  RequirementType,
  SummaryCard,
  UsageLimitsCard,
  onBreadcrumbAction,
} from "@shopify/discount-app-components";

import shopify from "../shopify.server";
import { CurrencyCode } from "@shopify/react-i18n";

// This is a server-side action that is invoked when the form is submitted.
// It makes an admin GraphQL request to create or update a discount.
export const action = async ({ params, request }) => {
  const { functionId, id } = params;
  const { admin } = await shopify.authenticate.admin(request);
  const formData = await request.formData();
  const {
    title,
    method,
    code,
    combinesWith,
    usageLimit,
    appliesOncePerCustomer,
    startsAt,
    endsAt,
    configuration,
  } = JSON.parse(formData.get("discount"));

  const baseDiscount = {
    functionId,
    title,
    combinesWith,
    startsAt: new Date(startsAt),
    endsAt: endsAt && new Date(endsAt),
  };

  if (method === DiscountMethod.Code) {
    const baseCodeDiscount = {
      ...baseDiscount,
      title: code,
      code,
      usageLimit,
      appliesOncePerCustomer,
    };

    // If the ID is `new`, then we are creating a new discount.
    if (id === "new") {
      const response = await admin.graphql(
        `#graphql
          mutation CreateCodeDiscount($discount: DiscountCodeAppInput!) {
            discountCreate: discountCodeAppCreate(codeAppDiscount: $discount) {
              userErrors {
                code
                message
                field
              }
            }
          }`,
        {
          variables: {
            discount: {
              ...baseCodeDiscount,
              metafields: [
                {
                  namespace: "$app:volume-discount",
                  key: "function-configuration",
                  type: "json",
                  value: JSON.stringify({
                    quantity: configuration.quantity,
                    percentage: configuration.percentage,
                  }),
                },
              ],
            },
          },
        }
      );

      const responseJson = await response.json();
      const errors = responseJson.data.discountCreate?.userErrors;
      return json({ errors });
    } else {
      const response = await admin.graphql(
        `#graphql
          mutation UpdateCodeDiscount($id: ID!, $discount: DiscountCodeAppInput!) {
            discountUpdate: discountCodeAppUpdate(id: $id, codeAppDiscount: $discount) {
              userErrors {
                code
                message
                field
              }
            }
          }`,
        {
          variables: {
            discount: {
              ...baseCodeDiscount,
              metafields: [
                {
                  id: configuration.id,
                  value: JSON.stringify({
                    quantity: configuration.quantity,
                    percentage: configuration.percentage,
                  }),
                },
              ],
            },
            id: `gid://shopify/DiscountCodeApp/${id}`,
          },
        }
      );

      const responseJson = await response.json();
      const errors = responseJson.data.discountUpdate?.userErrors;
      return json({ errors });
    }
  } else {
    if (id === "new") {
      const response = await admin.graphql(
        `#graphql
          mutation CreateAutomaticDiscount($discount: DiscountAutomaticAppInput!) {
            discountCreate: discountAutomaticAppCreate(automaticAppDiscount: $discount) {
              userErrors {
                code
                message
                field
              }
            }
          }`,
        {
          variables: {
            discount: {
              ...baseDiscount,
              metafields: [
                {
                  namespace: "$app:volume-discount",
                  key: "function-configuration",
                  type: "json",
                  value: JSON.stringify({
                    quantity: configuration.quantity,
                    percentage: configuration.percentage,
                  }),
                },
              ],
            },
          },
        }
      );

      const responseJson = await response.json();
      const errors = responseJson.data.discountCreate?.userErrors;
      return json({ errors });
    } else {
      const response = await admin.graphql(
        `#graphql
          mutation UpdateAutomaticDiscount($id: ID!, $discount: DiscountAutomaticAppInput!) {
            discountUpdate: discountAutomaticAppUpdate(id: $id, automaticAppDiscount: $discount) {
              userErrors {
                code
                message
                field
              }
            }
          }`,
        {
          variables: {
            discount: {
              ...baseDiscount,
              metafields: [
                {
                  id: configuration.id,
                  value: JSON.stringify({
                    quantity: configuration.quantity,
                    percentage: configuration.percentage,
                  }),
                },
              ],
            },
            id: `gid://shopify/DiscountAutomaticApp/${id}`,
          },
        }
      );

      const responseJson = await response.json();
      const errors = responseJson.data.discountUpdate?.userErrors;
      return json({ errors });
    }
  }
};

export const loader = async ({ params, request }) => {
  const { id } = params;
  const { admin } = await shopify.authenticate.admin(request);

  if (id === "new") {
    return json({
      discount: {
        title: "",
        method: DiscountMethod.Code,
        code: "",
        combinesWith: {
          orderDiscounts: false,
          productDiscounts: false,
          shippingDiscounts: false,
        },
        usageLimit: null,
        appliesOncePerCustomer: false,
        startsAt: new Date(),
        endsAt: null,
        configuration: {
          quantity: 0,
          percentage: 0,
        },
      },
    });
  }

  const response = await admin.graphql(
    `#graphql
      query GetDiscount($id: ID!) {
        discountNode(id: $id) {
          id
          configurationField: metafield(
            namespace: "$app:volume-discount"
            key: "function-configuration"
          ) {
            id
            value
          }
          discount {
            __typename
            ... on DiscountAutomaticApp {
              title
              discountClass
              combinesWith {
                orderDiscounts
                productDiscounts
                shippingDiscounts
              }
              startsAt
              endsAt
            }
            ... on DiscountCodeApp {
              title
              discountClass
              combinesWith {
                orderDiscounts
                productDiscounts
                shippingDiscounts
              }
              startsAt
              endsAt
              usageLimit
              appliesOncePerCustomer
              codes(first: 1) {
                nodes {
                  code
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        id: `gid://shopify/DiscountNode/${id}`,
      },
    }
  );

  const responseJson = await response.json();

  if (
    !responseJson.data.discountNode ||
    !responseJson.data.discountNode.discount
  ) {
    return json({ discount: null });
  }

  const method =
    responseJson.data.discountNode.discount.__typename === "DiscountCodeApp"
      ? DiscountMethod.Code
      : DiscountMethod.Automatic;
  const {
    title,
    codes,
    combinesWith,
    usageLimit,
    appliesOncePerCustomer,
    startsAt,
    endsAt,
  } = responseJson.data.discountNode.discount;
  const configuration = JSON.parse(
    responseJson.data.discountNode.configurationField.value
  );

  const discount = {
    title,
    method,
    code: codes?.nodes[0]?.code ?? "",
    combinesWith,
    usageLimit: usageLimit ?? null,
    appliesOncePerCustomer: appliesOncePerCustomer ?? false,
    startsAt: startsAt,
    endsAt: endsAt,
    configuration: {
      ...configuration,
      id: responseJson.data.discountNode.configurationField.id,
    },
  };

  return json({ discount });
};

export default function VolumeNew() {
  const submitForm = useSubmit();
  const actionData = useActionData();
  const { discount } = useLoaderData();
  const navigation = useNavigation();

  const isLoading = navigation.state === "submitting";
  const currencyCode = CurrencyCode.Cad;
  const submitErrors = actionData?.errors || [];
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  useEffect(() => {
    if (actionData?.errors.length === 0) {
      redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
        name: Redirect.ResourceType.Discount,
      });
    }
  }, [actionData]);

  if (!discount) {
    // TODO
    return <div>Not found</div>;
  }

  const metafieldId = discount.configuration?.id;
  const {
    fields: {
      discountTitle,
      discountCode,
      discountMethod,
      combinesWith,
      requirementType,
      requirementSubtotal,
      requirementQuantity,
      usageLimit,
      appliesOncePerCustomer,
      startDate,
      endDate,
      configuration,
    },
    submit,
  } = useForm({
    fields: {
      discountTitle: useField(discount.title ?? ""),
      discountMethod: useField(discount.method),
      discountCode: useField(discount.code ?? ""),
      combinesWith: useField(discount.combinesWith),
      requirementType: useField(RequirementType.None),
      requirementSubtotal: useField("0"),
      requirementQuantity: useField("0"),
      usageLimit: useField(discount.usageLimit),
      appliesOncePerCustomer: useField(discount.appliesOncePerCustomer),
      startDate: useField(new Date(discount.startsAt)),
      endDate: useField(discount.endsAt && new Date(discount.endsAt)),
      configuration: {
        // Add quantity and percentage configuration to form data
        quantity: useField(discount.configuration.quantity),
        percentage: useField(discount.configuration.percentage),
      },
    },
    onSubmit: async (form) => {
      const discount = {
        title: form.discountTitle,
        method: form.discountMethod,
        code: form.discountCode,
        combinesWith: form.combinesWith,
        usageLimit: form.usageLimit == null ? null : parseInt(form.usageLimit),
        appliesOncePerCustomer: form.appliesOncePerCustomer,
        startsAt: form.startDate,
        endsAt: form.endDate,
        configuration: {
          id: metafieldId,
          quantity: parseInt(form.configuration.quantity),
          percentage: parseFloat(form.configuration.percentage),
        },
      };

      submitForm({ discount: JSON.stringify(discount) }, { method: "post" });

      return { status: "success" };
    },
  });

  const errorBanner =
    submitErrors.length > 0 ? (
      <Layout.Section>
        <Banner status="critical">
          <p>There were some issues with your form submission:</p>
          <ul>
            {submitErrors.map(({ message, field }, index) => {
              return (
                <li key={`${message}${index}`}>
                  {field.join(".")} {message}
                </li>
              );
            })}
          </ul>
        </Banner>
      </Layout.Section>
    ) : null;

  return (
    // Render a discount form using Polaris components and the discount app components
    <Page
      title="Create volume discount"
      backAction={{
        content: "Discounts",
        onAction: () => onBreadcrumbAction(redirect, true),
      }}
      primaryAction={{
        content: "Save",
        onAction: submit,
        loading: isLoading,
      }}
    >
      <Layout>
        {errorBanner}
        <Layout.Section>
          <Form method="post">
            <VerticalStack align="space-around" gap="2">
              <MethodCard
                title="Volume"
                discountTitle={discountTitle}
                discountClass={DiscountClass.Product}
                discountCode={discountCode}
                discountMethod={discountMethod}
              />
              {/* Collect data for the configuration metafield. */}
              <LegacyCard title="Volume" sectioned>
                <TextField
                  label="Minimum quantity"
                  autoComplete="on"
                  {...configuration.quantity}
                />
                <TextField
                  label="Discount percentage"
                  autoComplete="on"
                  {...configuration.percentage}
                  suffix="%"
                />
              </LegacyCard>
              {discountMethod.value === DiscountMethod.Code && (
                <UsageLimitsCard
                  totalUsageLimit={usageLimit}
                  oncePerCustomer={appliesOncePerCustomer}
                />
              )}
              <CombinationCard
                combinableDiscountTypes={combinesWith}
                discountClass={DiscountClass.Product}
                discountDescriptor={"Discount"}
              />
              <ActiveDatesCard
                startDate={startDate}
                endDate={endDate}
                timezoneAbbreviation="EST"
              />
            </VerticalStack>
          </Form>
        </Layout.Section>
        <Layout.Section secondary>
          <SummaryCard
            header={{
              discountMethod: discountMethod.value,
              discountDescriptor:
                discountMethod.value === DiscountMethod.Automatic
                  ? discountTitle.value
                  : discountCode.value,
              appDiscountType: "Volume",
              isEditing: false,
            }}
            performance={{
              status: DiscountStatus.Scheduled,
              usageCount: 0,
              isEditing: false,
            }}
            minimumRequirements={{
              requirementType: requirementType.value,
              subtotal: requirementSubtotal.value,
              quantity: requirementQuantity.value,
              currencyCode: currencyCode,
            }}
            usageLimits={{
              oncePerCustomer: appliesOncePerCustomer.value,
              totalUsageLimit: usageLimit.value,
            }}
            activeDates={{
              startDate: startDate.value,
              endDate: endDate.value,
            }}
          />
        </Layout.Section>
        <Layout.Section>
          <PageActions
            primaryAction={{
              content: "Save discount",
              onAction: submit,
              loading: isLoading,
            }}
            secondaryActions={[
              {
                content: "Discard",
                onAction: () => onBreadcrumbAction(redirect, true),
              },
            ]}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
