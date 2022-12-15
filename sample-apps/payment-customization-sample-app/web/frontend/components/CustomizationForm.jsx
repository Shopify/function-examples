import { Form, FormLayout, TextField, Button } from "@shopify/polaris";
import { userErrorBannerTitle } from "../utilities/helpers";

export function CustomizationForm({
  cartSubtotal,
  paymentMethod,
  onSubmit,
  onInputChange,
  loading,
  disabled,
  hasChanged,
  isNewCustomization = false,
  setErrorBanner,
  ...props
}) {
  const handleSubmit = () => {
    setErrorBanner(null);
    let validationErrors = [];

    if (cartSubtotal < 0) {
      validationErrors.push({
        message: "Cart subtotal cannot be less than 0",
      });
    }

    if (paymentMethod == "") {
      validationErrors.push({
        message: "Payment method is required",
      });
    }

    if (validationErrors.length > 0) {
      setErrorBanner({
        status: "warning",
        title: userErrorBannerTitle(validationErrors),
        errors: validationErrors,
      });
      return;
    }

    if (onSubmit) onSubmit({ cartSubtotal, paymentMethod });
  };

  const handleInputChange = (value, name) => {
    if (onInputChange) onInputChange({ value, name });
  };

  return (
    <Form onSubmit={handleSubmit} {...props}>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            type="text"
            label="Payment method"
            autoComplete="off"
            value={paymentMethod}
            onChange={(value) => handleInputChange(value, "paymentMethod")}
            disabled={disabled}
            requiredIndicator
          />

          <TextField
            type="number"
            label="Subtotal"
            autoComplete="off"
            value={cartSubtotal}
            onChange={(value) => handleInputChange(value, "cartSubtotal")}
            disabled={disabled}
            requiredIndicator
          />
        </FormLayout.Group>

        <Button
          submit
          primary
          loading={loading}
          disabled={!isNewCustomization && !hasChanged}
        >
          Save Customization
        </Button>
      </FormLayout>
    </Form>
  );
}
