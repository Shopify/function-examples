import DiscountCreatePage from '../../components/DiscountCreatePage';
import {
  default as BundleConfiguration,
  serializeDiscount,
  DEFAULT_CONFIGURATION,
  configurationsAreEqual,
} from '../../components/function-configuration/BundleConfiguration';

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
