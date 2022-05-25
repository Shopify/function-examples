import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as OrderDiscount,
  DEFAULT_CONFIGURATION,
  serializeDiscount,
} from '../../components/function-configuration/OrderDiscount';

export default function CreateOrderDiscountsPage() {
  return (
    <DiscountCreatePage
      scriptUuid={process.env.ORDER_DISCOUNTS_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <OrderDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
      serializeDiscount={serializeDiscount}
    />
  );
}
