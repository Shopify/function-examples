import { useEffect } from "react";
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationForm, CustomizationPageLayout } from "../../components";
import {
  useCustomizationForm,
  useCreateDeliveryCustomization,
} from "../../hooks";

export default function NewDeliveryCustomizationPage() {
  const navigate = useNavigate();

  const { handleInputChange, setData, data: formData } = useCustomizationForm();

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
      deliveryOptionName: "Express",
      operation: "Rename",
    });
  }, []);

  return (
    <CustomizationPageLayout
      title="Rename delivery option"
      loading={isLoading}
      actionProps={primaryAction}
      subtitle="Any delivery option matching this name exactly will have 'renamed' appended to it"
    >
      <CustomizationForm
        {...formData}
        isNewCustomization={true}
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />
    </CustomizationPageLayout>
  );
}
