import { useEffect, useState, useMemo } from 'react';

import { Discount } from '../types';
import { usePrevious } from './usePrevious';

export function useDiscount<Configuration>({
  savedDiscount,
  defaultConfiguration,
  configurationsAreEqual,
}: {
  savedDiscount?: Discount<Configuration>;
  defaultConfiguration: Configuration;
  configurationsAreEqual: (
    left: Configuration,
    right: Configuration,
  ) => boolean;
}) {
  const previousSavedDiscount = usePrevious(savedDiscount);
  const [title, setTitle] = useState(savedDiscount?.title ?? '');
  const [startsAt, setStartsAt] = useState(
    savedDiscount?.startsAt ?? new Date(),
  );
  const [endsAt, setEndsAt] = useState(savedDiscount?.endsAt);
  const [configuration, setConfiguration] = useState(
    savedDiscount?.configuration ?? defaultConfiguration,
  );

  const discount = {
    title,
    startsAt,
    endsAt,
    configuration,
  };

  const isDirty = useMemo(() => {
    if (!savedDiscount) {
      return true;
    }

    return !discountsAreEqual(discount, savedDiscount, configurationsAreEqual);
  }, [savedDiscount, discount, configurationsAreEqual]);

  useEffect(() => {
    if (!savedDiscount) {
      return;
    }

    if (
      previousSavedDiscount &&
      discountsAreEqual(
        savedDiscount,
        previousSavedDiscount,
        configurationsAreEqual,
      )
    ) {
      return;
    }

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

function discountsAreEqual<Configuration>(
  left: Discount<Configuration>,
  right: Discount<Configuration>,
  configurationsAreEqual: (
    left: Configuration,
    right: Configuration,
  ) => boolean,
): boolean {
  return (
    left.title === right.title &&
    left.startsAt === right.startsAt &&
    left.endsAt === right.endsAt &&
    configurationsAreEqual(left.configuration, right.configuration)
  );
}
