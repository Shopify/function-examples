import DiscountCreatePage from "../../components/DiscountCreatePage";
import {
  default as ProductDiscount,
  DEFAULT_CONFIGURATION,
} from "../../components/function-configuration/ProductDiscount";

export default function CreateProductDiscountPage() {
  return (
    <DiscountCreatePage
      type="PRODUCT_DISCOUNT"
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ProductDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
