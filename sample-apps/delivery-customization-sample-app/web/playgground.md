{
  shop(id: 123) {
    fulfillmentServices {
      shippingMethods {
        code
        label
      }
    }
  }
}

if shippingMethod.code === code