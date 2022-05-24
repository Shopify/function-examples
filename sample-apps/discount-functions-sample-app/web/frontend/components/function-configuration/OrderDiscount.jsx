import { useState } from 'react';
import { ResourcePicker } from '@shopify/app-bridge-react';
import {
  Stack,
  TextField,
  TextContainer,
  Button,
  List,
  TextStyle,
} from '@shopify/polaris';

import { gidToId } from '../../utilities/gid';

export default function OrderDiscount({
  configuration,
  onConfigurationChange,
}) {
  const [showVariantPicker, setShowVariantPicker] = useState(false);

  const handleValueChange = (value) => {
    onConfigurationChange({
      ...configuration,
      value,
    });
  };

  const handleVariantPickerSelection = ({ selection }) => {
    const excludedVariantIds = selection.map((item) => item.id);

    onConfigurationChange({
      ...configuration,
      excludedVariantIds,
    });

    setShowVariantPicker(false);
  };

  const excludedVariantIds = configuration.excludedVariantIds.map((id) => ({
    id,
  }));

  const excludedVariantIdsMarkup = configuration.excludedVariantIds.length ? (
    <List>
      {configuration.excludedVariantIds.map((id) => (
        <List.Item key={id}>{gidToId(id)}</List.Item>
      ))}
    </List>
  ) : (
    <TextStyle variation="subdued">None</TextStyle>
  );

  console.log(showVariantPicker);

  return (
    <>
      <ResourcePicker
        open={showVariantPicker}
        resourceType="ProductVariant"
        // initialSelectionIds={excludedVariantIds}
        onSelection={handleVariantPickerSelection}
        onCancel={() => setShowVariantPicker(false)}
        allowMultiple
      />
      <Stack vertical>
        <TextField
          label="Percentage off"
          value={configuration.value}
          onChange={handleValueChange}
          type="number"
        />
        <Stack spacing="tight" vertical>
          <TextContainer>Excluded variant IDs:</TextContainer>
          {excludedVariantIdsMarkup}
          <Button onClick={() => setShowVariantPicker(true)}>
            Select variant
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export const DEFAULT_CONFIGURATION = {
  value: 0,
  excludedVariantIds: [],
};

export function serializeDiscount(discount) {
  return {
    title: discount.title,
    configuration: JSON.stringify(discount.configuration),
    startsAt: new Date(),
  };
}
