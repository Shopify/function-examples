import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, useField } from "@shopify/react-form";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  ActiveDatesCard,
  CombinationCard,
  DiscountClass,
  DiscountMethod,
  MethodCard,
  UsageLimitsCard,
  onBreadcrumbAction,
} from "@shopify/discount-app-components";
import {
  Banner,
  Card,
  Layout,
  Modal,
  Page,
  PageActions,
  Stack,
  Spinner,
  TextField,
  TextContainer,
} from "@shopify/polaris";

import {
  useUpdateDiscount,
  useDeleteDiscount,
  useDiscount,
} from "../../hooks/";

const METAFIELD_NAMESPACE = "discounts-tutorial";
const METAFIELD_CONFIGURATION_KEY = "volume-config";

export default function VolumeNew() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const { id } = useParams();
  const { discount, isLoading } = useDiscount(id);
  const [updateDiscount, { isLoading: updateInProgress }] = useUpdateDiscount(
    discount?.method
  );
  const [deleteDiscount, { isLoading: deleteInProgress }] = useDeleteDiscount(
    discount?.method
  );
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [successActive, setSuccessActive] = useState(false);
  const [errors, setErrors] = useState([]);

  const {
    fields: {
      discountTitle,
      discountCode,
      discountMethod,
      combinesWith,
      usageLimit,
      appliesOncePerCustomer,
      startsAt,
      endsAt,
      configuration,
    },
    submit,
    submitting,
    dirty,
  } = useForm({
    fields: {
      discountTitle: useField(discount.title || ""),
      discountMethod: useField(
        discount.method === "Automatic"
          ? DiscountMethod.Automatic
          : DiscountMethod.Code
      ),
      discountCode: useField(discount.code || ""),
      combinesWith: useField(discount.combinesWith || {}),
      usageLimit: useField(discount.usageLimit),
      appliesOncePerCustomer: useField(discount.appliesOncePerCustomer),
      startsAt: useField(discount.startsAt || null),
      endsAt: useField(discount.endsAt || null),
      configuration: {
        quantity: useField(discount.configuration?.quantity || 1),
        percentage: useField(discount.configuration?.percentage || 0),
      },
    },
    onSubmit: async (form) => {
      const newDiscount = {
        combinesWith: form.combinesWith,
        startsAt: form.startsAt,
        endsAt: form.endsAt,
        metafields: [
          {
            id: discount.configurationId, // metafield id is required for update
            namespace: METAFIELD_NAMESPACE,
            key: METAFIELD_CONFIGURATION_KEY,
            type: "json",
            value: JSON.stringify({
              quantity: parseInt(form.configuration.quantity),
              percentage: parseFloat(form.configuration.percentage),
            }),
          },
        ],
      };

      if (form.discountMethod === DiscountMethod.Code) {
        newDiscount.usageLimit = parseInt(form.usageLimit);
        newDiscount.appliesOncePerCustomer = form.appliesOncePerCustomer;
        newDiscount.code = form.code;
        newDiscount.title = form.discountCode;
        newDiscount.code = form.discountCode;
      } else newDiscount.title = form.discountTitle;

      try {
        await updateDiscount({ id, discount: newDiscount });

        setSuccessActive(true);

        return { status: "success" };
      } catch (err) {
        setErrors(err);

        return { status: "fail" };
      }
    },
  });

  const isUpdateInProgress =
    isLoading || submitting || updateInProgress || deleteInProgress;

  const isSaveDisabled = isUpdateInProgress || !dirty;

  const handleDeleteDiscount = async () => {
    if (isUpdateInProgress) return;

    try {
      await deleteDiscount({ id });

      onBreadcrumbAction(redirect, true);
    } catch (err) {
      setErrors(err);
    }
  };

  const toggleSuccessActive = () =>
    setSuccessActive((successActive) => !successActive);

  const toggleDeleteModalActive = () =>
    setDeleteModalActive((deleteModalActive) => !deleteModalActive);

  const successBanner = successActive ? (
    <Layout.Section>
      <Banner
        title="Discount saved"
        status="success"
        onDismiss={toggleSuccessActive}
      />
    </Layout.Section>
  ) : null;

  const errorBanner =
    errors.length > 0 ? (
      <Layout.Section>
        <Banner status="critical">
          <p>There were some issues with your form submission:</p>
          <ul>
            {errors.map(({ message, field }, index) => {
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
    <Page
      title="Edit volume discount"
      breadcrumbs={[
        {
          content: "Discounts",
          onAction: () => onBreadcrumbAction(redirect, true),
        },
      ]}
      primaryAction={{
        content: "Save",
        onAction: submit,
        loading: isUpdateInProgress,
        disabled: isSaveDisabled,
      }}
    >
      {isLoading && (
        <Layout>
          <Stack distribution="center">
            <Spinner size="large" />
          </Stack>
        </Layout>
      )}

      {!isLoading && (
        <>
          <Layout>
            {errorBanner}
            {successBanner}

            <Layout.Section>
              <form onSubmit={submit}>
                <MethodCard
                  title="Volume"
                  discountTitle={discountTitle}
                  discountClass={DiscountClass.Product}
                  discountCode={discountCode}
                  discountMethod={discountMethod}
                />
                <Card title="Volume">
                  <Card.Section>
                    <Stack>
                      <TextField
                        label="Minimum quantity"
                        {...configuration.quantity}
                      />
                      <TextField
                        label="Discount percentage"
                        {...configuration.percentage}
                        suffix="%"
                      />
                    </Stack>
                  </Card.Section>
                </Card>

                {discountMethod.value === DiscountMethod.Code && (
                  <UsageLimitsCard
                    totalUsageLimit={usageLimit}
                    oncePerCustomer={appliesOncePerCustomer}
                  />
                )}

                <CombinationCard
                  combinableDiscountTypes={combinesWith}
                  discountClass={DiscountClass.Product}
                  discountDescriptor={
                    discountMethod.value === DiscountMethod.Automatic
                      ? discountTitle.value
                      : discountCode.value
                  }
                />

                <ActiveDatesCard
                  startDate={startsAt}
                  endDate={endsAt}
                  timezoneAbbreviation="EST"
                />
              </form>
            </Layout.Section>

            <Layout.Section>
              <PageActions
                primaryAction={{
                  content: "Save discount",
                  onAction: submit,
                  disabled: isSaveDisabled,
                  loading: submitting,
                }}
                secondaryActions={[
                  {
                    content: "Delete",
                    destructive: true,
                    onAction: toggleDeleteModalActive,
                  },
                ]}
              />
            </Layout.Section>
          </Layout>

          <Modal
            small
            open={deleteModalActive}
            onClose={toggleDeleteModalActive}
            title="Delete discount"
            primaryAction={{
              content: "Delete",
              destructive: true,
              onAction: handleDeleteDiscount,
              loding: isUpdateInProgress,
            }}
            secondaryActions={[
              {
                content: "Cancel",
                onAction: toggleDeleteModalActive,
              },
            ]}
          >
            <Modal.Section>
              <TextContainer>
                <p>Are you sure you want to delete this discount?</p>
              </TextContainer>
            </Modal.Section>
          </Modal>
        </>
      )}
    </Page>
  );
}
