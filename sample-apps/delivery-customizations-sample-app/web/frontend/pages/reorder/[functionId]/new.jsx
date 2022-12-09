import { useState, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useParams } from "react-router-dom";
import { Layout, Card } from "@shopify/polaris";

import {
  CustomizationForm,
  CustomizationPageLayout,
  ErrorsBanner,
} from "../../../components";
import {
  useCustomizationForm,
  useCreateDeliveryCustomization,
} from "../../../hooks";

export default function NewDeliveryCustomizationPage() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const { functionId } = useParams();

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
        redirect.dispatch(Redirect.Action.ADMIN_PATH, {
          path: "/settings/shipping/customizations",
        });
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
      functionId,
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
      <Layout.Section>
        <ErrorsBanner userErrors={userErrors} />
      </Layout.Section>
      <Layout.Section>
        <Card>
          <Card.Section>
            <CustomizationForm
              {...formData}
              isNewCustomization={true}
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
