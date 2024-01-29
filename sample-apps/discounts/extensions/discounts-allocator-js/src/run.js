import {Decimal} from 'decimal.js';

const TOTAL_DISCOUNTS_CAP_REACHED =
  'Maximum discount limit reached for this cart';
const SINGLE_DISCOUNT_CAP_REACHED =
  'Maximum discount limit reached for this discount';

function getTargetLineIndex(target) {
  return parseInt(target.cartLineId.slice(-1));
}

function calculateCurrentTargetPrice(inputCartLines, target) {
  const targetLineIndex = getTargetLineIndex(target);
  const targetLine = inputCartLines[targetLineIndex];
  return targetLine.cost.amountPerQuantity.amount * target.quantity;
}

export function run(input) {
  let totalDiscountsCap = parseFloat(input.shop.metafield?.value ?? '-1');
  let totalDiscount = 0.0;

  let allLinesOutputDiscounts = input.cart.lines.map(line => ({
    cartLineId: line.id,
    quantity: line.quantity,
    allocations: [],
  }));
  let displayableErrors = [];

  for (const discount of input.discounts) {
    let currentDiscountCap = parseFloat(discount.metafield?.value ?? '-1');
    let currentDiscountTotal = 0.0;

    for (const proposal of discount.discountProposals) {
      const totalTargetsPrice = proposal.targets.reduce((total, target) => {
        return total + calculateCurrentTargetPrice(input.cart.lines, target);
      }, 0);

      for (const target of proposal.targets) {
        const currentTargetPrice = calculateCurrentTargetPrice(
          input.cart.lines,
          target,
        );
        const currentTargetRatio = currentTargetPrice / totalTargetsPrice;

        let lineDiscountAmount = 0.0;
        if (proposal.value.__typename == 'FixedAmount') {
          if (proposal.value.appliesToEachItem) {
            lineDiscountAmount = proposal.value.amount * target.quantity;
          } else {
            lineDiscountAmount = proposal.value.amount * currentTargetRatio;
          }
        } else if (proposal.value.__typename == 'Percentage') {
          lineDiscountAmount = (proposal.value.value / 100.0) * totalTargetsPrice * currentTargetRatio;
        }

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

        if (lineDiscountAmount === 0.0) {
          continue;
        }

        totalDiscount += lineDiscountAmount;
        currentDiscountTotal += lineDiscountAmount;

        const targetLineIndex = getTargetLineIndex(target);
        const targetAllocation = {
          discountProposalId: proposal.handle,
          amount: new Decimal(lineDiscountAmount),
        };
        allLinesOutputDiscounts[targetLineIndex].allocations.push(
          targetAllocation,
        );
      }
    }
  }

  const lineDiscounts = allLinesOutputDiscounts.filter(
    outputDiscount => outputDiscount.allocations.length > 0,
  );

  const output = {
    lineDiscounts,
    displayableErrors,
  };

  return output;
}
