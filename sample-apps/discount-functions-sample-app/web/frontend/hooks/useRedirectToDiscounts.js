import { useAppBridge } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { useCallback } from 'react';

const APP_DISCOUNTS_PATH = '/discounts/apps';

export function useRedirectToDiscounts() {
  const app = useAppBridge();

  return useCallback(() => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.ADMIN_PATH, APP_DISCOUNTS_PATH);
  }, [app]);
}
