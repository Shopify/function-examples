export function gidToId(gid) {
  return gid.split("/").pop();
}

export function idToGid(id, resource = "DiscountAutomaticApp") {
  return `gid://shopify/${resource}/${id}`;
}
