// @ts-check
import { Decimal } from "decimal.js";

// Define error messages for when discount limits are reached
const TOTAL_DISCOUNTS_CAP_REACHED =
  "Maximum discount limit reached for this cart";
const SINGLE_DISCOUNT_CAP_REACHED =
  "Maximum discount limit reached for this discount";

// Function to get the index of the target line in the cart
function getTargetLineIndex(target) {
  return parseInt(target.cartLineId.slice(-1));
}

// Function to calculate the current price of the target line in the cart
function calculateCurrentTargetPrice(inputCartLines, target) {
  const targetLineIndex = getTargetLineIndex(target);
  const targetLine = inputCartLines[targetLineIndex];
  return targetLine.cost.amountPerQuantity.amount * target.quantity;
}

export function run(input) {
  // Initialize total discount cap and total discount
  let totalDiscountsCap = parseFloat(input.shop.metafield?.value ?? "-1");
  let totalDiscount = 0.0;

  // Initialize all lines output discounts and displayable errors
  let allLinesOutputDiscounts = input.cart.lines.map((line) => ({
    cartLineId: line.id,
    quantity: line.quantity,
    allocations: [],
  }));
  let displayableErrors = [];

  // Iterate over each discount
  for (const discount of input.discounts) {
    // Initialize current discount cap and current discount total
    let currentDiscountCap = parseFloat(discount.metafield?.value ?? "-1");
    let currentDiscountTotal = 0.0;

    // Iterate over each discount proposal
    for (const proposal of discount.discountProposals) {
      // Calculate total price of all targets
      const totalTargetsPrice = proposal.targets.reduce((total, target) => {
        return total + calculateCurrentTargetPrice(input.cart.lines, target);
      }, 0);

      // Iterate over each target
      for (const target of proposal.targets) {
        // Calculate current target price and ratio
        const currentTargetPrice = calculateCurrentTargetPrice(
          input.cart.lines,
          target
        );
        const currentTargetRatio = currentTargetPrice / totalTargetsPrice;

        let lineDiscountAmount = 0.0;
        // Calculate line discount amount based on the type of the discount
        if (proposal.value.__typename == "FixedAmount") {
          if (proposal.value.appliesToEachItem) {
            lineDiscountAmount = proposal.value.amount * target.quantity;
          } else {
            lineDiscountAmount = proposal.value.amount * currentTargetRatio;
          }
        } else if (proposal.value.__typename == "Percentage") {
          lineDiscountAmount =
            (proposal.value.value / 100.0) *
            totalTargetsPrice *
            currentTargetRatio;
        }

        // Check if the discount cap is reached for the current discount
        if (
          currentDiscountCap >= 0.0 &&
          currentDiscountTotal + lineDiscountAmount > currentDiscountCap
        ) {
          lineDiscountAmount = currentDiscountCap - currentDiscountTotal;
          displayableErrors.push({
            discountId: discount.id.toString(),
            reason: SINGLE_DISCOUNT_CAP_REACHED,
          });
        }

        // Check if the discount cap is reached for the total discount
        if (
          totalDiscountsCap >= 0.0 &&
          totalDiscount + lineDiscountAmount > totalDiscountsCap
        ) {
          lineDiscountAmount = totalDiscountsCap - totalDiscount;
          displayableErrors.push({
            discountId: discount.id.toString(),
            reason: TOTAL_DISCOUNTS_CAP_REACHED,
          });
        }

        // Skip if the line discount amount is zero
        if (lineDiscountAmount === 0.0) {
          continue;
        }

        // Update total discount and current discount total
        totalDiscount += lineDiscountAmount;
        currentDiscountTotal += lineDiscountAmount;

        // Add the discount to the target line
        const targetLineIndex = getTargetLineIndex(target);
        const targetAllocation = {
          discountProposalId: proposal.handle,
          amount: new Decimal(lineDiscountAmount),
        };
        allLinesOutputDiscounts[targetLineIndex].allocations.push(
          targetAllocation
        );
      }
    }
  }

  // Filter out lines without any discounts
  const lineDiscounts = allLinesOutputDiscounts.filter(
    (outputDiscount) => outputDiscount.allocations.length > 0
  );

  // Prepare the output
  const output = {
    lineDiscounts,
    displayableErrors,
  };

  // Return the output
  return output;
}
