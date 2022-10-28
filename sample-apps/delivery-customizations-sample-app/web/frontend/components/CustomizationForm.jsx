import { useState, useCallback } from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Checkbox,
  Badge,
  Stack,
  RadioButton,
} from "@shopify/polaris";

export function CustomizationForm({
  shippingMethodName,
  enabled,
  operationType,
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
    if (onSubmit) onSubmit({ shippingMethodName, enabled, operationType });
  };

  const handleInputChange = (value, name) => {
    if (onInputChange) onInputChange({ value, name });
  };

  const newCustomizationPage = location.pathname.includes("new");

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
        {newCustomizationPage && (
          <FormLayout.Group>
            <Stack vertical>
              <RadioButton
                label="Hide"
                helpText="Hide a Delivery Customization"
                checked={operationType === "HIDE"}
                id="rename"
                name="operationType"
                onChange={() => handleInputChange("HIDE", "operationType")}
              />
              <RadioButton
                label="Move"
                helpText="Move a delivery method customization."
                id="move"
                name="operationType"
                checked={operationType === "MOVE"}
                onChange={() => handleInputChange("MOVE", "operationType")}
              />
              <RadioButton
                label="Rename"
                helpText="Rename a delivery method customization."
                id="rename"
                name="operationType"
                checked={operationType === "RENAME"}
                onChange={() => handleInputChange("RENAME", "operationType")}
              />
            </Stack>
          </FormLayout.Group>
        )}
        <FormLayout.Group>
          <TextField
            type="text"
            label="Title"
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
