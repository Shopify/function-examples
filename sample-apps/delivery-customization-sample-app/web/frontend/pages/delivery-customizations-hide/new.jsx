import { useEffect } from "react";
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationForm, CustomizationPageLayout } from "../../components";
import {
  useCustomizationForm,
  useCreateDeliveryCustomization,
} from "../../hooks";

export default function NewDeliveryCustomizationPage() {
  const navigate = useNavigate();
  const isNewCustomization = window.location.href.indexOf("new") > -1;
  console.log(isNewCustomization);

  const {
    handleInputChange,
    hasChanged,
    setData,
    data: formData,
  } = useCustomizationForm();

  const { mutateAsync: createCustomization, isLoading } =
    useCreateDeliveryCustomization();

  const handleSubmit = async () => {
    if (isLoading) return;
    try {
      await createCustomization({ payload: formData });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const primaryAction = {
    disabled: isLoading,
    onAction: handleSubmit,
  };

  useEffect(() => {
    setData({
      exactMatch: true,
      cartSubtotalThreshhold: 100,
      shippingMethod: "Express",
    });
  }, []);

  return (
    <CustomizationPageLayout loading={isLoading} actionProps={primaryAction}>
      <CustomizationForm
        {...formData}
        isNewCustomization={isNewCustomization}
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />
    </CustomizationPageLayout>
  );
}
