import { useEffect, useRef, useState } from 'react'
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Button,
} from '@shopify/polaris'
import { Toast } from '@shopify/app-bridge-react'
import { gql } from 'graphql-request'

import { useAuthenticatedFetch, useShopifyMutation } from '../hooks'

const PRODUCTS_QUERY = gql`
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`

export function ProductsCard() {
  const fetch = useAuthenticatedFetch()
  const mounted = useRef(false)

  const [populateProduct, { isLoading }] = useShopifyMutation({
    query: PRODUCTS_QUERY,
  })
  const [productCount, setProductCount] = useState('-')
  const [hasResults, setHasResults] = useState(false)

  async function updateProductCount() {
    const response = await fetch('/api/products-count')
    const { count } = await response.json()
    return count
  }

  useEffect(() => {
    mounted.current = true

    updateProductCount().then((count) => {
      if (mounted.current) setProductCount(count)
    })

    return () => {
      mounted.current = false
    }
  }, [mounted.current])

  const toastMarkup = hasResults && (
    <Toast
      content="5 products created!"
      onDismiss={() => setHasResults(false)}
    />
  )

  const handlePopulate = () => {
    Promise.all(
      Array.from({ length: 5 }).map(() =>
        populateProduct({
          input: {
            title: randomTitle(),
            variants: [{ price: randomPrice() }],
          },
        })
      )
    ).then(() => {
      if (mounted.current) {
        updateProductCount().then((count) => {
          if (mounted.current) setProductCount(count)
        })
        setHasResults(true)
      }
    })
  }

  return (
    <>
      {toastMarkup}
      <Card
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: 'Populate 5 products',
          onAction: handlePopulate,
          loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <p>
            Sample products are created with a default title and price. You can
            remove them at any time.
          </p>
          <Heading element="h4">
            TOTAL PRODUCTS
            <DisplayText size="medium">
              <TextStyle variation="strong">{productCount}</TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
      </Card>
    </>
  )
}

function randomTitle() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]

  return `${adjective} ${noun}`
}

function randomPrice() {
  return Math.round((Math.random() * 10 + Number.EPSILON) * 100) / 100
}

const ADJECTIVES = [
  'autumn',
  'hidden',
  'bitter',
  'misty',
  'silent',
  'empty',
  'dry',
  'dark',
  'summer',
  'icy',
  'delicate',
  'quiet',
  'white',
  'cool',
  'spring',
  'winter',
  'patient',
  'twilight',
  'dawn',
  'crimson',
  'wispy',
  'weathered',
  'blue',
  'billowing',
  'broken',
  'cold',
  'damp',
  'falling',
  'frosty',
  'green',
  'long',
]

const NOUNS = [
  'waterfall',
  'river',
  'breeze',
  'moon',
  'rain',
  'wind',
  'sea',
  'morning',
  'snow',
  'lake',
  'sunset',
  'pine',
  'shadow',
  'leaf',
  'dawn',
  'glitter',
  'forest',
  'hill',
  'cloud',
  'meadow',
  'sun',
  'glade',
  'bird',
  'brook',
  'butterfly',
  'bush',
  'dew',
  'dust',
  'field',
  'fire',
  'flower',
]
