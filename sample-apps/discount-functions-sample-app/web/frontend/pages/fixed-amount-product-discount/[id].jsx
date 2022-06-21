import { useParams } from 'react-router-dom';

import DiscountDetailsPage from '../../components/DiscountDetailsPage';
import {
  default as FixedAmountProductDiscount,
  DEFAULT_CONFIGURATION,
} from '../../components/function-configuration/FixedAmountProductDiscount';

export default function FixedAmountProductDiscountDetailsPage() {
  const { id } = useParams();

  return (
    <DiscountDetailsPage
      id={id}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <FixedAmountProductDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
