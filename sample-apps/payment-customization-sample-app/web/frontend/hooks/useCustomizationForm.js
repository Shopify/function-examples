import { useState, useMemo } from "react";

export function useCustomizationForm(props) {
  const initialData = {
    cartSubtotal: 0,
    paymentMethod: "Credit Card",
    title: "HIDE",
    ...props,
  };

  const [data, setData] = useState(initialData);

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
