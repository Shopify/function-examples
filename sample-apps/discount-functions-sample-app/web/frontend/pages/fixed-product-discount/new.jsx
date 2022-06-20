import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as ProductDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/ProductDiscount';

export default function CreateProductDiscountPage() {
  return (
    <DiscountCreatePage
      functionId={process.env.SHOPIFY_PRODUCT_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ProductDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
