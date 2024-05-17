{%- if flavor contains "vanilla-js" -%}
// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const configuration = JSON.parse(
    input?.fulfillmentConstraintRule?.metafield?.value ?? "{}"
  );

  return NO_CHANGES;
};
{%- elsif flavor contains "typescript" -%}
import type {
  RunInput,
  FunctionRunResult,
} from "../generated/api";

const NO_CHANGES: FunctionRunResult = {
  operations: [],
};

type Configuration = {};

export function run(input: RunInput): FunctionRunResult {
  const configuration: Configuration = JSON.parse(
    input?.fulfillmentConstraintRule?.metafield?.value ?? "{}"
  );
  return NO_CHANGES;
};
{%- endif -%}