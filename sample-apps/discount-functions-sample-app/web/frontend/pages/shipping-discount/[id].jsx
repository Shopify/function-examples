import { useParams } from "react-router-dom";

import DiscountDetailsPage from "../../components/DiscountDetailsPage";
import {
  default as ShippingDiscount,
  DEFAULT_CONFIGURATION,
} from "../../components/function-configuration/ShippingDiscount";

export default function ShippingDiscountDetailsPage() {
  const { id } = useParams();

  return (
    <DiscountDetailsPage
      id={id}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <ShippingDiscount
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
    />
  );
}
