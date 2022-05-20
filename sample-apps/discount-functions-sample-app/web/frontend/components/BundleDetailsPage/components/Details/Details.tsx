import { useState } from 'react';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { Button, Stack, TextContainer, TextField } from '@shopify/polaris';

import { Configuration } from '../../types';

interface Props {
  configuration: Configuration;
  onConfigurationChange: (configuration: Configuration) => void;
}

export default function Details({
  configuration,
  onConfigurationChange,
}: Props) {
  const [showResourcePicker, setShowResourcePicker] = useState(false);

  const handleMessageChange = (message: string) => {
    onConfigurationChange({ ...configuration, message });
  };

  const handlePercentageChange = (discountPercentage: string) => {
    onConfigurationChange({
      ...configuration,
      discountPercentage: Number(discountPercentage),
    });
  };

  const handleMinimumQuantityChange = (minimumQuantity: string) => {
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
