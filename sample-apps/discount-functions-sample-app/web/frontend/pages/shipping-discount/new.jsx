import DiscountCreatePage from "../../components/DiscountCreatePage";
import {
  default as ShippingDiscount,
  DEFAULT_CONFIGURATION,
} from "../../components/function-configuration/ShippingDiscount";

export default function CreateShippingDiscountPage() {
  return (
    <DiscountCreatePage
      type="SHIPPING_DISCOUNT"
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
