import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Layout,
  Form,
  FormLayout,
  TextField,
  Card,
  Page,
  Frame,
  SkeletonPage,
  SkeletonBodyText,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAuthenticatedFetch } from "../../../hooks/useAuthenticatedFetch";
import { useAppQuery } from "../../../hooks/useAppQuery";

// Utility hooks for invoking the server endpoints that you created
function useCustomization(id) {
  const url = `/api/deliveryCustomization/${id}`;
  return useAppQuery({ url });
}

function useUpdateCustomization() {
  const fetch = useAuthenticatedFetch();
  return async (deliveryCustomization) => {
    return await fetch("/api/deliveryCustomization/update", {
      method: "PUT",
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
  // Read the function and customization IDs from the URL
  const { functionId, id } = useParams();

  // Fetch customization data
  const { isLoading, data: customization } = useCustomization(id);

  // Utility hooks
  const updateCustomization = useUpdateCustomization();
  const redirect = useRedirectToCustomizations();

  // Page state management
  const [mutationIsLoading, setMutationIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Page breadcrumbs [
  const breadcrumbs = [
    {
      content: "Delivery Customizations",
      onAction: redirect,
    },
  ];

  // Store the form state on change
  const handleInputChange = (value, name) => {
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Invoke the server endpoint when the form is submitted
  const handleSubmit = async () => {
    setMutationIsLoading(true);
    const response = await updateCustomization({
      functionId,
      ...formData,
    });
    if (response.status != 200) {
      const errorResponse = await response.json();
      console.log(
        "Error updating delivery customization: ",
        errorResponse.error
      );
    } else {
      redirect();
    }
    setMutationIsLoading(false);
  };

  // When the customization is loaded, set the form state
  useEffect(() => {
    setFormData(customization);
  }, [customization, setFormData]);

  if (isLoading) {
    return (
      <Frame>
        <SkeletonPage
          title="Add message to delivery options"
          breadcrumbs={breadcrumbs}
          primaryAction
        >
          <Layout.Section>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          </Layout.Section>
        </SkeletonPage>
      </Frame>
    );
  }

  // A basic input form page created using Polaris components
  return (
    <Frame>
      <Page
        title="Add message to delivery options"
        primaryAction={{
          onAction: handleSubmit,
          content: "Save",
          loading: mutationIsLoading,
        }}
        breadcrumbs={breadcrumbs}
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
                      value={formData?.stateProvinceCode}
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
                      value={formData?.message}
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
