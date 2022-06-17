import { TextField } from '@shopify/polaris';

export default function ShippingDiscount({
  configuration,
  onConfigurationChange,
}) {
  const handleValueChange = (value) => {
    onConfigurationChange({
      ...configuration,
      value: parseFloat(value),
    });
  };

  return (
    <TextField
      label="Percentage off"
      value={configuration.value}
      onChange={handleValueChange}
      type="number"
    />
  );
}

export const DEFAULT_CONFIGURATION = {
  value: 0,
};
