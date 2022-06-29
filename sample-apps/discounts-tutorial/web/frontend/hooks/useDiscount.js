import { useEffect, useState, useMemo } from 'react';
import { isEqual } from 'lodash';

import { usePrevious } from './usePrevious';

export function useDiscount({
  savedDiscount,
  defaultConfiguration,
}) {
  const previousSavedDiscount = usePrevious(savedDiscount);
  const [title, setTitle] = useState(savedDiscount?.title ?? '');
  const [code, setCode] = useState(savedDiscount?.code ?? '');
  const [method, setMethod] = useState(savedDiscount?.method ?? '');
  const [startsAt, setStartsAt] = useState(savedDiscount?.startsAt ?? new Date());
  const [endsAt, setEndsAt] = useState(savedDiscount?.endsAt ?? null);
  const [usageLimit, setUsageLimit] = useState(savedDiscount?.usageLimit ?? null);
  const [appliesOncePerCustomer, setAppliesOncePerCustomer] = useState(savedDiscount?.appliesOncePerCustomer ?? false);
  const [combinesWith, setCombinesWith] = useState(savedDiscount?.combinesWith ?? {});
  const [configuration, setConfiguration] = useState(
    savedDiscount?.configuration ?? defaultConfiguration,
  );
  const configurationId = savedDiscount?.configurationId;

  const discount = {
    title,
    code,
    method,
    startsAt,
    endsAt,
    usageLimit,
    appliesOncePerCustomer,
    combinesWith,
    configuration,
    configurationId,
  };

  const isDirty = useMemo(() => {
    if (!savedDiscount) {
      return true;
    }

    return !isEqual(discount, savedDiscount);
  }, [savedDiscount, discount]);

  useEffect(() => {
    if (!savedDiscount) {
      return;
    }

    if (
      previousSavedDiscount &&
      isEqual(savedDiscount, previousSavedDiscount)
    ) {
      return;
    }

    setTitle(savedDiscount.title);
    setCode(savedDiscount.code);
    setMethod(savedDiscount.method);
    setStartsAt(savedDiscount.startsAt);
    setEndsAt(savedDiscount.endsAt);
    setUsageLimit(savedDiscount.usageLimit);
    setAppliesOncePerCustomer(savedDiscount.appliesOncePerCustomer);
    setCombinesWith(savedDiscount.combinesWith);
    setConfiguration(savedDiscount.configuration);
  }, [savedDiscount]);

  return {
    discount,
    title,
    code,
    method,
    startsAt,
    endsAt,
    usageLimit,
    appliesOncePerCustomer,
    combinesWith,
    configuration,
    setTitle,
    setCode,
    setMethod,
    setStartsAt,
    setEndsAt,
    setUsageLimit,
    setAppliesOncePerCustomer,
    setCombinesWith,
    setConfiguration,
    isDirty,
  };
}