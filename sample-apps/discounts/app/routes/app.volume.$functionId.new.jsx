import { useEffect, useState } from "react";
import { useField } from "@shopify/react-form";

import {
  Banner,
  Card,
  Divider,
  FormLayout,
  Layout,
  Page,
  PageActions,
  TextField,
  VerticalStack,
} from "@shopify/polaris";

import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
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

// This is a server-side action that is invoked when the form is submitted.
// It makes an admin GraphQL request to create a payment customization.
export const action = async ({ params, request }) => {
  const { functionId } = params;
  const { admin } = await shopify.authenticate.admin(request);
  const formData = await request.formData();

  const discountName = formData.get("discountName");
  const discountCode = formData.get("discountCode");
  const combinesWithProductDiscounts = formData.get("combinesWithProductDiscounts");
  const combinesWithOrderDiscounts = formData.get("combinesWithOrderDiscounts");
  const combinesWithShippingDiscounts = formData.get("combinesWithShippingDiscounts");
  const usageTotalLimit = formData.get("usageTotalLimit");
  const usageOncePerCustomer = formData.get("usageOncePerCustomer");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const configuration = formData.get("configuration");

  const combinesWith = {
    orderDiscounts: combinesWithOrderDiscounts === "true",
    productDiscounts: combinesWithProductDiscounts === "true",
    shippingDiscounts: combinesWithShippingDiscounts === "true",
  };

  const discountCreationInput = {
    functionId,
    title: discountName || discountCode,
    code: discountCode,
    combinesWith,
    usageLimit: Number(usageTotalLimit),
    appliesOncePerCustomer: Number(usageOncePerCustomer),
    startsAt: startDate,
    endsAt: endDate,
    metafields: [
      {
        namespace: "$app:volume",
        key: "function-configuration",
        type: "json",
        value: JSON.stringify({
          quantity: parseInt(configuration.quantity),
          percentage: parseFloat(configuration.percentage),
        }),
      },
    ],
  };

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
        discount: discountCreationInput,
      },
    }
  );

  const responseJson = await response.json();
  const errors = responseJson.data.discountCreate?.userErrors;
  return json({ errors });
};

const useRedirectToDiscounts = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  return () => {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path: "/discounts",
    });
  };
};

export default function VolumeNew() {
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();

  const isLoading = navigation.state === "submitting";
  const redirect = useRedirectToDiscounts();
  const currencyCode = "Cad";
  const submitErrors = actionData?.errors || [];
  const [todaysDate] = useState(new Date());

  useEffect(() => {
    if (actionData?.errors.length === 0) {
      redirect();
    }
  }, [actionData?.errors, redirect]);


  const discountTitle = useField("")
  const discountMethod = useField(DiscountMethod.Code)
  const discountCode = useField("")
  const combinesWith = useField({
    orderDiscounts: false,
    productDiscounts: false,
    shippingDiscounts: false,
  })
  const requirementType = useField(RequirementType.None)
  const requirementSubtotal = useField("0")
  const requirementQuantity = useField("0")
  const usageTotalLimit = useField(null)
  const usageOncePerCustomer = useField(false)
  const startDate = useField(todaysDate)
  const endDate = useField(null)
  const configuration = { // Add quantity and percentage configuration to form data
    quantity: useField('1'),
    percentage: useField('0'),
  }

  const requestData = {
    discountName: discountTitle.value,
    discountMethod: discountMethod.value,
    discountCode: discountCode.value,
    combinesWithProductDiscounts: combinesWith.value.productDiscounts,
    combinesWithOrderDiscounts: combinesWith.value.orderDiscounts,
    combinesWithShippingDiscounts: combinesWith.value.shippingDiscounts,
    requirementType: requirementType.value,
    requirementSubtotal: requirementSubtotal.value,
    requirementQuantity: requirementQuantity.value,
    usageTotalLimit: usageTotalLimit.value,
    usageOncePerCustomer: usageOncePerCustomer.value,
    startDate: new Date(),
    endDate: null,
    configuration,
  };

  const handleSubmit = () => {
    submit(requestData, { method: "post" });
  }

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
      breadcrumbs={[
        {
          content: "Discounts",
          onAction: () => onBreadcrumbAction(redirect, true),
        },
      ]}
      primaryAction={{
        content: "Save",
        onAction: handleSubmit,
        loading: isLoading,
      }}
    >
    <Layout>
      {errorBanner}
      <Layout.Section>
        <Form method="post">
        <VerticalStack align="space-around" gap={2}>
          <MethodCard
            title="Volume"
            discountTitle={discountTitle}
            discountClass={DiscountClass.Product}
            discountCode={discountCode}
            discountMethod={discountMethod}
          />
          { /* Collect data for the configuration metafield. */ }
          <Card title="Volume">
            <TextField label="Minimum quantity" {...configuration.quantity} />
            <TextField label="Discount percentage" {...configuration.percentage} suffix="%" />
          </Card>
          {discountMethod.value === DiscountMethod.Code && (
            <UsageLimitsCard
              totalUsageLimit={usageTotalLimit}
              oncePerCustomer={usageOncePerCustomer}
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
          }}
          minimumRequirements={{
            requirementType: requirementType.value,
            subtotal: requirementSubtotal.value,
            quantity: requirementQuantity.value,
            currencyCode: currencyCode,
          }}
          usageLimits={{
            oncePerCustomer: usageOncePerCustomer.value,
            totalUsageLimit: usageTotalLimit.value,
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
            onAction: handleSubmit,
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
