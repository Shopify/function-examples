import { Link, List, SkeletonDisplayText } from '@shopify/polaris';
import { gql } from 'graphql-request';
import { useRedirectToVariant } from '../hooks/useRedirectToVariant';
import { useShopifyQuery } from '../hooks/useShopifyQuery';

const VARIANT_QUERY = gql`
  query Variant($id: ID!) {
    productVariant(id: $id) {
      displayName
      product {
        id
      }
    }
  }
`;

export default function VariantList({ ids }) {
  return (
    <List>
      {ids.map((id) => (
        <List.Item key={id}>
          <VariantListItem id={id} />
        </List.Item>
      ))}
    </List>
  );
}

function VariantListItem({ id }) {
  const { data, isLoading, isError } = useShopifyQuery({
    key: ['Variant', id],
    query: VARIANT_QUERY,
    variables: { id },
  });

  const redirectToVariant = useRedirectToVariant(
    data?.data.productVariant.product.id,
    id,
  );

  if (isLoading) {
    return <SkeletonDisplayText size="small" />;
  }

  if (isError || !data) {
    return id;
  }

  const { displayName } = data.data.productVariant;

  return (
    <>
      <Link onClick={redirectToVariant}>{displayName}</Link>
    </>
  );
}
