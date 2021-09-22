import {run, ShippingMethods} from '@shopify/scripts-checkout-apis';
import {shippingMethodsHandler} from './script';

// eslint-disable-next-line @shopify/assemblyscript/camelcase
export function shopify_main(): void {
  ShippingMethods.registerShippingMethodsHandler(shippingMethodsHandler);
  run();
}
