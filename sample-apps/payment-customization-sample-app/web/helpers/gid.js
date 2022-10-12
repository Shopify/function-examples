export function gidToId(gid) {
  return gid.split('/').pop();
}

export function idToGid(id, resource = 'PaymentCustomization') {
  return `gid://shopify/${resource}/${id}`;
}
