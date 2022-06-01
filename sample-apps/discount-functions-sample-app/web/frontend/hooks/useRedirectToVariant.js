import { useCallback } from 'react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';

import { gidToId } from '../utilities/gid';

export function useRedirectToVariant(productId, variantId) {
  const app = useAppBridge();

  return useCallback(() => {
    if (!productId || !variantId) {
      return;
    }

    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
      name: Redirect.ResourceType.Product,
      resource: {
        id: gidToId(productId),
        variant: { id: gidToId(variantId) },
      },
    });
  }, [productId, variantId, app]);
}
