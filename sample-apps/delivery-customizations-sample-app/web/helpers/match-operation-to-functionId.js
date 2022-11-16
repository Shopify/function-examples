import { join } from "path";
import { readFileSync } from "fs";
import dotenv from "dotenv";

const { SHOPIFY_HIDE_BY_TITLE_ID, SHOPIFY_RENAME_BY_TITLE_ID, SHOPIFY_MOVE_TO_LAST_BY_TITLE_ID } = dotenv.parse(
  readFileSync(join(process.cwd(), "../", ".env"), "utf8")
);

export function matchOperationToFunctionId(operation) {
  switch (operation) {
    case "Hide":
      return SHOPIFY_HIDE_BY_TITLE_ID;
    case "Rename":
      return SHOPIFY_RENAME_BY_TITLE_ID;
    case "Reorder":
      return SHOPIFY_MOVE_TO_LAST_BY_TITLE_ID;
  }
}
