import {
  ActiveDatesCard,
  CombinationCard,
  DiscountClass,
  DiscountMethod,
  DiscountStatus,
  MethodCard,
  RequirementType,
  SummaryCard,
  UsageLimitsCard,
  onBreadcrumbAction,
  require_actions,
  require_app_bridge_react
} from "/build/_shared/chunk-JY3U5FKI.js";
import {
  require_shopify
} from "/build/_shared/chunk-SU66BP3D.js";
import {
  Banner,
  Card,
  Layout,
  Page,
  PageActions,
  TextField,
  VerticalStack
} from "/build/_shared/chunk-XAY7D6NX.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit
} from "/build/_shared/chunk-KCGMWV4J.js";
import {
  createHotContext
} from "/build/_shared/chunk-5QIPLCA4.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/isobject/index.js
var require_isobject = __commonJS({
  "node_modules/isobject/index.js"(exports, module) {
    "use strict";
    module.exports = function isObject(val) {
      return val != null && typeof val === "object" && Array.isArray(val) === false;
    };
  }
});

// node_modules/get-value/index.js
var require_get_value = __commonJS({
  "node_modules/get-value/index.js"(exports, module) {
    var isObject = require_isobject();
    module.exports = function(target, path, options) {
      if (!isObject(options)) {
        options = { default: options };
      }
      if (!isValidObject(target)) {
        return typeof options.default !== "undefined" ? options.default : target;
      }
      if (typeof path === "number") {
        path = String(path);
      }
      const isArray = Array.isArray(path);
      const isString = typeof path === "string";
      const splitChar = options.separator || ".";
      const joinChar = options.joinChar || (typeof splitChar === "string" ? splitChar : ".");
      if (!isString && !isArray) {
        return target;
      }
      if (isString && path in target) {
        return isValid(path, target, options) ? target[path] : options.default;
      }
      let segs = isArray ? path : split(path, splitChar, options);
      let len = segs.length;
      let idx = 0;
      do {
        let prop = segs[idx];
        if (typeof prop === "number") {
          prop = String(prop);
        }
        while (prop && prop.slice(-1) === "\\") {
          prop = join([prop.slice(0, -1), segs[++idx] || ""], joinChar, options);
        }
        if (prop in target) {
          if (!isValid(prop, target, options)) {
            return options.default;
          }
          target = target[prop];
        } else {
          let hasProp = false;
          let n = idx + 1;
          while (n < len) {
            prop = join([prop, segs[n++]], joinChar, options);
            if (hasProp = prop in target) {
              if (!isValid(prop, target, options)) {
                return options.default;
              }
              target = target[prop];
              idx = n - 1;
              break;
            }
          }
          if (!hasProp) {
            return options.default;
          }
        }
      } while (++idx < len && isValidObject(target));
      if (idx === len) {
        return target;
      }
      return options.default;
    };
    function join(segs, joinChar, options) {
      if (typeof options.join === "function") {
        return options.join(segs);
      }
      return segs[0] + joinChar + segs[1];
    }
    function split(path, splitChar, options) {
      if (typeof options.split === "function") {
        return options.split(path);
      }
      return path.split(splitChar);
    }
    function isValid(key, target, options) {
      if (typeof options.isValid === "function") {
        return options.isValid(key, target);
      }
      return true;
    }
    function isValidObject(val) {
      return isObject(val) || Array.isArray(val) || typeof val === "function";
    }
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// app/routes/app.volume.$functionId.new.jsx
var import_react3 = __toESM(require_react());

// node_modules/@shopify/react-form/build/esm/utilities.mjs
var import_get_value = __toESM(require_get_value(), 1);
function normalizeValidation(input) {
  return Array.isArray(input) ? input : [input];
}
function isChangeEvent(value) {
  return typeof value === "object" && value !== null && Reflect.has(value, "target") && Reflect.has(value.target, "value");
}
function shallowArrayComparison(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }
  if (!arrA || !arrB) {
    return false;
  }
  const len = arrA.length;
  if (arrB.length !== len) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }
  return true;
}
function defaultDirtyComparator(defaultValue, newValue) {
  return Array.isArray(defaultValue) ? !shallowArrayComparison(defaultValue, newValue) : defaultValue !== newValue;
}

// node_modules/@shopify/react-form/build/esm/hooks/field/field.mjs
var import_react2 = __toESM(require_react(), 1);
var import_fast_deep_equal = __toESM(require_fast_deep_equal(), 1);

// node_modules/@shopify/react-form/build/esm/hooks/field/reducer.mjs
var import_react = __toESM(require_react(), 1);
function updateAction(value) {
  return {
    type: "update",
    payload: value
  };
}
function resetAction() {
  return {
    type: "reset"
  };
}
function newDefaultAction(value) {
  return {
    type: "newDefaultValue",
    payload: value
  };
}
function updateErrorAction(error) {
  return {
    type: "updateError",
    payload: error
  };
}
var shallowFieldReducer = makeFieldReducer({
  dirtyStateComparator: defaultDirtyComparator
});
function makeFieldReducer({
  dirtyStateComparator = defaultDirtyComparator
}) {
  return (state, action) => {
    switch (action.type) {
      case "update": {
        const newValue = action.payload;
        const {
          defaultValue
        } = state;
        const dirty = dirtyStateComparator(defaultValue, newValue);
        return {
          ...state,
          dirty,
          value: newValue,
          touched: true
        };
      }
      case "updateError": {
        const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
        const [firstError] = payload;
        const allErrors = firstError ? payload : [];
        if (shallowArrayComparison(allErrors, state.allErrors)) {
          return {
            ...state,
            error: firstError
          };
        } else {
          return {
            ...state,
            error: firstError,
            allErrors
          };
        }
      }
      case "reset": {
        const {
          defaultValue
        } = state;
        return {
          ...state,
          error: void 0,
          value: defaultValue,
          dirty: false,
          touched: false,
          allErrors: []
        };
      }
      case "newDefaultValue": {
        const newDefaultValue = action.payload;
        return {
          ...state,
          error: void 0,
          value: newDefaultValue,
          defaultValue: newDefaultValue,
          touched: false,
          dirty: false
        };
      }
    }
  };
}
function useFieldReducer(value, dirtyStateComparator) {
  return (0, import_react.useReducer)(makeFieldReducer({
    dirtyStateComparator
  }), initialFieldState(value));
}
function initialFieldState(value) {
  return {
    value,
    defaultValue: value,
    error: void 0,
    touched: false,
    dirty: false,
    allErrors: []
  };
}

// node_modules/@shopify/react-form/build/esm/hooks/field/field.mjs
function useField(input, dependencies = []) {
  const {
    value,
    validates,
    dirtyStateComparator
  } = normalizeFieldConfig(input);
  const validators = normalizeValidation(validates);
  const [state, dispatch] = useFieldReducer(value, dirtyStateComparator);
  const resetActionObject = (0, import_react2.useMemo)(() => resetAction(), []);
  const reset = (0, import_react2.useCallback)(() => dispatch(resetActionObject), [dispatch, resetActionObject]);
  const newDefaultValue = (0, import_react2.useCallback)((value2) => dispatch(newDefaultAction(value2)), [dispatch]);
  const runValidation = (0, import_react2.useCallback)(
    (value2 = state.value) => {
      const errors = validators.map((check) => check(value2, {})).filter((value3) => value3 != null);
      if (errors && errors.length > 0) {
        const [firstError] = errors;
        dispatch(updateErrorAction(errors));
        return firstError;
      }
      dispatch(updateErrorAction(void 0));
      return void 0;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.value, ...dependencies]
  );
  const onChange = (0, import_react2.useCallback)((value2) => {
    const normalizedValue = isChangeEvent(value2) ? value2.target.value : value2;
    dispatch(updateAction(normalizedValue));
    if (state.error) {
      runValidation(normalizedValue);
    }
  }, [runValidation, state.error, dispatch]);
  const setError = (0, import_react2.useCallback)((value2) => dispatch(updateErrorAction(value2)), [dispatch]);
  const onBlur = (0, import_react2.useCallback)(() => {
    if (state.touched === false && state.error == null) {
      return;
    }
    runValidation();
  }, [runValidation, state.touched, state.error]);
  (0, import_react2.useEffect)(() => {
    if (!(0, import_fast_deep_equal.default)(value, state.defaultValue)) {
      newDefaultValue(value);
    }
  }, [value, newDefaultValue]);
  const field = (0, import_react2.useMemo)(() => {
    return {
      ...state,
      onBlur,
      onChange,
      newDefaultValue,
      runValidation,
      setError,
      reset
    };
  }, [state, onBlur, onChange, newDefaultValue, runValidation, setError, reset]);
  return field;
}
function normalizeFieldConfig(input) {
  if (isFieldConfig(input)) {
    return input;
  }
  return {
    value: input,
    validates: () => void 0
  };
}
function isFieldConfig(input) {
  return input != null && typeof input === "object" && Reflect.has(input, "value") && Reflect.has(input, "validates");
}

// app/routes/app.volume.$functionId.new.jsx
var import_node = __toESM(require_node());
var import_app_bridge_react = __toESM(require_app_bridge_react());
var import_actions = __toESM(require_actions());
var import_shopify = __toESM(require_shopify());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/app.volume.$functionId.new.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/app.volume.$functionId.new.jsx"
  );
  import.meta.hot.lastModified = "1690003115837.1387";
}
var useRedirectToDiscounts = () => {
  _s();
  const app = (0, import_app_bridge_react.useAppBridge)();
  const redirect = import_actions.Redirect.create(app);
  return () => {
    redirect.dispatch(import_actions.Redirect.Action.ADMIN_PATH, {
      path: "/discounts"
    });
  };
};
_s(useRedirectToDiscounts, "rxUCIUKZj/XmLp2mdP6toeaW07c=", false, function() {
  return [import_app_bridge_react.useAppBridge];
});
function VolumeNew() {
  _s2();
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const redirect = useRedirectToDiscounts();
  const currencyCode = "Cad";
  const submitErrors = (actionData == null ? void 0 : actionData.errors) || [];
  const [todaysDate] = (0, import_react3.useState)(/* @__PURE__ */ new Date());
  (0, import_react3.useEffect)(() => {
    if ((actionData == null ? void 0 : actionData.errors.length) === 0) {
      redirect();
    }
  }, [actionData == null ? void 0 : actionData.errors, redirect]);
  const discountTitle = useField("");
  const discountMethod = useField(DiscountMethod.Code);
  const discountCode = useField("");
  const combinesWith = useField({
    orderDiscounts: false,
    productDiscounts: false,
    shippingDiscounts: false
  });
  const requirementType = useField(RequirementType.None);
  const requirementSubtotal = useField("0");
  const requirementQuantity = useField("0");
  const usageTotalLimit = useField(null);
  const usageOncePerCustomer = useField(false);
  const startDate = useField(todaysDate);
  const endDate = useField(null);
  const configuration = {
    // Add quantity and percentage configuration to form data
    quantity: useField("1"),
    percentage: useField("0")
  };
  const requestData = {
    discountName: discountTitle.value,
    discountMethod: discountMethod.value,
    discountCode: discountCode.value,
    combinesWithProductDiscounts: combinesWith.value.productDiscounts,
    combinesWithOrderDiscounts: combinesWith.value.orderDiscounts,
    combinesWithShippingDiscounts: combinesWith.value.shippingDiscounts,
    requirementType: requirementType.value,
    requirementSubtotal: requirementSubtotal.value,
    requirementQuantity: requirementQuantity.value,
    usageTotalLimit: usageTotalLimit.value,
    usageOncePerCustomer: usageOncePerCustomer.value,
    startDate: /* @__PURE__ */ new Date(),
    endDate: null,
    configuration
  };
  const handleSubmit = () => {
    submit(requestData, {
      method: "post"
    });
  };
  const errorBanner = submitErrors.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Banner, { status: "critical", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "There were some issues with your form submission:" }, void 0, false, {
      fileName: "app/routes/app.volume.$functionId.new.jsx",
      lineNumber: 171,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { children: submitErrors.map(({
      message,
      field
    }, index) => {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
        field.join("."),
        " ",
        message
      ] }, `${message}${index}`, true, {
        fileName: "app/routes/app.volume.$functionId.new.jsx",
        lineNumber: 177,
        columnNumber: 18
      }, this);
    }) }, void 0, false, {
      fileName: "app/routes/app.volume.$functionId.new.jsx",
      lineNumber: 172,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.volume.$functionId.new.jsx",
    lineNumber: 170,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/app.volume.$functionId.new.jsx",
    lineNumber: 169,
    columnNumber: 49
  }, this) : null;
  return (
    // Render a discount form using Polaris components and the discount app components
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { title: "Create volume discount", breadcrumbs: [{
      content: "Discounts",
      onAction: () => onBreadcrumbAction(redirect, true)
    }], primaryAction: {
      content: "Save",
      onAction: handleSubmit,
      loading: isLoading
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: [
      errorBanner,
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerticalStack, { align: "space-around", gap: 2, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MethodCard, { title: "Volume", discountTitle, discountClass: DiscountClass.Product, discountCode, discountMethod }, void 0, false, {
          fileName: "app/routes/app.volume.$functionId.new.jsx",
          lineNumber: 199,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { title: "Volume", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Minimum quantity", ...configuration.quantity }, void 0, false, {
            fileName: "app/routes/app.volume.$functionId.new.jsx",
            lineNumber: 202,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Discount percentage", ...configuration.percentage, suffix: "%" }, void 0, false, {
            fileName: "app/routes/app.volume.$functionId.new.jsx",
            lineNumber: 203,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app.volume.$functionId.new.jsx",
          lineNumber: 201,
          columnNumber: 11
        }, this),
        discountMethod.value === DiscountMethod.Code && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UsageLimitsCard, { totalUsageLimit: usageTotalLimit, oncePerCustomer: usageOncePerCustomer }, void 0, false, {
          fileName: "app/routes/app.volume.$functionId.new.jsx",
          lineNumber: 205,
          columnNumber: 60
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CombinationCard, { combinableDiscountTypes: combinesWith, discountClass: DiscountClass.Product, discountDescriptor: "Discount" }, void 0, false, {
          fileName: "app/routes/app.volume.$functionId.new.jsx",
          lineNumber: 206,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActiveDatesCard, { startDate, endDate, timezoneAbbreviation: "EST" }, void 0, false, {
          fileName: "app/routes/app.volume.$functionId.new.jsx",
          lineNumber: 207,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.volume.$functionId.new.jsx",
        lineNumber: 198,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "app/routes/app.volume.$functionId.new.jsx",
        lineNumber: 197,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "app/routes/app.volume.$functionId.new.jsx",
        lineNumber: 196,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { secondary: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SummaryCard, { header: {
        discountMethod: discountMethod.value,
        discountDescriptor: discountMethod.value === DiscountMethod.Automatic ? discountTitle.value : discountCode.value,
        appDiscountType: "Volume",
        isEditing: false
      }, performance: {
        status: DiscountStatus.Scheduled,
        usageCount: 0
      }, minimumRequirements: {
        requirementType: requirementType.value,
        subtotal: requirementSubtotal.value,
        quantity: requirementQuantity.value,
        currencyCode
      }, usageLimits: {
        oncePerCustomer: usageOncePerCustomer.value,
        totalUsageLimit: usageTotalLimit.value
      }, activeDates: {
        startDate: startDate.value,
        endDate: endDate.value
      } }, void 0, false, {
        fileName: "app/routes/app.volume.$functionId.new.jsx",
        lineNumber: 213,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "app/routes/app.volume.$functionId.new.jsx",
        lineNumber: 212,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageActions, { primaryAction: {
        content: "Save discount",
        onAction: handleSubmit,
        loading: isLoading
      }, secondaryActions: [{
        content: "Discard",
        onAction: () => onBreadcrumbAction(redirect, true)
      }] }, void 0, false, {
        fileName: "app/routes/app.volume.$functionId.new.jsx",
        lineNumber: 235,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "app/routes/app.volume.$functionId.new.jsx",
        lineNumber: 234,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.volume.$functionId.new.jsx",
      lineNumber: 194,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/app.volume.$functionId.new.jsx",
      lineNumber: 186,
      columnNumber: 5
    }, this)
  );
}
_s2(VolumeNew, "zb2Ftoky2hwDvO2YjA63PxTGYOI=", false, function() {
  return [useSubmit, useActionData, useNavigation, useRedirectToDiscounts, useField, useField, useField, useField, useField, useField, useField, useField, useField, useField, useField, useField, useField];
});
_c = VolumeNew;
var _c;
$RefreshReg$(_c, "VolumeNew");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  VolumeNew as default
};
/*! Bundled license information:

isobject/index.js:
  (*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

get-value/index.js:
  (*!
   * get-value <https://github.com/jonschlinkert/get-value>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=/build/routes/app.volume.$functionId.new-7LQUVCUO.js.map
