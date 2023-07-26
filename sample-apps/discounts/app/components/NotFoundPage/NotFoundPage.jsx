import { Card, EmptyState, Page } from "@shopify/polaris";
import notFoundImage from "./empty-state.svg";

export function NotFoundPage() {
  return (
    <Page>
      <Card>
        <EmptyState
          heading="There is no page at this address"
          image={notFoundImage}
        >
          <p>
            Check the URL and try again, or use the search bar to find what you
            need.
          </p>
        </EmptyState>
      </Card>
    </Page>
  );
}
