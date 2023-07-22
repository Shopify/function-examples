import {
  styles_default
} from "/build/_shared/chunk-6BDBBDZS.js";
import {
  AppProvider,
  Button,
  Card,
  FormLayout,
  Page,
  Text,
  TextField
} from "/build/_shared/chunk-XAY7D6NX.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_shopify
} from "/build/_shared/chunk-3GJP5LZF.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Form,
  useActionData,
  useLoaderData
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

// empty-module:./error.server
var require_error = __commonJS({
  "empty-module:./error.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/auth.login/route.jsx
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());
var import_shopify = __toESM(require_shopify());
var import_error = __toESM(require_error());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/auth.login/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/auth.login/route.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: styles_default
}];
function Auth() {
  _s();
  const {
    polarisTranslations
  } = useLoaderData();
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [shop, setShop] = (0, import_react.useState)("");
  const {
    errors
  } = actionData || loaderData;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppProvider, { i18n: polarisTranslations, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "headingMd", as: "h2", children: "Log in" }, void 0, false, {
      fileName: "app/routes/auth.login/route.jsx",
      lineNumber: 65,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { type: "text", name: "shop", label: "Shop domain", helpText: "example.myshopify.com", value: shop, onChange: setShop, autoComplete: "on", error: errors.shop }, void 0, false, {
      fileName: "app/routes/auth.login/route.jsx",
      lineNumber: 68,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { submit: true, children: "Log in" }, void 0, false, {
      fileName: "app/routes/auth.login/route.jsx",
      lineNumber: 70,
      columnNumber: 15
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/auth.login/route.jsx",
    lineNumber: 64,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/auth.login/route.jsx",
    lineNumber: 63,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "app/routes/auth.login/route.jsx",
    lineNumber: 62,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/auth.login/route.jsx",
    lineNumber: 61,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/auth.login/route.jsx",
    lineNumber: 60,
    columnNumber: 10
  }, this);
}
_s(Auth, "BgXw2UX3oqFWic9PVGY0IdGdXww=", false, function() {
  return [useLoaderData, useLoaderData, useActionData];
});
_c = Auth;
var _c;
$RefreshReg$(_c, "Auth");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Auth as default,
  links
};
//# sourceMappingURL=/build/routes/auth.login-PZ5DLYHK.js.map
