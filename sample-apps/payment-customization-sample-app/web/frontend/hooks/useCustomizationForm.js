import { useState, useMemo } from "react";

export function useCustomizationForm(props) {
  const initialData = props || {
    cartSubtotal: 0,
    paymentMethod: "Credit Card",
  };

  const [data, setData] = useState({
    cartSubtotal: props?.cartSubtotal || initialData.cartSubtotal,
    paymentMethod: props?.paymentMethod || initialData.paymentMethod,
  });

  const handleInputChange = ({ value, name }) => {
    setData((cur) => ({ ...cur, [name]: value }));
  };

  const hasChanged = useMemo(() => {
    return Object.keys(initialData).some(
      (key) => data[key] !== initialData[key]
    );
  }, [data]);

  return {
    data,
    handleInputChange,
    hasChanged,
    setData,
  };
}
