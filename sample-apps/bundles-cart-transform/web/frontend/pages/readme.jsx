import { Layout, Page, Card, Text, TextContainer, List } from '@shopify/polaris';
import React from 'react';

export default function ReadMe() {
  return (
    <Page title="Bundles Cart Transform">
      <Layout>
        <Layout.Section>
          <Card
            title="The Structure of Bundles in this Reference App"
            sectioned
          >
            <TextContainer>
              <p>
                The <i>Bundles Reference App</i> configures bundles using{' '}
                <i>metafields</i> on product variants. These metafields contain
                data that the <code>bundles-cart-transform</code> extension uses
                to determine <code>expand</code> and <code>merge</code>{' '}
                operations. These metafields include:
              </p>
              <List type="bullet">
                <List.Item>
                  <code>component_reference</code>
                </List.Item>
                <List.Item>
                  <code>component_quantities</code>
                </List.Item>
                <List.Item>
                  <code>component_parents</code>
                </List.Item>
              </List>
              <p>
                Bundles are structured at the product variant level. The bundle
                product, otherwise known as the "parent bundle product," has
                many product variants representing the different options of the
                bundle. For example, a bundle containing one small, medium or
                large shirt along with one small, medium or large pair of pants
                would have 9 options &mdash; small shirt/ small pants, small
                shirt/ medium pants, small shirt/ large pants, etc. Each of the
                product variants of the parent bundle product have{' '}
                <code>component_reference</code> and{' '}
                <code>component_quantities</code> metafields defining the
                product variants that are a part of the bundle, otherwise known
                as "child bundle products," and the respective quantity of the
                children in the bundle.
              </p>
              <p>
                Along with expanding parent bundle products into their defined
                children, the <code>bundles-cart-transform</code> extension in
                this app can also detect bundles and merge many children into a
                parent bundle product. This is done by using the{' '}
                <code>component_parents</code> metafield. Each product variant
                that belongs to a bundle will have a{' '}
                <code>component_parents</code> metafield. This metafield is a
                JSON blob that defines the parent bundle product the child
                belongs to. It contains the ID of the parent product variant,
                the <code>component_reference</code> of the bundle and the{' '}
                <code>component_quantities</code>.
              </p>
              <p>
                Below are instructions on how to configure both parent and
                children bundle products. After configuring the bundles, you can
                test out the functionality by adding the given product variants
                to a cart and then proceeding to checkout. The{' '}
                <code>cart-transform</code> function is run in checkout, so you
                will not see expand or merge functionality until you move your
                cart to checkout.
              </p>
            </TextContainer>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Create Metafield Definitions on Variants" sectioned>
            <TextContainer>
              <List type="bullet">
                <List.Item>
                  On the admin dashboard, go to your shop's settings
                </List.Item>
                <List.Item>
                  Click on <i>Custom Data</i> in the side-navbar
                  <br />
                  <strong>Note:</strong> The button may say <i>Metafields</i>{' '}
                  depending on your shop's settings
                </List.Item>
                <List.Item>
                  Under <i>Metafields</i>, click on <i>Variants</i>
                </List.Item>
              </List>

              <Text variant="headingXs" as="h4">
                Create a <code>component_reference</code> metafield defintion
              </Text>
              <List type="bullet">
                <List.Item>
                  Click <i>Add definition</i> to create a new variant metafield
                  definition
                </List.Item>
                <List.Item>
                  Name: <code>component_reference</code>
                </List.Item>
                <List.Item>
                  Namespace and key (don't change the default):{' '}
                  <code>custom.component_reference</code>
                </List.Item>
                <List.Item>
                  Description: <code>Components included in Bundle</code>
                </List.Item>
                <List.Item>
                  Select type: <code>Product Variant</code> -{' '}
                  <code>List of product variants</code>
                </List.Item>
                <List.Item>Click Save</List.Item>
              </List>

              <Text variant="headingXs" as="h4">
                Create a <code>component_quantities</code> metafield defintion
              </Text>
              <List type="bullet">
                <List.Item>
                  Click <i>Add definition</i> to create a new variant metafield
                  definition
                </List.Item>
                <List.Item>
                  Name: <code>component_quantities</code>
                </List.Item>
                <List.Item>
                  Namespace and key (don't change the default):&nbsp;
                  <code>custom.component_quantities</code>
                </List.Item>
                <List.Item>
                  Description:{' '}
                  <code>Quantity of components included in Bundle</code>
                </List.Item>
                <List.Item>
                  Select type: <code>Integer</code> -&nbsp;
                  <code>List of values</code>
                </List.Item>
                <List.Item>Click Save</List.Item>
              </List>

              <Text variant="headingXs" as="h4">
                Create a <code>component_parents</code> metafield defintion
              </Text>
              <List type="bullet">
                <List.Item>
                  Click <i>Add definition</i> to create a new variant metafield
                  definition
                </List.Item>
                <List.Item>
                  Name: <code>component_parents</code>
                </List.Item>
                <List.Item>
                  Namespace and key (don't change the default):&nbsp;
                  <code>custom.component_parents</code>
                </List.Item>
                <List.Item>
                  Description: <code>Child component parent definition</code>
                </List.Item>
                <List.Item>
                  Select type: <code>JSON</code>
                </List.Item>
                <List.Item>
                  Copy this{' '}
                  <a href="#" target="_blank">
                    JSON schema
                  </a>{' '}
                  and add it as the rules
                </List.Item>
                <List.Item>Click Save</List.Item>
              </List>
            </TextContainer>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Create a bundle parent product variant" sectioned>
            <List type="bullet">
              <List.Item>
                Create a product that represents the bundle
                <br />
                <strong>Required</strong>: At least one available in inventory
                <br />
                <strong>Required</strong>: Price is more than 0<br />
                <strong>Required</strong>: At least one option, since we need
                access to the product variant
              </List.Item>
              <List.Item>
                After saving the product, click <i>Edit</i> next to the variant
                of the option
                <br />
                <strong>Note</strong>: This will be the bundle parent product
                variant
              </List.Item>
              <List.Item>
                Scroll to the <i>Metafields</i> section of the variant edit page
              </List.Item>
              <List.Item>
                Open up the product variants that will be included in this
                bundle in separate browser tabs
                <br />
                <strong>Note</strong>: We'll need access to the product variant
                IDs of the bundled products while defining them
                <br />
                <strong>Note</strong>: The product variant IDs can be found in
                the URL of the product variant:
                <br />
                <code>
                  {
                    'https://admin.shopify.com/store/<your store>/products/<product ID>/variants/<product variant ID>'
                  }
                </code>
              </List.Item>
              <List.Item>
                On the parent product variant page, click the{' '}
                <i>component_reference</i> field under <i>Metafields</i>
              </List.Item>
              <List.Item>
                Select the product variants that will be bundled and click{' '}
                <i>Save</i>
              </List.Item>
              <List.Item>
                Select the <i>component_quantities</i> field under{' '}
                <i>Metafields</i>
                <br />
                <strong>Note</strong>: Add a quantity for each{' '}
                <i>component_reference</i> in this bundle
                <br />
                <strong>Note</strong>: The order matters, the quantity entered
                will correspond with the components entered in the{' '}
                <i>component_reference</i> metafield
              </List.Item>
              <List.Item>
                Click <i>Save</i> on the parent product variant page
                <br />
                <strong>Note</strong>: Do not exit this page, we'll need the ID
                from the URL
              </List.Item>
            </List>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Define bundle on child product variants" sectioned>
            <Text variant="headingXs" as="h3">
              <strong>Note</strong>: Complete the following steps for each child
              product variant defined in <code>component_reference</code> in the
              previous step
            </Text>

            <List type="bullet">
              <List.Item>
                On the child product variant page, click the{' '}
                <i>componenet_parents</i> field under <i>Metafields</i>
              </List.Item>
              <List.Item>
                Using the JSON schema defined, build the bundle defintion
                <br />
                <strong>Note</strong>: The <i>component_reference</i> and{' '}
                <i>component_quantities</i> values MUST match the values defined
                on the parent in the previous step
                <br />
                <strong>Example</strong>:
                <br />
                <pre>
                  <code>
                    {'['}
                    <br />
                    {'  {'}
                    <br />
                    {
                      '    "id": "gid://shopify/ProductVariant/<ID of parent product variant>",'
                    }
                    <br />
                    {'    "component_reference": {'}
                    <br />
                    {'      "value": ['}
                    <br />
                    {
                      '        "gid://shopify/ProductVariant/<ID of first child product variant>",'
                    }
                    <br />
                    {
                      '        "gid://shopify/ProductVariant/<ID of second child product variant>"'
                    }
                    <br />
                    {'      ]'}
                    <br />
                    {'    },'}
                    <br />
                    {'    "component_quantities": {'}
                    <br />
                    {'      "value": ['}
                    <br />
                    {'        <quantity of first product variant in bundle>,'}
                    <br />
                    {'        <quantity of second product variant in bundle>'}
                    <br />
                    {'      ]'}
                    <br />
                    {'    }'}
                    <br />
                    {'  }'}
                    <br />
                    {']'}
                    <br />
                  </code>
                </pre>
              </List.Item>
            </List>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
