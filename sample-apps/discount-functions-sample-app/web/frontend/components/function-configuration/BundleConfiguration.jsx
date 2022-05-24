import { useState } from 'react';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { Button, Stack, TextContainer, TextField } from '@shopify/polaris';

export default function Details({ configuration, onConfigurationChange }) {
  const [showResourcePicker, setShowResourcePicker] = useState(false);

  const handleMessageChange = (message) => {
    onConfigurationChange({ ...configuration, message });
  };

  const handlePercentageChange = (discountPercentage) => {
    onConfigurationChange({
      ...configuration,
      discountPercentage: Number(discountPercentage),
    });
  };

  const handleMinimumQuantityChange = (minimumQuantity) => {
    onConfigurationChange({
      ...configuration,
      minimumQuantity: Math.floor(Number(minimumQuantity)),
    });
  };

  const handleResourcePickerSelection = ({ selection }) => {
    const variantId = selection.length ? selection[0].id : '';

    onConfigurationChange({
      ...configuration,
      variantId,
    });
    setShowResourcePicker(false);
  };

  const handleResourcePickerCancel = () => {
    setShowResourcePicker(false);
  };

  const handlePickerButtonClick = () => {
    setShowResourcePicker(true);
  };

  const selectedVariants = configuration.variantId
    ? [{ id: configuration.variantId }]
    : [];

  return (
    <>
      <ResourcePicker
        resourceType="ProductVariant"
        open={showResourcePicker}
        onCancel={handleResourcePickerCancel}
        onSelection={handleResourcePickerSelection}
        selectMultiple={1}
        allowMultiple={false}
        initialSelectionIds={selectedVariants}
      />
      <Stack vertical>
        <TextField
          label="Discount message"
          autoComplete="on"
          value={configuration.message}
          onChange={handleMessageChange}
        />

        <TextField
          label="Discount percentage"
          autoComplete="on"
          value={configuration.discountPercentage.toString()}
          onChange={handlePercentageChange}
          type="number"
        />

        <TextField
          label="Minimum quantity"
          autoComplete="on"
          value={configuration.minimumQuantity.toString()}
          onChange={handleMinimumQuantityChange}
          type="number"
        />

        <Stack spacing="extraTight" vertical>
          <TextContainer>
            Selected variant ID: {configuration.variantId}
          </TextContainer>
          <Button onClick={handlePickerButtonClick}>Select variant</Button>
        </Stack>
      </Stack>
    </>
  );
}

export function serializeDiscount(discount) {
  return {
    title: discount.title,
    configuration: JSON.stringify({
      message: discount.configuration.message,
      variantId: discount.configuration.variantId,
      discountPercentage: discount.configuration.discountPercentage.toString(),
      minimumQuantity: discount.configuration.minimumQuantity.toString(),
    }),
    startsAt: new Date(),
  };
}

export const DEFAULT_CONFIGURATION = {
  message: '',
  discountPercentage: 0,
  minimumQuantity: 0,
  variantId: '',
};

export function configurationsAreEqual(left, right) {
  return (
    left.message === right.message &&
    left.discountPercentage === right.discountPercentage &&
    left.minimumQuantity === right.minimumQuantity &&
    left.variantId === right.variantId
  );
}
