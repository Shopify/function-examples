import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { useCallback } from 'react';

export function useRedirectToDiscounts() {
  const app = useAppBridge();

  return useCallback(() => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.ADMIN_SECTION, {
      name: Redirect.ResourceType.Discount,
    });
  }, [app]);
}
