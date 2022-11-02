import DiscountCreatePage from "../../components/DiscountCreatePage";
import {
  default as OrderDiscount,
  DEFAULT_CONFIGURATION,
} from "../../components/function-configuration/OrderDiscount";

export default function CreateOrderDiscountPage() {
  return (
    <DiscountCreatePage
      type="ORDER_DISCOUNT"
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <OrderDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
