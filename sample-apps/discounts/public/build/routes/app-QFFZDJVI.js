import {
  AppProvider as AppProvider2,
  require_app_bridge_react
} from "/build/_shared/chunk-JY3U5FKI.js";
import {
  require_shopify
} from "/build/_shared/chunk-SU66BP3D.js";
import {
  styles_default
} from "/build/_shared/chunk-6BDBBDZS.js";
import {
  AppProvider
} from "/build/_shared/chunk-XAY7D6NX.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Outlet,
  useLoaderData,
  useRouteError
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

// empty-module:../i18n/i18next.server
var require_i18next = __commonJS({
  "empty-module:../i18n/i18next.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/app.jsx
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());
var import_app_bridge_react = __toESM(require_app_bridge_react());

// app/components/providers/DiscountProvider.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/providers/DiscountProvider.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/providers/DiscountProvider.jsx"
  );
}
function DiscountProvider({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppProvider2, { locale: "en-US", ianaTimezone: "America/Toronto", children }, void 0, false, {
    fileName: "app/components/providers/DiscountProvider.jsx",
    lineNumber: 25,
    columnNumber: 10
  }, this);
}
_c = DiscountProvider;
var _c;
$RefreshReg$(_c, "DiscountProvider");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/providers/index.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/providers/index.ts"
  );
  import.meta.hot.lastModified = "1689955805724.978";
}

// app/routes/app.jsx
var import_shopify = __toESM(require_shopify());
var import_i18next = __toESM(require_i18next());
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/app.jsx"' + id);
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
    "app/routes/app.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: styles_default
}];
function App() {
  _s();
  const {
    polarisTranslations
  } = useLoaderData();
  const {
    apiKey,
    host
  } = useLoaderData();
  const [config] = (0, import_react.useState)({
    host,
    apiKey
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("script", { src: "https://cdn.shopify.com/shopifycloud/app-bridge.js", "data-api-key": apiKey }, void 0, false, {
      fileName: "app/routes/app.jsx",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(AppProvider, { i18n: polarisTranslations, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_app_bridge_react.Provider, { config, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(DiscountProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/app.jsx",
      lineNumber: 66,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/app.jsx",
      lineNumber: 65,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/app.jsx",
      lineNumber: 64,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/app.jsx",
      lineNumber: 63,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.jsx",
    lineNumber: 60,
    columnNumber: 10
  }, this);
}
_s(App, "fVMH8/cs+Q2/eTNyACk92wNOeVQ=", false, function() {
  return [useLoaderData, useLoaderData];
});
_c2 = App;
function ErrorBoundary() {
  _s2();
  throw useRouteError();
}
_s2(ErrorBoundary, "YDkf/bojC730qvJxOiv5VT1rhKY=", false, function() {
  return [useRouteError];
});
_c22 = ErrorBoundary;
var _c2;
var _c22;
$RefreshReg$(_c2, "App");
$RefreshReg$(_c22, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  App as default,
  links
};
//# sourceMappingURL=/build/routes/app-QFFZDJVI.js.map
