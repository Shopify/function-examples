import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Layout,
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
  return async (paymentCustomization) => {
    return await fetch("/api/paymentCustomization/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentCustomization),
    });
  };
}

// A utility hook for redirecting back to the Payment Customizations list
function useRedirectToCustomizations() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  return () => {
    redirect.dispatch(Redirect.Action.ADMIN_PATH, {
      path: "/settings/payments/customizations",
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
      paymentMethod: formData.paymentMethod,
      cartTotal: parseFloat(formData.cartTotal),
    });
    if (response.status != 200) {
      const errorResponse = await response.json();
      console.log(
        "Error creating payment customization: ",
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
        title="Hide payment method"
        primaryAction={{
          onAction: handleSubmit,
          content: "Save",
          loading: isLoading,
        }}
        breadcrumbs={[
          {
            content: "Payment customizations",
            onAction: redirect,
          },
        ]}
      >
        <Layout.Section>
          <Card>
            <Card.Section>
              <Form onSubmit={handleSubmit}>
                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      type="text"
                      label="Payment method"
                      value={formData.paymentMethod}
                      onChange={(value) =>
                        handleInputChange(value, "paymentMethod")
                      }
                      disabled={isLoading}
                      requiredIndicator
                    />

                    <TextField
                      type="number"
                      label="Cart total"
                      value={formData.cartTotal}
                      onChange={(value) =>
                        handleInputChange(value, "cartTotal")
                      }
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
