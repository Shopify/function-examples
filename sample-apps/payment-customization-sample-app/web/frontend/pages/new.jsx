import { useEffect } from "react";
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationForm, CustomizationPageLayout } from "../components";
import { useCreatePaymentCustomization, useCustomizationForm } from "../hooks";

export default function NewCustomizationPage() {
  const navigate = useNavigate();

  const {
    handleInputChange,
    hasChanged,
    setData,
    data: formData,
  } = useCustomizationForm();

  const { mutateAsync: createCustomization, isLoading } =
    useCreatePaymentCustomization();

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
    disabled: !hasChanged || isLoading,
    onAction: handleSubmit,
  };

  useEffect(() => {
    setData({
      cartSubtotal: 10,
      paymentMethod: "Credit card",
    });
  }, []);

  return (
    <CustomizationPageLayout loading={isLoading} actionProps={primaryAction}>
      <CustomizationForm
        {...formData}
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />
    </CustomizationPageLayout>
  );
}
