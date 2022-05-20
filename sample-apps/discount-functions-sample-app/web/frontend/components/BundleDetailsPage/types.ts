export interface Configuration {
  message: string;
  variantId: string;
  minimumQuantity: number;
  discountPercentage: number;
}

export interface BundleDiscount {
  title: string;
  configuration: Configuration;
}
