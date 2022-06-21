import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as ProductFixedDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/ProductFixedDiscount';

export default function CreateProductFixedDiscountPage() {
  return (
    <DiscountCreatePage
      functionId={process.env.SHOPIFY_PRODUCT_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ProductFixedDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
