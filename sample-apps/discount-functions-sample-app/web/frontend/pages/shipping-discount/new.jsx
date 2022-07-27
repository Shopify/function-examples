import { DiscountClass } from '@shopify/discount-app-components';
import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as ShippingDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/ShippingDiscount';

export default function CreateShippingDiscountPage() {
  return (
    <DiscountCreatePage
      functionId={process.env.SHOPIFY_SHIPPING_DISCOUNT_ID}
      discountClass={DiscountClass.Shipping}
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
