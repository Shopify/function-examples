import { useState, useMemo } from 'react';
import { ResourcePicker } from '@shopify/app-bridge-react';
import {
  Stack,
  TextField,
  TextContainer,
  Button,
  TextStyle,
} from '@shopify/polaris';

export default function FixedProductDiscount({
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
    <>
      <Stack vertical>
        <TextField
          label="Fixed Amount off"
          value={configuration.value}
          onChange={handleValueChange}
          type="number"
          min={0}
        />
      </Stack>
    </>
  );
}

export const DEFAULT_CONFIGURATION = {
  value: 0,
};
