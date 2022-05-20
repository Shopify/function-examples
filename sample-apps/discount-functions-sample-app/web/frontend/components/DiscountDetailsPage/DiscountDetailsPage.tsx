import {
  Page,
  Card,
  TextField,
  PageActions,
  Spinner,
  Stack,
} from '@shopify/polaris';

import { Discount } from '../../types';
import { useDeleteDiscount } from '../../hooks/useDeleteDiscount';
import { useDiscount } from '../../hooks/useDiscount';
import { useRedirectToDiscounts } from '../../hooks/useRedirectToDiscounts';
import { useSavedDiscount } from '../../hooks/useSavedDiscount';
import { useUpdateDiscount } from '../../hooks/useUpdateDiscount';

interface Props<Configuration> {
  id: string;
  defaultConfiguration: Configuration;
  configurationsAreEqual: (
    left: Configuration,
    right: Configuration,
  ) => boolean;
  serializeDiscount: (discount: Discount<Configuration>) => Discount<string>;
  renderConfigurationForm(
    configuration: Configuration,
    onConfigurationChange: (configuration: Configuration) => void,
  );
}

export default function DiscountDetailsPage<Configuration>({
  id,
  configurationsAreEqual,
  defaultConfiguration,
  renderConfigurationForm,
  serializeDiscount,
}: Props<Configuration>) {
  const redirectToDiscounts = useRedirectToDiscounts();
  const {
    discount: savedDiscount,
    isLoading,
    isError,
  } = useSavedDiscount<Configuration>(id);
  const {
    discount,
    isDirty,
    title,
    setTitle,
    configuration,
    setConfiguration,
  } = useDiscount({
    savedDiscount,
    configurationsAreEqual,
    defaultConfiguration,
  });

  const [updateDiscount, { isLoading: updateInProgress }] = useUpdateDiscount();
  const [deleteDiscount, { isLoading: deleteInProgress }] = useDeleteDiscount();
  const mutationInProgress = updateInProgress || deleteInProgress;

  if (isLoading) {
    return (
      <Stack distribution="center">
        <Spinner size="large" />
      </Stack>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Page title="Details" breadcrumbs={[{ onAction: redirectToDiscounts }]}>
      <Card>
        <Card.Section>
          <TextField
            value={title}
            onChange={setTitle}
            label="Discount title"
            autoComplete="on"
          />
        </Card.Section>
        <Card.Section>
          {renderConfigurationForm(configuration, setConfiguration)}
        </Card.Section>
      </Card>
      <PageActions
        primaryAction={{
          content: 'Save',
          onAction: () => updateDiscount(id, serializeDiscount(discount)),
          loading: mutationInProgress,
          disabled: !isDirty,
        }}
        secondaryActions={[
          {
            content: 'Delete',
            destructive: true,
            loading: mutationInProgress,
            onAction: async () => {
              await deleteDiscount(id);
              redirectToDiscounts();
            },
          },
        ]}
      />
    </Page>
  );
}
