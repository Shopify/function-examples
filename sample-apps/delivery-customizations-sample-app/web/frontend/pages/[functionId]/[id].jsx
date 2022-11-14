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
  const { id, functionId } = useParams();
  const { handleInputChange, setData, data: formData } = useCustomizationForm();

  const { data, isFetching } = useDeliveryCustomization({
    id,
  });

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

    const { shippingMethodName, enabled, title } = data;

    setData({
      shippingMethodName,
      enabled,
      title,
      functionId,
    });
  }, [data]);

  const primaryAction = {
    disabled,
    onAction: handleSubmit,
  };

  if (!isFetching && data?.id == null) {
    return <NotFound />;
  }

  console.log(formData);

  return (
    <CustomizationPageLayout
      title={data?.title || ""}
      loading={isLoading}
      actionProps={primaryAction}
    >
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
