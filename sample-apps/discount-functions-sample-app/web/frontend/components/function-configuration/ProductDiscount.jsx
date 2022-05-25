import { useState, useMemo } from 'react';
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
import VariantList from '../VariantList';

export default function ProductDiscount({
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

  const { excludedVariantIds, excludedVariantIdsMarkup } = useMemo(() => {
    if (!configuration.excludedVariantIds.length) {
      return {
        excludedVariantIds: [],
        excludedVariantIdsMarkup: (
          <TextStyle variation="subdued">None</TextStyle>
        ),
      };
    }

    const excludedVariantIds = configuration.excludedVariantIds.map((id) => ({
      id,
    }));
    const excludedVariantIdsMarkup = (
      <VariantList ids={configuration.excludedVariantIds} />
    );

    return { excludedVariantIds, excludedVariantIdsMarkup };
  }, [configuration.excludedVariantIds]);

  const resourcePickerMarkup = showVariantPicker && (
    <ResourcePicker
      resourceType="ProductVariant"
      initialSelectionIds={excludedVariantIds}
      onSelection={handleVariantPickerSelection}
      onCancel={() => setShowVariantPicker(false)}
      allowMultiple
      open
    />
  );

  return (
    <>
      {resourcePickerMarkup}
      <Stack vertical>
        <TextField
          label="Percentage off"
          value={configuration.value}
          onChange={handleValueChange}
          type="number"
          min={0}
          max={100}
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
