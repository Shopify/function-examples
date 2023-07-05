// @ts-check

/*
A straightforward example of a function that expands a bundle into its component parts.
The parts of a bundle are stored in a metafield on the product parent value with a specific format,
specifying each part's quantity and variant.

The function reads the cart. Any item containing the metafield that specifies the bundle parts
will return an Expand operation containing the parts.
*/

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  const operations = input.cart.lines.reduce((acc, cartLine) => {
    const expandOperation = optionallyBuildExpandOperation(cartLine);

    if (expandOperation) {
      return [...acc, { expand: expandOperation }];
    }

    return acc;
  }, []);

  return operations.length > 0 ? { operations } : NO_CHANGES;
};

function optionallyBuildExpandOperation({ id: cartLineId, merchandise }) {
  if (merchandise.__typename === "ProductVariant") {
    const componentReferences = JSON.parse(
      merchandise.componentReferences.value
    );
    const componentQuantities = JSON.parse(
      merchandise.componentQuantities.value
    );

    if (!validateMetafields(componentReferences, componentQuantities)) {
      throw new Error("Invalid bundle composition");
    }

    const expandedCartItems = componentReferences.map(
      (merchandiseId, index) => ({
        merchandiseId: merchandiseId,
        quantity: componentQuantities[index],
      })
    );

    if (expandedCartItems.length > 0) {
      return { cartLineId, expandedCartItems };
    }
  }

  return null;
}

/**
 * Returns true if component references have matching quantities and there is at least one component.
 */
function validateMetafields(componentReferences, componentQuantities) {
  return (
    componentReferences.length !== componentQuantities.length &&
    componentReferences.length > 0
  );
}
