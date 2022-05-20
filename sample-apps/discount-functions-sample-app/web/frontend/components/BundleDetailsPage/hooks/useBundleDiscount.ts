import { useState, useMemo, useEffect } from 'react';
import { usePrevious } from '../../../hooks/usePrevious';

import { BundleDiscount } from '../types';

const EMPTY_DISCOUNT = {
  title: '',
  configuration: {
    message: '',
    discountPercentage: 0,
    minimumQuantity: 0,
    variantId: '',
  },
};

export default function useBundleDiscount(savedDiscount?: BundleDiscount) {
  const previousSavedDiscount = usePrevious(savedDiscount);
  const [discount, setDiscount] = useState<BundleDiscount>(
    () => savedDiscount || EMPTY_DISCOUNT,
  );

  useEffect(() => {
    if (!savedDiscount) {
      return;
    }

    if (
      previousSavedDiscount &&
      discountsAreEqual(savedDiscount, previousSavedDiscount)
    ) {
      return;
    }

    setDiscount(savedDiscount);
  }, [savedDiscount]);

  const isDirty = useMemo(() => {
    if (!savedDiscount) {
      return true;
    }

    return !discountsAreEqual(discount, savedDiscount);
  }, [discount, savedDiscount]);

  return {
    discount,
    setDiscount,
    isDirty,
  };
}

function discountsAreEqual(discount: BundleDiscount, other: BundleDiscount) {
  return (
    discount.title === other.title &&
    discount.configuration.message === other.configuration.message &&
    discount.configuration.discountPercentage ===
      other.configuration.discountPercentage &&
    discount.configuration.minimumQuantity ===
      other.configuration.minimumQuantity &&
    discount.configuration.variantId === other.configuration.variantId
  );
}
