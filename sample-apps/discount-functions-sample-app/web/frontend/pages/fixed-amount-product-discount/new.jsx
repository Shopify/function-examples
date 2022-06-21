import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as FixedAmountProductDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/FixedAmountProductDiscount';

export default function CreateFixedAmountProductDiscountPage() {
  return (
    <DiscountCreatePage
      functionId={process.env.SHOPIFY_PRODUCT_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <FixedAmountProductDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
