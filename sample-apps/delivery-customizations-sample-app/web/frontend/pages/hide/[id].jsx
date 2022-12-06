import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import NotFound from "../NotFound";

import { CustomizationForm, CustomizationPageLayout } from "../../components";
import {
  useCustomizationForm,
  useDeliveryCustomization,
  useUpdateDeliveryCustomization,
} from "../../hooks";

export default function DeliveryCustomizationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

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
      await updateCustomization({ payload: formData });
      navigate("/");
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
      operation,
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
      <CustomizationForm
        {...formData}
        loading={disabled}
        disabled={disabled}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        hasChanged={hasChanged}
      />
    </CustomizationPageLayout>
  );
}