import { useMemo, useState } from "react";

const INITIAL_DATA = {value: "Express"}

export function useCustomizationForm(props) {

  const initialData = props || INITIAL_DATA;

  const [data, setData] = useState({value: props?.deliveryOptionName || INITIAL_DATA.value});

  const handleInputChange = ({ value, name }) => {
    setData((cur) => ({ ...cur, [name]: value }));
  };

  const hasChanged = useMemo(() => {
    return Object.keys(initialData).some(
    (key) => data[key] !== initialData[key]
  )}, [data]);

  return {
    data,
    handleInputChange,
    hasChanged,
    setData
  };
}
