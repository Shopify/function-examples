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
  const url = `/api/paymentCustomization/${id}`;
  return useAppQuery({ url });
}

function useUpdateCustomization() {
  const fetch = useAuthenticatedFetch();
  return async (paymentCustomization) => {
    return await fetch("/api/paymentCustomization/update", {
      method: "PUT",
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
      content: "Payment Customizations",
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
      id: formData.id,
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
          title="Hide payment method"
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
        title="Hide payment method"
        primaryAction={{
          onAction: handleSubmit,
          content: "Save",
          loading: mutationIsLoading,
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
                      value={formData?.paymentMethod}
                      onChange={(value) =>
                        handleInputChange(value, "paymentMethod")
                      }
                      disabled={mutationIsLoading}
                      requiredIndicator
                    />

                    <TextField
                      type="number"
                      label="Cart total"
                      value={formData?.cartTotal}
                      onChange={(value) =>
                        handleInputChange(value, "cartTotal")
                      }
                      disabled={mutationIsLoading}
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
