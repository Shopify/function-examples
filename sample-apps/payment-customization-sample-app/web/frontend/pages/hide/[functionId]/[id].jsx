import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Layout, Card } from "@shopify/polaris";

import {
  CustomizationPageLayout,
  CustomizationForm,
  ErrorsBanner,
} from "../../../components";
import {
  useCustomizationForm,
  usePaymentCustomization,
  useUpdatePaymentCustomization,
} from "../../../hooks";

export default function PaymentCustomizationDetailPage() {
  const navigate = useNavigate();
  const { id, functionId } = useParams();
  const [userErrors, setUserErrors] = useState(null);

  const { data, isFetching } = usePaymentCustomization({
    id,
  });

  const {
    handleInputChange,
    setData,
    data: formData,
    hasChanged,
  } = useCustomizationForm({
    cartSubtotal: data?.cartSubtotal,
    paymentMethod: data?.paymentMethod,
  });

  const { mutateAsync: updateCustomization, isLoading } =
    useUpdatePaymentCustomization({
      id,
    });

  const disabled = isFetching || isLoading;

  const handleSubmit = async () => {
    if (disabled) return;

    try {
      const data = await updateCustomization({ payload: formData });
      if (data?.userErrors?.length > 0) {
        setUserErrors(data.userErrors);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!data) return;

    const { cartSubtotal, paymentMethod, title } = data;

    setData({
      cartSubtotal,
      paymentMethod,
      functionId,
      title,
    });
  }, [data]);

  const primaryAction = {
    disabled: disabled || !hasChanged,
    onAction: handleSubmit,
  };

  return (
    <CustomizationPageLayout loading={isLoading} actionProps={primaryAction}>
      <Layout.Section>
        <ErrorsBanner userErrors={userErrors} />
      </Layout.Section>
      <Layout.Section>
        <Card>
          <Card.Section>
            <CustomizationForm
              {...formData}
              loading={disabled}
              disabled={disabled}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              hasChanged={hasChanged}
            />
          </Card.Section>
        </Card>
      </Layout.Section>
    </CustomizationPageLayout>
  );
}
