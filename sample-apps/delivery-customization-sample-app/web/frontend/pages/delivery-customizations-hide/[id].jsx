import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationForm, CustomizationPageLayout } from "../../components";
import {
  useCustomizationForm,
  useDeliveryCustomization,
  useUpdateDelivertyCustomization,
} from "../../hooks";

export default function DeliveryCustomizationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleInputChange, setData, data: formData } = useCustomizationForm();

  const { data, isFetching } = useDeliveryCustomization({
    id,
  });

  const { mutateAsync: updateCustomization, isLoading } =
    useUpdateDelivertyCustomization({
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

    const { cartSubtotalThreshhold, shippingMethod, exactMatch, enabled } =
      data;

    setData({
      cartSubtotalThreshhold,
      shippingMethod,
      exactMatch,
      enabled,
    });
  }, [data]);

  const primaryAction = {
    disabled,
    onAction: handleSubmit,
  };

  return (
    <CustomizationPageLayout loading={isLoading} actionProps={primaryAction}>
      <CustomizationForm
        {...formData}
        loading={disabled}
        disabled={disabled}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        activeStatus={data?.enabled}
      />
    </CustomizationPageLayout>
  );
}
