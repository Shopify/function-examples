import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Layout, Card } from "@shopify/polaris";

import { NotFound } from "../../../components";

import {
  CustomizationForm,
  CustomizationPageLayout,
  ErrorsBanner,
} from "../../../components";
import {
  useCustomizationForm,
  useDeliveryCustomization,
  useUpdateDeliveryCustomization,
} from "../../../hooks";

import { userErrorBannerTitle } from "../../../utilities/helpers";

export default function DeliveryCustomizationDetailPage() {
  const navigate = useNavigate();
  const { functionId, id } = useParams();
  const [errorBanner, setErrorBanner] = useState(null);

  const { data, isFetching } = useDeliveryCustomization({
    id,
  });

  const {
    handleInputChange,
    setData,
    data: formData,
    hasChanged,
  } = useCustomizationForm({ functionId, title: "Hide" });

  const { mutateAsync: updateCustomization, isLoading } =
    useUpdateDeliveryCustomization({
      id,
    });

  const disabled = isFetching || isLoading;

  const handleSubmit = async () => {
    if (disabled) return;
    setErrorBanner(null);

    try {
      const data = await updateCustomization({ payload: formData });
      if (data?.userErrors) {
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

    const { value: deliveryOptionName, enabled, title } = data;

    setData({
      deliveryOptionName,
      enabled,
      title,
      functionId,
    });
  }, [data]);

  const primaryAction = {
    disabled: disabled || !hasChanged,
    onAction: handleSubmit,
  };

  if (!isFetching && data?.id == null) {
    return <NotFound />;
  }

  return (
    <CustomizationPageLayout
      title="Hide Delivery Option"
      loading={isLoading}
      actionProps={primaryAction}
      isEditing={true}
      subtitle="Any delivery option matching this name exactly will be hidden."
    >
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
            />
          </Card.Section>
        </Card>
      </Layout.Section>
    </CustomizationPageLayout>
  );
}
