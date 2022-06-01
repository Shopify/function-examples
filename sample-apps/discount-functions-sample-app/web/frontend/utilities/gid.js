export function gidToId(gid) {
  return gid.split('/').pop();
}

export function idToGid(resource, id) {
  return `gid://shopify/${resource}/${id}`;
}
