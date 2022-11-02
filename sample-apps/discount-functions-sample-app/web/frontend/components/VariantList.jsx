import { Link, List, SkeletonDisplayText } from "@shopify/polaris";

import { gidToId } from "../../helpers/gid";
import { useAppQuery, useRedirectToVariant } from "../hooks";

function useVariant({ id }) {
  const result = useAppQuery({
    url: `/api/product-variant/${id}`,
  });

  return result;
}

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
  const {
    data,
    isFetching: isLoading,
    isError,
  } = useVariant({
    id: gidToId(id),
  });

  const redirectToVariant = useRedirectToVariant(data?.product.id, id);

  if (isLoading) return <SkeletonDisplayText size="small" />;

  if (isError || !data) return id;

  return <Link onClick={redirectToVariant}>{data.displayName}</Link>;
}
