import { useState } from "react";
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

import { userErrorBannerTitle } from "../../../utilities/helpers";

export default function NewCustomizationPage() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const [errorBanner, setErrorBanner] = useState(null);

  const { functionId } = useParams();

  const {
    handleInputChange,
    hasChanged,
    data: formData,
  } = useCustomizationForm({ functionId });

  const { mutateAsync: createCustomization, isLoading } =
    useCreatePaymentCustomization();

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
          path: "/settings/payments/customizations",
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
    disabled: !hasChanged || isLoading,
    onAction: handleSubmit,
  };

  return (
    <CustomizationPageLayout loading={isLoading} actionProps={primaryAction}>
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
              loading={isLoading}
              disabled={isLoading}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              isNewCustomization={true}
              setErrorBanner={setErrorBanner}
            />
          </Card.Section>
        </Card>
      </Layout.Section>
    </CustomizationPageLayout>
  );
}
