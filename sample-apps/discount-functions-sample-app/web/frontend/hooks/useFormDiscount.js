import { useEffect, useState, useMemo } from "react";
import { isEqual } from "lodash";

import { usePrevious } from "./";

export function useFormDiscount({ savedDiscount, defaultConfiguration }) {
  const previousSavedDiscount = usePrevious(savedDiscount);
  const [title, setTitle] = useState(savedDiscount?.title ?? "");
  const [startsAt, setStartsAt] = useState(
    savedDiscount?.startsAt ?? new Date()
  );
  const [endsAt, setEndsAt] = useState(savedDiscount?.endsAt);
  const [configuration, setConfiguration] = useState(
    savedDiscount?.configuration ?? defaultConfiguration
  );
  const configurationId = savedDiscount?.configurationId;

  const discount = {
    title,
    startsAt,
    endsAt,
    configuration,
    configurationId,
  };

  const isDirty = useMemo(() => {
    if (!savedDiscount) return true;

    return !isEqual(discount, savedDiscount);
  }, [savedDiscount, discount]);

  useEffect(() => {
    if (!savedDiscount) return;

    if (previousSavedDiscount && isEqual(savedDiscount, previousSavedDiscount))
      return;

    setTitle(savedDiscount.title);
    setStartsAt(savedDiscount.startsAt);
    setEndsAt(savedDiscount.endsAt);
    setConfiguration(savedDiscount.configuration);
  }, [savedDiscount]);

  return {
    discount,
    title,
    startsAt,
    endsAt,
    configuration,
    setTitle,
    setStartsAt,
    setEndsAt,
    setConfiguration,
    isDirty,
  };
}
