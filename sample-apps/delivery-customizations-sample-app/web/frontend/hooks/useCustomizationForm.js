import { useMemo, useState } from "react";

export function useCustomizationForm(props) {
  const initialData = {
    deliveryOptionName: "Express",
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
