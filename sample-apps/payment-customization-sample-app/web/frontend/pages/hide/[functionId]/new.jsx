import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Layout, Card } from "@shopify/polaris";

import {
  CustomizationForm,
  CustomizationPageLayout,
  ErrorsBanner,
} from "../../../components";
import {
  useCreatePaymentCustomization,
  useCustomizationForm,
} from "../../../hooks";

export default function NewCustomizationPage() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const [userErrors, setUserErrors] = useState(null);

  const { functionId } = useParams();

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
      const data = await createCustomization({ payload: formData });
      if (data?.userErrors.length > 0) {
        setUserErrors(data.userErrors);
      } else {
        redirect.dispatch(Redirect.Action.ADMIN_PATH, {
          path: "/settings/payments/customizations",
        });
      }
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
      functionId,
      title: "HIDE",
    });
  }, []);

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
              isNewCustomization={true}
            />
          </Card.Section>
        </Card>
      </Layout.Section>
    </CustomizationPageLayout>
  );
}
