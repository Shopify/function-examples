import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as ShippingDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/ShippingDiscount';
import { DISCOUNT_CLASS } from '../../consts';

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
      discountClass={DISCOUNT_CLASS.Shipping}
    />
  );
}
