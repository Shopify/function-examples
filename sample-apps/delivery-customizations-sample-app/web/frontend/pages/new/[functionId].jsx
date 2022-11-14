import { useEffect } from "react";
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationForm, CustomizationPageLayout } from "../../components";
import {
  useCustomizationForm,
  useCreateDeliveryCustomization,
} from "../../hooks";

import { useParams } from "react-router-dom";
import { getOperationTypeFromFunctionId } from "../../../helpers/get-operation-from-functionId";

export default function NewDeliveryCustomizationPage() {
  const navigate = useNavigate();
  const { functionId } = useParams();
  const isNewCustomization = window.location.href.indexOf("new") > -1;

  const {
    handleInputChange,
    hasChanged,
    setData,
    data: formData,
  } = useCustomizationForm();

  const { mutateAsync: createCustomization, isLoading } =
    useCreateDeliveryCustomization();

  const handleSubmit = async () => {
    if (isLoading) return;
    try {
      await createCustomization({ payload: formData });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const primaryAction = {
    disabled: isLoading,
    onAction: handleSubmit,
  };

  useEffect(() => {
    setData({
      shippingMethodName: "Express",
      functionId,
    });
  }, []);

  console.log(formData);

  return (
    <CustomizationPageLayout
      title={`${getOperationTypeFromFunctionId(functionId)} shipping method`}
      loading={isLoading}
      actionProps={primaryAction}
    >
      <CustomizationForm
        {...formData}
        isNewCustomization={isNewCustomization}
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />
    </CustomizationPageLayout>
  );
}
