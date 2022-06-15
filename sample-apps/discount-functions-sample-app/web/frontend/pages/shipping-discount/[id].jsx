import { useParams } from 'react-router-dom';

import DiscountDetailsPage from '../../components/DiscountDetailsPage';

export default function ShippingDiscountDetailsPage() {
  const { id } = useParams();

  return (
    <DiscountDetailsPage
      id={id}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ShippingDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
