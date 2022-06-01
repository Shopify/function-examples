import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as OrderDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/OrderDiscount';
import { DISCOUNT_CLASS } from '../../consts';

export default function CreateOrderDiscountPage() {
  return (
    <DiscountCreatePage
      scriptUuid={process.env.ORDER_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <OrderDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
      discountClass={DISCOUNT_CLASS.Order}
    />
  );
}
