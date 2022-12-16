export function userErrorBannerTitle(userErrors) {
  const changesContent =
    userErrors.length === 1
      ? "1 change needs"
      : `${userErrors.length} changes need`;
  return `To save this customization, ${changesContent} to be made:`;
}
