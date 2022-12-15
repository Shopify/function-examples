import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Layout, Card } from "@shopify/polaris";

import {
  CustomizationPageLayout,
  CustomizationForm,
  ErrorsBanner,
} from "../../../components";
import {
  useCustomizationForm,
  usePaymentCustomization,
  useUpdatePaymentCustomization,
} from "../../../hooks";

import { userErrorBannerTitle } from "../../../utilities/helpers";

export default function PaymentCustomizationDetailPage() {
  const navigate = useNavigate();
  const { id, functionId } = useParams();
  const [errorBanner, setErrorBanner] = useState(null);

  const { data, isFetching } = usePaymentCustomization({
    id,
  });

  const {
    handleInputChange,
    setData,
    data: formData,
    hasChanged,
  } = useCustomizationForm({
    functionId,
  });

  const { mutateAsync: updateCustomization, isLoading } =
    useUpdatePaymentCustomization({
      id,
    });

  const disabled = isFetching || isLoading;

  const handleSubmit = async () => {
    if (disabled) return;
    setErrorBanner(null);

    try {
      const data = await updateCustomization({ payload: formData });
      if (data?.userErrors?.length > 0) {
        setErrorBanner({
          status: "warning",
          title: userErrorBannerTitle(data.userErrors),
          errors: data.userErrors,
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorBanner({
        status: "critical",
        title: "Something went wrong. Please try again.",
        errors: [error],
      });
    }
  };

  useEffect(() => {
    if (!data) return;

    const { cartSubtotal, paymentMethod, title } = data;

    setData({
      cartSubtotal,
      paymentMethod,
      functionId,
      title,
    });
  }, [data]);

  const primaryAction = {
    disabled: disabled || !hasChanged,
    onAction: handleSubmit,
  };

  return (
    <CustomizationPageLayout loading={isLoading} actionProps={primaryAction}>
      {errorBanner && (
        <Layout.Section>
          <ErrorsBanner {...errorBanner} />
        </Layout.Section>
      )}
      <Layout.Section>
        <Card>
          <Card.Section>
            <CustomizationForm
              {...formData}
              loading={disabled}
              disabled={disabled}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              hasChanged={hasChanged}
              setErrorBanner={setErrorBanner}
            />
          </Card.Section>
        </Card>
      </Layout.Section>
    </CustomizationPageLayout>
  );
}
