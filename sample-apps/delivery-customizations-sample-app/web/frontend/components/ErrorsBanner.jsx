import React from "react";

import { Banner, List } from "@shopify/polaris";

export function ErrorsBanner({ title, status, errors }) {
  return errors.length > 0 ? (
    <Banner title={title} status={status}>
      <List>
        {errors.map((error, index) => (
          <List.Item key={index}>{error.message}</List.Item>
        ))}
      </List>
    </Banner>
  ) : null;
}
