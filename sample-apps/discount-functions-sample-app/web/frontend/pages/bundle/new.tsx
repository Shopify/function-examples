import DiscountCreatePage from '../../components/DiscountCreatePage';
import BundleConfiguration from '../../components/BundleConfiguration';
import { DEFAULT_CONFIGURATION } from '../../components/BundleConfiguration/consts';
import { configurationsAreEqual } from '../../components/BundleConfiguration/configurationsAreEqual';
import { serializeDiscount } from '../../components/BundleConfiguration/serializeDiscount';

export default function NewBundleDiscount() {
  return (
    <DiscountCreatePage
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
