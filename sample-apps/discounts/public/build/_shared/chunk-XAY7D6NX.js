import {
  require_react_dom
} from "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/@shopify/polaris/build/esm/components/AppProvider/AppProvider.js
var import_react19 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/features/context.js
var import_react = __toESM(require_react());
var classNamePolarisSummerEditions2023 = "Polaris-Summer-Editions-2023";
var classNamePolarisSummerEditions2023ShadowBevelOptOut = "Polaris-SE23-Shadow-Bevel-Opt-Out";
var FeaturesContext = /* @__PURE__ */ (0, import_react.createContext)(void 0);

// node_modules/@shopify/polaris-tokens/dist/esm/_virtual/_rollupPluginBabelHelpers.mjs
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  strings.raw = raw;
  return strings;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@shopify/polaris-tokens/dist/esm/src/utilities.mjs
var _templateObject;
var BASE_FONT_SIZE = 16;
var UNIT_PX = "px";
var UNIT_EM = "em";
var UNIT_REM = "rem";
var DIGIT_REGEX = new RegExp(String.raw(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["-?d+(?:.d+|d*)"], ["-?\\d+(?:\\.\\d+|\\d*)"]))));
var UNIT_REGEX = new RegExp(UNIT_PX + "|" + UNIT_EM + "|" + UNIT_REM);
function getUnit(value) {
  if (value === void 0) {
    value = "";
  }
  var unit = value.match(new RegExp(DIGIT_REGEX.source + "(" + UNIT_REGEX.source + ")"));
  return unit && unit[1];
}
function toPx(value) {
  if (value === void 0) {
    value = "";
  }
  var unit = getUnit(value);
  if (!unit)
    return value;
  if (unit === UNIT_PX) {
    return value;
  }
  if (unit === UNIT_EM || unit === UNIT_REM) {
    return "" + parseFloat(value) * BASE_FONT_SIZE + UNIT_PX;
  }
}
function toEm(value, fontSize) {
  if (value === void 0) {
    value = "";
  }
  if (fontSize === void 0) {
    fontSize = BASE_FONT_SIZE;
  }
  var unit = getUnit(value);
  if (!unit)
    return value;
  if (unit === UNIT_EM) {
    return value;
  }
  if (unit === UNIT_PX) {
    return "" + parseFloat(value) / fontSize + UNIT_EM;
  }
  if (unit === UNIT_REM) {
    return "" + parseFloat(value) * BASE_FONT_SIZE / fontSize + UNIT_EM;
  }
}
function toRem(value) {
  if (value === void 0) {
    value = "";
  }
  var unit = getUnit(value);
  if (!unit)
    return value;
  if (unit === UNIT_REM) {
    return value;
  }
  if (unit === UNIT_EM) {
    return "" + parseFloat(value) + UNIT_REM;
  }
  if (unit === UNIT_PX) {
    return "" + parseFloat(value) / BASE_FONT_SIZE + UNIT_REM;
  }
}
function rem(value) {
  return value.replace(new RegExp(DIGIT_REGEX.source + "(" + UNIT_PX + ")", "g"), function(px) {
    var _toRem;
    return (_toRem = toRem(px)) != null ? _toRem : px;
  });
}
function tokensToRems(tokenGroup) {
  return Object.fromEntries(
    Object.entries(tokenGroup).map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), token = _ref2[0], properties = _ref2[1];
      return [token, Object.assign(Object.assign({}, properties), {}, {
        value: rem(properties.value)
      })];
    })
    // We loose the `tokenGroup` inference after transforming the object with
    // `Object.fromEntries()` and `Object.entries()`. Thus, we cast the result
    // back to `T` since we are simply converting the `value` from px to rem.
  );
}
function getMediaConditions(breakpoints3) {
  var breakpointEntries = Object.entries(breakpoints3);
  var lastBreakpointIndex = breakpointEntries.length - 1;
  return Object.fromEntries(breakpointEntries.map(function(entry, index) {
    var _ref7 = entry, _ref8 = _slicedToArray(_ref7, 2), breakpointsTokenName = _ref8[0], breakpoint = _ref8[1];
    var upMediaCondition = getUpMediaCondition(breakpoint);
    var downMediaCondition = getDownMediaCondition(breakpoint);
    var onlyMediaCondition = index === lastBreakpointIndex ? upMediaCondition : upMediaCondition + " and " + getDownMediaCondition(breakpointEntries[index + 1][1]);
    return [breakpointsTokenName, {
      // Media condition for the current breakpoint and up
      up: upMediaCondition,
      // Media condition for current breakpoint and down
      down: downMediaCondition,
      // Media condition for only the current breakpoint
      only: onlyMediaCondition
    }];
  }));
}
function getUpMediaCondition(breakpoint) {
  return "(min-width: " + toEm(breakpoint) + ")";
}
function getDownMediaCondition(breakpoint) {
  var _toPx;
  var offsetBreakpoint = parseFloat((_toPx = toPx(breakpoint)) != null ? _toPx : "") - 0.04;
  return "(max-width: " + toEm(offsetBreakpoint + "px") + ")";
}

// node_modules/@shopify/polaris-tokens/dist/esm/src/token-groups/border.mjs
var border = {
  "border-radius-0-experimental": {
    value: "0px"
  },
  "border-radius-05": {
    value: "2px"
  },
  "border-radius-1": {
    value: "4px"
  },
  "border-radius-2": {
    value: "8px"
  },
  "border-radius-3": {
    value: "12px"
  },
  "border-radius-4": {
    value: "16px"
  },
  "border-radius-5": {
    value: "20px"
  },
  "border-radius-6": {
    value: "30px"
  },
  "border-radius-full": {
    value: "9999px"
  },
  "border-radius-1_5-experimental": {
    value: "6px"
  },
  "border-width-1": {
    value: "1px"
  },
  "border-width-2": {
    value: "2px"
  },
  "border-width-3": {
    value: "3px"
  },
  "border-width-4": {
    value: "4px"
  },
  "border-width-5": {
    value: "5px"
  },
  "border-width-1-experimental": {
    value: "0.66px"
  },
  "border-width-2-experimental": {
    value: "1px"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/token-groups/breakpoints.mjs
var breakpointsAliases = ["xs", "sm", "md", "lg", "xl"];
var breakpoints = {
  "breakpoints-xs": {
    value: "0px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  },
  "breakpoints-sm": {
    value: "490px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  },
  "breakpoints-md": {
    value: "768px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  },
  "breakpoints-lg": {
    value: "1040px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  },
  "breakpoints-xl": {
    value: "1440px",
    description: "Commonly used for sizing containers (e.g. max-width). See below for media query usage."
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/colors.mjs
var gray = {
  50: "rgba(255, 255, 255, 1)",
  100: "rgba(249, 250, 251, 1)",
  200: "rgba(241, 242, 244, 1)",
  300: "rgba(235, 236, 239, 1)",
  400: "rgba(221, 224, 228, 1)",
  500: "rgba(202, 206, 211, 1)",
  600: "rgba(171, 177, 186, 1)",
  700: "rgba(135, 144, 155, 1)",
  800: "rgba(97, 106, 117, 1)",
  900: "rgba(31, 33, 36, 1)"
};
var green = {
  50: "rgba(240, 253, 248, 1)",
  100: "rgba(224, 248, 238, 1)",
  200: "rgba(192, 242, 221, 1)",
  300: "rgba(161, 237, 208, 1)",
  400: "rgba(80, 220, 169, 1)",
  500: "rgba(35, 196, 140, 1)",
  600: "rgba(22, 166, 121, 1)",
  700: "rgba(0, 122, 92, 1)",
  800: "rgba(18, 84, 67, 1)",
  900: "rgba(12, 59, 47, 1)"
};
var blue = {
  50: "rgba(240, 245, 253, 1)",
  100: "rgba(232, 240, 253, 1)",
  200: "rgba(187, 212, 247, 1)",
  300: "rgba(147, 186, 241, 1)",
  400: "rgba(102, 153, 225, 1)",
  500: "rgba(62, 125, 213, 1)",
  600: "rgba(36, 99, 188, 1)",
  700: "rgba(20, 73, 149, 1)",
  800: "rgba(14, 53, 108, 1)",
  900: "rgba(16, 41, 76, 1)"
};
var red = {
  50: "rgba(254, 243, 241, 1)",
  100: "rgba(253, 226, 221, 1)",
  200: "rgba(251, 197, 188, 1)",
  300: "rgba(247, 148, 130, 1)",
  400: "rgba(245, 107, 82, 1)",
  500: "rgba(242, 65, 34, 1)",
  600: "rgba(197, 40, 12, 1)",
  700: "rgba(159, 32, 10, 1)",
  800: "rgba(115, 24, 7, 1)",
  900: "rgba(67, 14, 4, 1)"
};
var yellow = {
  50: "rgba(254, 248, 236, 1)",
  100: "rgba(252, 240, 212, 1)",
  200: "rgba(250, 229, 178, 1)",
  300: "rgba(248, 217, 144, 1)",
  400: "rgba(245, 196, 82, 1)",
  500: "rgba(242, 179, 34, 1)",
  600: "rgba(216, 155, 13, 1)",
  700: "rgba(183, 126, 11, 1)",
  800: "rgba(135, 92, 8, 1)",
  900: "rgba(77, 46, 5, 1)"
};
var teal = {
  50: "rgba(238, 250, 251, 1)",
  100: "rgba(222, 245, 247, 1)",
  200: "rgba(184, 233, 239, 1)",
  300: "rgba(147, 222, 231, 1)",
  400: "rgba(109, 211, 222, 1)",
  500: "rgba(59, 195, 211, 1)",
  600: "rgba(42, 172, 187, 1)",
  700: "rgba(32, 130, 141, 1)",
  800: "rgba(23, 92, 100, 1)",
  900: "rgba(16, 65, 71, 1)"
};
var orange = {
  50: "rgba(254, 243, 236, 1)",
  100: "rgba(253, 231, 217, 1)",
  200: "rgba(250, 201, 168, 1)",
  300: "rgba(247, 177, 130, 1)",
  400: "rgba(245, 147, 82, 1)",
  500: "rgba(242, 117, 34, 1)",
  600: "rgba(216, 101, 13, 1)",
  700: "rgba(164, 76, 10, 1)",
  800: "rgba(111, 52, 7, 1)",
  900: "rgba(77, 36, 5, 1)"
};
var purple = {
  50: "rgba(242, 237, 253, 1)",
  100: "rgba(236, 227, 253, 1)",
  200: "rgba(226, 214, 250, 1)",
  300: "rgba(203, 180, 248, 1)",
  400: "rgba(173, 139, 241, 1)",
  500: "rgba(121, 69, 227, 1)",
  600: "rgba(90, 36, 205, 1)",
  700: "rgba(67, 21, 158, 1)",
  800: "rgba(49, 13, 120, 1)",
  900: "rgba(36, 8, 73, 1)"
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/colors-experimental.mjs
var gray2 = {
  "1": function _(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(255, 255, 255, " + alpha + ")";
  },
  "2": function _2(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(253, 253, 253, " + alpha + ")";
  },
  "3": function _3(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(250, 250, 250, " + alpha + ")";
  },
  "4": function _4(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(247, 247, 247, " + alpha + ")";
  },
  "5": function _5(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(243, 243, 243, " + alpha + ")";
  },
  "6": function _6(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(241, 241, 241, " + alpha + ")";
  },
  "7": function _7(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(235, 235, 235, " + alpha + ")";
  },
  "8": function _8(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(227, 227, 227, " + alpha + ")";
  },
  "9": function _9(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(212, 212, 212, " + alpha + ")";
  },
  "10": function _10(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(204, 204, 204, " + alpha + ")";
  },
  "11": function _11(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(181, 181, 181, " + alpha + ")";
  },
  "12": function _12(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(138, 138, 138, " + alpha + ")";
  },
  "13": function _13(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(97, 97, 97, " + alpha + ")";
  },
  "14": function _14(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(74, 74, 74, " + alpha + ")";
  },
  "15": function _15(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(48, 48, 48, " + alpha + ")";
  },
  "16": function _16(alpha) {
    if (alpha === void 0) {
      alpha = "1";
    }
    return "rgba(26, 26, 26, " + alpha + ")";
  }
};
var azure = {
  "1": "rgba(251, 253, 255, 1)",
  "2": "rgba(242, 249, 255, 1)",
  "3": "rgba(234, 244, 255, 1)",
  "4": "rgba(224, 240, 255, 1)",
  "5": "rgba(213, 235, 255, 1)",
  "6": "rgba(202, 230, 255, 1)",
  "7": "rgba(192, 225, 255, 1)",
  "8": "rgba(168, 216, 255, 1)",
  "9": "rgba(145, 208, 255, 1)",
  "10": "rgba(81, 192, 255, 1)",
  "11": "rgba(0, 148, 213, 1)",
  "12": "rgba(0, 124, 180, 1)",
  "13": "rgba(0, 103, 155, 1)",
  "14": "rgba(0, 82, 124, 1)",
  "15": "rgba(0, 58, 90, 1)",
  "16": "rgba(0, 33, 51, 1)"
};
var blue2 = {
  "1": "rgba(252, 253, 255, 1)",
  "2": "rgba(246, 248, 255, 1)",
  "3": "rgba(240, 242, 255, 1)",
  "4": "rgba(234, 237, 255, 1)",
  "5": "rgba(226, 231, 255, 1)",
  "6": "rgba(219, 225, 255, 1)",
  "7": "rgba(213, 220, 255, 1)",
  "8": "rgba(197, 208, 255, 1)",
  "9": "rgba(186, 199, 255, 1)",
  "10": "rgba(151, 173, 255, 1)",
  "11": "rgba(65, 136, 255, 1)",
  "12": "rgba(0, 113, 233, 1)",
  "13": "rgba(0, 91, 211, 1)",
  "14": "rgba(0, 66, 153, 1)",
  "15": "rgba(0, 46, 106, 1)",
  "16": "rgba(0, 22, 51, 1)"
};
var cyan = {
  "1": "rgba(250, 255, 254, 1)",
  "2": "rgba(231, 252, 248, 1)",
  "3": "rgba(215, 251, 243, 1)",
  "4": "rgba(192, 249, 239, 1)",
  "5": "rgba(165, 247, 233, 1)",
  "6": "rgba(144, 244, 227, 1)",
  "7": "rgba(146, 237, 222, 1)",
  "8": "rgba(130, 227, 209, 1)",
  "9": "rgba(116, 219, 200, 1)",
  "10": "rgba(23, 199, 167, 1)",
  "11": "rgba(19, 163, 137, 1)",
  "12": "rgba(14, 132, 112, 1)",
  "13": "rgba(8, 107, 90, 1)",
  "14": "rgba(9, 83, 70, 1)",
  "15": "rgba(6, 56, 47, 1)",
  "16": "rgba(5, 36, 30, 1)"
};
var green2 = {
  "1": "rgba(248, 255, 251, 1)",
  "2": "rgba(227, 255, 237, 1)",
  "3": "rgba(205, 254, 225, 1)",
  "4": "rgba(180, 254, 210, 1)",
  "5": "rgba(146, 254, 194, 1)",
  "6": "rgba(99, 253, 176, 1)",
  "7": "rgba(56, 250, 163, 1)",
  "8": "rgba(53, 238, 155, 1)",
  "9": "rgba(50, 225, 147, 1)",
  "10": "rgba(46, 211, 137, 1)",
  "11": "rgba(50, 160, 110, 1)",
  "12": "rgba(41, 132, 90, 1)",
  "13": "rgba(19, 111, 69, 1)",
  "14": "rgba(12, 81, 50, 1)",
  "15": "rgba(8, 61, 37, 1)",
  "16": "rgba(9, 42, 27, 1)"
};
var magenta = {
  "1": "rgba(255, 253, 255, 1)",
  "2": "rgba(255, 245, 255, 1)",
  "3": "rgba(253, 239, 253, 1)",
  "4": "rgba(254, 231, 254, 1)",
  "5": "rgba(252, 223, 252, 1)",
  "6": "rgba(251, 215, 251, 1)",
  "7": "rgba(251, 207, 251, 1)",
  "8": "rgba(249, 190, 249, 1)",
  "9": "rgba(248, 177, 248, 1)",
  "10": "rgba(246, 141, 246, 1)",
  "11": "rgba(225, 86, 225, 1)",
  "12": "rgba(197, 48, 197, 1)",
  "13": "rgba(159, 38, 159, 1)",
  "14": "rgba(121, 26, 121, 1)",
  "15": "rgba(86, 16, 86, 1)",
  "16": "rgba(52, 6, 52, 1)"
};
var orange2 = {
  "1": "rgba(255, 253, 250, 1)",
  "2": "rgba(255, 247, 238, 1)",
  "3": "rgba(255, 241, 227, 1)",
  "4": "rgba(255, 235, 213, 1)",
  "5": "rgba(255, 228, 198, 1)",
  "6": "rgba(255, 221, 182, 1)",
  "7": "rgba(255, 214, 164, 1)",
  "8": "rgba(255, 200, 121, 1)",
  "9": "rgba(255, 184, 0, 1)",
  "10": "rgba(229, 165, 0, 1)",
  "11": "rgba(178, 132, 0, 1)",
  "12": "rgba(149, 111, 0, 1)",
  "13": "rgba(124, 88, 0, 1)",
  "14": "rgba(94, 66, 0, 1)",
  "15": "rgba(65, 45, 0, 1)",
  "16": "rgba(37, 26, 0, 1)"
};
var purple2 = {
  "1": "rgba(253, 253, 255, 1)",
  "2": "rgba(248, 247, 255, 1)",
  "3": "rgba(243, 241, 255, 1)",
  "4": "rgba(239, 236, 255, 1)",
  "5": "rgba(233, 229, 255, 1)",
  "6": "rgba(228, 222, 255, 1)",
  "7": "rgba(223, 217, 255, 1)",
  "8": "rgba(212, 204, 255, 1)",
  "9": "rgba(199, 188, 255, 1)",
  "10": "rgba(170, 149, 255, 1)",
  "11": "rgba(148, 116, 255, 1)",
  "12": "rgba(128, 81, 255, 1)",
  "13": "rgba(113, 38, 255, 1)",
  "14": "rgba(87, 0, 209, 1)",
  "15": "rgba(59, 0, 147, 1)",
  "16": "rgba(28, 0, 79, 1)"
};
var red2 = {
  "1": "rgba(255, 251, 251, 1)",
  "2": "rgba(255, 246, 246, 1)",
  "3": "rgba(255, 237, 236, 1)",
  "4": "rgba(254, 233, 232, 1)",
  "5": "rgba(254, 226, 225, 1)",
  "6": "rgba(254, 218, 217, 1)",
  "7": "rgba(254, 211, 209, 1)",
  "8": "rgba(254, 195, 193, 1)",
  "9": "rgba(253, 176, 172, 1)",
  "10": "rgba(253, 129, 122, 1)",
  "11": "rgba(239, 77, 47, 1)",
  "12": "rgba(229, 28, 0, 1)",
  "13": "rgba(181, 38, 11, 1)",
  "14": "rgba(142, 31, 11, 1)",
  "15": "rgba(95, 21, 7, 1)",
  "16": "rgba(47, 10, 4, 1)"
};
var rose = {
  "1": "rgba(255, 253, 253, 1)",
  "2": "rgba(255, 246, 248, 1)",
  "3": "rgba(255, 239, 243, 1)",
  "4": "rgba(255, 232, 238, 1)",
  "5": "rgba(255, 225, 232, 1)",
  "6": "rgba(255, 217, 227, 1)",
  "7": "rgba(254, 209, 221, 1)",
  "8": "rgba(254, 193, 210, 1)",
  "9": "rgba(254, 181, 202, 1)",
  "10": "rgba(254, 142, 177, 1)",
  "11": "rgba(253, 75, 146, 1)",
  "12": "rgba(227, 12, 118, 1)",
  "13": "rgba(185, 7, 95, 1)",
  "14": "rgba(141, 4, 72, 1)",
  "15": "rgba(100, 2, 49, 1)",
  "16": "rgba(62, 1, 28, 1)"
};
var yellow2 = {
  "1": "rgba(255, 253, 246, 1)",
  "2": "rgba(255, 248, 219, 1)",
  "3": "rgba(255, 244, 191, 1)",
  "4": "rgba(255, 239, 157, 1)",
  "5": "rgba(255, 235, 120, 1)",
  "6": "rgba(255, 230, 0, 1)",
  "7": "rgba(247, 223, 0, 1)",
  "8": "rgba(234, 211, 0, 1)",
  "9": "rgba(225, 203, 0, 1)",
  "10": "rgba(197, 178, 0, 1)",
  "11": "rgba(153, 138, 0, 1)",
  "12": "rgba(130, 117, 0, 1)",
  "13": "rgba(105, 95, 0, 1)",
  "14": "rgba(79, 71, 0, 1)",
  "15": "rgba(51, 46, 0, 1)",
  "16": "rgba(31, 28, 0, 1)"
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/token-groups/color.mjs
var color = {
  "color-bg-inverse": {
    value: gray[900],
    valueExperimental: gray2[16](),
    description: ""
  },
  "color-bg-inset-strong": {
    value: gray[800],
    valueExperimental: gray2[15](),
    description: ""
  },
  "color-bg-inverse-hover": {
    value: gray[800],
    valueExperimental: gray2[14](),
    description: ""
  },
  "color-bg-inverse-active": {
    value: gray[700],
    valueExperimental: gray2[13](),
    description: ""
  },
  "color-bg-strong-hover": {
    value: gray[500],
    valueExperimental: gray2[9](),
    description: ""
  },
  "color-bg-strong-active": {
    value: gray[500],
    valueExperimental: gray2[10](),
    description: ""
  },
  "color-bg-strong": {
    value: gray[400],
    valueExperimental: gray2[8](),
    description: ""
  },
  "color-bg-subdued-active": {
    value: gray[300],
    valueExperimental: gray2[7](),
    description: ""
  },
  "color-bg-disabled": {
    value: gray[300],
    valueExperimental: gray2[7](),
    description: ""
  },
  "color-bg-interactive-disabled": {
    value: gray[300],
    valueExperimental: gray2[7](),
    description: ""
  },
  "color-bg-app": {
    value: gray[200],
    valueExperimental: gray2[6](),
    description: ""
  },
  "color-bg-app-active": {
    value: gray[400],
    description: ""
  },
  "color-bg-app-hover": {
    value: gray[300],
    valueExperimental: gray2[2](),
    description: ""
  },
  "color-bg-app-selected": {
    value: gray[300],
    valueExperimental: gray2[3](),
    description: ""
  },
  "color-bg-active": {
    value: gray[300],
    valueExperimental: gray2[4](),
    description: ""
  },
  "color-bg-subdued-hover": {
    value: gray[200],
    valueExperimental: gray2[6](),
    description: ""
  },
  "color-bg-inset": {
    value: gray[200],
    valueExperimental: gray2[6](),
    description: ""
  },
  "color-bg-hover": {
    value: gray[200],
    valueExperimental: gray2[3](),
    description: ""
  },
  "color-bg-subdued": {
    value: gray[100],
    valueExperimental: gray2[4](),
    description: ""
  },
  "color-bg-input": {
    value: gray[50],
    valueExperimental: gray2[1](),
    description: ""
  },
  "color-bg": {
    value: gray[50],
    valueExperimental: gray2[1](),
    description: ""
  },
  "color-bg-primary-active": {
    value: green[900],
    valueExperimental: gray2[16](),
    description: ""
  },
  "color-bg-primary-hover": {
    value: green[800],
    valueExperimental: gray2[16](),
    description: ""
  },
  "color-bg-primary": {
    value: green[700],
    valueExperimental: gray2[15](),
    description: ""
  },
  "color-bg-success-strong": {
    value: green[600],
    valueExperimental: green2[12],
    description: ""
  },
  "color-bg-success": {
    value: green[300],
    valueExperimental: green2[3],
    description: ""
  },
  "color-bg-primary-subdued-active": {
    value: green[200],
    valueExperimental: gray2[6](),
    description: ""
  },
  "color-bg-success-subdued-active": {
    value: green[200],
    description: ""
  },
  "color-bg-success-subdued": {
    value: green[100],
    valueExperimental: green2[3],
    description: ""
  },
  "color-bg-primary-subdued-hover": {
    value: green[100],
    valueExperimental: gray2[7](),
    description: ""
  },
  "color-bg-success-subdued-hover": {
    value: green[50],
    valueExperimental: green2[5],
    description: ""
  },
  "color-bg-primary-subdued": {
    value: green[50],
    valueExperimental: gray2[8](),
    description: ""
  },
  "color-bg-primary-subdued-selected": {
    value: green[50],
    valueExperimental: gray2[6](),
    description: ""
  },
  "color-bg-critical-strong-active": {
    value: red[800],
    valueExperimental: red2[14],
    description: ""
  },
  "color-bg-critical-strong-hover": {
    value: red[700],
    valueExperimental: red2[13],
    description: ""
  },
  "color-bg-critical-strong": {
    value: red[600],
    valueExperimental: red2[12],
    description: ""
  },
  "color-bg-critical-subdued-active": {
    value: red[200],
    valueExperimental: red2[6],
    description: ""
  },
  "color-bg-critical": {
    value: red[200],
    valueExperimental: red2[6],
    description: ""
  },
  "color-bg-critical-subdued": {
    value: red[100],
    valueExperimental: red2[4],
    description: ""
  },
  "color-bg-critical-subdued-hover": {
    value: red[50],
    valueExperimental: red2[5],
    description: ""
  },
  "color-bg-caution-strong": {
    value: yellow[600],
    valueExperimental: yellow2[6],
    description: ""
  },
  "color-bg-caution": {
    value: yellow[300],
    valueExperimental: yellow2[4],
    description: ""
  },
  "color-bg-caution-subdued-active": {
    value: yellow[200],
    valueExperimental: yellow2[4],
    description: ""
  },
  "color-bg-caution-subdued": {
    value: yellow[100],
    valueExperimental: yellow2[2],
    description: ""
  },
  "color-bg-caution-subdued-hover": {
    value: yellow[50],
    valueExperimental: yellow2[3],
    description: ""
  },
  "color-bg-info-strong": {
    value: teal[600],
    valueExperimental: azure[9],
    description: ""
  },
  "color-bg-info-subdued-active": {
    value: teal[200],
    valueExperimental: azure[6],
    description: ""
  },
  "color-bg-info": {
    value: teal[200],
    valueExperimental: azure[4],
    description: ""
  },
  "color-bg-info-subdued": {
    value: teal[100],
    valueExperimental: azure[3],
    description: ""
  },
  "color-bg-info-subdued-hover": {
    value: teal[50],
    valueExperimental: azure[4],
    description: ""
  },
  "color-bg-interactive-active": {
    value: blue[800],
    valueExperimental: gray2[14](),
    description: ""
  },
  "color-bg-interactive-hover": {
    value: blue[700],
    valueExperimental: gray2[15](),
    description: ""
  },
  "color-bg-interactive": {
    value: blue[600],
    valueExperimental: gray2[16](),
    description: ""
  },
  "color-bg-interactive-subdued-active": {
    value: blue[200],
    valueExperimental: gray2[6](),
    description: ""
  },
  "color-bg-interactive-subdued-hover": {
    value: blue[100],
    valueExperimental: gray2[7](),
    description: ""
  },
  "color-bg-interactive-subdued": {
    value: blue[50],
    valueExperimental: gray2[8](),
    description: ""
  },
  "color-bg-interactive-selected": {
    value: blue[50],
    valueExperimental: gray2[6](),
    description: ""
  },
  "color-bg-warning": {
    value: orange[200],
    valueExperimental: orange2[7],
    description: ""
  },
  "color-bg-magic-strong": {
    value: purple[500],
    valueExperimental: purple2[12],
    description: ""
  },
  "color-bg-magic-hover": {
    value: purple[200],
    valueExperimental: purple2[7],
    description: ""
  },
  "color-bg-magic-active": {
    value: purple[300],
    valueExperimental: purple2[8],
    description: ""
  },
  "color-bg-magic": {
    value: purple[100],
    valueExperimental: purple2[6],
    description: ""
  },
  "color-bg-magic-subdued-hover": {
    value: purple[100],
    valueExperimental: purple2[4],
    description: ""
  },
  "color-bg-magic-subdued-active": {
    value: purple[200],
    valueExperimental: purple2[6],
    description: ""
  },
  "color-bg-magic-subdued": {
    value: purple[50],
    valueExperimental: purple2[3],
    description: ""
  },
  "color-border-input-hover": {
    value: gray[800],
    valueExperimental: gray2[13](),
    description: ""
  },
  "color-border-inverse": {
    value: gray[800],
    valueExperimental: gray2[13](),
    description: ""
  },
  "color-border-strong-hover": {
    value: gray[700],
    valueExperimental: gray2[11](),
    description: ""
  },
  "color-border-input": {
    value: gray[600],
    valueExperimental: gray2[12](),
    description: ""
  },
  "color-border-hover": {
    value: gray[600],
    valueExperimental: gray2[10](),
    description: ""
  },
  "color-border-strong": {
    value: gray[600],
    valueExperimental: gray2[10](),
    description: ""
  },
  "color-border": {
    value: gray[500],
    valueExperimental: gray2[8](),
    description: ""
  },
  "color-border-disabled": {
    value: gray[400],
    valueExperimental: gray2[7](),
    description: ""
  },
  "color-border-subdued": {
    value: gray[400],
    valueExperimental: gray2[7](),
    description: ""
  },
  "color-border-interactive-disabled": {
    value: gray[400],
    valueExperimental: gray2[7](),
    description: ""
  },
  "color-border-primary": {
    value: green[700],
    valueExperimental: gray2[8](),
    description: ""
  },
  "color-border-success": {
    value: green[600],
    valueExperimental: green2[5],
    description: ""
  },
  "color-border-success-subdued": {
    value: green[400],
    valueExperimental: green2[5],
    description: ""
  },
  "color-border-critical-active": {
    value: red[900],
    valueExperimental: red2[11],
    description: ""
  },
  "color-border-critical-hover": {
    value: red[800],
    valueExperimental: red2[10],
    description: ""
  },
  "color-border-critical": {
    value: red[600],
    valueExperimental: red2[9],
    description: ""
  },
  "color-border-critical-subdued": {
    value: red[400],
    valueExperimental: red2[9],
    description: ""
  },
  "color-border-caution": {
    value: yellow[600],
    valueExperimental: yellow2[5],
    description: ""
  },
  "color-border-caution-subdued": {
    value: yellow[400],
    valueExperimental: yellow2[5],
    description: ""
  },
  "color-border-info": {
    value: teal[500],
    valueExperimental: azure[9],
    description: ""
  },
  "color-border-info-subdued": {
    value: teal[400],
    valueExperimental: azure[9],
    description: ""
  },
  "color-border-interactive-active": {
    value: blue[800],
    valueExperimental: blue2[15],
    description: ""
  },
  "color-border-interactive-hover": {
    value: blue[700],
    valueExperimental: blue2[14],
    description: ""
  },
  "color-border-interactive": {
    value: blue[500],
    valueExperimental: blue2[13],
    description: ""
  },
  "color-border-interactive-focus": {
    value: blue[500],
    valueExperimental: blue2[13],
    description: ""
  },
  "color-border-interactive-subdued": {
    value: blue[200],
    valueExperimental: blue2[13],
    description: ""
  },
  "color-border-magic-strong": {
    value: purple[500],
    valueExperimental: purple2[12],
    description: ""
  },
  "color-border-magic": {
    value: purple[400],
    valueExperimental: purple2[10],
    description: ""
  },
  "color-icon-hover": {
    value: gray[900],
    valueExperimental: gray2[15](),
    description: ""
  },
  "color-icon": {
    value: gray[800],
    valueExperimental: gray2[14](),
    description: ""
  },
  "color-icon-active": {
    value: gray[900],
    description: ""
  },
  "color-icon-subdued": {
    value: gray[700],
    valueExperimental: gray2[12](),
    description: ""
  },
  "color-icon-disabled": {
    value: gray[600],
    valueExperimental: gray2[10](),
    description: ""
  },
  "color-icon-interactive-disabled": {
    value: gray[600],
    valueExperimental: gray2[10](),
    description: ""
  },
  "color-icon-inverse": {
    value: gray[400],
    valueExperimental: gray2[8](),
    description: ""
  },
  "color-icon-on-color": {
    value: gray[50],
    valueExperimental: gray2[1](),
    description: ""
  },
  "color-icon-primary": {
    value: green[700],
    valueExperimental: gray2[16](),
    description: ""
  },
  "color-icon-success": {
    value: green[600],
    valueExperimental: green2[12],
    description: ""
  },
  "color-icon-critical": {
    value: red[600],
    valueExperimental: red2[11],
    description: ""
  },
  "color-icon-caution": {
    value: yellow[700],
    valueExperimental: yellow2[11],
    description: ""
  },
  "color-icon-info": {
    value: teal[600],
    valueExperimental: azure[11],
    description: ""
  },
  "color-icon-warning": {
    value: orange[500],
    valueExperimental: orange2[11],
    description: ""
  },
  "color-icon-interactive-active": {
    value: blue[800],
    valueExperimental: blue2[15],
    description: ""
  },
  "color-icon-interactive-hover": {
    value: blue[700],
    valueExperimental: blue2[14],
    description: ""
  },
  "color-icon-interactive": {
    value: blue[600],
    valueExperimental: blue2[13],
    description: ""
  },
  "color-icon-interactive-inverse": {
    value: blue[400],
    valueExperimental: blue2[8],
    description: ""
  },
  "color-icon-magic": {
    value: purple[500],
    valueExperimental: purple2[13],
    description: ""
  },
  "color-text": {
    value: gray[900],
    valueExperimental: gray2[15](),
    description: ""
  },
  "color-text-subdued": {
    value: gray[800],
    valueExperimental: gray2[13](),
    description: ""
  },
  "color-text-disabled": {
    value: gray[700],
    valueExperimental: gray2[11](),
    description: ""
  },
  "color-text-interactive-disabled": {
    value: gray[700],
    valueExperimental: gray2[10](),
    description: ""
  },
  "color-text-inverse-subdued": {
    value: gray[600],
    valueExperimental: gray2[10](),
    description: ""
  },
  "color-text-inverse": {
    value: gray[200],
    valueExperimental: gray2[8](),
    description: ""
  },
  "color-text-on-color": {
    value: gray[50],
    valueExperimental: gray2[1](),
    description: ""
  },
  "color-text-success-strong": {
    value: green[900],
    valueExperimental: green2[15],
    description: ""
  },
  "color-text-success": {
    value: green[700],
    valueExperimental: green2[15],
    description: ""
  },
  "color-text-primary": {
    value: green[700],
    valueExperimental: gray2[14](),
    description: ""
  },
  "color-text-primary-hover": {
    value: green[800],
    valueExperimental: gray2[14](),
    description: ""
  },
  "color-text-critical-strong": {
    value: red[900],
    valueExperimental: red2[14],
    description: ""
  },
  "color-text-critical-active": {
    value: red[800],
    valueExperimental: red2[16],
    description: ""
  },
  "color-text-critical": {
    value: red[600],
    valueExperimental: red2[14],
    description: ""
  },
  "color-text-caution-strong": {
    value: yellow[900],
    valueExperimental: yellow2[15],
    description: ""
  },
  "color-text-caution": {
    value: yellow[800],
    valueExperimental: yellow2[15],
    description: ""
  },
  "color-text-info-strong": {
    value: teal[900],
    valueExperimental: azure[16],
    description: ""
  },
  "color-text-info": {
    value: teal[700],
    valueExperimental: azure[14],
    description: ""
  },
  "color-text-warning-strong": {
    value: orange[900],
    valueExperimental: orange2[16],
    description: ""
  },
  "color-text-interactive-active": {
    value: blue[800],
    valueExperimental: blue2[15],
    description: ""
  },
  "color-text-interactive-hover": {
    value: blue[700],
    valueExperimental: blue2[14],
    description: ""
  },
  "color-text-interactive": {
    value: blue[600],
    valueExperimental: blue2[13],
    description: ""
  },
  "color-text-interactive-inverse": {
    value: blue[400],
    valueExperimental: blue2[8],
    description: ""
  },
  "color-text-magic-strong": {
    value: purple[800],
    valueExperimental: purple2[15],
    description: ""
  },
  "color-text-magic": {
    value: purple[600],
    valueExperimental: purple2[14],
    description: ""
  },
  // Experimental tokens
  "color-bg-backdrop-experimental": {
    value: gray2[16]("0.75"),
    description: ""
  },
  "color-bg-primary-disabled-experimental": {
    value: gray2[9](),
    description: ""
  },
  "color-bg-secondary-experimental": {
    value: gray2[5](),
    description: ""
  },
  "color-bg-secondary-disabled-experimental": {
    value: gray2[4](),
    description: ""
  },
  "color-bg-input-hover-experimental": {
    value: gray2[3](),
    description: ""
  },
  "color-border-input-active-experimental": {
    value: gray2[16]()
  },
  "color-border-critical-strong-experimental": {
    value: red2[14]
  },
  "color-bg-input-active-experimental": {
    value: gray2[4](),
    description: ""
  },
  "color-bg-transparent-experimental": {
    value: gray2[16]("0"),
    description: ""
  },
  "color-bg-transparent-subdued-experimental": {
    value: gray2[16]("0.05"),
    description: ""
  },
  "color-bg-transparent-hover-experimental": {
    value: gray2[16]("0.05"),
    description: ""
  },
  "color-bg-transparent-active-experimental": {
    value: gray2[16]("0.07"),
    description: ""
  },
  "color-bg-transparent-disabled-experimental": {
    value: gray2[16]("0.04"),
    description: ""
  },
  "color-bg-transparent-secondary-disabled-experimental": {
    value: gray2[16]("0.08"),
    description: ""
  },
  "color-bg-transparent-primary-disabled-experimental": {
    value: gray2[16]("0.18"),
    description: ""
  },
  "color-bg-transparent-primary-experimental": {
    value: gray2[16]("0.60"),
    description: ""
  },
  "color-bg-inverse-transparent-hover-experimental": {
    value: gray2[1]("0.1"),
    description: ""
  },
  "color-bg-inverse-transparent-active-experimental": {
    value: gray2[1]("0.2"),
    description: ""
  },
  "color-bg-success-strong-hover-experimental": {
    value: green2[13],
    description: ""
  },
  "color-bg-success-strong-active-experimental": {
    value: green2[14],
    description: ""
  },
  "color-bg-warning-subdued-experimental": {
    value: orange2[3],
    description: ""
  },
  "color-bg-warning-strong-experimental": {
    value: orange2[9],
    description: ""
  },
  "color-text-warning-experimental": {
    value: orange2[15],
    description: ""
  },
  "color-text-critical-hover-experimental": {
    value: red2[15],
    description: ""
  },
  "color-icon-info-strong-experimental": {
    value: azure[14],
    description: ""
  },
  "color-icon-warning-strong-experimental": {
    value: orange2[13],
    description: ""
  },
  "color-icon-success-strong-experimental": {
    value: green2[14],
    description: ""
  },
  "color-icon-critical-strong-experimental": {
    value: red2[14],
    description: ""
  },
  "color-icon-critical-strong-hover-experimental": {
    value: red2[15],
    description: ""
  },
  "color-icon-critical-strong-active-experimental": {
    value: red2[16],
    description: ""
  },
  "color-avatar-background-experimental": {
    value: gray2[11](),
    description: ""
  },
  "color-avatar-color-experimental": {
    value: gray2[1](),
    description: ""
  },
  "color-avatar-style-one-background-experimental": {
    value: magenta[7],
    description: ""
  },
  "color-avatar-style-one-color-experimental": {
    value: magenta[14],
    description: ""
  },
  "color-avatar-style-two-background-experimental": {
    value: green2[7],
    description: ""
  },
  "color-avatar-style-two-color-experimental": {
    value: green2[14],
    description: ""
  },
  "color-avatar-style-three-background-experimental": {
    value: cyan[7],
    description: ""
  },
  "color-avatar-style-three-color-experimental": {
    value: cyan[14],
    description: ""
  },
  "color-avatar-style-four-background-experimental": {
    value: azure[7],
    description: ""
  },
  "color-avatar-style-four-color-experimental": {
    value: azure[14],
    description: ""
  },
  "color-avatar-style-five-background-experimental": {
    value: rose[7],
    description: ""
  },
  "color-avatar-style-five-color-experimental": {
    value: rose[14],
    description: ""
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/token-groups/font.mjs
var font = {
  "font-family-sans": {
    value: "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
  },
  "font-family-sans-experimental": {
    value: "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
  },
  "font-family-mono": {
    value: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace"
  },
  "font-size-70-experimental": {
    value: "11px"
  },
  "font-size-75": {
    value: "12px"
  },
  "font-size-80-experimental": {
    value: "13px"
  },
  "font-size-100": {
    value: "14px"
  },
  "font-size-200": {
    value: "16px"
  },
  "font-size-300": {
    value: "20px"
  },
  "font-size-400": {
    value: "24px"
  },
  "font-size-500": {
    value: "28px",
    valueExperimental: "30px"
  },
  "font-size-600": {
    value: "32px",
    valueExperimental: "36px"
  },
  "font-size-700": {
    value: "40px"
  },
  "font-weight-regular": {
    value: "400"
  },
  "font-weight-medium": {
    value: "500"
  },
  "font-weight-semibold": {
    value: "600"
  },
  "font-weight-bold": {
    value: "700"
  },
  "font-line-height-075-experimental": {
    value: "12px"
  },
  "font-line-height-1": {
    value: "16px"
  },
  "font-line-height-2": {
    value: "20px"
  },
  "font-line-height-3": {
    value: "24px"
  },
  "font-line-height-4": {
    value: "28px"
  },
  "font-line-height-5": {
    value: "32px"
  },
  "font-line-height-6": {
    value: "40px"
  },
  "font-line-height-7": {
    value: "48px"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/token-groups/motion.mjs
var motion = {
  "motion-duration-0": {
    value: "0ms"
  },
  "motion-duration-50": {
    value: "50ms"
  },
  "motion-duration-100": {
    value: "100ms"
  },
  "motion-duration-150": {
    value: "150ms"
  },
  "motion-duration-200": {
    value: "200ms"
  },
  "motion-duration-250": {
    value: "250ms"
  },
  "motion-duration-300": {
    value: "300ms"
  },
  "motion-duration-350": {
    value: "350ms"
  },
  "motion-duration-400": {
    value: "400ms"
  },
  "motion-duration-450": {
    value: "450ms"
  },
  "motion-duration-500": {
    value: "500ms"
  },
  "motion-duration-5000": {
    value: "5000ms"
  },
  "motion-ease": {
    value: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    description: "Responds quickly and finishes with control. A great default for any user interaction."
  },
  "motion-ease-in": {
    value: "cubic-bezier(0.42, 0, 1, 1)",
    description: "Starts slowly and finishes at top speed. Use sparingly."
  },
  "motion-ease-out": {
    value: "cubic-bezier(0, 0, 0.58, 1)",
    valueExperimental: "cubic-bezier(0.19,0.91,0.38,1)",
    description: "Starts at top speed and finishes slowly. Use sparingly."
  },
  "motion-ease-in-out": {
    value: "cubic-bezier(0.42, 0, 0.58, 1)",
    description: "Starts and finishes with equal speed. A good default for transitions triggered by the system."
  },
  "motion-linear": {
    value: "cubic-bezier(0, 0, 1, 1)",
    description: "Moves with constant speed. Use for continuous and mechanical animations, such as rotating spinners."
  },
  "motion-keyframes-bounce": {
    value: "{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }"
  },
  "motion-keyframes-fade-in": {
    value: "{ to { opacity: 1 } }"
  },
  "motion-keyframes-pulse": {
    value: "{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }"
  },
  "motion-keyframes-spin": {
    value: "{ to { transform: rotate(1turn) } }"
  },
  "motion-keyframes-appear-above": {
    value: "{ from { transform: translateY(var(--p-space-1)); opacity: 0; } to { transform: none; opacity: 1; } }"
  },
  "motion-keyframes-appear-below": {
    value: "{ from { transform: translateY(calc(var(--p-space-1) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/token-groups/shadow.mjs
var shadow = {
  "shadow-inset-lg": {
    value: "inset 0px 0px 7px 2px rgba(31, 33, 36, 0.18)",
    valueExperimental: "inset -1px 0px 1px rgba(0, 0, 0, 0.2), inset 1px 0px 1px rgba(0, 0, 0, 0.2), inset 0px 2px 1px rgba(0, 0, 0, 0.6)"
  },
  "shadow-inset-md": {
    value: "inset 0px 2px 4px rgba(31, 33, 36, 0.32)",
    valueExperimental: "inset -1px 0px 1px rgba(0, 0, 0, 0.12), inset 1px 0px 1px rgba(0, 0, 0, 0.12), inset 0px 2px 1px rgba(0, 0, 0, 0.2)"
  },
  "shadow-inset-sm": {
    value: "inset 0px 0px 3px rgba(31, 33, 36, 0.56)",
    valueExperimental: "inset 0px 1px 1px rgba(0, 0, 0, 0.15), inset 0px 1px 2px rgba(255, 255, 255, 0.15)"
  },
  "shadow-none": {
    value: "none"
  },
  "shadow-xs": {
    value: "0px 0px 2px rgba(31, 33, 36, 0.24)",
    valueExperimental: "0px 1px 0px rgba(0, 0, 0, 0.07)"
  },
  "shadow-sm": {
    value: "0px 1px 1px rgba(31, 33, 36, 0.1)",
    valueExperimental: "0px 3px 1px -1px rgba(0, 0, 0, 0.07)"
  },
  "shadow-md": {
    value: "0px 2px 4px rgba(31, 33, 36, 0.1), 0px 1px 6px rgba(31, 33, 36, 0.05)",
    valueExperimental: "0px 4px 6px -2px rgba(0, 0, 0, 0.2)"
  },
  "shadow-lg": {
    value: "0px 4px 12px rgba(31, 33, 36, 0.2), 0px 2px 6px rgba(31, 33, 36, 0.05)",
    valueExperimental: "0px 8px 16px -4px rgba(0, 0, 0, 0.22)"
  },
  "shadow-xl": {
    value: "0px 4px 18px -2px rgba(31, 33, 36, 0.08), 0px 12px 18px -2px rgba(31, 33, 36, 0.15)",
    valueExperimental: "0px 12px 20px -8px rgba(0, 0, 0, 0.24)"
  },
  "shadow-2xl": {
    value: "0px 32px 32px rgba(31, 33, 36, 0.15), 0px 32px 56px -2px rgba(31, 33, 36, 0.16)",
    valueExperimental: "0px 20px 20px -8px rgba(0, 0, 0, 0.28)"
  },
  "shadow-bevel-experimental": {
    value: "1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, -1px 0px 0px 0px rgba(0, 0, 0, 0.13) inset, 0px -1px 0px 0px rgba(0, 0, 0, 0.17) inset, 0px 1px 0px 0px rgba(204, 204, 204, 0.5) inset"
  },
  "shadow-card-sm-experimental": {
    value: "0px 2px 0px rgba(0, 0, 0, 0.07), 0px 1px 0px rgba(0, 0, 0, 0.07), 1px 0px 0px #E3E3E3, -1px 0px 0px #E3E3E3, 0px -1px 0px #E3E3E3"
  },
  "shadow-card-md-experimental": {
    value: "0px 3px 1px -1px rgba(0, 0, 0, 0.07),  0px -1px 0px 0px rgba(0, 0, 0, 0.16),  1px 0px 0px 0px rgba(227, 227, 227, 1),  -1px 0px 0px 0px rgba(227, 227, 227, 1),  0px 1px 0px 0px rgba(227, 227, 227, 1)"
  },
  "shadow-card-lg-experimental": {
    value: "0px 4px 6px -2px rgba(0, 0, 0, 0.2), inset 0px -1px 0px #D4D4D4, inset -1px 0px 0px #E3E3E3, inset 1px 0px 0px #E3E3E3, inset 0px 1px 0px #E3E3E3"
  },
  "shadow-button-experimental": {
    value: "inset 0px -1px 0px #B5B5B5, inset -1px 0px 0px #E3E3E3, inset 1px 0px 0px #E3E3E3, inset 0px 1px 0px #E3E3E3"
  },
  "shadow-button-disabled-experimental": {
    value: "inset 0px 0px 0px 1px rgba(227, 227, 227, 1)"
  },
  "shadow-button-primary-inset-experimental": {
    value: "0px 2px 0px 0px #000 inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset"
  },
  "shadow-button-primary-strong-inset-experimental": {
    value: "0px 3px 0px 0px #000 inset"
  },
  "shadow-button-primary-strong-hover-experimental": {
    value: "0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.16) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.16) inset, 0px -1.5px 0px 0px rgba(255, 255, 255, 0.07) inset, 0px 0px 0px 0.5px #1A1A1A"
  },
  "shadow-button-primary-strong-experimental": {
    value: "0px 2px 0px 0px rgba(255, 255, 255, 0.2) inset, 2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -2px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1px 0px 1px #000 inset, 0px 1px 0px 0px #000 inset"
  },
  "shadow-button-primary-experimental": {
    value: "0px 1px 0px 0px rgba(255, 255, 255, 0.4) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, -1px 0px 0px 0px rgba(255, 255, 255, 0.2) inset, 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25) inset"
  },
  "shadow-button-primary-hover-experimental": {
    value: "-1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 1px 0px 0px 0px rgba(255, 255, 255, 0.20) inset, 0px 0.5px 0px 0px rgba(0, 0, 0, 0.25), 0px -1.5px 0px 0px rgba(255, 255, 255, 0.07) inset, 0px 1px 0px 0px rgba(255, 255, 255, 0.24) inset"
  },
  "shadow-button-inset-experimental": {
    value: "0px 2px 0px 0px rgba(0, 0, 0, 0.60) inset, 1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset, -1px 0px 1px 0px rgba(0, 0, 0, 0.20) inset"
  },
  "shadow-border-inset-experimental": {
    value: "0px 0px 0px 1px rgba(0, 0, 0, 0.08) inset"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/token-groups/space.mjs
var space = {
  "space-0": {
    value: "0"
  },
  "space-025": {
    value: "1px"
  },
  "space-05": {
    value: "2px"
  },
  "space-1": {
    value: "4px"
  },
  "space-1_5-experimental": {
    value: "6px"
  },
  "space-2": {
    value: "8px"
  },
  "space-3": {
    value: "12px"
  },
  "space-4": {
    value: "16px"
  },
  "space-5": {
    value: "20px"
  },
  "space-6": {
    value: "24px"
  },
  "space-8": {
    value: "32px"
  },
  "space-10": {
    value: "40px"
  },
  "space-12": {
    value: "48px"
  },
  "space-16": {
    value: "64px"
  },
  "space-20": {
    value: "80px"
  },
  "space-24": {
    value: "96px"
  },
  "space-28": {
    value: "112px"
  },
  "space-32": {
    value: "128px"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/token-groups/zIndex.mjs
var zIndex = {
  "z-index-1": {
    value: "100"
  },
  "z-index-2": {
    value: "400"
  },
  "z-index-3": {
    value: "510"
  },
  "z-index-4": {
    value: "512"
  },
  "z-index-5": {
    value: "513"
  },
  "z-index-6": {
    value: "514"
  },
  "z-index-7": {
    value: "515"
  },
  "z-index-8": {
    value: "516"
  },
  "z-index-9": {
    value: "517"
  },
  "z-index-10": {
    value: "518"
  },
  "z-index-11": {
    value: "519"
  },
  "z-index-12": {
    value: "520"
  }
};

// node_modules/@shopify/polaris-tokens/dist/esm/src/metadata.mjs
var metadata = createMetadata({
  breakpoints: tokensToRems(breakpoints),
  border: tokensToRems(border),
  color,
  font: tokensToRems(font),
  motion,
  shadow: tokensToRems(shadow),
  space: tokensToRems(space),
  zIndex
});
function createMetadata(metadata2) {
  return metadata2;
}

// node_modules/@shopify/polaris-tokens/dist/esm/build/index.mjs
var breakpoints2 = {
  "breakpoints-xs": "0rem",
  "breakpoints-sm": "30.625rem",
  "breakpoints-md": "48rem",
  "breakpoints-lg": "65rem",
  "breakpoints-xl": "90rem"
};
var motion2 = {
  "motion-duration-0": "0ms",
  "motion-duration-50": "50ms",
  "motion-duration-100": "100ms",
  "motion-duration-150": "150ms",
  "motion-duration-200": "200ms",
  "motion-duration-250": "250ms",
  "motion-duration-300": "300ms",
  "motion-duration-350": "350ms",
  "motion-duration-400": "400ms",
  "motion-duration-450": "450ms",
  "motion-duration-500": "500ms",
  "motion-duration-5000": "5000ms",
  "motion-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "motion-ease-in": "cubic-bezier(0.42, 0, 1, 1)",
  "motion-ease-out": "cubic-bezier(0, 0, 0.58, 1)",
  "motion-ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
  "motion-linear": "cubic-bezier(0, 0, 1, 1)",
  "motion-keyframes-bounce": "{ from, 65%, 85% { transform: scale(1) } 75% { transform: scale(0.85) } 82.5% { transform: scale(1.05) } }",
  "motion-keyframes-fade-in": "{ to { opacity: 1 } }",
  "motion-keyframes-pulse": "{ from, 75% { transform: scale(0.85); opacity: 1; } to { transform: scale(2.5); opacity: 0; } }",
  "motion-keyframes-spin": "{ to { transform: rotate(1turn) } }",
  "motion-keyframes-appear-above": "{ from { transform: translateY(var(--p-space-1)); opacity: 0; } to { transform: none; opacity: 1; } }",
  "motion-keyframes-appear-below": "{ from { transform: translateY(calc(var(--p-space-1) * -1)); opacity: 0; } to { transform: none; opacity: 1; } }"
};
var space2 = {
  "space-0": "0",
  "space-025": "0.0625rem",
  "space-05": "0.125rem",
  "space-1": "0.25rem",
  "space-1_5-experimental": "0.375rem",
  "space-2": "0.5rem",
  "space-3": "0.75rem",
  "space-4": "1rem",
  "space-5": "1.25rem",
  "space-6": "1.5rem",
  "space-8": "2rem",
  "space-10": "2.5rem",
  "space-12": "3rem",
  "space-16": "4rem",
  "space-20": "5rem",
  "space-24": "6rem",
  "space-28": "7rem",
  "space-32": "8rem"
};
var zIndex2 = {
  "z-index-1": "100",
  "z-index-2": "400",
  "z-index-3": "510",
  "z-index-4": "512",
  "z-index-5": "513",
  "z-index-6": "514",
  "z-index-7": "515",
  "z-index-8": "516",
  "z-index-9": "517",
  "z-index-10": "518",
  "z-index-11": "519",
  "z-index-12": "520"
};

// node_modules/@shopify/polaris/build/esm/utilities/debounce.js
function debounce(func, waitArg, options) {
  let lastArgs;
  let lastThis;
  let maxWait;
  let result;
  let timerId;
  let lastCallTime;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;
  const useRAF = !waitArg && waitArg !== 0;
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  const wait = waitArg || 0;
  if (typeof options === "object") {
    leading = Boolean(options.leading);
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : void 0;
    trailing = "trailing" in options ? Boolean(options.trailing) : trailing;
  }
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = void 0;
    lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function startTimer(pendingFunc, wait2) {
    if (useRAF) {
      cancelAnimationFrame(timerId);
      return requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait2);
  }
  function cancelTimer(id) {
    if (useRAF) {
      return cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return maxing && maxWait ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && maxWait && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = startTimer(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(Date.now());
  }
  function pending() {
    return timerId !== void 0;
  }
  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}

// node_modules/@shopify/polaris/build/esm/components/shared.js
var scrollable = {
  props: {
    "data-polaris-scrollable": true
  },
  selector: "[data-polaris-scrollable]"
};
var overlay = {
  props: {
    "data-polaris-overlay": true
  },
  selector: "[data-polaris-overlay]"
};
var layer = {
  props: {
    "data-polaris-layer": true
  },
  selector: "[data-polaris-layer]"
};
var unstyled = {
  props: {
    "data-polaris-unstyled": true
  },
  selector: "[data-polaris-unstyled]"
};
var dataPolarisTopBar = {
  props: {
    "data-polaris-top-bar": true
  },
  selector: "[data-polaris-top-bar]"
};
var portal = {
  props: ["data-portal-id"],
  selector: "[data-portal-id]"
};

// node_modules/@shopify/polaris/build/esm/utilities/breakpoints.js
var import_react3 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/target.js
var isServer = typeof window === "undefined" || typeof document === "undefined";

// node_modules/@shopify/polaris/build/esm/utilities/use-isomorphic-layout-effect.js
var import_react2 = __toESM(require_react());
var useIsomorphicLayoutEffect = isServer ? import_react2.useEffect : import_react2.useLayoutEffect;

// node_modules/@shopify/polaris/build/esm/utilities/breakpoints.js
var Breakpoints = {
  // TODO: Update to smDown
  navigationBarCollapsed: "767.95px",
  // TODO: Update to lgDown
  stackedContent: "1039.95px"
};
var noWindowMatches = {
  media: "",
  addListener: noop,
  removeListener: noop,
  matches: false,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: (_17) => true
};
function noop() {
}
function navigationBarCollapsed() {
  return typeof window === "undefined" ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}
function stackedContent() {
  return typeof window === "undefined" ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}
var breakpointsQueryEntries = getBreakpointsQueryEntries(breakpoints2);
function getMatches(defaults) {
  if (!isServer) {
    return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias, query]) => [directionAlias, window.matchMedia(query).matches]));
  }
  if (typeof defaults === "object" && defaults !== null) {
    return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias]) => [directionAlias, defaults[directionAlias] ?? false]));
  }
  return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias]) => [directionAlias, defaults ?? false]));
}
function useBreakpoints(options) {
  const [breakpoints3, setBreakpoints] = (0, import_react3.useState)(getMatches(options?.defaults));
  useIsomorphicLayoutEffect(() => {
    const mediaQueryLists = breakpointsQueryEntries.map(([_17, query]) => window.matchMedia(query));
    const handler = () => setBreakpoints(getMatches());
    mediaQueryLists.forEach((mql) => {
      if (mql.addListener) {
        mql.addListener(handler);
      } else {
        mql.addEventListener("change", handler);
      }
    });
    return () => {
      mediaQueryLists.forEach((mql) => {
        if (mql.removeListener) {
          mql.removeListener(handler);
        } else {
          mql.removeEventListener("change", handler);
        }
      });
    };
  }, []);
  return breakpoints3;
}
function getBreakpointsQueryEntries(breakpoints3) {
  const mediaConditionEntries = Object.entries(getMediaConditions(breakpoints3));
  return mediaConditionEntries.map(([breakpointsToken, mediaConditions]) => Object.entries(mediaConditions).map(([direction, mediaCondition]) => {
    const breakpointsAlias = breakpointsToken.split("-")[1];
    const directionAlias = `${breakpointsAlias}${capitalize(direction)}`;
    return [directionAlias, mediaCondition];
  })).flat();
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// node_modules/@shopify/polaris/build/esm/utilities/geometry.js
var Rect = class {
  static get zero() {
    return new Rect();
  }
  constructor({
    top = 0,
    left = 0,
    width = 0,
    height = 0
  } = {}) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }
  get center() {
    return {
      x: this.left + this.width / 2,
      y: this.top + this.height / 2
    };
  }
};
function getRectForNode(node) {
  if (!(node instanceof Element)) {
    return new Rect({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }
  const rect = node.getBoundingClientRect();
  return new Rect({
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height
  });
}

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/sticky-manager.js
var SIXTY_FPS = 1e3 / 60;
var StickyManager = class {
  constructor(container) {
    this.stickyItems = [];
    this.stuckItems = [];
    this.container = null;
    this.topBarOffset = 0;
    this.handleResize = debounce(() => {
      this.manageStickyItems();
    }, SIXTY_FPS, {
      leading: true,
      trailing: true,
      maxWait: SIXTY_FPS
    });
    this.handleScroll = debounce(() => {
      this.manageStickyItems();
    }, SIXTY_FPS, {
      leading: true,
      trailing: true,
      maxWait: SIXTY_FPS
    });
    if (container) {
      this.setContainer(container);
    }
  }
  registerStickyItem(stickyItem) {
    this.stickyItems.push(stickyItem);
  }
  unregisterStickyItem(nodeToRemove) {
    const nodeIndex = this.stickyItems.findIndex(({
      stickyNode
    }) => nodeToRemove === stickyNode);
    this.stickyItems.splice(nodeIndex, 1);
  }
  setContainer(el) {
    this.container = el;
    if (isDocument(el)) {
      this.setTopBarOffset(el);
    }
    this.container.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    this.manageStickyItems();
  }
  removeScrollListener() {
    if (this.container) {
      this.container.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("resize", this.handleResize);
    }
  }
  manageStickyItems() {
    if (this.stickyItems.length <= 0) {
      return;
    }
    const scrollTop = this.container ? scrollTopFor(this.container) : 0;
    const containerTop = getRectForNode(this.container).top + this.topBarOffset;
    this.stickyItems.forEach((stickyItem) => {
      const {
        handlePositioning
      } = stickyItem;
      const {
        sticky,
        top,
        left,
        width
      } = this.evaluateStickyItem(stickyItem, scrollTop, containerTop);
      this.updateStuckItems(stickyItem, sticky);
      handlePositioning(sticky, top, left, width);
    });
  }
  evaluateStickyItem(stickyItem, scrollTop, containerTop) {
    const {
      stickyNode,
      placeHolderNode,
      boundingElement,
      offset,
      disableWhenStacked
    } = stickyItem;
    if (disableWhenStacked && stackedContent().matches) {
      return {
        sticky: false,
        top: 0,
        left: 0,
        width: "auto"
      };
    }
    const stickyOffset = offset ? this.getOffset(stickyNode) + parseInt(space2["space-5"], 10) : this.getOffset(stickyNode);
    const scrollPosition2 = scrollTop + stickyOffset;
    const placeHolderNodeCurrentTop = placeHolderNode.getBoundingClientRect().top - containerTop + scrollTop;
    const top = containerTop + stickyOffset;
    const width = placeHolderNode.getBoundingClientRect().width;
    const left = placeHolderNode.getBoundingClientRect().left;
    let sticky;
    if (boundingElement == null) {
      sticky = scrollPosition2 >= placeHolderNodeCurrentTop;
    } else {
      const stickyItemHeight = stickyNode.getBoundingClientRect().height || stickyNode.firstElementChild?.getBoundingClientRect().height || 0;
      const stickyItemBottomPosition = boundingElement.getBoundingClientRect().bottom - stickyItemHeight + scrollTop - containerTop;
      sticky = scrollPosition2 >= placeHolderNodeCurrentTop && scrollPosition2 < stickyItemBottomPosition;
    }
    return {
      sticky,
      top,
      left,
      width
    };
  }
  updateStuckItems(item, sticky) {
    const {
      stickyNode
    } = item;
    if (sticky && !this.isNodeStuck(stickyNode)) {
      this.addStuckItem(item);
    } else if (!sticky && this.isNodeStuck(stickyNode)) {
      this.removeStuckItem(item);
    }
  }
  addStuckItem(stickyItem) {
    this.stuckItems.push(stickyItem);
  }
  removeStuckItem(stickyItem) {
    const {
      stickyNode: nodeToRemove
    } = stickyItem;
    const nodeIndex = this.stuckItems.findIndex(({
      stickyNode
    }) => nodeToRemove === stickyNode);
    this.stuckItems.splice(nodeIndex, 1);
  }
  getOffset(node) {
    if (this.stuckItems.length === 0) {
      return 0;
    }
    let offset = 0;
    let count = 0;
    const stuckNodesLength = this.stuckItems.length;
    const nodeRect = getRectForNode(node);
    while (count < stuckNodesLength) {
      const stuckNode = this.stuckItems[count].stickyNode;
      if (stuckNode !== node) {
        const stuckNodeRect = getRectForNode(stuckNode);
        if (!horizontallyOverlaps(nodeRect, stuckNodeRect)) {
          offset += getRectForNode(stuckNode).height;
        }
      } else {
        break;
      }
      count++;
    }
    return offset;
  }
  isNodeStuck(node) {
    const nodeFound = this.stuckItems.findIndex(({
      stickyNode
    }) => node === stickyNode);
    return nodeFound >= 0;
  }
  setTopBarOffset(container) {
    const topbarElement = container.querySelector(`:not(${scrollable.selector}) ${dataPolarisTopBar.selector}`);
    this.topBarOffset = topbarElement ? topbarElement.clientHeight : 0;
  }
};
function isDocument(node) {
  return node === document;
}
function scrollTopFor(container) {
  return isDocument(container) ? document.body.scrollTop || document.documentElement.scrollTop : container.scrollTop;
}
function horizontallyOverlaps(rect1, rect2) {
  const rect1Left = rect1.left;
  const rect1Right = rect1.left + rect1.width;
  const rect2Left = rect2.left;
  const rect2Right = rect2.left + rect2.width;
  return rect2Right < rect1Left || rect1Right < rect2Left;
}

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/scroll-lock-manager.js
var SCROLL_LOCKING_ATTRIBUTE = "data-lock-scrolling";
var SCROLL_LOCKING_HIDDEN_ATTRIBUTE = "data-lock-scrolling-hidden";
var SCROLL_LOCKING_WRAPPER_ATTRIBUTE = "data-lock-scrolling-wrapper";
var scrollPosition = 0;
function isScrollBarVisible() {
  const {
    body
  } = document;
  return body.scrollHeight > body.clientHeight;
}
var ScrollLockManager = class {
  constructor() {
    this.scrollLocks = 0;
    this.locked = false;
  }
  registerScrollLock() {
    this.scrollLocks += 1;
    this.handleScrollLocking();
  }
  unregisterScrollLock() {
    this.scrollLocks -= 1;
    this.handleScrollLocking();
  }
  handleScrollLocking() {
    if (isServer)
      return;
    const {
      scrollLocks
    } = this;
    const {
      body
    } = document;
    const wrapper = body.firstElementChild;
    if (scrollLocks === 0) {
      body.removeAttribute(SCROLL_LOCKING_ATTRIBUTE);
      body.removeAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE);
      if (wrapper) {
        wrapper.removeAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE);
      }
      window.scroll(0, scrollPosition);
      this.locked = false;
    } else if (scrollLocks > 0 && !this.locked) {
      scrollPosition = window.pageYOffset;
      body.setAttribute(SCROLL_LOCKING_ATTRIBUTE, "");
      if (!isScrollBarVisible()) {
        body.setAttribute(SCROLL_LOCKING_HIDDEN_ATTRIBUTE, "");
      }
      if (wrapper) {
        wrapper.setAttribute(SCROLL_LOCKING_WRAPPER_ATTRIBUTE, "");
        wrapper.scrollTop = scrollPosition;
      }
      this.locked = true;
    }
  }
  resetScrollPosition() {
    scrollPosition = 0;
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/get.js
var OBJECT_NOTATION_MATCHER = /\[(.*?)\]|(\w+)/g;
function get(obj, keypath, defaultValue) {
  if (obj == null)
    return void 0;
  const keys = Array.isArray(keypath) ? keypath : getKeypath(keypath);
  let acc = obj;
  for (let i = 0; i < keys.length; i++) {
    const val = acc[keys[i]];
    if (val === void 0)
      return defaultValue;
    acc = val;
  }
  return acc;
}
function getKeypath(str) {
  const path = [];
  let result;
  while (result = OBJECT_NOTATION_MATCHER.exec(str)) {
    const [, first, second] = result;
    path.push(first || second);
  }
  return path;
}

// node_modules/@shopify/polaris/build/esm/utilities/merge.js
function merge(...objs) {
  let final = {};
  for (const obj of objs) {
    final = mergeRecursively(final, obj);
  }
  return final;
}
function mergeRecursively(inputObjA, objB) {
  const objA = Array.isArray(inputObjA) ? [...inputObjA] : {
    ...inputObjA
  };
  for (const key in objB) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      continue;
    } else if (isMergeableValue(objB[key]) && isMergeableValue(objA[key])) {
      objA[key] = mergeRecursively(objA[key], objB[key]);
    } else {
      objA[key] = objB[key];
    }
  }
  return objA;
}
function isMergeableValue(value) {
  return value !== null && typeof value === "object";
}

// node_modules/@shopify/polaris/build/esm/utilities/i18n/I18n.js
var REPLACE_REGEX = /{([^}]*)}/g;
var I18n = class {
  /**
   * @param translation A locale object or array of locale objects that overrides default translations. If specifying an array then your desired language dictionary should come first, followed by your fallback language dictionaries
   */
  constructor(translation) {
    this.translation = {};
    this.translation = Array.isArray(translation) ? merge(...translation.slice().reverse()) : translation;
  }
  translate(id, replacements) {
    const text = get(this.translation, id, "");
    if (!text) {
      return "";
    }
    if (replacements) {
      return text.replace(REPLACE_REGEX, (match) => {
        const replacement = match.substring(1, match.length - 1);
        if (replacements[replacement] === void 0) {
          const replacementData = JSON.stringify(replacements);
          throw new Error(`Error in translation for key '${id}'. No replacement found for key '${replacement}'. The following replacements were passed: '${replacementData}'`);
        }
        return replacements[replacement];
      });
    }
    return text;
  }
  translationKeyExists(path) {
    return Boolean(get(this.translation, path));
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/i18n/context.js
var import_react4 = __toESM(require_react());
var I18nContext = /* @__PURE__ */ (0, import_react4.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/scroll-lock-manager/context.js
var import_react5 = __toESM(require_react());
var ScrollLockManagerContext = /* @__PURE__ */ (0, import_react5.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/sticky-manager/context.js
var import_react6 = __toESM(require_react());
var StickyManagerContext = /* @__PURE__ */ (0, import_react6.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/utilities/link/context.js
var import_react7 = __toESM(require_react());
var LinkContext = /* @__PURE__ */ (0, import_react7.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/MediaQueryProvider/MediaQueryProvider.js
var import_react10 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/media-query/context.js
var import_react8 = __toESM(require_react());
var MediaQueryContext = /* @__PURE__ */ (0, import_react8.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/EventListener/EventListener.js
var import_react9 = __toESM(require_react());
var EventListener = class extends import_react9.PureComponent {
  componentDidMount() {
    this.attachListener();
  }
  componentDidUpdate({
    passive,
    ...detachProps
  }) {
    this.detachListener(detachProps);
    this.attachListener();
  }
  componentWillUnmount() {
    this.detachListener();
  }
  render() {
    return null;
  }
  attachListener() {
    const {
      event,
      handler,
      capture,
      passive
    } = this.props;
    window.addEventListener(event, handler, {
      capture,
      passive
    });
  }
  detachListener(prevProps) {
    const {
      event,
      handler,
      capture
    } = prevProps || this.props;
    window.removeEventListener(event, handler, capture);
  }
};

// node_modules/@shopify/polaris/build/esm/components/MediaQueryProvider/MediaQueryProvider.js
var MediaQueryProvider = function MediaQueryProvider2({
  children
}) {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = (0, import_react10.useState)(navigationBarCollapsed().matches);
  const handleResize = (0, import_react10.useCallback)(debounce(() => {
    if (isNavigationCollapsed !== navigationBarCollapsed().matches) {
      setIsNavigationCollapsed(!isNavigationCollapsed);
    }
  }, 40, {
    trailing: true,
    leading: true,
    maxWait: 40
  }), [isNavigationCollapsed]);
  (0, import_react10.useEffect)(() => {
    setIsNavigationCollapsed(navigationBarCollapsed().matches);
  }, []);
  const context = (0, import_react10.useMemo)(() => ({
    isNavigationCollapsed
  }), [isNavigationCollapsed]);
  return /* @__PURE__ */ import_react10.default.createElement(MediaQueryContext.Provider, {
    value: context
  }, /* @__PURE__ */ import_react10.default.createElement(EventListener, {
    event: "resize",
    handler: handleResize
  }), children);
};

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/PortalsManager.js
var import_react14 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-is-after-initial-mount.js
var import_react11 = __toESM(require_react());
function useIsAfterInitialMount() {
  const [isAfterInitialMount, setIsAfterInitialMount] = (0, import_react11.useState)(false);
  (0, import_react11.useEffect)(() => {
    setIsAfterInitialMount(true);
  }, []);
  return isAfterInitialMount;
}

// node_modules/@shopify/polaris/build/esm/utilities/portals/context.js
var import_react12 = __toESM(require_react());
var PortalsManagerContext = /* @__PURE__ */ (0, import_react12.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/components/PortalsContainer/PortalsContainer.js
var import_react13 = __toESM(require_react());
function PortalsContainerComponent(_props, ref) {
  return /* @__PURE__ */ import_react13.default.createElement("div", {
    id: "PolarisPortalsContainer",
    ref
  });
}
var PortalsContainer = /* @__PURE__ */ (0, import_react13.forwardRef)(PortalsContainerComponent);

// node_modules/@shopify/polaris/build/esm/components/PortalsManager/PortalsManager.js
function PortalsManager({
  children,
  container
}) {
  const isMounted = useIsAfterInitialMount();
  const ref = (0, import_react14.useRef)(null);
  const contextValue = (0, import_react14.useMemo)(() => {
    if (container) {
      return {
        container
      };
    } else if (isMounted) {
      return {
        container: ref.current
      };
    } else {
      return {
        container: null
      };
    }
  }, [container, isMounted]);
  return /* @__PURE__ */ import_react14.default.createElement(PortalsManagerContext.Provider, {
    value: contextValue
  }, children, container ? null : /* @__PURE__ */ import_react14.default.createElement(PortalsContainer, {
    ref
  }));
}

// node_modules/@shopify/polaris/build/esm/components/FocusManager/FocusManager.js
var import_react16 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/focus-manager/context.js
var import_react15 = __toESM(require_react());
var FocusManagerContext = /* @__PURE__ */ (0, import_react15.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/FocusManager/FocusManager.js
function FocusManager({
  children
}) {
  const [trapFocusList, setTrapFocusList] = (0, import_react16.useState)([]);
  const add = (0, import_react16.useCallback)((id) => {
    setTrapFocusList((list) => [...list, id]);
  }, []);
  const remove = (0, import_react16.useCallback)((id) => {
    let removed = true;
    setTrapFocusList((list) => {
      const clone = [...list];
      const index = clone.indexOf(id);
      if (index === -1) {
        removed = false;
      } else {
        clone.splice(index, 1);
      }
      return clone;
    });
    return removed;
  }, []);
  const value = (0, import_react16.useMemo)(() => ({
    trapFocusList,
    add,
    remove
  }), [add, trapFocusList, remove]);
  return /* @__PURE__ */ import_react16.default.createElement(FocusManagerContext.Provider, {
    value
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/EphemeralPresenceManager/EphemeralPresenceManager.js
var import_react18 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/ephemeral-presence-manager/context.js
var import_react17 = __toESM(require_react());
var EphemeralPresenceManagerContext = /* @__PURE__ */ (0, import_react17.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/EphemeralPresenceManager/EphemeralPresenceManager.js
var defaultState = {
  tooltip: 0
};
function EphemeralPresenceManager({
  children
}) {
  const [presenceCounter, setPresenceCounter] = (0, import_react18.useState)(defaultState);
  const addPresence = (0, import_react18.useCallback)((key) => {
    setPresenceCounter((prevList) => ({
      ...prevList,
      [key]: prevList[key] + 1
    }));
  }, []);
  const removePresence = (0, import_react18.useCallback)((key) => {
    setPresenceCounter((prevList) => ({
      ...prevList,
      [key]: prevList[key] - 1
    }));
  }, []);
  const value = (0, import_react18.useMemo)(() => ({
    presenceList: Object.entries(presenceCounter).reduce((previousValue, currentValue) => {
      const [key, value2] = currentValue;
      return {
        ...previousValue,
        [key]: value2 >= 1
      };
    }, {}),
    presenceCounter,
    addPresence,
    removePresence
  }), [addPresence, removePresence, presenceCounter]);
  return /* @__PURE__ */ import_react18.default.createElement(EphemeralPresenceManagerContext.Provider, {
    value
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/AppProvider/AppProvider.js
var AppProvider = class extends import_react19.Component {
  constructor(props) {
    super(props);
    this.setBodyStyles = () => {
      document.body.style.backgroundColor = "var(--p-color-bg-app)";
      document.body.style.color = "var(--p-color-text)";
    };
    this.setRootAttributes = () => {
      const features = this.getFeatures();
      document.documentElement.classList.toggle(classNamePolarisSummerEditions2023, features.polarisSummerEditions2023);
      document.documentElement.classList.toggle(classNamePolarisSummerEditions2023ShadowBevelOptOut, features.polarisSummerEditions2023ShadowBevelOptOut);
    };
    this.getFeatures = () => {
      const {
        features
      } = this.props;
      return {
        ...features,
        polarisSummerEditions2023: features?.polarisSummerEditions2023 ?? false,
        polarisSummerEditions2023ShadowBevelOptOut: features?.polarisSummerEditions2023ShadowBevelOptOut ?? false
      };
    };
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    const {
      i18n,
      linkComponent
    } = this.props;
    this.state = {
      link: linkComponent,
      intl: new I18n(i18n)
    };
  }
  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
      this.setBodyStyles();
      this.setRootAttributes();
    }
  }
  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent
  }) {
    const {
      i18n,
      linkComponent
    } = this.props;
    this.setRootAttributes();
    if (i18n === prevI18n && linkComponent === prevLinkComponent) {
      return;
    }
    this.setState({
      link: linkComponent,
      intl: new I18n(i18n)
    });
  }
  render() {
    const {
      children
    } = this.props;
    const features = this.getFeatures();
    const {
      intl,
      link
    } = this.state;
    return /* @__PURE__ */ import_react19.default.createElement(FeaturesContext.Provider, {
      value: features
    }, /* @__PURE__ */ import_react19.default.createElement(I18nContext.Provider, {
      value: intl
    }, /* @__PURE__ */ import_react19.default.createElement(ScrollLockManagerContext.Provider, {
      value: this.scrollLockManager
    }, /* @__PURE__ */ import_react19.default.createElement(StickyManagerContext.Provider, {
      value: this.stickyManager
    }, /* @__PURE__ */ import_react19.default.createElement(LinkContext.Provider, {
      value: link
    }, /* @__PURE__ */ import_react19.default.createElement(MediaQueryProvider, null, /* @__PURE__ */ import_react19.default.createElement(PortalsManager, null, /* @__PURE__ */ import_react19.default.createElement(FocusManager, null, /* @__PURE__ */ import_react19.default.createElement(EphemeralPresenceManager, null, children)))))))));
  }
};

// node_modules/@shopify/polaris/build/esm/components/Text/Text.js
var import_react20 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/is-object.js
function isObject(value) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

// node_modules/@shopify/polaris/build/esm/utilities/css.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function variationName(name, value) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
function sanitizeCustomProperties(styles60) {
  const nonNullValues = Object.entries(styles60).filter(([_17, value]) => value != null);
  return nonNullValues.length ? Object.fromEntries(nonNullValues) : void 0;
}
function getResponsiveProps(componentName, componentProp, tokenSubgroup, responsiveProp) {
  if (!responsiveProp)
    return {};
  let result;
  if (!isObject(responsiveProp)) {
    result = {
      [breakpointsAliases[0]]: `var(--p-${tokenSubgroup}-${responsiveProp})`
    };
  } else {
    result = Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, aliasOrScale]) => [breakpointAlias, `var(--p-${tokenSubgroup}-${aliasOrScale})`]));
  }
  return Object.fromEntries(Object.entries(result).map(([breakpointAlias, value]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, value]));
}
function getResponsiveValue(componentName, componentProp, responsiveProp) {
  if (!responsiveProp)
    return {};
  if (!isObject(responsiveProp)) {
    return {
      [`--pc-${componentName}-${componentProp}-${breakpointsAliases[0]}`]: responsiveProp
    };
  }
  return Object.fromEntries(Object.entries(responsiveProp).map(([breakpointAlias, responsiveValue]) => [`--pc-${componentName}-${componentProp}-${breakpointAlias}`, responsiveValue]));
}

// node_modules/@shopify/polaris/build/esm/components/Text/Text.scss.js
var styles = {
  "root": "Polaris-Text--root",
  "block": "Polaris-Text--block",
  "truncate": "Polaris-Text--truncate",
  "visuallyHidden": "Polaris-Text--visuallyHidden",
  "start": "Polaris-Text--start",
  "center": "Polaris-Text--center",
  "end": "Polaris-Text--end",
  "justify": "Polaris-Text--justify",
  "success": "Polaris-Text--success",
  "critical": "Polaris-Text--critical",
  "warning": "Polaris-Text--warning",
  "subdued": "Polaris-Text--subdued",
  "text-inverse": "Polaris-Text__text--inverse",
  "headingXs": "Polaris-Text--headingXs",
  "headingSm": "Polaris-Text--headingSm",
  "headingMd": "Polaris-Text--headingMd",
  "headingLg": "Polaris-Text--headingLg",
  "headingXl": "Polaris-Text--headingXl",
  "heading2xl": "Polaris-Text--heading2xl",
  "heading3xl": "Polaris-Text--heading3xl",
  "heading4xl": "Polaris-Text--heading4xl",
  "bodySm": "Polaris-Text--bodySm",
  "bodyMd": "Polaris-Text--bodyMd",
  "bodyLg": "Polaris-Text--bodyLg",
  "regular": "Polaris-Text--regular",
  "medium": "Polaris-Text--medium",
  "semibold": "Polaris-Text--semibold",
  "bold": "Polaris-Text--bold",
  "break": "Polaris-Text--break",
  "numeric": "Polaris-Text--numeric"
};

// node_modules/@shopify/polaris/build/esm/components/Text/Text.js
var Text = ({
  alignment,
  as,
  breakWord,
  children,
  color: color2,
  fontWeight,
  id,
  numeric = false,
  truncate = false,
  variant,
  visuallyHidden = false
}) => {
  const Component2 = as || (visuallyHidden ? "span" : "p");
  const className = classNames(styles.root, variant && styles[variant], fontWeight && styles[fontWeight], (alignment || truncate) && styles.block, alignment && styles[alignment], breakWord && styles.break, color2 && styles[color2], numeric && styles.numeric, truncate && styles.truncate, visuallyHidden && styles.visuallyHidden);
  return /* @__PURE__ */ import_react20.default.createElement(Component2, Object.assign({
    className
  }, id && {
    id
  }), children);
};

// node_modules/@shopify/polaris/build/esm/components/Box/Box.js
var import_react21 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Box/Box.scss.js
var styles2 = {
  "listReset": "Polaris-Box--listReset",
  "Box": "Polaris-Box",
  "visuallyHidden": "Polaris-Box--visuallyHidden",
  "printHidden": "Polaris-Box--printHidden"
};

// node_modules/@shopify/polaris/build/esm/components/Box/Box.js
var Box = /* @__PURE__ */ (0, import_react21.forwardRef)(({
  as = "div",
  background,
  borderColor,
  borderStyle,
  borderWidth,
  borderBlockStartWidth,
  borderBlockEndWidth,
  borderInlineStartWidth,
  borderInlineEndWidth,
  borderRadius,
  borderRadiusEndStart,
  borderRadiusEndEnd,
  borderRadiusStartStart,
  borderRadiusStartEnd,
  children,
  color: color2,
  id,
  minHeight,
  minWidth,
  maxWidth,
  overflowX,
  overflowY,
  outlineColor,
  outlineStyle,
  outlineWidth,
  padding,
  paddingBlockStart,
  paddingBlockEnd,
  paddingInlineStart,
  paddingInlineEnd,
  role,
  shadow: shadow2,
  tabIndex,
  width,
  printHidden,
  visuallyHidden,
  position,
  insetBlockStart,
  insetBlockEnd,
  insetInlineStart,
  insetInlineEnd,
  zIndex: zIndex3,
  opacity,
  ...restProps
}, ref) => {
  const borderStyleValue = borderStyle ? borderStyle : borderColor || borderWidth || borderBlockStartWidth || borderBlockEndWidth || borderInlineStartWidth || borderInlineEndWidth ? "solid" : void 0;
  const outlineStyleValue = outlineStyle ? outlineStyle : outlineColor || outlineWidth ? "solid" : void 0;
  const style = {
    "--pc-box-color": color2 ? `var(--p-color-${color2})` : void 0,
    "--pc-box-background": background ? `var(--p-color-${background})` : void 0,
    // eslint-disable-next-line no-nested-ternary
    "--pc-box-border-color": borderColor ? borderColor === "transparent" ? "transparent" : `var(--p-color-${borderColor})` : void 0,
    "--pc-box-border-style": borderStyleValue,
    "--pc-box-border-radius": borderRadius ? `var(--p-border-radius-${borderRadius})` : void 0,
    "--pc-box-border-radius-end-start": borderRadiusEndStart ? `var(--p-border-radius-${borderRadiusEndStart})` : void 0,
    "--pc-box-border-radius-end-end": borderRadiusEndEnd ? `var(--p-border-radius-${borderRadiusEndEnd})` : void 0,
    "--pc-box-border-radius-start-start": borderRadiusStartStart ? `var(--p-border-radius-${borderRadiusStartStart})` : void 0,
    "--pc-box-border-radius-start-end": borderRadiusStartEnd ? `var(--p-border-radius-${borderRadiusStartEnd})` : void 0,
    "--pc-box-border-width": borderWidth ? `var(--p-border-width-${borderWidth})` : void 0,
    "--pc-box-border-block-start-width": borderBlockStartWidth ? `var(--p-border-width-${borderBlockStartWidth})` : void 0,
    "--pc-box-border-block-end-width": borderBlockEndWidth ? `var(--p-border-width-${borderBlockEndWidth})` : void 0,
    "--pc-box-border-inline-start-width": borderInlineStartWidth ? `var(--p-border-width-${borderInlineStartWidth})` : void 0,
    "--pc-box-border-inline-end-width": borderInlineEndWidth ? `var(--p-border-width-${borderInlineEndWidth})` : void 0,
    "--pc-box-min-height": minHeight,
    "--pc-box-min-width": minWidth,
    "--pc-box-max-width": maxWidth,
    "--pc-box-outline-color": outlineColor ? `var(--p-color-${outlineColor})` : void 0,
    "--pc-box-outline-style": outlineStyleValue,
    "--pc-box-outline-width": outlineWidth ? `var(--p-border-width-${outlineWidth})` : void 0,
    "--pc-box-overflow-x": overflowX,
    "--pc-box-overflow-y": overflowY,
    ...getResponsiveProps("box", "padding-block-end", "space", paddingBlockEnd || padding),
    ...getResponsiveProps("box", "padding-block-start", "space", paddingBlockStart || padding),
    ...getResponsiveProps("box", "padding-inline-start", "space", paddingInlineStart || padding),
    ...getResponsiveProps("box", "padding-inline-end", "space", paddingInlineEnd || padding),
    "--pc-box-shadow": shadow2 ? `var(--p-shadow-${shadow2})` : void 0,
    "--pc-box-width": width,
    position,
    "--pc-box-inset-block-start": insetBlockStart ? `var(--p-space-${insetBlockStart})` : void 0,
    "--pc-box-inset-block-end": insetBlockEnd ? `var(--p-space-${insetBlockEnd})` : void 0,
    "--pc-box-inset-inline-start": insetInlineStart ? `var(--p-space-${insetInlineStart})` : void 0,
    "--pc-box-inset-inline-end": insetInlineEnd ? `var(--p-space-${insetInlineEnd})` : void 0,
    zIndex: zIndex3,
    opacity
  };
  const className = classNames(styles2.Box, visuallyHidden && styles2.visuallyHidden, printHidden && styles2.printHidden, as === "ul" && styles2.listReset);
  return /* @__PURE__ */ import_react21.default.createElement(as, {
    className,
    id,
    ref,
    style: sanitizeCustomProperties(style),
    role,
    tabIndex,
    ...restProps
  }, children);
});
Box.displayName = "Box";

// node_modules/@shopify/polaris/build/esm/components/HorizontalStack/HorizontalStack.js
var import_react22 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/HorizontalStack/HorizontalStack.scss.js
var styles3 = {
  "HorizontalStack": "Polaris-HorizontalStack"
};

// node_modules/@shopify/polaris/build/esm/components/HorizontalStack/HorizontalStack.js
var HorizontalStack = function HorizontalStack2({
  align,
  blockAlign,
  gap,
  wrap = true,
  children
}) {
  const style = {
    "--pc-horizontal-stack-align": align,
    "--pc-horizontal-stack-block-align": blockAlign,
    "--pc-horizontal-stack-wrap": wrap ? "wrap" : "nowrap",
    ...getResponsiveProps("horizontal-stack", "gap", "space", gap)
  };
  return /* @__PURE__ */ import_react22.default.createElement("div", {
    className: styles3.HorizontalStack,
    style
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/Button/Button.js
var import_react81 = __toESM(require_react());

// node_modules/@shopify/polaris-icons/dist/icons/ArrowLeftMinor.svg.mjs
var import_react23 = __toESM(require_react(), 1);
var SvgArrowLeftMinor = function SvgArrowLeftMinor2(props) {
  return /* @__PURE__ */ import_react23.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react23.default.createElement("path", {
    fillRule: "evenodd",
    d: "M16.75 10a.75.75 0 0 1-.75.75h-9.69l2.72 2.72a.75.75 0 0 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 1.06l-2.72 2.72h9.69a.75.75 0 0 1 .75.75Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/ArrowRightMinor.svg.mjs
var import_react24 = __toESM(require_react(), 1);
var SvgArrowRightMinor = function SvgArrowRightMinor2(props) {
  return /* @__PURE__ */ import_react24.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react24.default.createElement("path", {
    fillRule: "evenodd",
    d: "M3.5 10a.75.75 0 0 1 .75-.75h9.69l-2.72-2.72a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06-1.06l2.72-2.72h-9.69a.75.75 0 0 1-.75-.75Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CalendarMajor.svg.mjs
var import_react25 = __toESM(require_react(), 1);
var SvgCalendarMajor = function SvgCalendarMajor2(props) {
  return /* @__PURE__ */ import_react25.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react25.default.createElement("path", {
    fillRule: "evenodd",
    d: "M7.75 3.5a.75.75 0 0 0-1.5 0v.407a3.075 3.075 0 0 0-.702.252 3.75 3.75 0 0 0-1.64 1.639c-.226.444-.32.924-.365 1.47-.043.531-.043 1.187-.043 2v1.464c0 .813 0 1.469.043 2 .045.546.14 1.026.366 1.47a3.75 3.75 0 0 0 1.639 1.64c.444.226.924.32 1.47.365.531.043 1.187.043 2 .043h3.383c.323 0 .542 0 .735-.02a3.75 3.75 0 0 0 3.344-3.344c.02-.193.02-.412.02-.735v-2.883c0-.813 0-1.469-.043-2-.045-.546-.14-1.026-.366-1.47a3.75 3.75 0 0 0-1.639-1.64 3.076 3.076 0 0 0-.702-.251v-.407a.75.75 0 0 0-1.5 0v.259c-.373-.009-.794-.009-1.268-.009h-1.964c-.474 0-.895 0-1.268.009v-.259Zm-1.521 1.995c.197-.1.458-.17.912-.207.462-.037 1.057-.038 1.909-.038h1.9c.853 0 1.447 0 1.91.038.453.037.714.107.912.207.423.216.767.56.983.984.1.197.17.458.207.912.014.18.024.38.029.609h-9.982c.006-.228.015-.429.03-.61.036-.453.106-.714.206-.911a2.25 2.25 0 0 1 .984-.984Zm-1.229 4.005v1.2c0 .853 0 1.447.038 1.91.037.453.107.714.207.912.216.423.56.767.984.983.197.1.458.17.912.207.462.037 1.057.038 1.909.038h3.306c.385 0 .52-.001.626-.012a2.25 2.25 0 0 0 2.006-2.006c.011-.106.012-.241.012-.626v-2.606h-10Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CancelMinor.svg.mjs
var import_react26 = __toESM(require_react(), 1);
var SvgCancelMinor = function SvgCancelMinor2(props) {
  return /* @__PURE__ */ import_react26.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react26.default.createElement("path", {
    d: "M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CancelSmallMinor.svg.mjs
var import_react27 = __toESM(require_react(), 1);
var SvgCancelSmallMinor = function SvgCancelSmallMinor2(props) {
  return /* @__PURE__ */ import_react27.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react27.default.createElement("path", {
    d: "M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CaretDownMinor.svg.mjs
var import_react28 = __toESM(require_react(), 1);
var SvgCaretDownMinor = function SvgCaretDownMinor2(props) {
  return /* @__PURE__ */ import_react28.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react28.default.createElement("path", {
    fillRule: "evenodd",
    d: "M6.24 8.2a.75.75 0 0 1 1.06.04l2.7 2.908 2.7-2.908a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 0 1 .04-1.06Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CaretUpMinor.svg.mjs
var import_react29 = __toESM(require_react(), 1);
var SvgCaretUpMinor = function SvgCaretUpMinor2(props) {
  return /* @__PURE__ */ import_react29.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react29.default.createElement("path", {
    fillRule: "evenodd",
    d: "M6.24 11.8a.75.75 0 0 0 1.06-.04l2.7-2.908 2.7 2.908a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 0 0 .04 1.06Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/ChevronDownMinor.svg.mjs
var import_react30 = __toESM(require_react(), 1);
var SvgChevronDownMinor = function SvgChevronDownMinor2(props) {
  return /* @__PURE__ */ import_react30.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react30.default.createElement("path", {
    fillRule: "evenodd",
    d: "M5.72 8.47a.75.75 0 0 1 1.06 0l3.47 3.47 3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/ChevronLeftMinor.svg.mjs
var import_react31 = __toESM(require_react(), 1);
var SvgChevronLeftMinor = function SvgChevronLeftMinor2(props) {
  return /* @__PURE__ */ import_react31.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react31.default.createElement("path", {
    fillRule: "evenodd",
    d: "M11.78 5.47a.75.75 0 0 1 0 1.06l-3.47 3.47 3.47 3.47a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/ChevronRightMinor.svg.mjs
var import_react32 = __toESM(require_react(), 1);
var SvgChevronRightMinor = function SvgChevronRightMinor2(props) {
  return /* @__PURE__ */ import_react32.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react32.default.createElement("path", {
    fillRule: "evenodd",
    d: "M7.72 14.53a.75.75 0 0 1 0-1.06l3.47-3.47-3.47-3.47a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/ChevronUpMinor.svg.mjs
var import_react33 = __toESM(require_react(), 1);
var SvgChevronUpMinor = function SvgChevronUpMinor2(props) {
  return /* @__PURE__ */ import_react33.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react33.default.createElement("path", {
    fillRule: "evenodd",
    d: "M14.53 12.28a.75.75 0 0 1-1.06 0l-3.47-3.47-3.47 3.47a.75.75 0 0 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CircleAlertMajor.svg.mjs
var import_react34 = __toESM(require_react(), 1);
var SvgCircleAlertMajor = function SvgCircleAlertMajor2(props) {
  return /* @__PURE__ */ import_react34.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react34.default.createElement("path", {
    d: "M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"
  }), /* @__PURE__ */ import_react34.default.createElement("path", {
    d: "M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
  }), /* @__PURE__ */ import_react34.default.createElement("path", {
    fillRule: "evenodd",
    d: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CircleCancelMinor.svg.mjs
var import_react35 = __toESM(require_react(), 1);
var SvgCircleCancelMinor = function SvgCircleCancelMinor2(props) {
  return /* @__PURE__ */ import_react35.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react35.default.createElement("path", {
    d: "M13.03 6.97a.75.75 0 0 1 0 1.06l-1.97 1.97 1.97 1.97a.75.75 0 1 1-1.06 1.06l-1.97-1.97-1.97 1.97a.75.75 0 0 1-1.06-1.06l1.97-1.97-1.97-1.97a.75.75 0 0 1 1.06-1.06l1.97 1.97 1.97-1.97a.75.75 0 0 1 1.06 0Z"
  }), /* @__PURE__ */ import_react35.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CircleInformationMajor.svg.mjs
var import_react36 = __toESM(require_react(), 1);
var SvgCircleInformationMajor = function SvgCircleInformationMajor2(props) {
  return /* @__PURE__ */ import_react36.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react36.default.createElement("path", {
    d: "M10 14a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75Z"
  }), /* @__PURE__ */ import_react36.default.createElement("path", {
    d: "M9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
  }), /* @__PURE__ */ import_react36.default.createElement("path", {
    fillRule: "evenodd",
    d: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/CircleTickMajor.svg.mjs
var import_react37 = __toESM(require_react(), 1);
var SvgCircleTickMajor = function SvgCircleTickMajor2(props) {
  return /* @__PURE__ */ import_react37.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react37.default.createElement("path", {
    d: "M13.28 9.03a.75.75 0 0 0-1.06-1.06l-2.97 2.97-1.22-1.22a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.06 0l3.5-3.5Z"
  }), /* @__PURE__ */ import_react37.default.createElement("path", {
    fillRule: "evenodd",
    d: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/ClockMinor.svg.mjs
var import_react38 = __toESM(require_react(), 1);
var SvgClockMinor = function SvgClockMinor2(props) {
  return /* @__PURE__ */ import_react38.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react38.default.createElement("path", {
    d: "M10.75 6a.75.75 0 0 0-1.5 0v4c0 .199.079.39.22.53l2 2a.75.75 0 1 0 1.06-1.06l-1.78-1.78v-3.69Z"
  }), /* @__PURE__ */ import_react38.default.createElement("path", {
    fillRule: "evenodd",
    d: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-1.5 0a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/DiamondAlertMajor.svg.mjs
var import_react39 = __toESM(require_react(), 1);
var SvgDiamondAlertMajor = function SvgDiamondAlertMajor2(props) {
  return /* @__PURE__ */ import_react39.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react39.default.createElement("path", {
    d: "M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"
  }), /* @__PURE__ */ import_react39.default.createElement("path", {
    d: "M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
  }), /* @__PURE__ */ import_react39.default.createElement("path", {
    fillRule: "evenodd",
    d: "M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/DiamondAlertMinor.svg.mjs
var import_react40 = __toESM(require_react(), 1);
var SvgDiamondAlertMinor = function SvgDiamondAlertMinor2(props) {
  return /* @__PURE__ */ import_react40.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react40.default.createElement("path", {
    d: "M10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"
  }), /* @__PURE__ */ import_react40.default.createElement("path", {
    d: "M11 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
  }), /* @__PURE__ */ import_react40.default.createElement("path", {
    fillRule: "evenodd",
    d: "M11.237 3.177a1.75 1.75 0 0 0-2.474 0l-5.586 5.585a1.75 1.75 0 0 0 0 2.475l5.586 5.586a1.75 1.75 0 0 0 2.474 0l5.586-5.586a1.75 1.75 0 0 0 0-2.475l-5.586-5.585Zm-1.414 1.06a.25.25 0 0 1 .354 0l5.586 5.586a.25.25 0 0 1 0 .354l-5.586 5.585a.25.25 0 0 1-.354 0l-5.586-5.585a.25.25 0 0 1 0-.354l5.586-5.586Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/HorizontalDotsMinor.svg.mjs
var import_react41 = __toESM(require_react(), 1);
var SvgHorizontalDotsMinor = function SvgHorizontalDotsMinor2(props) {
  return /* @__PURE__ */ import_react41.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react41.default.createElement("path", {
    d: "M6 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
  }), /* @__PURE__ */ import_react41.default.createElement("path", {
    d: "M11.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
  }), /* @__PURE__ */ import_react41.default.createElement("path", {
    d: "M15.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/InfoMinor.svg.mjs
var import_react42 = __toESM(require_react(), 1);
var SvgInfoMinor = function SvgInfoMinor2(props) {
  return /* @__PURE__ */ import_react42.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react42.default.createElement("path", {
    d: "M11 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
  }), /* @__PURE__ */ import_react42.default.createElement("path", {
    d: "M10.75 9.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5Z"
  }), /* @__PURE__ */ import_react42.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/MinusMinor.svg.mjs
var import_react43 = __toESM(require_react(), 1);
var SvgMinusMinor = function SvgMinusMinor2(props) {
  return /* @__PURE__ */ import_react43.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react43.default.createElement("path", {
    fillRule: "evenodd",
    d: "M6 10a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/RiskMinor.svg.mjs
var import_react44 = __toESM(require_react(), 1);
var SvgRiskMinor = function SvgRiskMinor2(props) {
  return /* @__PURE__ */ import_react44.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react44.default.createElement("path", {
    d: "M10 6.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Z"
  }), /* @__PURE__ */ import_react44.default.createElement("path", {
    d: "M11 13.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
  }), /* @__PURE__ */ import_react44.default.createElement("path", {
    fillRule: "evenodd",
    d: "M10 3.5c-1.045 0-1.784.702-2.152 1.447a449.26 449.26 0 0 1-2.005 3.847l-.028.052a403.426 403.426 0 0 0-2.008 3.856c-.372.752-.478 1.75.093 2.614.57.863 1.542 1.184 2.464 1.184h7.272c.922 0 1.895-.32 2.464-1.184.57-.864.465-1.862.093-2.614-.21-.424-1.113-2.147-2.004-3.847l-.032-.061a429.497 429.497 0 0 1-2.005-3.847c-.368-.745-1.107-1.447-2.152-1.447Zm-.808 2.112c.404-.816 1.212-.816 1.616 0 .202.409 1.112 2.145 2.022 3.88a418.904 418.904 0 0 1 2.018 3.875c.404.817 0 1.633-1.212 1.633h-7.272c-1.212 0-1.617-.816-1.212-1.633.202-.408 1.113-2.147 2.023-3.883a421.932 421.932 0 0 0 2.017-3.872Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/SelectMinor.svg.mjs
var import_react45 = __toESM(require_react(), 1);
var SvgSelectMinor = function SvgSelectMinor2(props) {
  return /* @__PURE__ */ import_react45.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react45.default.createElement("path", {
    d: "M10.884 4.323a1.25 1.25 0 0 0-1.768 0l-2.646 2.647a.75.75 0 0 0 1.06 1.06l2.47-2.47 2.47 2.47a.75.75 0 1 0 1.06-1.06l-2.646-2.647Z"
  }), /* @__PURE__ */ import_react45.default.createElement("path", {
    d: "m13.53 13.03-2.646 2.647a1.25 1.25 0 0 1-1.768 0l-2.646-2.647a.75.75 0 0 1 1.06-1.06l2.47 2.47 2.47-2.47a.75.75 0 0 1 1.06 1.06Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/TickMinor.svg.mjs
var import_react46 = __toESM(require_react(), 1);
var SvgTickMinor = function SvgTickMinor2(props) {
  return /* @__PURE__ */ import_react46.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react46.default.createElement("path", {
    fillRule: "evenodd",
    d: "M15.78 5.97a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 5.97-5.97a.75.75 0 0 1 1.06 0Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/icons/TickSmallMinor.svg.mjs
var import_react47 = __toESM(require_react(), 1);
var SvgTickSmallMinor = function SvgTickSmallMinor2(props) {
  return /* @__PURE__ */ import_react47.default.createElement("svg", Object.assign({
    viewBox: "0 0 20 20"
  }, props), /* @__PURE__ */ import_react47.default.createElement("path", {
    fillRule: "evenodd",
    d: "M14.03 7.22a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 3.97-3.97a.75.75 0 0 1 1.06 0Z"
  }));
};

// node_modules/@shopify/polaris-icons/dist/index.mjs
var import_react48 = __toESM(require_react(), 1);

// node_modules/@shopify/polaris/build/esm/utilities/is-element-in-viewport.js
function isElementInViewport(element) {
  const {
    top,
    left,
    bottom,
    right
  } = element.getBoundingClientRect();
  return top >= 0 && right <= window.innerWidth && bottom <= window.innerHeight && left >= 0;
}

// node_modules/@shopify/polaris/build/esm/utilities/focus.js
var FOCUSABLE_SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]';
var KEYBOARD_FOCUSABLE_SELECTORS = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not([aria-disabled="true"]):not([tabindex="-1"]):not(:disabled),*[tabindex]:not([tabindex="-1"])';
var MENUITEM_FOCUSABLE_SELECTORS = 'a[role="menuitem"],frame[role="menuitem"],iframe[role="menuitem"],input[role="menuitem"]:not([type=hidden]):not(:disabled),select[role="menuitem"]:not(:disabled),textarea[role="menuitem"]:not(:disabled),button[role="menuitem"]:not(:disabled),*[tabindex]:not([tabindex="-1"])';
var handleMouseUpByBlurring = ({
  currentTarget
}) => currentTarget.blur();
function nextFocusableNode(node, filter) {
  const allFocusableElements = [...document.querySelectorAll(FOCUSABLE_SELECTOR)];
  const sliceLocation = allFocusableElements.indexOf(node) + 1;
  const focusableElementsAfterNode = allFocusableElements.slice(sliceLocation);
  for (const focusableElement of focusableElementsAfterNode) {
    if (isElementInViewport(focusableElement) && (!filter || filter && filter(focusableElement))) {
      return focusableElement;
    }
  }
  return null;
}
function findFirstFocusableNode(element, onlyDescendants = true) {
  if (!onlyDescendants && matches(element, FOCUSABLE_SELECTOR)) {
    return element;
  }
  return element.querySelector(FOCUSABLE_SELECTOR);
}
function findFirstFocusableNodeIncludingDisabled(element) {
  const focusableSelector = `a,button,frame,iframe,input:not([type=hidden]),select,textarea,*[tabindex]`;
  if (matches(element, focusableSelector)) {
    return element;
  }
  return element.querySelector(focusableSelector);
}
function focusNextFocusableNode(node, filter) {
  const nextFocusable = nextFocusableNode(node, filter);
  if (nextFocusable && nextFocusable instanceof HTMLElement) {
    nextFocusable.focus();
    return true;
  }
  return false;
}
function findFirstKeyboardFocusableNode(element, onlyDescendants = true) {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS)) {
    return element;
  }
  return element.querySelector(KEYBOARD_FOCUSABLE_SELECTORS);
}
function wrapFocusPreviousFocusableMenuItem(parentElement, currentFocusedElement) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement);
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[(currentItemIdx - 1 + allFocusableChildren.length) % allFocusableChildren.length].focus();
  }
}
function wrapFocusNextFocusableMenuItem(parentElement, currentFocusedElement) {
  const allFocusableChildren = getMenuFocusableDescendants(parentElement);
  const currentItemIdx = getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement);
  if (currentItemIdx === -1) {
    allFocusableChildren[0].focus();
  } else {
    allFocusableChildren[(currentItemIdx + 1) % allFocusableChildren.length].focus();
  }
}
function getMenuFocusableDescendants(element) {
  return element.querySelectorAll(MENUITEM_FOCUSABLE_SELECTORS);
}
function getCurrentFocusedElementIndex(allFocusableChildren, currentFocusedElement) {
  let currentItemIdx = 0;
  for (const focusableChild of allFocusableChildren) {
    if (focusableChild === currentFocusedElement) {
      break;
    }
    currentItemIdx++;
  }
  return currentItemIdx === allFocusableChildren.length ? -1 : currentItemIdx;
}
function matches(node, selector) {
  if (node.matches) {
    return node.matches(selector);
  }
  const matches2 = (node.ownerDocument || document).querySelectorAll(selector);
  let i = matches2.length;
  while (--i >= 0 && matches2.item(i) !== node)
    return i > -1;
}

// node_modules/@shopify/polaris/build/esm/utilities/use-disable-interaction.js
var import_react49 = __toESM(require_react());
function useDisableClick(disabled, handleClick) {
  const handleClickWrapper = (0, import_react49.useCallback)((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [disabled]);
  if (!disabled) {
    return handleClick;
  }
  return handleClickWrapper;
}

// node_modules/@shopify/polaris/build/esm/components/Button/Button.scss.js
var styles4 = {
  "Button": "Polaris-Button",
  "pressed": "Polaris-Button--pressed",
  "Content": "Polaris-Button__Content",
  "primary": "Polaris-Button--primary",
  "plain": "Polaris-Button--plain",
  "disabled": "Polaris-Button--disabled",
  "connectedDisclosure": "Polaris-Button--connectedDisclosure",
  "textAlignLeft": "Polaris-Button--textAlignLeft",
  "textAlignStart": "Polaris-Button--textAlignStart",
  "textAlignCenter": "Polaris-Button--textAlignCenter",
  "textAlignRight": "Polaris-Button--textAlignRight",
  "textAlignEnd": "Polaris-Button--textAlignEnd",
  "Icon": "Polaris-Button__Icon",
  "fullWidth": "Polaris-Button--fullWidth",
  "hidden": "Polaris-Button--hidden",
  "Spinner": "Polaris-Button__Spinner",
  "destructive": "Polaris-Button--destructive",
  "primaryPlain": "Polaris-Button--primaryPlain",
  "success": "Polaris-Button--success",
  "iconOnly": "Polaris-Button--iconOnly",
  "outline": "Polaris-Button--outline",
  "loading": "Polaris-Button--loading",
  "removeUnderline": "Polaris-Button--removeUnderline",
  "sizeSlim": "Polaris-Button--sizeSlim",
  "sizeLarge": "Polaris-Button--sizeLarge",
  "sizeMicro": "Polaris-Button--sizeMicro",
  "monochrome": "Polaris-Button--monochrome",
  "Text": "Polaris-Button__Text",
  "ConnectedDisclosureWrapper": "Polaris-Button__ConnectedDisclosureWrapper",
  "ConnectedDisclosure": "Polaris-Button__ConnectedDisclosure"
};

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js
var import_react50 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.scss.js
var styles5 = {
  "Spinner": "Polaris-Spinner",
  "sizeSmall": "Polaris-Spinner--sizeSmall",
  "sizeLarge": "Polaris-Spinner--sizeLarge"
};

// node_modules/@shopify/polaris/build/esm/components/Spinner/Spinner.js
function Spinner({
  size = "large",
  accessibilityLabel,
  hasFocusableParent
}) {
  const isAfterInitialMount = useIsAfterInitialMount();
  const className = classNames(styles5.Spinner, size && styles5[variationName("size", size)]);
  const spinnerSVGMarkup = size === "large" ? /* @__PURE__ */ import_react50.default.createElement("svg", {
    viewBox: "0 0 44 44",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ import_react50.default.createElement("path", {
    d: "M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z"
  })) : /* @__PURE__ */ import_react50.default.createElement("svg", {
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ import_react50.default.createElement("path", {
    d: "M7.229 1.173a9.25 9.25 0 1011.655 11.412 1.25 1.25 0 10-2.4-.698 6.75 6.75 0 11-8.506-8.329 1.25 1.25 0 10-.75-2.385z"
  }));
  const spanAttributes = {
    ...!hasFocusableParent && {
      role: "status"
    }
  };
  const accessibilityLabelMarkup = (isAfterInitialMount || !hasFocusableParent) && /* @__PURE__ */ import_react50.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel);
  return /* @__PURE__ */ import_react50.default.createElement(import_react50.default.Fragment, null, /* @__PURE__ */ import_react50.default.createElement("span", {
    className
  }, spinnerSVGMarkup), /* @__PURE__ */ import_react50.default.createElement("span", spanAttributes, accessibilityLabelMarkup));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.js
var import_react65 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Popover/set-activator-attributes.js
function setActivatorAttributes(activator, {
  id,
  active = false,
  ariaHaspopup,
  activatorDisabled = false
}) {
  if (!activatorDisabled) {
    activator.tabIndex = activator.tabIndex || 0;
  }
  activator.setAttribute("aria-controls", id);
  activator.setAttribute("aria-owns", id);
  activator.setAttribute("aria-expanded", String(active));
  if (ariaHaspopup != null) {
    activator.setAttribute("aria-haspopup", String(ariaHaspopup));
  }
}

// node_modules/@shopify/polaris/build/esm/components/Portal/Portal.js
var import_react52 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/@shopify/polaris/build/esm/utilities/portals/hooks.js
var import_react51 = __toESM(require_react());
function usePortalsManager() {
  const portalsManager = (0, import_react51.useContext)(PortalsManagerContext);
  if (!portalsManager) {
    throw new Error("No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  }
  return portalsManager;
}

// node_modules/@shopify/polaris/build/esm/components/Portal/Portal.js
function Portal({
  children,
  idPrefix = "",
  onPortalCreated = noop2
}) {
  const {
    container
  } = usePortalsManager();
  const uniqueId = (0, import_react52.useId)();
  const portalId = idPrefix !== "" ? `${idPrefix}-${uniqueId}` : uniqueId;
  (0, import_react52.useEffect)(() => {
    onPortalCreated();
  }, [onPortalCreated]);
  return container ? /* @__PURE__ */ (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react52.default.createElement("div", {
    "data-portal-id": portalId
  }, children), container) : null;
}
function noop2() {
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/PopoverOverlay/PopoverOverlay.js
var import_react64 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/components.js
var import_react53 = __toESM(require_react());
function wrapWithComponent(element, Component2, props) {
  if (element == null) {
    return null;
  }
  return isElementOfType(element, Component2) ? element : /* @__PURE__ */ import_react53.default.createElement(Component2, props, element);
}
var isComponent = true ? hotReloadComponentCheck : (AComponent, AnotherComponent) => AComponent === AnotherComponent;
function isElementOfType(element, Component2) {
  if (element == null || !/* @__PURE__ */ (0, import_react53.isValidElement)(element) || typeof element.type === "string") {
    return false;
  }
  const {
    type: defaultType
  } = element;
  const overrideType = element.props?.__type__;
  const type = overrideType || defaultType;
  const Components = Array.isArray(Component2) ? Component2 : [Component2];
  return Components.some((AComponent) => typeof type !== "string" && isComponent(AComponent, type));
}
function elementChildren(children, predicate = () => true) {
  return import_react53.Children.toArray(children).filter((child) => /* @__PURE__ */ (0, import_react53.isValidElement)(child) && predicate(child));
}
function ConditionalWrapper({
  condition,
  wrapper,
  children
}) {
  return condition ? wrapper(children) : children;
}
function ConditionalRender({
  condition,
  children
}) {
  return condition ? children : null;
}
function hotReloadComponentCheck(AComponent, AnotherComponent) {
  const componentName = AComponent.name;
  const anotherComponentName = AnotherComponent.displayName;
  return AComponent === AnotherComponent || Boolean(componentName) && componentName === anotherComponentName;
}

// node_modules/@shopify/polaris/build/esm/types.js
var Key;
(function(Key2) {
  Key2[Key2["Backspace"] = 8] = "Backspace";
  Key2[Key2["Tab"] = 9] = "Tab";
  Key2[Key2["Enter"] = 13] = "Enter";
  Key2[Key2["Shift"] = 16] = "Shift";
  Key2[Key2["Ctrl"] = 17] = "Ctrl";
  Key2[Key2["Alt"] = 18] = "Alt";
  Key2[Key2["Pause"] = 19] = "Pause";
  Key2[Key2["CapsLock"] = 20] = "CapsLock";
  Key2[Key2["Escape"] = 27] = "Escape";
  Key2[Key2["Space"] = 32] = "Space";
  Key2[Key2["PageUp"] = 33] = "PageUp";
  Key2[Key2["PageDown"] = 34] = "PageDown";
  Key2[Key2["End"] = 35] = "End";
  Key2[Key2["Home"] = 36] = "Home";
  Key2[Key2["LeftArrow"] = 37] = "LeftArrow";
  Key2[Key2["UpArrow"] = 38] = "UpArrow";
  Key2[Key2["RightArrow"] = 39] = "RightArrow";
  Key2[Key2["DownArrow"] = 40] = "DownArrow";
  Key2[Key2["Insert"] = 45] = "Insert";
  Key2[Key2["Delete"] = 46] = "Delete";
  Key2[Key2["Key0"] = 48] = "Key0";
  Key2[Key2["Key1"] = 49] = "Key1";
  Key2[Key2["Key2"] = 50] = "Key2";
  Key2[Key2["Key3"] = 51] = "Key3";
  Key2[Key2["Key4"] = 52] = "Key4";
  Key2[Key2["Key5"] = 53] = "Key5";
  Key2[Key2["Key6"] = 54] = "Key6";
  Key2[Key2["Key7"] = 55] = "Key7";
  Key2[Key2["Key8"] = 56] = "Key8";
  Key2[Key2["Key9"] = 57] = "Key9";
  Key2[Key2["KeyA"] = 65] = "KeyA";
  Key2[Key2["KeyB"] = 66] = "KeyB";
  Key2[Key2["KeyC"] = 67] = "KeyC";
  Key2[Key2["KeyD"] = 68] = "KeyD";
  Key2[Key2["KeyE"] = 69] = "KeyE";
  Key2[Key2["KeyF"] = 70] = "KeyF";
  Key2[Key2["KeyG"] = 71] = "KeyG";
  Key2[Key2["KeyH"] = 72] = "KeyH";
  Key2[Key2["KeyI"] = 73] = "KeyI";
  Key2[Key2["KeyJ"] = 74] = "KeyJ";
  Key2[Key2["KeyK"] = 75] = "KeyK";
  Key2[Key2["KeyL"] = 76] = "KeyL";
  Key2[Key2["KeyM"] = 77] = "KeyM";
  Key2[Key2["KeyN"] = 78] = "KeyN";
  Key2[Key2["KeyO"] = 79] = "KeyO";
  Key2[Key2["KeyP"] = 80] = "KeyP";
  Key2[Key2["KeyQ"] = 81] = "KeyQ";
  Key2[Key2["KeyR"] = 82] = "KeyR";
  Key2[Key2["KeyS"] = 83] = "KeyS";
  Key2[Key2["KeyT"] = 84] = "KeyT";
  Key2[Key2["KeyU"] = 85] = "KeyU";
  Key2[Key2["KeyV"] = 86] = "KeyV";
  Key2[Key2["KeyW"] = 87] = "KeyW";
  Key2[Key2["KeyX"] = 88] = "KeyX";
  Key2[Key2["KeyY"] = 89] = "KeyY";
  Key2[Key2["KeyZ"] = 90] = "KeyZ";
  Key2[Key2["LeftMeta"] = 91] = "LeftMeta";
  Key2[Key2["RightMeta"] = 92] = "RightMeta";
  Key2[Key2["Select"] = 93] = "Select";
  Key2[Key2["Numpad0"] = 96] = "Numpad0";
  Key2[Key2["Numpad1"] = 97] = "Numpad1";
  Key2[Key2["Numpad2"] = 98] = "Numpad2";
  Key2[Key2["Numpad3"] = 99] = "Numpad3";
  Key2[Key2["Numpad4"] = 100] = "Numpad4";
  Key2[Key2["Numpad5"] = 101] = "Numpad5";
  Key2[Key2["Numpad6"] = 102] = "Numpad6";
  Key2[Key2["Numpad7"] = 103] = "Numpad7";
  Key2[Key2["Numpad8"] = 104] = "Numpad8";
  Key2[Key2["Numpad9"] = 105] = "Numpad9";
  Key2[Key2["Multiply"] = 106] = "Multiply";
  Key2[Key2["Add"] = 107] = "Add";
  Key2[Key2["Subtract"] = 109] = "Subtract";
  Key2[Key2["Decimal"] = 110] = "Decimal";
  Key2[Key2["Divide"] = 111] = "Divide";
  Key2[Key2["F1"] = 112] = "F1";
  Key2[Key2["F2"] = 113] = "F2";
  Key2[Key2["F3"] = 114] = "F3";
  Key2[Key2["F4"] = 115] = "F4";
  Key2[Key2["F5"] = 116] = "F5";
  Key2[Key2["F6"] = 117] = "F6";
  Key2[Key2["F7"] = 118] = "F7";
  Key2[Key2["F8"] = 119] = "F8";
  Key2[Key2["F9"] = 120] = "F9";
  Key2[Key2["F10"] = 121] = "F10";
  Key2[Key2["F11"] = 122] = "F11";
  Key2[Key2["F12"] = 123] = "F12";
  Key2[Key2["NumLock"] = 144] = "NumLock";
  Key2[Key2["ScrollLock"] = 145] = "ScrollLock";
  Key2[Key2["Semicolon"] = 186] = "Semicolon";
  Key2[Key2["Equals"] = 187] = "Equals";
  Key2[Key2["Comma"] = 188] = "Comma";
  Key2[Key2["Dash"] = 189] = "Dash";
  Key2[Key2["Period"] = 190] = "Period";
  Key2[Key2["ForwardSlash"] = 191] = "ForwardSlash";
  Key2[Key2["GraveAccent"] = 192] = "GraveAccent";
  Key2[Key2["OpenBracket"] = 219] = "OpenBracket";
  Key2[Key2["BackSlash"] = 220] = "BackSlash";
  Key2[Key2["CloseBracket"] = 221] = "CloseBracket";
  Key2[Key2["SingleQuote"] = 222] = "SingleQuote";
})(Key || (Key = {}));

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.scss.js
var styles6 = {
  "Popover": "Polaris-Popover",
  "PopoverOverlay": "Polaris-Popover__PopoverOverlay",
  "PopoverOverlay-entering": "Polaris-Popover__PopoverOverlay--entering",
  "PopoverOverlay-open": "Polaris-Popover__PopoverOverlay--open",
  "measuring": "Polaris-Popover--measuring",
  "PopoverOverlay-exiting": "Polaris-Popover__PopoverOverlay--exiting",
  "fullWidth": "Polaris-Popover--fullWidth",
  "Content": "Polaris-Popover__Content",
  "positionedAbove": "Polaris-Popover--positionedAbove",
  "Content-fullHeight": "Polaris-Popover__Content--fullHeight",
  "Content-fluidContent": "Polaris-Popover__Content--fluidContent",
  "Pane": "Polaris-Popover__Pane",
  "Pane-fixed": "Polaris-Popover__Pane--fixed",
  "Pane-captureOverscroll": "Polaris-Popover__Pane--captureOverscroll",
  "Section": "Polaris-Popover__Section",
  "FocusTracker": "Polaris-Popover__FocusTracker",
  "PopoverOverlay-hideOnPrint": "Polaris-Popover__PopoverOverlay--hideOnPrint"
};

// node_modules/@shopify/polaris/build/esm/components/KeypressListener/KeypressListener.js
var import_react54 = __toESM(require_react());
function KeypressListener({
  keyCode,
  handler,
  keyEvent = "keyup",
  options,
  useCapture
}) {
  const tracked = (0, import_react54.useRef)({
    handler,
    keyCode
  });
  useIsomorphicLayoutEffect(() => {
    tracked.current = {
      handler,
      keyCode
    };
  }, [handler, keyCode]);
  const handleKeyEvent = (0, import_react54.useCallback)((event) => {
    const {
      handler: handler2,
      keyCode: keyCode2
    } = tracked.current;
    if (event.keyCode === keyCode2) {
      handler2(event);
    }
  }, []);
  (0, import_react54.useEffect)(() => {
    document.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent, useCapture || options);
    };
  }, [keyEvent, handleKeyEvent, useCapture, options]);
  return null;
}

// node_modules/@shopify/polaris/build/esm/utilities/features/hooks.js
var import_react55 = __toESM(require_react());
function useFeatures() {
  const features = (0, import_react55.useContext)(FeaturesContext);
  if (!features) {
    throw new Error("No Features were provided.");
  }
  return features;
}
function UseFeatures(props) {
  const features = useFeatures();
  return props.children(features);
}

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.js
var import_react61 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/utilities/math.js
function calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset = 0) {
  const activatorTop = activatorRect.top;
  const activatorBottom = activatorTop + activatorRect.height;
  const spaceAbove = activatorRect.top - topBarOffset;
  const spaceBelow = containerRect.height - activatorRect.top - activatorRect.height;
  const desiredHeight = overlayRect.height;
  const verticalMargins = overlayMargins.activator + overlayMargins.container;
  const minimumSpaceToScroll = overlayMargins.container;
  const distanceToTopScroll = activatorRect.top - Math.max(scrollableContainerRect.top, 0);
  const distanceToBottomScroll = containerRect.top + Math.min(containerRect.height, scrollableContainerRect.top + scrollableContainerRect.height) - (activatorRect.top + activatorRect.height);
  const enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll;
  const enoughSpaceFromBottomScroll = distanceToBottomScroll >= minimumSpaceToScroll;
  const heightIfBelow = Math.min(spaceBelow, desiredHeight);
  const heightIfAbove = Math.min(spaceAbove, desiredHeight);
  const containerRectTop = fixed ? 0 : containerRect.top;
  const positionIfAbove = {
    height: heightIfAbove - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove,
    positioning: "above"
  };
  const positionIfBelow = {
    height: heightIfBelow - verticalMargins,
    top: activatorBottom + containerRectTop,
    positioning: "below"
  };
  if (preferredPosition === "above") {
    return (enoughSpaceFromTopScroll || distanceToTopScroll >= distanceToBottomScroll && !enoughSpaceFromBottomScroll) && (spaceAbove > desiredHeight || spaceAbove > spaceBelow) ? positionIfAbove : positionIfBelow;
  }
  if (preferredPosition === "below") {
    return (enoughSpaceFromBottomScroll || distanceToBottomScroll >= distanceToTopScroll && !enoughSpaceFromTopScroll) && (spaceBelow > desiredHeight || spaceBelow > spaceAbove) ? positionIfBelow : positionIfAbove;
  }
  if (enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll) {
    return spaceAbove > spaceBelow ? positionIfAbove : positionIfBelow;
  }
  return distanceToTopScroll > minimumSpaceToScroll ? positionIfAbove : positionIfBelow;
}
function calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment) {
  const maximum = containerRect.width - overlayRect.width;
  if (preferredAlignment === "left") {
    return Math.min(maximum, Math.max(0, activatorRect.left - overlayMargins.horizontal));
  } else if (preferredAlignment === "right") {
    const activatorRight = containerRect.width - (activatorRect.left + activatorRect.width);
    return Math.min(maximum, Math.max(0, activatorRight - overlayMargins.horizontal));
  }
  return Math.min(maximum, Math.max(0, activatorRect.center.x - overlayRect.width / 2));
}
function rectIsOutsideOfRect(inner, outer) {
  const {
    center
  } = inner;
  return center.y < outer.top || center.y > outer.top + outer.height;
}
function intersectionWithViewport(rect, viewport = windowRect()) {
  const top = Math.max(rect.top, 0);
  const left = Math.max(rect.left, 0);
  const bottom = Math.min(rect.top + rect.height, viewport.height);
  const right = Math.min(rect.left + rect.width, viewport.width);
  return new Rect({
    top,
    left,
    height: bottom - top,
    width: right - left
  });
}
function windowRect() {
  return new Rect({
    top: window.scrollY,
    left: window.scrollX,
    height: window.innerHeight,
    width: document.body.clientWidth
  });
}

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.scss.js
var styles7 = {
  "PositionedOverlay": "Polaris-PositionedOverlay",
  "fixed": "Polaris-PositionedOverlay--fixed",
  "calculating": "Polaris-PositionedOverlay--calculating",
  "preventInteraction": "Polaris-PositionedOverlay--preventInteraction"
};

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.js
var import_react60 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-lazy-ref.js
var import_react56 = __toESM(require_react());
var UNIQUE_IDENTIFIER = Symbol("unique_identifier");
function useLazyRef(initialValue) {
  const lazyRef = (0, import_react56.useRef)(UNIQUE_IDENTIFIER);
  if (lazyRef.current === UNIQUE_IDENTIFIER) {
    lazyRef.current = initialValue();
  }
  return lazyRef;
}

// node_modules/@shopify/polaris/build/esm/utilities/use-component-did-mount.js
var import_react57 = __toESM(require_react());
function useComponentDidMount(callback) {
  const isAfterInitialMount = useIsAfterInitialMount();
  const hasInvokedLifeCycle = (0, import_react57.useRef)(false);
  if (isAfterInitialMount && !hasInvokedLifeCycle.current) {
    hasInvokedLifeCycle.current = true;
    return callback();
  }
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/context.js
var import_react58 = __toESM(require_react());
var ScrollableContext = /* @__PURE__ */ (0, import_react58.createContext)(void 0);

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.scss.js
var styles8 = {
  "Scrollable": "Polaris-Scrollable",
  "hasTopShadow": "Polaris-Scrollable--hasTopShadow",
  "hasBottomShadow": "Polaris-Scrollable--hasBottomShadow",
  "horizontal": "Polaris-Scrollable--horizontal",
  "vertical": "Polaris-Scrollable--vertical"
};

// node_modules/@shopify/polaris/build/esm/components/Scrollable/components/ScrollTo/ScrollTo.js
var import_react59 = __toESM(require_react());
function ScrollTo() {
  const anchorNode = (0, import_react59.useRef)(null);
  const scrollToPosition = (0, import_react59.useContext)(ScrollableContext);
  (0, import_react59.useEffect)(() => {
    if (!scrollToPosition || !anchorNode.current) {
      return;
    }
    scrollToPosition(anchorNode.current.offsetTop);
  }, [scrollToPosition]);
  const id = (0, import_react59.useId)();
  return /* @__PURE__ */ import_react59.default.createElement("a", {
    id,
    ref: anchorNode
  });
}

// node_modules/@shopify/polaris/build/esm/components/Scrollable/Scrollable.js
var MAX_SCROLL_HINT_DISTANCE = 100;
var LOW_RES_BUFFER = 2;
var ScrollableComponent = /* @__PURE__ */ (0, import_react60.forwardRef)(({
  children,
  className,
  horizontal = true,
  vertical = true,
  shadow: shadow2,
  hint,
  focusable,
  onScrolledToBottom,
  ...rest
}, forwardedRef) => {
  const [topShadow, setTopShadow] = (0, import_react60.useState)(false);
  const [bottomShadow, setBottomShadow] = (0, import_react60.useState)(false);
  const stickyManager = useLazyRef(() => new StickyManager());
  const scrollArea = (0, import_react60.useRef)(null);
  const scrollTo = (0, import_react60.useCallback)((scrollY, options = {}) => {
    const optionsBehavior = options.behavior || "smooth";
    const behavior = prefersReducedMotion() ? "auto" : optionsBehavior;
    scrollArea.current?.scrollTo({
      top: scrollY,
      behavior
    });
  }, []);
  const defaultRef = (0, import_react60.useRef)();
  (0, import_react60.useImperativeHandle)(forwardedRef || defaultRef, () => ({
    scrollTo
  }));
  const handleScroll = (0, import_react60.useCallback)(() => {
    const currentScrollArea = scrollArea.current;
    if (!currentScrollArea) {
      return;
    }
    requestAnimationFrame(() => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight
      } = currentScrollArea;
      const canScroll = Boolean(scrollHeight > clientHeight);
      const isBelowTopOfScroll = Boolean(scrollTop > 0);
      const isAtBottomOfScroll = Boolean(scrollTop + clientHeight >= scrollHeight - LOW_RES_BUFFER);
      setTopShadow(isBelowTopOfScroll);
      setBottomShadow(!isAtBottomOfScroll);
      if (canScroll && isAtBottomOfScroll && onScrolledToBottom) {
        onScrolledToBottom();
      }
    });
  }, [onScrolledToBottom]);
  useComponentDidMount(() => {
    handleScroll();
    if (hint) {
      requestAnimationFrame(() => performScrollHint(scrollArea.current));
    }
  });
  (0, import_react60.useEffect)(() => {
    const currentScrollArea = scrollArea.current;
    if (!currentScrollArea) {
      return;
    }
    const handleResize = debounce(handleScroll, 50, {
      trailing: true
    });
    stickyManager.current?.setContainer(currentScrollArea);
    currentScrollArea.addEventListener("scroll", handleScroll);
    globalThis.addEventListener("resize", handleResize);
    return () => {
      currentScrollArea.removeEventListener("scroll", handleScroll);
      globalThis.removeEventListener("resize", handleResize);
    };
  }, [stickyManager, handleScroll]);
  const finalClassName = classNames(className, styles8.Scrollable, vertical && styles8.vertical, horizontal && styles8.horizontal, shadow2 && topShadow && styles8.hasTopShadow, shadow2 && bottomShadow && styles8.hasBottomShadow);
  return /* @__PURE__ */ import_react60.default.createElement(ScrollableContext.Provider, {
    value: scrollTo
  }, /* @__PURE__ */ import_react60.default.createElement(StickyManagerContext.Provider, {
    value: stickyManager.current
  }, /* @__PURE__ */ import_react60.default.createElement("div", Object.assign({
    className: finalClassName
  }, scrollable.props, rest, {
    ref: scrollArea,
    tabIndex: focusable ? 0 : void 0
  }), children)));
});
ScrollableComponent.displayName = "Scrollable";
function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (err) {
    return false;
  }
}
function performScrollHint(elem) {
  if (!elem || prefersReducedMotion()) {
    return;
  }
  const scrollableDistance = elem.scrollHeight - elem.clientHeight;
  const distanceToPeek = Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;
  const goBackToTop = () => {
    requestAnimationFrame(() => {
      if (elem.scrollTop >= distanceToPeek) {
        elem.removeEventListener("scroll", goBackToTop);
        elem.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  };
  elem.addEventListener("scroll", goBackToTop);
  elem.scrollTo({
    top: MAX_SCROLL_HINT_DISTANCE,
    behavior: "smooth"
  });
}
var forNode = (node) => {
  const closestElement = node.closest(scrollable.selector);
  return closestElement instanceof HTMLElement ? closestElement : document;
};
var Scrollable = ScrollableComponent;
Scrollable.ScrollTo = ScrollTo;
Scrollable.forNode = forNode;

// node_modules/@shopify/polaris/build/esm/components/PositionedOverlay/PositionedOverlay.js
var OBSERVER_CONFIG = {
  childList: true,
  subtree: true,
  characterData: true,
  attributeFilter: ["style"]
};
var PositionedOverlay = class extends import_react61.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      measuring: true,
      activatorRect: getRectForNode(this.props.activator),
      right: void 0,
      left: void 0,
      top: 0,
      height: 0,
      width: null,
      positioning: "below",
      zIndex: null,
      outsideScrollableContainer: false,
      lockPosition: false,
      chevronOffset: 0
    };
    this.overlay = null;
    this.scrollableContainers = [];
    this.overlayDetails = () => {
      const {
        measuring,
        left,
        right,
        positioning,
        height,
        activatorRect,
        chevronOffset
      } = this.state;
      return {
        measuring,
        left,
        right,
        desiredHeight: height,
        positioning,
        activatorRect,
        chevronOffset
      };
    };
    this.setOverlay = (node) => {
      this.overlay = node;
    };
    this.setScrollableContainers = () => {
      const containers = [];
      let scrollableContainer = Scrollable.forNode(this.props.activator);
      if (scrollableContainer) {
        containers.push(scrollableContainer);
        while (scrollableContainer?.parentElement) {
          scrollableContainer = Scrollable.forNode(scrollableContainer.parentElement);
          containers.push(scrollableContainer);
        }
      }
      this.scrollableContainers = containers;
    };
    this.registerScrollHandlers = () => {
      this.scrollableContainers.forEach((node) => {
        node.addEventListener("scroll", this.handleMeasurement);
      });
    };
    this.unregisterScrollHandlers = () => {
      this.scrollableContainers.forEach((node) => {
        node.removeEventListener("scroll", this.handleMeasurement);
      });
    };
    this.handleMeasurement = () => {
      const {
        lockPosition,
        top
      } = this.state;
      this.observer.disconnect();
      this.setState(({
        left,
        top: top2,
        right
      }) => ({
        left,
        right,
        top: top2,
        height: 0,
        positioning: "below",
        measuring: true
      }), () => {
        if (this.overlay == null || this.firstScrollableContainer == null) {
          return;
        }
        const {
          activator,
          preferredPosition = "below",
          preferredAlignment = "center",
          onScrollOut,
          fullWidth,
          fixed,
          preferInputActivator = true
        } = this.props;
        const preferredActivator = preferInputActivator ? activator.querySelector("input") || activator : activator;
        const activatorRect = getRectForNode(preferredActivator);
        const currentOverlayRect = getRectForNode(this.overlay);
        const scrollableElement = isDocument2(this.firstScrollableContainer) ? document.body : this.firstScrollableContainer;
        const scrollableContainerRect = getRectForNode(scrollableElement);
        const overlayRect = fullWidth ? new Rect({
          ...currentOverlayRect,
          width: activatorRect.width
        }) : currentOverlayRect;
        if (scrollableElement === document.body) {
          scrollableContainerRect.height = document.body.scrollHeight;
        }
        let topBarOffset = 0;
        const topBarElement = scrollableElement.querySelector(`${dataPolarisTopBar.selector}`);
        if (topBarElement) {
          topBarOffset = topBarElement.clientHeight;
        }
        const overlayMargins = this.overlay.firstElementChild && this.overlay.firstChild instanceof HTMLElement ? getMarginsForNode(this.overlay.firstElementChild) : {
          activator: 0,
          container: 0,
          horizontal: 0
        };
        const containerRect = windowRect();
        const zIndexForLayer = getZIndexForLayerFromNode(activator);
        const zIndex3 = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;
        const verticalPosition = calculateVerticalPosition(activatorRect, overlayRect, overlayMargins, scrollableContainerRect, containerRect, preferredPosition, fixed, topBarOffset);
        const horizontalPosition = calculateHorizontalPosition(activatorRect, overlayRect, containerRect, overlayMargins, preferredAlignment);
        const chevronOffset = activatorRect.center.x - horizontalPosition;
        this.setState({
          measuring: false,
          activatorRect: getRectForNode(activator),
          left: preferredAlignment !== "right" ? horizontalPosition : void 0,
          right: preferredAlignment === "right" ? horizontalPosition : void 0,
          top: lockPosition ? top : verticalPosition.top,
          lockPosition: Boolean(fixed),
          height: verticalPosition.height || 0,
          width: fullWidth ? overlayRect.width : null,
          positioning: verticalPosition.positioning,
          outsideScrollableContainer: onScrollOut != null && rectIsOutsideOfRect(activatorRect, intersectionWithViewport(scrollableContainerRect)),
          zIndex: zIndex3,
          chevronOffset
        }, () => {
          if (!this.overlay)
            return;
          this.observer.observe(this.overlay, OBSERVER_CONFIG);
          this.observer.observe(activator, OBSERVER_CONFIG);
        });
      });
    };
    this.observer = new MutationObserver(this.handleMeasurement);
  }
  componentDidMount() {
    this.setScrollableContainers();
    if (this.scrollableContainers.length && !this.props.fixed) {
      this.registerScrollHandlers();
    }
    this.handleMeasurement();
  }
  componentWillUnmount() {
    this.observer.disconnect();
    if (this.scrollableContainers.length && !this.props.fixed) {
      this.unregisterScrollHandlers();
    }
  }
  componentDidUpdate() {
    const {
      outsideScrollableContainer,
      top
    } = this.state;
    const {
      onScrollOut,
      active
    } = this.props;
    if (active && onScrollOut != null && top !== 0 && outsideScrollableContainer) {
      onScrollOut();
    }
  }
  render() {
    const {
      left,
      right,
      top,
      zIndex: zIndex3,
      width
    } = this.state;
    const {
      render,
      fixed,
      preventInteraction,
      classNames: propClassNames,
      zIndexOverride
    } = this.props;
    const style = {
      top: top == null || isNaN(top) ? void 0 : top,
      left: left == null || isNaN(left) ? void 0 : left,
      right: right == null || isNaN(right) ? void 0 : right,
      width: width == null || isNaN(width) ? void 0 : width,
      zIndex: zIndexOverride || zIndex3 || void 0
    };
    const className = classNames(styles7.PositionedOverlay, fixed && styles7.fixed, preventInteraction && styles7.preventInteraction, propClassNames);
    return /* @__PURE__ */ import_react61.default.createElement("div", {
      className,
      style,
      ref: this.setOverlay
    }, /* @__PURE__ */ import_react61.default.createElement(EventListener, {
      event: "resize",
      handler: this.handleMeasurement
    }), render(this.overlayDetails()));
  }
  get firstScrollableContainer() {
    return this.scrollableContainers[0] ?? null;
  }
  forceUpdatePosition() {
    requestAnimationFrame(this.handleMeasurement);
  }
};
function getMarginsForNode(node) {
  const nodeStyles = window.getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || "0"),
    container: parseFloat(nodeStyles.marginBottom || "0"),
    horizontal: parseFloat(nodeStyles.marginLeft || "0")
  };
}
function getZIndexForLayerFromNode(node) {
  const layerNode = node.closest(layer.selector) || document.body;
  const zIndex3 = layerNode === document.body ? "auto" : parseInt(window.getComputedStyle(layerNode).zIndex || "0", 10);
  return zIndex3 === "auto" || isNaN(zIndex3) ? null : zIndex3;
}
function isDocument2(node) {
  return node === document;
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Pane/Pane.js
var import_react63 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Section/Section.js
var import_react62 = __toESM(require_react());
function Section({
  children
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  return /* @__PURE__ */ import_react62.default.createElement("div", {
    className: styles6.Section
  }, /* @__PURE__ */ import_react62.default.createElement(Box, {
    padding: polarisSummerEditions2023 ? void 0 : "4",
    paddingInlineStart: polarisSummerEditions2023 ? "3" : void 0,
    paddingInlineEnd: polarisSummerEditions2023 ? "3" : void 0,
    paddingBlockStart: polarisSummerEditions2023 ? "2" : void 0,
    paddingBlockEnd: polarisSummerEditions2023 ? "1_5-experimental" : void 0
  }, children));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/Pane/Pane.js
function Pane({
  captureOverscroll = false,
  fixed,
  sectioned,
  children,
  height,
  onScrolledToBottom
}) {
  const className = classNames(styles6.Pane, fixed && styles6["Pane-fixed"], captureOverscroll && styles6["Pane-captureOverscroll"]);
  const content = sectioned ? wrapWithComponent(children, Section, {}) : children;
  const style = height ? {
    height,
    maxHeight: height,
    minHeight: height
  } : void 0;
  return fixed ? /* @__PURE__ */ import_react63.default.createElement("div", {
    style,
    className
  }, content) : /* @__PURE__ */ import_react63.default.createElement(Scrollable, {
    shadow: true,
    className,
    style,
    onScrolledToBottom
  }, content);
}

// node_modules/@shopify/polaris/build/esm/components/Popover/components/PopoverOverlay/PopoverOverlay.js
var PopoverCloseSource;
(function(PopoverCloseSource2) {
  PopoverCloseSource2[PopoverCloseSource2["Click"] = 0] = "Click";
  PopoverCloseSource2[PopoverCloseSource2["EscapeKeypress"] = 1] = "EscapeKeypress";
  PopoverCloseSource2[PopoverCloseSource2["FocusOut"] = 2] = "FocusOut";
  PopoverCloseSource2[PopoverCloseSource2["ScrollOut"] = 3] = "ScrollOut";
})(PopoverCloseSource || (PopoverCloseSource = {}));
var TransitionStatus;
(function(TransitionStatus2) {
  TransitionStatus2["Entering"] = "entering";
  TransitionStatus2["Entered"] = "entered";
  TransitionStatus2["Exiting"] = "exiting";
  TransitionStatus2["Exited"] = "exited";
})(TransitionStatus || (TransitionStatus = {}));
var PopoverOverlay = class extends import_react64.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transitionStatus: this.props.active ? TransitionStatus.Entering : TransitionStatus.Exited
    };
    this.contentNode = /* @__PURE__ */ (0, import_react64.createRef)();
    this.renderPopover = (overlayDetails) => {
      const {
        measuring,
        desiredHeight,
        positioning
      } = overlayDetails;
      const {
        id,
        children,
        sectioned,
        fullWidth,
        fullHeight,
        fluidContent,
        hideOnPrint,
        autofocusTarget,
        captureOverscroll
      } = this.props;
      const className = classNames(styles6.Popover, positioning === "above" && styles6.positionedAbove, fullWidth && styles6.fullWidth, measuring && styles6.measuring, hideOnPrint && styles6["PopoverOverlay-hideOnPrint"]);
      const contentStyles = measuring ? void 0 : {
        height: desiredHeight
      };
      const contentClassNames = classNames(styles6.Content, fullHeight && styles6["Content-fullHeight"], fluidContent && styles6["Content-fluidContent"]);
      const content = /* @__PURE__ */ import_react64.default.createElement("div", {
        id,
        tabIndex: autofocusTarget === "none" ? void 0 : -1,
        className: contentClassNames,
        style: contentStyles,
        ref: this.contentNode
      }, renderPopoverContent(children, {
        captureOverscroll,
        sectioned
      }));
      return /* @__PURE__ */ import_react64.default.createElement("div", Object.assign({
        className
      }, overlay.props), /* @__PURE__ */ import_react64.default.createElement(EventListener, {
        event: "click",
        handler: this.handleClick
      }), /* @__PURE__ */ import_react64.default.createElement(EventListener, {
        event: "touchstart",
        handler: this.handleClick
      }), /* @__PURE__ */ import_react64.default.createElement(KeypressListener, {
        keyCode: Key.Escape,
        handler: this.handleEscape
      }), /* @__PURE__ */ import_react64.default.createElement("div", {
        className: styles6.FocusTracker,
        tabIndex: 0,
        onFocus: this.handleFocusFirstItem
      }), /* @__PURE__ */ import_react64.default.createElement(UseFeatures, null, (features) => /* @__PURE__ */ import_react64.default.createElement(Box, {
        position: "relative",
        overflowX: "hidden",
        overflowY: "hidden",
        background: "bg",
        borderRadius: features.polarisSummerEditions2023 ? "3" : "2"
      }, content)), /* @__PURE__ */ import_react64.default.createElement("div", {
        className: styles6.FocusTracker,
        tabIndex: 0,
        onFocus: this.handleFocusLastItem
      }));
    };
    this.handleClick = (event) => {
      const target = event.target;
      const {
        contentNode,
        props: {
          activator,
          onClose,
          preventCloseOnChildOverlayClick
        }
      } = this;
      const composedPath = event.composedPath();
      const wasDescendant = preventCloseOnChildOverlayClick ? wasPolarisPortalDescendant(composedPath, this.context.container) : wasContentNodeDescendant(composedPath, contentNode);
      const isActivatorDescendant = nodeContainsDescendant(activator, target);
      if (wasDescendant || isActivatorDescendant || this.state.transitionStatus !== TransitionStatus.Entered) {
        return;
      }
      onClose(PopoverCloseSource.Click);
    };
    this.handleScrollOut = () => {
      this.props.onClose(PopoverCloseSource.ScrollOut);
    };
    this.handleEscape = (event) => {
      const target = event.target;
      const {
        contentNode,
        props: {
          activator
        }
      } = this;
      const composedPath = event.composedPath();
      const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
      const isActivatorDescendant = nodeContainsDescendant(activator, target);
      if (wasDescendant || isActivatorDescendant) {
        this.props.onClose(PopoverCloseSource.EscapeKeypress);
      }
    };
    this.handleFocusFirstItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    };
    this.handleFocusLastItem = () => {
      this.props.onClose(PopoverCloseSource.FocusOut);
    };
    this.overlayRef = /* @__PURE__ */ (0, import_react64.createRef)();
  }
  forceUpdatePosition() {
    this.overlayRef.current?.forceUpdatePosition();
  }
  changeTransitionStatus(transitionStatus, cb) {
    this.setState({
      transitionStatus
    }, cb);
    this.contentNode.current && this.contentNode.current.getBoundingClientRect();
  }
  componentDidMount() {
    if (this.props.active) {
      this.focusContent();
      this.changeTransitionStatus(TransitionStatus.Entered);
    }
  }
  componentDidUpdate(oldProps) {
    if (this.props.active && !oldProps.active) {
      this.focusContent();
      this.changeTransitionStatus(TransitionStatus.Entering, () => {
        this.clearTransitionTimeout();
        this.enteringTimer = window.setTimeout(() => {
          this.setState({
            transitionStatus: TransitionStatus.Entered
          });
        }, parseInt(motion2["motion-duration-100"], 10));
      });
    }
    if (!this.props.active && oldProps.active) {
      this.clearTransitionTimeout();
      this.setState({
        transitionStatus: TransitionStatus.Exited
      });
    }
  }
  componentWillUnmount() {
    this.clearTransitionTimeout();
  }
  render() {
    const {
      active,
      activator,
      fullWidth,
      preferredPosition = "below",
      preferredAlignment = "center",
      preferInputActivator = true,
      fixed,
      zIndexOverride
    } = this.props;
    const {
      transitionStatus
    } = this.state;
    if (transitionStatus === TransitionStatus.Exited && !active)
      return null;
    const className = classNames(styles6.PopoverOverlay, transitionStatus === TransitionStatus.Entering && styles6["PopoverOverlay-entering"], transitionStatus === TransitionStatus.Entered && styles6["PopoverOverlay-open"], transitionStatus === TransitionStatus.Exiting && styles6["PopoverOverlay-exiting"]);
    return /* @__PURE__ */ import_react64.default.createElement(PositionedOverlay, {
      ref: this.overlayRef,
      fullWidth,
      active,
      activator,
      preferInputActivator,
      preferredPosition,
      preferredAlignment,
      render: this.renderPopover.bind(this),
      fixed,
      onScrollOut: this.handleScrollOut,
      classNames: className,
      zIndexOverride
    });
  }
  clearTransitionTimeout() {
    if (this.enteringTimer) {
      window.clearTimeout(this.enteringTimer);
    }
  }
  focusContent() {
    const {
      autofocusTarget = "container"
    } = this.props;
    if (autofocusTarget === "none" || this.contentNode == null) {
      return;
    }
    requestAnimationFrame(() => {
      if (this.contentNode.current == null) {
        return;
      }
      const focusableChild = findFirstKeyboardFocusableNode(this.contentNode.current);
      if (focusableChild && autofocusTarget === "first-node") {
        focusableChild.focus({
          preventScroll: true
        });
      } else {
        this.contentNode.current.focus({
          preventScroll: true
        });
      }
    });
  }
  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
};
PopoverOverlay.contextType = PortalsManagerContext;
function renderPopoverContent(children, props) {
  const childrenArray = import_react64.Children.toArray(children);
  if (isElementOfType(childrenArray[0], Pane)) {
    return childrenArray;
  }
  return wrapWithComponent(childrenArray, Pane, props);
}
function nodeContainsDescendant(rootNode, descendant) {
  if (rootNode === descendant) {
    return true;
  }
  let parent = descendant.parentNode;
  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}
function wasContentNodeDescendant(composedPath, contentNode) {
  return contentNode.current != null && composedPath.includes(contentNode.current);
}
function wasPolarisPortalDescendant(composedPath, portalsContainerElement) {
  return composedPath.some((eventTarget) => eventTarget instanceof Node && portalsContainerElement?.contains(eventTarget));
}

// node_modules/@shopify/polaris/build/esm/components/Popover/Popover.js
var PopoverComponent = /* @__PURE__ */ (0, import_react65.forwardRef)(function Popover({
  activatorWrapper = "div",
  children,
  onClose,
  activator,
  preventFocusOnClose,
  active,
  fixed,
  ariaHaspopup,
  preferInputActivator = true,
  zIndexOverride,
  ...rest
}, ref) {
  const [activatorNode, setActivatorNode] = (0, import_react65.useState)();
  const overlayRef = (0, import_react65.useRef)(null);
  const activatorContainer = (0, import_react65.useRef)(null);
  const WrapperComponent = activatorWrapper;
  const id = (0, import_react65.useId)();
  function forceUpdatePosition() {
    overlayRef.current?.forceUpdatePosition();
  }
  (0, import_react65.useImperativeHandle)(ref, () => {
    return {
      forceUpdatePosition
    };
  });
  const setAccessibilityAttributes = (0, import_react65.useCallback)(() => {
    if (activatorContainer.current == null) {
      return;
    }
    const firstFocusable = findFirstFocusableNodeIncludingDisabled(activatorContainer.current);
    const focusableActivator = firstFocusable || activatorContainer.current;
    const activatorDisabled = "disabled" in focusableActivator && Boolean(focusableActivator.disabled);
    setActivatorAttributes(focusableActivator, {
      id,
      active,
      ariaHaspopup,
      activatorDisabled
    });
  }, [id, active, ariaHaspopup]);
  const handleClose = (source) => {
    onClose(source);
    if (activatorContainer.current == null || preventFocusOnClose) {
      return;
    }
    if (source === PopoverCloseSource.FocusOut && activatorNode) {
      const focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
      if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
        focusableActivator.focus();
      }
    } else if (source === PopoverCloseSource.EscapeKeypress && activatorNode) {
      const focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
      if (focusableActivator) {
        focusableActivator.focus();
      } else {
        focusNextFocusableNode(focusableActivator, isInPortal);
      }
    }
  };
  (0, import_react65.useEffect)(() => {
    if (!activatorNode && activatorContainer.current) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    } else if (activatorNode && activatorContainer.current && !activatorContainer.current.contains(activatorNode)) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    }
    setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);
  (0, import_react65.useEffect)(() => {
    if (activatorNode && activatorContainer.current) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    }
    setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);
  const portal2 = activatorNode ? /* @__PURE__ */ import_react65.default.createElement(Portal, {
    idPrefix: "popover"
  }, /* @__PURE__ */ import_react65.default.createElement(PopoverOverlay, Object.assign({
    ref: overlayRef,
    id,
    activator: activatorNode,
    preferInputActivator,
    onClose: handleClose,
    active,
    fixed,
    zIndexOverride
  }, rest), children)) : null;
  return /* @__PURE__ */ import_react65.default.createElement(WrapperComponent, {
    ref: activatorContainer
  }, import_react65.Children.only(activator), portal2);
});
function isInPortal(element) {
  let parentElement = element.parentElement;
  while (parentElement) {
    if (parentElement.matches(portal.selector))
      return false;
    parentElement = parentElement.parentElement;
  }
  return true;
}
var Popover2 = Object.assign(PopoverComponent, {
  Pane,
  Section
});

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.js
var import_react79 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Section/Section.js
var import_react78 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Item/Item.js
var import_react77 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.scss.js
var styles9 = {
  "Item": "Polaris-ActionList__Item",
  "active": "Polaris-ActionList--active",
  "destructive": "Polaris-ActionList--destructive",
  "disabled": "Polaris-ActionList--disabled",
  "Prefix": "Polaris-ActionList__Prefix",
  "Suffix": "Polaris-ActionList__Suffix",
  "Text": "Polaris-ActionList__Text"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.js
var import_react70 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/within-filter-context.js
var import_react66 = __toESM(require_react());
var WithinFilterContext = /* @__PURE__ */ (0, import_react66.createContext)(false);

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.scss.js
var styles10 = {
  "Badge": "Polaris-Badge",
  "statusSuccess": "Polaris-Badge--statusSuccess",
  "statusSuccess-strong-experimental": "Polaris-Badge--statusSuccessStrongExperimental",
  "statusInfo": "Polaris-Badge--statusInfo",
  "statusInfo-strong-experimental": "Polaris-Badge--statusInfoStrongExperimental",
  "statusAttention": "Polaris-Badge--statusAttention",
  "statusAttention-strong-experimental": "Polaris-Badge--statusAttentionStrongExperimental",
  "statusWarning": "Polaris-Badge--statusWarning",
  "statusWarning-strong-experimental": "Polaris-Badge--statusWarningStrongExperimental",
  "statusCritical": "Polaris-Badge--statusCritical",
  "statusCritical-strong-experimental": "Polaris-Badge--statusCriticalStrongExperimental",
  "statusNew": "Polaris-Badge--statusNew",
  "statusRead-only-experimental": "Polaris-Badge--statusReadOnlyExperimental",
  "statusEnabled-experimental": "Polaris-Badge__statusEnabled--experimental",
  "sizeLarge-experimental": "Polaris-Badge__sizeLarge--experimental",
  "withinFilter": "Polaris-Badge--withinFilter",
  "Icon": "Polaris-Badge__Icon",
  "PipContainer": "Polaris-Badge__PipContainer"
};

// node_modules/@shopify/polaris/build/esm/components/Badge/types.js
var StatusValue;
(function(StatusValue2) {
  StatusValue2["Info"] = "info";
  StatusValue2["Success"] = "success";
  StatusValue2["Warning"] = "warning";
  StatusValue2["Critical"] = "critical";
  StatusValue2["Attention"] = "attention";
  StatusValue2["New"] = "new";
  StatusValue2["InfoStrongExperimental"] = "info-strong-experimental";
  StatusValue2["SuccessStrongExperimental"] = "success-strong-experimental";
  StatusValue2["WarningStrongExperimental"] = "warning-strong-experimental";
  StatusValue2["CriticalStrongExperimental"] = "critical-strong-experimental";
  StatusValue2["AttentionStrongExperimental"] = "attention-strong-experimental";
  StatusValue2["ReadOnlyExperimental"] = "read-only-experimental";
  StatusValue2["EnabledExperimental"] = "enabled-experimental";
})(StatusValue || (StatusValue = {}));
var ProgressValue;
(function(ProgressValue2) {
  ProgressValue2["Incomplete"] = "incomplete";
  ProgressValue2["PartiallyComplete"] = "partiallyComplete";
  ProgressValue2["Complete"] = "complete";
})(ProgressValue || (ProgressValue = {}));

// node_modules/@shopify/polaris/build/esm/components/Badge/utils.js
function getDefaultAccessibilityLabel(i18n, progress, status) {
  let progressLabel = "";
  let statusLabel = "";
  if (!progress && !status) {
    return "";
  }
  switch (progress) {
    case ProgressValue.Incomplete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.incomplete");
      break;
    case ProgressValue.PartiallyComplete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.partiallyComplete");
      break;
    case ProgressValue.Complete:
      progressLabel = i18n.translate("Polaris.Badge.PROGRESS_LABELS.complete");
      break;
  }
  switch (status) {
    case StatusValue.Info:
    case StatusValue.InfoStrongExperimental:
      statusLabel = i18n.translate("Polaris.Badge.STATUS_LABELS.info");
      break;
    case StatusValue.Success:
    case StatusValue.SuccessStrongExperimental:
      statusLabel = i18n.translate("Polaris.Badge.STATUS_LABELS.success");
      break;
    case StatusValue.Warning:
    case StatusValue.WarningStrongExperimental:
      statusLabel = i18n.translate("Polaris.Badge.STATUS_LABELS.warning");
      break;
    case StatusValue.Critical:
    case StatusValue.CriticalStrongExperimental:
      statusLabel = i18n.translate("Polaris.Badge.STATUS_LABELS.critical");
      break;
    case StatusValue.Attention:
    case StatusValue.AttentionStrongExperimental:
      statusLabel = i18n.translate("Polaris.Badge.STATUS_LABELS.attention");
      break;
    case StatusValue.New:
      statusLabel = i18n.translate("Polaris.Badge.STATUS_LABELS.new");
      break;
    case StatusValue.ReadOnlyExperimental:
      statusLabel = i18n.translate("Polaris.Badge.STATUS_LABELS.readOnly");
      break;
    case StatusValue.EnabledExperimental:
      statusLabel = i18n.translate("Polaris.Badge.STATUS_LABELS.enabled");
      break;
  }
  if (!status && progress) {
    return progressLabel;
  } else if (status && !progress) {
    return statusLabel;
  } else {
    return i18n.translate("Polaris.Badge.progressAndStatus", {
      progressLabel,
      statusLabel
    });
  }
}

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js
var import_react67 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.scss.js
var styles11 = {
  "Icon": "Polaris-Icon",
  "applyColor": "Polaris-Icon--applyColor",
  "hasBackdrop": "Polaris-Icon--hasBackdrop",
  "colorBase": "Polaris-Icon--colorBase",
  "colorSubdued": "Polaris-Icon--colorSubdued",
  "colorCritical": "Polaris-Icon--colorCritical",
  "colorInteractive": "Polaris-Icon--colorInteractive",
  "colorWarning": "Polaris-Icon--colorWarning",
  "colorHighlight": "Polaris-Icon--colorHighlight",
  "colorSuccess": "Polaris-Icon--colorSuccess",
  "colorPrimary": "Polaris-Icon--colorPrimary",
  "colorMagic": "Polaris-Icon--colorMagic",
  "Svg": "Polaris-Icon__Svg",
  "Img": "Polaris-Icon__Img",
  "Placeholder": "Polaris-Icon__Placeholder"
};

// node_modules/@shopify/polaris/build/esm/components/Icon/Icon.js
var COLORS_WITH_BACKDROPS = ["base", "critical", "highlight", "success", "warning"];
function Icon({
  source,
  color: color2,
  backdrop,
  accessibilityLabel
}) {
  let sourceType;
  if (typeof source === "function") {
    sourceType = "function";
  } else if (source === "placeholder") {
    sourceType = "placeholder";
  } else {
    sourceType = "external";
  }
  if (color2 && sourceType === "external" && true) {
    console.warn("Recoloring external SVGs is not supported. Set the intended color on your SVG instead.");
  }
  if (backdrop && color2 && !COLORS_WITH_BACKDROPS.includes(color2) && true) {
    console.warn(`The ${color2} variant does not have a supported backdrop color`);
  }
  const className = classNames(styles11.Icon, color2 && styles11[variationName("color", color2)], color2 && styles11.applyColor, backdrop && styles11.hasBackdrop);
  const SourceComponent = source;
  const contentMarkup = {
    function: /* @__PURE__ */ import_react67.default.createElement(SourceComponent, {
      className: styles11.Svg,
      focusable: "false",
      "aria-hidden": "true"
    }),
    placeholder: /* @__PURE__ */ import_react67.default.createElement("div", {
      className: styles11.Placeholder
    }),
    external: /* @__PURE__ */ import_react67.default.createElement("img", {
      className: styles11.Img,
      src: `data:image/svg+xml;utf8,${source}`,
      alt: "",
      "aria-hidden": "true"
    })
  };
  return /* @__PURE__ */ import_react67.default.createElement("span", {
    className
  }, /* @__PURE__ */ import_react67.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel), contentMarkup[sourceType]);
}

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.js
var import_react69 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.scss.js
var styles12 = {
  "Pip": "Polaris-Badge-Pip",
  "statusInfo": "Polaris-Badge-Pip--statusInfo",
  "statusSuccess": "Polaris-Badge-Pip--statusSuccess",
  "statusNew": "Polaris-Badge-Pip--statusNew",
  "statusAttention": "Polaris-Badge-Pip--statusAttention",
  "statusWarning": "Polaris-Badge-Pip--statusWarning",
  "statusCritical": "Polaris-Badge-Pip--statusCritical",
  "progressIncomplete": "Polaris-Badge-Pip--progressIncomplete",
  "progressPartiallyComplete": "Polaris-Badge-Pip--progressPartiallyComplete",
  "progressComplete": "Polaris-Badge-Pip--progressComplete"
};

// node_modules/@shopify/polaris/build/esm/utilities/i18n/hooks.js
var import_react68 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/errors.js
var MissingAppProviderError = class extends Error {
  constructor(message = "") {
    super(`${message ? `${message} ` : message}Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.`);
    this.name = "MissingAppProviderError";
  }
};

// node_modules/@shopify/polaris/build/esm/utilities/i18n/hooks.js
function useI18n() {
  const i18n = (0, import_react68.useContext)(I18nContext);
  if (!i18n) {
    throw new MissingAppProviderError("No i18n was provided.");
  }
  return i18n;
}

// node_modules/@shopify/polaris/build/esm/components/Badge/components/Pip/Pip.js
function Pip({
  status,
  progress = "complete",
  accessibilityLabelOverride
}) {
  const i18n = useI18n();
  const className = classNames(styles12.Pip, status && styles12[variationName("status", status)], progress && styles12[variationName("progress", progress)]);
  const accessibilityLabel = accessibilityLabelOverride ? accessibilityLabelOverride : getDefaultAccessibilityLabel(i18n, progress, status);
  return /* @__PURE__ */ import_react69.default.createElement("span", {
    className
  }, /* @__PURE__ */ import_react69.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel));
}

// node_modules/@shopify/polaris/build/esm/components/Badge/Badge.js
var DEFAULT_SIZE = "medium";
var progressIconMap = {
  complete: () => /* @__PURE__ */ import_react70.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react70.default.createElement("path", {
    d: "M6 10c0-.93 0-1.395.102-1.776a3 3 0 0 1 2.121-2.122C8.605 6 9.07 6 10 6c.93 0 1.395 0 1.776.102a3 3 0 0 1 2.122 2.122C14 8.605 14 9.07 14 10s0 1.395-.102 1.777a3 3 0 0 1-2.122 2.12C11.395 14 10.93 14 10 14s-1.395 0-1.777-.102a3 3 0 0 1-2.12-2.121C6 11.395 6 10.93 6 10Z"
  })),
  partiallyComplete: () => /* @__PURE__ */ import_react70.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react70.default.createElement("path", {
    fillRule: "evenodd",
    d: "m8.888 6.014-.017-.018-.02.02c-.253.013-.45.038-.628.086a3 3 0 0 0-2.12 2.122C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.121 2.12C8.605 14 9.07 14 10 14c.93 0 1.395 0 1.776-.102a3 3 0 0 0 2.122-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.122-2.122C11.395 6 10.93 6 10 6c-.475 0-.829 0-1.112.014ZM8.446 7.34a1.75 1.75 0 0 0-1.041.94l4.314 4.315c.443-.2.786-.576.941-1.042L8.446 7.34Zm4.304 2.536L10.124 7.25c.908.001 1.154.013 1.329.06a1.75 1.75 0 0 1 1.237 1.237c.047.175.059.42.06 1.329ZM8.547 12.69c.182.05.442.06 1.453.06h.106L7.25 9.894V10c0 1.01.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237Z"
  })),
  incomplete: () => /* @__PURE__ */ import_react70.default.createElement("svg", {
    viewBox: "0 0 20 20"
  }, /* @__PURE__ */ import_react70.default.createElement("path", {
    fillRule: "evenodd",
    d: "M8.547 12.69c.183.05.443.06 1.453.06s1.27-.01 1.453-.06a1.75 1.75 0 0 0 1.237-1.237c.05-.182.06-.443.06-1.453s-.01-1.27-.06-1.453a1.75 1.75 0 0 0-1.237-1.237c-.182-.05-.443-.06-1.453-.06s-1.27.01-1.453.06A1.75 1.75 0 0 0 7.31 8.547c-.05.183-.06.443-.06 1.453s.01 1.27.06 1.453a1.75 1.75 0 0 0 1.237 1.237ZM6.102 8.224C6 8.605 6 9.07 6 10s0 1.395.102 1.777a3 3 0 0 0 2.122 2.12C8.605 14 9.07 14 10 14s1.395 0 1.777-.102a3 3 0 0 0 2.12-2.121C14 11.395 14 10.93 14 10c0-.93 0-1.395-.102-1.776a3 3 0 0 0-2.121-2.122C11.395 6 10.93 6 10 6c-.93 0-1.395 0-1.776.102a3 3 0 0 0-2.122 2.122Z"
  }))
};
function Badge({
  children,
  status,
  progress,
  icon,
  size = DEFAULT_SIZE,
  statusAndProgressLabelOverride
}) {
  const i18n = useI18n();
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const withinFilter = (0, import_react70.useContext)(WithinFilterContext);
  const className = classNames(styles10.Badge, status && styles10[variationName("status", status)], size && size !== DEFAULT_SIZE && styles10[variationName("size", size)], withinFilter && styles10.withinFilter);
  const accessibilityLabel = statusAndProgressLabelOverride ? statusAndProgressLabelOverride : getDefaultAccessibilityLabel(i18n, progress, status);
  let accessibilityMarkup = Boolean(accessibilityLabel) && /* @__PURE__ */ import_react70.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, accessibilityLabel);
  if (progress && !icon) {
    accessibilityMarkup = polarisSummerEditions2023 ? /* @__PURE__ */ import_react70.default.createElement("span", {
      className: styles10.Icon
    }, /* @__PURE__ */ import_react70.default.createElement(Icon, {
      accessibilityLabel,
      source: progressIconMap[progress]
    })) : /* @__PURE__ */ import_react70.default.createElement("span", {
      className: styles10.PipContainer
    }, /* @__PURE__ */ import_react70.default.createElement(Pip, {
      progress,
      status,
      accessibilityLabelOverride: accessibilityLabel
    }));
  }
  return /* @__PURE__ */ import_react70.default.createElement("span", {
    className
  }, accessibilityMarkup, icon && /* @__PURE__ */ import_react70.default.createElement("span", {
    className: styles10.Icon
  }, /* @__PURE__ */ import_react70.default.createElement(Icon, {
    source: icon
  })), children && /* @__PURE__ */ import_react70.default.createElement(Text, {
    as: "span",
    variant: "bodySm",
    fontWeight: status === "new" ? "medium" : void 0
  }, children));
}
Badge.Pip = Pip;

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.js
var import_react74 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-toggle.js
var import_react71 = __toESM(require_react());
function useToggle(initialState) {
  const [value, setState] = (0, import_react71.useState)(initialState);
  return {
    value,
    toggle: (0, import_react71.useCallback)(() => setState((state) => !state), []),
    setTrue: (0, import_react71.useCallback)(() => setState(true), []),
    setFalse: (0, import_react71.useCallback)(() => setState(false), [])
  };
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.scss.js
var styles13 = {
  "TooltipContainer": "Polaris-Tooltip__TooltipContainer",
  "HasUnderline": "Polaris-Tooltip__HasUnderline"
};

// node_modules/@shopify/polaris/build/esm/utilities/ephemeral-presence-manager/hooks.js
var import_react72 = __toESM(require_react());
function useEphemeralPresenceManager() {
  const ephemeralPresenceManager = (0, import_react72.useContext)(EphemeralPresenceManagerContext);
  if (!ephemeralPresenceManager) {
    throw new Error("No ephemeral presence manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  }
  return ephemeralPresenceManager;
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js
var import_react73 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.scss.js
var styles14 = {
  "TooltipOverlay": "Polaris-Tooltip-TooltipOverlay",
  "Tail": "Polaris-Tooltip-TooltipOverlay__Tail",
  "positionedAbove": "Polaris-Tooltip-TooltipOverlay--positionedAbove",
  "measuring": "Polaris-Tooltip-TooltipOverlay--measuring",
  "measured": "Polaris-Tooltip-TooltipOverlay--measured",
  "instant": "Polaris-Tooltip-TooltipOverlay--instant",
  "Content": "Polaris-Tooltip-TooltipOverlay__Content",
  "default": "Polaris-Tooltip-TooltipOverlay--default",
  "wide": "Polaris-Tooltip-TooltipOverlay--wide"
};

// node_modules/@shopify/polaris/build/esm/components/Tooltip/components/TooltipOverlay/TooltipOverlay.js
var tailUpPaths = /* @__PURE__ */ import_react73.default.createElement(import_react73.default.Fragment, null, /* @__PURE__ */ import_react73.default.createElement("path", {
  d: "M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z",
  fill: "#E3E3E3"
}), /* @__PURE__ */ import_react73.default.createElement("path", {
  d: "M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z",
  fill: "var(--p-color-bg)"
}));
var tailDownPaths = /* @__PURE__ */ import_react73.default.createElement(import_react73.default.Fragment, null, /* @__PURE__ */ import_react73.default.createElement("path", {
  d: "m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z",
  fill: "#D4D4D4"
}), /* @__PURE__ */ import_react73.default.createElement("path", {
  d: "M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z",
  fill: "var(--p-color-bg)"
}));
function TooltipOverlay({
  active,
  activator,
  preferredPosition = "above",
  preventInteraction,
  id,
  children,
  accessibilityLabel,
  width,
  padding,
  borderRadius,
  zIndexOverride,
  instant
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const i18n = useI18n();
  const markup = active ? /* @__PURE__ */ import_react73.default.createElement(PositionedOverlay, {
    active,
    activator,
    preferredPosition,
    preventInteraction,
    render: renderTooltip,
    zIndexOverride
  }) : null;
  return markup;
  function renderTooltip(overlayDetails) {
    const {
      measuring,
      desiredHeight,
      positioning,
      chevronOffset
    } = overlayDetails;
    const containerClassName = classNames(styles14.TooltipOverlay, measuring && styles14.measuring, !measuring && styles14.measured, instant && styles14.instant, positioning === "above" && styles14.positionedAbove);
    const contentClassName = classNames(styles14.Content, width && styles14[width]);
    const contentStyles = measuring ? void 0 : {
      minHeight: desiredHeight
    };
    const style = {
      "--pc-tooltip-chevron-x-pos": `${chevronOffset}px`,
      "--pc-tooltip-border-radius": borderRadius ? `var(--p-border-radius-${borderRadius})` : void 0,
      "--pc-tooltip-padding": padding && padding === "default" ? "var(--p-space-1) var(--p-space-2)" : `var(--p-space-${padding})`
    };
    return /* @__PURE__ */ import_react73.default.createElement("div", Object.assign({
      style,
      className: containerClassName
    }, layer.props), polarisSummerEditions2023 && /* @__PURE__ */ import_react73.default.createElement("svg", {
      className: styles14.Tail,
      width: "19",
      height: "11",
      fill: "none"
    }, positioning === "above" ? tailDownPaths : tailUpPaths), /* @__PURE__ */ import_react73.default.createElement("div", {
      id,
      role: "tooltip",
      className: contentClassName,
      style: {
        ...contentStyles,
        ...style
      },
      "aria-label": accessibilityLabel ? i18n.translate("Polaris.TooltipOverlay.accessibilityLabel", {
        label: accessibilityLabel
      }) : void 0
    }, children));
  }
}

// node_modules/@shopify/polaris/build/esm/components/Tooltip/Tooltip.js
var HOVER_OUT_TIMEOUT = 150;
function Tooltip({
  children,
  content,
  dismissOnMouseOut,
  active: originalActive,
  hoverDelay,
  preferredPosition = "above",
  activatorWrapper = "span",
  accessibilityLabel,
  width = "default",
  padding = "default",
  borderRadius: borderRadiusProp,
  zIndexOverride,
  hasUnderline,
  persistOnClick,
  onOpen,
  onClose
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const borderRadius = borderRadiusProp || (polarisSummerEditions2023 ? "2" : "1");
  const WrapperComponent = activatorWrapper;
  const {
    value: active,
    setTrue: setActiveTrue,
    setFalse: handleBlur
  } = useToggle(Boolean(originalActive));
  const {
    value: persist,
    toggle: togglePersisting
  } = useToggle(Boolean(originalActive) && Boolean(persistOnClick));
  const [activatorNode, setActivatorNode] = (0, import_react74.useState)(null);
  const {
    presenceList,
    addPresence,
    removePresence
  } = useEphemeralPresenceManager();
  const id = (0, import_react74.useId)();
  const activatorContainer = (0, import_react74.useRef)(null);
  const mouseEntered = (0, import_react74.useRef)(false);
  const [shouldAnimate, setShouldAnimate] = (0, import_react74.useState)(Boolean(!originalActive));
  const hoverDelayTimeout = (0, import_react74.useRef)(null);
  const hoverOutTimeout = (0, import_react74.useRef)(null);
  const handleFocus = (0, import_react74.useCallback)(() => {
    if (originalActive !== false) {
      setActiveTrue();
    }
  }, [originalActive, setActiveTrue]);
  (0, import_react74.useEffect)(() => {
    const firstFocusable = activatorContainer.current ? findFirstFocusableNode(activatorContainer.current) : null;
    const accessibilityNode = firstFocusable || activatorContainer.current;
    if (!accessibilityNode)
      return;
    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute("aria-describedby", id);
    accessibilityNode.setAttribute("data-polaris-tooltip-activator", "true");
  }, [id, children]);
  (0, import_react74.useEffect)(() => {
    return () => {
      if (hoverDelayTimeout.current) {
        clearTimeout(hoverDelayTimeout.current);
      }
      if (hoverOutTimeout.current) {
        clearTimeout(hoverOutTimeout.current);
      }
    };
  }, []);
  const handleOpen = (0, import_react74.useCallback)(() => {
    setShouldAnimate(!presenceList.tooltip && !active);
    onOpen?.();
    addPresence("tooltip");
  }, [addPresence, presenceList.tooltip, onOpen, active]);
  const handleClose = (0, import_react74.useCallback)(() => {
    onClose?.();
    setShouldAnimate(false);
    hoverOutTimeout.current = setTimeout(() => {
      removePresence("tooltip");
    }, HOVER_OUT_TIMEOUT);
  }, [removePresence, onClose]);
  const handleKeyUp = (0, import_react74.useCallback)((event) => {
    if (event.key !== "Escape")
      return;
    handleClose?.();
    handleBlur();
    persistOnClick && togglePersisting();
  }, [handleBlur, handleClose, persistOnClick, togglePersisting]);
  (0, import_react74.useEffect)(() => {
    if (originalActive === false && active) {
      handleClose();
      handleBlur();
    }
  }, [originalActive, active, handleClose, handleBlur]);
  const portal2 = activatorNode ? /* @__PURE__ */ import_react74.default.createElement(Portal, {
    idPrefix: "tooltip"
  }, /* @__PURE__ */ import_react74.default.createElement(TooltipOverlay, {
    id,
    preferredPosition,
    activator: activatorNode,
    active,
    accessibilityLabel,
    onClose: noop3,
    preventInteraction: dismissOnMouseOut,
    width,
    padding,
    borderRadius,
    zIndexOverride,
    instant: !shouldAnimate
  }, content)) : null;
  const wrapperClassNames = classNames(activatorWrapper === "div" && styles13.TooltipContainer, hasUnderline && styles13.HasUnderline);
  return /* @__PURE__ */ import_react74.default.createElement(WrapperComponent, {
    onFocus: () => {
      handleOpen();
      handleFocus();
    },
    onBlur: () => {
      handleClose();
      handleBlur();
      if (persistOnClick) {
        togglePersisting();
      }
    },
    onMouseLeave: handleMouseLeave,
    onMouseOver: handleMouseEnterFix,
    onMouseDown: persistOnClick ? togglePersisting : void 0,
    ref: setActivator,
    onKeyUp: handleKeyUp,
    className: wrapperClassNames
  }, children, portal2);
  function setActivator(node) {
    const activatorContainerRef = activatorContainer;
    if (node == null) {
      activatorContainerRef.current = null;
      setActivatorNode(null);
      return;
    }
    node.firstElementChild instanceof HTMLElement && setActivatorNode(node.firstElementChild);
    activatorContainerRef.current = node;
  }
  function handleMouseEnter() {
    mouseEntered.current = true;
    if (hoverDelay && !presenceList.tooltip) {
      hoverDelayTimeout.current = setTimeout(() => {
        handleOpen();
        handleFocus();
      }, hoverDelay);
    } else {
      handleOpen();
      handleFocus();
    }
  }
  function handleMouseLeave() {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }
    mouseEntered.current = false;
    handleClose();
    if (!persist) {
      handleBlur();
    }
  }
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}
function noop3() {
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledLink/UnstyledLink.js
var import_react76 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/link/hooks.js
var import_react75 = __toESM(require_react());
function useLink() {
  return (0, import_react75.useContext)(LinkContext);
}

// node_modules/@shopify/polaris/build/esm/components/UnstyledLink/UnstyledLink.js
var UnstyledLink = /* @__PURE__ */ (0, import_react76.memo)(/* @__PURE__ */ (0, import_react76.forwardRef)(function UnstyledLink2(props, _ref) {
  const LinkComponent = useLink();
  if (LinkComponent) {
    return /* @__PURE__ */ import_react76.default.createElement(LinkComponent, Object.assign({}, unstyled.props, props, {
      ref: _ref
    }));
  }
  const {
    external,
    url,
    target: targetProp,
    ...rest
  } = props;
  let target;
  if (external) {
    target = "_blank";
  } else {
    target = targetProp ?? void 0;
  }
  const rel = target === "_blank" ? "noopener noreferrer" : void 0;
  return /* @__PURE__ */ import_react76.default.createElement("a", Object.assign({
    target
  }, rest, {
    href: url,
    rel
  }, unstyled.props, {
    ref: _ref
  }));
}));

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Item/Item.js
function Item({
  id,
  badge,
  content,
  accessibilityLabel,
  helpText,
  url,
  onAction,
  onMouseEnter,
  icon,
  image,
  prefix,
  suffix,
  disabled,
  external,
  destructive,
  ellipsis,
  truncate,
  active,
  role
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const className = classNames(styles9.Item, disabled && styles9.disabled, destructive && styles9.destructive, active && styles9.active);
  let prefixMarkup = null;
  if (prefix) {
    prefixMarkup = /* @__PURE__ */ import_react77.default.createElement("span", {
      className: styles9.Prefix
    }, prefix);
  } else if (icon) {
    prefixMarkup = /* @__PURE__ */ import_react77.default.createElement("span", {
      className: styles9.Prefix
    }, /* @__PURE__ */ import_react77.default.createElement(Icon, {
      source: icon
    }));
  } else if (image) {
    prefixMarkup = /* @__PURE__ */ import_react77.default.createElement("span", {
      role: "presentation",
      className: styles9.Prefix,
      style: {
        backgroundImage: `url(${image}`
      }
    });
  }
  let contentText = content || "";
  if (truncate && content) {
    contentText = /* @__PURE__ */ import_react77.default.createElement(TruncateText, null, content);
  } else if (ellipsis) {
    contentText = `${content}\u2026`;
  }
  const contentMarkup = helpText ? /* @__PURE__ */ import_react77.default.createElement(import_react77.default.Fragment, null, /* @__PURE__ */ import_react77.default.createElement(Box, null, contentText), /* @__PURE__ */ import_react77.default.createElement(Text, {
    as: "span",
    variant: polarisSummerEditions2023 ? "bodySm" : void 0,
    color: polarisSummerEditions2023 && (active || disabled) ? void 0 : "subdued"
  }, helpText)) : contentText;
  const badgeMarkup = badge && /* @__PURE__ */ import_react77.default.createElement("span", {
    className: styles9.Suffix
  }, /* @__PURE__ */ import_react77.default.createElement(Badge, {
    status: badge.status
  }, badge.content));
  const suffixMarkup = suffix && /* @__PURE__ */ import_react77.default.createElement(Box, null, /* @__PURE__ */ import_react77.default.createElement("span", {
    className: styles9.Suffix
  }, suffix));
  const textMarkup = /* @__PURE__ */ import_react77.default.createElement("span", {
    className: styles9.Text
  }, contentMarkup);
  const contentElement = /* @__PURE__ */ import_react77.default.createElement(HorizontalStack, {
    blockAlign: "center",
    gap: polarisSummerEditions2023 ? "1_5-experimental" : "4",
    wrap: !truncate
  }, prefixMarkup, textMarkup, badgeMarkup, suffixMarkup);
  const contentWrapper = polarisSummerEditions2023 ? /* @__PURE__ */ import_react77.default.createElement(Box, {
    width: "100%"
  }, contentElement) : contentElement;
  const scrollMarkup = active ? /* @__PURE__ */ import_react77.default.createElement(Scrollable.ScrollTo, null) : null;
  const control = url ? /* @__PURE__ */ import_react77.default.createElement(UnstyledLink, {
    id,
    url: disabled ? null : url,
    className,
    external,
    "aria-label": accessibilityLabel,
    onClick: disabled ? null : onAction,
    role
  }, contentWrapper) : /* @__PURE__ */ import_react77.default.createElement("button", {
    id,
    type: "button",
    className,
    disabled,
    "aria-label": accessibilityLabel,
    onClick: onAction,
    onMouseUp: handleMouseUpByBlurring,
    role,
    onMouseEnter
  }, contentWrapper);
  return /* @__PURE__ */ import_react77.default.createElement(import_react77.default.Fragment, null, scrollMarkup, control);
}
var TruncateText = ({
  children
}) => {
  const textRef = (0, import_react77.useRef)(null);
  const [isOverflowing, setIsOverflowing] = (0, import_react77.useState)(false);
  useIsomorphicLayoutEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollWidth > textRef.current.offsetWidth);
    }
  }, [children]);
  const text = /* @__PURE__ */ import_react77.default.createElement(Text, {
    as: "span",
    truncate: true
  }, /* @__PURE__ */ import_react77.default.createElement(Box, {
    width: "100%",
    ref: textRef
  }, children));
  return isOverflowing ? /* @__PURE__ */ import_react77.default.createElement(Tooltip, {
    zIndexOverride: Number(zIndex2["z-index-6"]),
    preferredPosition: "above",
    hoverDelay: 1e3,
    content: children,
    dismissOnMouseOut: true
  }, /* @__PURE__ */ import_react77.default.createElement(Text, {
    as: "span",
    truncate: true
  }, children)) : text;
};

// node_modules/@shopify/polaris/build/esm/components/ActionList/components/Section/Section.js
function Section2({
  section,
  hasMultipleSections,
  isFirst,
  actionRole,
  onActionAnyItem
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const handleAction = (itemOnAction) => {
    return () => {
      if (itemOnAction) {
        itemOnAction();
      }
      if (onActionAnyItem) {
        onActionAnyItem();
      }
    };
  };
  const actionMarkup = section.items.map(({
    content,
    helpText,
    onAction,
    ...item
  }, index) => {
    return /* @__PURE__ */ import_react78.default.createElement(Box, {
      as: "li",
      key: `${content}-${index}`,
      role: actionRole === "menuitem" ? "presentation" : void 0
    }, /* @__PURE__ */ import_react78.default.createElement(Item, Object.assign({
      content,
      helpText,
      role: actionRole,
      onAction: handleAction(onAction)
    }, item)));
  });
  let titleMarkup = null;
  if (section.title) {
    titleMarkup = typeof section.title === "string" ? /* @__PURE__ */ import_react78.default.createElement(Box, polarisSummerEditions2023 ? {
      paddingBlockStart: "3",
      paddingBlockEnd: "1",
      paddingInlineStart: "3",
      paddingInlineEnd: "3"
    } : {
      paddingBlockStart: "4",
      paddingInlineStart: "4",
      paddingBlockEnd: "2",
      paddingInlineEnd: "4"
    }, /* @__PURE__ */ import_react78.default.createElement(Text, {
      as: "p",
      variant: polarisSummerEditions2023 ? "headingSm" : "headingXs"
    }, section.title)) : /* @__PURE__ */ import_react78.default.createElement(Box, {
      padding: "2"
    }, section.title);
  }
  let sectionRole;
  switch (actionRole) {
    case "option":
      sectionRole = "presentation";
      break;
    case "menuitem":
      sectionRole = !hasMultipleSections ? "menu" : "presentation";
      break;
    default:
      sectionRole = void 0;
      break;
  }
  const sectionMarkup = /* @__PURE__ */ import_react78.default.createElement(import_react78.default.Fragment, null, titleMarkup, /* @__PURE__ */ import_react78.default.createElement(Box, Object.assign({
    as: "ul",
    padding: polarisSummerEditions2023 ? "1_5-experimental" : "2"
  }, hasMultipleSections && {
    paddingBlockStart: "0"
  }, sectionRole && {
    role: sectionRole
  }, {
    tabIndex: !hasMultipleSections ? -1 : void 0
  }), actionMarkup));
  return hasMultipleSections ? /* @__PURE__ */ import_react78.default.createElement(Box, Object.assign({
    as: "li",
    role: "presentation",
    borderColor: "border-subdued"
  }, !isFirst && {
    borderBlockStartWidth: "1"
  }, !section.title && {
    paddingBlockStart: polarisSummerEditions2023 ? "1_5-experimental" : "2"
  }), sectionMarkup) : sectionMarkup;
}

// node_modules/@shopify/polaris/build/esm/components/ActionList/ActionList.js
function ActionList({
  items,
  sections = [],
  actionRole,
  onActionAnyItem
}) {
  let finalSections = [];
  const actionListRef = (0, import_react79.useRef)(null);
  if (items) {
    finalSections = [{
      items
    }, ...sections];
  } else if (sections) {
    finalSections = sections;
  }
  const hasMultipleSections = finalSections.length > 1;
  const elementRole = hasMultipleSections && actionRole === "menuitem" ? "menu" : void 0;
  const elementTabIndex = hasMultipleSections && actionRole === "menuitem" ? -1 : void 0;
  const sectionMarkup = finalSections.map((section, index) => {
    return section.items.length > 0 ? /* @__PURE__ */ import_react79.default.createElement(Section2, {
      key: typeof section.title === "string" ? section.title : index,
      section,
      hasMultipleSections,
      actionRole,
      onActionAnyItem,
      isFirst: index === 0
    }) : null;
  });
  const handleFocusPreviousItem = (evt) => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target)) {
        wrapFocusPreviousFocusableMenuItem(actionListRef.current, evt.target);
      }
    }
  };
  const handleFocusNextItem = (evt) => {
    evt.preventDefault();
    if (actionListRef.current && evt.target) {
      if (actionListRef.current.contains(evt.target)) {
        wrapFocusNextFocusableMenuItem(actionListRef.current, evt.target);
      }
    }
  };
  const listeners = actionRole === "menuitem" ? /* @__PURE__ */ import_react79.default.createElement(import_react79.default.Fragment, null, /* @__PURE__ */ import_react79.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.DownArrow,
    handler: handleFocusNextItem
  }), /* @__PURE__ */ import_react79.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.UpArrow,
    handler: handleFocusPreviousItem
  })) : null;
  return /* @__PURE__ */ import_react79.default.createElement(Box, {
    as: hasMultipleSections ? "ul" : "div",
    ref: actionListRef,
    role: elementRole,
    tabIndex: elementTabIndex
  }, listeners, sectionMarkup);
}
ActionList.Item = Item;

// node_modules/@shopify/polaris/build/esm/components/UnstyledButton/UnstyledButton.js
var import_react80 = __toESM(require_react());
function UnstyledButton({
  id,
  children,
  className,
  url,
  external,
  target,
  download,
  submit,
  disabled,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  ariaChecked,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  ...rest
}) {
  let buttonMarkup;
  const commonProps = {
    id,
    className,
    "aria-label": accessibilityLabel
  };
  const interactiveProps = {
    ...commonProps,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart
  };
  const handleClick = useDisableClick(disabled, onClick);
  if (url) {
    buttonMarkup = disabled ? (
      // Render an `<a>` so toggling disabled/enabled state changes only the
      // `href` attribute instead of replacing the whole element.
      /* @__PURE__ */ import_react80.default.createElement("a", commonProps, children)
    ) : /* @__PURE__ */ import_react80.default.createElement(UnstyledLink, Object.assign({}, interactiveProps, {
      url,
      external,
      target,
      download
    }, rest), children);
  } else {
    buttonMarkup = /* @__PURE__ */ import_react80.default.createElement("button", Object.assign({}, interactiveProps, {
      "aria-disabled": disabled,
      type: submit ? "submit" : "button",
      "aria-busy": loading ? true : void 0,
      "aria-controls": ariaControls,
      "aria-expanded": ariaExpanded,
      "aria-describedby": ariaDescribedBy,
      "aria-checked": ariaChecked,
      "aria-pressed": pressed,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onClick: handleClick,
      tabIndex: disabled ? -1 : void 0
    }, rest), children);
  }
  return buttonMarkup;
}

// node_modules/@shopify/polaris/build/esm/components/Button/Button.js
var DEFAULT_SIZE2 = "medium";
function Button({
  id,
  children,
  url,
  disabled,
  external,
  download,
  target,
  submit,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  ariaChecked,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  onPointerDown,
  icon,
  primary,
  outline,
  destructive,
  disclosure,
  plain,
  monochrome,
  removeUnderline,
  size = DEFAULT_SIZE2,
  textAlign,
  fullWidth,
  connectedDisclosure,
  dataPrimaryLink,
  primarySuccess
}) {
  const i18n = useI18n();
  const isDisabled = disabled || loading;
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const className = classNames(styles4.Button, primary && styles4.primary, outline && !polarisSummerEditions2023 && styles4.outline, destructive && styles4.destructive, primary && plain && styles4.primaryPlain, isDisabled && styles4.disabled, loading && styles4.loading, plain && !primary && styles4.plain, pressed && !disabled && !url && styles4.pressed, monochrome && styles4.monochrome, size && size !== DEFAULT_SIZE2 && styles4[variationName("size", size)], textAlign && styles4[variationName("textAlign", textAlign)], fullWidth && styles4.fullWidth, icon && children == null && styles4.iconOnly, connectedDisclosure && styles4.connectedDisclosure, removeUnderline && styles4.removeUnderline, primarySuccess && styles4.primary, primarySuccess && styles4.success, polarisSummerEditions2023 && destructive && !outline && !plain && styles4.primary, polarisSummerEditions2023 && outline && destructive && styles4.destructive);
  const disclosureUpIcon = polarisSummerEditions2023 ? SvgChevronUpMinor : SvgCaretUpMinor;
  const disclosureDownIcon = polarisSummerEditions2023 ? SvgChevronDownMinor : SvgCaretDownMinor;
  const disclosureMarkup = disclosure ? /* @__PURE__ */ import_react81.default.createElement("span", {
    className: styles4.Icon
  }, /* @__PURE__ */ import_react81.default.createElement("div", {
    className: classNames(styles4.DisclosureIcon, loading && styles4.hidden)
  }, /* @__PURE__ */ import_react81.default.createElement(Icon, {
    source: loading ? "placeholder" : getDisclosureIconSource(disclosure, disclosureUpIcon, disclosureDownIcon)
  }))) : null;
  const iconSource = isIconSource(icon) ? /* @__PURE__ */ import_react81.default.createElement(Icon, {
    source: loading ? "placeholder" : icon
  }) : icon;
  const iconMarkup = iconSource ? /* @__PURE__ */ import_react81.default.createElement("span", {
    className: classNames(styles4.Icon, loading && styles4.hidden)
  }, iconSource) : null;
  const childMarkup = children ? /* @__PURE__ */ import_react81.default.createElement("span", {
    className: classNames(styles4.Text, removeUnderline && styles4.removeUnderline),
    key: disabled ? "text-disabled" : "text"
  }, children) : null;
  const spinnerSVGMarkup = loading ? /* @__PURE__ */ import_react81.default.createElement("span", {
    className: styles4.Spinner
  }, /* @__PURE__ */ import_react81.default.createElement(Spinner, {
    size: "small",
    accessibilityLabel: i18n.translate("Polaris.Button.spinnerAccessibilityLabel")
  })) : null;
  const [disclosureActive, setDisclosureActive] = (0, import_react81.useState)(false);
  const toggleDisclosureActive = (0, import_react81.useCallback)(() => {
    setDisclosureActive((disclosureActive2) => !disclosureActive2);
  }, []);
  const handleClick = useDisableClick(disabled, toggleDisclosureActive);
  let connectedDisclosureMarkup;
  if (connectedDisclosure) {
    const connectedDisclosureClassName = classNames(styles4.Button, primary && styles4.primary, outline && styles4.outline, size && size !== DEFAULT_SIZE2 && styles4[variationName("size", size)], textAlign && styles4[variationName("textAlign", textAlign)], destructive && styles4.destructive, connectedDisclosure.disabled && styles4.disabled, styles4.iconOnly, styles4.ConnectedDisclosure, monochrome && styles4.monochrome);
    const defaultLabel = i18n.translate("Polaris.Button.connectedDisclosureAccessibilityLabel");
    const {
      disabled: disabled2,
      accessibilityLabel: disclosureLabel = defaultLabel
    } = connectedDisclosure;
    const connectedDisclosureActivator = /* @__PURE__ */ import_react81.default.createElement("button", {
      type: "button",
      className: connectedDisclosureClassName,
      "aria-disabled": disabled2,
      "aria-label": disclosureLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-checked": ariaChecked,
      onClick: handleClick,
      onMouseUp: handleMouseUpByBlurring,
      tabIndex: disabled2 ? -1 : void 0
    }, /* @__PURE__ */ import_react81.default.createElement("span", {
      className: styles4.Icon
    }, /* @__PURE__ */ import_react81.default.createElement(Icon, {
      source: polarisSummerEditions2023 ? SvgChevronDownMinor : SvgCaretDownMinor
    })));
    connectedDisclosureMarkup = /* @__PURE__ */ import_react81.default.createElement(Popover2, {
      active: disclosureActive,
      onClose: toggleDisclosureActive,
      activator: connectedDisclosureActivator,
      preferredAlignment: "right"
    }, /* @__PURE__ */ import_react81.default.createElement(ActionList, {
      items: connectedDisclosure.actions,
      onActionAnyItem: toggleDisclosureActive
    }));
  }
  const commonProps = {
    id,
    className,
    accessibilityLabel,
    ariaDescribedBy,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
    "data-primary-link": dataPrimaryLink
  };
  const linkProps = {
    url,
    external,
    download,
    target
  };
  const actionProps = {
    submit,
    disabled: isDisabled,
    loading,
    ariaControls,
    ariaExpanded,
    ariaChecked,
    pressed,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onPointerDown
  };
  const buttonMarkup = /* @__PURE__ */ import_react81.default.createElement(UnstyledButton, Object.assign({}, commonProps, linkProps, actionProps), /* @__PURE__ */ import_react81.default.createElement("span", {
    className: styles4.Content
  }, spinnerSVGMarkup, iconMarkup, childMarkup, disclosureMarkup));
  return connectedDisclosureMarkup ? /* @__PURE__ */ import_react81.default.createElement("div", {
    className: styles4.ConnectedDisclosureWrapper
  }, buttonMarkup, connectedDisclosureMarkup) : buttonMarkup;
}
function isIconSource(x) {
  return typeof x === "string" || typeof x === "object" && x.body || typeof x === "function";
}
function getDisclosureIconSource(disclosure, upIcon, downIcon) {
  if (disclosure === "select") {
    return SvgSelectMinor;
  }
  return disclosure === "up" ? upIcon : downIcon;
}

// node_modules/@shopify/polaris/build/esm/components/Card/Card.js
var import_react84 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/within-content-context.js
var import_react82 = __toESM(require_react());
var WithinContentContext = /* @__PURE__ */ (0, import_react82.createContext)(false);

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.js
var import_react83 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.scss.js
var styles15 = {
  "ShadowBevel": "Polaris-ShadowBevel"
};

// node_modules/@shopify/polaris/build/esm/components/ShadowBevel/ShadowBevel.js
function ShadowBevel(props) {
  const {
    as = "div",
    bevel = true,
    borderRadius,
    boxShadow,
    children,
    zIndex: zIndex3 = "0"
  } = props;
  const {
    polarisSummerEditions2023ShadowBevelOptOut
  } = useFeatures();
  const Component2 = as;
  return /* @__PURE__ */ import_react83.default.createElement(Component2, {
    className: styles15.ShadowBevel,
    style: {
      "--pc-shadow-bevel-z-index": zIndex3,
      ...getResponsiveValue("shadow-bevel", "content", mapResponsiveProp(bevel, (bevel2) => {
        if (polarisSummerEditions2023ShadowBevelOptOut) {
          return "none";
        }
        return bevel2 ? '""' : "none";
      })),
      ...getResponsiveValue("shadow-bevel", "box-shadow", mapResponsiveProp(bevel, (bevel2) => bevel2 ? `var(--p-shadow-${boxShadow})` : "none")),
      ...getResponsiveValue("shadow-bevel", "border-radius", mapResponsiveProp(bevel, (bevel2) => bevel2 ? `var(--p-border-radius-${borderRadius})` : "var(--p-border-radius-0-experimental)"))
    }
  }, children);
}
function mapResponsiveProp(responsiveProp, callback) {
  if (typeof responsiveProp === "boolean") {
    return callback(responsiveProp);
  }
  return Object.fromEntries(Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [breakpointsAlias, callback(value)]));
}

// node_modules/@shopify/polaris/build/esm/components/Card/Card.js
var Card = ({
  children,
  background = "bg",
  padding = {
    xs: "4",
    sm: "5"
  },
  roundedAbove
}) => {
  const breakpoints3 = useBreakpoints();
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const defaultBorderRadius = polarisSummerEditions2023 ? "3" : "2";
  const isDefaultPadding = typeof padding !== "string" && padding?.xs === "4" && padding?.sm === "5" && padding.md === void 0 && padding.lg === void 0 && padding.xl === void 0;
  const finalPadding = isDefaultPadding && polarisSummerEditions2023 ? {
    xs: "4"
  } : padding;
  let hasBorderRadius = !roundedAbove;
  if (roundedAbove && breakpoints3[`${roundedAbove}Up`]) {
    hasBorderRadius = true;
  }
  return /* @__PURE__ */ import_react84.default.createElement(WithinContentContext.Provider, {
    value: true
  }, polarisSummerEditions2023 ? /* @__PURE__ */ import_react84.default.createElement(ShadowBevel, {
    boxShadow: "xs",
    borderRadius: hasBorderRadius ? "3" : "0-experimental",
    zIndex: "32"
  }, /* @__PURE__ */ import_react84.default.createElement(Box, {
    background,
    padding: finalPadding,
    overflowX: "hidden",
    overflowY: "hidden",
    minHeight: "100%"
  }, children)) : /* @__PURE__ */ import_react84.default.createElement(Box, {
    background,
    padding: finalPadding,
    shadow: "md",
    borderRadius: hasBorderRadius ? defaultBorderRadius : void 0,
    overflowX: "hidden",
    overflowY: "hidden"
  }, children));
};

// node_modules/@shopify/polaris/build/esm/components/VerticalStack/VerticalStack.js
var import_react85 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/VerticalStack/VerticalStack.scss.js
var styles16 = {
  "VerticalStack": "Polaris-VerticalStack",
  "listReset": "Polaris-VerticalStack--listReset",
  "fieldsetReset": "Polaris-VerticalStack--fieldsetReset"
};

// node_modules/@shopify/polaris/build/esm/components/VerticalStack/VerticalStack.js
var VerticalStack = ({
  as = "div",
  children,
  align,
  inlineAlign,
  gap,
  id,
  reverseOrder = false,
  ...restProps
}) => {
  const className = classNames(styles16.VerticalStack, (as === "ul" || as === "ol") && styles16.listReset, as === "fieldset" && styles16.fieldsetReset);
  const style = {
    "--pc-vertical-stack-align": align ? `${align}` : null,
    "--pc-vertical-stack-inline-align": inlineAlign ? `${inlineAlign}` : null,
    "--pc-vertical-stack-order": reverseOrder ? "column-reverse" : "column",
    ...getResponsiveProps("vertical-stack", "gap", "space", gap)
  };
  return /* @__PURE__ */ import_react85.default.createElement(as, {
    className,
    style: sanitizeCustomProperties(style),
    ...restProps
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.js
var import_react95 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/use-event-listener.js
var import_react86 = __toESM(require_react());
function useEventListener(eventName, handler, target, options) {
  const handlerRef = (0, import_react86.useRef)(handler);
  const optionsRef = (0, import_react86.useRef)(options);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);
  (0, import_react86.useEffect)(() => {
    if (!(typeof eventName === "string" && target !== null))
      return;
    let targetElement;
    if (typeof target === "undefined") {
      targetElement = window;
    } else if ("current" in target) {
      if (target.current === null)
        return;
      targetElement = target.current;
    } else {
      targetElement = target;
    }
    const eventOptions = optionsRef.current;
    const eventListener = (event) => handlerRef.current(event);
    targetElement.addEventListener(eventName, eventListener, eventOptions);
    return () => {
      targetElement.removeEventListener(eventName, eventListener, eventOptions);
    };
  }, [eventName, target]);
}

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.scss.js
var styles17 = {
  "TextField": "Polaris-TextField",
  "ClearButton": "Polaris-TextField__ClearButton",
  "disabled": "Polaris-TextField--disabled",
  "error": "Polaris-TextField--error",
  "readOnly": "Polaris-TextField--readOnly",
  "Input": "Polaris-TextField__Input",
  "Backdrop": "Polaris-TextField__Backdrop",
  "multiline": "Polaris-TextField--multiline",
  "hasValue": "Polaris-TextField--hasValue",
  "focus": "Polaris-TextField--focus",
  "VerticalContent": "Polaris-TextField__VerticalContent",
  "Prefix": "Polaris-TextField__Prefix",
  "suggestion": "Polaris-TextField--suggestion",
  "borderless": "Polaris-TextField--borderless",
  "Input-hasClearButton": "Polaris-TextField__Input--hasClearButton",
  "Input-suffixed": "Polaris-TextField__Input--suffixed",
  "Input-alignRight": "Polaris-TextField__Input--alignRight",
  "Input-alignLeft": "Polaris-TextField__Input--alignLeft",
  "Input-alignCenter": "Polaris-TextField__Input--alignCenter",
  "Suffix": "Polaris-TextField__Suffix",
  "CharacterCount": "Polaris-TextField__CharacterCount",
  "AlignFieldBottom": "Polaris-TextField__AlignFieldBottom",
  "Spinner": "Polaris-TextField__Spinner",
  "SpinnerIcon": "Polaris-TextField__SpinnerIcon",
  "Resizer": "Polaris-TextField__Resizer",
  "DummyInput": "Polaris-TextField__DummyInput",
  "Segment": "Polaris-TextField__Segment",
  "monospaced": "Polaris-TextField--monospaced"
};

// node_modules/@shopify/polaris/build/esm/components/TextField/components/Spinner/Spinner.js
var import_react87 = __toESM(require_react());
var Spinner2 = /* @__PURE__ */ import_react87.default.forwardRef(function Spinner3({
  onChange,
  onClick,
  onMouseDown,
  onMouseUp,
  onBlur
}, ref) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  function handleStep(step) {
    return () => onChange(step);
  }
  function handleMouseDown(onChange2) {
    return (event) => {
      if (event.button !== 0)
        return;
      onMouseDown(onChange2);
    };
  }
  return /* @__PURE__ */ import_react87.default.createElement("div", {
    className: styles17.Spinner,
    onClick,
    "aria-hidden": true,
    ref
  }, /* @__PURE__ */ import_react87.default.createElement("div", {
    role: "button",
    className: styles17.Segment,
    tabIndex: -1,
    onClick: handleStep(1),
    onMouseDown: handleMouseDown(handleStep(1)),
    onMouseUp,
    onBlur
  }, /* @__PURE__ */ import_react87.default.createElement("div", {
    className: styles17.SpinnerIcon
  }, /* @__PURE__ */ import_react87.default.createElement(Icon, {
    source: polarisSummerEditions2023 ? SvgChevronUpMinor : SvgCaretUpMinor
  }))), /* @__PURE__ */ import_react87.default.createElement("div", {
    role: "button",
    className: styles17.Segment,
    tabIndex: -1,
    onClick: handleStep(-1),
    onMouseDown: handleMouseDown(handleStep(-1)),
    onMouseUp,
    onBlur
  }, /* @__PURE__ */ import_react87.default.createElement("div", {
    className: styles17.SpinnerIcon
  }, /* @__PURE__ */ import_react87.default.createElement(Icon, {
    source: polarisSummerEditions2023 ? SvgChevronDownMinor : SvgCaretDownMinor
  }))));
});

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.js
var import_react91 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.scss.js
var styles18 = {
  "hidden": "Polaris-Labelled--hidden",
  "LabelWrapper": "Polaris-Labelled__LabelWrapper",
  "disabled": "Polaris-Labelled--disabled",
  "HelpText": "Polaris-Labelled__HelpText",
  "Error": "Polaris-Labelled__Error",
  "Action": "Polaris-Labelled__Action"
};

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.js
var import_react88 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.scss.js
var styles19 = {
  "InlineError": "Polaris-InlineError",
  "Icon": "Polaris-InlineError__Icon"
};

// node_modules/@shopify/polaris/build/esm/components/InlineError/InlineError.js
function InlineError({
  message,
  fieldID
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  if (!message) {
    return null;
  }
  return /* @__PURE__ */ import_react88.default.createElement("div", {
    id: errorTextID(fieldID),
    className: styles19.InlineError
  }, /* @__PURE__ */ import_react88.default.createElement("div", {
    className: styles19.Icon
  }, /* @__PURE__ */ import_react88.default.createElement(Icon, {
    source: polarisSummerEditions2023 ? SvgCircleAlertMajor : SvgDiamondAlertMinor
  })), message);
}
function errorTextID(id) {
  return `${id}Error`;
}

// node_modules/@shopify/polaris/build/esm/components/Label/Label.js
var import_react89 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Label/Label.scss.js
var styles20 = {
  "Label": "Polaris-Label",
  "hidden": "Polaris-Label--hidden",
  "Text": "Polaris-Label__Text",
  "RequiredIndicator": "Polaris-Label__RequiredIndicator"
};

// node_modules/@shopify/polaris/build/esm/components/Label/Label.js
function labelID(id) {
  return `${id}Label`;
}
function Label({
  children,
  id,
  hidden,
  requiredIndicator
}) {
  const className = classNames(styles20.Label, hidden && styles20.hidden);
  return /* @__PURE__ */ import_react89.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react89.default.createElement("label", {
    id: labelID(id),
    htmlFor: id,
    className: classNames(styles20.Text, requiredIndicator && styles20.RequiredIndicator)
  }, children));
}

// node_modules/@shopify/polaris/build/esm/components/Button/utils.js
var import_react90 = __toESM(require_react());
function buttonsFrom(actions, overrides = {}) {
  if (Array.isArray(actions)) {
    return actions.map((action, index) => buttonFrom(action, overrides, index));
  } else {
    const action = actions;
    return buttonFrom(action, overrides);
  }
}
function buttonFrom({
  content,
  onAction,
  ...action
}, overrides, key) {
  return /* @__PURE__ */ import_react90.default.createElement(Button, Object.assign({
    key,
    onClick: onAction
  }, action, overrides), content);
}

// node_modules/@shopify/polaris/build/esm/components/Labelled/Labelled.js
function Labelled({
  id,
  label,
  error,
  action,
  helpText,
  children,
  labelHidden,
  requiredIndicator,
  disabled,
  ...rest
}) {
  const className = classNames(labelHidden && styles18.hidden, disabled && styles18.disabled);
  const actionMarkup = action ? /* @__PURE__ */ import_react91.default.createElement("div", {
    className: styles18.Action
  }, buttonFrom(action, {
    plain: true
  })) : null;
  const helpTextMarkup = helpText ? /* @__PURE__ */ import_react91.default.createElement("div", {
    className: styles18.HelpText,
    id: helpTextID(id)
  }, /* @__PURE__ */ import_react91.default.createElement(Text, {
    as: "span",
    color: "subdued",
    breakWord: true
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== "boolean" && /* @__PURE__ */ import_react91.default.createElement("div", {
    className: styles18.Error
  }, /* @__PURE__ */ import_react91.default.createElement(InlineError, {
    message: error,
    fieldID: id
  }));
  const labelMarkup = label ? /* @__PURE__ */ import_react91.default.createElement("div", {
    className: styles18.LabelWrapper
  }, /* @__PURE__ */ import_react91.default.createElement(Label, Object.assign({
    id,
    requiredIndicator
  }, rest, {
    hidden: false
  }), label), actionMarkup) : null;
  return /* @__PURE__ */ import_react91.default.createElement("div", {
    className
  }, labelMarkup, children, errorMarkup, helpTextMarkup);
}
function helpTextID(id) {
  return `${id}HelpText`;
}

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.js
var import_react93 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.scss.js
var styles21 = {
  "Connected": "Polaris-Connected",
  "Item": "Polaris-Connected__Item",
  "Item-primary": "Polaris-Connected__Item--primary",
  "Item-focused": "Polaris-Connected__Item--focused"
};

// node_modules/@shopify/polaris/build/esm/components/Connected/components/Item/Item.js
var import_react92 = __toESM(require_react());
function Item2({
  children,
  position
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(false);
  const className = classNames(styles21.Item, focused && styles21["Item-focused"], position === "primary" ? styles21["Item-primary"] : styles21["Item-connection"]);
  return /* @__PURE__ */ import_react92.default.createElement("div", {
    onBlur: forceFalseFocused,
    onFocus: forceTrueFocused,
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Connected/Connected.js
function Connected({
  children,
  left,
  right
}) {
  const leftConnectionMarkup = left ? /* @__PURE__ */ import_react93.default.createElement(Item2, {
    position: "left"
  }, left) : null;
  const rightConnectionMarkup = right ? /* @__PURE__ */ import_react93.default.createElement(Item2, {
    position: "right"
  }, right) : null;
  return /* @__PURE__ */ import_react93.default.createElement("div", {
    className: styles21.Connected
  }, leftConnectionMarkup, /* @__PURE__ */ import_react93.default.createElement(Item2, {
    position: "primary"
  }, children), rightConnectionMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/TextField/components/Resizer/Resizer.js
var import_react94 = __toESM(require_react());
function Resizer({
  contents,
  currentHeight: currentHeightProp = null,
  minimumLines,
  onHeightChange
}) {
  const contentNode = (0, import_react94.useRef)(null);
  const minimumLinesNode = (0, import_react94.useRef)(null);
  const animationFrame = (0, import_react94.useRef)();
  const currentHeight = (0, import_react94.useRef)(currentHeightProp);
  if (currentHeightProp !== currentHeight.current) {
    currentHeight.current = currentHeightProp;
  }
  (0, import_react94.useEffect)(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);
  const minimumLinesMarkup = minimumLines ? /* @__PURE__ */ import_react94.default.createElement("div", {
    ref: minimumLinesNode,
    className: styles17.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getContentsForMinimumLines(minimumLines)
    }
  }) : null;
  const handleHeightCheck = (0, import_react94.useCallback)(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      if (!contentNode.current || !minimumLinesNode.current) {
        return;
      }
      const newHeight = Math.max(contentNode.current.offsetHeight, minimumLinesNode.current.offsetHeight);
      if (newHeight !== currentHeight.current) {
        onHeightChange(newHeight);
      }
    });
  }, [onHeightChange]);
  useIsomorphicLayoutEffect(() => {
    handleHeightCheck();
  });
  return /* @__PURE__ */ import_react94.default.createElement("div", {
    "aria-hidden": true,
    className: styles17.Resizer
  }, /* @__PURE__ */ import_react94.default.createElement(EventListener, {
    event: "resize",
    handler: handleHeightCheck
  }), /* @__PURE__ */ import_react94.default.createElement("div", {
    ref: contentNode,
    className: styles17.DummyInput,
    dangerouslySetInnerHTML: {
      __html: getFinalContents(contents)
    }
  }), minimumLinesMarkup);
}
var ENTITIES_TO_REPLACE = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\n": "<br>",
  "\r": ""
};
var REPLACE_REGEX2 = new RegExp(`[${Object.keys(ENTITIES_TO_REPLACE).join()}]`, "g");
function replaceEntity(entity) {
  return ENTITIES_TO_REPLACE[entity];
}
function getContentsForMinimumLines(minimumLines) {
  let content = "";
  for (let line = 0; line < minimumLines; line++) {
    content += "<br>";
  }
  return content;
}
function getFinalContents(contents) {
  return contents ? `${contents.replace(REPLACE_REGEX2, replaceEntity)}<br>` : "<br>";
}

// node_modules/@shopify/polaris/build/esm/components/TextField/TextField.js
function TextField({
  prefix,
  suffix,
  verticalContent,
  placeholder,
  value = "",
  helpText,
  label,
  labelAction,
  labelHidden,
  disabled,
  clearButton,
  readOnly,
  autoFocus,
  focused,
  multiline,
  error,
  connectedRight,
  connectedLeft,
  type = "text",
  name,
  id: idProp,
  role,
  step,
  largeStep,
  autoComplete,
  max,
  maxLength,
  maxHeight,
  min,
  minLength,
  pattern,
  inputMode,
  spellCheck,
  ariaOwns,
  ariaControls,
  ariaExpanded,
  ariaActiveDescendant,
  ariaAutocomplete,
  showCharacterCount,
  align,
  requiredIndicator,
  monospaced,
  selectTextOnFocus,
  suggestion,
  onClearButtonClick,
  onChange,
  onSpinnerChange,
  onFocus,
  onBlur,
  borderless
}) {
  const i18n = useI18n();
  const [height, setHeight] = (0, import_react95.useState)(null);
  const [focus, setFocus] = (0, import_react95.useState)(Boolean(focused));
  const isAfterInitial = useIsAfterInitialMount();
  const uniqId = (0, import_react95.useId)();
  const id = idProp ?? uniqId;
  const inputRef = (0, import_react95.useRef)(null);
  const textAreaRef = (0, import_react95.useRef)(null);
  const prefixRef = (0, import_react95.useRef)(null);
  const suffixRef = (0, import_react95.useRef)(null);
  const verticalContentRef = (0, import_react95.useRef)(null);
  const buttonPressTimer = (0, import_react95.useRef)();
  const spinnerRef = (0, import_react95.useRef)(null);
  (0, import_react95.useEffect)(() => {
    const input2 = multiline ? textAreaRef.current : inputRef.current;
    if (!input2 || focused === void 0)
      return;
    focused ? input2.focus() : input2.blur();
  }, [focused, verticalContent, multiline]);
  (0, import_react95.useEffect)(() => {
    const input2 = inputRef.current;
    const isSupportedInputType = type === "text" || type === "tel" || type === "search" || type === "url" || type === "password";
    if (!input2 || !isSupportedInputType || !suggestion) {
      return;
    }
    input2.setSelectionRange(value.length, suggestion.length);
  }, [focus, value, type, suggestion]);
  const normalizedValue = suggestion ? suggestion : value;
  const normalizedStep = step != null ? step : 1;
  const normalizedMax = max != null ? max : Infinity;
  const normalizedMin = min != null ? min : -Infinity;
  const className = classNames(styles17.TextField, Boolean(normalizedValue) && styles17.hasValue, disabled && styles17.disabled, readOnly && styles17.readOnly, error && styles17.error, multiline && styles17.multiline, focus && !disabled && styles17.focus, borderless && styles17.borderless);
  const inputType = type === "currency" ? "text" : type;
  const isNumericType = type === "number" || type === "integer";
  const prefixMarkup = prefix ? /* @__PURE__ */ import_react95.default.createElement("div", {
    className: styles17.Prefix,
    id: `${id}-Prefix`,
    ref: prefixRef
  }, prefix) : null;
  const suffixMarkup = suffix ? /* @__PURE__ */ import_react95.default.createElement("div", {
    className: styles17.Suffix,
    id: `${id}-Suffix`,
    ref: suffixRef
  }, suffix) : null;
  let characterCountMarkup = null;
  if (showCharacterCount) {
    const characterCount = normalizedValue.length;
    const characterCountLabel = maxLength ? i18n.translate("Polaris.TextField.characterCountWithMaxLength", {
      count: characterCount,
      limit: maxLength
    }) : i18n.translate("Polaris.TextField.characterCount", {
      count: characterCount
    });
    const characterCountClassName = classNames(styles17.CharacterCount, multiline && styles17.AlignFieldBottom);
    const characterCountText = !maxLength ? characterCount : `${characterCount}/${maxLength}`;
    characterCountMarkup = /* @__PURE__ */ import_react95.default.createElement("div", {
      id: `${id}-CharacterCounter`,
      className: characterCountClassName,
      "aria-label": characterCountLabel,
      "aria-live": focus ? "polite" : "off",
      "aria-atomic": "true",
      onClick: handleClickChild
    }, characterCountText);
  }
  const clearButtonVisible = normalizedValue !== "";
  const clearButtonMarkup = clearButton && clearButtonVisible ? /* @__PURE__ */ import_react95.default.createElement("button", {
    type: "button",
    className: styles17.ClearButton,
    onClick: handleClearButtonPress,
    disabled
  }, /* @__PURE__ */ import_react95.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, i18n.translate("Polaris.Common.clear")), /* @__PURE__ */ import_react95.default.createElement(Icon, {
    source: SvgCircleCancelMinor,
    color: "base"
  })) : null;
  const handleNumberChange = (0, import_react95.useCallback)((steps, stepAmount = normalizedStep) => {
    if (onChange == null && onSpinnerChange == null) {
      return;
    }
    const dpl = (num) => (num.toString().split(".")[1] || []).length;
    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) {
      return;
    }
    const decimalPlaces = type === "integer" ? 0 : Math.max(dpl(numericValue), dpl(stepAmount));
    const newValue = Math.min(Number(normalizedMax), Math.max(numericValue + steps * stepAmount, Number(normalizedMin)));
    if (onSpinnerChange != null) {
      onSpinnerChange(String(newValue.toFixed(decimalPlaces)), id);
    } else if (onChange != null) {
      onChange(String(newValue.toFixed(decimalPlaces)), id);
    }
  }, [id, normalizedMax, normalizedMin, onChange, onSpinnerChange, normalizedStep, type, value]);
  const handleButtonRelease = (0, import_react95.useCallback)(() => {
    clearTimeout(buttonPressTimer.current);
  }, []);
  const handleButtonPress = (0, import_react95.useCallback)((onChange2) => {
    const minInterval = 50;
    const decrementBy = 10;
    let interval = 200;
    const onChangeInterval = () => {
      if (interval > minInterval)
        interval -= decrementBy;
      onChange2(0);
      buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);
    };
    buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);
    document.addEventListener("mouseup", handleButtonRelease, {
      once: true
    });
  }, [handleButtonRelease]);
  const spinnerMarkup = isNumericType && step !== 0 && !disabled && !readOnly ? /* @__PURE__ */ import_react95.default.createElement(Spinner2, {
    onClick: handleClickChild,
    onChange: handleNumberChange,
    onMouseDown: handleButtonPress,
    onMouseUp: handleButtonRelease,
    ref: spinnerRef,
    onBlur: handleOnBlur
  }) : null;
  const style = multiline && height ? {
    height,
    maxHeight
  } : null;
  const handleExpandingResize = (0, import_react95.useCallback)((height2) => {
    setHeight(height2);
  }, []);
  const resizer = multiline && isAfterInitial ? /* @__PURE__ */ import_react95.default.createElement(Resizer, {
    contents: normalizedValue || placeholder,
    currentHeight: height,
    minimumLines: typeof multiline === "number" ? multiline : 1,
    onHeightChange: handleExpandingResize
  }) : null;
  const describedBy = [];
  if (error) {
    describedBy.push(`${id}Error`);
  }
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (showCharacterCount) {
    describedBy.push(`${id}-CharacterCounter`);
  }
  const labelledBy = [];
  if (prefix) {
    labelledBy.push(`${id}-Prefix`);
  }
  if (suffix) {
    labelledBy.push(`${id}-Suffix`);
  }
  if (verticalContent) {
    labelledBy.push(`${id}-VerticalContent`);
  }
  labelledBy.unshift(labelID(id));
  const inputClassName = classNames(styles17.Input, align && styles17[variationName("Input-align", align)], suffix && styles17["Input-suffixed"], clearButton && styles17["Input-hasClearButton"], monospaced && styles17.monospaced, suggestion && styles17.suggestion);
  const handleOnFocus = (event) => {
    setFocus(true);
    if (selectTextOnFocus && !suggestion) {
      const input2 = multiline ? textAreaRef.current : inputRef.current;
      input2?.select();
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  useEventListener("wheel", handleOnWheel, inputRef);
  function handleOnWheel(event) {
    if (document.activeElement === event.target && isNumericType) {
      event.stopPropagation();
    }
  }
  const input = /* @__PURE__ */ (0, import_react95.createElement)(multiline ? "textarea" : "input", {
    name,
    id,
    disabled,
    readOnly,
    role,
    autoFocus,
    value: normalizedValue,
    placeholder,
    style,
    autoComplete,
    className: inputClassName,
    ref: multiline ? textAreaRef : inputRef,
    min,
    max,
    step,
    minLength,
    maxLength,
    spellCheck,
    pattern,
    inputMode,
    type: inputType,
    rows: getRows(multiline),
    "aria-describedby": describedBy.length ? describedBy.join(" ") : void 0,
    "aria-labelledby": labelledBy.join(" "),
    "aria-invalid": Boolean(error),
    "aria-owns": ariaOwns,
    "aria-activedescendant": ariaActiveDescendant,
    "aria-autocomplete": ariaAutocomplete,
    "aria-controls": ariaControls,
    "aria-expanded": ariaExpanded,
    "aria-required": requiredIndicator,
    ...normalizeAriaMultiline(multiline),
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    onClick: handleClickChild,
    onKeyPress: handleKeyPress,
    onKeyDown: handleKeyDown2,
    onChange: !suggestion ? handleChange : void 0,
    onInput: suggestion ? handleChange : void 0
  });
  const inputWithVerticalContentMarkup = verticalContent ? /* @__PURE__ */ import_react95.default.createElement("div", {
    className: styles17.VerticalContent,
    id: `${id}-VerticalContent`,
    ref: verticalContentRef,
    onClick: handleClickChild
  }, verticalContent, input) : null;
  const inputMarkup = verticalContent ? inputWithVerticalContentMarkup : input;
  const backdropMarkup = /* @__PURE__ */ import_react95.default.createElement("div", {
    className: classNames(styles17.Backdrop, connectedLeft && styles17["Backdrop-connectedLeft"], connectedRight && styles17["Backdrop-connectedRight"])
  });
  return /* @__PURE__ */ import_react95.default.createElement(Labelled, {
    label,
    id,
    error,
    action: labelAction,
    labelHidden,
    helpText,
    requiredIndicator,
    disabled
  }, /* @__PURE__ */ import_react95.default.createElement(Connected, {
    left: connectedLeft,
    right: connectedRight
  }, /* @__PURE__ */ import_react95.default.createElement("div", {
    className,
    onClick: handleClick
  }, prefixMarkup, inputMarkup, suffixMarkup, characterCountMarkup, clearButtonMarkup, spinnerMarkup, backdropMarkup, resizer)));
  function handleChange(event) {
    onChange && onChange(event.currentTarget.value, id);
  }
  function handleClick(event) {
    const {
      target
    } = event;
    const inputRefRole = inputRef?.current?.getAttribute("role");
    if (target === inputRef.current && inputRefRole === "combobox") {
      inputRef.current?.focus();
      handleOnFocus(event);
      return;
    }
    if (isPrefixOrSuffix(target) || isVerticalContent(target) || isInput(target) || isSpinner(target) || focus) {
      return;
    }
    inputRef.current?.focus();
  }
  function handleClickChild(event) {
    if (!isSpinner(event.target) && !isInput(event.target)) {
      event.stopPropagation();
    }
    if (isPrefixOrSuffix(event.target) || isVerticalContent(event.target) || isInput(event.target) || focus) {
      return;
    }
    setFocus(true);
  }
  function handleClearButtonPress() {
    onClearButtonClick && onClearButtonClick(id);
  }
  function handleKeyPress(event) {
    const {
      key,
      which
    } = event;
    const numbersSpec = /[\d.,eE+-]$/;
    const integerSpec = /[\deE+-]$/;
    if (!isNumericType || which === Key.Enter || type === "number" && numbersSpec.test(key) || type === "integer" && integerSpec.test(key)) {
      return;
    }
    event.preventDefault();
  }
  function handleKeyDown2(event) {
    if (!isNumericType) {
      return;
    }
    const {
      key,
      which
    } = event;
    if ((which === Key.Home || key === "Home") && min !== void 0) {
      if (onSpinnerChange != null) {
        onSpinnerChange(String(min), id);
      } else if (onChange != null) {
        onChange(String(min), id);
      }
    }
    if ((which === Key.End || key === "End") && max !== void 0) {
      if (onSpinnerChange != null) {
        onSpinnerChange(String(max), id);
      } else if (onChange != null) {
        onChange(String(max), id);
      }
    }
    if ((which === Key.PageUp || key === "PageUp") && largeStep !== void 0) {
      handleNumberChange(1, largeStep);
    }
    if ((which === Key.PageDown || key === "PageDown") && largeStep !== void 0) {
      handleNumberChange(-1, largeStep);
    }
  }
  function handleOnBlur(event) {
    setFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  }
  function isInput(target) {
    return target instanceof HTMLElement && inputRef.current && (inputRef.current.contains(target) || inputRef.current.contains(document.activeElement));
  }
  function isPrefixOrSuffix(target) {
    return target instanceof Element && (prefixRef.current && prefixRef.current.contains(target) || suffixRef.current && suffixRef.current.contains(target));
  }
  function isSpinner(target) {
    return target instanceof Element && spinnerRef.current && spinnerRef.current.contains(target);
  }
  function isVerticalContent(target) {
    return target instanceof Element && verticalContentRef.current && (verticalContentRef.current.contains(target) || verticalContentRef.current.contains(document.activeElement));
  }
}
function getRows(multiline) {
  if (!multiline)
    return void 0;
  return typeof multiline === "number" ? multiline : 1;
}
function normalizeAriaMultiline(multiline) {
  if (!multiline)
    return void 0;
  return Boolean(multiline) || typeof multiline === "number" && multiline > 0 ? {
    "aria-multiline": true
  } : void 0;
}

// node_modules/@shopify/polaris/build/esm/components/Banner/Banner.js
var import_react101 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/banner-context.js
var import_react96 = __toESM(require_react());
var BannerContext = /* @__PURE__ */ (0, import_react96.createContext)(false);

// node_modules/@shopify/polaris/build/esm/components/Banner/Banner.scss.js
var styles22 = {
  "Banner": "Polaris-Banner",
  "statusCritical": "Polaris-Banner--statusCritical",
  "PrimaryAction": "Polaris-Banner__PrimaryAction",
  "Button": "Polaris-Banner__Button",
  "statusWarning": "Polaris-Banner--statusWarning",
  "statusInfo": "Polaris-Banner--statusInfo",
  "statusSuccess": "Polaris-Banner--statusSuccess",
  "ContentWrapper": "Polaris-Banner__ContentWrapper",
  "withinContentContainer": "Polaris-Banner--withinContentContainer",
  "Dismiss": "Polaris-Banner__Dismiss",
  "keyFocused": "Polaris-Banner--keyFocused",
  "withinPage": "Polaris-Banner--withinPage",
  "hasDismiss": "Polaris-Banner--hasDismiss",
  "SecondaryAction": "Polaris-Banner__SecondaryAction",
  "Text": "Polaris-Banner__Text",
  "pressed": "Polaris-Banner--pressed",
  "loading": "Polaris-Banner--loading",
  "Spinner": "Polaris-Banner__Spinner"
};

// node_modules/@shopify/polaris/build/esm/components/UnstyledButton/utils.js
var import_react97 = __toESM(require_react());
function unstyledButtonFrom({
  content,
  onAction,
  ...action
}, overrides, key) {
  return /* @__PURE__ */ import_react97.default.createElement(UnstyledButton, Object.assign({
    key,
    onClick: onAction
  }, action, overrides), content);
}

// node_modules/@shopify/polaris/build/esm/components/Banner/components/BannerExperimental/BannerExperimental.js
var import_react100 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Banner/components/BannerExperimental/utilities.js
var bannerAttributes = {
  success: {
    withinPage: {
      background: "bg-success-strong",
      text: "text-on-color",
      icon: "icon-on-color"
    },
    withinContentContainer: {
      background: "bg-success-subdued",
      text: "text-success",
      icon: "icon-success-strong-experimental"
    },
    icon: SvgTickMinor
  },
  warning: {
    withinPage: {
      background: "bg-warning-strong-experimental",
      text: "text-warning-strong",
      icon: "text-warning-strong"
    },
    withinContentContainer: {
      background: "bg-warning-subdued-experimental",
      text: "text-warning-experimental",
      icon: "icon-warning-strong-experimental"
    },
    icon: SvgRiskMinor
  },
  critical: {
    withinPage: {
      background: "bg-critical-strong",
      text: "text-on-color",
      icon: "icon-on-color"
    },
    withinContentContainer: {
      background: "bg-critical-subdued",
      text: "text-critical-strong",
      icon: "icon-critical-strong-experimental"
    },
    icon: SvgDiamondAlertMinor
  },
  info: {
    withinPage: {
      background: "bg-info-strong",
      text: "text-info-strong",
      icon: "text-info-strong"
    },
    withinContentContainer: {
      background: "bg-info-subdued",
      text: "text-info",
      icon: "icon-info-strong-experimental"
    },
    icon: SvgInfoMinor
  }
};

// node_modules/@shopify/polaris/build/esm/components/Banner/components/BannerExperimental/BannerExperimental.scss.js
var styles23 = {
  "icon-on-color": "Polaris-Banner-BannerExperimental--iconOnColor",
  "icon-success-strong-experimental": "Polaris-Banner-BannerExperimental--iconSuccessStrongExperimental",
  "text-warning-strong": "Polaris-Banner-BannerExperimental--textWarningStrong",
  "icon-warning-strong-experimental": "Polaris-Banner-BannerExperimental--iconWarningStrongExperimental",
  "icon-critical-strong-experimental": "Polaris-Banner-BannerExperimental--iconCriticalStrongExperimental",
  "text-info-strong": "Polaris-Banner-BannerExperimental--textInfoStrong",
  "icon-info-strong-experimental": "Polaris-Banner-BannerExperimental--iconInfoStrongExperimental",
  "icon-subdued": "Polaris-Banner-BannerExperimental__icon--subdued"
};

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.js
var import_react99 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.scss.js
var styles24 = {
  "ButtonGroup": "Polaris-ButtonGroup",
  "Item": "Polaris-ButtonGroup__Item",
  "Item-plain": "Polaris-ButtonGroup__Item--plain",
  "segmented": "Polaris-ButtonGroup--segmented",
  "selected": "Polaris-ButtonGroup--selected",
  "Item-focused": "Polaris-ButtonGroup__Item--focused",
  "fullWidth": "Polaris-ButtonGroup--fullWidth",
  "extraTight": "Polaris-ButtonGroup--extraTight",
  "tight": "Polaris-ButtonGroup--tight",
  "loose": "Polaris-ButtonGroup--loose",
  "noWrap": "Polaris-ButtonGroup--noWrap"
};

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/components/Item/Item.js
var import_react98 = __toESM(require_react());
function Item3({
  button
}) {
  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused
  } = useToggle(false);
  const className = classNames(styles24.Item, focused && styles24["Item-focused"], button.props.plain && styles24["Item-plain"]);
  return /* @__PURE__ */ import_react98.default.createElement("div", {
    className,
    onFocus: forceTrueFocused,
    onBlur: forceFalseFocused
  }, button);
}

// node_modules/@shopify/polaris/build/esm/components/ButtonGroup/ButtonGroup.js
function ButtonGroup({
  children,
  spacing,
  segmented,
  fullWidth,
  connectedTop,
  noWrap
}) {
  const className = classNames(styles24.ButtonGroup, spacing && styles24[spacing], segmented && styles24.segmented, fullWidth && styles24.fullWidth, noWrap && styles24.noWrap);
  const contents = elementChildren(children).map((child, index) => /* @__PURE__ */ import_react99.default.createElement(Item3, {
    button: child,
    key: index
  }));
  return /* @__PURE__ */ import_react99.default.createElement("div", {
    className,
    "data-buttongroup-segmented": segmented,
    "data-buttongroup-connected-top": connectedTop,
    "data-buttongroup-full-width": fullWidth,
    "data-buttongroup-no-wrap": noWrap
  }, contents);
}

// node_modules/@shopify/polaris/build/esm/components/Banner/components/BannerExperimental/BannerExperimental.js
function BannerExperimental({
  status = "info",
  icon,
  hideIcon,
  onDismiss,
  action,
  secondaryAction,
  title,
  children
}) {
  const i18n = useI18n();
  const withinContentContainer = (0, import_react100.useContext)(WithinContentContext);
  const isInlineIconBanner = !title && !withinContentContainer;
  const bannerColors = bannerAttributes[status][withinContentContainer ? "withinContentContainer" : "withinPage"];
  const sharedBannerProps = {
    backgroundColor: bannerColors.background,
    textColor: bannerColors.text,
    bannerTitle: title ? /* @__PURE__ */ import_react100.default.createElement(Text, {
      as: "h2",
      variant: "headingSm",
      breakWord: true
    }, title) : null,
    bannerIcon: hideIcon ? null : /* @__PURE__ */ import_react100.default.createElement("span", {
      className: styles23[bannerColors.icon]
    }, /* @__PURE__ */ import_react100.default.createElement(Icon, {
      source: icon ?? bannerAttributes[status].icon
    })),
    actionButtons: action || secondaryAction ? /* @__PURE__ */ import_react100.default.createElement(ButtonGroup, null, action && /* @__PURE__ */ import_react100.default.createElement(Button, Object.assign({
      onClick: action.onAction
    }, action), action.content), secondaryAction && /* @__PURE__ */ import_react100.default.createElement(Button, Object.assign({
      onClick: secondaryAction.onAction
    }, secondaryAction), secondaryAction.content)) : null,
    dismissButton: onDismiss ? /* @__PURE__ */ import_react100.default.createElement(Button, {
      plain: true,
      primary: true,
      icon: /* @__PURE__ */ import_react100.default.createElement("span", {
        className: styles23[isInlineIconBanner ? "icon-subdued" : bannerColors.icon]
      }, /* @__PURE__ */ import_react100.default.createElement(Icon, {
        source: SvgCancelMinor
      })),
      onClick: onDismiss,
      accessibilityLabel: i18n.translate("Polaris.Banner.dismissButton")
    }) : null
  };
  if (withinContentContainer) {
    return /* @__PURE__ */ import_react100.default.createElement(WithinContentContainerBanner, sharedBannerProps, children);
  }
  if (isInlineIconBanner) {
    return /* @__PURE__ */ import_react100.default.createElement(InlineIconBanner, sharedBannerProps, children);
  }
  return /* @__PURE__ */ import_react100.default.createElement(DefaultBanner, sharedBannerProps, children);
}
function DefaultBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  const {
    smUp
  } = useBreakpoints();
  const hasContent = children || actionButtons;
  return /* @__PURE__ */ import_react100.default.createElement(Box, {
    width: "100%"
  }, /* @__PURE__ */ import_react100.default.createElement(VerticalStack, {
    align: "space-between"
  }, /* @__PURE__ */ import_react100.default.createElement(Box, {
    background: backgroundColor,
    color: textColor,
    borderRadiusStartStart: smUp ? "3" : void 0,
    borderRadiusStartEnd: smUp ? "3" : void 0,
    borderRadiusEndStart: !hasContent && smUp ? "3" : void 0,
    borderRadiusEndEnd: !hasContent && smUp ? "3" : void 0,
    padding: "3"
  }, /* @__PURE__ */ import_react100.default.createElement(HorizontalStack, {
    align: "space-between",
    blockAlign: "center",
    gap: "2",
    wrap: false
  }, /* @__PURE__ */ import_react100.default.createElement(HorizontalStack, {
    gap: "1",
    wrap: false
  }, bannerIcon, bannerTitle), dismissButton)), hasContent && /* @__PURE__ */ import_react100.default.createElement(Box, {
    padding: {
      xs: "3",
      md: "4"
    },
    paddingBlockStart: "3"
  }, /* @__PURE__ */ import_react100.default.createElement(VerticalStack, {
    gap: "2"
  }, /* @__PURE__ */ import_react100.default.createElement("div", null, children), actionButtons))));
}
function InlineIconBanner({
  backgroundColor,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  const [blockAlign, setBlockAlign] = (0, import_react100.useState)("center");
  const contentNode = (0, import_react100.useRef)(null);
  const iconNode = (0, import_react100.useRef)(null);
  const handleResize = (0, import_react100.useCallback)(() => {
    const contentHeight = contentNode.current?.offsetHeight;
    const iconBoxHeight = iconNode.current?.offsetHeight;
    if (!contentHeight || !iconBoxHeight)
      return;
    contentHeight > iconBoxHeight ? setBlockAlign("start") : setBlockAlign("center");
  }, []);
  (0, import_react100.useEffect)(() => handleResize(), [handleResize]);
  useEventListener("resize", handleResize);
  return /* @__PURE__ */ import_react100.default.createElement(Box, {
    width: "100%",
    padding: "3",
    borderRadius: "3"
  }, /* @__PURE__ */ import_react100.default.createElement(HorizontalStack, {
    align: "space-between",
    blockAlign,
    wrap: false
  }, /* @__PURE__ */ import_react100.default.createElement(Box, {
    width: "100%"
  }, /* @__PURE__ */ import_react100.default.createElement(HorizontalStack, {
    gap: "2",
    wrap: false,
    blockAlign
  }, /* @__PURE__ */ import_react100.default.createElement("div", {
    ref: iconNode
  }, /* @__PURE__ */ import_react100.default.createElement(Box, {
    background: backgroundColor,
    borderRadius: "2",
    padding: "1"
  }, bannerIcon)), /* @__PURE__ */ import_react100.default.createElement(Box, {
    ref: contentNode,
    width: "100%"
  }, /* @__PURE__ */ import_react100.default.createElement(VerticalStack, {
    gap: "2"
  }, /* @__PURE__ */ import_react100.default.createElement("div", null, children), actionButtons)))), dismissButton));
}
function WithinContentContainerBanner({
  backgroundColor,
  textColor,
  bannerTitle,
  bannerIcon,
  actionButtons,
  dismissButton,
  children
}) {
  return /* @__PURE__ */ import_react100.default.createElement(Box, {
    width: "100%",
    background: backgroundColor,
    padding: "2",
    borderRadius: "2",
    color: textColor
  }, /* @__PURE__ */ import_react100.default.createElement(HorizontalStack, {
    align: "space-between",
    blockAlign: "start",
    wrap: false
  }, /* @__PURE__ */ import_react100.default.createElement(HorizontalStack, {
    gap: "1_5-experimental",
    wrap: false
  }, bannerIcon, /* @__PURE__ */ import_react100.default.createElement(Box, {
    width: "100%"
  }, /* @__PURE__ */ import_react100.default.createElement(VerticalStack, {
    gap: "2"
  }, /* @__PURE__ */ import_react100.default.createElement(VerticalStack, {
    gap: "05"
  }, bannerTitle, /* @__PURE__ */ import_react100.default.createElement("div", null, children)), actionButtons))), dismissButton));
}

// node_modules/@shopify/polaris/build/esm/components/Banner/Banner.js
var Banner = /* @__PURE__ */ (0, import_react101.forwardRef)(function Banner2(props, bannerRef) {
  const {
    icon,
    action,
    secondaryAction,
    title,
    children,
    status,
    onDismiss,
    stopAnnouncements,
    hideIcon
  } = props;
  const withinContentContainer = (0, import_react101.useContext)(WithinContentContext);
  const i18n = useI18n();
  const {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus
  } = useBannerFocus(bannerRef);
  const {
    defaultIcon,
    iconColor,
    ariaRoleType
  } = useBannerAttributes(status);
  const iconName = icon || defaultIcon;
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const className = classNames(styles22.Banner, !polarisSummerEditions2023 && status && styles22[variationName("status", status)], onDismiss && styles22.hasDismiss, shouldShowFocus && styles22.keyFocused, withinContentContainer ? styles22.withinContentContainer : styles22.withinPage);
  let headingMarkup = null;
  if (title) {
    headingMarkup = /* @__PURE__ */ import_react101.default.createElement(Text, {
      as: "h2",
      variant: "headingMd",
      breakWord: true
    }, title);
  }
  const spinnerMarkup = action?.loading ? /* @__PURE__ */ import_react101.default.createElement("button", {
    disabled: true,
    "aria-busy": true,
    className: classNames(styles22.Button, styles22.loading)
  }, /* @__PURE__ */ import_react101.default.createElement("span", {
    className: styles22.Spinner
  }, /* @__PURE__ */ import_react101.default.createElement(Spinner, {
    size: "small",
    accessibilityLabel: i18n.translate("Polaris.Button.spinnerAccessibilityLabel")
  })), action.content) : null;
  const primaryActionMarkup = action ? /* @__PURE__ */ import_react101.default.createElement(Box, {
    paddingInlineEnd: "2"
  }, action.loading ? spinnerMarkup : unstyledButtonFrom(action, {
    className: `${styles22.Button} ${styles22.PrimaryAction}`
  })) : null;
  const secondaryActionMarkup = secondaryAction ? /* @__PURE__ */ import_react101.default.createElement(SecondaryActionFrom, {
    action: secondaryAction
  }) : null;
  const actionMarkup = action || secondaryAction ? /* @__PURE__ */ import_react101.default.createElement(Box, {
    paddingBlockStart: withinContentContainer ? "3" : "4",
    paddingBlockEnd: withinContentContainer ? "1" : void 0
  }, /* @__PURE__ */ import_react101.default.createElement(ButtonGroup, null, primaryActionMarkup, secondaryActionMarkup)) : null;
  let contentMarkup = null;
  if (children || actionMarkup) {
    contentMarkup = /* @__PURE__ */ import_react101.default.createElement(Box, {
      paddingBlockStart: "05",
      paddingBlockEnd: "05"
    }, children, actionMarkup);
  }
  const dismissButton = onDismiss && /* @__PURE__ */ import_react101.default.createElement("div", {
    className: styles22.Dismiss
  }, /* @__PURE__ */ import_react101.default.createElement(Button, {
    plain: true,
    icon: SvgCancelSmallMinor,
    onClick: onDismiss,
    accessibilityLabel: i18n.translate("Polaris.Banner.dismissButton")
  }));
  return /* @__PURE__ */ import_react101.default.createElement(BannerContext.Provider, {
    value: true
  }, /* @__PURE__ */ import_react101.default.createElement("div", {
    className,
    tabIndex: 0,
    ref: wrapperRef,
    role: ariaRoleType,
    "aria-live": stopAnnouncements ? "off" : "polite",
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onBlur: handleBlur
  }, polarisSummerEditions2023 ? /* @__PURE__ */ import_react101.default.createElement(BannerExperimental, props) : /* @__PURE__ */ import_react101.default.createElement(import_react101.default.Fragment, null, dismissButton, hideIcon ? null : /* @__PURE__ */ import_react101.default.createElement(Box, {
    paddingInlineEnd: "4"
  }, /* @__PURE__ */ import_react101.default.createElement(Icon, {
    source: iconName,
    color: iconColor
  })), /* @__PURE__ */ import_react101.default.createElement("div", {
    className: styles22.ContentWrapper
  }, headingMarkup, contentMarkup))));
});
function SecondaryActionFrom({
  action
}) {
  if (action.url) {
    return /* @__PURE__ */ import_react101.default.createElement(UnstyledLink, {
      className: styles22.SecondaryAction,
      url: action.url,
      external: action.external,
      target: action.target
    }, /* @__PURE__ */ import_react101.default.createElement("span", {
      className: styles22.Text
    }, action.content));
  }
  return /* @__PURE__ */ import_react101.default.createElement(UnstyledButton, {
    className: styles22.SecondaryAction,
    onClick: action.onAction
  }, /* @__PURE__ */ import_react101.default.createElement("span", {
    className: styles22.Text
  }, action.content));
}
function useBannerAttributes(status) {
  switch (status) {
    case "success":
      return {
        defaultIcon: SvgCircleTickMajor,
        iconColor: "success",
        ariaRoleType: "status"
      };
    case "info":
      return {
        defaultIcon: SvgCircleInformationMajor,
        iconColor: "highlight",
        ariaRoleType: "status"
      };
    case "warning":
      return {
        defaultIcon: SvgCircleAlertMajor,
        iconColor: "warning",
        ariaRoleType: "alert"
      };
    case "critical":
      return {
        defaultIcon: SvgDiamondAlertMajor,
        iconColor: "critical",
        ariaRoleType: "alert"
      };
    default:
      return {
        defaultIcon: SvgCircleInformationMajor,
        iconColor: "base",
        ariaRoleType: "status"
      };
  }
}
function useBannerFocus(bannerRef) {
  const wrapperRef = (0, import_react101.useRef)(null);
  const [shouldShowFocus, setShouldShowFocus] = (0, import_react101.useState)(false);
  (0, import_react101.useImperativeHandle)(bannerRef, () => ({
    focus: () => {
      wrapperRef.current?.focus();
      setShouldShowFocus(true);
    }
  }), []);
  const handleKeyUp = (event) => {
    if (event.target === wrapperRef.current) {
      setShouldShowFocus(true);
    }
  };
  const handleBlur = () => setShouldShowFocus(false);
  const handleMouseUp = (event) => {
    event.currentTarget.blur();
    setShouldShowFocus(false);
  };
  return {
    wrapperRef,
    handleKeyUp,
    handleBlur,
    handleMouseUp,
    shouldShowFocus
  };
}

// node_modules/@shopify/polaris/build/esm/components/Divider/Divider.js
var import_react102 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Divider/Divider.scss.js
var styles25 = {
  "Divider": "Polaris-Divider"
};

// node_modules/@shopify/polaris/build/esm/components/Divider/Divider.js
var Divider = ({
  borderColor = "border-subdued",
  borderWidth = "1"
}) => {
  const borderColorValue = borderColor === "transparent" ? borderColor : `var(--p-color-${borderColor})`;
  return /* @__PURE__ */ import_react102.default.createElement("hr", {
    className: styles25.Divider,
    style: {
      borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`
    }
  });
};

// node_modules/@shopify/polaris/build/esm/components/FormLayout/FormLayout.js
var import_react105 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/FormLayout/FormLayout.scss.js
var styles26 = {
  "FormLayout": "Polaris-FormLayout",
  "Title": "Polaris-FormLayout__Title",
  "Items": "Polaris-FormLayout__Items",
  "Item": "Polaris-FormLayout__Item",
  "grouped": "Polaris-FormLayout--grouped",
  "condensed": "Polaris-FormLayout--condensed"
};

// node_modules/@shopify/polaris/build/esm/components/FormLayout/components/Group/Group.js
var import_react104 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/FormLayout/components/Item/Item.js
var import_react103 = __toESM(require_react());
function Item4({
  children
}) {
  return children ? /* @__PURE__ */ import_react103.default.createElement("div", {
    className: styles26.Item
  }, children) : null;
}

// node_modules/@shopify/polaris/build/esm/components/FormLayout/components/Group/Group.js
function Group({
  children,
  condensed,
  title,
  helpText
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const className = classNames(condensed ? styles26.condensed : styles26.grouped);
  const id = (0, import_react104.useId)();
  let helpTextElement = null;
  let helpTextID3;
  let titleElement = null;
  let titleID;
  if (helpText) {
    helpTextID3 = `${id}HelpText`;
    helpTextElement = /* @__PURE__ */ import_react104.default.createElement(Box, {
      id: helpTextID3,
      paddingBlockStart: "2",
      paddingInlineStart: polarisSummerEditions2023 ? "2" : "5",
      paddingBlockEnd: "0",
      paddingInlineEnd: polarisSummerEditions2023 ? "2" : "5",
      color: "text-subdued"
    }, helpText);
  }
  if (title) {
    titleID = `${id}Title`;
    titleElement = /* @__PURE__ */ import_react104.default.createElement("div", {
      id: titleID,
      className: styles26.Title
    }, title);
  }
  const itemsMarkup = import_react104.Children.map(children, (child) => wrapWithComponent(child, Item4, {}));
  return /* @__PURE__ */ import_react104.default.createElement("div", {
    role: "group",
    className,
    "aria-labelledby": titleID,
    "aria-describedby": helpTextID3
  }, titleElement, /* @__PURE__ */ import_react104.default.createElement("div", {
    className: styles26.Items
  }, itemsMarkup), helpTextElement);
}

// node_modules/@shopify/polaris/build/esm/components/FormLayout/FormLayout.js
var FormLayout = /* @__PURE__ */ (0, import_react105.memo)(function FormLayout2({
  children
}) {
  return /* @__PURE__ */ import_react105.default.createElement("div", {
    className: styles26.FormLayout
  }, import_react105.Children.map(children, wrapChildren));
});
FormLayout.Group = Group;
function wrapChildren(child, index) {
  if (isElementOfType(child, Group)) {
    return child;
  }
  const props = {
    key: index
  };
  return wrapWithComponent(child, Item4, props);
}

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.js
var import_react109 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.scss.js
var styles27 = {
  "Layout": "Polaris-Layout",
  "Section": "Polaris-Layout__Section",
  "Section-secondary": "Polaris-Layout__Section--secondary",
  "Section-fullWidth": "Polaris-Layout__Section--fullWidth",
  "Section-oneHalf": "Polaris-Layout__Section--oneHalf",
  "Section-oneThird": "Polaris-Layout__Section--oneThird",
  "AnnotatedSection": "Polaris-Layout__AnnotatedSection",
  "AnnotationWrapper": "Polaris-Layout__AnnotationWrapper",
  "AnnotationContent": "Polaris-Layout__AnnotationContent",
  "Annotation": "Polaris-Layout__Annotation"
};

// node_modules/@shopify/polaris/build/esm/components/Layout/components/AnnotatedSection/AnnotatedSection.js
var import_react107 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.js
var import_react106 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.scss.js
var styles28 = {
  "TextContainer": "Polaris-TextContainer",
  "spacingTight": "Polaris-TextContainer--spacingTight",
  "spacingLoose": "Polaris-TextContainer--spacingLoose"
};

// node_modules/@shopify/polaris/build/esm/components/TextContainer/TextContainer.js
function TextContainer({
  spacing,
  children
}) {
  const className = classNames(styles28.TextContainer, spacing && styles28[variationName("spacing", spacing)]);
  return /* @__PURE__ */ import_react106.default.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Layout/components/AnnotatedSection/AnnotatedSection.js
function AnnotatedSection({
  children,
  title,
  description,
  id
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const descriptionMarkup = (
    // eslint-disable-next-line no-nested-ternary
    typeof description === "string" ? polarisSummerEditions2023 ? /* @__PURE__ */ import_react107.default.createElement(Text, {
      as: "p",
      variant: "bodyMd"
    }, description) : /* @__PURE__ */ import_react107.default.createElement("p", null, description) : description
  );
  return /* @__PURE__ */ import_react107.default.createElement("div", {
    className: styles27.AnnotatedSection
  }, /* @__PURE__ */ import_react107.default.createElement("div", {
    className: styles27.AnnotationWrapper
  }, /* @__PURE__ */ import_react107.default.createElement("div", {
    className: styles27.Annotation
  }, /* @__PURE__ */ import_react107.default.createElement(TextContainer, {
    spacing: polarisSummerEditions2023 ? "tight" : void 0
  }, /* @__PURE__ */ import_react107.default.createElement(Text, {
    id,
    variant: "headingMd",
    as: "h2"
  }, title), descriptionMarkup && /* @__PURE__ */ import_react107.default.createElement(Box, {
    color: "text-subdued"
  }, descriptionMarkup))), /* @__PURE__ */ import_react107.default.createElement("div", {
    className: styles27.AnnotationContent
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Layout/components/Section/Section.js
var import_react108 = __toESM(require_react());
function Section3({
  children,
  secondary,
  fullWidth,
  oneHalf,
  oneThird
}) {
  const className = classNames(styles27.Section, secondary && styles27["Section-secondary"], fullWidth && styles27["Section-fullWidth"], oneHalf && styles27["Section-oneHalf"], oneThird && styles27["Section-oneThird"]);
  return /* @__PURE__ */ import_react108.default.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/Layout/Layout.js
var Layout = function Layout2({
  sectioned,
  children
}) {
  const content = sectioned ? /* @__PURE__ */ import_react109.default.createElement(Section3, null, children) : children;
  return /* @__PURE__ */ import_react109.default.createElement("div", {
    className: styles27.Layout
  }, content);
};
Layout.AnnotatedSection = AnnotatedSection;
Layout.Section = Section3;

// node_modules/@shopify/polaris/build/esm/components/List/List.js
var import_react111 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/List/List.scss.js
var styles29 = {
  "List": "Polaris-List",
  "typeNumber": "Polaris-List--typeNumber",
  "Item": "Polaris-List__Item",
  "spacingLoose": "Polaris-List--spacingLoose"
};

// node_modules/@shopify/polaris/build/esm/components/List/components/Item/Item.js
var import_react110 = __toESM(require_react());
function Item5({
  children
}) {
  return /* @__PURE__ */ import_react110.default.createElement("li", {
    className: styles29.Item
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/List/List.js
var List = function List2({
  children,
  spacing = "loose",
  type = "bullet"
}) {
  const className = classNames(styles29.List, spacing && styles29[variationName("spacing", spacing)], type && styles29[variationName("type", type)]);
  const ListElement = type === "bullet" ? "ul" : "ol";
  return /* @__PURE__ */ import_react111.default.createElement(ListElement, {
    className
  }, children);
};
List.Item = Item5;

// node_modules/@shopify/polaris/build/esm/components/Page/Page.js
var import_react124 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/is-interface.js
var import_react112 = __toESM(require_react());
function isInterface(x) {
  return !/* @__PURE__ */ (0, import_react112.isValidElement)(x) && x !== void 0;
}

// node_modules/@shopify/polaris/build/esm/utilities/is-react-element.js
var import_react113 = __toESM(require_react());
function isReactElement(x) {
  return /* @__PURE__ */ (0, import_react113.isValidElement)(x) && x !== void 0;
}

// node_modules/@shopify/polaris/build/esm/components/Page/Page.scss.js
var styles30 = {
  "Page": "Polaris-Page",
  "fullWidth": "Polaris-Page--fullWidth",
  "narrowWidth": "Polaris-Page--narrowWidth",
  "Content": "Polaris-Page__Content",
  "divider": "Polaris-Page--divider"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.js
var import_react123 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.scss.js
var styles31 = {
  "TitleWrapper": "Polaris-Page-Header__TitleWrapper",
  "BreadcrumbWrapper": "Polaris-Page-Header__BreadcrumbWrapper",
  "PaginationWrapper": "Polaris-Page-Header__PaginationWrapper",
  "PrimaryActionWrapper": "Polaris-Page-Header__PrimaryActionWrapper",
  "Row": "Polaris-Page-Header__Row",
  "mobileView": "Polaris-Page-Header--mobileView",
  "RightAlign": "Polaris-Page-Header__RightAlign",
  "noBreadcrumbs": "Polaris-Page-Header--noBreadcrumbs",
  "AdditionalMetaData": "Polaris-Page-Header__AdditionalMetaData",
  "Actions": "Polaris-Page-Header__Actions",
  "longTitle": "Polaris-Page-Header--longTitle",
  "mediumTitle": "Polaris-Page-Header--mediumTitle",
  "isSingleRow": "Polaris-Page-Header--isSingleRow"
};

// node_modules/@shopify/polaris/build/esm/components/Breadcrumbs/Breadcrumbs.js
var import_react114 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Breadcrumbs/Breadcrumbs.scss.js
var styles32 = {
  "Breadcrumb": "Polaris-Breadcrumbs__Breadcrumb",
  "Icon": "Polaris-Breadcrumbs__Icon",
  "Content": "Polaris-Breadcrumbs__Content"
};

// node_modules/@shopify/polaris/build/esm/components/Breadcrumbs/Breadcrumbs.js
function Breadcrumbs({
  backAction
}) {
  const {
    content
  } = backAction;
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const contentMarkup = /* @__PURE__ */ import_react114.default.createElement(import_react114.default.Fragment, null, /* @__PURE__ */ import_react114.default.createElement("span", {
    className: styles32.Icon
  }, /* @__PURE__ */ import_react114.default.createElement(Icon, {
    source: SvgArrowLeftMinor
  })), /* @__PURE__ */ import_react114.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, content));
  const breadcrumbMarkup = "url" in backAction ? /* @__PURE__ */ import_react114.default.createElement(UnstyledLink, {
    key: content,
    url: backAction.url,
    className: styles32.Breadcrumb,
    onMouseUp: handleMouseUpByBlurring,
    "aria-label": backAction.accessibilityLabel
  }, contentMarkup) : /* @__PURE__ */ import_react114.default.createElement("button", {
    key: content,
    className: styles32.Breadcrumb,
    onClick: backAction.onAction,
    onMouseUp: handleMouseUpByBlurring,
    type: "button",
    "aria-label": backAction.accessibilityLabel
  }, contentMarkup);
  const summerEditionsBreadcrumbMarkup = /* @__PURE__ */ import_react114.default.createElement(Button, {
    key: content,
    url: "url" in backAction ? backAction.url : void 0,
    onPointerDown: handleMouseUpByBlurring,
    "aria-label": backAction.accessibilityLabel,
    icon: SvgArrowLeftMinor,
    accessibilityLabel: content
  });
  return /* @__PURE__ */ import_react114.default.createElement("nav", {
    role: "navigation"
  }, polarisSummerEditions2023 ? summerEditionsBreadcrumbMarkup : breadcrumbMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.js
var import_react115 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/is-input-focused.js
var EditableTarget;
(function(EditableTarget2) {
  EditableTarget2["Input"] = "INPUT";
  EditableTarget2["Textarea"] = "TEXTAREA";
  EditableTarget2["Select"] = "SELECT";
  EditableTarget2["ContentEditable"] = "contenteditable";
})(EditableTarget || (EditableTarget = {}));
function isInputFocused() {
  if (document == null || document.activeElement == null) {
    return false;
  }
  const {
    tagName
  } = document.activeElement;
  return tagName === EditableTarget.Input || tagName === EditableTarget.Textarea || tagName === EditableTarget.Select || document.activeElement.hasAttribute(EditableTarget.ContentEditable);
}

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.scss.js
var styles33 = {
  "Pagination": "Polaris-Pagination"
};

// node_modules/@shopify/polaris/build/esm/components/Pagination/Pagination.js
function Pagination({
  hasNext,
  hasPrevious,
  nextURL,
  previousURL,
  onNext,
  onPrevious,
  nextTooltip,
  previousTooltip,
  nextKeys,
  previousKeys,
  accessibilityLabel,
  accessibilityLabels,
  label
}) {
  const i18n = useI18n();
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const node = /* @__PURE__ */ (0, import_react115.createRef)();
  const navLabel = accessibilityLabel || i18n.translate("Polaris.Pagination.pagination");
  const previousLabel = accessibilityLabels?.previous || i18n.translate("Polaris.Pagination.previous");
  const nextLabel = accessibilityLabels?.next || i18n.translate("Polaris.Pagination.next");
  const prev = /* @__PURE__ */ import_react115.default.createElement(Button, {
    outline: true,
    icon: SvgChevronLeftMinor,
    accessibilityLabel: previousLabel,
    url: previousURL,
    onClick: onPrevious,
    disabled: !hasPrevious,
    id: "previousURL"
  });
  const constructedPrevious = previousTooltip && hasPrevious ? /* @__PURE__ */ import_react115.default.createElement(Tooltip, {
    activatorWrapper: "span",
    content: previousTooltip
  }, prev) : prev;
  const next = /* @__PURE__ */ import_react115.default.createElement(Button, {
    outline: true,
    icon: SvgChevronRightMinor,
    accessibilityLabel: nextLabel,
    url: nextURL,
    onClick: onNext,
    disabled: !hasNext,
    id: "nextURL"
  });
  const constructedNext = nextTooltip && hasNext ? /* @__PURE__ */ import_react115.default.createElement(Tooltip, {
    activatorWrapper: "span",
    content: nextTooltip
  }, next) : next;
  const previousHandler = onPrevious || noop4;
  const previousButtonEvents = previousKeys && (previousURL || onPrevious) && hasPrevious && previousKeys.map((key) => /* @__PURE__ */ import_react115.default.createElement(KeypressListener, {
    key,
    keyCode: key,
    handler: previousURL ? handleCallback(clickPaginationLink("previousURL", node)) : handleCallback(previousHandler)
  }));
  const nextHandler = onNext || noop4;
  const nextButtonEvents = nextKeys && (nextURL || onNext) && hasNext && nextKeys.map((key) => /* @__PURE__ */ import_react115.default.createElement(KeypressListener, {
    key,
    keyCode: key,
    handler: nextURL ? handleCallback(clickPaginationLink("nextURL", node)) : handleCallback(nextHandler)
  }));
  const labelTextMarkup = hasNext && hasPrevious ? /* @__PURE__ */ import_react115.default.createElement("span", null, label) : /* @__PURE__ */ import_react115.default.createElement(Text, {
    color: "subdued",
    as: "span"
  }, label);
  const labelMarkup = label ? /* @__PURE__ */ import_react115.default.createElement(Box, {
    padding: polarisSummerEditions2023 ? "3" : void 0,
    paddingBlockStart: "0",
    paddingBlockEnd: "0"
  }, /* @__PURE__ */ import_react115.default.createElement("div", {
    "aria-live": "polite"
  }, labelTextMarkup)) : null;
  return /* @__PURE__ */ import_react115.default.createElement("nav", {
    "aria-label": navLabel,
    ref: node,
    className: styles33.Pagination
  }, previousButtonEvents, nextButtonEvents, /* @__PURE__ */ import_react115.default.createElement(ButtonGroup, {
    segmented: !label || polarisSummerEditions2023
  }, constructedPrevious, labelMarkup, constructedNext));
}
function clickPaginationLink(id, node) {
  return () => {
    if (node.current == null) {
      return;
    }
    const link = node.current.querySelector(`#${id}`);
    if (link) {
      link.click();
    }
  };
}
function handleCallback(fn) {
  return () => {
    if (isInputFocused()) {
      return;
    }
    fn();
  };
}
function noop4() {
}

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.js
var import_react116 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.scss.js
var styles34 = {
  "Title": "Polaris-Header-Title",
  "TitleWithSubtitle": "Polaris-Header-Title__TitleWithSubtitle",
  "SubTitle": "Polaris-Header-Title__SubTitle",
  "SubtitleCompact": "Polaris-Header-Title__SubtitleCompact",
  "TitleWithMetadataWrapper": "Polaris-Header-Title__TitleWithMetadataWrapper",
  "TitleMetadata": "Polaris-Header-Title__TitleMetadata"
};

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/components/Title/Title.js
function Title({
  title,
  subtitle,
  titleMetadata,
  compactTitle
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const className = classNames(styles34.Title, subtitle && styles34.TitleWithSubtitle);
  const titleMarkup = title ? /* @__PURE__ */ import_react116.default.createElement("h1", {
    className
  }, title) : null;
  const titleMetadataMarkup = titleMetadata ? /* @__PURE__ */ import_react116.default.createElement("div", {
    className: styles34.TitleMetadata
  }, titleMetadata) : null;
  const wrappedTitleMarkup = titleMetadata ? /* @__PURE__ */ import_react116.default.createElement("div", {
    className: styles34.TitleWithMetadataWrapper
  }, titleMarkup, titleMetadataMarkup) : titleMarkup;
  const subtitleMarkup = subtitle ? /* @__PURE__ */ import_react116.default.createElement("div", {
    className: classNames(styles34.SubTitle, compactTitle && styles34.SubtitleCompact)
  }, /* @__PURE__ */ import_react116.default.createElement(Text, {
    as: "p",
    variant: polarisSummerEditions2023 ? "bodySm" : void 0
  }, subtitle)) : null;
  return /* @__PURE__ */ import_react116.default.createElement(import_react116.default.Fragment, null, wrappedTitleMarkup, subtitleMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.js
var import_react121 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.scss.js
var styles35 = {
  "ActionMenu": "Polaris-ActionMenu"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.js
var import_react117 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.scss.js
var styles36 = {
  "RollupActivator": "Polaris-ActionMenu-RollupActions__RollupActivator"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/RollupActions/RollupActions.js
function RollupActions({
  accessibilityLabel,
  items = [],
  sections = []
}) {
  const i18n = useI18n();
  const {
    value: rollupOpen,
    toggle: toggleRollupOpen
  } = useToggle(false);
  if (items.length === 0 && sections.length === 0) {
    return null;
  }
  const activatorMarkup = /* @__PURE__ */ import_react117.default.createElement("div", {
    className: styles36.RollupActivator
  }, /* @__PURE__ */ import_react117.default.createElement(Button, {
    outline: true,
    icon: SvgHorizontalDotsMinor,
    accessibilityLabel: accessibilityLabel || i18n.translate("Polaris.ActionMenu.RollupActions.rollupButton"),
    onClick: toggleRollupOpen
  }));
  return /* @__PURE__ */ import_react117.default.createElement(Popover2, {
    active: rollupOpen,
    activator: activatorMarkup,
    preferredAlignment: "right",
    onClose: toggleRollupOpen,
    hideOnPrint: true
  }, /* @__PURE__ */ import_react117.default.createElement(ActionList, {
    items,
    sections,
    onActionAnyItem: toggleRollupOpen
  }));
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.js
var import_react120 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.scss.js
var styles37 = {
  "ActionsLayout": "Polaris-ActionMenu-Actions__ActionsLayout"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.js
var import_react119 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.scss.js
var styles38 = {
  "Details": "Polaris-ActionMenu-MenuGroup__Details"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.js
var import_react118 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.scss.js
var styles39 = {
  "SecondaryAction": "Polaris-ActionMenu-SecondaryAction",
  "destructive": "Polaris-ActionMenu-SecondaryAction--destructive"
};

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/SecondaryAction/SecondaryAction.js
function SecondaryAction({
  children,
  destructive,
  helpText,
  onAction,
  getOffsetWidth,
  ...rest
}) {
  const secondaryActionsRef = (0, import_react118.useRef)(null);
  (0, import_react118.useEffect)(() => {
    if (!getOffsetWidth || !secondaryActionsRef.current)
      return;
    getOffsetWidth(secondaryActionsRef.current?.offsetWidth);
  }, [getOffsetWidth]);
  const buttonMarkup = /* @__PURE__ */ import_react118.default.createElement(Button, Object.assign({
    onClick: onAction
  }, rest), children);
  const actionMarkup = helpText ? /* @__PURE__ */ import_react118.default.createElement(Tooltip, {
    content: helpText
  }, buttonMarkup) : buttonMarkup;
  return /* @__PURE__ */ import_react118.default.createElement("div", {
    className: classNames(styles39.SecondaryAction, destructive && styles39.destructive),
    ref: secondaryActionsRef
  }, actionMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/MenuGroup/MenuGroup.js
function MenuGroup({
  accessibilityLabel,
  active,
  actions,
  details,
  title,
  icon,
  disabled,
  onClick,
  onClose,
  onOpen,
  getOffsetWidth,
  sections
}) {
  const handleClose = (0, import_react119.useCallback)(() => {
    onClose(title);
  }, [onClose, title]);
  const handleOpen = (0, import_react119.useCallback)(() => {
    onOpen(title);
  }, [onOpen, title]);
  const handleClick = (0, import_react119.useCallback)(() => {
    if (onClick) {
      onClick(handleOpen);
    } else {
      handleOpen();
    }
  }, [onClick, handleOpen]);
  const handleOffsetWidth = (0, import_react119.useCallback)((width) => {
    if (!getOffsetWidth)
      return;
    getOffsetWidth(width);
  }, [getOffsetWidth]);
  const popoverActivator = /* @__PURE__ */ import_react119.default.createElement(SecondaryAction, {
    disclosure: true,
    disabled,
    icon,
    accessibilityLabel,
    onClick: handleClick,
    getOffsetWidth: handleOffsetWidth
  }, title);
  return /* @__PURE__ */ import_react119.default.createElement(Popover2, {
    active: Boolean(active),
    activator: popoverActivator,
    preferredAlignment: "left",
    onClose: handleClose,
    hideOnPrint: true
  }, /* @__PURE__ */ import_react119.default.createElement(ActionList, {
    items: actions,
    sections,
    onActionAnyItem: handleClose
  }), details && /* @__PURE__ */ import_react119.default.createElement("div", {
    className: styles38.Details
  }, details));
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/components/Actions/Actions.js
var ACTION_SPACING = 8;
function Actions({
  actions = [],
  groups = [],
  onActionRollup
}) {
  const i18n = useI18n();
  const actionsLayoutRef = (0, import_react120.useRef)(null);
  const menuGroupWidthRef = (0, import_react120.useRef)(0);
  const availableWidthRef = (0, import_react120.useRef)(0);
  const actionsAndGroupsLengthRef = (0, import_react120.useRef)(0);
  const timesMeasured = (0, import_react120.useRef)(0);
  const actionWidthsRef = (0, import_react120.useRef)([]);
  const rollupActiveRef = (0, import_react120.useRef)(null);
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const [activeMenuGroup, setActiveMenuGroup] = (0, import_react120.useState)(void 0);
  const [measuredActions, setMeasuredActions] = (0, import_react120.useState)({
    showable: [],
    rolledUp: []
  });
  const defaultRollupGroup = {
    title: i18n.translate("Polaris.ActionMenu.Actions.moreActions"),
    actions: []
  };
  const lastMenuGroup = [...groups].pop();
  const lastMenuGroupWidth = [...actionWidthsRef.current].pop() || 0;
  const handleActionsOffsetWidth = (0, import_react120.useCallback)((width) => {
    actionWidthsRef.current = [...actionWidthsRef.current, width];
  }, []);
  const handleMenuGroupToggle = (0, import_react120.useCallback)((group) => setActiveMenuGroup(activeMenuGroup ? void 0 : group), [activeMenuGroup]);
  const handleMenuGroupClose = (0, import_react120.useCallback)(() => setActiveMenuGroup(void 0), []);
  const updateActions = (0, import_react120.useCallback)(() => {
    let actionsAndGroups = [...actions, ...groups];
    if (groups.length > 0) {
      actionsAndGroups = [...actionsAndGroups].slice(0, actionsAndGroups.length - 1);
    }
    setMeasuredActions((currentMeasuredActions) => {
      const showable = actionsAndGroups.slice(0, currentMeasuredActions.showable.length);
      const rolledUp = actionsAndGroups.slice(currentMeasuredActions.showable.length, actionsAndGroups.length);
      return {
        showable,
        rolledUp
      };
    });
  }, [actions, groups]);
  const measureActions = (0, import_react120.useCallback)(() => {
    if (actionWidthsRef.current.length === 0 || availableWidthRef.current === 0) {
      return;
    }
    const actionsAndGroups = [...actions, ...groups];
    if (actionsAndGroups.length === 1) {
      setMeasuredActions({
        showable: actionsAndGroups,
        rolledUp: []
      });
      return;
    }
    let currentAvailableWidth = availableWidthRef.current;
    let newShowableActions = [];
    let newRolledUpActions = [];
    actionsAndGroups.forEach((action, index) => {
      const canFitAction = actionWidthsRef.current[index] + menuGroupWidthRef.current + ACTION_SPACING + lastMenuGroupWidth <= currentAvailableWidth;
      if (canFitAction) {
        currentAvailableWidth -= actionWidthsRef.current[index] + ACTION_SPACING * 2;
        newShowableActions = [...newShowableActions, action];
      } else {
        currentAvailableWidth = 0;
        if (action === lastMenuGroup)
          return;
        newRolledUpActions = [...newRolledUpActions, action];
      }
    });
    if (onActionRollup) {
      const isRollupActive = newShowableActions.length < actionsAndGroups.length - 1;
      if (rollupActiveRef.current !== isRollupActive) {
        onActionRollup(isRollupActive);
        rollupActiveRef.current = isRollupActive;
      }
    }
    setMeasuredActions({
      showable: newShowableActions,
      rolledUp: newRolledUpActions
    });
    timesMeasured.current += 1;
    actionsAndGroupsLengthRef.current = actionsAndGroups.length;
  }, [actions, groups, lastMenuGroup, lastMenuGroupWidth, onActionRollup]);
  const handleResize = (0, import_react120.useMemo)(() => debounce(() => {
    if (!actionsLayoutRef.current)
      return;
    availableWidthRef.current = actionsLayoutRef.current.offsetWidth;
    timesMeasured.current = 0;
    measureActions();
  }, 50, {
    leading: false,
    trailing: true
  }), [measureActions]);
  useEventListener("resize", handleResize);
  useIsomorphicLayoutEffect(() => {
    if (!actionsLayoutRef.current)
      return;
    availableWidthRef.current = actionsLayoutRef.current.offsetWidth;
    if (
      // Allow measuring twice
      // This accounts for the initial paint and re-flow
      timesMeasured.current >= 2 && [...actions, ...groups].length === actionsAndGroupsLengthRef.current
    ) {
      updateActions();
      return;
    }
    measureActions();
  }, [actions, groups, measureActions, updateActions]);
  const actionsMarkup = actions.map((action) => {
    if (measuredActions.showable.length > 0 || measuredActions.rolledUp.includes(action))
      return null;
    const {
      content,
      onAction,
      ...rest
    } = action;
    return /* @__PURE__ */ import_react120.default.createElement(SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest, {
      getOffsetWidth: handleActionsOffsetWidth
    }), content);
  });
  const rollUppableActionsMarkup = measuredActions.showable.length > 0 ? measuredActions.showable.map((action) => action.content && /* @__PURE__ */ import_react120.default.createElement(SecondaryAction, Object.assign({
    key: action.content
  }, action, {
    getOffsetWidth: handleActionsOffsetWidth
  }), action.content)) : null;
  const filteredGroups = [...groups, defaultRollupGroup].filter((group) => {
    return groups.length === 0 ? group : group === lastMenuGroup || !measuredActions.rolledUp.some((rolledUpGroup) => isMenuGroup(rolledUpGroup) && rolledUpGroup.title === group.title);
  });
  const groupsMarkup = filteredGroups.map((group) => {
    const {
      title,
      actions: groupActions,
      ...rest
    } = group;
    const isDefaultGroup = group === defaultRollupGroup;
    const isLastMenuGroup = group === lastMenuGroup;
    const [finalRolledUpActions, finalRolledUpSectionGroups] = measuredActions.rolledUp.reduce(([actions2, sections], action) => {
      if (isMenuGroup(action)) {
        sections.push({
          title: action.title,
          items: action.actions.map((sectionAction) => ({
            ...sectionAction,
            disabled: action.disabled || sectionAction.disabled
          }))
        });
      } else {
        actions2.push(action);
      }
      return [actions2, sections];
    }, [[], []]);
    if (!isDefaultGroup && !isLastMenuGroup) {
      return /* @__PURE__ */ import_react120.default.createElement(MenuGroup, Object.assign({
        key: title,
        title,
        active: title === activeMenuGroup,
        actions: groupActions
      }, rest, {
        onOpen: handleMenuGroupToggle,
        onClose: handleMenuGroupClose,
        getOffsetWidth: handleActionsOffsetWidth
      }));
    } else if (!isDefaultGroup && isLastMenuGroup) {
      return /* @__PURE__ */ import_react120.default.createElement(MenuGroup, Object.assign({
        key: title,
        title,
        active: title === activeMenuGroup,
        actions: [...finalRolledUpActions, ...groupActions],
        sections: finalRolledUpSectionGroups
      }, rest, {
        onOpen: handleMenuGroupToggle,
        onClose: handleMenuGroupClose,
        getOffsetWidth: handleActionsOffsetWidth
      }));
    } else if (isDefaultGroup && groups.length === 0 && finalRolledUpActions.length) {
      return /* @__PURE__ */ import_react120.default.createElement(MenuGroup, Object.assign({
        key: title,
        title,
        active: title === activeMenuGroup,
        actions: finalRolledUpActions,
        sections: finalRolledUpSectionGroups
      }, rest, {
        onOpen: handleMenuGroupToggle,
        onClose: handleMenuGroupClose,
        getOffsetWidth: handleActionsOffsetWidth
      }));
    }
  });
  const groupedActionsMarkup = /* @__PURE__ */ import_react120.default.createElement(ButtonGroup, {
    spacing: polarisSummerEditions2023 ? "tight" : "extraTight"
  }, rollUppableActionsMarkup, actionsMarkup, groupsMarkup);
  return /* @__PURE__ */ import_react120.default.createElement("div", {
    className: styles37.ActionsLayout,
    ref: actionsLayoutRef
  }, groupedActionsMarkup);
}
function isMenuGroup(actionOrMenuGroup) {
  return "title" in actionOrMenuGroup;
}

// node_modules/@shopify/polaris/build/esm/components/ActionMenu/ActionMenu.js
function ActionMenu({
  actions = [],
  groups = [],
  rollup,
  rollupActionsLabel,
  onActionRollup
}) {
  if (actions.length === 0 && groups.length === 0) {
    return null;
  }
  const actionMenuClassNames = classNames(styles35.ActionMenu, rollup && styles35.rollup);
  const rollupSections = groups.map((group) => convertGroupToSection(group));
  return /* @__PURE__ */ import_react121.default.createElement("div", {
    className: actionMenuClassNames
  }, rollup ? /* @__PURE__ */ import_react121.default.createElement(RollupActions, {
    accessibilityLabel: rollupActionsLabel,
    items: actions,
    sections: rollupSections
  }) : /* @__PURE__ */ import_react121.default.createElement(Actions, {
    actions,
    groups,
    onActionRollup
  }));
}
function hasGroupsWithActions(groups = []) {
  return groups.length === 0 ? false : groups.some((group) => group.actions.length > 0);
}
function convertGroupToSection({
  title,
  actions,
  disabled
}) {
  return {
    title,
    items: actions.map((action) => ({
      ...action,
      disabled: disabled || action.disabled
    }))
  };
}

// node_modules/@shopify/polaris/build/esm/utilities/media-query/hooks.js
var import_react122 = __toESM(require_react());
function useMediaQuery() {
  const mediaQuery = (0, import_react122.useContext)(MediaQueryContext);
  if (!mediaQuery) {
    throw new Error("No mediaQuery was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.");
  }
  return mediaQuery;
}

// node_modules/@shopify/polaris/build/esm/components/Page/components/Header/Header.js
var SHORT_TITLE = 20;
var REALLY_SHORT_TITLE = 8;
var LONG_TITLE = 34;
function Header({
  title,
  subtitle,
  titleMetadata,
  additionalMetadata,
  titleHidden = false,
  primaryAction,
  pagination,
  additionalNavigation,
  backAction,
  secondaryActions = [],
  actionGroups = [],
  compactTitle = false,
  onActionRollup
}) {
  const i18n = useI18n();
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const {
    isNavigationCollapsed
  } = useMediaQuery();
  if (additionalNavigation && true) {
    console.warn("Deprecation: The `additionalNavigation` on Page is deprecated and will be removed in the next major version.");
  }
  const isSingleRow = !primaryAction && !pagination && (isInterface(secondaryActions) && !secondaryActions.length || isReactElement(secondaryActions)) && !actionGroups.length;
  const breadcrumbMarkup = backAction ? /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.BreadcrumbWrapper
  }, /* @__PURE__ */ import_react123.default.createElement(Box, {
    maxWidth: "100%",
    paddingInlineEnd: polarisSummerEditions2023 ? "1" : "4",
    printHidden: true
  }, /* @__PURE__ */ import_react123.default.createElement(Breadcrumbs, {
    backAction
  }))) : null;
  const paginationMarkup = pagination && !isNavigationCollapsed ? /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.PaginationWrapper
  }, /* @__PURE__ */ import_react123.default.createElement(Box, {
    printHidden: true
  }, /* @__PURE__ */ import_react123.default.createElement(Pagination, pagination))) : null;
  const additionalNavigationMarkup = additionalNavigation ? /* @__PURE__ */ import_react123.default.createElement(HorizontalStack, {
    gap: "4",
    align: "end"
  }, /* @__PURE__ */ import_react123.default.createElement(Box, {
    printHidden: true
  }, additionalNavigation)) : null;
  const pageTitleMarkup = /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.TitleWrapper
  }, /* @__PURE__ */ import_react123.default.createElement(Title, {
    title,
    subtitle,
    titleMetadata,
    compactTitle
  }));
  const primaryActionMarkup = primaryAction ? /* @__PURE__ */ import_react123.default.createElement(PrimaryActionMarkup, {
    primaryAction
  }) : null;
  let actionMenuMarkup = null;
  if (isInterface(secondaryActions) && (secondaryActions.length > 0 || hasGroupsWithActions(actionGroups))) {
    actionMenuMarkup = /* @__PURE__ */ import_react123.default.createElement(ActionMenu, {
      actions: secondaryActions,
      groups: actionGroups,
      rollup: isNavigationCollapsed,
      rollupActionsLabel: title ? i18n.translate("Polaris.Page.Header.rollupActionsLabel", {
        title
      }) : void 0,
      onActionRollup
    });
  } else if (isReactElement(secondaryActions)) {
    actionMenuMarkup = /* @__PURE__ */ import_react123.default.createElement(import_react123.default.Fragment, null, secondaryActions);
  }
  const navigationMarkup = breadcrumbMarkup || paginationMarkup || additionalNavigationMarkup ? /* @__PURE__ */ import_react123.default.createElement(Box, {
    printHidden: true,
    paddingBlockEnd: "1",
    paddingInlineEnd: actionMenuMarkup && isNavigationCollapsed ? "10" : void 0
  }, /* @__PURE__ */ import_react123.default.createElement(HorizontalStack, {
    gap: "4",
    align: "space-between",
    blockAlign: "center"
  }, breadcrumbMarkup, additionalNavigationMarkup, paginationMarkup)) : null;
  const additionalMetadataMarkup = additionalMetadata ? /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.AdditionalMetaData
  }, /* @__PURE__ */ import_react123.default.createElement(Text, {
    color: "subdued",
    as: "span",
    variant: polarisSummerEditions2023 ? "bodySm" : void 0
  }, additionalMetadata)) : null;
  const headerClassNames = classNames(isSingleRow && styles31.isSingleRow, navigationMarkup && styles31.hasNavigation, actionMenuMarkup && styles31.hasActionMenu, isNavigationCollapsed && styles31.mobileView, !backAction && styles31.noBreadcrumbs, title && title.length < LONG_TITLE && styles31.mediumTitle, title && title.length > LONG_TITLE && styles31.longTitle);
  const {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6
  } = determineLayout({
    actionMenuMarkup,
    additionalMetadataMarkup,
    additionalNavigationMarkup,
    breadcrumbMarkup,
    isNavigationCollapsed,
    pageTitleMarkup,
    paginationMarkup,
    primaryActionMarkup,
    title
  });
  return /* @__PURE__ */ import_react123.default.createElement(Box, {
    position: "relative",
    paddingBlockStart: {
      xs: "4",
      md: polarisSummerEditions2023 ? "6" : "5"
    },
    paddingBlockEnd: {
      xs: "4",
      md: polarisSummerEditions2023 ? "6" : "5"
    },
    paddingInlineStart: {
      xs: "4",
      sm: "0"
    },
    paddingInlineEnd: {
      xs: "4",
      sm: "0"
    },
    visuallyHidden: titleHidden
  }, /* @__PURE__ */ import_react123.default.createElement("div", {
    className: headerClassNames
  }, /* @__PURE__ */ import_react123.default.createElement(ConditionalRender, {
    condition: [slot1, slot2, slot3, slot4].some(notNull)
  }, /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.Row
  }, slot1, slot2, /* @__PURE__ */ import_react123.default.createElement(ConditionalRender, {
    condition: [slot3, slot4].some(notNull)
  }, /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.RightAlign
  }, /* @__PURE__ */ import_react123.default.createElement(ConditionalWrapper, {
    condition: [slot3, slot4].every(notNull),
    wrapper: (children) => /* @__PURE__ */ import_react123.default.createElement("div", {
      className: styles31.Actions
    }, children)
  }, slot3, slot4))))), /* @__PURE__ */ import_react123.default.createElement(ConditionalRender, {
    condition: [slot5, slot6].some(notNull)
  }, /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.Row
  }, /* @__PURE__ */ import_react123.default.createElement(HorizontalStack, {
    gap: "4"
  }, slot5), /* @__PURE__ */ import_react123.default.createElement(ConditionalRender, {
    condition: slot6 != null
  }, /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.RightAlign
  }, slot6))))));
}
function PrimaryActionMarkup({
  primaryAction
}) {
  const {
    isNavigationCollapsed
  } = useMediaQuery();
  let actionMarkup;
  if (isInterface(primaryAction)) {
    const {
      primary: isPrimary,
      helpText
    } = primaryAction;
    const primary = isPrimary === void 0 ? true : isPrimary;
    const content = buttonFrom(shouldShowIconOnly(isNavigationCollapsed, primaryAction), {
      primary
    });
    actionMarkup = helpText ? /* @__PURE__ */ import_react123.default.createElement(Tooltip, {
      content: helpText
    }, content) : content;
  } else {
    actionMarkup = primaryAction;
  }
  return /* @__PURE__ */ import_react123.default.createElement("div", {
    className: styles31.PrimaryActionWrapper
  }, /* @__PURE__ */ import_react123.default.createElement(Box, {
    printHidden: true
  }, actionMarkup));
}
function shouldShowIconOnly(isMobile, action) {
  let {
    content,
    accessibilityLabel,
    icon
  } = action;
  if (icon == null)
    return {
      ...action,
      icon: void 0
    };
  if (isMobile) {
    accessibilityLabel = accessibilityLabel || content;
    content = void 0;
  } else {
    icon = void 0;
  }
  return {
    ...action,
    content,
    accessibilityLabel,
    icon
  };
}
function notNull(value) {
  return value != null;
}
function determineLayout({
  actionMenuMarkup,
  additionalMetadataMarkup,
  additionalNavigationMarkup,
  breadcrumbMarkup,
  isNavigationCollapsed,
  pageTitleMarkup,
  paginationMarkup,
  primaryActionMarkup,
  title
}) {
  const layouts = {
    mobileCompact: {
      slots: {
        slot1: null,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: isNavigationCollapsed && breadcrumbMarkup == null && title != null && title.length <= REALLY_SHORT_TITLE
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: isNavigationCollapsed
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: !isNavigationCollapsed && paginationMarkup == null && actionMenuMarkup == null && title != null && title.length <= SHORT_TITLE
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: /* @__PURE__ */ import_react123.default.createElement(import_react123.default.Fragment, null, actionMenuMarkup, primaryActionMarkup),
        slot4: paginationMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup
      },
      condition: !isNavigationCollapsed
    }
  };
  const layout = Object.values(layouts).find((layout2) => layout2.condition) || layouts.desktopDefault;
  return layout.slots;
}

// node_modules/@shopify/polaris/build/esm/components/Page/Page.js
function Page({
  children,
  fullWidth,
  narrowWidth,
  divider,
  ...rest
}) {
  const pageClassName = classNames(styles30.Page, fullWidth && styles30.fullWidth, narrowWidth && styles30.narrowWidth);
  const hasHeaderContent = rest.title != null && rest.title !== "" || rest.subtitle != null && rest.subtitle !== "" || rest.primaryAction != null || rest.secondaryActions != null && (isInterface(rest.secondaryActions) && rest.secondaryActions.length > 0 || isReactElement(rest.secondaryActions)) || rest.actionGroups != null && rest.actionGroups.length > 0 || rest.backAction != null;
  const contentClassName = classNames(!hasHeaderContent && styles30.Content, divider && hasHeaderContent && styles30.divider);
  const headerMarkup = hasHeaderContent ? /* @__PURE__ */ import_react124.default.createElement(Header, rest) : null;
  return /* @__PURE__ */ import_react124.default.createElement("div", {
    className: pageClassName
  }, headerMarkup, /* @__PURE__ */ import_react124.default.createElement("div", {
    className: contentClassName
  }, children));
}

// node_modules/@shopify/polaris/build/esm/components/PageActions/PageActions.js
var import_react127 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/PageActions/PageActions.scss.js
var styles40 = {
  "PageActions": "Polaris-PageActions"
};

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.js
var import_react126 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.scss.js
var styles41 = {
  "LegacyStack": "Polaris-LegacyStack",
  "Item": "Polaris-LegacyStack__Item",
  "noWrap": "Polaris-LegacyStack--noWrap",
  "spacingNone": "Polaris-LegacyStack--spacingNone",
  "spacingExtraTight": "Polaris-LegacyStack--spacingExtraTight",
  "spacingTight": "Polaris-LegacyStack--spacingTight",
  "spacingBaseTight": "Polaris-LegacyStack--spacingBaseTight",
  "spacingLoose": "Polaris-LegacyStack--spacingLoose",
  "spacingExtraLoose": "Polaris-LegacyStack--spacingExtraLoose",
  "distributionLeading": "Polaris-LegacyStack--distributionLeading",
  "distributionTrailing": "Polaris-LegacyStack--distributionTrailing",
  "distributionCenter": "Polaris-LegacyStack--distributionCenter",
  "distributionEqualSpacing": "Polaris-LegacyStack--distributionEqualSpacing",
  "distributionFill": "Polaris-LegacyStack--distributionFill",
  "distributionFillEvenly": "Polaris-LegacyStack--distributionFillEvenly",
  "alignmentLeading": "Polaris-LegacyStack--alignmentLeading",
  "alignmentTrailing": "Polaris-LegacyStack--alignmentTrailing",
  "alignmentCenter": "Polaris-LegacyStack--alignmentCenter",
  "alignmentFill": "Polaris-LegacyStack--alignmentFill",
  "alignmentBaseline": "Polaris-LegacyStack--alignmentBaseline",
  "vertical": "Polaris-LegacyStack--vertical",
  "Item-fill": "Polaris-LegacyStack__Item--fill"
};

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/components/Item/Item.js
var import_react125 = __toESM(require_react());
function Item6({
  children,
  fill
}) {
  const className = classNames(styles41.Item, fill && styles41["Item-fill"]);
  return /* @__PURE__ */ import_react125.default.createElement("div", {
    className
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/LegacyStack/LegacyStack.js
var LegacyStack = /* @__PURE__ */ (0, import_react126.memo)(function Stack({
  children,
  vertical,
  spacing,
  distribution,
  alignment,
  wrap
}) {
  const className = classNames(styles41.LegacyStack, vertical && styles41.vertical, spacing && styles41[variationName("spacing", spacing)], distribution && styles41[variationName("distribution", distribution)], alignment && styles41[variationName("alignment", alignment)], wrap === false && styles41.noWrap);
  const itemMarkup = elementChildren(children).map((child, index) => {
    const props = {
      key: index
    };
    return wrapWithComponent(child, Item6, props);
  });
  return /* @__PURE__ */ import_react126.default.createElement("div", {
    className
  }, itemMarkup);
});
LegacyStack.Item = Item6;

// node_modules/@shopify/polaris/build/esm/components/PageActions/PageActions.js
function PageActions({
  primaryAction,
  secondaryActions
}) {
  let primaryActionMarkup = null;
  if (isReactElement(primaryAction)) {
    primaryActionMarkup = /* @__PURE__ */ import_react127.default.createElement(import_react127.default.Fragment, null, primaryAction);
  } else if (primaryAction) {
    primaryActionMarkup = buttonsFrom(primaryAction, {
      primary: true
    });
  }
  let secondaryActionsMarkup = null;
  if (isInterface(secondaryActions) && secondaryActions.length > 0) {
    secondaryActionsMarkup = /* @__PURE__ */ import_react127.default.createElement(ButtonGroup, null, buttonsFrom(secondaryActions));
  } else if (isReactElement(secondaryActions)) {
    secondaryActionsMarkup = /* @__PURE__ */ import_react127.default.createElement(import_react127.default.Fragment, null, secondaryActions);
  }
  return /* @__PURE__ */ import_react127.default.createElement("div", {
    className: styles40.PageActions
  }, /* @__PURE__ */ import_react127.default.createElement(LegacyStack, {
    distribution: "trailing",
    spacing: "tight"
  }, secondaryActionsMarkup, primaryActionMarkup));
}

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/Autocomplete.js
var import_react148 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/options.js
function isSection(arr) {
  return typeof arr[0] === "object" && Object.prototype.hasOwnProperty.call(arr[0], "options");
}

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/Autocomplete.scss.js
var styles42 = {
  "Loading": "Polaris-Autocomplete__Loading",
  "SectionWrapper": "Polaris-Autocomplete__SectionWrapper"
};

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/components/MappedOption/MappedOption.js
var import_react144 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/components/MappedOption/MappedOption.scss.js
var styles43 = {
  "Content": "Polaris-Autocomplete-MappedOption__Content",
  "Media": "Polaris-Autocomplete-MappedOption__Media",
  "singleSelectionMedia": "Polaris-Autocomplete-MappedOption--singleSelectionMedia",
  "disabledMedia": "Polaris-Autocomplete-MappedOption--disabledMedia"
};

// node_modules/@shopify/polaris/build/esm/components/Listbox/Listbox.js
var import_react143 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Listbox/Listbox.scss.js
var styles44 = {
  "Listbox": "Polaris-Listbox"
};

// node_modules/@shopify/polaris/build/esm/utilities/combobox/hooks.js
var import_react129 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/combobox/context.js
var import_react128 = __toESM(require_react());
var ComboboxTextFieldContext = /* @__PURE__ */ (0, import_react128.createContext)(void 0);
var ComboboxListboxContext = /* @__PURE__ */ (0, import_react128.createContext)({});
var ComboboxListboxOptionContext = /* @__PURE__ */ (0, import_react128.createContext)({});

// node_modules/@shopify/polaris/build/esm/utilities/combobox/hooks.js
function useComboboxTextField() {
  const context = (0, import_react129.useContext)(ComboboxTextFieldContext);
  if (!context) {
    throw new Error("No Combobox was provided. Your component must be wrapped in a <Combobox> component.");
  }
  return context;
}
function useComboboxListbox() {
  const context = (0, import_react129.useContext)(ComboboxListboxContext);
  return context;
}

// node_modules/@shopify/polaris/build/esm/utilities/listbox/utilities.js
function scrollOptionIntoView(option, scrollable2) {
  const listTop = scrollable2.scrollTop;
  const listBottom = listTop + scrollable2.clientHeight;
  const {
    offsetHeight: optionHeight
  } = option;
  const {
    offsetTop: optionTop
  } = option;
  const optionBottom = optionTop + optionHeight;
  const isVisible = optionTop > listTop && optionBottom < listBottom;
  if (!isVisible) {
    let top = 0;
    if (optionBottom > listBottom) {
      top = optionBottom + optionHeight * 0.85 - listBottom;
    } else if (optionTop < listTop) {
      top = optionTop - optionHeight * 0.15 - listTop;
    }
    requestAnimationFrame(() => {
      scrollable2.scrollBy({
        top,
        behavior: "auto"
      });
    });
  }
}

// node_modules/@shopify/polaris/build/esm/utilities/listbox/context.js
var import_react130 = __toESM(require_react());
var ListboxContext = /* @__PURE__ */ (0, import_react130.createContext)(void 0);
var WithinListboxContext = /* @__PURE__ */ (0, import_react130.createContext)(false);
var ActionContext = /* @__PURE__ */ (0, import_react130.createContext)(false);

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/TextOption/TextOption.js
var import_react133 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/TextOption/TextOption.scss.js
var styles45 = {
  "TextOption": "Polaris-Listbox-TextOption",
  "selected": "Polaris-Listbox-TextOption--selected",
  "allowMultiple": "Polaris-Listbox-TextOption--allowMultiple",
  "isAction": "Polaris-Listbox-TextOption--isAction",
  "disabled": "Polaris-Listbox-TextOption--disabled",
  "Content": "Polaris-Listbox-TextOption__Content",
  "Checkbox": "Polaris-Listbox-TextOption__Checkbox"
};

// node_modules/@shopify/polaris/build/esm/components/Checkbox/Checkbox.js
var import_react132 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Checkbox/Checkbox.scss.js
var styles46 = {
  "Checkbox": "Polaris-Checkbox",
  "ChoiceLabel": "Polaris-Checkbox__ChoiceLabel",
  "Backdrop": "Polaris-Checkbox__Backdrop",
  "Input": "Polaris-Checkbox__Input",
  "Input-indeterminate": "Polaris-Checkbox__Input--indeterminate",
  "Icon": "Polaris-Checkbox__Icon",
  "animated": "Polaris-Checkbox--animated",
  "hover": "Polaris-Checkbox--hover",
  "error": "Polaris-Checkbox--error",
  "checked": "Polaris-Checkbox--checked",
  "pathAnimation": "Polaris-Checkbox--pathAnimation"
};

// node_modules/@shopify/polaris/build/esm/components/Choice/Choice.js
var import_react131 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Choice/Choice.scss.js
var styles47 = {
  "Choice": "Polaris-Choice",
  "labelHidden": "Polaris-Choice--labelHidden",
  "Label": "Polaris-Choice__Label",
  "Control": "Polaris-Choice__Control",
  "disabled": "Polaris-Choice--disabled",
  "Descriptions": "Polaris-Choice__Descriptions",
  "HelpText": "Polaris-Choice__HelpText"
};

// node_modules/@shopify/polaris/build/esm/components/Choice/Choice.js
function Choice({
  id,
  label,
  disabled,
  error,
  children,
  labelHidden,
  helpText,
  onClick,
  labelClassName,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const className = classNames(styles47.Choice, labelHidden && styles47.labelHidden, disabled && styles47.disabled, labelClassName);
  const labelStyle = {
    // Pass through overrides for bleed values if they're set by the prop
    ...getResponsiveProps("choice", "bleed-block-end", "space", bleedBlockEnd || bleed),
    ...getResponsiveProps("choice", "bleed-block-start", "space", bleedBlockStart || bleed),
    ...getResponsiveProps("choice", "bleed-inline-start", "space", bleedInlineStart || bleed),
    ...getResponsiveProps("choice", "bleed-inline-end", "space", bleedInlineEnd || bleed),
    ...Object.fromEntries(Object.entries(getResponsiveValue("choice", "fill", fill)).map(
      // Map "true" => "100%" and "false" => "auto" for use in
      // inline/block-size calc()
      ([key, value]) => [key, value ? "100%" : "auto"]
    ))
  };
  const labelMarkup = (
    // NOTE: Can't use a Box here for a few reasons:
    // - as="label" fails `Element` typecheck (even though the JS works)
    // - Can't pass hard coded values to padding (forced to tokens)
    // - Can't pass negative values to padding
    // - Can't pass margins at all
    /* @__PURE__ */ import_react131.default.createElement("label", {
      className,
      htmlFor: id,
      onClick,
      style: sanitizeCustomProperties(labelStyle)
    }, /* @__PURE__ */ import_react131.default.createElement("span", {
      className: styles47.Control
    }, children), /* @__PURE__ */ import_react131.default.createElement("span", {
      className: styles47.Label
    }, /* @__PURE__ */ import_react131.default.createElement("span", null, label)))
  );
  const helpTextMarkup = helpText ? /* @__PURE__ */ import_react131.default.createElement("div", {
    className: styles47.HelpText,
    id: helpTextID2(id)
  }, /* @__PURE__ */ import_react131.default.createElement(Text, {
    as: "span",
    color: disabled && polarisSummerEditions2023 ? void 0 : "subdued"
  }, helpText)) : null;
  const errorMarkup = error && typeof error !== "boolean" && /* @__PURE__ */ import_react131.default.createElement("div", {
    className: styles47.Error
  }, /* @__PURE__ */ import_react131.default.createElement(InlineError, {
    message: error,
    fieldID: id
  }));
  const descriptionMarkup = helpTextMarkup || errorMarkup ? /* @__PURE__ */ import_react131.default.createElement("div", {
    className: styles47.Descriptions
  }, errorMarkup, helpTextMarkup) : null;
  return descriptionMarkup ? /* @__PURE__ */ import_react131.default.createElement("div", null, labelMarkup, descriptionMarkup) : labelMarkup;
}
function helpTextID2(id) {
  return `${id}HelpText`;
}

// node_modules/@shopify/polaris/build/esm/components/Checkbox/Checkbox.js
var Checkbox = /* @__PURE__ */ (0, import_react132.forwardRef)(function Checkbox2({
  ariaControls,
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  checked = false,
  helpText,
  disabled,
  id: idProp,
  name,
  value,
  error,
  onChange,
  onFocus,
  onBlur,
  labelClassName,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd
}, ref) {
  const inputNode = (0, import_react132.useRef)(null);
  const uniqId = (0, import_react132.useId)();
  const id = idProp ?? uniqId;
  const isWithinListbox = (0, import_react132.useContext)(WithinListboxContext);
  const {
    polarisSummerEditions2023
  } = useFeatures();
  (0, import_react132.useImperativeHandle)(ref, () => ({
    focus: () => {
      if (inputNode.current) {
        inputNode.current.focus();
      }
    }
  }));
  const handleBlur = () => {
    onBlur && onBlur();
  };
  const handleOnClick = () => {
    if (onChange == null || inputNode.current == null || disabled) {
      return;
    }
    onChange(inputNode.current.checked, id);
    inputNode.current.focus();
  };
  const describedBy = [];
  if (error && typeof error !== "boolean") {
    describedBy.push(errorTextID(id));
  }
  if (helpText) {
    describedBy.push(helpTextID2(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(" ") : void 0;
  const wrapperClassName = classNames(styles46.Checkbox, error && styles46.error);
  const isIndeterminate = checked === "indeterminate";
  const isChecked = !isIndeterminate && Boolean(checked);
  const indeterminateAttributes = isIndeterminate ? {
    indeterminate: "true",
    "aria-checked": "mixed"
  } : {
    "aria-checked": isChecked
  };
  const iconSource = isIndeterminate ? SvgMinusMinor : SvgTickSmallMinor;
  const animatedTickIcon = polarisSummerEditions2023 && !isIndeterminate;
  const iconSourceSe23 = /* @__PURE__ */ import_react132.default.createElement("svg", {
    viewBox: "0 0 16 16",
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision"
  }, /* @__PURE__ */ import_react132.default.createElement("path", {
    className: classNames(checked && styles46.checked),
    d: "M1.5,5.5L3.44655,8.22517C3.72862,8.62007,4.30578,8.64717,4.62362,8.28044L10.5,1.5",
    transform: "translate(2 2.980376)",
    opacity: "0",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    pathLength: "1"
  }));
  const inputClassName = classNames(styles46.Input, isIndeterminate && styles46["Input-indeterminate"]);
  const extraChoiceProps = {
    helpText,
    error,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd
  };
  return /* @__PURE__ */ import_react132.default.createElement(Choice, Object.assign({
    id,
    label,
    labelHidden,
    disabled,
    labelClassName: classNames(styles46.ChoiceLabel, labelClassName),
    fill
  }, extraChoiceProps), /* @__PURE__ */ import_react132.default.createElement("span", {
    className: wrapperClassName
  }, /* @__PURE__ */ import_react132.default.createElement("input", Object.assign({
    ref: inputNode,
    id,
    name,
    value,
    type: "checkbox",
    checked: isChecked,
    disabled,
    className: inputClassName,
    onBlur: handleBlur,
    onChange: noop5,
    onClick: handleOnClick,
    onFocus,
    "aria-invalid": error != null,
    "aria-controls": ariaControls,
    "aria-describedby": ariaDescribedBy,
    role: isWithinListbox ? "presentation" : "checkbox"
  }, indeterminateAttributes)), /* @__PURE__ */ import_react132.default.createElement("span", {
    className: styles46.Backdrop,
    onClick: stopPropagation,
    onKeyUp: stopPropagation
  }), /* @__PURE__ */ import_react132.default.createElement("span", {
    className: classNames(styles46.Icon, animatedTickIcon && styles46.animated)
  }, animatedTickIcon ? iconSourceSe23 : /* @__PURE__ */ import_react132.default.createElement(Icon, {
    source: iconSource
  }))));
});
function noop5() {
}
function stopPropagation(event) {
  event.stopPropagation();
}

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/TextOption/TextOption.js
var TextOption = /* @__PURE__ */ (0, import_react133.memo)(function TextOption2({
  children,
  selected,
  disabled
}) {
  const {
    allowMultiple
  } = (0, import_react133.useContext)(ComboboxListboxOptionContext);
  const isAction = (0, import_react133.useContext)(ActionContext);
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const textOptionClassName = classNames(styles45.TextOption, selected && !allowMultiple && styles45.selected, disabled && styles45.disabled, allowMultiple && styles45.allowMultiple, isAction && styles45.isAction);
  const optionMarkup = polarisSummerEditions2023 && selected ? /* @__PURE__ */ import_react133.default.createElement(Box, {
    width: "100%"
  }, /* @__PURE__ */ import_react133.default.createElement(HorizontalStack, {
    wrap: false,
    align: "space-between",
    gap: "2"
  }, children, /* @__PURE__ */ import_react133.default.createElement(HorizontalStack, {
    align: "end"
  }, /* @__PURE__ */ import_react133.default.createElement(Icon, {
    source: SvgTickMinor
  })))) : /* @__PURE__ */ import_react133.default.createElement(import_react133.default.Fragment, null, children);
  return /* @__PURE__ */ import_react133.default.createElement("div", {
    className: textOptionClassName
  }, /* @__PURE__ */ import_react133.default.createElement("div", {
    className: styles45.Content
  }, allowMultiple && !isAction ? /* @__PURE__ */ import_react133.default.createElement("div", {
    className: styles45.Checkbox
  }, /* @__PURE__ */ import_react133.default.createElement(Checkbox, {
    disabled,
    checked: selected,
    label: children
  })) : optionMarkup));
});

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Loading/Loading.js
var import_react135 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Loading/Loading.scss.js
var styles48 = {
  "ListItem": "Polaris-Listbox-Loading__ListItem",
  "Loading": "Polaris-Listbox-Loading"
};

// node_modules/@shopify/polaris/build/esm/utilities/listbox/hooks.js
var import_react134 = __toESM(require_react());
function useListbox() {
  const listbox = (0, import_react134.useContext)(ListboxContext);
  if (!listbox) {
    throw new Error("No Listbox was provided. Listbox components must be wrapped in a Listbox");
  }
  return listbox;
}

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Loading/Loading.js
var Loading = /* @__PURE__ */ (0, import_react135.memo)(function LoadingOption({
  children,
  accessibilityLabel: label
}) {
  const {
    setLoading
  } = useListbox();
  (0, import_react135.useEffect)(() => {
    setLoading(label);
    return () => {
      setLoading(void 0);
    };
  }, [label, setLoading]);
  return /* @__PURE__ */ import_react135.default.createElement("li", {
    className: styles48.ListItem,
    role: "presentation"
  }, children ? children : /* @__PURE__ */ import_react135.default.createElement("div", {
    className: styles48.Loading
  }, /* @__PURE__ */ import_react135.default.createElement(Spinner, {
    size: "small",
    accessibilityLabel: label
  })));
});

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Section/Section.js
var import_react137 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Section/selectors.js
var listboxSectionDataSelector = {
  props: {
    "data-polaris-listbox-section-item": true
  },
  selector: "[data-polaris-listbox-section-item]"
};
var listboxWithinSectionDataSelector = {
  attribute: "data-polaris-listbox-within-section-item"
};

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Section/context.js
var import_react136 = __toESM(require_react());
var SectionContext = /* @__PURE__ */ (0, import_react136.createContext)(null);

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Section/Section.scss.js
var styles49 = {
  "SectionGroup": "Polaris-Listbox-Section__SectionGroup",
  "noDivider": "Polaris-Listbox-Section--noDivider"
};

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Section/Section.js
function Section4({
  children,
  divider = true,
  title
}) {
  const id = (0, import_react137.useId)();
  return /* @__PURE__ */ import_react137.default.createElement(SectionContext.Provider, {
    value: id
  }, /* @__PURE__ */ import_react137.default.createElement("li", Object.assign({
    role: "presentation"
  }, listboxSectionDataSelector.props), title, /* @__PURE__ */ import_react137.default.createElement("ul", {
    role: "group",
    "aria-labelledby": id,
    className: classNames(styles49.SectionGroup, !divider && styles49.noDivider)
  }, children)));
}

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Header/Header.js
var import_react139 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Section/hooks.js
var import_react138 = __toESM(require_react());
function useSection() {
  const context = (0, import_react138.useContext)(SectionContext);
  return context;
}

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Header/Header.js
function Header2({
  children
}) {
  const sectionId = useSection() || "";
  const content = typeof children === "string" ? /* @__PURE__ */ import_react139.default.createElement(Box, {
    paddingBlockStart: "2",
    paddingInlineStart: "4",
    paddingBlockEnd: "2",
    paddingInlineEnd: "4"
  }, /* @__PURE__ */ import_react139.default.createElement(Text, {
    as: "span",
    variant: "headingXs",
    color: "subdued"
  }, children)) : children;
  return /* @__PURE__ */ import_react139.default.createElement("div", {
    "aria-hidden": true,
    id: sectionId
  }, content);
}

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Action/Action.js
var import_react142 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Action/Action.scss.js
var styles50 = {
  "Action": "Polaris-Listbox-Action",
  "ActionDivider": "Polaris-Listbox-Action__ActionDivider",
  "Icon": "Polaris-Listbox-Action__Icon"
};

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Option/Option.js
var import_react141 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Option/Option.scss.js
var styles51 = {
  "Option": "Polaris-Listbox-Option",
  "divider": "Polaris-Listbox-Option--divider"
};

// node_modules/@shopify/polaris/build/esm/utilities/autocomplete/context.js
var import_react140 = __toESM(require_react());
var MappedActionContext = /* @__PURE__ */ (0, import_react140.createContext)({});

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Option/Option.js
var Option = /* @__PURE__ */ (0, import_react141.memo)(function Option2({
  value,
  children,
  selected,
  disabled = false,
  accessibilityLabel,
  divider
}) {
  const {
    onOptionSelect
  } = useListbox();
  const isAction = (0, import_react141.useContext)(ActionContext);
  const {
    role,
    url,
    external,
    onAction,
    destructive
  } = (0, import_react141.useContext)(MappedActionContext);
  const listItemRef = (0, import_react141.useRef)(null);
  const domId = (0, import_react141.useId)();
  const sectionId = useSection();
  const isWithinSection = Boolean(sectionId);
  const handleOptionSelect = (0, import_react141.useCallback)((event) => {
    event.preventDefault();
    event.stopPropagation();
    onAction && onAction();
    if (listItemRef.current && !onAction) {
      onOptionSelect({
        domId,
        value,
        element: listItemRef.current,
        disabled
      });
    }
  }, [domId, onOptionSelect, value, disabled, onAction]);
  const handleMouseDown = (event) => {
    event.preventDefault();
  };
  const content = typeof children === "string" ? /* @__PURE__ */ import_react141.default.createElement(TextOption, {
    selected,
    disabled
  }, children) : children;
  const sectionAttributes = {
    [listboxWithinSectionDataSelector.attribute]: isWithinSection
  };
  const legacyRoleSupport = role || "option";
  const contentMarkup = url ? /* @__PURE__ */ import_react141.default.createElement(UnstyledLink, {
    url,
    external
  }, content) : content;
  return /* @__PURE__ */ import_react141.default.createElement("li", Object.assign({}, sectionAttributes, {
    "data-listbox-option": true,
    "data-listbox-option-action": isAction,
    "data-listbox-option-value": value,
    "data-listbox-option-destructive": destructive,
    "data-within-section": isWithinSection,
    className: classNames(styles51.Option, divider && styles51.divider),
    id: domId,
    ref: listItemRef,
    tabIndex: -1,
    role: legacyRoleSupport,
    "aria-label": accessibilityLabel,
    "aria-selected": selected,
    "aria-disabled": disabled,
    onClick: disabled ? void 0 : handleOptionSelect,
    onKeyDown: disabled ? void 0 : handleOptionSelect,
    onMouseDown: handleMouseDown
  }), contentMarkup);
});

// node_modules/@shopify/polaris/build/esm/components/Listbox/components/Action/Action.js
function Action(props) {
  const {
    selected,
    disabled,
    children,
    icon,
    divider
  } = props;
  const iconMarkup = icon && /* @__PURE__ */ import_react142.default.createElement("div", {
    className: styles50.Icon
  }, /* @__PURE__ */ import_react142.default.createElement(Icon, {
    color: "subdued",
    source: icon
  }));
  const className = classNames(styles50.Action, divider && styles50.ActionDivider);
  return /* @__PURE__ */ import_react142.default.createElement(ActionContext.Provider, {
    value: true
  }, /* @__PURE__ */ import_react142.default.createElement(Option, props, /* @__PURE__ */ import_react142.default.createElement("div", {
    className
  }, /* @__PURE__ */ import_react142.default.createElement(TextOption, {
    selected,
    disabled
  }, iconMarkup, children))));
}

// node_modules/@shopify/polaris/build/esm/components/Listbox/Listbox.js
var AutoSelection;
(function(AutoSelection2) {
  AutoSelection2["FirstSelected"] = "FIRST_SELECTED";
  AutoSelection2["First"] = "FIRST";
  AutoSelection2["None"] = "NONE";
})(AutoSelection || (AutoSelection = {}));
var OPTION_SELECTOR = "[data-listbox-option]";
var OPTION_VALUE_ATTRIBUTE = "data-listbox-option-value";
var OPTION_ACTION_ATTRIBUTE = "data-listbox-option-action";
var OPTION_FOCUS_ATTRIBUTE = "data-focused";
function Listbox({
  children,
  autoSelection = AutoSelection.FirstSelected,
  enableKeyboardControl,
  accessibilityLabel,
  customListId,
  onSelect,
  onActiveOptionChange
}) {
  const [loading, setLoading] = (0, import_react143.useState)();
  const [activeOption, setActiveOption] = (0, import_react143.useState)();
  const [lazyLoading, setLazyLoading] = (0, import_react143.useState)(false);
  const [currentOptions, setCurrentOptions] = (0, import_react143.useState)([]);
  const {
    value: keyboardEventsEnabled,
    setTrue: enableKeyboardEvents,
    setFalse: disableKeyboardEvents
  } = useToggle(Boolean(enableKeyboardControl));
  const uniqueId = (0, import_react143.useId)();
  const listId = customListId || uniqueId;
  const scrollableRef = (0, import_react143.useRef)(null);
  const listboxRef = (0, import_react143.useRef)(null);
  const {
    listboxId,
    textFieldLabelId,
    textFieldFocused,
    willLoadMoreOptions,
    setActiveOptionId,
    setListboxId,
    onOptionSelected,
    onKeyToBottom
  } = useComboboxListbox();
  const inCombobox = Boolean(setActiveOptionId);
  (0, import_react143.useEffect)(() => {
    if (setListboxId && !listboxId) {
      setListboxId(listId);
    }
  }, [setListboxId, listboxId, listId]);
  const getNavigableOptions = (0, import_react143.useCallback)(() => {
    if (!listboxRef.current) {
      return [];
    }
    return [...new Set(listboxRef.current.querySelectorAll(OPTION_SELECTOR))];
  }, []);
  const getFirstNavigableOption = (0, import_react143.useCallback)((currentOptions2) => {
    const hasSelectedOptions = currentOptions2.some((option) => option.getAttribute("aria-selected") === "true");
    let elementIndex = 0;
    const element = currentOptions2.find((option, index) => {
      const isInteractable = option.getAttribute("aria-disabled") !== "true";
      let isFirstNavigableOption;
      if (hasSelectedOptions && autoSelection === AutoSelection.FirstSelected) {
        const isSelected = option.getAttribute("aria-selected") === "true";
        isFirstNavigableOption = isSelected && isInteractable;
      } else {
        isFirstNavigableOption = isInteractable;
      }
      if (isFirstNavigableOption)
        elementIndex = index;
      return isFirstNavigableOption;
    });
    if (!element)
      return;
    return {
      element,
      index: elementIndex
    };
  }, [autoSelection]);
  const handleScrollIntoView = (0, import_react143.useCallback)((option) => {
    const {
      current: scrollable2
    } = scrollableRef;
    if (scrollable2) {
      scrollOptionIntoView(option.element, scrollable2);
    }
  }, []);
  const handleScrollIntoViewDebounced = debounce(handleScrollIntoView, 50);
  const handleKeyToBottom = (0, import_react143.useCallback)(() => {
    if (onKeyToBottom) {
      setLazyLoading(true);
      return Promise.resolve(onKeyToBottom());
    }
  }, [onKeyToBottom]);
  const handleChangeActiveOption = (0, import_react143.useCallback)((nextOption) => {
    if (!nextOption)
      return setActiveOption(void 0);
    activeOption?.element.removeAttribute(OPTION_FOCUS_ATTRIBUTE);
    nextOption.element.setAttribute(OPTION_FOCUS_ATTRIBUTE, "true");
    handleScrollIntoViewDebounced(nextOption);
    setActiveOption(nextOption);
    setActiveOptionId?.(nextOption.domId);
    onActiveOptionChange?.(nextOption.value, nextOption.domId);
  }, [activeOption, setActiveOptionId, onActiveOptionChange, handleScrollIntoViewDebounced]);
  const getFormattedOption = (0, import_react143.useCallback)((element, index) => {
    return {
      element,
      index,
      domId: element.id,
      value: element.getAttribute(OPTION_VALUE_ATTRIBUTE) || "",
      disabled: element.getAttribute("aria-disabled") === "true",
      isAction: element.getAttribute(OPTION_ACTION_ATTRIBUTE) === "true"
    };
  }, []);
  const resetActiveOption = (0, import_react143.useCallback)(() => {
    let nextOption;
    const nextOptions = getNavigableOptions();
    const nextActiveOption = getFirstNavigableOption(nextOptions);
    if (nextOptions.length === 0 && currentOptions.length > 0) {
      setCurrentOptions(nextOptions);
      handleChangeActiveOption();
      return;
    }
    if (nextActiveOption) {
      const {
        element,
        index
      } = nextActiveOption;
      nextOption = getFormattedOption(element, index);
    }
    const optionIsAlreadyActive = activeOption !== void 0 && nextOption?.domId === activeOption?.domId;
    const actionContentHasUpdated = activeOption?.isAction && nextOption?.isAction && nextOption?.value !== activeOption?.value;
    const currentValues = currentOptions.map((option) => option.getAttribute(OPTION_VALUE_ATTRIBUTE));
    const nextValues = nextOptions.map((option) => option.getAttribute(OPTION_VALUE_ATTRIBUTE));
    const listIsUnchanged = nextValues.length === currentValues.length && nextValues.every((value, index) => {
      return currentValues[index] === value;
    });
    const listIsAppended = currentValues.length !== 0 && nextValues.length > currentValues.length && currentValues.every((value, index) => {
      return nextValues[index] === value;
    });
    if (listIsUnchanged) {
      if (optionIsAlreadyActive && actionContentHasUpdated) {
        setCurrentOptions(nextOptions);
        handleChangeActiveOption(nextOption);
      }
      return;
    }
    if (listIsAppended) {
      setCurrentOptions(nextOptions);
      return;
    }
    setCurrentOptions(nextOptions);
    if (lazyLoading) {
      setLazyLoading(false);
      return;
    }
    handleChangeActiveOption(nextOption);
  }, [lazyLoading, currentOptions, activeOption, getFirstNavigableOption, getNavigableOptions, getFormattedOption, handleChangeActiveOption]);
  (0, import_react143.useEffect)(() => {
    if (autoSelection !== AutoSelection.None && !loading && children && import_react143.Children.count(children) > 0) {
      resetActiveOption();
    }
  }, [children, autoSelection, activeOption, loading, resetActiveOption]);
  (0, import_react143.useEffect)(() => {
    if (listboxRef.current) {
      scrollableRef.current = listboxRef.current.closest(scrollable.selector);
    }
  }, []);
  (0, import_react143.useEffect)(() => {
    if (enableKeyboardControl && !keyboardEventsEnabled) {
      enableKeyboardEvents();
    }
  }, [enableKeyboardControl, keyboardEventsEnabled, enableKeyboardEvents]);
  const onOptionSelect = (0, import_react143.useCallback)((option) => {
    handleChangeActiveOption(option);
    if (onOptionSelected)
      onOptionSelected();
    if (onSelect)
      onSelect(option.value);
  }, [handleChangeActiveOption, onSelect, onOptionSelected]);
  const getNextIndex = (0, import_react143.useCallback)((currentIndex, lastIndex, direction) => {
    let nextIndex;
    if (direction === "down") {
      if (currentIndex === lastIndex) {
        nextIndex = willLoadMoreOptions ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex + 1;
      }
    } else {
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    }
    return nextIndex;
  }, [willLoadMoreOptions]);
  const getNextValidOption = (0, import_react143.useCallback)(async (key) => {
    const lastIndex = currentOptions.length - 1;
    let currentIndex = activeOption?.index || 0;
    let nextIndex = 0;
    let element = activeOption?.element;
    let totalOptions = -1;
    if (!activeOption && autoSelection === AutoSelection.None) {
      const nextOptions = getNavigableOptions();
      const nextActiveOption = getFirstNavigableOption(nextOptions);
      setCurrentOptions(nextOptions);
      return {
        element: nextActiveOption?.element,
        nextIndex: nextActiveOption?.index || 0
      };
    }
    while (totalOptions++ < lastIndex) {
      nextIndex = getNextIndex(currentIndex, lastIndex, key);
      element = currentOptions[nextIndex];
      const triggerLazyLoad = nextIndex >= lastIndex;
      const isDisabled = element?.getAttribute("aria-disabled") === "true";
      if (triggerLazyLoad && willLoadMoreOptions) {
        await handleKeyToBottom();
      }
      if (isDisabled) {
        currentIndex = nextIndex;
        element = void 0;
        continue;
      }
      break;
    }
    return {
      element,
      nextIndex
    };
  }, [autoSelection, currentOptions, activeOption, willLoadMoreOptions, getNextIndex, handleKeyToBottom, getFirstNavigableOption, getNavigableOptions]);
  const handleArrow = (0, import_react143.useCallback)(async (type, event) => {
    event.preventDefault();
    const {
      element,
      nextIndex
    } = await getNextValidOption(type);
    if (!element)
      return;
    const nextOption = getFormattedOption(element, nextIndex);
    handleChangeActiveOption(nextOption);
  }, [getFormattedOption, getNextValidOption, handleChangeActiveOption]);
  const handleDownArrow = (0, import_react143.useCallback)((event) => {
    handleArrow("down", event);
  }, [handleArrow]);
  const handleUpArrow = (0, import_react143.useCallback)((event) => {
    handleArrow("up", event);
  }, [handleArrow]);
  const handleEnter = (0, import_react143.useCallback)((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (activeOption) {
      onOptionSelect(activeOption);
    }
  }, [activeOption, onOptionSelect]);
  const handleFocus = (0, import_react143.useCallback)(() => {
    if (enableKeyboardControl)
      return;
    enableKeyboardEvents();
  }, [enableKeyboardControl, enableKeyboardEvents]);
  const handleBlur = (0, import_react143.useCallback)((event) => {
    event.stopPropagation();
    if (keyboardEventsEnabled) {
      const nextActiveOption = getFirstNavigableOption(currentOptions);
      if (nextActiveOption) {
        const {
          element,
          index
        } = nextActiveOption;
        const nextOption = getFormattedOption(element, index);
        handleChangeActiveOption(nextOption);
      }
    }
    if (enableKeyboardControl)
      return;
    disableKeyboardEvents();
  }, [enableKeyboardControl, currentOptions, keyboardEventsEnabled, disableKeyboardEvents, getFirstNavigableOption, getFormattedOption, handleChangeActiveOption]);
  const listeners = keyboardEventsEnabled || textFieldFocused ? /* @__PURE__ */ import_react143.default.createElement(import_react143.default.Fragment, null, /* @__PURE__ */ import_react143.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.DownArrow,
    handler: handleDownArrow
  }), /* @__PURE__ */ import_react143.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.UpArrow,
    handler: handleUpArrow
  }), /* @__PURE__ */ import_react143.default.createElement(KeypressListener, {
    keyEvent: "keydown",
    keyCode: Key.Enter,
    handler: handleEnter
  })) : null;
  const listboxContext = (0, import_react143.useMemo)(() => ({
    onOptionSelect,
    setLoading
  }), [onOptionSelect]);
  return /* @__PURE__ */ import_react143.default.createElement(import_react143.default.Fragment, null, listeners, /* @__PURE__ */ import_react143.default.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, /* @__PURE__ */ import_react143.default.createElement("div", {
    "aria-live": "polite"
  }, loading ? loading : null)), /* @__PURE__ */ import_react143.default.createElement(ListboxContext.Provider, {
    value: listboxContext
  }, /* @__PURE__ */ import_react143.default.createElement(WithinListboxContext.Provider, {
    value: true
  }, children ? /* @__PURE__ */ import_react143.default.createElement("ul", {
    tabIndex: 0,
    role: "listbox",
    className: styles44.Listbox,
    "aria-label": inCombobox ? void 0 : accessibilityLabel,
    "aria-labelledby": textFieldLabelId,
    "aria-busy": Boolean(loading),
    "aria-activedescendant": activeOption && activeOption.domId,
    id: listId,
    onFocus: inCombobox ? void 0 : handleFocus,
    onBlur: inCombobox ? void 0 : handleBlur,
    ref: listboxRef
  }, children) : null)));
}
Listbox.Option = Option;
Listbox.TextOption = TextOption;
Listbox.Loading = Loading;
Listbox.Section = Section4;
Listbox.Header = Header2;
Listbox.Action = Action;

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/components/MappedOption/MappedOption.js
var MappedOption = /* @__PURE__ */ (0, import_react144.memo)(function MappedOption2({
  label,
  value,
  disabled,
  media,
  selected,
  singleSelection
}) {
  const mediaClassNames = classNames(styles43.Media, disabled && styles43.disabledMedia, singleSelection && styles43.singleSelectionMedia);
  const mediaMarkup = media ? /* @__PURE__ */ import_react144.default.createElement("div", {
    className: mediaClassNames
  }, media) : null;
  const accessibilityLabel = typeof label === "string" ? label : void 0;
  return /* @__PURE__ */ import_react144.default.createElement(Listbox.Option, {
    accessibilityLabel,
    key: value,
    selected,
    value,
    disabled
  }, /* @__PURE__ */ import_react144.default.createElement(Listbox.TextOption, {
    selected,
    disabled
  }, /* @__PURE__ */ import_react144.default.createElement("div", {
    className: styles43.Content
  }, mediaMarkup, label)));
});

// node_modules/@shopify/polaris/build/esm/components/Combobox/Combobox.js
var import_react146 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Combobox/Combobox.scss.js
var styles52 = {
  "Listbox": "Polaris-Combobox__Listbox"
};

// node_modules/@shopify/polaris/build/esm/components/Combobox/components/TextField/TextField.js
var import_react145 = __toESM(require_react());
function TextField2({
  value,
  id: idProp,
  type = "text",
  ariaAutocomplete = "list",
  onFocus,
  onBlur,
  onChange,
  ...rest
}) {
  const comboboxTextFieldContext = useComboboxTextField();
  const {
    activeOptionId,
    listboxId,
    expanded,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur
  } = comboboxTextFieldContext;
  const uniqueId = (0, import_react145.useId)();
  const textFieldId = (0, import_react145.useMemo)(() => idProp || uniqueId, [uniqueId, idProp]);
  const labelId = (0, import_react145.useMemo)(() => labelID(idProp || uniqueId), [uniqueId, idProp]);
  (0, import_react145.useEffect)(() => {
    if (setTextFieldLabelId)
      setTextFieldLabelId(labelId);
  }, [labelId, setTextFieldLabelId]);
  const handleFocus = (0, import_react145.useCallback)((event) => {
    if (onFocus)
      onFocus(event);
    if (onTextFieldFocus)
      onTextFieldFocus();
    if (setTextFieldFocused)
      setTextFieldFocused(true);
  }, [onFocus, onTextFieldFocus, setTextFieldFocused]);
  const handleBlur = (0, import_react145.useCallback)((event) => {
    if (onBlur)
      onBlur(event);
    if (onTextFieldBlur)
      onTextFieldBlur();
    if (setTextFieldFocused)
      setTextFieldFocused(false);
  }, [onBlur, onTextFieldBlur, setTextFieldFocused]);
  const handleChange = (0, import_react145.useCallback)((value2, id) => {
    if (onChange)
      onChange(value2, id);
    if (onTextFieldChange)
      onTextFieldChange(value2);
  }, [onChange, onTextFieldChange]);
  return /* @__PURE__ */ import_react145.default.createElement(TextField, Object.assign({}, rest, {
    value,
    id: textFieldId,
    type,
    ariaAutocomplete,
    "aria-haspopup": "listbox",
    ariaActiveDescendant: activeOptionId,
    ariaControls: listboxId,
    role: "combobox",
    ariaExpanded: expanded,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange
  }));
}

// node_modules/@shopify/polaris/build/esm/components/Combobox/Combobox.js
function Combobox({
  activator,
  allowMultiple,
  children,
  preferredPosition = "below",
  willLoadMoreOptions,
  height,
  onScrolledToBottom,
  onClose
}) {
  const [popoverActive, setPopoverActive] = (0, import_react146.useState)(false);
  const [activeOptionId, setActiveOptionId] = (0, import_react146.useState)();
  const [textFieldLabelId, setTextFieldLabelId] = (0, import_react146.useState)();
  const [listboxId, setListboxId] = (0, import_react146.useState)();
  const [textFieldFocused, setTextFieldFocused] = (0, import_react146.useState)(false);
  const shouldOpen = Boolean(!popoverActive && import_react146.Children.count(children) > 0);
  const ref = (0, import_react146.useRef)(null);
  const handleClose = (0, import_react146.useCallback)(() => {
    setPopoverActive(false);
    onClose?.();
    setActiveOptionId(void 0);
  }, [onClose]);
  const handleOpen = (0, import_react146.useCallback)(() => {
    setPopoverActive(true);
    setActiveOptionId(void 0);
  }, []);
  const onOptionSelected = (0, import_react146.useCallback)(() => {
    if (!allowMultiple) {
      handleClose();
      setActiveOptionId(void 0);
      return;
    }
    ref.current?.forceUpdatePosition();
  }, [allowMultiple, handleClose]);
  const handleFocus = (0, import_react146.useCallback)(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);
  const handleChange = (0, import_react146.useCallback)(() => {
    if (shouldOpen) {
      handleOpen();
    }
  }, [shouldOpen, handleOpen]);
  const handleBlur = (0, import_react146.useCallback)(() => {
    if (popoverActive) {
      handleClose();
    }
  }, [popoverActive, handleClose]);
  const textFieldContextValue = (0, import_react146.useMemo)(() => ({
    activeOptionId,
    expanded: popoverActive,
    listboxId,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus: handleFocus,
    onTextFieldChange: handleChange,
    onTextFieldBlur: handleBlur
  }), [activeOptionId, popoverActive, listboxId, setTextFieldFocused, setTextFieldLabelId, handleFocus, handleChange, handleBlur]);
  const listboxOptionContextValue = (0, import_react146.useMemo)(() => ({
    allowMultiple
  }), [allowMultiple]);
  const listboxContextValue = (0, import_react146.useMemo)(() => ({
    listboxId,
    textFieldLabelId,
    textFieldFocused,
    willLoadMoreOptions,
    onOptionSelected,
    setActiveOptionId,
    setListboxId,
    onKeyToBottom: onScrolledToBottom
  }), [listboxId, textFieldLabelId, textFieldFocused, willLoadMoreOptions, onOptionSelected, setActiveOptionId, setListboxId, onScrolledToBottom]);
  return /* @__PURE__ */ import_react146.default.createElement(Popover2, {
    ref,
    active: popoverActive,
    activator: /* @__PURE__ */ import_react146.default.createElement(ComboboxTextFieldContext.Provider, {
      value: textFieldContextValue
    }, activator),
    autofocusTarget: "none",
    preventFocusOnClose: true,
    fullWidth: true,
    preferInputActivator: false,
    preferredPosition,
    onClose: handleClose
  }, import_react146.Children.count(children) > 0 ? /* @__PURE__ */ import_react146.default.createElement(Popover2.Pane, {
    onScrolledToBottom,
    height
  }, /* @__PURE__ */ import_react146.default.createElement(ComboboxListboxContext.Provider, {
    value: listboxContextValue
  }, /* @__PURE__ */ import_react146.default.createElement(ComboboxListboxOptionContext.Provider, {
    value: listboxOptionContextValue
  }, /* @__PURE__ */ import_react146.default.createElement("div", {
    className: styles52.Listbox
  }, children)))) : null);
}
Combobox.TextField = TextField2;

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/components/MappedAction/MappedAction.js
var import_react147 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/components/MappedAction/MappedAction.scss.js
var styles53 = {
  "ActionContainer": "Polaris-Autocomplete-MappedAction__ActionContainer",
  "Action": "Polaris-Autocomplete-MappedAction__Action",
  "destructive": "Polaris-Autocomplete-MappedAction--destructive",
  "selected": "Polaris-Autocomplete-MappedAction--selected",
  "disabled": "Polaris-Autocomplete-MappedAction--disabled",
  "Prefix": "Polaris-Autocomplete-MappedAction__Prefix",
  "Suffix": "Polaris-Autocomplete-MappedAction__Suffix",
  "Content": "Polaris-Autocomplete-MappedAction__Content",
  "Text": "Polaris-Autocomplete-MappedAction__Text",
  "ContentWrap": "Polaris-Autocomplete-MappedAction__ContentWrap"
};

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/components/MappedAction/MappedAction.js
function MappedAction({
  active,
  content,
  disabled,
  icon,
  image,
  prefix,
  suffix,
  ellipsis,
  role,
  url,
  external,
  onAction,
  destructive,
  badge,
  helpText,
  wrapOverflow = false
}) {
  const i18n = useI18n();
  let prefixMarkup = null;
  const contentOverflowStyle = wrapOverflow ? styles53.ContentWrap : void 0;
  if (prefix) {
    prefixMarkup = /* @__PURE__ */ import_react147.default.createElement("div", {
      className: styles53.Prefix
    }, prefix);
  } else if (icon) {
    prefixMarkup = /* @__PURE__ */ import_react147.default.createElement("div", {
      className: styles53.Prefix
    }, /* @__PURE__ */ import_react147.default.createElement(Icon, {
      source: icon
    }));
  } else if (image) {
    prefixMarkup = /* @__PURE__ */ import_react147.default.createElement("div", {
      role: "presentation",
      className: styles53.Prefix,
      style: {
        backgroundImage: `url(${image}`
      }
    });
  }
  const badgeMarkup = badge && /* @__PURE__ */ import_react147.default.createElement("span", {
    className: styles53.Suffix
  }, /* @__PURE__ */ import_react147.default.createElement(Badge, {
    status: badge.status
  }, badge.content));
  const suffixMarkup = suffix && /* @__PURE__ */ import_react147.default.createElement("span", {
    className: styles53.Suffix
  }, suffix);
  const contentText = ellipsis && content ? i18n.translate("Polaris.Autocomplete.ellipsis", {
    content
  }) : content;
  const contentMarkup = /* @__PURE__ */ import_react147.default.createElement("div", {
    className: styles53.Text
  }, /* @__PURE__ */ import_react147.default.createElement("div", {
    className: contentOverflowStyle
  }, contentText), helpText ? /* @__PURE__ */ import_react147.default.createElement(Text, {
    color: "subdued",
    as: "span"
  }, helpText) : null);
  const context = (0, import_react147.useMemo)(() => ({
    role,
    url,
    external,
    onAction,
    destructive
  }), [role, url, external, onAction, destructive]);
  const actionClassNames = classNames(styles53.Action, disabled && styles53.disabled, destructive && styles53.destructive, active && styles53.selected);
  return /* @__PURE__ */ import_react147.default.createElement(MappedActionContext.Provider, {
    value: context
  }, /* @__PURE__ */ import_react147.default.createElement("div", {
    className: styles53.ActionContainer
  }, /* @__PURE__ */ import_react147.default.createElement(Listbox.Action, {
    selected: active,
    disabled,
    value: content || ""
  }, /* @__PURE__ */ import_react147.default.createElement("div", {
    className: actionClassNames
  }, /* @__PURE__ */ import_react147.default.createElement("div", {
    className: styles53.Content
  }, prefixMarkup, contentMarkup, badgeMarkup, suffixMarkup)))));
}

// node_modules/@shopify/polaris/build/esm/components/Autocomplete/Autocomplete.js
var Autocomplete = function Autocomplete2({
  options,
  selected,
  textField,
  preferredPosition,
  listTitle,
  allowMultiple,
  loading,
  actionBefore,
  willLoadMoreResults,
  emptyState,
  onSelect,
  onLoadMoreResults
}) {
  const i18n = useI18n();
  const buildMappedOptionFromOption = (0, import_react148.useCallback)((options2) => {
    return options2.map((option) => /* @__PURE__ */ import_react148.default.createElement(MappedOption, Object.assign({
      key: option.id || option.value
    }, option, {
      selected: selected.includes(option.value),
      singleSelection: !allowMultiple
    })));
  }, [selected, allowMultiple]);
  const optionsMarkup = (0, import_react148.useMemo)(() => {
    const conditionalOptions = loading && !willLoadMoreResults ? [] : options;
    if (isSection(conditionalOptions)) {
      const noOptionsAvailable = conditionalOptions.every(({
        options: options2
      }) => options2.length === 0);
      if (noOptionsAvailable) {
        return null;
      }
      const optionsMarkup2 = conditionalOptions.map(({
        options: options2,
        title
      }) => {
        if (options2.length === 0) {
          return null;
        }
        const optionMarkup = buildMappedOptionFromOption(options2);
        return /* @__PURE__ */ import_react148.default.createElement(Listbox.Section, {
          divider: false,
          title: /* @__PURE__ */ import_react148.default.createElement(Listbox.Header, null, title),
          key: title
        }, optionMarkup);
      });
      return /* @__PURE__ */ import_react148.default.createElement("div", {
        className: styles42.SectionWrapper
      }, optionsMarkup2);
    }
    const optionList = conditionalOptions.length > 0 ? buildMappedOptionFromOption(conditionalOptions) : null;
    if (listTitle) {
      return /* @__PURE__ */ import_react148.default.createElement(Listbox.Section, {
        divider: false,
        title: /* @__PURE__ */ import_react148.default.createElement(Listbox.Header, null, listTitle)
      }, optionList);
    }
    return optionList;
  }, [listTitle, loading, options, willLoadMoreResults, buildMappedOptionFromOption]);
  const loadingMarkup = loading ? /* @__PURE__ */ import_react148.default.createElement(Listbox.Loading, {
    accessibilityLabel: i18n.translate("Polaris.Autocomplete.spinnerAccessibilityLabel")
  }) : null;
  const updateSelection = (0, import_react148.useCallback)((newSelection) => {
    if (actionBefore && newSelection === actionBefore.content) {
      actionBefore.onAction && actionBefore.onAction();
      return;
    }
    if (allowMultiple) {
      if (selected.includes(newSelection)) {
        onSelect(selected.filter((option) => option !== newSelection));
      } else {
        onSelect([...selected, newSelection]);
      }
    } else {
      onSelect([newSelection]);
    }
  }, [allowMultiple, onSelect, selected, actionBefore]);
  const actionMarkup = actionBefore && /* @__PURE__ */ import_react148.default.createElement(MappedAction, actionBefore);
  const emptyStateMarkup = emptyState && options.length < 1 && !loading && /* @__PURE__ */ import_react148.default.createElement("div", {
    role: "status"
  }, emptyState);
  const autoSelection = actionBefore ? AutoSelection.First : void 0;
  return /* @__PURE__ */ import_react148.default.createElement(Combobox, {
    activator: textField,
    allowMultiple,
    onScrolledToBottom: onLoadMoreResults,
    preferredPosition,
    willLoadMoreOptions: willLoadMoreResults
  }, actionMarkup || optionsMarkup || loadingMarkup || emptyStateMarkup ? /* @__PURE__ */ import_react148.default.createElement(Listbox, {
    autoSelection,
    onSelect: updateSelection
  }, actionMarkup, optionsMarkup && (!loading || willLoadMoreResults) ? optionsMarkup : null, loadingMarkup, emptyStateMarkup) : null);
};
Autocomplete.TextField = Combobox.TextField;

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.js
var import_react149 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.scss.js
var styles54 = {
  "Bleed": "Polaris-Bleed"
};

// node_modules/@shopify/polaris/build/esm/components/Bleed/Bleed.js
var Bleed = ({
  marginInline,
  marginBlock,
  marginBlockStart,
  marginBlockEnd,
  marginInlineStart,
  marginInlineEnd,
  children
}) => {
  const getNegativeMargins = (direction) => {
    const xAxis = ["marginInlineStart", "marginInlineEnd"];
    const yAxis = ["marginBlockStart", "marginBlockEnd"];
    const directionValues = {
      marginBlockStart,
      marginBlockEnd,
      marginInlineStart,
      marginInlineEnd,
      marginInline,
      marginBlock
    };
    if (directionValues[direction]) {
      return directionValues[direction];
    } else if (xAxis.includes(direction) && marginInline) {
      return directionValues.marginInline;
    } else if (yAxis.includes(direction) && marginBlock) {
      return directionValues.marginBlock;
    }
  };
  const negativeMarginBlockStart = getNegativeMargins("marginBlockStart");
  const negativeMarginBlockEnd = getNegativeMargins("marginBlockEnd");
  const negativeMarginInlineStart = getNegativeMargins("marginInlineStart");
  const negativeMarginInlineEnd = getNegativeMargins("marginInlineEnd");
  const style = {
    ...getResponsiveProps("bleed", "margin-block-start", "space", negativeMarginBlockStart),
    ...getResponsiveProps("bleed", "margin-block-end", "space", negativeMarginBlockEnd),
    ...getResponsiveProps("bleed", "margin-inline-start", "space", negativeMarginInlineStart),
    ...getResponsiveProps("bleed", "margin-inline-end", "space", negativeMarginInlineEnd)
  };
  return /* @__PURE__ */ import_react149.default.createElement("div", {
    className: styles54.Bleed,
    style: sanitizeCustomProperties(style)
  }, children);
};

// node_modules/@shopify/polaris/build/esm/components/LegacyCard/LegacyCard.js
var import_react153 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/LegacyCard/LegacyCard.scss.js
var styles55 = {
  "LegacyCard": "Polaris-LegacyCard",
  "Section": "Polaris-LegacyCard__Section",
  "subdued": "Polaris-LegacyCard--subdued",
  "Section-hideOnPrint": "Polaris-LegacyCard__Section--hideOnPrint",
  "hideOnPrint": "Polaris-LegacyCard--hideOnPrint",
  "Header": "Polaris-LegacyCard__Header",
  "Section-fullWidth": "Polaris-LegacyCard__Section--fullWidth",
  "Section-flush": "Polaris-LegacyCard__Section--flush",
  "Section-subdued": "Polaris-LegacyCard__Section--subdued",
  "SectionHeader": "Polaris-LegacyCard__SectionHeader",
  "Subsection": "Polaris-LegacyCard__Subsection",
  "Footer": "Polaris-LegacyCard__Footer",
  "LeftJustified": "Polaris-LegacyCard__LeftJustified",
  "FirstSectionPadding": "Polaris-LegacyCard__FirstSectionPadding",
  "LastSectionPadding": "Polaris-LegacyCard__LastSectionPadding"
};

// node_modules/@shopify/polaris/build/esm/components/LegacyCard/components/Header/Header.js
var import_react150 = __toESM(require_react());
function Header3({
  children,
  title,
  actions
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const actionMarkup = actions ? /* @__PURE__ */ import_react150.default.createElement(ButtonGroup, null, buttonsFrom(actions, {
    plain: true
  })) : null;
  const titleMarkup = /* @__PURE__ */ (0, import_react150.isValidElement)(title) ? title : /* @__PURE__ */ import_react150.default.createElement(Text, {
    variant: polarisSummerEditions2023 ? "headingSm" : "headingMd",
    as: "h2"
  }, title);
  const headingMarkup = (
    // eslint-disable-next-line no-nested-ternary
    actionMarkup || children ? polarisSummerEditions2023 ? /* @__PURE__ */ import_react150.default.createElement(HorizontalStack, {
      wrap: false,
      gap: "2",
      align: "space-between",
      blockAlign: "center"
    }, titleMarkup, /* @__PURE__ */ import_react150.default.createElement(HorizontalStack, {
      wrap: false,
      gap: "4",
      blockAlign: "center"
    }, actionMarkup, children)) : /* @__PURE__ */ import_react150.default.createElement(LegacyStack, {
      alignment: "baseline"
    }, /* @__PURE__ */ import_react150.default.createElement(LegacyStack.Item, {
      fill: true
    }, titleMarkup), actionMarkup, children) : titleMarkup
  );
  return /* @__PURE__ */ import_react150.default.createElement("div", {
    className: styles55.Header
  }, headingMarkup);
}

// node_modules/@shopify/polaris/build/esm/components/LegacyCard/components/Section/Section.js
var import_react151 = __toESM(require_react());
function Section5({
  children,
  title,
  subdued,
  flush,
  fullWidth,
  actions,
  hideOnPrint
}) {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const className = classNames(styles55.Section, flush && styles55["Section-flush"], subdued && styles55["Section-subdued"], fullWidth && styles55["Section-fullWidth"], hideOnPrint && styles55["Section-hideOnPrint"]);
  const actionMarkup = actions ? /* @__PURE__ */ import_react151.default.createElement(ButtonGroup, null, buttonsFrom(actions, {
    plain: true
  })) : null;
  const titleMarkup = typeof title === "string" ? /* @__PURE__ */ import_react151.default.createElement(Text, {
    variant: "headingSm",
    as: "h3",
    fontWeight: polarisSummerEditions2023 ? "medium" : "semibold"
  }, title) : title;
  const titleAreaMarkup = titleMarkup || actionMarkup ? /* @__PURE__ */ import_react151.default.createElement("div", {
    className: styles55.SectionHeader
  }, actionMarkup ? /* @__PURE__ */ import_react151.default.createElement(LegacyStack, {
    alignment: "baseline"
  }, /* @__PURE__ */ import_react151.default.createElement(LegacyStack.Item, {
    fill: true
  }, titleMarkup), actionMarkup) : titleMarkup) : null;
  return /* @__PURE__ */ import_react151.default.createElement("div", {
    className
  }, titleAreaMarkup, children);
}

// node_modules/@shopify/polaris/build/esm/components/LegacyCard/components/Subsection/Subsection.js
var import_react152 = __toESM(require_react());
function Subsection({
  children
}) {
  return /* @__PURE__ */ import_react152.default.createElement("div", {
    className: styles55.Subsection
  }, children);
}

// node_modules/@shopify/polaris/build/esm/components/LegacyCard/LegacyCard.js
var LegacyCard = function LegacyCard2({
  children,
  hideOnPrint,
  title,
  subdued,
  sectioned,
  actions,
  primaryFooterAction,
  secondaryFooterActions,
  secondaryFooterActionsDisclosureText,
  footerActionAlignment = "right"
}) {
  const i18n = useI18n();
  const {
    value: secondaryActionsPopoverOpen,
    toggle: toggleSecondaryActionsPopoverOpen
  } = useToggle(false);
  const legacyCard = useLegacyCardPaddingObserverRef();
  const className = classNames(styles55.LegacyCard, subdued && styles55.subdued, hideOnPrint && styles55.hideOnPrint);
  const headerMarkup = title || actions ? /* @__PURE__ */ import_react153.default.createElement(Header3, {
    actions,
    title
  }) : null;
  const content = sectioned ? /* @__PURE__ */ import_react153.default.createElement(Section5, null, children) : children;
  const primaryFooterActionMarkup = primaryFooterAction ? buttonFrom(primaryFooterAction, {
    primary: true
  }) : null;
  let secondaryFooterActionsMarkup = null;
  if (secondaryFooterActions && secondaryFooterActions.length) {
    if (secondaryFooterActions.length === 1) {
      secondaryFooterActionsMarkup = buttonFrom(secondaryFooterActions[0]);
    } else {
      secondaryFooterActionsMarkup = /* @__PURE__ */ import_react153.default.createElement(import_react153.default.Fragment, null, /* @__PURE__ */ import_react153.default.createElement(Popover2, {
        active: secondaryActionsPopoverOpen,
        activator: /* @__PURE__ */ import_react153.default.createElement(Button, {
          disclosure: true,
          onClick: toggleSecondaryActionsPopoverOpen
        }, secondaryFooterActionsDisclosureText || i18n.translate("Polaris.Common.more")),
        onClose: toggleSecondaryActionsPopoverOpen
      }, /* @__PURE__ */ import_react153.default.createElement(ActionList, {
        items: secondaryFooterActions
      })));
    }
  }
  const footerMarkup = primaryFooterActionMarkup || secondaryFooterActionsMarkup ? /* @__PURE__ */ import_react153.default.createElement("div", {
    className: classNames(styles55.Footer, footerActionAlignment === "left" && styles55.LeftJustified)
  }, footerActionAlignment === "right" ? /* @__PURE__ */ import_react153.default.createElement(ButtonGroup, null, secondaryFooterActionsMarkup, primaryFooterActionMarkup) : /* @__PURE__ */ import_react153.default.createElement(ButtonGroup, null, primaryFooterActionMarkup, secondaryFooterActionsMarkup)) : null;
  return /* @__PURE__ */ import_react153.default.createElement(WithinContentContext.Provider, {
    value: true
  }, /* @__PURE__ */ import_react153.default.createElement("div", {
    className,
    ref: legacyCard
  }, headerMarkup, content, footerMarkup));
};
LegacyCard.Header = Header3;
LegacyCard.Section = Section5;
LegacyCard.Subsection = Subsection;
function useLegacyCardPaddingObserverRef() {
  const {
    polarisSummerEditions2023
  } = useFeatures();
  const legacyCard = (0, import_react153.useRef)(null);
  (0, import_react153.useEffect)(() => {
    if (!polarisSummerEditions2023) {
      return;
    }
    const legacyCardNode = legacyCard.current;
    let firstSection;
    let lastSection;
    if (legacyCardNode) {
      const updateFirstAndLastSectionPadding = () => {
        updatePadding(firstSection, "top", false);
        updatePadding(lastSection, "bottom", false);
        const currentElements = legacyCardNode.querySelectorAll(`.${styles55.Section}, .${styles55.Header}, .${styles55.Footer}`);
        if (!currentElements?.length)
          return;
        const firstElement = currentElements[0];
        const lastElement = getMostSeniorLastElement(currentElements);
        if (legacyCardNode.firstChild?.contains(firstElement)) {
          firstSection = firstElement;
          updatePadding(firstSection, "top", true);
        }
        if (legacyCardNode.lastChild?.contains(lastElement)) {
          lastSection = lastElement;
          updatePadding(lastSection, "bottom", true);
        }
      };
      updateFirstAndLastSectionPadding();
      const observer = new MutationObserver(updateFirstAndLastSectionPadding);
      observer.observe(legacyCardNode, {
        childList: true,
        subtree: true
      });
      return () => {
        updatePadding(firstSection, "top", false);
        updatePadding(lastSection, "bottom", false);
        observer.disconnect();
      };
    }
  }, [polarisSummerEditions2023]);
  return legacyCard;
}
function updatePadding(element, area, add) {
  if (!element || element.className.includes(styles55["Section-flush"]))
    return;
  switch (area) {
    case "top":
      element.classList.toggle(styles55.FirstSectionPadding, add);
      return;
    case "bottom":
      element.classList.toggle(styles55.LastSectionPadding, add);
  }
}
function getMostSeniorLastElement(elements) {
  let lastElement = elements[0];
  elements.forEach((element) => {
    if (!lastElement.contains(element)) {
      lastElement = element;
    }
  });
  return lastElement;
}

// node_modules/@shopify/polaris/build/esm/components/ChoiceList/ChoiceList.js
var import_react155 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/ChoiceList/ChoiceList.scss.js
var styles56 = {
  "ChoiceChildren": "Polaris-ChoiceList__ChoiceChildren"
};

// node_modules/@shopify/polaris/build/esm/components/RadioButton/RadioButton.js
var import_react154 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/RadioButton/RadioButton.scss.js
var styles57 = {
  "RadioButton": "Polaris-RadioButton",
  "Input": "Polaris-RadioButton__Input",
  "Backdrop": "Polaris-RadioButton__Backdrop",
  "ChoiceLabel": "Polaris-RadioButton__ChoiceLabel"
};

// node_modules/@shopify/polaris/build/esm/components/RadioButton/RadioButton.js
function RadioButton({
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id: idProp,
  name: nameProp,
  value,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd
}) {
  const uniqId = (0, import_react154.useId)();
  const id = idProp ?? uniqId;
  const name = nameProp || id;
  const inputNode = (0, import_react154.useRef)(null);
  const handleBlur = () => {
    onBlur && onBlur();
  };
  function handleChange({
    currentTarget
  }) {
    onChange && onChange(currentTarget.checked, id);
  }
  const describedBy = [];
  if (helpText) {
    describedBy.push(helpTextID2(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(" ") : void 0;
  const inputClassName = classNames(styles57.Input);
  const extraChoiceProps = {
    helpText,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd
  };
  return /* @__PURE__ */ import_react154.default.createElement(Choice, Object.assign({
    label,
    labelHidden,
    disabled,
    id,
    labelClassName: styles57.ChoiceLabel,
    fill
  }, extraChoiceProps), /* @__PURE__ */ import_react154.default.createElement("span", {
    className: styles57.RadioButton
  }, /* @__PURE__ */ import_react154.default.createElement("input", {
    id,
    name,
    value,
    type: "radio",
    checked,
    disabled,
    className: inputClassName,
    onChange: handleChange,
    onFocus,
    onBlur: handleBlur,
    "aria-describedby": ariaDescribedBy,
    ref: inputNode
  }), /* @__PURE__ */ import_react154.default.createElement("span", {
    className: styles57.Backdrop
  })));
}

// node_modules/@shopify/polaris/build/esm/components/ChoiceList/ChoiceList.js
function ChoiceList({
  title,
  titleHidden,
  allowMultiple,
  choices,
  selected,
  onChange = noop6,
  error,
  disabled = false,
  name: nameProp
}) {
  const ControlComponent = allowMultiple ? Checkbox : RadioButton;
  const uniqName = (0, import_react155.useId)();
  const name = nameProp ?? uniqName;
  const finalName = allowMultiple ? `${name}[]` : name;
  const titleMarkup = title ? /* @__PURE__ */ import_react155.default.createElement(Box, {
    as: "legend",
    paddingBlockEnd: {
      xs: "5",
      md: "1"
    },
    visuallyHidden: titleHidden
  }, title) : null;
  const choicesMarkup = choices.map((choice) => {
    const {
      value,
      id,
      label,
      helpText,
      disabled: choiceDisabled,
      describedByError
    } = choice;
    function handleChange(checked) {
      onChange(updateSelectedChoices(choice, checked, selected, allowMultiple), name);
    }
    const isSelected = choiceIsSelected(choice, selected);
    const renderedChildren = choice.renderChildren ? choice.renderChildren(isSelected) : null;
    const children = renderedChildren ? /* @__PURE__ */ import_react155.default.createElement("div", {
      className: styles56.ChoiceChildren
    }, /* @__PURE__ */ import_react155.default.createElement(Box, {
      paddingBlockStart: {
        xs: "4",
        md: "0"
      }
    }, renderedChildren)) : null;
    return /* @__PURE__ */ import_react155.default.createElement("li", {
      key: value
    }, /* @__PURE__ */ import_react155.default.createElement(Bleed, {
      marginBlockEnd: helpText ? {
        xs: "1",
        md: "0"
      } : {
        xs: "0"
      }
    }, /* @__PURE__ */ import_react155.default.createElement(ControlComponent, {
      name: finalName,
      value,
      id,
      label,
      disabled: choiceDisabled || disabled,
      fill: {
        xs: true,
        sm: false
      },
      checked: choiceIsSelected(choice, selected),
      helpText,
      onChange: handleChange,
      ariaDescribedBy: error && describedByError ? errorTextID(finalName) : null
    }), children));
  });
  const errorMarkup = error && /* @__PURE__ */ import_react155.default.createElement(Box, {
    paddingBlockStart: {
      xs: "0",
      md: "1"
    },
    paddingBlockEnd: "2"
  }, /* @__PURE__ */ import_react155.default.createElement(InlineError, {
    message: error,
    fieldID: finalName
  }));
  return /* @__PURE__ */ import_react155.default.createElement(VerticalStack, {
    as: "fieldset",
    gap: {
      xs: "4",
      md: "0"
    },
    "aria-invalid": error != null,
    id: finalName
  }, titleMarkup, /* @__PURE__ */ import_react155.default.createElement(VerticalStack, {
    as: "ul",
    gap: {
      xs: "4",
      md: "0"
    }
  }, choicesMarkup), errorMarkup);
}
function noop6() {
}
function choiceIsSelected({
  value
}, selected) {
  return selected.includes(value);
}
function updateSelectedChoices({
  value
}, checked, selected, allowMultiple = false) {
  if (checked) {
    return allowMultiple ? [...selected, value] : [value];
  }
  return selected.filter((selectedChoice) => selectedChoice !== value);
}

// node_modules/@shopify/polaris/build/esm/components/DatePicker/DatePicker.js
var import_react159 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/utilities/dates.js
var WEEK_LENGTH = 7;
function getWeeksForMonth(month, year, weekStartsOn = 0) {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const weeks = [[]];
  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;
  const orderedWeekday = getOrderedWeekdays(weekStartsOn);
  for (let i = 0; i < orderedWeekday.indexOf(firstDayOfWeek); i++) {
    currentWeek.push(null);
  }
  while (currentDate.getMonth() === month) {
    if (currentWeek.length === WEEK_LENGTH) {
      currentWeek = [];
      weeks.push(currentWeek);
    }
    currentWeek.push(currentDate);
    currentDate = new Date(year, month, currentDate.getDate() + 1);
  }
  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }
  return weeks;
}
function dateIsInRange(day, range) {
  if (day == null) {
    return false;
  }
  const {
    start,
    end
  } = range;
  return Boolean(start && day > start && end && day < end);
}
function dateIsSelected(day, range) {
  if (day == null) {
    return false;
  }
  const {
    start,
    end
  } = range;
  return Boolean(start && isSameDay(start, day) || end && isSameDay(end, day));
}
function isSameDay(day1, day2) {
  return day1.getDate() === day2.getDate() && day1.getMonth() === day2.getMonth() && day1.getFullYear() === day2.getFullYear();
}
function getNewRange(range, selected) {
  if (range == null) {
    return {
      start: selected,
      end: selected
    };
  }
  const {
    start,
    end
  } = range;
  if (end && (isDateAfter(start, end) || isDateBefore(start, end))) {
    return {
      start: selected,
      end: selected
    };
  }
  if (start) {
    if (isDateBefore(selected, start)) {
      return {
        start: selected,
        end: selected
      };
    }
    return {
      start,
      end: selected
    };
  }
  if (end) {
    if (isDateBefore(selected, end)) {
      return {
        start: selected,
        end
      };
    }
    return {
      start: start || end,
      end: selected
    };
  }
  return {
    start: selected,
    end: selected
  };
}
function getNextDisplayMonth(month) {
  if (month === 11) {
    return 0;
  }
  return month + 1;
}
function getNextDisplayYear(month, year) {
  if (month === 11) {
    return year + 1;
  }
  return year;
}
function getPreviousDisplayMonth(month) {
  if (month === 0) {
    return 11;
  }
  return month - 1;
}
function getPreviousDisplayYear(month, year) {
  if (month === 0) {
    return year - 1;
  }
  return year;
}
function isDateAfter(date, dateToCompare) {
  return date.getTime() > dateToCompare.getTime();
}
function isDateBefore(date, dateToCompare) {
  return date.getTime() < dateToCompare.getTime();
}
function isDateDisabled(date, datesToCompare) {
  return datesToCompare.some((dateToCompare) => {
    return date.getTime() === dateToCompare.getTime();
  });
}
var WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];
function getOrderedWeekdays(weekStartsOn) {
  const weekDays = [...WEEKDAYS];
  const restOfDays = weekDays.splice(weekStartsOn);
  return [...restOfDays, ...weekDays];
}

// node_modules/@shopify/polaris/build/esm/components/DatePicker/utilities.js
function monthName(month) {
  switch (month) {
    case 0:
      return "january";
    case 1:
      return "february";
    case 2:
      return "march";
    case 3:
      return "april";
    case 4:
      return "may";
    case 5:
      return "june";
    case 6:
      return "july";
    case 7:
      return "august";
    case 8:
      return "september";
    case 9:
      return "october";
    case 10:
      return "november";
    case 11:
      return "december";
  }
}
function weekdayName(weekday) {
  switch (weekday) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
  }
}

// node_modules/@shopify/polaris/build/esm/components/DatePicker/DatePicker.scss.js
var styles58 = {
  "DatePicker": "Polaris-DatePicker",
  "MonthLayout": "Polaris-DatePicker__MonthLayout",
  "MonthContainer": "Polaris-DatePicker__MonthContainer",
  "Month": "Polaris-DatePicker__Month",
  "Month-current": "Polaris-DatePicker__Month--current",
  "DayCell": "Polaris-DatePicker__DayCell",
  "DayCell-inRange": "Polaris-DatePicker__DayCell--inRange",
  "Day": "Polaris-DatePicker__Day",
  "Day-today": "Polaris-DatePicker__Day--today",
  "Day-inRange": "Polaris-DatePicker__Day--inRange",
  "Day-selected": "Polaris-DatePicker__Day--selected",
  "Day-disabled": "Polaris-DatePicker__Day--disabled",
  "EmptyDayCell": "Polaris-DatePicker__EmptyDayCell",
  "Weekday": "Polaris-DatePicker__Weekday",
  "Weekday-current": "Polaris-DatePicker__Weekday--current",
  "Header": "Polaris-DatePicker__Header",
  "Title": "Polaris-DatePicker__Title",
  "Day-firstInRange": "Polaris-DatePicker__Day--firstInRange",
  "Day-hasRange": "Polaris-DatePicker__Day--hasRange",
  "Day-hoverRight": "Polaris-DatePicker__Day--hoverRight",
  "Day-lastInRange": "Polaris-DatePicker__Day--lastInRange",
  "Week": "Polaris-DatePicker__Week"
};

// node_modules/@shopify/polaris/build/esm/components/DatePicker/components/Month/Month.js
var import_react158 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/DatePicker/components/Weekday/Weekday.js
var import_react156 = __toESM(require_react());
var Weekday = /* @__PURE__ */ (0, import_react156.memo)(function Weekday2({
  label,
  title,
  current
}) {
  const className = classNames(styles58.Weekday, current && styles58["Weekday-current"]);
  return /* @__PURE__ */ import_react156.default.createElement("th", {
    "aria-label": label,
    scope: "col",
    className
  }, title);
});

// node_modules/@shopify/polaris/build/esm/components/DatePicker/components/Day/Day.js
var import_react157 = __toESM(require_react());
var Day = /* @__PURE__ */ (0, import_react157.memo)(function Day2({
  day,
  focused,
  onClick,
  onHover = noop7,
  onFocus = noop7,
  selected,
  inRange,
  inHoveringRange,
  disabled,
  lastDayOfMonth,
  isLastSelectedDay,
  isFirstSelectedDay,
  isHoveringRight,
  rangeIsDifferent,
  weekday,
  selectedAccessibilityLabelPrefix
}) {
  const i18n = useI18n();
  const dayNode = (0, import_react157.useRef)(null);
  const hoverValue = lastDayOfMonth || day;
  (0, import_react157.useEffect)(() => {
    if (focused && dayNode.current) {
      dayNode.current.focus();
    }
  }, [focused]);
  if (!day) {
    return /* @__PURE__ */ import_react157.default.createElement("td", {
      className: styles58.EmptyDayCell,
      onMouseOver: () => onHover(hoverValue)
    });
  }
  const handleClick = onClick && !disabled ? onClick.bind(null, day) : noop7;
  const today = isSameDay(/* @__PURE__ */ new Date(), day);
  const dayCellClassName = classNames(styles58.DayCell, selected && styles58["DayCell-selected"], (inRange || inHoveringRange) && !disabled && styles58["DayCell-inRange"], isLastSelectedDay && styles58["DayCell-lastInRange"], isFirstSelectedDay && styles58["DayCell-firstInRange"], isHoveringRight && styles58["DayCell-hoverRight"], rangeIsDifferent && styles58["DayCell-hasRange"]);
  const dayClassName = classNames(styles58.Day, selected && styles58["Day-selected"], disabled && styles58["Day-disabled"], today && styles58["Day-today"], (inRange || inHoveringRange) && !disabled && styles58["Day-inRange"], isLastSelectedDay && styles58["Day-lastInRange"], isFirstSelectedDay && styles58["Day-firstInRange"], isHoveringRight && styles58["Day-hoverRight"], rangeIsDifferent && styles58["Day-hasRange"]);
  const date = day.getDate();
  const tabIndex = (focused || selected || today || date === 1) && !disabled ? 0 : -1;
  const ariaLabel = [selected && selectedAccessibilityLabelPrefix ? `${selectedAccessibilityLabelPrefix} ` : "", `${today ? i18n.translate("Polaris.DatePicker.today") : ""}`, `${weekday ? weekday : ""} `, `${i18n.translate(`Polaris.DatePicker.months.${monthName(day.getMonth())}`)} `, `${date} `, `${day.getFullYear()}`].join("");
  return /* @__PURE__ */ import_react157.default.createElement("td", {
    className: dayCellClassName
  }, /* @__PURE__ */ import_react157.default.createElement("button", {
    onFocus: () => onFocus(day),
    type: "button",
    ref: dayNode,
    tabIndex,
    className: dayClassName,
    onMouseOver: () => onHover(hoverValue),
    onClick: handleClick,
    "aria-label": ariaLabel,
    "aria-disabled": disabled,
    "aria-pressed": selected
  }, date));
});
function noop7() {
}

// node_modules/@shopify/polaris/build/esm/components/DatePicker/components/Month/Month.js
function Month({
  focusedDate,
  selected,
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  allowRange,
  onChange = noop8,
  onHover = noop8,
  onFocus = noop8,
  month,
  year,
  weekStartsOn,
  accessibilityLabelPrefixes
}) {
  const i18n = useI18n();
  const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
  const now = /* @__PURE__ */ new Date();
  const current = now.getMonth() === month && now.getFullYear() === year;
  const className = classNames(styles58.Title, current && styles58["Month-current"]);
  const weeks = (0, import_react158.useMemo)(() => getWeeksForMonth(month, year, weekStartsOn), [month, weekStartsOn, year]);
  const weekdays = getOrderedWeekdays(weekStartsOn).map((weekday) => /* @__PURE__ */ import_react158.default.createElement(Weekday, {
    key: weekday,
    title: i18n.translate(`Polaris.DatePicker.daysAbbreviated.${weekdayName(weekday)}`),
    label: weekdayLabel(weekday),
    current: current && (/* @__PURE__ */ new Date()).getDay() === weekday
  }));
  const handleDateClick = (0, import_react158.useCallback)((selectedDate) => {
    onChange(getNewRange(allowRange ? selected : void 0, selectedDate));
  }, [allowRange, onChange, selected]);
  const lastDayOfMonth = (0, import_react158.useMemo)(() => new Date(year, month + 1, 0), [month, year]);
  function renderWeek(day, dayIndex) {
    if (day == null) {
      return /* @__PURE__ */ import_react158.default.createElement(Day, {
        key: dayIndex,
        onHover,
        lastDayOfMonth
      });
    }
    const disabled = disableDatesBefore && isDateBefore(day, disableDatesBefore) || disableDatesAfter && isDateAfter(day, disableDatesAfter) || disableSpecificDates && isDateDisabled(day, disableSpecificDates);
    const isFirstSelectedDay = allowRange && selected && isDateStart(day, selected);
    const isLastSelectedDay = allowRange && selected && (!isSameDay(selected.start, selected.end) && isDateEnd(day, selected) || hoverDate && isSameDay(selected.start, selected.end) && isDateAfter(hoverDate, selected.start) && isSameDay(day, hoverDate) && !isFirstSelectedDay);
    const rangeIsDifferent = !(selected && isSameDay(selected.start, selected.end));
    const isHoveringRight = hoverDate && isDateBefore(day, hoverDate);
    const [firstAccessibilityLabelPrefix, lastAccessibilityLabelPrefix] = accessibilityLabelPrefixes;
    let accessibilityLabelPrefix;
    if (allowRange && isFirstSelectedDay || !allowRange && firstAccessibilityLabelPrefix) {
      accessibilityLabelPrefix = firstAccessibilityLabelPrefix;
    } else if (allowRange && isLastSelectedDay) {
      accessibilityLabelPrefix = lastAccessibilityLabelPrefix;
    }
    return /* @__PURE__ */ import_react158.default.createElement(Day, {
      selectedAccessibilityLabelPrefix: accessibilityLabelPrefix,
      weekday: weekdayLabel(dayIndex),
      focused: focusedDate != null && isSameDay(day, focusedDate),
      day,
      key: dayIndex,
      onFocus,
      onClick: handleDateClick,
      onHover,
      selected: selected != null && dateIsSelected(day, selected),
      inRange: selected != null && dateIsInRange(day, selected),
      disabled,
      inHoveringRange: selected != null && hoverDate != null && isInHoveringRange(day, selected, hoverDate),
      isLastSelectedDay,
      isFirstSelectedDay,
      isHoveringRight,
      rangeIsDifferent
    });
  }
  const weeksMarkup = weeks.map((week, index) => /* @__PURE__ */ import_react158.default.createElement("tr", {
    className: styles58.Week,
    key: index
  }, week.map(renderWeek)));
  return /* @__PURE__ */ import_react158.default.createElement("div", {
    className: styles58.MonthContainer
  }, /* @__PURE__ */ import_react158.default.createElement("table", {
    role: "grid",
    className: styles58.Month
  }, /* @__PURE__ */ import_react158.default.createElement("caption", {
    className
  }, i18n.translate(`Polaris.DatePicker.months.${monthName(month)}`), " ", year), /* @__PURE__ */ import_react158.default.createElement("thead", null, /* @__PURE__ */ import_react158.default.createElement("tr", {
    className: styles58.WeekHeadings
  }, weekdays)), /* @__PURE__ */ import_react158.default.createElement("tbody", null, weeksMarkup)));
  function weekdayLabel(weekday) {
    return i18n.translate(`Polaris.DatePicker.days.${weekdayName(weekday)}`);
  }
}
function noop8() {
}
function hoveringDateIsInRange(day, range, hoverEndDate) {
  if (day == null) {
    return false;
  }
  const {
    start,
    end
  } = range;
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}
function isDateEnd(day, range) {
  if (day == null)
    return false;
  const {
    end
  } = range;
  return Boolean(end && isSameDay(end, day));
}
function isDateStart(day, range) {
  if (day == null)
    return false;
  const {
    start
  } = range;
  return Boolean(start && isSameDay(start, day));
}

// node_modules/@shopify/polaris/build/esm/components/DatePicker/DatePicker.js
function DatePicker({
  id,
  selected,
  month,
  year,
  allowRange,
  multiMonth,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  weekStartsOn = 0,
  dayAccessibilityLabelPrefix,
  onMonthChange,
  onChange = noop9
}) {
  const i18n = useI18n();
  const [hoverDate, setHoverDate] = (0, import_react159.useState)(void 0);
  const [focusDate, setFocusDate] = (0, import_react159.useState)(void 0);
  (0, import_react159.useEffect)(() => {
    setFocusDate(void 0);
  }, [selected]);
  const handleFocus = (0, import_react159.useCallback)((date) => {
    setFocusDate(date);
  }, []);
  const setFocusDateAndHandleMonthChange = (0, import_react159.useCallback)((date) => {
    if (onMonthChange) {
      onMonthChange(date.getMonth(), date.getFullYear());
    }
    setHoverDate(date);
    setFocusDate(date);
  }, [onMonthChange]);
  const handleDateSelection = (0, import_react159.useCallback)((range) => {
    const {
      end
    } = range;
    setHoverDate(end);
    setFocusDate(new Date(end));
    onChange(range);
  }, [onChange]);
  const handleMonthChangeClick = (0, import_react159.useCallback)((month2, year2) => {
    if (!onMonthChange) {
      return;
    }
    setFocusDate(void 0);
    onMonthChange(month2, year2);
  }, [onMonthChange]);
  const handleHover = (0, import_react159.useCallback)((date) => {
    setHoverDate(date);
  }, []);
  const handleKeyUp = (0, import_react159.useCallback)((event) => {
    const {
      key
    } = event;
    const range = deriveRange(selected);
    const focusedDate = focusDate || range && range.start;
    if (focusedDate == null) {
      return;
    }
    if (key === "ArrowUp") {
      const previousWeek = new Date(focusedDate);
      previousWeek.setDate(focusedDate.getDate() - 7);
      if (!(disableDatesBefore && isDateBefore(previousWeek, disableDatesBefore) || disableSpecificDates && isDateDisabled(previousWeek, disableSpecificDates))) {
        setFocusDateAndHandleMonthChange(previousWeek);
      }
    }
    if (key === "ArrowDown") {
      const nextWeek = new Date(focusedDate);
      nextWeek.setDate(focusedDate.getDate() + 7);
      if (!(disableDatesAfter && isDateAfter(nextWeek, disableDatesAfter) || disableSpecificDates && isDateDisabled(nextWeek, disableSpecificDates))) {
        setFocusDateAndHandleMonthChange(nextWeek);
      }
    }
    if (key === "ArrowRight") {
      const tomorrow = new Date(focusedDate);
      tomorrow.setDate(focusedDate.getDate() + 1);
      if (!(disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter) || disableSpecificDates && isDateDisabled(tomorrow, disableSpecificDates))) {
        setFocusDateAndHandleMonthChange(tomorrow);
      }
    }
    if (key === "ArrowLeft") {
      const yesterday = new Date(focusedDate);
      yesterday.setDate(focusedDate.getDate() - 1);
      if (!(disableDatesBefore && isDateBefore(yesterday, disableDatesBefore) || disableSpecificDates && isDateDisabled(yesterday, disableSpecificDates))) {
        setFocusDateAndHandleMonthChange(yesterday);
      }
    }
  }, [disableDatesAfter, disableDatesBefore, disableSpecificDates, focusDate, selected, setFocusDateAndHandleMonthChange]);
  const showNextYear = getNextDisplayYear(month, year);
  const showNextMonth = getNextDisplayMonth(month);
  const showNextToNextYear = getNextDisplayYear(showNextMonth, showNextYear);
  const showNextToNextMonth = getNextDisplayMonth(showNextMonth);
  const showPreviousYear = getPreviousDisplayYear(month, year);
  const showPreviousMonth = getPreviousDisplayMonth(month);
  const previousMonthName = i18n.translate(`Polaris.DatePicker.months.${monthName(showPreviousMonth)}`);
  const nextMonth = multiMonth ? i18n.translate(`Polaris.DatePicker.months.${monthName(showNextToNextMonth)}`) : i18n.translate(`Polaris.DatePicker.months.${monthName(showNextMonth)}`);
  const nextYear = multiMonth ? showNextToNextYear : showNextYear;
  const monthIsSelected = (0, import_react159.useMemo)(() => deriveRange(selected), [selected]);
  const firstDatePickerAccessibilityLabelPrefix = allowRange ? i18n.translate(`Polaris.DatePicker.start`) : dayAccessibilityLabelPrefix;
  const secondDatePickerAccessibilityLabelPrefix = i18n.translate(`Polaris.DatePicker.end`);
  const accessibilityLabelPrefixes = [firstDatePickerAccessibilityLabelPrefix, secondDatePickerAccessibilityLabelPrefix];
  const secondDatePicker = multiMonth ? /* @__PURE__ */ import_react159.default.createElement(Month, {
    onFocus: handleFocus,
    focusedDate: focusDate,
    month: showNextMonth,
    year: showNextYear,
    selected: monthIsSelected,
    hoverDate,
    onChange: handleDateSelection,
    onHover: handleHover,
    disableDatesBefore,
    disableDatesAfter,
    disableSpecificDates,
    allowRange,
    weekStartsOn,
    accessibilityLabelPrefixes
  }) : null;
  const datePickerClassName = classNames(styles58.DatePicker);
  const {
    polarisSummerEditions2023
  } = useFeatures();
  return /* @__PURE__ */ import_react159.default.createElement("div", {
    id,
    className: datePickerClassName,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp
  }, /* @__PURE__ */ import_react159.default.createElement("div", {
    className: styles58.Header
  }, /* @__PURE__ */ import_react159.default.createElement(Button, {
    plain: true,
    primary: polarisSummerEditions2023,
    icon: SvgArrowLeftMinor,
    accessibilityLabel: i18n.translate("Polaris.DatePicker.previousMonth", {
      previousMonthName,
      showPreviousYear
    }),
    onClick: () => handleMonthChangeClick(showPreviousMonth, showPreviousYear)
  }), /* @__PURE__ */ import_react159.default.createElement(Button, {
    plain: true,
    primary: polarisSummerEditions2023,
    icon: SvgArrowRightMinor,
    accessibilityLabel: i18n.translate("Polaris.DatePicker.nextMonth", {
      nextMonth,
      nextYear
    }),
    onClick: () => handleMonthChangeClick(showNextMonth, showNextYear)
  })), /* @__PURE__ */ import_react159.default.createElement("div", {
    className: styles58.MonthLayout
  }, /* @__PURE__ */ import_react159.default.createElement(Month, {
    onFocus: handleFocus,
    focusedDate: focusDate,
    month,
    year,
    selected: deriveRange(selected),
    hoverDate,
    onChange: handleDateSelection,
    onHover: handleHover,
    disableDatesBefore,
    disableDatesAfter,
    disableSpecificDates,
    allowRange,
    weekStartsOn,
    accessibilityLabelPrefixes
  }), secondDatePicker));
}
function noop9() {
}
function handleKeyDown(event) {
  const {
    key
  } = event;
  if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight") {
    event.preventDefault();
    event.stopPropagation();
  }
}
function deriveRange(selected) {
  return selected instanceof Date ? {
    start: selected,
    end: selected
  } : selected;
}

// node_modules/@shopify/polaris/build/esm/components/Link/Link.js
var import_react160 = __toESM(require_react());

// node_modules/@shopify/polaris/build/esm/components/Link/Link.scss.js
var styles59 = {
  "Link": "Polaris-Link",
  "monochrome": "Polaris-Link--monochrome",
  "removeUnderline": "Polaris-Link--removeUnderline"
};

// node_modules/@shopify/polaris/build/esm/components/Link/Link.js
function Link({
  url,
  children,
  onClick,
  external,
  target,
  id,
  monochrome,
  removeUnderline,
  accessibilityLabel,
  dataPrimaryLink
}) {
  return /* @__PURE__ */ import_react160.default.createElement(BannerContext.Consumer, null, (BannerContext2) => {
    const shouldBeMonochrome = monochrome || BannerContext2;
    const className = classNames(styles59.Link, shouldBeMonochrome && styles59.monochrome, removeUnderline && styles59.removeUnderline);
    return url ? /* @__PURE__ */ import_react160.default.createElement(UnstyledLink, {
      onClick,
      className,
      url,
      external,
      target,
      id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children) : /* @__PURE__ */ import_react160.default.createElement("button", {
      type: "button",
      onClick,
      className,
      id,
      "aria-label": accessibilityLabel,
      "data-primary-link": dataPrimaryLink
    }, children);
  });
}

export {
  AppProvider,
  SvgCalendarMajor,
  SvgClockMinor,
  Text,
  Box,
  Popover2 as Popover,
  Icon,
  Badge,
  HorizontalStack,
  Button,
  Card,
  VerticalStack,
  InlineError,
  Checkbox,
  TextField,
  Autocomplete,
  Banner,
  LegacyStack,
  LegacyCard,
  ChoiceList,
  DatePicker,
  Divider,
  FormLayout,
  Layout,
  Link,
  List,
  Page,
  PageActions
};
//# sourceMappingURL=/build/_shared/chunk-XAY7D6NX.js.map
