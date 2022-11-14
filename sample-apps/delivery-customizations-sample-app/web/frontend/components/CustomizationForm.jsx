import { Form, FormLayout, TextField, Button, Badge } from "@shopify/polaris";

export function CustomizationForm({
  shippingMethodName,
  enabled,
  isNewCustomization = false,
  onSubmit,
  onInputChange,
  loading,
  disabled,
  activeStatus,
  ...props
}) {
  const handleSubmit = () => {
    if (onSubmit) onSubmit({ shippingMethodName, enabled, operationType });
  };

  const handleInputChange = (value, name) => {
    if (onInputChange) onInputChange({ value, name });
  };

  return (
    <Form onSubmit={handleSubmit} {...props}>
      <FormLayout>
        <FormLayout.Group>
          {activeStatus || isNewCustomization ? (
            <Badge status="success">Active</Badge>
          ) : (
            <Badge>Inactive</Badge>
          )}
        </FormLayout.Group>
        <FormLayout.Group>
          <TextField
            type="text"
            label="Delivery Method Name"
            helpText={"Will match the delivery method name exactly."}
            autoComplete="off"
            value={shippingMethodName}
            onChange={(value) => handleInputChange(value, "shippingMethodName")}
            disabled={disabled}
            requiredIndicator
          />
        </FormLayout.Group>
        <Button submit primary loading={loading}>
          Save Customization
        </Button>
      </FormLayout>
    </Form>
  );
}
