import {
  Card,
  Heading,
  Layout,
  Link,
  Page,
  TextContainer,
} from '@shopify/polaris';
import { useRedirectToDiscounts } from '../hooks/useRedirectToDiscounts';

export default function HomePage() {
  const redirectToDiscounts = useRedirectToDiscounts();

  return (
    <Page title="Hello world! 🎉">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            Welcome to the <b>Discount Functions Sample App</b>! To get started,
            create a discount from the{' '}
            <Link onClick={redirectToDiscounts} external>
              Discounts page
            </Link>
            .
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
