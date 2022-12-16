import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Card, Layout } from "@shopify/polaris";

import {
  CustomizationForm,
  CustomizationPageLayout,
  ErrorsBanner,
} from "../../../components";
import {
  useCustomizationForm,
  useCreateDeliveryCustomization,
} from "../../../hooks";

import { userErrorBannerTitle } from "../../../utilities/helpers";

export default function NewDeliveryCustomizationPage() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const [errorBanner, setErrorBanner] = useState(null);

  const { functionId } = useParams();

  const {
    handleInputChange,
    setData,
    data: formData,
  } = useCustomizationForm({ functionId, title: "Hide" });

  const { mutateAsync: createCustomization, isLoading } =
    useCreateDeliveryCustomization();

  const handleSubmit = async () => {
    if (isLoading) return;
    setErrorBanner(null);

    try {
      const data = await createCustomization({ payload: formData });
      if (data?.userErrors.length > 0) {
        setErrorBanner({
          status: "warning",
          title: userErrorBannerTitle(data.userErrors),
          errors: data.userErrors,
        });
      } else {
        redirect.dispatch(Redirect.Action.ADMIN_PATH, {
          path: "/settings/shipping/customizations",
        });
      }
    } catch (error) {
      setErrorBanner({
        status: "critical",
        title: "Something went wrong. Please try again.",
        errors: [error],
      });
    }
  };

  const primaryAction = {
    disabled: isLoading,
    onAction: handleSubmit,
  };

  return (
    <CustomizationPageLayout
      title="Hide Delivery Option"
      loading={isLoading}
      actionProps={primaryAction}
      subtitle="Any delivery option matching this name exactly will be hidden."
    >
      {errorBanner && (
        <Layout.Section>
          <ErrorsBanner {...errorBanner} />
        </Layout.Section>
      )}
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
