import { useState, useMemo } from "react";

export function useCustomizationForm(props) {
  const initialData = {
    cartSubtotal: 0,
    paymentMethod: "Credit Card",
    ...props,
  };

  const [data, setData] = useState(initialData);

  const handleInputChange = ({ value, name }) => {
    setData((cur) => ({ ...cur, [name]: value }));
  };

  const hasChanged = useMemo(() => {
    console.log(initialData, data)
    return Object.keys(initialData).some(
      (key) => data[key] !== initialData[key]
    );
  }, [data]);

  const mergedData = {
    ...data,
    title: `Hide ${data.paymentMethod} for orders over $${data.cartSubtotal}`,
  };

  return {
    data: mergedData,
    handleInputChange,
    hasChanged,
    setData,
  };
}
