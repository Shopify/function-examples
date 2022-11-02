import { useParams } from "react-router-dom";

import DiscountDetailsPage from "../../components/DiscountDetailsPage";
import {
  default as ProductDiscount,
  DEFAULT_CONFIGURATION,
} from "../../components/function-configuration/ProductDiscount";

export default function ProductDiscountDetailsPage() {
  const { id } = useParams();

  return (
    <DiscountDetailsPage
      id={id}
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
