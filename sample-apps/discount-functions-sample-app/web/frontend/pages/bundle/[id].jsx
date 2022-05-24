import { useParams } from 'react-router-dom';

import DiscountDetailsPage from '../../components/DiscountDetailsPage';
import {
  default as BundleConfiguration,
  serializeDiscount,
  DEFAULT_CONFIGURATION,
  configurationsAreEqual,
} from '../../components/function-configuration/BundleConfiguration';

export default function BundleDiscountPage() {
  const { id } = useParams();

  return (
    <DiscountDetailsPage
      id={id}
      configurationsAreEqual={configurationsAreEqual}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <BundleConfiguration
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
      serializeDiscount={serializeDiscount}
    />
  );
}
