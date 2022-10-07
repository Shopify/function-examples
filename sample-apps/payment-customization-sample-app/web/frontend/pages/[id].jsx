import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationPageLayout, CustomizationForm } from '../components';
import {
  useCustomizationForm,
  usePaymentCustomization,
  useUpdatePaymentCustomization,
} from "../hooks";

export default function PaymentCustomizationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleInputChange, setData, data: formData } = useCustomizationForm();

  const { data, isFetching } = usePaymentCustomization({
    id,
  });

  const { mutateAsync: updateCustomization, isLoading } =
    useUpdatePaymentCustomization({
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

    const { cartSubtotal, paymentMethod } = data;

    setData({
      cartSubtotal,
      paymentMethod,
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
      />
    </CustomizationPageLayout>
  );
}
