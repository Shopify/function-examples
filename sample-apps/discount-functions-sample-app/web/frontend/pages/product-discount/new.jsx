import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as ProductDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/ProductDiscount';
import { DISCOUNT_CLASS } from '../../consts';

export default function CreateProductDiscountPage() {
  return (
    <DiscountCreatePage
      scriptUuid={process.env.PRODUCT_DISCOUNT_ID}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ProductDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
      discountClass={DISCOUNT_CLASS.Product}
    />
  );
}
