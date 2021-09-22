import {ShippingMethods, Configuration, Console} from '@shopify/scripts-checkout-apis';

export function shippingMethodsHandler(
  input: ShippingMethods.Input,
  configuration: Configuration, // eslint-disable-line @shopify/assemblyscript/no-unused-vars
): ShippingMethods.Result {
  // Use `Console.log` to print output from your script.
  Console.log('Hello, world');

  const sortResponse = new ShippingMethods.SortResponse(input.shippingMethods);
  const filterResponse = new ShippingMethods.FilterResponse([]);
  const renameResponse = new ShippingMethods.RenameResponse([]);

  return new ShippingMethods.Result(sortResponse, filterResponse, renameResponse);
}
