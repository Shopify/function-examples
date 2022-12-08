import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Layout, Card } from "@shopify/polaris";

import NotFound from "../../NotFound";

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

export default function DeliveryCustomizationDetailPage() {
  const navigate = useNavigate();
  const { id, functionId } = useParams();

  const [userErrors, setUserErrors] = useState(null);

  const { data, isFetching } = useDeliveryCustomization({
    id,
  });

  const {
    handleInputChange,
    setData,
    data: formData,
    hasChanged,
  } = useCustomizationForm({ deliveryOptionName: data?.value });

  const { mutateAsync: updateCustomization, isLoading } =
    useUpdateDeliveryCustomization({
      id,
    });

  const disabled = isFetching || isLoading;

  const handleSubmit = async () => {
    if (disabled) return;

    try {
      const data = await updateCustomization({ payload: formData });
      if (data?.userErrors) {
        setUserErrors(data.userErrors);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!data) return;

    const { value: deliveryOptionName, enabled, title, operation } = data;

    setData({
      deliveryOptionName,
      enabled,
      title,
      operation: "Reorder",
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
      title="Reorder delivery option"
      loading={isLoading}
      actionProps={primaryAction}
      isEditing={true}
      subtitle="Any delivery option matching this name exactly will be moved to the last position."
      userErrors={userErrors}
    >
      <Layout.Section>
        <ErrorsBanner userErrors={userErrors} />
      </Layout.Section>
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
