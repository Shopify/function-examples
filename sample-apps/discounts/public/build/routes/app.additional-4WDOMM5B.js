import {
  Box,
  Card,
  Layout,
  List,
  Page,
  Text,
  VerticalStack
} from "/build/_shared/chunk-XAY7D6NX.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Link
} from "/build/_shared/chunk-KCGMWV4J.js";
import {
  createHotContext
} from "/build/_shared/chunk-5QIPLCA4.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/app.additional.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/app.additional.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/app.additional.jsx"
  );
  import.meta.hot.lastModified = "1689954685344.345";
}
function AdditionalPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ui-title-bar", { title: "Additional page" }, void 0, false, {
      fileName: "app/routes/app.additional.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerticalStack, { gap: "3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "p", variant: "bodyMd", children: [
          "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "https://shopify.dev/docs/apps/tools/app-bridge", target: "_blank", children: "App Bridge" }, void 0, false, {
            fileName: "app/routes/app.additional.jsx",
            lineNumber: 34,
            columnNumber: 17
          }, this),
          "."
        ] }, void 0, true, {
          fileName: "app/routes/app.additional.jsx",
          lineNumber: 30,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "p", variant: "bodyMd", children: [
          "To create your own page and have it show up in the app navigation, add a page inside ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Code, { children: "app/routes" }, void 0, false, {
            fileName: "app/routes/app.additional.jsx",
            lineNumber: 41,
            columnNumber: 47
          }, this),
          ", and a link to it in the ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Code, { children: "<ui-nav-menu>" }, void 0, false, {
            fileName: "app/routes/app.additional.jsx",
            lineNumber: 42,
            columnNumber: 35
          }, this),
          " component found in ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Code, { children: "app/routes/app.jsx" }, void 0, false, {
            fileName: "app/routes/app.additional.jsx",
            lineNumber: 43,
            columnNumber: 26
          }, this),
          "."
        ] }, void 0, true, {
          fileName: "app/routes/app.additional.jsx",
          lineNumber: 39,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.additional.jsx",
        lineNumber: 29,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.additional.jsx",
        lineNumber: 28,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/app.additional.jsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { secondary: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerticalStack, { gap: "2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Resources" }, void 0, false, {
          fileName: "app/routes/app.additional.jsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, { spacing: "extraTight", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List.Item, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav", target: "_blank", children: "App nav best practices" }, void 0, false, {
          fileName: "app/routes/app.additional.jsx",
          lineNumber: 56,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/app.additional.jsx",
          lineNumber: 55,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app.additional.jsx",
          lineNumber: 54,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app.additional.jsx",
        lineNumber: 50,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app.additional.jsx",
        lineNumber: 49,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/app.additional.jsx",
        lineNumber: 48,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app.additional.jsx",
      lineNumber: 26,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app.additional.jsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c = AdditionalPage;
function Code({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { as: "span", padding: "025", paddingInlineStart: "1", paddingInlineEnd: "1", background: "bg-subdued", borderWidth: "1", borderColor: "border", borderRadius: "1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { children }, void 0, false, {
    fileName: "app/routes/app.additional.jsx",
    lineNumber: 72,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/app.additional.jsx",
    lineNumber: 71,
    columnNumber: 10
  }, this);
}
_c2 = Code;
var _c;
var _c2;
$RefreshReg$(_c, "AdditionalPage");
$RefreshReg$(_c2, "Code");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AdditionalPage as default
};
//# sourceMappingURL=/build/routes/app.additional-4WDOMM5B.js.map
