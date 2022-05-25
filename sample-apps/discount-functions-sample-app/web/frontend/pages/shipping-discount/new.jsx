import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as ShippingDiscount,
  DEFAULT_CONFIGURATION,
  serializeDiscount,
} from '../../components/function-configuration/ShippingDiscount';

export default function CreateShippingDiscountPage() {
  return (
    <DiscountCreatePage
      scriptUuid={process.env.SHIPPING_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ShippingDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
      serializeDiscount={serializeDiscount}
    />
  );
}
