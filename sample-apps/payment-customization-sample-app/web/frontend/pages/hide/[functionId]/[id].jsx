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

    const { cartSubtotal, paymentMethod } = data;

    setData({
      cartSubtotal,
      paymentMethod,
      functionId,
      title: "HIDE",
    });
  }, [data]);

  const primaryAction = {
    disabled,
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
              loading={isLoading}
              disabled={isLoading}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
            />
          </Card.Section>
        </Card>
      </Layout.Section>
    </CustomizationPageLayout>
  );
}
