export function gidToId(gid: string): string {
  return gid.split('/').pop();
}

export function idToGid(resource: string, id: string): string {
  return `gid://shopify/${resource}/${id}`;
}
