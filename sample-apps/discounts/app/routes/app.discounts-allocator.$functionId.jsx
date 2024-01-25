import {useEffect} from 'react';
import {json} from '@remix-run/node';
import {useActionData, useNavigate, useSubmit} from '@remix-run/react';
import {Page, Layout, BlockStack, Card, Banner, Text} from '@shopify/polaris';

import {registerDiscountsAllocator} from '../models/discounts.server';

export const action = async ({params, request}) => {
  const registerDiscountsAllocatorMutation = `
    #graphql
      mutation registerDiscountsAllocator($functionExtensionId: String!) {
        discountsAllocatorFunctionRegister(functionExtensionId: $functionExtensionId) {
          userErrors {
            code
            message
            field
          }
        }
      }
    `;

  const formData = await request.formData();
  const functionExtensionId = formData.get('functionExtensionId');

  if (functionExtensionId !== null) {
    const {admin} = await authenticate.admin(request);

    const response = await admin.graphql(registerDiscountsAllocatorMutation, {
      variables: {
        functionExtensionId: JSON.parse(functionExtensionId),
      },
    });

    const responseJson = await response.json();
    const errors =
      responseJson.data.discountsAllocatorFunctionRegister?.userErrors;
    return json({errors});
  }

  return json({errors: ['No functionExtensionId provided']});
};

export default function DiscountsAllocator() {
  const actionData = useActionData();

  const submitForm = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.errors && actionData?.errors.length === 0) {
      shopify.toast.show(
        'Discounts Allocator Function registered successfully!',
      );
    }
  }, [actionData]);

  const errorBanner = actionData?.errors.length ? (
    <Layout.Section>
      <Banner
        title="There were some issues with your form submission"
        tone="critical"
      >
        <ul>
          {actionData?.errors?.map((error, index) => {
            return <li key={`${index}`}>{error.message}</li>;
          })}
        </ul>
      </Banner>
    </Layout.Section>
  ) : null;

  const actions = {
    backAction: {
      content: 'Home',
      onAction: () => navigate('/app'),
    },
    primaryAction: {
      content: 'Register Discounts allocator',
      onAction: () => submitForm({}, {method: 'post'}),
    }
  }

  return (
    <Page
      title="Register Discounts Allocator Function"
      {...actions}
    >
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <Text as="h2" variant="bodyMd">
                Add more awesome details about your allocator here!
              </Text>
            </Card>
          </Layout.Section>
          {errorBanner}
        </Layout>
      </BlockStack>
    </Page>
  );
}
