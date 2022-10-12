import { Form, FormLayout, TextField, Button } from "@shopify/polaris";

export function CustomizationForm({
  cartSubtotal,
  paymentMethod,
  onSubmit,
  onInputChange,
  loading,
  disabled,
  ...props
}) {
  const handleSubmit = () => {
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

        <Button submit primary loading={loading}>Save Customization</Button>
      </FormLayout>
    </Form>
  );
}
