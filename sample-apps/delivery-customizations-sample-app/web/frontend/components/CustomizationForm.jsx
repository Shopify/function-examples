import { Form, FormLayout, TextField, Button, Badge } from "@shopify/polaris";

export function CustomizationForm({
  deliveryOptionName,
  enabled,
  operation,
  isNewCustomization = false,
  onSubmit,
  onInputChange,
  loading,
  disabled,
  hasChanged,
  ...props
}) {
  const handleSubmit = () => {
    if (onSubmit) onSubmit({ deliveryOptionName, enabled, operation });
  };

  const handleInputChange = (value, name) => {
    if (onInputChange) onInputChange({ value, name });
  };

  return (
    <Form onSubmit={handleSubmit} {...props}>
      <FormLayout>
        <FormLayout.Group>
          {enabled || isNewCustomization ? (
            <Badge status="success">Active</Badge>
          ) : (
            <Badge>Inactive</Badge>
          )}
        </FormLayout.Group>
        <FormLayout.Group>
          <TextField
            type="text"
            label="Delivery Option Name"
            autoComplete="off"
            value={deliveryOptionName}
            onChange={(value) => handleInputChange(value, "deliveryOptionName")}
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
