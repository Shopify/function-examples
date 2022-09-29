import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationPageLayout, CustomizationForm } from '../components';
import { useCustomizationForm, useAppQuery, useAppMutation } from '../hooks';

export default function PaymentCustomizationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleInputChange, setData, data: formData } = useCustomizationForm();

  const {
    data,
    isFetching,
  } = useAppQuery({
    url: `/api/payment-customizations/${id}`,
  });

  const { mutateAsync: updateCustomization, isLoading } = useAppMutation({
    url: `/api/payment-customizations/${id}`,
    fetchOptions: {
      method: "PUT",
    },
    reactQueryOptions: {
      mutationKey: "createCustomization",
    },
  });

  const handleSubmit = async () => {
    if (isLoading) return

    try {
      await updateCustomization({ payload: formData });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!data) return

    const { cartSubtotal, paymentMethod} = data

    setData({
      cartSubtotal,
      paymentMethod
    })
  }, [data])

  const disabled = isFetching || isLoading;

  return (
    <CustomizationPageLayout loading={isLoading} actionProps={{ disabled }}>
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
