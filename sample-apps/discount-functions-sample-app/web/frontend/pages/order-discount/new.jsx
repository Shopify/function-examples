import OrderDiscountCreatePage from '../../components/OrderDiscountCreatePage';

export default function CreateOrderDiscountPage() {
  return (
    <OrderDiscountCreatePage functionId={process.env.SHIPPING_DISCOUNT_ID} />
  );
}
