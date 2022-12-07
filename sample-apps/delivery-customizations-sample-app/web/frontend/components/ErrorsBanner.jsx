import React from "react";

import { Banner, List } from "@shopify/polaris";

export function ErrorsBanner({ userErrors }) {
  return userErrors ? (
    <Banner
      title="There are errors with saving the customization:"
      status="warning"
    >
      <List>
        {userErrors.map((error) => (
          <List.Item key={error.code}>{error.message}</List.Item>
        ))}
      </List>
    </Banner>
  ) : null;
}
