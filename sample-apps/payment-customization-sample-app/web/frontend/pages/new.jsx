import { CustomizationForm, CustomizationPageLayout } from "../components";
import { useAppMutation, useCustomizationForm } from "../hooks";

export default function NewCustomizationPage() {
  const { handleInputChange, hasChanged, ...data } = useCustomizationForm();
  const { mutate: createCustomization } = useAppMutation({
    url: "/api/payment-customizations",
  });

  const handleSubmit = () => {
    createCustomization(data);
  };

  return (
    <CustomizationPageLayout actionProps={{ disabled: !hasChanged }}>
      <CustomizationForm
        {...data}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />
    </CustomizationPageLayout>
  );
}
