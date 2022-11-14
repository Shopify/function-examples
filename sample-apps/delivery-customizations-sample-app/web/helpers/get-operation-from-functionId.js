const [SHOPIFY_HIDE_BY_TITLE_ID, SHOPIFY_RENAME_BY_TITLE_ID, SHOPIFY_MOVE_TO_LAST_BY_TITLE_ID ] = 
  ["01GHM0JQQ8MWEJRXE081TK0FH0", "01GHM0JSS7VNHFA65VZFTYVXAF", "01GHM0JVRQN906C45B7XJH75QQ"]

export function getOperationTypeFromFunctionId(functionId){
  switch(functionId) {
    case SHOPIFY_HIDE_BY_TITLE_ID:
      return "Hide";
    case SHOPIFY_RENAME_BY_TITLE_ID:
      return "Rename";
    case SHOPIFY_MOVE_TO_LAST_BY_TITLE_ID:
      return "Move"
  }
}
