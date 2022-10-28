export function gidToId(gid) {
  return gid.split('/').pop();
}

export function idToGid(id, resource = 'DeliveryCustomization') {
  return `gid://shopify/${resource}/${id}`;
}
