import { useState } from "react";

export function useCustomizationForm(props) {
  const {
    initialData = {
      exactMatch: false,
      cartSubtotalThreshold: 0,
      shippingMethod: "Express"
    },
  } = props || {};

  const [data, setData] = useState(initialData);

  const handleInputChange = ({ value, name }) => {
    setData((cur) => ({ ...cur, [name]: value }));
  };

  const hasChanged = Object.keys(data).some(
    (key) => data[key] !== initialData[key]
  );

  return {
    data,
    handleInputChange,
    hasChanged,
    setData
  };
}
