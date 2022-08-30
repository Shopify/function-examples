import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as ShippingDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/ShippingDiscount';

export default function CreateShippingDiscountPage() {
  return (
    <DiscountCreatePage
      functionId={import.meta.env.SHOPIFY_SHIPPING_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ShippingDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
