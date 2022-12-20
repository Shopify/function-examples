import { Loading } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

import { CustomizationPage } from "../../../components";
import {
  usePaymentCustomization,
  useUpdatePaymentCustomization,
} from "../../../hooks";

export default function PaymentCustomizationDetailPage() {
  const { id, functionId } = useParams();
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const { data, isFetching } = usePaymentCustomization({
    id,
  });

  const { mutateAsync: updateCustomization } = useUpdatePaymentCustomization({
    id,
  });

  const handleSave = async (data) => {
    const payload = {
      ...data,
      functionId,
      title: `Hide ${data.paymentMethod} if cart subtotal is $${data.cartSubtotal}`,
    };

    try {
      const data = await updateCustomization({ payload });
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

  if (isFetching || !data) return <Loading />;

  return (
    <CustomizationPage
      title="Hide Payment Method"
      subtitle="Hide a payment method for cart subtotal's greater than or equal to the specified subtotal."
      initialData={data}
      onSave={handleSave}
      customizationId={id}
      allowDeletion
    />
  );
}
