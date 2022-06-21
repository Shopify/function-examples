import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as FixedProductDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/FixedProductDiscount';

export default function CreateFixedProductDiscountPage() {
  return (
    <DiscountCreatePage
      functionId={process.env.SHOPIFY_PRODUCT_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <FixedProductDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
