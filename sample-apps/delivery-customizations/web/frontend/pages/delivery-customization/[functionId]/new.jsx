import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Layout,
  Banner,
  Form,
  FormLayout,
  TextField,
  Card,
  Page,
  Frame,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAuthenticatedFetch } from "../../../hooks/useAuthenticatedFetch";

// A utility hook for invoking the server endpoint that you created
function useCreateCustomization() {
  const fetch = useAuthenticatedFetch();
  return async (deliveryCustomization) => {
    return await fetch("/api/deliveryCustomization/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deliveryCustomization),
    });
  };
}

// A utility hook for redirecting back to the Delivery Customizations list
function useRedirectToCustomizations() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  return () => {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path: "/settings/shipping/customizations",
    });
  };
}

export default function NewCustomizationPage() {
  // Read the function ID from the URL
  const { functionId } = useParams();

  // Utility hooks
  const createCustomization = useCreateCustomization();
  const redirect = useRedirectToCustomizations();

  // Page state management
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Store the form state on change
  const handleInputChange = (value, name) => {
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Invoke the server endpoint when the form is submitted
  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await createCustomization({
      functionId,
      ...formData,
    });
    if (response.status != 200) {
      const errorResponse = await response.json();
      console.log(
        "Error creating delivery customization: ",
        errorResponse.error
      );
    } else {
      redirect();
    }
    setIsLoading(false);
  };

  // A basic input form page created using Polaris components
  return (
    <Frame>
      <Page
        title="Add message to delivery options"
        primaryAction={{
          onAction: handleSubmit,
          content: "Save",
          loading: isLoading,
        }}
        breadcrumbs={[
          {
            content: "Delivery Customizations",
            onAction: redirect,
          },
        ]}
      >
        <Layout.Section>
          <Card>
            <Card.Section>
              <Form onSubmit={handleSubmit}>
                <FormLayout>
                  <FormLayout.Group condensed>
                    <TextField
                      type="text"
                      maxLength={2}
                      label="State/Province Code"
                      value={formData.stateProvinceCode}
                      onChange={(value) =>
                        handleInputChange(value, "stateProvinceCode")
                      }
                      disabled={isLoading}
                      requiredIndicator
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                      type="text"
                      multiline={2}
                      label="Message"
                      value={formData.message}
                      onChange={(value) => handleInputChange(value, "message")}
                      disabled={isLoading}
                      requiredIndicator
                    />
                  </FormLayout.Group>
                </FormLayout>
              </Form>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Page>
    </Frame>
  );
}
