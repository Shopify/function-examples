import React from "react";

import { Banner, List } from "@shopify/polaris";

export function ErrorsBanner({ userErrors }) {
  const titleContent = `To save this customization, ${
    userErrors?.length > 1 ? `${userErrors.length} changes` : "1 change"
  } needs to be made"`;

  return userErrors ? (
    <Banner title={titleContent} status="warning">
      <List>
        {userErrors.map((error) => (
          <List.Item key={error.code}>{error.message}</List.Item>
        ))}
      </List>
    </Banner>
  ) : null;
}
