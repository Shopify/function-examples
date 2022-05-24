import { useParams } from 'react-router-dom';
import DiscountDetailsPage from '../../components/DiscountDetailsPage';
import {
  default as OrderDiscount,
  DEFAULT_CONFIGURATION,
  serializeDiscount,
} from '../../components/function-configuration/OrderDiscount';

export default function CreateOrderDiscountsPage() {
  const { id } = useParams();

  return (
    <DiscountDetailsPage
      id={id}
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
