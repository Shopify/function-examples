import ShippingDiscountCreatePage from '../../components/ShippingDiscountCreatePage';

export default function CreateShippingDiscountPage() {
  return (
    <ShippingDiscountCreatePage functionId={process.env.SHIPPING_DISCOUNT_ID} />
  );
}
