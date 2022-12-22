import { Loading } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

import { useCreatePaymentCustomization } from "../../../hooks";
import { CustomizationPage } from "../../../components";

const INITIAL_DATA = {
  paymentMethod: "Credit Card",
  cartSubtotal: "0",
};

export default function NewCustomizationPage() {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const { functionId } = useParams();

  const { mutateAsync: createCustomization } = useCreatePaymentCustomization();

  const handleSave = async (data) => {
    const payload = {
      ...data,
      functionId,
      title: `Hide ${data.paymentMethod} if cart subtotal is at least $${data.cartSubtotal}`,
    };

    try {
      const data = await createCustomization({ payload });
      if (data?.userErrors?.length > 0) {
        return { status: "fail", errors: data.userErrors };
      }

      redirect.dispatch(Redirect.Action.ADMIN_PATH, {
        path: "/settings/payments/customizations",
      });
    } catch {
      return {
        status: "fail",
        errors: [
          { message: "An unexpected error occurred. Please try again later." },
        ],
      };
    }
  };

  return (
    <CustomizationPage
      title="Hide Payment Method"
      subtitle="Hide a payment method for cart subtotals greater than or equal to the specified subtotal."
      initialData={INITIAL_DATA}
      onSave={handleSave}
    />
  );
}
