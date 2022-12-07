import { useState, useEffect } from "react";
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationForm, CustomizationPageLayout } from "../../components";
import {
  useCustomizationForm,
  useCreateDeliveryCustomization,
} from "../../hooks";

export default function NewDeliveryCustomizationPage() {
  const navigate = useNavigate();

  const { handleInputChange, setData, data: formData } = useCustomizationForm();

  const [userErrors, setUserErrors] = useState(null);

  const { mutateAsync: createCustomization, isLoading } =
    useCreateDeliveryCustomization();

  const handleSubmit = async () => {
    if (isLoading) return;
    try {
      const data = await createCustomization({ payload: formData });
      if (data?.userErrors.length > 0) {
        setUserErrors(data.userErrors);
      } else {
        navigate("/");
      }
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
      operation: "Reorder",
    });
  }, []);

  return (
    <CustomizationPageLayout
      title="Reorder delivery option"
      loading={isLoading}
      actionProps={primaryAction}
      subtitle="Any delivery option matching this name exactly will be moved to the last position."
      userErrors={userErrors}
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
