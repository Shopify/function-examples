import {
  Form,
  FormLayout,
  TextField,
  Button,
  Checkbox,
  Badge,
} from "@shopify/polaris";

export function CustomizationForm({
  exactMatch,
  cartSubtotalThreshhold,
  shippingMethod,
  enabled,
  // Form Data Above
  isNewCustomization = false,
  onSubmit,
  onInputChange,
  loading,
  disabled,
  activeStatus,
  ...props
}) {
  const handleSubmit = () => {
    if (onSubmit)
      onSubmit({ exactMatch, cartSubtotalThreshhold, shippingMethod, enabled });
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
            type="number"
            label="Cart Subtotal Threshold"
            autoComplete="off"
            value={cartSubtotalThreshhold}
            onChange={(value) =>
              handleInputChange(value, "cartSubtotalThreshhold")
            }
            disabled={disabled}
            requiredIndicator
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <TextField
            type="text"
            label="Shipping Method Name to Match"
            autoComplete="off"
            value={shippingMethod}
            onChange={(value) => handleInputChange(value, "shippingMethod")}
            disabled={disabled}
            requiredIndicator
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <Checkbox
            label="Exact Match"
            checked={exactMatch}
            onChange={(value) => handleInputChange(value, "exactMatch")}
          />
        </FormLayout.Group>
        <Button submit primary loading={loading}>
          Save Customization
        </Button>
      </FormLayout>
    </Form>
  );
}
