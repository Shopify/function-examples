import { useEffect } from "react";
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationForm, CustomizationPageLayout } from "../components";
import { useAppMutation, useCustomizationForm } from "../hooks";

export default function NewCustomizationPage() {
  const navigate = useNavigate();
  const { handleInputChange, hasChanged, setData, data: formData } = useCustomizationForm();
  const { mutateAsync: createCustomization, isLoading } = useAppMutation({
    url: "/api/payment-customizations",
    reactQueryOptions: {
      mutationKey: "createCustomization",
    },
  });

  const handleSubmit = async () => {
    if (isLoading) return

    try {
      await createCustomization({ payload: formData });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setData({
      cartSubtotal: 10,
      paymentMethod: "Credit card",
    })
  }, [])

  return (
    <CustomizationPageLayout
      loading={isLoading}
      actionProps={{ disabled: !hasChanged || isLoading }}
    >
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
