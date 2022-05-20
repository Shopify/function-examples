import { Page, Card, TextField, PageActions, Spinner } from '@shopify/polaris';

import { configurationsAreEqual } from '../../utilities/configurationsAreEqual';
import { DEFAULT_CONFIGURATION } from '../../consts';
import { serializeBundleDiscount } from '../../utilities/serializeBundleDiscount';
import { useDeleteDiscount } from '../../../../hooks/useDeleteDiscount';
import { useDiscount } from '../../../../hooks/useDiscount';
import { useRedirectToDiscounts } from '../../../../hooks/useRedirectToDiscounts';
import { useUpdateDiscount } from '../../../../hooks/useUpdateDiscount';
import Details from '../Details';
import styles from './UpdatePage.module.css';
import { useSavedDiscount } from '../../../../hooks/useSavedDiscount';
import { Configuration } from '../../types';

interface Props {
  id: string;
}

export default function UpdatePage({ id }: Props) {
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
    defaultConfiguration: DEFAULT_CONFIGURATION,
  });

  const [updateDiscount, { isLoading: updateInProgress }] = useUpdateDiscount();
  const [deleteDiscount, { isLoading: deleteInProgress }] = useDeleteDiscount();
  const mutationInProgress = updateInProgress || deleteInProgress;

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
      </div>
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
          <Details
            configuration={configuration}
            onConfigurationChange={setConfiguration}
          />
        </Card.Section>
      </Card>
      <PageActions
        primaryAction={{
          content: 'Save',
          onAction: () => updateDiscount(id, serializeBundleDiscount(discount)),
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
