import DiscountCreatePage from '../../components/DiscountCreatePage';
import { DiscountClass } from '@shopify/discount-app-components';
import {
  default as ProductDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/ProductDiscount';

export default function CreateProductDiscountPage() {
  return (
    <DiscountCreatePage
      functionId={process.env.SHOPIFY_PRODUCT_DISCOUNT_ID}
      discountClass={DiscountClass.Product}
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
