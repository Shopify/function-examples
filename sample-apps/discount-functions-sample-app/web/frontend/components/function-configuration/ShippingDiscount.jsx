import { TextField } from '@shopify/polaris';

export default function ShippingDiscount({
  configuration,
  onConfigurationChange,
}) {
  const handleValueChange = (value) => {
    onConfigurationChange({
      ...configuration,
      value,
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

export function serializeDiscount(discount) {
  return {
    title: discount.title,
    configuration: JSON.stringify(discount.configuration),
    startsAt: new Date(),
  };
}
