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

const METAFIELD_DELIMITER = "___";

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  let operations = [];

  let cartExpandFromMetafieldLine = (lineItem) => {
    if (lineItem.merchandise.__typename === "ProductVariant") {
      const init = []

      const values = lineItem.merchandise.expandedBundleMetafield?.value?.split(",") ?? []

      const expandedCartItems = values
        .reduce((acc, current) => {
          const [merchandiseId, quantity] = current.split(METAFIELD_DELIMITER)
          if (!merchandiseId || !quantity) {
            return acc;
          }
          return [...acc, { merchandiseId, quantity: Number(quantity) }]
        },
        init
      )

      if (values.length > 0 && values.length === expandedCartItems.length) {
        return { cartLineId: lineItem.id, expandedCartItems }
      }

      return null;
    }
  };

  input.cart.lines.forEach((line) => {
    const expandOperation = cartExpandFromMetafieldLine(line);

    if (expandOperation) {
      operations.push({expand: expandOperation});
    }
  });

  return { operations };
};
