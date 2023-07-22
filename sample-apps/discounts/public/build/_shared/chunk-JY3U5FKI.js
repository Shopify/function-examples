import {
  Autocomplete,
  Badge,
  Button,
  Checkbox,
  ChoiceList,
  DatePicker,
  FormLayout,
  Icon,
  InlineError,
  LegacyCard,
  LegacyStack,
  Link,
  List,
  Popover,
  SvgCalendarMajor,
  SvgClockMinor,
  Text,
  TextField,
  VerticalStack
} from "/build/_shared/chunk-XAY7D6NX.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/@shopify/app-bridge-core/actions/merge.js
var require_merge = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/merge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function mergeProps(obj, newObj) {
      if (newObj == null) {
        return newObj;
      }
      if (typeof obj === "undefined" || !Object.prototype.isPrototypeOf.call(Object.getPrototypeOf(obj), newObj) || newObj.constructor.name !== "Object" && newObj.constructor.name !== "Array") {
        return newObj;
      }
      var clone = {};
      Object.keys(newObj).forEach(function(key) {
        var exists = Object.prototype.hasOwnProperty.call(obj, key);
        if (!exists) {
          clone[key] = newObj[key];
        } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          clone[key] = mergeProps(obj[key], newObj[key]);
        } else {
          clone[key] = newObj[key];
        }
      });
      Object.keys(obj).forEach(function(key) {
        var exists = Object.prototype.hasOwnProperty.call(newObj, key);
        if (!exists) {
          clone[key] = obj[key];
        }
      });
      Object.setPrototypeOf(clone, Object.getPrototypeOf(obj));
      return clone;
    }
    exports.default = mergeProps;
  }
});

// node_modules/@shopify/app-bridge-core/actions/constants.js
var require_constants = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SEPARATOR = exports.PREFIX = void 0;
    exports.PREFIX = "APP";
    exports.SEPARATOR = "::";
  }
});

// node_modules/@shopify/app-bridge-core/actions/types.js
var require_types = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ComponentType = exports.Group = void 0;
    var Group;
    (function(Group2) {
      Group2["AuthCode"] = "AuthCode";
      Group2["Button"] = "Button";
      Group2["ButtonGroup"] = "ButtonGroup";
      Group2["Cart"] = "Cart";
      Group2["Client"] = "Client";
      Group2["ContextualSaveBar"] = "ContextualSaveBar";
      Group2["Error"] = "Error";
      Group2["Features"] = "Features";
      Group2["FeedbackModal"] = "FeedbackModal";
      Group2["Fullscreen"] = "Fullscreen";
      Group2["LeaveConfirmation"] = "LeaveConfirmation";
      Group2["Link"] = "Link";
      Group2["Loading"] = "Loading";
      Group2["Menu"] = "Menu";
      Group2["Modal"] = "Modal";
      Group2["Navigation"] = "Navigation";
      Group2["Performance"] = "Performance";
      Group2["Pos"] = "Pos";
      Group2["Print"] = "Print";
      Group2["ResourcePicker"] = "Resource_Picker";
      Group2["unstable_Picker"] = "unstable_Picker";
      Group2["Scanner"] = "Scanner";
      Group2["SessionToken"] = "SessionToken";
      Group2["Share"] = "Share";
      Group2["TitleBar"] = "TitleBar";
      Group2["Toast"] = "Toast";
      Group2["MarketingExternalActivityTopBar"] = "MarketingExternalActivityTopBar";
      Group2["WebVitals"] = "WebVitals";
    })(Group = exports.Group || (exports.Group = {}));
    var ComponentType;
    (function(ComponentType2) {
      ComponentType2["Button"] = "Button";
      ComponentType2["ButtonGroup"] = "ButtonGroup";
    })(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
  }
});

// node_modules/@shopify/app-bridge-core/actions/helper.js
var require_helper = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/helper.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateActionFromPayload = exports.isValidOptionalString = exports.isValidOptionalNumber = exports.forEachInEnum = exports.getMergedProps = exports.findMatchInEnum = exports.getEventNameSpace = exports.NonSnakeCaseGroup = exports.actionWrapper = void 0;
    var merge_1 = __importDefault(require_merge());
    var constants_1 = require_constants();
    var types_1 = require_types();
    function actionWrapper(action) {
      return action;
    }
    exports.actionWrapper = actionWrapper;
    exports.NonSnakeCaseGroup = [
      types_1.Group.AuthCode,
      types_1.Group.Button,
      types_1.Group.ButtonGroup,
      types_1.Group.Cart,
      types_1.Group.Error,
      types_1.Group.Features,
      types_1.Group.Fullscreen,
      types_1.Group.Link,
      types_1.Group.Loading,
      types_1.Group.Menu,
      types_1.Group.Modal,
      types_1.Group.Navigation,
      types_1.Group.Pos,
      types_1.Group.Print,
      types_1.Group.ResourcePicker,
      types_1.Group.Scanner,
      types_1.Group.SessionToken,
      types_1.Group.Share,
      types_1.Group.TitleBar,
      types_1.Group.Toast,
      types_1.Group.unstable_Picker
    ];
    function camelCaseToSnakeCase(value) {
      return value.replace(/([A-Z])/g, function(matcher, _val, index) {
        return (index === 0 ? "" : "_") + matcher[0].toLowerCase();
      });
    }
    function groupToEventNameSpace(group) {
      if (exports.NonSnakeCaseGroup.includes(group)) {
        return group.toUpperCase();
      }
      return camelCaseToSnakeCase(group).toUpperCase();
    }
    function getEventNameSpace(group, eventName, component) {
      if (eventName.startsWith("" + constants_1.PREFIX + constants_1.SEPARATOR)) {
        return eventName;
      }
      var eventNameSpace = groupToEventNameSpace(group);
      if (component) {
        var subgroups_1 = component.subgroups, type = component.type;
        if (subgroups_1 && subgroups_1.length > 0) {
          eventNameSpace += eventNameSpace.length > 0 ? constants_1.SEPARATOR : "";
          subgroups_1.forEach(function(subgroup, index) {
            eventNameSpace += "" + subgroup.toUpperCase() + (index < subgroups_1.length - 1 ? constants_1.SEPARATOR : "");
          });
        }
        if (type !== group && type) {
          eventNameSpace += "" + (eventNameSpace.length > 0 ? constants_1.SEPARATOR : "") + type.toUpperCase();
        }
      }
      if (eventNameSpace) {
        eventNameSpace += "" + (eventNameSpace.length > 0 ? constants_1.SEPARATOR : "") + eventName.toUpperCase();
      }
      return "" + constants_1.PREFIX + constants_1.SEPARATOR + eventNameSpace;
    }
    exports.getEventNameSpace = getEventNameSpace;
    function findMatchInEnum(types, lookup) {
      var match = Object.keys(types).find(function(key) {
        return lookup === types[key];
      });
      return match ? types[match] : void 0;
    }
    exports.findMatchInEnum = findMatchInEnum;
    function getMergedProps(props, newProps) {
      var merged = merge_1.default(props, newProps);
      if (!merged) {
        var cloned = Object.assign(props, newProps);
        return cloned;
      }
      return merged;
    }
    exports.getMergedProps = getMergedProps;
    function forEachInEnum(types, callback) {
      Object.keys(types).forEach(function(key) {
        callback(types[key]);
      });
    }
    exports.forEachInEnum = forEachInEnum;
    function isValidOptionalNumber(value) {
      return value === null || value === void 0 || typeof value === "number";
    }
    exports.isValidOptionalNumber = isValidOptionalNumber;
    function isValidOptionalString(value) {
      return value === null || value === void 0 || typeof value === "string";
    }
    exports.isValidOptionalString = isValidOptionalString;
    function updateActionFromPayload(action, newProps) {
      var id = action.id;
      if (id === newProps.id) {
        Object.assign(action, getMergedProps(action, newProps));
        return true;
      }
      return false;
    }
    exports.updateActionFromPayload = updateActionFromPayload;
  }
});

// node_modules/@shopify/app-bridge-core/actions/AuthCode/index.js
var require_AuthCode = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/AuthCode/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.respond = exports.Action = void 0;
    var helper_1 = require_helper();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["REQUEST"] = "APP::AUTH_CODE::REQUEST";
      Action3["RESPOND"] = "APP::AUTH_CODE::RESPOND";
    })(Action2 = exports.Action || (exports.Action = {}));
    function respond(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.AuthCode,
        type: Action2.RESPOND
      });
    }
    exports.respond = respond;
  }
});

// node_modules/@shopify/app-bridge/package.json
var require_package = __commonJS({
  "node_modules/@shopify/app-bridge/package.json"(exports, module) {
    module.exports = {
      name: "@shopify/app-bridge",
      version: "3.7.8",
      types: "index.d.ts",
      main: "index.js",
      unpkg: "umd/index.js",
      jsdelivr: "umd/index.js",
      files: [
        "/actions/",
        "/client/",
        "/umd/",
        "/utilities/",
        "/util/",
        "/validate/",
        "/development.d.ts",
        "/development.js",
        "/index.d.ts",
        "/index.js",
        "/MessageTransport.d.ts",
        "/MessageTransport.js",
        "/production.d.ts",
        "/production.js"
      ],
      private: false,
      publishConfig: {
        access: "public",
        "@shopify:registry": "https://registry.npmjs.org"
      },
      repository: "git@github.com:Shopify/app-bridge.git",
      homepage: "https://shopify.dev/tools/app-bridge",
      author: "Shopify Inc.",
      license: "MIT",
      scripts: {
        build: "yarn build:tsc && yarn build:npm && yarn build:umd",
        "build:tsc": "NODE_ENV=production tsc",
        "build:umd": "NODE_ENV=production webpack -p",
        "build:npm": "shx cp -r ./npm/index.js ./index.js",
        check: "tsc",
        clean: "yarn clean:tsc && yarn clean:npm && yarn clean:umd",
        "clean:tsc": "NODE_ENV=production tsc --build --clean",
        "clean:umd": "rm -rf ./umd",
        "clean:npm": "rm -rf ./index.js",
        pack: "yarn pack",
        size: "size-limit"
      },
      sideEffects: false,
      "size-limit": [
        {
          limit: "10.5 KB",
          path: "production.js"
        }
      ],
      dependencies: {
        "@shopify/app-bridge-core": "1.0.2",
        base64url: "^3.0.1",
        "web-vitals": "^3.0.1"
      },
      devDependencies: {
        "@types/node": "^10.12.5",
        shx: "^0.3.3"
      }
    };
  }
});

// node_modules/@shopify/app-bridge/actions/helper.js
var require_helper2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/helper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPackageName = exports.getVersion = exports.getMergedProps = exports.updateActionFromPayload = exports.isValidOptionalString = exports.isValidOptionalNumber = exports.NonSnakeCaseGroup = exports.getEventNameSpace = exports.forEachInEnum = exports.findMatchInEnum = exports.actionWrapper = void 0;
    var helper_1 = require_helper();
    Object.defineProperty(exports, "actionWrapper", { enumerable: true, get: function() {
      return helper_1.actionWrapper;
    } });
    Object.defineProperty(exports, "findMatchInEnum", { enumerable: true, get: function() {
      return helper_1.findMatchInEnum;
    } });
    Object.defineProperty(exports, "forEachInEnum", { enumerable: true, get: function() {
      return helper_1.forEachInEnum;
    } });
    Object.defineProperty(exports, "getEventNameSpace", { enumerable: true, get: function() {
      return helper_1.getEventNameSpace;
    } });
    Object.defineProperty(exports, "NonSnakeCaseGroup", { enumerable: true, get: function() {
      return helper_1.NonSnakeCaseGroup;
    } });
    Object.defineProperty(exports, "isValidOptionalNumber", { enumerable: true, get: function() {
      return helper_1.isValidOptionalNumber;
    } });
    Object.defineProperty(exports, "isValidOptionalString", { enumerable: true, get: function() {
      return helper_1.isValidOptionalString;
    } });
    Object.defineProperty(exports, "updateActionFromPayload", { enumerable: true, get: function() {
      return helper_1.updateActionFromPayload;
    } });
    Object.defineProperty(exports, "getMergedProps", { enumerable: true, get: function() {
      return helper_1.getMergedProps;
    } });
    var packageJson = require_package();
    function getVersion() {
      return packageJson.version;
    }
    exports.getVersion = getVersion;
    function getPackageName() {
      return packageJson.name;
    }
    exports.getPackageName = getPackageName;
  }
});

// node_modules/@shopify/app-bridge/actions/types.js
var require_types2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ComponentType = exports.Group = void 0;
    var types_1 = require_types();
    Object.defineProperty(exports, "Group", { enumerable: true, get: function() {
      return types_1.Group;
    } });
    Object.defineProperty(exports, "ComponentType", { enumerable: true, get: function() {
      return types_1.ComponentType;
    } });
  }
});

// node_modules/@shopify/app-bridge/actions/AuthCode/index.js
var require_AuthCode2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/AuthCode/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.request = exports.Action = exports.respond = void 0;
    var AuthCode_1 = require_AuthCode();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return AuthCode_1.Action;
    } });
    var helper_1 = require_helper2();
    var types_1 = require_types2();
    var AuthCode_2 = require_AuthCode();
    Object.defineProperty(exports, "respond", { enumerable: true, get: function() {
      return AuthCode_2.respond;
    } });
    function request(id) {
      return helper_1.actionWrapper({
        group: types_1.Group.AuthCode,
        type: AuthCode_1.Action.REQUEST,
        payload: { id }
      });
    }
    exports.request = request;
  }
});

// node_modules/@shopify/app-bridge-core/client/types.js
var require_types3 = __commonJS({
  "node_modules/@shopify/app-bridge-core/client/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LifecycleHook = exports.PermissionType = exports.MessageType = void 0;
    var MessageType;
    (function(MessageType2) {
      MessageType2["GetState"] = "getState";
      MessageType2["Dispatch"] = "dispatch";
      MessageType2["Subscribe"] = "subscribe";
      MessageType2["Unsubscribe"] = "unsubscribe";
    })(MessageType = exports.MessageType || (exports.MessageType = {}));
    var PermissionType;
    (function(PermissionType2) {
      PermissionType2["Dispatch"] = "Dispatch";
      PermissionType2["Subscribe"] = "Subscribe";
    })(PermissionType = exports.PermissionType || (exports.PermissionType = {}));
    var LifecycleHook;
    (function(LifecycleHook2) {
      LifecycleHook2["UpdateAction"] = "UpdateAction";
      LifecycleHook2["DispatchAction"] = "DispatchAction";
    })(LifecycleHook = exports.LifecycleHook || (exports.LifecycleHook = {}));
  }
});

// node_modules/@shopify/app-bridge-core/util/collection.js
var require_collection = __commonJS({
  "node_modules/@shopify/app-bridge-core/util/collection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeFromCollection = exports.addAndRemoveFromCollection = void 0;
    function addAndRemoveFromCollection(collection, item, then) {
      collection.push(item);
      return function() {
        return removeFromCollection(collection, item, then);
      };
    }
    exports.addAndRemoveFromCollection = addAndRemoveFromCollection;
    function removeFromCollection(collection, item, then) {
      var idx = collection.findIndex(function(i) {
        return i === item;
      });
      if (idx >= 0) {
        collection.splice(idx, 1);
        if (then) {
          then(item);
        }
        return true;
      }
      return false;
    }
    exports.removeFromCollection = removeFromCollection;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Error/index.js
var require_Error = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Error/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.permissionAction = exports.isErrorEventName = exports.throwError = exports.invalidOriginAction = exports.fromAction = exports.AppBridgeError = exports.AppActionType = exports.Action = void 0;
    var types_1 = require_types();
    var helper_1 = require_helper();
    var Action2;
    (function(Action3) {
      Action3["INVALID_ACTION"] = "APP::ERROR::INVALID_ACTION";
      Action3["INVALID_ACTION_TYPE"] = "APP::ERROR::INVALID_ACTION_TYPE";
      Action3["INVALID_PAYLOAD"] = "APP::ERROR::INVALID_PAYLOAD";
      Action3["INVALID_OPTIONS"] = "APP::ERROR::INVALID_OPTIONS";
      Action3["UNEXPECTED_ACTION"] = "APP::ERROR::UNEXPECTED_ACTION";
      Action3["PERSISTENCE"] = "APP::ERROR::PERSISTENCE";
      Action3["UNSUPPORTED_OPERATION"] = "APP::ERROR::UNSUPPORTED_OPERATION";
      Action3["NETWORK"] = "APP::ERROR::NETWORK";
      Action3["PERMISSION"] = "APP::ERROR::PERMISSION";
      Action3["FAILED_AUTHENTICATION"] = "APP::ERROR::FAILED_AUTHENTICATION";
      Action3["INVALID_ORIGIN"] = "APP::ERROR::INVALID_ORIGIN";
    })(Action2 = exports.Action || (exports.Action = {}));
    var AppActionType;
    (function(AppActionType2) {
      AppActionType2["INVALID_CONFIG"] = "APP::ERROR::INVALID_CONFIG";
      AppActionType2["MISSING_CONFIG"] = "APP::APP_ERROR::MISSING_CONFIG";
      AppActionType2["MISSING_APP_BRIDGE_MIDDLEWARE"] = "APP::APP_ERROR::MISSING_APP_BRIDGE_MIDDLEWARE";
      AppActionType2["WINDOW_UNDEFINED"] = "APP::APP_ERROR::WINDOW_UNDEFINED";
      AppActionType2["REDUX_REINSTANTIATED"] = "APP::APP_ERROR::REDUX_REINSTANTIATED";
      AppActionType2["MISSING_LOCAL_ORIGIN"] = "APP::APP_ERROR::MISSING_LOCAL_ORIGIN";
      AppActionType2["MISSING_HOST_PROVIDER"] = "APP::APP_ERROR::MISSING_HOST_PROVIDER";
      AppActionType2["MISSING_ROUTER_CONTEXT"] = "APP::APP_ERROR::MISSING_ROUTER_CONTEXT";
      AppActionType2["MISSING_HISTORY_BLOCK"] = "APP::APP_ERROR::MISSING_HISTORY_BLOCK";
    })(AppActionType = exports.AppActionType || (exports.AppActionType = {}));
    var AppBridgeError = (
      /** @class */
      function() {
        function AppBridgeError2(message) {
          this.name = "AppBridgeError";
          this.message = message;
          if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
          } else {
            this.stack = new Error(this.message).stack;
          }
        }
        return AppBridgeError2;
      }()
    );
    exports.AppBridgeError = AppBridgeError;
    AppBridgeError.prototype = Object.create(Error.prototype);
    function fromAction(message, type, action) {
      var errorMessage = message ? type + ": " + message : type;
      var error = new AppBridgeError(errorMessage);
      error.action = action;
      error.type = type;
      return error;
    }
    exports.fromAction = fromAction;
    function invalidOriginAction(message) {
      return helper_1.actionWrapper({
        group: types_1.Group.Error,
        payload: {
          message,
          type: Action2.INVALID_ORIGIN
        },
        type: Action2.INVALID_ORIGIN
      });
    }
    exports.invalidOriginAction = invalidOriginAction;
    function throwError() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var type = args[0];
      var message;
      var action;
      if (typeof args[1] === "string") {
        message = args[1];
      } else {
        action = args[1];
        message = args[2] || "";
      }
      throw fromAction(message, type, action);
    }
    exports.throwError = throwError;
    function isErrorEventName(eventName) {
      var match = helper_1.findMatchInEnum(Action2, eventName);
      return typeof match === "string";
    }
    exports.isErrorEventName = isErrorEventName;
    function errorActionWrapperWithId(type, action, message) {
      var castPayload = action.payload;
      return helper_1.actionWrapper({
        type,
        group: types_1.Group.Error,
        payload: {
          action,
          message,
          type,
          id: castPayload && castPayload.id ? castPayload.id : void 0
        }
      });
    }
    function permissionAction(action, message) {
      return errorActionWrapperWithId(Action2.PERMISSION, action, message || "Action is not permitted");
    }
    exports.permissionAction = permissionAction;
  }
});

// node_modules/@shopify/app-bridge-core/actions/uuid.js
var require_uuid = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/uuid.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateUuid = void 0;
    function asHex(value) {
      return Array.from(value).map(function(i) {
        return ("00" + i.toString(16)).slice(-2);
      }).join("");
    }
    function getRandomBytes(size) {
      if (typeof Uint8Array === "function" && typeof window === "object" && window.crypto) {
        var buffer = new Uint8Array(size);
        var randomValues = window.crypto.getRandomValues(buffer);
        if (randomValues) {
          return randomValues;
        }
      }
      return Array.from(new Array(size), function() {
        return Math.random() * 255 | 0;
      });
    }
    function generateUuid() {
      var version = 64;
      var clockSeqHiAndReserved = getRandomBytes(1);
      var timeHiAndVersion = getRandomBytes(2);
      clockSeqHiAndReserved[0] &= 63 | 128;
      timeHiAndVersion[0] &= 15 | version;
      return [
        // time-low
        asHex(getRandomBytes(4)),
        "-",
        // time-mid
        asHex(getRandomBytes(2)),
        "-",
        // time-high-and-version
        asHex(timeHiAndVersion),
        "-",
        // clock-seq-and-reserved
        asHex(clockSeqHiAndReserved),
        // clock-seq-loq
        asHex(getRandomBytes(1)),
        "-",
        // node
        asHex(getRandomBytes(6))
      ].join("");
    }
    exports.generateUuid = generateUuid;
    exports.default = generateUuid;
  }
});

// node_modules/@shopify/app-bridge-core/actions/ActionSet.js
var require_ActionSet = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/ActionSet.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unsubscribeActions = exports.ActionSetWithChildren = exports.ActionSet = void 0;
    var types_1 = require_types3();
    var collection_1 = require_collection();
    var Error_1 = require_Error();
    var types_2 = require_types();
    var uuid_1 = __importDefault(require_uuid());
    var helper_1 = require_helper();
    var ActionSet = (
      /** @class */
      function() {
        function ActionSet2(app, type, group, id) {
          var _this = this;
          this.app = app;
          this.type = type;
          this.group = group;
          this.subgroups = [];
          this.subscriptions = [];
          if (!app) {
            Error_1.throwError(Error_1.Action.INVALID_ACTION, "Missing required `app`");
          }
          this.id = id || uuid_1.default();
          this.defaultGroup = group;
          var defaultSet = this.set;
          this.set = function() {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            if (!_this.app.hooks) {
              return defaultSet.apply(_this, args);
            }
            return (_a = _this.app.hooks).run.apply(_a, __spreadArray([types_1.LifecycleHook.UpdateAction, defaultSet, _this], args));
          };
        }
        ActionSet2.prototype.set = function() {
          var _ = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            _[_i] = arguments[_i];
          }
        };
        Object.defineProperty(ActionSet2.prototype, "component", {
          get: function() {
            return {
              id: this.id,
              subgroups: this.subgroups,
              type: this.type
            };
          },
          enumerable: false,
          configurable: true
        });
        ActionSet2.prototype.updateSubscription = function(subscriptionToRemove, group, subgroups) {
          var eventType = subscriptionToRemove.eventType, callback = subscriptionToRemove.callback, component = subscriptionToRemove.component;
          var currentIndex;
          currentIndex = this.subscriptions.findIndex(function(subscription) {
            return subscription === subscriptionToRemove;
          });
          if (currentIndex >= 0) {
            this.subscriptions[currentIndex].unsubscribe();
          } else {
            currentIndex = void 0;
          }
          this.group = group;
          this.subgroups = subgroups;
          Object.assign(component, { subgroups: this.subgroups });
          return this.subscribe(eventType, callback, component, currentIndex);
        };
        ActionSet2.prototype.error = function(callback) {
          var _this = this;
          var subscriptionIndices = [];
          helper_1.forEachInEnum(Error_1.Action, function(eventNameSpace) {
            subscriptionIndices.push(_this.subscriptions.length);
            _this.subscribe(eventNameSpace, callback);
          });
          return function() {
            var subscriptionsToRemove = subscriptionIndices.map(function(index) {
              return _this.subscriptions[index];
            });
            subscriptionsToRemove.forEach(function(toRemove) {
              collection_1.removeFromCollection(_this.subscriptions, toRemove, function(removed) {
                removed.unsubscribe();
              });
            });
          };
        };
        ActionSet2.prototype.subscribe = function(eventName, callback, component, currentIndex) {
          var _this = this;
          var eventComponent = component || this.component;
          var eventType = eventName.toUpperCase();
          var boundedCallback = typeof currentIndex === "number" ? callback : callback.bind(this);
          var eventNameSpace;
          if (Error_1.isErrorEventName(eventName)) {
            eventNameSpace = helper_1.getEventNameSpace(types_2.Group.Error, eventName, __assign(__assign({}, eventComponent), { type: "" }));
          } else {
            eventNameSpace = helper_1.getEventNameSpace(this.group, eventName, eventComponent);
          }
          var unsubscribe = this.app.subscribe(eventNameSpace, boundedCallback, component ? component.id : this.id);
          var subscription = {
            eventType,
            unsubscribe,
            callback: boundedCallback,
            component: eventComponent,
            updateSubscribe: function(group, subgroups) {
              return _this.updateSubscription(subscription, group, subgroups);
            }
          };
          if (typeof currentIndex === "number" && currentIndex >= 0 && currentIndex < this.subscriptions.length) {
            this.subscriptions[currentIndex] = subscription;
          } else {
            this.subscriptions.push(subscription);
          }
          return unsubscribe;
        };
        ActionSet2.prototype.unsubscribe = function(resetOnly) {
          if (resetOnly === void 0) {
            resetOnly = false;
          }
          unsubscribeActions(this.subscriptions, this.defaultGroup, resetOnly);
          return this;
        };
        return ActionSet2;
      }()
    );
    exports.ActionSet = ActionSet;
    var ActionSetWithChildren = (
      /** @class */
      function(_super) {
        __extends(ActionSetWithChildren2, _super);
        function ActionSetWithChildren2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.children = [];
          return _this;
        }
        ActionSetWithChildren2.prototype.unsubscribe = function(unsubscribeChildren, resetParentOnly) {
          if (unsubscribeChildren === void 0) {
            unsubscribeChildren = true;
          }
          if (resetParentOnly === void 0) {
            resetParentOnly = false;
          }
          unsubscribeActions(this.subscriptions, this.defaultGroup, resetParentOnly);
          this.children.forEach(function(child) {
            if (child instanceof ActionSetWithChildren2) {
              child.unsubscribe(unsubscribeChildren, !unsubscribeChildren);
            } else {
              child.unsubscribe(!unsubscribeChildren);
            }
          });
          return this;
        };
        ActionSetWithChildren2.prototype.getChild = function(id) {
          var childIndex = this.children.findIndex(function(child) {
            return child.id === id;
          });
          return childIndex >= 0 ? this.children[childIndex] : void 0;
        };
        ActionSetWithChildren2.prototype.getChildIndex = function(id) {
          return this.children.findIndex(function(child) {
            return child.id === id;
          });
        };
        ActionSetWithChildren2.prototype.getChildSubscriptions = function(id, eventType) {
          return this.subscriptions.filter(function(sub) {
            return sub.component.id === id && (!eventType || eventType === sub.eventType);
          });
        };
        ActionSetWithChildren2.prototype.addChild = function(child, group, subgroups) {
          var _this = this;
          var subscriptions = child.subscriptions;
          var existingChild = this.getChild(child.id);
          if (!existingChild) {
            this.children.push(child);
          }
          if (!subscriptions || group === child.group && subgroups === child.subgroups) {
            return this;
          }
          subscriptions.forEach(function(subscription) {
            var updateSubscribe = subscription.updateSubscribe;
            updateSubscribe(group, subgroups);
          });
          Object.assign(child, { group, subgroups });
          if (child instanceof ActionSetWithChildren2) {
            child.children.forEach(function(childIter) {
              return _this.addChild(childIter, group, subgroups);
            });
          }
          return this;
        };
        ActionSetWithChildren2.prototype.removeChild = function(id) {
          var _this = this;
          collection_1.removeFromCollection(this.children, this.getChild(id), function() {
            var toBeRemoved = _this.subscriptions.filter(function(subs) {
              return subs.component.id === id;
            });
            toBeRemoved.forEach(function(toRemove) {
              collection_1.removeFromCollection(_this.subscriptions, toRemove, function(removed) {
                removed.unsubscribe();
              });
            });
          });
          return this;
        };
        ActionSetWithChildren2.prototype.subscribeToChild = function(child, eventName, callback) {
          var _this = this;
          var boundedCallback = callback.bind(this);
          if (eventName instanceof Array) {
            eventName.forEach(function(eventNameIter) {
              return _this.subscribeToChild(child, eventNameIter, callback);
            });
            return this;
          }
          if (typeof eventName !== "string") {
            return this;
          }
          var eventType = eventName.toUpperCase();
          var currentSubscriptions = this.getChildSubscriptions(child.id, eventType);
          if (currentSubscriptions.length > 0) {
            currentSubscriptions.forEach(function(subs) {
              return subs.updateSubscribe(_this.group, child.subgroups);
            });
          } else {
            var childComponent = {
              id: child.id,
              subgroups: child.subgroups,
              type: child.type
            };
            this.subscribe(eventType, boundedCallback, childComponent);
          }
          return this;
        };
        ActionSetWithChildren2.prototype.getUpdatedChildActions = function(newActions, currentActions) {
          if (newActions.length === 0) {
            while (currentActions.length > 0) {
              var action = currentActions.pop();
              if (!action) {
                break;
              }
              this.removeChild(action.id);
            }
            return void 0;
          }
          var uniqueActions = newActions.filter(function(action2, index, actionsArr) {
            return index === actionsArr.indexOf(action2);
          });
          var newActionIds = uniqueActions.map(function(action2) {
            return action2.id;
          });
          var unusedActions = currentActions.filter(function(action2) {
            return newActionIds.indexOf(action2.id) < 0;
          });
          while (unusedActions.length > 0) {
            var action = unusedActions.pop();
            if (!action) {
              break;
            }
            this.removeChild(action.id);
          }
          return uniqueActions;
        };
        return ActionSetWithChildren2;
      }(ActionSet)
    );
    exports.ActionSetWithChildren = ActionSetWithChildren;
    function unsubscribeActions(subscriptions, defaultGroup, reassign) {
      if (reassign === void 0) {
        reassign = false;
      }
      subscriptions.forEach(function(subscription) {
        if (reassign) {
          var updateSubscribe = subscription.updateSubscribe;
          updateSubscribe(defaultGroup, []);
        } else {
          var unsubscribe = subscription.unsubscribe;
          unsubscribe();
        }
      });
      if (!reassign) {
        subscriptions.length = 0;
      }
    }
    exports.unsubscribeActions = unsubscribeActions;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Button/index.js
var require_Button = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Button/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = exports.update = exports.clickButton = exports.Style = exports.Icon = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["CLICK"] = "CLICK";
      Action3["UPDATE"] = "UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
    var Icon2;
    (function(Icon3) {
      Icon3["Print"] = "print";
    })(Icon2 = exports.Icon || (exports.Icon = {}));
    var Style;
    (function(Style2) {
      Style2["Danger"] = "danger";
    })(Style = exports.Style || (exports.Style = {}));
    function clickButton(group, component, payload) {
      var id = component.id;
      var action = helper_1.getEventNameSpace(group, Action2.CLICK, component);
      var buttonPayload = {
        id,
        payload
      };
      return helper_1.actionWrapper({ type: action, group, payload: buttonPayload });
    }
    exports.clickButton = clickButton;
    function update(group, component, props) {
      var id = component.id;
      var label = props.label;
      var action = helper_1.getEventNameSpace(group, Action2.UPDATE, component);
      var buttonPayload = __assign(__assign({}, props), { id, label });
      return helper_1.actionWrapper({ type: action, group, payload: buttonPayload });
    }
    exports.update = update;
    var Button2 = (
      /** @class */
      function(_super) {
        __extends(Button3, _super);
        function Button3(app, options) {
          var _this = _super.call(this, app, types_1.ComponentType.Button, types_1.Group.Button) || this;
          _this.disabled = false;
          _this.loading = false;
          _this.plain = false;
          _this.set(options, false);
          return _this;
        }
        Object.defineProperty(Button3.prototype, "options", {
          get: function() {
            return {
              disabled: this.disabled,
              icon: this.icon,
              label: this.label,
              style: this.style,
              loading: this.loading,
              plain: this.plain
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Button3.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        Button3.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var label = mergedOptions.label, disabled = mergedOptions.disabled, icon = mergedOptions.icon, style = mergedOptions.style, loading = mergedOptions.loading, plain = mergedOptions.plain;
          this.label = label;
          this.disabled = Boolean(disabled);
          this.icon = icon;
          this.style = style;
          this.loading = Boolean(loading);
          this.plain = Boolean(plain);
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        Button3.prototype.dispatch = function(action, payload) {
          switch (action) {
            case Action2.CLICK:
              this.app.dispatch(clickButton(this.group, this.component, payload));
              break;
            case Action2.UPDATE: {
              var updateAction = update(this.group, this.component, this.payload);
              this.app.dispatch(updateAction);
              break;
            }
          }
          return this;
        };
        return Button3;
      }(ActionSet_1.ActionSet)
    );
    exports.Button = Button2;
  }
});

// node_modules/@shopify/app-bridge/actions/Button/index.js
var require_Button2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Button/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.isValidButtonProps = exports.Button = exports.update = exports.Style = exports.Icon = exports.clickButton = exports.Action = void 0;
    var Button_1 = require_Button();
    Object.defineProperty(exports, "Button", { enumerable: true, get: function() {
      return Button_1.Button;
    } });
    var Button_2 = require_Button();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Button_2.Action;
    } });
    Object.defineProperty(exports, "clickButton", { enumerable: true, get: function() {
      return Button_2.clickButton;
    } });
    Object.defineProperty(exports, "Icon", { enumerable: true, get: function() {
      return Button_2.Icon;
    } });
    Object.defineProperty(exports, "Style", { enumerable: true, get: function() {
      return Button_2.Style;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return Button_2.update;
    } });
    function isValidButtonProps(button) {
      return typeof button.id === "string" && typeof button.label === "string";
    }
    exports.isValidButtonProps = isValidButtonProps;
    function create(app, options) {
      return new Button_1.Button(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/buttonHelper.js
var require_buttonHelper = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/buttonHelper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSingleButton = void 0;
    var Button_1 = require_Button();
    function getSingleButton(action, button, subgroups, updateCb) {
      action.addChild(button, action.group, subgroups);
      action.subscribeToChild(button, Button_1.Action.UPDATE, updateCb);
      return button.payload;
    }
    exports.getSingleButton = getSingleButton;
  }
});

// node_modules/@shopify/app-bridge-core/actions/ButtonGroup/index.js
var require_ButtonGroup = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/ButtonGroup/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.ButtonGroup = exports.isGroupedButtonPayload = exports.isGroupedButton = exports.update = exports.Action = void 0;
    var buttonHelper_1 = require_buttonHelper();
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["UPDATE"] = "UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
    function update(group, component, props) {
      return buttonActionWrapper(group, component, Action2.UPDATE, props);
    }
    exports.update = update;
    function isGroupedButton(options) {
      var castOptions = options;
      return castOptions.buttons && castOptions.buttons.length > 0 && castOptions.label !== void 0;
    }
    exports.isGroupedButton = isGroupedButton;
    function isGroupedButtonPayload(payload) {
      var castOptions = payload;
      return Array.isArray(castOptions.buttons) && typeof castOptions.id === "string" && typeof castOptions.label === "string";
    }
    exports.isGroupedButtonPayload = isGroupedButtonPayload;
    var ButtonGroup = (
      /** @class */
      function(_super) {
        __extends(ButtonGroup2, _super);
        function ButtonGroup2(app, options) {
          var _this = _super.call(this, app, types_1.ComponentType.ButtonGroup, types_1.Group.ButtonGroup) || this;
          _this.disabled = false;
          _this.plain = false;
          _this.buttonsOptions = [];
          _this.buttons = [];
          _this.set(options, false);
          return _this;
        }
        Object.defineProperty(ButtonGroup2.prototype, "options", {
          get: function() {
            return {
              buttons: this.buttonsOptions,
              disabled: this.disabled,
              label: this.label,
              plain: this.plain
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(ButtonGroup2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { buttons: this.buttons, id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        ButtonGroup2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var label = mergedOptions.label, disabled = mergedOptions.disabled, buttons = mergedOptions.buttons, plain = mergedOptions.plain;
          this.label = label;
          this.disabled = Boolean(disabled);
          this.buttons = this.getButtons(buttons);
          this.plain = Boolean(plain);
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        ButtonGroup2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.UPDATE: {
              var updateAction = update(this.group, this.component, this.payload);
              this.app.dispatch(updateAction);
              break;
            }
          }
          return this;
        };
        ButtonGroup2.prototype.updateButtons = function(newPayload) {
          if (!this.buttons || this.buttons.length === 0) {
            return;
          }
          var updated;
          for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var action = _a[_i];
            updated = helper_1.updateActionFromPayload(action, newPayload);
            if (updated) {
              break;
            }
          }
          if (updated) {
            this.dispatch(Action2.UPDATE);
          }
        };
        ButtonGroup2.prototype.getSingleButton = function(button) {
          return buttonHelper_1.getSingleButton(this, button, this.subgroups, this.updateButtons);
        };
        ButtonGroup2.prototype.getButtons = function(buttonOptions) {
          var _this = this;
          var buttons = [];
          if (!buttonOptions) {
            return [];
          }
          buttonOptions.forEach(function(button) {
            var singleButton = buttonHelper_1.getSingleButton(_this, button, _this.subgroups, _this.updateButtons);
            buttons.push(singleButton);
          });
          this.buttonsOptions = buttonOptions;
          return buttons;
        };
        return ButtonGroup2;
      }(ActionSet_1.ActionSetWithChildren)
    );
    exports.ButtonGroup = ButtonGroup;
    function create(app, options) {
      return new ButtonGroup(app, options);
    }
    exports.create = create;
    function buttonActionWrapper(group, component, eventName, props, payload) {
      var id = component.id;
      var label = props.label;
      var action = helper_1.getEventNameSpace(group, eventName, component);
      var buttonPayload = __assign(__assign({}, props), { id, label, payload });
      return helper_1.actionWrapper({ type: action, group, payload: buttonPayload });
    }
  }
});

// node_modules/@shopify/app-bridge/actions/ButtonGroup/index.js
var require_ButtonGroup2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/ButtonGroup/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.ButtonGroup = exports.isGroupedButtonPayload = exports.isGroupedButton = exports.update = exports.Action = void 0;
    var ButtonGroup_1 = require_ButtonGroup();
    Object.defineProperty(exports, "ButtonGroup", { enumerable: true, get: function() {
      return ButtonGroup_1.ButtonGroup;
    } });
    var ButtonGroup_2 = require_ButtonGroup();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return ButtonGroup_2.Action;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return ButtonGroup_2.update;
    } });
    Object.defineProperty(exports, "isGroupedButton", { enumerable: true, get: function() {
      return ButtonGroup_2.isGroupedButton;
    } });
    Object.defineProperty(exports, "isGroupedButtonPayload", { enumerable: true, get: function() {
      return ButtonGroup_2.isGroupedButtonPayload;
    } });
    function create(app, options) {
      return new ButtonGroup_1.ButtonGroup(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Cart/index.js
var require_Cart = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Cart/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cart = exports.setLineItemProperties = exports.removeLineItemDiscount = exports.setLineItemDiscount = exports.removeLineItem = exports.updateLineItem = exports.addLineItem = exports.removeProperties = exports.setProperties = exports.setDiscount = exports.updateCustomerAddress = exports.addCustomerAddress = exports.setCustomer = exports.update = exports.fetch = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["FETCH"] = "APP::CART::FETCH";
      Action3["UPDATE"] = "APP::CART::UPDATE";
      Action3["SET_CUSTOMER"] = "APP::CART::SET_CUSTOMER";
      Action3["REMOVE_CUSTOMER"] = "APP::CART::REMOVE_CUSTOMER";
      Action3["ADD_CUSTOMER_ADDRESS"] = "APP::CART::ADD_CUSTOMER_ADDRESS";
      Action3["UPDATE_CUSTOMER_ADDRESS"] = "APP::CART::UPDATE_CUSTOMER_ADDRESS";
      Action3["SET_DISCOUNT"] = "APP::CART::SET_DISCOUNT";
      Action3["REMOVE_DISCOUNT"] = "APP::CART::REMOVE_DISCOUNT";
      Action3["SET_PROPERTIES"] = "APP::CART::SET_PROPERTIES";
      Action3["REMOVE_PROPERTIES"] = "APP::CART::REMOVE_PROPERTIES";
      Action3["CLEAR"] = "APP::CART::CLEAR";
      Action3["ADD_LINE_ITEM"] = "APP::CART::ADD_LINE_ITEM";
      Action3["UPDATE_LINE_ITEM"] = "APP::CART::UPDATE_LINE_ITEM";
      Action3["REMOVE_LINE_ITEM"] = "APP::CART::REMOVE_LINE_ITEM";
      Action3["SET_LINE_ITEM_DISCOUNT"] = "APP::CART::SET_LINE_ITEM_DISCOUNT";
      Action3["REMOVE_LINE_ITEM_DISCOUNT"] = "APP::CART::REMOVE_LINE_ITEM_DISCOUNT";
      Action3["SET_LINE_ITEM_PROPERTIES"] = "APP::CART::SET_LINE_ITEM_PROPERTIES";
      Action3["REMOVE_LINE_ITEM_PROPERTIES"] = "APP::CART::REMOVE_LINE_ITEM_PROPERTIES";
    })(Action2 = exports.Action || (exports.Action = {}));
    function createCartAction(type, payload) {
      if (payload === void 0) {
        payload = {};
      }
      return helper_1.actionWrapper({
        group: types_1.Group.Cart,
        type,
        payload
      });
    }
    function fetch2() {
      return createCartAction(Action2.FETCH);
    }
    exports.fetch = fetch2;
    function update(payload) {
      return createCartAction(Action2.UPDATE, payload);
    }
    exports.update = update;
    function setCustomer(payload) {
      return createCartAction(Action2.SET_CUSTOMER, payload);
    }
    exports.setCustomer = setCustomer;
    function addCustomerAddress(payload) {
      return createCartAction(Action2.ADD_CUSTOMER_ADDRESS, payload);
    }
    exports.addCustomerAddress = addCustomerAddress;
    function updateCustomerAddress(payload) {
      return createCartAction(Action2.UPDATE_CUSTOMER_ADDRESS, payload);
    }
    exports.updateCustomerAddress = updateCustomerAddress;
    function setDiscount(payload) {
      return createCartAction(Action2.SET_DISCOUNT, payload);
    }
    exports.setDiscount = setDiscount;
    function setProperties(payload) {
      return createCartAction(Action2.SET_PROPERTIES, payload);
    }
    exports.setProperties = setProperties;
    function removeProperties(payload) {
      return createCartAction(Action2.REMOVE_PROPERTIES, payload);
    }
    exports.removeProperties = removeProperties;
    function addLineItem(payload) {
      return createCartAction(Action2.ADD_LINE_ITEM, payload);
    }
    exports.addLineItem = addLineItem;
    function updateLineItem(payload) {
      return createCartAction(Action2.UPDATE_LINE_ITEM, payload);
    }
    exports.updateLineItem = updateLineItem;
    function removeLineItem(payload) {
      return createCartAction(Action2.REMOVE_LINE_ITEM, payload);
    }
    exports.removeLineItem = removeLineItem;
    function setLineItemDiscount(payload) {
      return createCartAction(Action2.SET_LINE_ITEM_DISCOUNT, payload);
    }
    exports.setLineItemDiscount = setLineItemDiscount;
    function removeLineItemDiscount(payload) {
      return createCartAction(Action2.REMOVE_LINE_ITEM_DISCOUNT, payload);
    }
    exports.removeLineItemDiscount = removeLineItemDiscount;
    function setLineItemProperties(payload) {
      return createCartAction(Action2.SET_LINE_ITEM_PROPERTIES, payload);
    }
    exports.setLineItemProperties = setLineItemProperties;
    var Cart = (
      /** @class */
      function(_super) {
        __extends(Cart2, _super);
        function Cart2(app, options) {
          return _super.call(this, app, types_1.Group.Cart, types_1.Group.Cart, options ? options.id : void 0) || this;
        }
        Cart2.prototype.dispatch = function(action, payload) {
          switch (action) {
            case Action2.FETCH:
              this.dispatchCartAction(Action2.FETCH);
              break;
            case Action2.UPDATE:
              this.dispatchCartAction(Action2.UPDATE, payload);
              break;
            case Action2.SET_CUSTOMER:
              this.dispatchCartAction(Action2.SET_CUSTOMER, payload);
              break;
            case Action2.REMOVE_CUSTOMER:
              this.dispatchCartAction(Action2.REMOVE_CUSTOMER, payload);
              break;
            case Action2.ADD_CUSTOMER_ADDRESS:
              this.dispatchCartAction(Action2.ADD_CUSTOMER_ADDRESS, payload);
              break;
            case Action2.UPDATE_CUSTOMER_ADDRESS:
              this.dispatchCartAction(Action2.UPDATE_CUSTOMER_ADDRESS, payload);
              break;
            case Action2.SET_DISCOUNT:
              this.dispatchCartAction(Action2.SET_DISCOUNT, payload);
              break;
            case Action2.REMOVE_DISCOUNT:
              this.dispatchCartAction(Action2.REMOVE_DISCOUNT, payload);
              break;
            case Action2.SET_PROPERTIES:
              this.dispatchCartAction(Action2.SET_PROPERTIES, payload);
              break;
            case Action2.REMOVE_PROPERTIES:
              this.dispatchCartAction(Action2.REMOVE_PROPERTIES, payload);
              break;
            case Action2.CLEAR:
              this.dispatchCartAction(Action2.CLEAR, payload);
              break;
            case Action2.ADD_LINE_ITEM:
              this.dispatchCartAction(Action2.ADD_LINE_ITEM, payload);
              break;
            case Action2.UPDATE_LINE_ITEM:
              this.dispatchCartAction(Action2.UPDATE_LINE_ITEM, payload);
              break;
            case Action2.REMOVE_LINE_ITEM:
              this.dispatchCartAction(Action2.REMOVE_LINE_ITEM, payload);
              break;
            case Action2.SET_LINE_ITEM_DISCOUNT:
              this.dispatchCartAction(Action2.SET_LINE_ITEM_DISCOUNT, payload);
              break;
            case Action2.REMOVE_LINE_ITEM_DISCOUNT:
              this.dispatchCartAction(Action2.REMOVE_LINE_ITEM_DISCOUNT, payload);
              break;
            case Action2.SET_LINE_ITEM_PROPERTIES:
              this.dispatchCartAction(Action2.SET_LINE_ITEM_PROPERTIES, payload);
              break;
            case Action2.REMOVE_LINE_ITEM_PROPERTIES:
              this.dispatchCartAction(Action2.REMOVE_LINE_ITEM_PROPERTIES, payload);
              break;
          }
          return this;
        };
        Cart2.prototype.dispatchCartAction = function(type, payload) {
          this.app.dispatch(createCartAction(type, __assign(__assign({}, payload), { id: this.id })));
        };
        return Cart2;
      }(ActionSet_1.ActionSet)
    );
    exports.Cart = Cart;
  }
});

// node_modules/@shopify/app-bridge/actions/Cart/index.js
var require_Cart2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Cart/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.setLineItemProperties = exports.removeLineItemDiscount = exports.setLineItemDiscount = exports.removeLineItem = exports.updateLineItem = exports.addLineItem = exports.removeProperties = exports.setProperties = exports.setDiscount = exports.updateCustomerAddress = exports.addCustomerAddress = exports.setCustomer = exports.update = exports.fetch = exports.Cart = exports.Action = void 0;
    var Cart_1 = require_Cart();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Cart_1.Action;
    } });
    Object.defineProperty(exports, "Cart", { enumerable: true, get: function() {
      return Cart_1.Cart;
    } });
    Object.defineProperty(exports, "fetch", { enumerable: true, get: function() {
      return Cart_1.fetch;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return Cart_1.update;
    } });
    Object.defineProperty(exports, "setCustomer", { enumerable: true, get: function() {
      return Cart_1.setCustomer;
    } });
    Object.defineProperty(exports, "addCustomerAddress", { enumerable: true, get: function() {
      return Cart_1.addCustomerAddress;
    } });
    Object.defineProperty(exports, "updateCustomerAddress", { enumerable: true, get: function() {
      return Cart_1.updateCustomerAddress;
    } });
    Object.defineProperty(exports, "setDiscount", { enumerable: true, get: function() {
      return Cart_1.setDiscount;
    } });
    Object.defineProperty(exports, "setProperties", { enumerable: true, get: function() {
      return Cart_1.setProperties;
    } });
    Object.defineProperty(exports, "removeProperties", { enumerable: true, get: function() {
      return Cart_1.removeProperties;
    } });
    Object.defineProperty(exports, "addLineItem", { enumerable: true, get: function() {
      return Cart_1.addLineItem;
    } });
    Object.defineProperty(exports, "updateLineItem", { enumerable: true, get: function() {
      return Cart_1.updateLineItem;
    } });
    Object.defineProperty(exports, "removeLineItem", { enumerable: true, get: function() {
      return Cart_1.removeLineItem;
    } });
    Object.defineProperty(exports, "setLineItemDiscount", { enumerable: true, get: function() {
      return Cart_1.setLineItemDiscount;
    } });
    Object.defineProperty(exports, "removeLineItemDiscount", { enumerable: true, get: function() {
      return Cart_1.removeLineItemDiscount;
    } });
    Object.defineProperty(exports, "setLineItemProperties", { enumerable: true, get: function() {
      return Cart_1.setLineItemProperties;
    } });
    function create(app, options) {
      return new Cart_1.Cart(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Client/index.js
var require_Client = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Client/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = void 0;
    var Action2;
    (function(Action3) {
      Action3["INITIALIZE"] = "APP::CLIENT::INITIALIZE";
    })(Action2 = exports.Action || (exports.Action = {}));
  }
});

// node_modules/@shopify/app-bridge/actions/Client/index.js
var require_Client2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Client/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initialize = exports.Action = void 0;
    var Client_1 = require_Client();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Client_1.Action;
    } });
    var types_1 = require_types2();
    var helper_1 = require_helper2();
    function initialize() {
      return helper_1.actionWrapper({
        group: types_1.Group.Client,
        type: Client_1.Action.INITIALIZE
      });
    }
    exports.initialize = initialize;
  }
});

// node_modules/@shopify/app-bridge/actions/Error/index.js
var require_Error2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Error/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.networkAction = exports.persistenceAction = exports.unsupportedOperationAction = exports.unexpectedAction = exports.invalidAction = exports.invalidActionType = exports.invalidPayload = exports.Message = exports.fromAction = exports.Action = exports.permissionAction = exports.isErrorEventName = exports.throwError = exports.invalidOriginAction = exports.AppBridgeError = exports.AppActionType = void 0;
    var Error_1 = require_Error();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Error_1.Action;
    } });
    Object.defineProperty(exports, "fromAction", { enumerable: true, get: function() {
      return Error_1.fromAction;
    } });
    var helper_1 = require_helper2();
    var types_1 = require_types2();
    var Error_2 = require_Error();
    Object.defineProperty(exports, "AppActionType", { enumerable: true, get: function() {
      return Error_2.AppActionType;
    } });
    Object.defineProperty(exports, "AppBridgeError", { enumerable: true, get: function() {
      return Error_2.AppBridgeError;
    } });
    Object.defineProperty(exports, "invalidOriginAction", { enumerable: true, get: function() {
      return Error_2.invalidOriginAction;
    } });
    Object.defineProperty(exports, "throwError", { enumerable: true, get: function() {
      return Error_2.throwError;
    } });
    Object.defineProperty(exports, "isErrorEventName", { enumerable: true, get: function() {
      return Error_2.isErrorEventName;
    } });
    Object.defineProperty(exports, "permissionAction", { enumerable: true, get: function() {
      return Error_2.permissionAction;
    } });
    function errorActionWrapperWithId(type, action, message) {
      var castPayload = action.payload;
      return helper_1.actionWrapper({
        type,
        group: types_1.Group.Error,
        payload: {
          action,
          message,
          type,
          id: castPayload && castPayload.id ? castPayload.id : void 0
        }
      });
    }
    var Message;
    (function(Message2) {
      Message2["MISSING_PAYLOAD"] = "Missing payload";
      Message2["INVALID_PAYLOAD_ID"] = "Id in payload is missing or invalid";
    })(Message = exports.Message || (exports.Message = {}));
    function invalidPayload(action, message) {
      return errorActionWrapperWithId(Error_1.Action.INVALID_PAYLOAD, action, message || "The action's payload is missing required properties or has invalid properties");
    }
    exports.invalidPayload = invalidPayload;
    function invalidActionType(action, message) {
      return helper_1.actionWrapper({
        group: types_1.Group.Error,
        payload: {
          action,
          message: message || "The action type is invalid or unsupported",
          type: Error_1.Action.INVALID_ACTION_TYPE
        },
        type: Error_1.Action.INVALID_ACTION_TYPE
      });
    }
    exports.invalidActionType = invalidActionType;
    function invalidAction(action, message) {
      return helper_1.actionWrapper({
        group: types_1.Group.Error,
        payload: {
          action,
          message: message || "The action's has missing/invalid values for `group`, `type` or `version`",
          type: Error_1.Action.INVALID_ACTION
        },
        type: Error_1.Action.INVALID_ACTION
      });
    }
    exports.invalidAction = invalidAction;
    function unexpectedAction(action, message) {
      return helper_1.actionWrapper({
        group: types_1.Group.Error,
        payload: {
          action,
          message: message || "Action cannot be called at this time",
          type: Error_1.Action.UNEXPECTED_ACTION
        },
        type: Error_1.Action.UNEXPECTED_ACTION
      });
    }
    exports.unexpectedAction = unexpectedAction;
    function unsupportedOperationAction(action, message) {
      return errorActionWrapperWithId(Error_1.Action.UNSUPPORTED_OPERATION, action, message || "The action type is unsupported");
    }
    exports.unsupportedOperationAction = unsupportedOperationAction;
    function persistenceAction(action, message) {
      return errorActionWrapperWithId(Error_1.Action.PERSISTENCE, action, message || "Action cannot be persisted on server");
    }
    exports.persistenceAction = persistenceAction;
    function networkAction(action, message) {
      return errorActionWrapperWithId(Error_1.Action.NETWORK, action, message || "Network error");
    }
    exports.networkAction = networkAction;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Toast/index.js
var require_Toast = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Toast/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Toast = exports.primaryAction = exports.clear = exports.show = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["SHOW"] = "APP::TOAST::SHOW";
      Action3["CLEAR"] = "APP::TOAST::CLEAR";
      Action3["ACTION"] = "APP::TOAST::ACTION";
    })(Action2 = exports.Action || (exports.Action = {}));
    function show(toastMessage) {
      return helper_1.actionWrapper({
        group: types_1.Group.Toast,
        payload: toastMessage,
        type: Action2.SHOW
      });
    }
    exports.show = show;
    function clear(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Toast,
        type: Action2.CLEAR
      });
    }
    exports.clear = clear;
    function primaryAction(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Toast,
        type: Action2.ACTION
      });
    }
    exports.primaryAction = primaryAction;
    var Toast = (
      /** @class */
      function(_super) {
        __extends(Toast2, _super);
        function Toast2(app, options) {
          var _this = _super.call(this, app, types_1.Group.Toast, types_1.Group.Toast) || this;
          _this.message = "";
          _this.duration = 5e3;
          _this.set(options);
          return _this;
        }
        Object.defineProperty(Toast2.prototype, "options", {
          get: function() {
            var _a;
            return {
              duration: this.duration,
              isError: this.isError,
              message: this.message,
              action: ((_a = this.action) === null || _a === void 0 ? void 0 : _a.content) ? {
                content: this.action.content
              } : void 0
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Toast2.prototype, "payload", {
          get: function() {
            return __assign({ id: this.id }, this.options);
          },
          enumerable: false,
          configurable: true
        });
        Toast2.prototype.set = function(options) {
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var message = mergedOptions.message, duration = mergedOptions.duration, isError = mergedOptions.isError, action = mergedOptions.action;
          this.message = message;
          this.duration = duration;
          this.isError = isError;
          this.action = (action === null || action === void 0 ? void 0 : action.content) ? {
            content: action.content || ""
          } : void 0;
          return this;
        };
        Toast2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.SHOW: {
              var openAction = show(this.payload);
              this.app.dispatch(openAction);
              break;
            }
            case Action2.CLEAR:
              this.app.dispatch(clear({ id: this.id }));
              break;
            case Action2.ACTION:
              this.app.dispatch(primaryAction({ id: this.id }));
              break;
          }
          return this;
        };
        return Toast2;
      }(ActionSet_1.ActionSet)
    );
    exports.Toast = Toast;
  }
});

// node_modules/@shopify/app-bridge/actions/Flash/actions.js
var require_actions = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Flash/actions.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.Flash = exports.show = exports.clear = void 0;
    var Toast_1 = require_Toast();
    Object.defineProperty(exports, "clear", { enumerable: true, get: function() {
      return Toast_1.clear;
    } });
    Object.defineProperty(exports, "show", { enumerable: true, get: function() {
      return Toast_1.show;
    } });
    var Flash = (
      /** @class */
      function(_super) {
        __extends(Flash2, _super);
        function Flash2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        return Flash2;
      }(Toast_1.Toast)
    );
    exports.Flash = Flash;
    function create(app, options) {
      return new Flash(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge/actions/Flash/index.js
var require_Flash = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Flash/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_actions(), exports);
  }
});

// node_modules/@shopify/app-bridge-core/actions/Features/types.js
var require_types4 = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Features/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = void 0;
    var Action2;
    (function(Action3) {
      Action3["UPDATE"] = "APP::FEATURES::UPDATE";
      Action3["REQUEST"] = "APP::FEATURES::REQUEST";
      Action3["REQUEST_UPDATE"] = "APP::FEATURES::REQUEST::UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
  }
});

// node_modules/@shopify/app-bridge-core/actions/Features/actions.js
var require_actions2 = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Features/actions.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Features = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var types_2 = require_types4();
    var Features = (
      /** @class */
      function(_super) {
        __extends(Features2, _super);
        function Features2(app, options) {
          return _super.call(this, app, types_1.Group.Features, types_1.Group.Features, options ? options.id : void 0) || this;
        }
        Features2.prototype.dispatch = function(action, payload) {
          switch (action) {
            case types_2.Action.REQUEST:
              this.dispatchFeaturesAction(types_2.Action.REQUEST, payload);
              break;
          }
          return this;
        };
        Features2.prototype.dispatchFeaturesAction = function(type, payload) {
          this.app.dispatch(helper_1.actionWrapper({
            group: types_1.Group.Features,
            type,
            payload: __assign(__assign({}, payload || {}), { id: this.id })
          }));
        };
        return Features2;
      }(ActionSet_1.ActionSet)
    );
    exports.Features = Features;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Features/index.js
var require_Features = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Features/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_actions2(), exports);
    __exportStar(require_types4(), exports);
  }
});

// node_modules/@shopify/app-bridge/actions/Features/actions.js
var require_actions3 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Features/actions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.Features = void 0;
    var Features_1 = require_Features();
    Object.defineProperty(exports, "Features", { enumerable: true, get: function() {
      return Features_1.Features;
    } });
    function create(app, options) {
      return new Features_1.Features(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge/actions/Features/types.js
var require_types5 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Features/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = void 0;
    var Features_1 = require_Features();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Features_1.Action;
    } });
  }
});

// node_modules/@shopify/app-bridge/actions/Features/index.js
var require_Features2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Features/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_actions3(), exports);
    __exportStar(require_types5(), exports);
  }
});

// node_modules/@shopify/app-bridge-core/actions/FeedbackModal/index.js
var require_FeedbackModal = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/FeedbackModal/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.FeedbackModal = exports.close = exports.open = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["OPEN"] = "APP::FEEDBACK_MODAL::OPEN";
      Action3["CLOSE"] = "APP::FEEDBACK_MODAL::CLOSE";
    })(Action2 = exports.Action || (exports.Action = {}));
    function open(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.FeedbackModal,
        payload,
        type: Action2.OPEN
      });
    }
    exports.open = open;
    function close(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.FeedbackModal,
        payload,
        type: Action2.CLOSE
      });
    }
    exports.close = close;
    var FeedbackModal = (
      /** @class */
      function(_super) {
        __extends(FeedbackModal2, _super);
        function FeedbackModal2(app, options) {
          var _this = _super.call(this, app, types_1.Group.FeedbackModal, types_1.Group.FeedbackModal) || this;
          _this.options = options;
          _this.set(options);
          return _this;
        }
        Object.defineProperty(FeedbackModal2.prototype, "payload", {
          /**
           * Returns the action set payload
           */
          get: function() {
            return __assign({ id: this.id }, this.options);
          },
          enumerable: false,
          configurable: true
        });
        FeedbackModal2.prototype.set = function(options) {
          this.options = helper_1.getMergedProps(this.options, options);
          return this;
        };
        FeedbackModal2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.OPEN: {
              var openAction = open(this.payload);
              this.app.dispatch(openAction);
              break;
            }
            case Action2.CLOSE: {
              var closeAction = close(this.payload);
              this.app.dispatch(closeAction);
              break;
            }
          }
          return this;
        };
        return FeedbackModal2;
      }(ActionSet_1.ActionSet)
    );
    exports.FeedbackModal = FeedbackModal;
    function create(app, options) {
      return new FeedbackModal(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge/actions/FeedbackModal/index.js
var require_FeedbackModal2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/FeedbackModal/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.FeedbackModal = exports.close = exports.open = exports.Action = void 0;
    var FeedbackModal_1 = require_FeedbackModal();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return FeedbackModal_1.Action;
    } });
    Object.defineProperty(exports, "open", { enumerable: true, get: function() {
      return FeedbackModal_1.open;
    } });
    Object.defineProperty(exports, "close", { enumerable: true, get: function() {
      return FeedbackModal_1.close;
    } });
    Object.defineProperty(exports, "FeedbackModal", { enumerable: true, get: function() {
      return FeedbackModal_1.FeedbackModal;
    } });
    Object.defineProperty(exports, "create", { enumerable: true, get: function() {
      return FeedbackModal_1.create;
    } });
  }
});

// node_modules/@shopify/app-bridge-core/actions/Fullscreen/index.js
var require_Fullscreen = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Fullscreen/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Fullscreen = exports.exit = exports.enter = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["ENTER"] = "APP::FULLSCREEN::ENTER";
      Action3["EXIT"] = "APP::FULLSCREEN::EXIT";
    })(Action2 = exports.Action || (exports.Action = {}));
    function enter() {
      return helper_1.actionWrapper({
        group: types_1.Group.Fullscreen,
        type: Action2.ENTER
      });
    }
    exports.enter = enter;
    function exit() {
      return helper_1.actionWrapper({
        group: types_1.Group.Fullscreen,
        type: Action2.EXIT
      });
    }
    exports.exit = exit;
    var Fullscreen = (
      /** @class */
      function(_super) {
        __extends(Fullscreen2, _super);
        function Fullscreen2(app) {
          return _super.call(this, app, types_1.Group.Fullscreen, types_1.Group.Fullscreen) || this;
        }
        Object.defineProperty(Fullscreen2.prototype, "payload", {
          /**
           * Returns the action set payload
           */
          get: function() {
            return { id: this.id };
          },
          enumerable: false,
          configurable: true
        });
        Fullscreen2.prototype.dispatch = function(action) {
          this.app.dispatch(helper_1.actionWrapper({
            group: this.group,
            type: action,
            payload: this.payload
          }));
          return this;
        };
        return Fullscreen2;
      }(ActionSet_1.ActionSet)
    );
    exports.Fullscreen = Fullscreen;
  }
});

// node_modules/@shopify/app-bridge/actions/Fullscreen/index.js
var require_Fullscreen2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Fullscreen/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.Action = exports.Fullscreen = exports.exit = exports.enter = void 0;
    var Fullscreen_1 = require_Fullscreen();
    Object.defineProperty(exports, "Fullscreen", { enumerable: true, get: function() {
      return Fullscreen_1.Fullscreen;
    } });
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Fullscreen_1.Action;
    } });
    var Fullscreen_2 = require_Fullscreen();
    Object.defineProperty(exports, "enter", { enumerable: true, get: function() {
      return Fullscreen_2.enter;
    } });
    Object.defineProperty(exports, "exit", { enumerable: true, get: function() {
      return Fullscreen_2.exit;
    } });
    function create(app) {
      return new Fullscreen_1.Fullscreen(app);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/LeaveConfirmation/index.js
var require_LeaveConfirmation = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/LeaveConfirmation/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LeaveConfirmation = exports.confirm = exports.disable = exports.enable = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["ENABLE"] = "APP::LEAVE_CONFIRMATION::ENABLE";
      Action3["DISABLE"] = "APP::LEAVE_CONFIRMATION::DISABLE";
      Action3["CONFIRM"] = "APP::LEAVE_CONFIRMATION::CONFIRM";
    })(Action2 = exports.Action || (exports.Action = {}));
    function enable(payload) {
      if (payload === void 0) {
        payload = {};
      }
      return helper_1.actionWrapper({
        group: types_1.Group.LeaveConfirmation,
        payload,
        type: Action2.ENABLE
      });
    }
    exports.enable = enable;
    function disable(payload) {
      if (payload === void 0) {
        payload = {};
      }
      return helper_1.actionWrapper({
        group: types_1.Group.LeaveConfirmation,
        payload,
        type: Action2.DISABLE
      });
    }
    exports.disable = disable;
    function confirm(payload) {
      if (payload === void 0) {
        payload = {};
      }
      return helper_1.actionWrapper({
        group: types_1.Group.LeaveConfirmation,
        payload,
        type: Action2.CONFIRM
      });
    }
    exports.confirm = confirm;
    var LeaveConfirmation = (
      /** @class */
      function(_super) {
        __extends(LeaveConfirmation2, _super);
        function LeaveConfirmation2(app, options) {
          if (options === void 0) {
            options = {};
          }
          var _this = _super.call(this, app, types_1.Group.LeaveConfirmation, types_1.Group.LeaveConfirmation) || this;
          _this.options = options;
          _this.set(options);
          return _this;
        }
        Object.defineProperty(LeaveConfirmation2.prototype, "payload", {
          /**
           * Returns the action set payload
           */
          get: function() {
            return __assign({ id: this.id }, this.options);
          },
          enumerable: false,
          configurable: true
        });
        LeaveConfirmation2.prototype.set = function(options) {
          this.options = helper_1.getMergedProps(this.options, options);
          return this;
        };
        LeaveConfirmation2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.ENABLE: {
              var enableAction = enable(this.payload);
              this.app.dispatch(enableAction);
              break;
            }
            case Action2.DISABLE: {
              var disableAction = disable(this.payload);
              this.app.dispatch(disableAction);
              break;
            }
            case Action2.CONFIRM: {
              var confirmAction = confirm(this.payload);
              this.app.dispatch(confirmAction);
              break;
            }
          }
          return this;
        };
        return LeaveConfirmation2;
      }(ActionSet_1.ActionSet)
    );
    exports.LeaveConfirmation = LeaveConfirmation;
  }
});

// node_modules/@shopify/app-bridge/actions/LeaveConfirmation/index.js
var require_LeaveConfirmation2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/LeaveConfirmation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.LeaveConfirmation = exports.confirm = exports.disable = exports.enable = exports.Action = void 0;
    var LeaveConfirmation_1 = require_LeaveConfirmation();
    Object.defineProperty(exports, "LeaveConfirmation", { enumerable: true, get: function() {
      return LeaveConfirmation_1.LeaveConfirmation;
    } });
    var LeaveConfirmation_2 = require_LeaveConfirmation();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return LeaveConfirmation_2.Action;
    } });
    Object.defineProperty(exports, "enable", { enumerable: true, get: function() {
      return LeaveConfirmation_2.enable;
    } });
    Object.defineProperty(exports, "disable", { enumerable: true, get: function() {
      return LeaveConfirmation_2.disable;
    } });
    Object.defineProperty(exports, "confirm", { enumerable: true, get: function() {
      return LeaveConfirmation_2.confirm;
    } });
    function create(app, options) {
      if (options === void 0) {
        options = {};
      }
      return new LeaveConfirmation_1.LeaveConfirmation(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Loading/index.js
var require_Loading = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Loading/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Loading = exports.stop = exports.start = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["START"] = "APP::LOADING::START";
      Action3["STOP"] = "APP::LOADING::STOP";
    })(Action2 = exports.Action || (exports.Action = {}));
    function start(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Loading,
        type: Action2.START
      });
    }
    exports.start = start;
    function stop(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Loading,
        type: Action2.STOP
      });
    }
    exports.stop = stop;
    var Loading = (
      /** @class */
      function(_super) {
        __extends(Loading2, _super);
        function Loading2(app) {
          return _super.call(this, app, types_1.Group.Loading, types_1.Group.Loading) || this;
        }
        Object.defineProperty(Loading2.prototype, "payload", {
          get: function() {
            return { id: this.id };
          },
          enumerable: false,
          configurable: true
        });
        Loading2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.START:
              this.app.dispatch(start(this.payload));
              break;
            case Action2.STOP:
              this.app.dispatch(stop(this.payload));
              break;
          }
          return this;
        };
        return Loading2;
      }(ActionSet_1.ActionSet)
    );
    exports.Loading = Loading;
  }
});

// node_modules/@shopify/app-bridge/actions/Loading/index.js
var require_Loading2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Loading/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.stop = exports.start = exports.Action = exports.Loading = void 0;
    var Loading_1 = require_Loading();
    Object.defineProperty(exports, "Loading", { enumerable: true, get: function() {
      return Loading_1.Loading;
    } });
    var Loading_2 = require_Loading();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Loading_2.Action;
    } });
    Object.defineProperty(exports, "start", { enumerable: true, get: function() {
      return Loading_2.start;
    } });
    Object.defineProperty(exports, "stop", { enumerable: true, get: function() {
      return Loading_2.stop;
    } });
    function create(app) {
      return new Loading_1.Loading(app);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Modal/index.js
var require_Modal = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Modal/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModalIframe = exports.ModalMessage = exports.Modal = exports.isMessageModal = exports.isIframeModal = exports.data = exports.update = exports.clickFooterButton = exports.updateModalSize = exports.closeModal = exports.openModal = exports.Size = exports.Action = void 0;
    var buttonHelper_1 = require_buttonHelper();
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Button_1 = require_Button();
    var Action2;
    (function(Action3) {
      Action3["OPEN"] = "APP::MODAL::OPEN";
      Action3["CLOSE"] = "APP::MODAL::CLOSE";
      Action3["UPDATE"] = "APP::MODAL::UPDATE";
      Action3["UPDATE_CONTENT"] = "APP::MODAL::CONTENT::UPDATE";
      Action3["FOOTER_BUTTON_CLICK"] = "APP::MODAL::FOOTER::BUTTON::CLICK";
      Action3["FOOTER_BUTTON_UPDATE"] = "APP::MODAL::FOOTER::BUTTON::UPDATE";
      Action3["UPDATE_SIZE"] = "APP::MODAL::UPDATE_SIZE";
      Action3["DATA"] = "APP::MODAL::DATA";
    })(Action2 = exports.Action || (exports.Action = {}));
    var Size;
    (function(Size2) {
      Size2["Small"] = "small";
      Size2["Medium"] = "medium";
      Size2["Large"] = "large";
      Size2["Full"] = "full";
      Size2["Auto"] = "auto";
    })(Size = exports.Size || (exports.Size = {}));
    var FOOTER_BUTTON_PROPS = {
      group: types_1.Group.Modal,
      subgroups: ["Footer"],
      type: types_1.ComponentType.Button
    };
    function openModal(modalPayload) {
      return helper_1.actionWrapper({
        group: types_1.Group.Modal,
        payload: modalPayload,
        type: Action2.OPEN
      });
    }
    exports.openModal = openModal;
    function closeModal(modalClosePayload) {
      return helper_1.actionWrapper({
        group: types_1.Group.Modal,
        payload: modalClosePayload,
        type: Action2.CLOSE
      });
    }
    exports.closeModal = closeModal;
    function updateModalSize(updateSizePayload) {
      return helper_1.actionWrapper({
        group: types_1.Group.Modal,
        payload: updateSizePayload,
        type: Action2.UPDATE_SIZE
      });
    }
    exports.updateModalSize = updateModalSize;
    function clickFooterButton(id, payload) {
      var component = __assign({ id }, FOOTER_BUTTON_PROPS);
      return Button_1.clickButton(types_1.Group.Modal, component, payload);
    }
    exports.clickFooterButton = clickFooterButton;
    function update(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Modal,
        type: Action2.UPDATE
      });
    }
    exports.update = update;
    function data(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Modal,
        type: Action2.DATA
      });
    }
    exports.data = data;
    function isIframeModal(options) {
      return typeof options.url === "string" || typeof options.path === "string";
    }
    exports.isIframeModal = isIframeModal;
    function isMessageModal(options) {
      return typeof options.message === "string";
    }
    exports.isMessageModal = isMessageModal;
    var Modal2 = (
      /** @class */
      function(_super) {
        __extends(Modal3, _super);
        function Modal3() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.size = Size.Small;
          return _this;
        }
        Object.defineProperty(Modal3.prototype, "footer", {
          get: function() {
            if (!this.footerPrimary && !this.footerSecondary) {
              return void 0;
            }
            return {
              buttons: {
                primary: this.footerPrimary,
                secondary: this.footerSecondary
              }
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(Modal3.prototype, "footerOptions", {
          get: function() {
            if (!this.footerPrimaryOptions && !this.footerSecondaryOptions) {
              return void 0;
            }
            return {
              buttons: {
                primary: this.footerPrimaryOptions,
                secondary: this.footerSecondaryOptions
              }
            };
          },
          enumerable: false,
          configurable: true
        });
        Modal3.prototype.close = function() {
          this.app.dispatch(closeModal({ id: this.id }));
        };
        Modal3.prototype.setFooterPrimaryButton = function(newOptions, updateCb) {
          var _this = this;
          var subgroups = FOOTER_BUTTON_PROPS.subgroups;
          this.footerPrimaryOptions = this.getChildButton(newOptions, this.footerPrimaryOptions);
          this.footerPrimary = this.footerPrimaryOptions ? buttonHelper_1.getSingleButton(this, this.footerPrimaryOptions, subgroups, function(newPayload) {
            _this.updatePrimaryFooterButton(newPayload, updateCb);
          }) : void 0;
        };
        Modal3.prototype.setFooterSecondaryButtons = function(newOptions, updateCb) {
          var _this = this;
          var subgroups = FOOTER_BUTTON_PROPS.subgroups;
          var newButtons = newOptions || [];
          var currentOptions = this.footerOptions && this.footerOptions.buttons.secondary || [];
          this.footerSecondaryOptions = this.getUpdatedChildActions(newButtons, currentOptions);
          this.footerSecondary = this.footerSecondaryOptions ? this.footerSecondaryOptions.map(function(action) {
            return buttonHelper_1.getSingleButton(_this, action, subgroups, function(newPayload) {
              _this.updateSecondaryFooterButton(newPayload, updateCb);
            });
          }) : void 0;
        };
        Modal3.prototype.getChildButton = function(newAction, currentAction) {
          var newButtons = newAction ? [newAction] : [];
          var currentButtons = currentAction ? [currentAction] : [];
          var updatedButton = this.getUpdatedChildActions(newButtons, currentButtons);
          return updatedButton ? updatedButton[0] : void 0;
        };
        Modal3.prototype.updatePrimaryFooterButton = function(newPayload, updateCb) {
          if (!this.footer || !this.footer.buttons.primary) {
            return;
          }
          if (helper_1.updateActionFromPayload(this.footer.buttons.primary, newPayload)) {
            updateCb();
          }
        };
        Modal3.prototype.updateSecondaryFooterButton = function(newPayload, updateCb) {
          if (!this.footer || !this.footer.buttons || !this.footer.buttons.secondary) {
            return;
          }
          var updated;
          for (var _i = 0, _a = this.footer.buttons.secondary; _i < _a.length; _i++) {
            var action = _a[_i];
            updated = helper_1.updateActionFromPayload(action, newPayload);
            if (updated) {
              break;
            }
          }
          if (updated) {
            updateCb();
          }
        };
        return Modal3;
      }(ActionSet_1.ActionSetWithChildren)
    );
    exports.Modal = Modal2;
    var ModalMessage = (
      /** @class */
      function(_super) {
        __extends(ModalMessage2, _super);
        function ModalMessage2(app, options) {
          var _this = _super.call(this, app, types_1.Group.Modal, types_1.Group.Modal) || this;
          _this.set(options, false);
          return _this;
        }
        Object.defineProperty(ModalMessage2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { footer: this.footer, id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(ModalMessage2.prototype, "options", {
          get: function() {
            return {
              footer: this.footerOptions,
              message: this.message,
              size: this.size,
              title: this.title
            };
          },
          enumerable: false,
          configurable: true
        });
        ModalMessage2.prototype.set = function(options, shouldUpdate) {
          var _this = this;
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var title = mergedOptions.title, footer = mergedOptions.footer, message = mergedOptions.message, size = mergedOptions.size;
          this.title = title;
          this.message = message;
          this.size = size;
          this.setFooterPrimaryButton(footer ? footer.buttons.primary : void 0, function() {
            _this.dispatch(Action2.UPDATE);
          });
          this.setFooterSecondaryButtons(footer ? footer.buttons.secondary : void 0, function() {
            _this.dispatch(Action2.UPDATE);
          });
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        ModalMessage2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.OPEN:
              this.app.dispatch(openModal(this.payload));
              break;
            case Action2.CLOSE:
              this.close();
              break;
            case Action2.UPDATE:
              this.app.dispatch(update(this.payload));
              break;
          }
          return this;
        };
        return ModalMessage2;
      }(Modal2)
    );
    exports.ModalMessage = ModalMessage;
    var ModalIframe = (
      /** @class */
      function(_super) {
        __extends(ModalIframe2, _super);
        function ModalIframe2(app, options) {
          var _this = _super.call(this, app, types_1.Group.Modal, types_1.Group.Modal) || this;
          _this.set(options, false);
          return _this;
        }
        Object.defineProperty(ModalIframe2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { footer: this.footer, id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(ModalIframe2.prototype, "options", {
          get: function() {
            return {
              footer: this.footerOptions,
              path: this.path,
              size: this.size,
              title: this.title,
              url: this.url,
              loading: this.loading
            };
          },
          enumerable: false,
          configurable: true
        });
        ModalIframe2.prototype.set = function(options, shouldUpdate) {
          var _this = this;
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var title = mergedOptions.title, footer = mergedOptions.footer, path = mergedOptions.path, url = mergedOptions.url, size = mergedOptions.size, loading = mergedOptions.loading;
          this.title = title;
          this.url = url;
          this.path = path;
          this.size = size;
          this.loading = loading;
          this.setFooterPrimaryButton(footer ? footer.buttons.primary : void 0, function() {
            _this.dispatch(Action2.UPDATE);
          });
          this.setFooterSecondaryButtons(footer ? footer.buttons.secondary : void 0, function() {
            _this.dispatch(Action2.UPDATE);
          });
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        ModalIframe2.prototype.dispatch = function(action, payload) {
          switch (action) {
            case Action2.OPEN:
              this.app.dispatch(openModal(this.payload));
              break;
            case Action2.CLOSE:
              this.close();
              break;
            case Action2.UPDATE:
              this.app.dispatch(update(this.payload));
              break;
            case Action2.DATA:
              this.app.dispatch(data(payload || {}));
              break;
          }
          return this;
        };
        return ModalIframe2;
      }(Modal2)
    );
    exports.ModalIframe = ModalIframe;
  }
});

// node_modules/@shopify/app-bridge/actions/Modal/index.js
var require_Modal2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Modal/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.Modal = exports.isMessageModal = exports.data = exports.update = exports.clickFooterButton = exports.updateModalSize = exports.closeModal = exports.openModal = exports.Size = exports.Action = exports.isIframeModal = exports.ModalMessage = exports.ModalIframe = void 0;
    var Modal_1 = require_Modal();
    Object.defineProperty(exports, "ModalIframe", { enumerable: true, get: function() {
      return Modal_1.ModalIframe;
    } });
    Object.defineProperty(exports, "ModalMessage", { enumerable: true, get: function() {
      return Modal_1.ModalMessage;
    } });
    Object.defineProperty(exports, "isIframeModal", { enumerable: true, get: function() {
      return Modal_1.isIframeModal;
    } });
    var Modal_2 = require_Modal();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Modal_2.Action;
    } });
    Object.defineProperty(exports, "Size", { enumerable: true, get: function() {
      return Modal_2.Size;
    } });
    Object.defineProperty(exports, "openModal", { enumerable: true, get: function() {
      return Modal_2.openModal;
    } });
    Object.defineProperty(exports, "closeModal", { enumerable: true, get: function() {
      return Modal_2.closeModal;
    } });
    Object.defineProperty(exports, "updateModalSize", { enumerable: true, get: function() {
      return Modal_2.updateModalSize;
    } });
    Object.defineProperty(exports, "clickFooterButton", { enumerable: true, get: function() {
      return Modal_2.clickFooterButton;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return Modal_2.update;
    } });
    Object.defineProperty(exports, "data", { enumerable: true, get: function() {
      return Modal_2.data;
    } });
    Object.defineProperty(exports, "isMessageModal", { enumerable: true, get: function() {
      return Modal_2.isMessageModal;
    } });
    Object.defineProperty(exports, "Modal", { enumerable: true, get: function() {
      return Modal_2.Modal;
    } });
    var create = function(app, options) {
      if (Modal_1.isIframeModal(options)) {
        return new Modal_1.ModalIframe(app, options);
      }
      return new Modal_1.ModalMessage(app, options);
    };
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Modal/ModalContent/index.js
var require_ModalContent = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Modal/ModalContent/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModalContent = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var index_1 = require_Modal();
    var Action2;
    (function(Action3) {
      Action3["LOADING"] = "LOADING";
      Action3["LOADED"] = "LOADED";
    })(Action2 = exports.Action || (exports.Action = {}));
    var ModalContent = (
      /** @class */
      function(_super) {
        __extends(ModalContent2, _super);
        function ModalContent2(app, options) {
          return _super.call(this, app, types_1.Group.Modal, types_1.Group.Modal, options ? options.id : void 0) || this;
        }
        ModalContent2.prototype.loaded = function() {
          this.dispatch(Action2.LOADED);
        };
        ModalContent2.prototype.loading = function() {
          this.dispatch(Action2.LOADING);
        };
        ModalContent2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.LOADED:
              this.dispatchModalAction(index_1.Action.UPDATE_CONTENT, { loading: false });
              break;
            case Action2.LOADING:
              this.dispatchModalAction(index_1.Action.UPDATE_CONTENT, { loading: true });
              break;
          }
          return this;
        };
        ModalContent2.prototype.dispatchModalAction = function(type, payload) {
          return __awaiter(this, void 0, void 0, function() {
            var updateAction;
            return __generator(this, function(_a) {
              updateAction = helper_1.actionWrapper({
                type,
                group: types_1.Group.Modal,
                payload: __assign({}, payload)
              });
              this.app.dispatch(updateAction);
              return [
                2
                /*return*/
              ];
            });
          });
        };
        return ModalContent2;
      }(ActionSet_1.ActionSet)
    );
    exports.ModalContent = ModalContent;
  }
});

// node_modules/@shopify/app-bridge/actions/Modal/ModalContent/index.js
var require_ModalContent2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Modal/ModalContent/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.ModalContent = exports.Action = void 0;
    var ModalContent_1 = require_ModalContent();
    Object.defineProperty(exports, "ModalContent", { enumerable: true, get: function() {
      return ModalContent_1.ModalContent;
    } });
    var ModalContent_2 = require_ModalContent();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return ModalContent_2.Action;
    } });
    function create(app, options) {
      return new ModalContent_1.ModalContent(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Navigation/History/index.js
var require_History = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Navigation/History/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.History = exports.replace = exports.push = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["PUSH"] = "APP::NAVIGATION::HISTORY::PUSH";
      Action3["REPLACE"] = "APP::NAVIGATION::HISTORY::REPLACE";
    })(Action2 = exports.Action || (exports.Action = {}));
    function push(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Navigation,
        type: Action2.PUSH
      });
    }
    exports.push = push;
    function replace(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Navigation,
        type: Action2.REPLACE
      });
    }
    exports.replace = replace;
    var History = (
      /** @class */
      function(_super) {
        __extends(History2, _super);
        function History2(app) {
          return _super.call(this, app, "History", types_1.Group.Navigation) || this;
        }
        Object.defineProperty(History2.prototype, "payload", {
          get: function() {
            return { id: this.id };
          },
          enumerable: false,
          configurable: true
        });
        History2.prototype.dispatch = function(type, path) {
          var payload = __assign(__assign({}, this.payload), { path });
          switch (type) {
            case Action2.PUSH:
              this.app.dispatch(push(payload));
              break;
            case Action2.REPLACE:
              this.app.dispatch(replace(payload));
              break;
          }
          return this;
        };
        return History2;
      }(ActionSet_1.ActionSet)
    );
    exports.History = History;
  }
});

// node_modules/@shopify/app-bridge/actions/Navigation/History/index.js
var require_History2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Navigation/History/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.replace = exports.push = exports.Action = exports.History = void 0;
    var History_1 = require_History();
    Object.defineProperty(exports, "History", { enumerable: true, get: function() {
      return History_1.History;
    } });
    var History_2 = require_History();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return History_2.Action;
    } });
    Object.defineProperty(exports, "push", { enumerable: true, get: function() {
      return History_2.push;
    } });
    Object.defineProperty(exports, "replace", { enumerable: true, get: function() {
      return History_2.replace;
    } });
    function create(app) {
      return new History_1.History(app);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Navigation/Redirect/index.js
var require_Redirect = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Navigation/Redirect/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Redirect = exports.isProductVariantResourcePayload = exports.isCreateResourcePayload = exports.isAdminSection = exports.isRemotePayload = exports.isAdminSectionPayload = exports.isAdminPathPayload = exports.isAppPayload = exports.getRelativePath = exports.normalizeUrl = exports.getPathWithSearchAndHash = exports.toDestination = exports.toApp = exports.toRemote = exports.toAdminSection = exports.toAdminPath = exports.isResourcePayload = exports.ResourceType = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["ADMIN_SECTION"] = "APP::NAVIGATION::REDIRECT::ADMIN::SECTION";
      Action3["ADMIN_PATH"] = "APP::NAVIGATION::REDIRECT::ADMIN::PATH";
      Action3["REMOTE"] = "APP::NAVIGATION::REDIRECT::REMOTE";
      Action3["APP"] = "APP::NAVIGATION::REDIRECT::APP";
    })(Action2 = exports.Action || (exports.Action = {}));
    var ResourceType;
    (function(ResourceType2) {
      ResourceType2["Product"] = "products";
      ResourceType2["Collection"] = "collections";
      ResourceType2["Order"] = "orders";
      ResourceType2["Customer"] = "customers";
      ResourceType2["Discount"] = "discounts";
    })(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
    function isResourcePayload(resource) {
      return typeof resource.id === "string";
    }
    exports.isResourcePayload = isResourcePayload;
    function toAdminPath(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Navigation,
        type: Action2.ADMIN_PATH
      });
    }
    exports.toAdminPath = toAdminPath;
    function toAdminSection(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Navigation,
        type: Action2.ADMIN_SECTION
      });
    }
    exports.toAdminSection = toAdminSection;
    function toRemote(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Navigation,
        type: Action2.REMOTE
      });
    }
    exports.toRemote = toRemote;
    function toApp(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Navigation,
        type: Action2.APP
      });
    }
    exports.toApp = toApp;
    function toDestination(action, payload, id) {
      switch (action) {
        case Action2.APP: {
          var appPayload = isAppPayload(payload) ? payload : { path: payload };
          return toApp(__assign({ id }, appPayload));
        }
        case Action2.ADMIN_PATH: {
          var adminPathPayload = isAdminPathPayload(payload) ? payload : { path: payload };
          return toAdminPath(__assign({ id }, adminPathPayload));
        }
        case Action2.ADMIN_SECTION: {
          var adminSectionPayload = isAdminSectionPayload(payload) ? payload : { section: payload };
          return toAdminSection(__assign({ id }, adminSectionPayload));
        }
        case Action2.REMOTE: {
          var remotePayload = isRemotePayload(payload) ? payload : { url: payload };
          return toRemote(__assign({ id }, remotePayload));
        }
      }
    }
    exports.toDestination = toDestination;
    function getPathWithSearchAndHash(_a) {
      var pathname = _a.pathname, search = _a.search, hash = _a.hash;
      return "" + pathname + (search || "") + (hash || "");
    }
    exports.getPathWithSearchAndHash = getPathWithSearchAndHash;
    function normalizeUrl(to) {
      if (to instanceof URL) {
        return to.toString();
      }
      if (typeof to === "string") {
        return to;
      }
      return getRelativePath(to);
    }
    exports.normalizeUrl = normalizeUrl;
    function getRelativePath(to) {
      if (typeof to === "string") {
        if (to.startsWith("/")) {
          return to;
        }
        return getPathWithSearchAndHash(new URL(to));
      }
      var search = to.search instanceof URLSearchParams ? to.search.toString() : to.search;
      return getPathWithSearchAndHash(__assign(__assign({}, to), { search }));
    }
    exports.getRelativePath = getRelativePath;
    function isAppPayload(payload) {
      return typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "path");
    }
    exports.isAppPayload = isAppPayload;
    function isAdminPathPayload(payload) {
      return typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "path");
    }
    exports.isAdminPathPayload = isAdminPathPayload;
    function isAdminSectionPayload(payload) {
      return typeof payload === "object" && typeof payload.section === "object" && Object.prototype.hasOwnProperty.call(payload.section, "name");
    }
    exports.isAdminSectionPayload = isAdminSectionPayload;
    function isRemotePayload(payload) {
      return typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "url");
    }
    exports.isRemotePayload = isRemotePayload;
    function isAdminSection(to) {
      return typeof to === "object" && typeof (to === null || to === void 0 ? void 0 : to.name) === "string";
    }
    exports.isAdminSection = isAdminSection;
    function isCreateResourcePayload(resource) {
      return resource.create === true;
    }
    exports.isCreateResourcePayload = isCreateResourcePayload;
    function isProductVariantResourcePayload(resource) {
      var castResource = resource;
      return castResource.id !== void 0 && castResource.variant !== void 0;
    }
    exports.isProductVariantResourcePayload = isProductVariantResourcePayload;
    var Redirect4 = (
      /** @class */
      function(_super) {
        __extends(Redirect5, _super);
        function Redirect5(app) {
          return _super.call(this, app, "Redirect", types_1.Group.Navigation) || this;
        }
        Object.defineProperty(Redirect5.prototype, "payload", {
          get: function() {
            return { id: this.id };
          },
          enumerable: false,
          configurable: true
        });
        Redirect5.prototype.dispatch = function(action, payload) {
          var redirectAction = toDestination(action, payload, this.payload.id);
          this.app.dispatch(redirectAction);
          return this;
        };
        return Redirect5;
      }(ActionSet_1.ActionSet)
    );
    exports.Redirect = Redirect4;
  }
});

// node_modules/@shopify/app-bridge/actions/Navigation/Redirect/index.js
var require_Redirect2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Navigation/Redirect/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.isProductVariantCreateResourcePayload = exports.isProductVariantResourcePayload = exports.isCreateResourcePayload = exports.isAdminSection = exports.isRemotePayload = exports.isAdminSectionPayload = exports.isAdminPathPayload = exports.isAppPayload = exports.getRelativePath = exports.normalizeUrl = exports.getPathWithSearchAndHash = exports.toDestination = exports.toApp = exports.toRemote = exports.toAdminSection = exports.toAdminPath = exports.isResourcePayload = exports.ResourceType = exports.Action = exports.Redirect = void 0;
    var Redirect_1 = require_Redirect();
    Object.defineProperty(exports, "Redirect", { enumerable: true, get: function() {
      return Redirect_1.Redirect;
    } });
    Object.defineProperty(exports, "isCreateResourcePayload", { enumerable: true, get: function() {
      return Redirect_1.isCreateResourcePayload;
    } });
    Object.defineProperty(exports, "isProductVariantResourcePayload", { enumerable: true, get: function() {
      return Redirect_1.isProductVariantResourcePayload;
    } });
    var Redirect_2 = require_Redirect();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Redirect_2.Action;
    } });
    Object.defineProperty(exports, "ResourceType", { enumerable: true, get: function() {
      return Redirect_2.ResourceType;
    } });
    Object.defineProperty(exports, "isResourcePayload", { enumerable: true, get: function() {
      return Redirect_2.isResourcePayload;
    } });
    Object.defineProperty(exports, "toAdminPath", { enumerable: true, get: function() {
      return Redirect_2.toAdminPath;
    } });
    Object.defineProperty(exports, "toAdminSection", { enumerable: true, get: function() {
      return Redirect_2.toAdminSection;
    } });
    Object.defineProperty(exports, "toRemote", { enumerable: true, get: function() {
      return Redirect_2.toRemote;
    } });
    Object.defineProperty(exports, "toApp", { enumerable: true, get: function() {
      return Redirect_2.toApp;
    } });
    Object.defineProperty(exports, "toDestination", { enumerable: true, get: function() {
      return Redirect_2.toDestination;
    } });
    Object.defineProperty(exports, "getPathWithSearchAndHash", { enumerable: true, get: function() {
      return Redirect_2.getPathWithSearchAndHash;
    } });
    Object.defineProperty(exports, "normalizeUrl", { enumerable: true, get: function() {
      return Redirect_2.normalizeUrl;
    } });
    Object.defineProperty(exports, "getRelativePath", { enumerable: true, get: function() {
      return Redirect_2.getRelativePath;
    } });
    Object.defineProperty(exports, "isAppPayload", { enumerable: true, get: function() {
      return Redirect_2.isAppPayload;
    } });
    Object.defineProperty(exports, "isAdminPathPayload", { enumerable: true, get: function() {
      return Redirect_2.isAdminPathPayload;
    } });
    Object.defineProperty(exports, "isAdminSectionPayload", { enumerable: true, get: function() {
      return Redirect_2.isAdminSectionPayload;
    } });
    Object.defineProperty(exports, "isRemotePayload", { enumerable: true, get: function() {
      return Redirect_2.isRemotePayload;
    } });
    Object.defineProperty(exports, "isAdminSection", { enumerable: true, get: function() {
      return Redirect_2.isAdminSection;
    } });
    function isProductVariantCreateResourcePayload(resource) {
      if (!Redirect_1.isProductVariantResourcePayload(resource)) {
        return false;
      }
      return Redirect_1.isCreateResourcePayload(resource.variant);
    }
    exports.isProductVariantCreateResourcePayload = isProductVariantCreateResourcePayload;
    function create(app) {
      return new Redirect_1.Redirect(app);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Print/index.js
var require_Print = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Print/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.app = exports.Action = void 0;
    var helper_1 = require_helper();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["APP"] = "APP::PRINT::APP";
    })(Action2 = exports.Action || (exports.Action = {}));
    function app() {
      return helper_1.actionWrapper({
        group: types_1.Group.Print,
        type: Action2.APP
      });
    }
    exports.app = app;
  }
});

// node_modules/@shopify/app-bridge/actions/Print/index.js
var require_Print2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Print/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.app = exports.Action = void 0;
    var Print_1 = require_Print();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Print_1.Action;
    } });
    Object.defineProperty(exports, "app", { enumerable: true, get: function() {
      return Print_1.app;
    } });
  }
});

// node_modules/@shopify/app-bridge-core/actions/ResourcePicker/index.js
var require_ResourcePicker = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/ResourcePicker/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResourcePicker = exports.update = exports.close = exports.cancel = exports.open = exports.select = exports.ActionVerb = exports.ResourceType = exports.ProductStatus = exports.ProductVariantInventoryManagement = exports.ProductVariantInventoryPolicy = exports.WeightUnit = exports.FulfillmentServiceType = exports.CollectionSortOrder = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["OPEN"] = "APP::RESOURCE_PICKER::OPEN";
      Action3["SELECT"] = "APP::RESOURCE_PICKER::SELECT";
      Action3["CLOSE"] = "APP::RESOURCE_PICKER::CLOSE";
      Action3["UPDATE"] = "APP::RESOURCE_PICKER::UPDATE";
      Action3["CANCEL"] = "APP::RESOURCE_PICKER::CANCEL";
    })(Action2 = exports.Action || (exports.Action = {}));
    var CollectionSortOrder;
    (function(CollectionSortOrder2) {
      CollectionSortOrder2["Manual"] = "MANUAL";
      CollectionSortOrder2["BestSelling"] = "BEST_SELLING";
      CollectionSortOrder2["AlphaAsc"] = "ALPHA_ASC";
      CollectionSortOrder2["AlphaDesc"] = "ALPHA_DESC";
      CollectionSortOrder2["PriceDesc"] = "PRICE_DESC";
      CollectionSortOrder2["PriceAsc"] = "PRICE_ASC";
      CollectionSortOrder2["CreatedDesc"] = "CREATED_DESC";
      CollectionSortOrder2["Created"] = "CREATED";
      CollectionSortOrder2["MostRelevant"] = "MOST_RELEVANT";
    })(CollectionSortOrder = exports.CollectionSortOrder || (exports.CollectionSortOrder = {}));
    var FulfillmentServiceType;
    (function(FulfillmentServiceType2) {
      FulfillmentServiceType2["GiftCard"] = "GIFT_CARD";
      FulfillmentServiceType2["Manual"] = "MANUAL";
      FulfillmentServiceType2["ThirdParty"] = "THIRD_PARTY";
    })(FulfillmentServiceType = exports.FulfillmentServiceType || (exports.FulfillmentServiceType = {}));
    var WeightUnit;
    (function(WeightUnit2) {
      WeightUnit2["Kilograms"] = "KILOGRAMS";
      WeightUnit2["Grams"] = "GRAMS";
      WeightUnit2["Pounds"] = "POUNDS";
      WeightUnit2["Ounces"] = "OUNCES";
    })(WeightUnit = exports.WeightUnit || (exports.WeightUnit = {}));
    var ProductVariantInventoryPolicy;
    (function(ProductVariantInventoryPolicy2) {
      ProductVariantInventoryPolicy2["Deny"] = "DENY";
      ProductVariantInventoryPolicy2["Continue"] = "CONTINUE";
    })(ProductVariantInventoryPolicy = exports.ProductVariantInventoryPolicy || (exports.ProductVariantInventoryPolicy = {}));
    var ProductVariantInventoryManagement;
    (function(ProductVariantInventoryManagement2) {
      ProductVariantInventoryManagement2["Shopify"] = "SHOPIFY";
      ProductVariantInventoryManagement2["NotManaged"] = "NOT_MANAGED";
      ProductVariantInventoryManagement2["FulfillmentService"] = "FULFILLMENT_SERVICE";
    })(ProductVariantInventoryManagement = exports.ProductVariantInventoryManagement || (exports.ProductVariantInventoryManagement = {}));
    var ProductStatus;
    (function(ProductStatus2) {
      ProductStatus2["Active"] = "ACTIVE";
      ProductStatus2["Archived"] = "ARCHIVED";
      ProductStatus2["Draft"] = "DRAFT";
    })(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
    var ResourceType;
    (function(ResourceType2) {
      ResourceType2["Product"] = "product";
      ResourceType2["ProductVariant"] = "variant";
      ResourceType2["Collection"] = "collection";
    })(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
    var ActionVerb;
    (function(ActionVerb2) {
      ActionVerb2["Add"] = "add";
      ActionVerb2["Select"] = "select";
    })(ActionVerb = exports.ActionVerb || (exports.ActionVerb = {}));
    function select(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.ResourcePicker,
        type: Action2.SELECT
      });
    }
    exports.select = select;
    function open(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.ResourcePicker,
        type: Action2.OPEN
      });
    }
    exports.open = open;
    function cancel(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.ResourcePicker,
        type: Action2.CANCEL
      });
    }
    exports.cancel = cancel;
    function close(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.ResourcePicker,
        type: Action2.CANCEL
      });
    }
    exports.close = close;
    function update(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.ResourcePicker,
        type: Action2.UPDATE
      });
    }
    exports.update = update;
    var ResourcePicker = (
      /** @class */
      function(_super) {
        __extends(ResourcePicker2, _super);
        function ResourcePicker2(app, options, resourceType) {
          var _this = _super.call(this, app, types_1.Group.ResourcePicker, types_1.Group.ResourcePicker) || this;
          _this.initialSelectionIds = [];
          _this.selection = [];
          _this.resourceType = resourceType;
          _this.set(options, false);
          return _this;
        }
        Object.defineProperty(ResourcePicker2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { id: this.id, resourceType: this.resourceType });
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(ResourcePicker2.prototype, "options", {
          get: function() {
            var options = {
              initialQuery: this.initialQuery,
              selectMultiple: this.selectMultiple,
              initialSelectionIds: this.initialSelectionIds,
              showHidden: this.showHidden,
              actionVerb: this.actionVerb
            };
            if (this.resourceType === ResourceType.Product) {
              var productOptions = __assign(__assign({}, options), { showVariants: this.showVariants, showDraft: this.showDraft, showArchived: this.showArchived, showDraftBadge: this.showDraftBadge, showArchivedBadge: this.showArchivedBadge });
              return productOptions;
            }
            return options;
          },
          enumerable: false,
          configurable: true
        });
        ResourcePicker2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var initialQuery = mergedOptions.initialQuery, _a = mergedOptions.initialSelectionIds, initialSelectionIds = _a === void 0 ? [] : _a, _b = mergedOptions.showHidden, showHidden = _b === void 0 ? true : _b, _c = mergedOptions.showVariants, showVariants = _c === void 0 ? true : _c, _d = mergedOptions.showDraft, showDraft = _d === void 0 ? true : _d, _e = mergedOptions.showArchived, showArchived = _e === void 0 ? true : _e, _f = mergedOptions.showDraftBadge, showDraftBadge = _f === void 0 ? false : _f, _g = mergedOptions.showArchivedBadge, showArchivedBadge = _g === void 0 ? false : _g, _h = mergedOptions.selectMultiple, selectMultiple = _h === void 0 ? true : _h, _j = mergedOptions.actionVerb, actionVerb = _j === void 0 ? ActionVerb.Add : _j;
          this.initialQuery = initialQuery;
          this.initialSelectionIds = initialSelectionIds;
          this.showHidden = showHidden;
          this.showVariants = showVariants;
          this.showDraft = showDraft;
          this.showArchived = showArchived;
          this.showDraftBadge = showDraftBadge;
          this.showArchivedBadge = showArchivedBadge;
          this.selectMultiple = selectMultiple;
          this.actionVerb = actionVerb;
          if (shouldUpdate) {
            this.update();
          }
          return this;
        };
        ResourcePicker2.prototype.dispatch = function(action, selection) {
          if (action === Action2.OPEN) {
            this.open();
          } else if (action === Action2.UPDATE) {
            this.update();
          } else if (action === Action2.CLOSE || action === Action2.CANCEL) {
            this.cancel();
          } else if (action === Action2.SELECT) {
            this.selection = selection;
            this.app.dispatch(select({ id: this.id, selection: this.selection }));
          }
          return this;
        };
        ResourcePicker2.prototype.update = function() {
          this.app.dispatch(update(this.payload));
        };
        ResourcePicker2.prototype.open = function() {
          this.app.dispatch(open(this.payload));
        };
        ResourcePicker2.prototype.cancel = function() {
          this.app.dispatch(cancel({ id: this.id }));
        };
        ResourcePicker2.prototype.close = function() {
          this.cancel();
        };
        return ResourcePicker2;
      }(ActionSet_1.ActionSet)
    );
    exports.ResourcePicker = ResourcePicker;
  }
});

// node_modules/@shopify/app-bridge/actions/ResourcePicker/index.js
var require_ResourcePicker2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/ResourcePicker/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.ResourcePicker = exports.WeightUnit = exports.update = exports.select = exports.ResourceType = exports.ProductVariantInventoryPolicy = exports.ProductVariantInventoryManagement = exports.ProductStatus = exports.open = exports.FulfillmentServiceType = exports.CollectionSortOrder = exports.close = exports.cancel = exports.ActionVerb = exports.Action = void 0;
    var ResourcePicker_1 = require_ResourcePicker();
    Object.defineProperty(exports, "ResourcePicker", { enumerable: true, get: function() {
      return ResourcePicker_1.ResourcePicker;
    } });
    var ResourcePicker_2 = require_ResourcePicker();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return ResourcePicker_2.Action;
    } });
    Object.defineProperty(exports, "ActionVerb", { enumerable: true, get: function() {
      return ResourcePicker_2.ActionVerb;
    } });
    Object.defineProperty(exports, "cancel", { enumerable: true, get: function() {
      return ResourcePicker_2.cancel;
    } });
    Object.defineProperty(exports, "close", { enumerable: true, get: function() {
      return ResourcePicker_2.close;
    } });
    Object.defineProperty(exports, "CollectionSortOrder", { enumerable: true, get: function() {
      return ResourcePicker_2.CollectionSortOrder;
    } });
    Object.defineProperty(exports, "FulfillmentServiceType", { enumerable: true, get: function() {
      return ResourcePicker_2.FulfillmentServiceType;
    } });
    Object.defineProperty(exports, "open", { enumerable: true, get: function() {
      return ResourcePicker_2.open;
    } });
    Object.defineProperty(exports, "ProductStatus", { enumerable: true, get: function() {
      return ResourcePicker_2.ProductStatus;
    } });
    Object.defineProperty(exports, "ProductVariantInventoryManagement", { enumerable: true, get: function() {
      return ResourcePicker_2.ProductVariantInventoryManagement;
    } });
    Object.defineProperty(exports, "ProductVariantInventoryPolicy", { enumerable: true, get: function() {
      return ResourcePicker_2.ProductVariantInventoryPolicy;
    } });
    Object.defineProperty(exports, "ResourceType", { enumerable: true, get: function() {
      return ResourcePicker_2.ResourceType;
    } });
    Object.defineProperty(exports, "select", { enumerable: true, get: function() {
      return ResourcePicker_2.select;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return ResourcePicker_2.update;
    } });
    Object.defineProperty(exports, "WeightUnit", { enumerable: true, get: function() {
      return ResourcePicker_2.WeightUnit;
    } });
    var create = function(app, baseOptions) {
      var resourceType = baseOptions.resourceType, _a = baseOptions.options, options = _a === void 0 ? {} : _a;
      return new ResourcePicker_1.ResourcePicker(app, options, resourceType);
    };
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Scanner/index.js
var require_Scanner = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Scanner/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.capture = exports.openCamera = exports.Scanner = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["OPEN_CAMERA"] = "APP::SCANNER::OPEN::CAMERA";
      Action3["CAPTURE"] = "APP::SCANNER::CAPTURE";
    })(Action2 = exports.Action || (exports.Action = {}));
    var Scanner = (
      /** @class */
      function(_super) {
        __extends(Scanner2, _super);
        function Scanner2(app, options) {
          return _super.call(this, app, types_1.Group.Scanner, types_1.Group.Scanner, options ? options.id : void 0) || this;
        }
        Scanner2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.OPEN_CAMERA:
              this.dispatchScannerAction(Action2.OPEN_CAMERA);
              break;
          }
          return this;
        };
        Scanner2.prototype.dispatchScannerAction = function(type) {
          this.app.dispatch(helper_1.actionWrapper({
            type,
            group: types_1.Group.Scanner,
            payload: {
              id: this.id
            }
          }));
        };
        return Scanner2;
      }(ActionSet_1.ActionSet)
    );
    exports.Scanner = Scanner;
    function openCamera() {
      return helper_1.actionWrapper({
        group: types_1.Group.Scanner,
        type: Action2.OPEN_CAMERA
      });
    }
    exports.openCamera = openCamera;
    function capture(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.Scanner,
        type: Action2.CAPTURE,
        payload
      });
    }
    exports.capture = capture;
  }
});

// node_modules/@shopify/app-bridge/actions/Scanner/index.js
var require_Scanner2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Scanner/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.capture = exports.openCamera = exports.Scanner = exports.Action = void 0;
    var Scanner_1 = require_Scanner();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Scanner_1.Action;
    } });
    Object.defineProperty(exports, "Scanner", { enumerable: true, get: function() {
      return Scanner_1.Scanner;
    } });
    Object.defineProperty(exports, "openCamera", { enumerable: true, get: function() {
      return Scanner_1.openCamera;
    } });
    Object.defineProperty(exports, "capture", { enumerable: true, get: function() {
      return Scanner_1.capture;
    } });
    function create(app, options) {
      return new Scanner_1.Scanner(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/SessionToken/index.js
var require_SessionToken = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/SessionToken/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.respond = exports.request = exports.Action = void 0;
    var helper_1 = require_helper();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["REQUEST"] = "APP::SESSION_TOKEN::REQUEST";
      Action3["RESPOND"] = "APP::SESSION_TOKEN::RESPOND";
    })(Action2 = exports.Action || (exports.Action = {}));
    function request() {
      return helper_1.actionWrapper({
        group: types_1.Group.SessionToken,
        type: Action2.REQUEST
      });
    }
    exports.request = request;
    function respond(sessionToken) {
      return helper_1.actionWrapper({
        payload: sessionToken,
        group: types_1.Group.SessionToken,
        type: Action2.RESPOND
      });
    }
    exports.respond = respond;
  }
});

// node_modules/@shopify/app-bridge/actions/SessionToken/index.js
var require_SessionToken2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/SessionToken/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.respond = exports.request = exports.Action = void 0;
    var SessionToken_1 = require_SessionToken();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return SessionToken_1.Action;
    } });
    Object.defineProperty(exports, "request", { enumerable: true, get: function() {
      return SessionToken_1.request;
    } });
    Object.defineProperty(exports, "respond", { enumerable: true, get: function() {
      return SessionToken_1.respond;
    } });
  }
});

// node_modules/@shopify/app-bridge-core/actions/buttonGroupHelper.js
var require_buttonGroupHelper = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/buttonGroupHelper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getGroupedButton = void 0;
    var ButtonGroup_1 = require_ButtonGroup();
    function getGroupedButton(action, button, subgroups, updateCb) {
      action.addChild(button, action.group, subgroups);
      var id = button.id, label = button.label, disabled = button.disabled, buttons = button.buttons, plain = button.plain;
      action.subscribeToChild(button, ButtonGroup_1.Action.UPDATE, updateCb);
      return { id, label, buttons, disabled, plain };
    }
    exports.getGroupedButton = getGroupedButton;
  }
});

// node_modules/@shopify/app-bridge-core/actions/TitleBar/index.js
var require_TitleBar = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/TitleBar/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TitleBar = exports.update = exports.clickBreadcrumb = exports.clickActionButton = exports.Action = void 0;
    var ActionSet_1 = require_ActionSet();
    var Button_1 = require_Button();
    var ButtonGroup_1 = require_ButtonGroup();
    var buttonGroupHelper_1 = require_buttonGroupHelper();
    var buttonHelper_1 = require_buttonHelper();
    var helper_1 = require_helper();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["UPDATE"] = "APP::TITLEBAR::UPDATE";
      Action3["BUTTON_CLICK"] = "APP::TITLEBAR::BUTTONS::BUTTON::CLICK";
      Action3["BUTTON_UPDATE"] = "APP::TITLEBAR::BUTTONS::BUTTON::UPDATE";
      Action3["BUTTON_GROUP_UPDATE"] = "APP::TITLEBAR::BUTTONS::BUTTONGROUP::UPDATE";
      Action3["BREADCRUMBS_CLICK"] = "APP::TITLEBAR::BREADCRUMBS::BUTTON::CLICK";
      Action3["BREADCRUMBS_UPDATE"] = "APP::TITLEBAR::BREADCRUMBS::BUTTON::UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
    var TITLEBAR_BUTTON_PROPS = {
      group: types_1.Group.TitleBar,
      subgroups: ["Buttons"]
    };
    var BREADCRUMB_BUTTON_PROPS = {
      group: types_1.Group.TitleBar,
      subgroups: ["Breadcrumbs"],
      type: types_1.ComponentType.Button
    };
    function clickActionButton(id, payload) {
      var type = types_1.ComponentType.Button;
      var component = __assign({ id, type }, TITLEBAR_BUTTON_PROPS);
      return Button_1.clickButton(types_1.Group.TitleBar, component, payload);
    }
    exports.clickActionButton = clickActionButton;
    function clickBreadcrumb(id, payload) {
      var component = __assign({ id }, BREADCRUMB_BUTTON_PROPS);
      return Button_1.clickButton(types_1.Group.TitleBar, component, payload);
    }
    exports.clickBreadcrumb = clickBreadcrumb;
    function update(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.TitleBar,
        type: Action2.UPDATE
      });
    }
    exports.update = update;
    var TitleBar = (
      /** @class */
      function(_super) {
        __extends(TitleBar2, _super);
        function TitleBar2(app, options) {
          var _this = _super.call(this, app, types_1.Group.TitleBar, types_1.Group.TitleBar) || this;
          if (!options.title && !options.breadcrumbs && !options.buttons) {
            return _this;
          }
          _this.set(options);
          return _this;
        }
        Object.defineProperty(TitleBar2.prototype, "buttons", {
          get: function() {
            if (!this.primary && !this.secondary) {
              return void 0;
            }
            return {
              primary: this.primary,
              secondary: this.secondary
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(TitleBar2.prototype, "buttonsOptions", {
          get: function() {
            if (!this.primaryOptions && !this.secondaryOptions) {
              return void 0;
            }
            return {
              primary: this.primaryOptions,
              secondary: this.secondaryOptions
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(TitleBar2.prototype, "options", {
          get: function() {
            return {
              breadcrumbs: this.breadcrumbsOption,
              buttons: this.buttonsOptions,
              title: this.title
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(TitleBar2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { breadcrumbs: this.breadcrumb, buttons: this.buttons, id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        TitleBar2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var title = mergedOptions.title, buttons = mergedOptions.buttons, breadcrumbs = mergedOptions.breadcrumbs;
          this.title = title;
          this.setBreadcrumbs(breadcrumbs);
          this.setPrimaryButton(buttons ? buttons.primary : void 0);
          this.setSecondaryButton(buttons ? buttons.secondary : void 0);
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        TitleBar2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.UPDATE:
              this.app.dispatch(update(this.payload));
              break;
          }
          return this;
        };
        TitleBar2.prototype.getButton = function(button, subgroups, updateCb) {
          if (button instanceof ButtonGroup_1.ButtonGroup) {
            return buttonGroupHelper_1.getGroupedButton(this, button, subgroups, updateCb);
          }
          return buttonHelper_1.getSingleButton(this, button, subgroups, updateCb);
        };
        TitleBar2.prototype.updatePrimaryButton = function(newPayload) {
          if (!this.primary) {
            return;
          }
          if (helper_1.updateActionFromPayload(this.primary, newPayload)) {
            this.dispatch(Action2.UPDATE);
          }
        };
        TitleBar2.prototype.updateSecondaryButtons = function(newPayload) {
          if (!this.secondary) {
            return;
          }
          var buttonToUpdate = this.secondary.find(function(action) {
            return action.id === newPayload.id;
          });
          if (!buttonToUpdate) {
            return;
          }
          var updated = false;
          if (ButtonGroup_1.isGroupedButtonPayload(newPayload)) {
            updated = helper_1.updateActionFromPayload(buttonToUpdate, newPayload);
          } else {
            updated = helper_1.updateActionFromPayload(buttonToUpdate, newPayload);
          }
          if (updated) {
            this.dispatch(Action2.UPDATE);
          }
        };
        TitleBar2.prototype.updateBreadcrumbButton = function(newPayload) {
          if (!this.breadcrumb) {
            return;
          }
          if (helper_1.updateActionFromPayload(this.breadcrumb, newPayload)) {
            this.dispatch(Action2.UPDATE);
          }
        };
        TitleBar2.prototype.setPrimaryButton = function(newOptions) {
          this.primaryOptions = this.getChildButton(newOptions, this.primaryOptions);
          this.primary = this.primaryOptions ? this.getButton(this.primaryOptions, TITLEBAR_BUTTON_PROPS.subgroups, this.updatePrimaryButton) : void 0;
        };
        TitleBar2.prototype.setSecondaryButton = function(newOptions) {
          var _this = this;
          var newButtons = newOptions || [];
          var currentButtons = this.secondaryOptions || [];
          this.secondaryOptions = this.getUpdatedChildActions(newButtons, currentButtons);
          this.secondary = this.secondaryOptions ? this.secondaryOptions.map(function(action) {
            return _this.getButton(action, TITLEBAR_BUTTON_PROPS.subgroups, _this.updateSecondaryButtons);
          }) : void 0;
        };
        TitleBar2.prototype.setBreadcrumbs = function(breadcrumb) {
          this.breadcrumbsOption = this.getChildButton(breadcrumb, this.breadcrumbsOption);
          this.breadcrumb = this.breadcrumbsOption ? this.getButton(this.breadcrumbsOption, BREADCRUMB_BUTTON_PROPS.subgroups, this.updateBreadcrumbButton) : void 0;
        };
        TitleBar2.prototype.getChildButton = function(newAction, currentAction) {
          var newButtons = newAction ? [newAction] : [];
          var currentButtons = currentAction ? [currentAction] : [];
          var updatedButton = this.getUpdatedChildActions(newButtons, currentButtons);
          return updatedButton ? updatedButton[0] : void 0;
        };
        return TitleBar2;
      }(ActionSet_1.ActionSetWithChildren)
    );
    exports.TitleBar = TitleBar;
  }
});

// node_modules/@shopify/app-bridge/actions/TitleBar/index.js
var require_TitleBar2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/TitleBar/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.TitleBar = exports.update = exports.clickBreadcrumb = exports.clickActionButton = exports.Action = void 0;
    var TitleBar_1 = require_TitleBar();
    Object.defineProperty(exports, "TitleBar", { enumerable: true, get: function() {
      return TitleBar_1.TitleBar;
    } });
    var TitleBar_2 = require_TitleBar();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return TitleBar_2.Action;
    } });
    Object.defineProperty(exports, "clickActionButton", { enumerable: true, get: function() {
      return TitleBar_2.clickActionButton;
    } });
    Object.defineProperty(exports, "clickBreadcrumb", { enumerable: true, get: function() {
      return TitleBar_2.clickBreadcrumb;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return TitleBar_2.update;
    } });
    function create(app, options) {
      return new TitleBar_1.TitleBar(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge/actions/Toast/index.js
var require_Toast2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Toast/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.Toast = exports.primaryAction = exports.clear = exports.show = exports.Action = void 0;
    var Toast_1 = require_Toast();
    Object.defineProperty(exports, "Toast", { enumerable: true, get: function() {
      return Toast_1.Toast;
    } });
    var Toast_2 = require_Toast();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Toast_2.Action;
    } });
    Object.defineProperty(exports, "show", { enumerable: true, get: function() {
      return Toast_2.show;
    } });
    Object.defineProperty(exports, "clear", { enumerable: true, get: function() {
      return Toast_2.clear;
    } });
    Object.defineProperty(exports, "primaryAction", { enumerable: true, get: function() {
      return Toast_2.primaryAction;
    } });
    function create(app, options) {
      return new Toast_1.Toast(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/ContextualSaveBar/index.js
var require_ContextualSaveBar = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/ContextualSaveBar/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContextualSaveBar = exports.update = exports.discard = exports.save = exports.hide = exports.show = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["DISCARD"] = "APP::CONTEXTUAL_SAVE_BAR::DISCARD";
      Action3["SAVE"] = "APP::CONTEXTUAL_SAVE_BAR::SAVE";
      Action3["SHOW"] = "APP::CONTEXTUAL_SAVE_BAR::SHOW";
      Action3["HIDE"] = "APP::CONTEXTUAL_SAVE_BAR::HIDE";
      Action3["UPDATE"] = "APP::CONTEXTUAL_SAVE_BAR::UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
    function createContextBarAction(action, payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.ContextualSaveBar,
        type: action,
        payload
      });
    }
    function show(payload) {
      return createContextBarAction(Action2.SHOW, payload);
    }
    exports.show = show;
    function hide(payload) {
      return createContextBarAction(Action2.HIDE, payload);
    }
    exports.hide = hide;
    function save(payload) {
      return createContextBarAction(Action2.SAVE, payload);
    }
    exports.save = save;
    function discard(payload) {
      return createContextBarAction(Action2.DISCARD, payload);
    }
    exports.discard = discard;
    function update(payload) {
      return createContextBarAction(Action2.UPDATE, payload);
    }
    exports.update = update;
    var ContextualSaveBar = (
      /** @class */
      function(_super) {
        __extends(ContextualSaveBar2, _super);
        function ContextualSaveBar2(app, options) {
          if (options === void 0) {
            options = {};
          }
          var _this = _super.call(this, app, types_1.Group.ContextualSaveBar, types_1.Group.ContextualSaveBar) || this;
          _this.options = options;
          _this.set(options, false);
          return _this;
        }
        Object.defineProperty(ContextualSaveBar2.prototype, "payload", {
          /**
           * Returns the action set payload
           */
          get: function() {
            return __assign({ id: this.id }, this.options);
          },
          enumerable: false,
          configurable: true
        });
        ContextualSaveBar2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          this.options = mergedOptions;
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        ContextualSaveBar2.prototype.dispatch = function(action) {
          this.app.dispatch(createContextBarAction(action, this.payload));
          return this;
        };
        return ContextualSaveBar2;
      }(ActionSet_1.ActionSet)
    );
    exports.ContextualSaveBar = ContextualSaveBar;
  }
});

// node_modules/@shopify/app-bridge/actions/ContextualSaveBar/index.js
var require_ContextualSaveBar2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/ContextualSaveBar/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.ContextualSaveBar = exports.update = exports.discard = exports.save = exports.hide = exports.show = exports.Action = void 0;
    var ContextualSaveBar_1 = require_ContextualSaveBar();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return ContextualSaveBar_1.Action;
    } });
    Object.defineProperty(exports, "show", { enumerable: true, get: function() {
      return ContextualSaveBar_1.show;
    } });
    Object.defineProperty(exports, "hide", { enumerable: true, get: function() {
      return ContextualSaveBar_1.hide;
    } });
    Object.defineProperty(exports, "save", { enumerable: true, get: function() {
      return ContextualSaveBar_1.save;
    } });
    Object.defineProperty(exports, "discard", { enumerable: true, get: function() {
      return ContextualSaveBar_1.discard;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return ContextualSaveBar_1.update;
    } });
    Object.defineProperty(exports, "ContextualSaveBar", { enumerable: true, get: function() {
      return ContextualSaveBar_1.ContextualSaveBar;
    } });
    function create(app, options) {
      return new ContextualSaveBar_1.ContextualSaveBar(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Share/index.js
var require_Share = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Share/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.close = exports.show = exports.Share = exports.Action = void 0;
    var types_1 = require_types();
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var Action2;
    (function(Action3) {
      Action3["SHOW"] = "APP::SHARE::SHOW";
      Action3["CLOSE"] = "APP::SHARE::CLOSE";
    })(Action2 = exports.Action || (exports.Action = {}));
    var Share = (
      /** @class */
      function(_super) {
        __extends(Share2, _super);
        function Share2(app) {
          return _super.call(this, app, types_1.Group.Share, types_1.Group.Share) || this;
        }
        Share2.prototype.dispatch = function(action, payload) {
          switch (action) {
            case Action2.SHOW:
              this.dispatchShareAction(Action2.SHOW, payload);
              break;
            case Action2.CLOSE:
              this.dispatchShareAction(Action2.CLOSE, payload);
              break;
            default:
              throw new Error("Action: " + action + " not supported");
          }
          return this;
        };
        Share2.prototype.dispatchShareAction = function(actionType, payload) {
          this.app.dispatch(helper_1.actionWrapper({
            type: actionType,
            group: types_1.Group.Share,
            payload: __assign({ id: this.id }, payload)
          }));
        };
        return Share2;
      }(ActionSet_1.ActionSet)
    );
    exports.Share = Share;
    function show() {
      return helper_1.actionWrapper({
        group: types_1.Group.Share,
        type: Action2.SHOW
      });
    }
    exports.show = show;
    function close(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.Share,
        type: Action2.CLOSE,
        payload
      });
    }
    exports.close = close;
  }
});

// node_modules/@shopify/app-bridge/actions/Share/index.js
var require_Share2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Share/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.Share = exports.close = exports.show = exports.Action = void 0;
    var Share_1 = require_Share();
    Object.defineProperty(exports, "Share", { enumerable: true, get: function() {
      return Share_1.Share;
    } });
    var Share_2 = require_Share();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Share_2.Action;
    } });
    Object.defineProperty(exports, "show", { enumerable: true, get: function() {
      return Share_2.show;
    } });
    Object.defineProperty(exports, "close", { enumerable: true, get: function() {
      return Share_2.close;
    } });
    function create(app) {
      return new Share_1.Share(app);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Link/AppLink/index.js
var require_AppLink = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Link/AppLink/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppLink = exports.update = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Redirect_1 = require_Redirect();
    var Action2;
    (function(Action3) {
      Action3["UPDATE"] = "UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
    function update(group, component, updatePayload) {
      var id = component.id;
      var label = updatePayload.label, destination = updatePayload.destination;
      var linkPayload = __assign(__assign({}, updatePayload), { id, label, destination });
      return helper_1.actionWrapper({
        group,
        type: helper_1.getEventNameSpace(group, Action2.UPDATE, component),
        payload: linkPayload
      });
    }
    exports.update = update;
    var AppLink = (
      /** @class */
      function(_super) {
        __extends(AppLink2, _super);
        function AppLink2(app, options) {
          var _this = _super.call(this, app, types_1.Group.Link, types_1.Group.Link) || this;
          _this.label = "";
          _this.destination = "";
          _this.set(options, false);
          return _this;
        }
        Object.defineProperty(AppLink2.prototype, "options", {
          get: function() {
            var _a = this, label = _a.label, destination = _a.destination;
            return {
              label,
              destination,
              redirectType: Redirect_1.Action.APP
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(AppLink2.prototype, "payload", {
          get: function() {
            var _a = this.options, label = _a.label, destination = _a.destination, redirectType = _a.redirectType;
            var path = destination;
            return {
              id: this.id,
              label,
              destination: { path },
              redirectType
            };
          },
          enumerable: false,
          configurable: true
        });
        AppLink2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var _a = helper_1.getMergedProps(this.options, options), label = _a.label, destination = _a.destination;
          this.label = label;
          this.destination = destination;
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        AppLink2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.UPDATE: {
              var updateAction = update(this.group, this.component, this.payload);
              this.app.dispatch(updateAction);
              break;
            }
          }
          return this;
        };
        return AppLink2;
      }(ActionSet_1.ActionSet)
    );
    exports.AppLink = AppLink;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Menu/NavigationMenu/index.js
var require_NavigationMenu = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Menu/NavigationMenu/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavigationMenu = exports.update = exports.Action = void 0;
    var AppLink_1 = require_AppLink();
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var SUBGROUPS = ["Navigation_Menu"];
    var Action2;
    (function(Action3) {
      Action3["UPDATE"] = "APP::MENU::NAVIGATION_MENU::UPDATE";
      Action3["LINK_UPDATE"] = "APP::MENU::NAVIGATION_MENU::LINK::UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
    function update(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Menu,
        type: Action2.UPDATE
      });
    }
    exports.update = update;
    var NavigationMenu = (
      /** @class */
      function(_super) {
        __extends(NavigationMenu2, _super);
        function NavigationMenu2(app, options) {
          var _this = _super.call(this, app, "Navigation_Menu", types_1.Group.Menu) || this;
          _this.items = [];
          _this.set(options);
          return _this;
        }
        Object.defineProperty(NavigationMenu2.prototype, "options", {
          get: function() {
            return {
              items: this.itemsOptions,
              active: this.activeOptions
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(NavigationMenu2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { active: this.active, items: this.items, id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        NavigationMenu2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var items = mergedOptions.items, active = mergedOptions.active;
          this.setItems(items);
          this.activeOptions = active;
          this.active = active && active.id;
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        NavigationMenu2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.UPDATE:
              this.app.dispatch(update(this.payload));
              break;
          }
          return this;
        };
        NavigationMenu2.prototype.updateItem = function(newPayload) {
          if (!this.items) {
            return;
          }
          var itemToUpdate = this.items.find(function(action) {
            return action.id === newPayload.id;
          });
          if (!itemToUpdate) {
            return;
          }
          if (helper_1.updateActionFromPayload(itemToUpdate, newPayload)) {
            this.dispatch(Action2.UPDATE);
          }
        };
        NavigationMenu2.prototype.setItems = function(newOptions) {
          var _this = this;
          var newItems = newOptions || [];
          var currentItems = this.itemsOptions || [];
          this.itemsOptions = this.getUpdatedChildActions(newItems, currentItems);
          this.items = this.itemsOptions ? this.itemsOptions.map(function(action) {
            _this.addChild(action, _this.group, SUBGROUPS);
            _this.subscribeToChild(action, AppLink_1.Action.UPDATE, _this.updateItem);
            return action.payload;
          }) : [];
        };
        return NavigationMenu2;
      }(ActionSet_1.ActionSetWithChildren)
    );
    exports.NavigationMenu = NavigationMenu;
  }
});

// node_modules/@shopify/app-bridge/actions/Menu/NavigationMenu/index.js
var require_NavigationMenu2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Menu/NavigationMenu/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.NavigationMenu = exports.update = exports.Action = void 0;
    var NavigationMenu_1 = require_NavigationMenu();
    Object.defineProperty(exports, "NavigationMenu", { enumerable: true, get: function() {
      return NavigationMenu_1.NavigationMenu;
    } });
    var NavigationMenu_2 = require_NavigationMenu();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return NavigationMenu_2.Action;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return NavigationMenu_2.update;
    } });
    function create(app, options) {
      return new NavigationMenu_1.NavigationMenu(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Menu/ChannelMenu/index.js
var require_ChannelMenu = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Menu/ChannelMenu/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChannelMenu = exports.update = exports.Action = void 0;
    var AppLink_1 = require_AppLink();
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var SUBGROUPS = ["Channel_Menu"];
    var Action2;
    (function(Action3) {
      Action3["UPDATE"] = "APP::MENU::CHANNEL_MENU::UPDATE";
      Action3["LINK_UPDATE"] = "APP::MENU::CHANNEL_MENU::LINK::UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
    function update(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.Menu,
        type: Action2.UPDATE
      });
    }
    exports.update = update;
    var ChannelMenu = (
      /** @class */
      function(_super) {
        __extends(ChannelMenu2, _super);
        function ChannelMenu2(app, options) {
          var _this = _super.call(this, app, "Channel_Menu", types_1.Group.Menu) || this;
          _this.items = [];
          _this.set(options);
          return _this;
        }
        Object.defineProperty(ChannelMenu2.prototype, "options", {
          get: function() {
            return {
              items: this.itemsOptions,
              active: this.activeOptions
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(ChannelMenu2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { active: this.active, items: this.items, id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        ChannelMenu2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var items = mergedOptions.items, active = mergedOptions.active;
          this.setItems(items);
          this.activeOptions = active;
          this.active = active && active.id;
          if (shouldUpdate) {
            this.dispatch(Action2.UPDATE);
          }
          return this;
        };
        ChannelMenu2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.UPDATE:
              this.app.dispatch(update(this.payload));
              break;
          }
          return this;
        };
        ChannelMenu2.prototype.updateItem = function(newPayload) {
          if (!this.items) {
            return;
          }
          var itemToUpdate = this.items.find(function(action) {
            return action.id === newPayload.id;
          });
          if (!itemToUpdate) {
            return;
          }
          if (helper_1.updateActionFromPayload(itemToUpdate, newPayload)) {
            this.dispatch(Action2.UPDATE);
          }
        };
        ChannelMenu2.prototype.setItems = function(newOptions) {
          var _this = this;
          var newItems = newOptions || [];
          var currentItems = this.itemsOptions || [];
          this.itemsOptions = this.getUpdatedChildActions(newItems, currentItems);
          this.items = this.itemsOptions ? this.itemsOptions.map(function(action) {
            _this.addChild(action, _this.group, SUBGROUPS);
            _this.subscribeToChild(action, AppLink_1.Action.UPDATE, _this.updateItem);
            return action.payload;
          }) : [];
        };
        return ChannelMenu2;
      }(ActionSet_1.ActionSetWithChildren)
    );
    exports.ChannelMenu = ChannelMenu;
  }
});

// node_modules/@shopify/app-bridge/actions/Menu/ChannelMenu/index.js
var require_ChannelMenu2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Menu/ChannelMenu/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.ChannelMenu = exports.update = exports.Action = void 0;
    var ChannelMenu_1 = require_ChannelMenu();
    Object.defineProperty(exports, "ChannelMenu", { enumerable: true, get: function() {
      return ChannelMenu_1.ChannelMenu;
    } });
    var ChannelMenu_2 = require_ChannelMenu();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return ChannelMenu_2.Action;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return ChannelMenu_2.update;
    } });
    function create(app, options) {
      return new ChannelMenu_1.ChannelMenu(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge/actions/Link/AppLink/index.js
var require_AppLink2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Link/AppLink/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.AppLink = exports.update = exports.Action = void 0;
    var AppLink_1 = require_AppLink();
    Object.defineProperty(exports, "AppLink", { enumerable: true, get: function() {
      return AppLink_1.AppLink;
    } });
    var AppLink_2 = require_AppLink();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return AppLink_2.Action;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return AppLink_2.update;
    } });
    function create(app, options) {
      return new AppLink_1.AppLink(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Pos/index.js
var require_Pos = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Pos/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pos = exports.close = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["CLOSE"] = "APP::POS::CLOSE";
      Action3["LOCATION_UPDATE"] = "APP::POS::LOCATION::UPDATE";
      Action3["USER_UPDATE"] = "APP::POS::USER::UPDATE";
      Action3["DEVICE_UPDATE"] = "APP::POS::DEVICE::UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
    function close() {
      return helper_1.actionWrapper({
        group: types_1.Group.Pos,
        type: Action2.CLOSE
      });
    }
    exports.close = close;
    var Pos = (
      /** @class */
      function(_super) {
        __extends(Pos2, _super);
        function Pos2(app) {
          return _super.call(this, app, types_1.Group.Pos, types_1.Group.Pos) || this;
        }
        Pos2.prototype.dispatch = function(action) {
          switch (action) {
            case Action2.CLOSE:
              this.app.dispatch(close());
              break;
          }
          return this;
        };
        return Pos2;
      }(ActionSet_1.ActionSet)
    );
    exports.Pos = Pos;
  }
});

// node_modules/@shopify/app-bridge/actions/Pos/index.js
var require_Pos2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Pos/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.Pos = exports.close = exports.Action = void 0;
    var Pos_1 = require_Pos();
    Object.defineProperty(exports, "Pos", { enumerable: true, get: function() {
      return Pos_1.Pos;
    } });
    var Pos_2 = require_Pos();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Pos_2.Action;
    } });
    Object.defineProperty(exports, "close", { enumerable: true, get: function() {
      return Pos_2.close;
    } });
    function create(app) {
      return new Pos_1.Pos(app);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/MarketingExternalActivityTopBar/index.js
var require_MarketingExternalActivityTopBar = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/MarketingExternalActivityTopBar/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = void 0;
    var Action2;
    (function(Action3) {
      Action3["UPDATE"] = "APP::MARKETING_EXTERNAL_ACTIVITY_TOP_BAR::UPDATE";
      Action3["BUTTON_CLICK"] = "APP::MARKETING_EXTERNAL_ACTIVITY_TOP_BAR::BUTTONS::BUTTON::CLICK";
      Action3["BUTTON_UPDATE"] = "APP::MARKETING_EXTERNAL_ACTIVITY_TOP_BAR::BUTTONS::BUTTON::UPDATE";
    })(Action2 = exports.Action || (exports.Action = {}));
  }
});

// node_modules/@shopify/app-bridge/actions/buttonHelper.js
var require_buttonHelper2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/buttonHelper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSingleButton = void 0;
    var buttonHelper_1 = require_buttonHelper();
    Object.defineProperty(exports, "getSingleButton", { enumerable: true, get: function() {
      return buttonHelper_1.getSingleButton;
    } });
  }
});

// node_modules/@shopify/app-bridge/actions/ActionSet.js
var require_ActionSet2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/ActionSet.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unsubscribeActions = exports.ActionSetWithChildren = exports.ActionSet = void 0;
    var ActionSet_1 = require_ActionSet();
    Object.defineProperty(exports, "ActionSet", { enumerable: true, get: function() {
      return ActionSet_1.ActionSet;
    } });
    Object.defineProperty(exports, "ActionSetWithChildren", { enumerable: true, get: function() {
      return ActionSet_1.ActionSetWithChildren;
    } });
    Object.defineProperty(exports, "unsubscribeActions", { enumerable: true, get: function() {
      return ActionSet_1.unsubscribeActions;
    } });
  }
});

// node_modules/@shopify/app-bridge/actions/MarketingExternalActivityTopBar/index.js
var require_MarketingExternalActivityTopBar2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/MarketingExternalActivityTopBar/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.MarketingExternalActivityTopBar = exports.update = exports.clickActionButton = exports.MarketingActivityStatusBadgeType = exports.Action = void 0;
    var MarketingExternalActivityTopBar_1 = require_MarketingExternalActivityTopBar();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return MarketingExternalActivityTopBar_1.Action;
    } });
    var Button_1 = require_Button2();
    var buttonHelper_1 = require_buttonHelper2();
    var helper_1 = require_helper2();
    var ActionSet_1 = require_ActionSet2();
    var types_1 = require_types2();
    var MarketingActivityStatusBadgeType;
    (function(MarketingActivityStatusBadgeType2) {
      MarketingActivityStatusBadgeType2["Default"] = "DEFAULT";
      MarketingActivityStatusBadgeType2["Success"] = "SUCCESS";
      MarketingActivityStatusBadgeType2["Attention"] = "ATTENTION";
      MarketingActivityStatusBadgeType2["Warning"] = "WARNING";
      MarketingActivityStatusBadgeType2["Info"] = "INFO";
    })(MarketingActivityStatusBadgeType = exports.MarketingActivityStatusBadgeType || (exports.MarketingActivityStatusBadgeType = {}));
    var MARKETING_ACTIVITY_TOPBAR_BUTTON_PROPS = {
      group: types_1.Group.MarketingExternalActivityTopBar,
      subgroups: ["Buttons"]
    };
    function clickActionButton(id, payload) {
      var type = types_1.ComponentType.Button;
      var component = __assign({ id, type }, MARKETING_ACTIVITY_TOPBAR_BUTTON_PROPS);
      return Button_1.clickButton(types_1.Group.MarketingExternalActivityTopBar, component, payload);
    }
    exports.clickActionButton = clickActionButton;
    function update(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.MarketingExternalActivityTopBar,
        type: MarketingExternalActivityTopBar_1.Action.UPDATE
      });
    }
    exports.update = update;
    var MarketingExternalActivityTopBar = (
      /** @class */
      function(_super) {
        __extends(MarketingExternalActivityTopBar2, _super);
        function MarketingExternalActivityTopBar2(app, options) {
          var _this = _super.call(this, app, types_1.Group.MarketingExternalActivityTopBar, types_1.Group.MarketingExternalActivityTopBar) || this;
          _this.set(options);
          return _this;
        }
        Object.defineProperty(MarketingExternalActivityTopBar2.prototype, "buttons", {
          get: function() {
            if (!this.primary && !this.secondary) {
              return void 0;
            }
            return {
              primary: this.primary,
              secondary: this.secondary
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(MarketingExternalActivityTopBar2.prototype, "buttonsOptions", {
          get: function() {
            if (!this.primaryOptions && !this.secondaryOptions) {
              return void 0;
            }
            return {
              primary: this.primaryOptions,
              secondary: this.secondaryOptions
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(MarketingExternalActivityTopBar2.prototype, "options", {
          get: function() {
            return {
              title: this.title,
              status: this.status,
              saving: this.saving,
              saved: this.saved,
              buttons: this.buttonsOptions
            };
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(MarketingExternalActivityTopBar2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { buttons: this.buttons, id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        MarketingExternalActivityTopBar2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var title = mergedOptions.title, buttons = mergedOptions.buttons, saved = mergedOptions.saved, saving = mergedOptions.saving, status = mergedOptions.status;
          this.title = title;
          this.saving = saving;
          this.saved = saved;
          this.status = status;
          this.setPrimaryButton(buttons ? buttons.primary : void 0);
          this.setSecondaryButtons(buttons ? buttons.secondary : void 0);
          if (shouldUpdate) {
            this.dispatch(MarketingExternalActivityTopBar_1.Action.UPDATE);
          }
          return this;
        };
        MarketingExternalActivityTopBar2.prototype.dispatch = function(action) {
          switch (action) {
            case MarketingExternalActivityTopBar_1.Action.UPDATE:
              this.app.dispatch(update(this.payload));
              break;
          }
          return this;
        };
        MarketingExternalActivityTopBar2.prototype.getButton = function(button, subgroups, updateCb) {
          return buttonHelper_1.getSingleButton(this, button, subgroups, updateCb);
        };
        MarketingExternalActivityTopBar2.prototype.updatePrimaryButton = function(newPayload) {
          if (!this.primary) {
            return;
          }
          if (helper_1.updateActionFromPayload(this.primary, newPayload)) {
            this.dispatch(MarketingExternalActivityTopBar_1.Action.UPDATE);
          }
        };
        MarketingExternalActivityTopBar2.prototype.updateSecondaryButtons = function(newPayload) {
          if (!this.secondary) {
            return;
          }
          var buttonToUpdate = this.secondary.find(function(action) {
            return action.id === newPayload.id;
          });
          if (!buttonToUpdate) {
            return;
          }
          var updated = helper_1.updateActionFromPayload(buttonToUpdate, newPayload);
          if (updated) {
            this.dispatch(MarketingExternalActivityTopBar_1.Action.UPDATE);
          }
        };
        MarketingExternalActivityTopBar2.prototype.setPrimaryButton = function(newOptions) {
          this.primaryOptions = this.getChildButton(newOptions, this.primaryOptions);
          this.primary = this.primaryOptions ? this.getButton(this.primaryOptions, MARKETING_ACTIVITY_TOPBAR_BUTTON_PROPS.subgroups, this.updatePrimaryButton) : void 0;
        };
        MarketingExternalActivityTopBar2.prototype.setSecondaryButtons = function(newOptions) {
          var _this = this;
          var newButtons = newOptions || [];
          var currentButtons = this.secondaryOptions || [];
          this.secondaryOptions = this.getUpdatedChildActions(newButtons, currentButtons);
          this.secondary = this.secondaryOptions ? this.secondaryOptions.map(function(action) {
            return _this.getButton(action, MARKETING_ACTIVITY_TOPBAR_BUTTON_PROPS.subgroups, _this.updateSecondaryButtons);
          }) : void 0;
        };
        MarketingExternalActivityTopBar2.prototype.updateSaving = function(saving) {
          this.saving = saving;
          this.dispatch(MarketingExternalActivityTopBar_1.Action.UPDATE);
        };
        MarketingExternalActivityTopBar2.prototype.updateSaved = function(saved) {
          this.saved = saved;
          this.dispatch(MarketingExternalActivityTopBar_1.Action.UPDATE);
        };
        MarketingExternalActivityTopBar2.prototype.updateStatus = function(newPayload) {
          this.status = newPayload;
          this.dispatch(MarketingExternalActivityTopBar_1.Action.UPDATE);
        };
        MarketingExternalActivityTopBar2.prototype.getChildButton = function(newAction, currentAction) {
          var newButtons = newAction ? [newAction] : [];
          var currentButtons = currentAction ? [currentAction] : [];
          var updatedButton = this.getUpdatedChildActions(newButtons, currentButtons);
          return updatedButton ? updatedButton[0] : void 0;
        };
        return MarketingExternalActivityTopBar2;
      }(ActionSet_1.ActionSetWithChildren)
    );
    exports.MarketingExternalActivityTopBar = MarketingExternalActivityTopBar;
    function create(app, options) {
      return new MarketingExternalActivityTopBar(app, options);
    }
    exports.create = create;
  }
});

// node_modules/@shopify/app-bridge-core/actions/Performance/index.js
var require_Performance = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Performance/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fullPageLoad = exports.skeletonPageLoad = exports.Action = void 0;
    var types_1 = require_types();
    var helper_1 = require_helper();
    var Action2;
    (function(Action3) {
      Action3["SKELETON_PAGE_LOAD"] = "APP::PERFORMANCE::SKELETON_PAGE_LOAD";
      Action3["FULL_PAGE_LOAD"] = "APP::PERFORMANCE::FULL_PAGE_LOAD";
    })(Action2 = exports.Action || (exports.Action = {}));
    function skeletonPageLoad() {
      return helper_1.actionWrapper({
        group: types_1.Group.Performance,
        type: Action2.SKELETON_PAGE_LOAD
      });
    }
    exports.skeletonPageLoad = skeletonPageLoad;
    function fullPageLoad() {
      return helper_1.actionWrapper({
        group: types_1.Group.Performance,
        type: Action2.FULL_PAGE_LOAD
      });
    }
    exports.fullPageLoad = fullPageLoad;
  }
});

// node_modules/@shopify/app-bridge/actions/Performance/index.js
var require_Performance2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Performance/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fullPageLoad = exports.skeletonPageLoad = exports.Action = void 0;
    var Performance_1 = require_Performance();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Performance_1.Action;
    } });
    Object.defineProperty(exports, "skeletonPageLoad", { enumerable: true, get: function() {
      return Performance_1.skeletonPageLoad;
    } });
    Object.defineProperty(exports, "fullPageLoad", { enumerable: true, get: function() {
      return Performance_1.fullPageLoad;
    } });
  }
});

// node_modules/@shopify/app-bridge-core/actions/Picker/index.js
var require_Picker = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/Picker/index.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unstable_Picker = exports.loadMore = exports.search = exports.update = exports.cancel = exports.open = exports.select = exports.ALL_RESOURCE_VERTICAL_ALIGNMENT = exports.ALL_MEDIA_KINDS = exports.ALL_BADGE_STATUSES = exports.ALL_BADGE_PROGRESSES = exports.Action = void 0;
    var helper_1 = require_helper();
    var ActionSet_1 = require_ActionSet();
    var types_1 = require_types();
    var Action2;
    (function(Action3) {
      Action3["OPEN"] = "APP::PICKER::OPEN";
      Action3["SELECT"] = "APP::PICKER::SELECT";
      Action3["UPDATE"] = "APP::PICKER::UPDATE";
      Action3["CANCEL"] = "APP::PICKER::CANCEL";
      Action3["SEARCH"] = "APP::PICKER::SEARCH";
      Action3["LOAD_MORE"] = "APP::PICKER::LOAD_MORE";
    })(Action2 = exports.Action || (exports.Action = {}));
    exports.ALL_BADGE_PROGRESSES = [
      "incomplete",
      "partiallyComplete",
      "complete"
    ];
    exports.ALL_BADGE_STATUSES = [
      "success",
      "info",
      "attention",
      "critical",
      "warning",
      "new"
    ];
    exports.ALL_MEDIA_KINDS = ["Avatar", "Thumbnail"];
    exports.ALL_RESOURCE_VERTICAL_ALIGNMENT = [
      "leading",
      "trailing",
      "center"
    ];
    function select(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.unstable_Picker,
        type: Action2.SELECT
      });
    }
    exports.select = select;
    function open(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.unstable_Picker,
        type: Action2.OPEN
      });
    }
    exports.open = open;
    function cancel(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.unstable_Picker,
        type: Action2.CANCEL
      });
    }
    exports.cancel = cancel;
    function update(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.unstable_Picker,
        type: Action2.UPDATE
      });
    }
    exports.update = update;
    function search(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.unstable_Picker,
        type: Action2.SEARCH
      });
    }
    exports.search = search;
    function loadMore(payload) {
      return helper_1.actionWrapper({
        payload,
        group: types_1.Group.unstable_Picker,
        type: Action2.LOAD_MORE
      });
    }
    exports.loadMore = loadMore;
    var unstable_Picker = (
      /** @class */
      function(_super) {
        __extends(unstable_Picker2, _super);
        function unstable_Picker2(app, options) {
          var _this = _super.call(this, app, types_1.Group.unstable_Picker, types_1.Group.unstable_Picker) || this;
          _this.items = [];
          _this.selectedItems = [];
          _this.set(options, false);
          return _this;
        }
        Object.defineProperty(unstable_Picker2.prototype, "payload", {
          get: function() {
            return __assign(__assign({}, this.options), { id: this.id });
          },
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(unstable_Picker2.prototype, "options", {
          get: function() {
            return {
              items: this.items,
              maxSelectable: this.maxSelectable,
              selectedItems: this.selectedItems,
              title: this.title,
              loading: this.loading,
              searchQuery: this.searchQuery,
              searchQueryPlaceholder: this.searchQueryPlaceholder,
              primaryActionLabel: this.primaryActionLabel,
              secondaryActionLabel: this.secondaryActionLabel,
              emptySearchLabel: this.emptySearchLabel,
              canLoadMore: this.canLoadMore,
              loadingMore: this.loadingMore,
              verticalAlignment: this.verticalAlignment,
              allowEmptySelection: this.allowEmptySelection,
              resourceName: this.resourceName
            };
          },
          enumerable: false,
          configurable: true
        });
        unstable_Picker2.prototype.set = function(options, shouldUpdate) {
          if (shouldUpdate === void 0) {
            shouldUpdate = true;
          }
          var mergedOptions = helper_1.getMergedProps(this.options, options);
          var _a = mergedOptions.selectedItems, selectedItems = _a === void 0 ? [] : _a, _b = mergedOptions.maxSelectable, maxSelectable = _b === void 0 ? 0 : _b, _c = mergedOptions.items, items = _c === void 0 ? [] : _c, _d = mergedOptions.loading, loading = _d === void 0 ? false : _d, title = mergedOptions.title, searchQuery = mergedOptions.searchQuery, searchQueryPlaceholder = mergedOptions.searchQueryPlaceholder, primaryActionLabel = mergedOptions.primaryActionLabel, secondaryActionLabel = mergedOptions.secondaryActionLabel, emptySearchLabel = mergedOptions.emptySearchLabel, _e = mergedOptions.canLoadMore, canLoadMore = _e === void 0 ? false : _e, _f = mergedOptions.loadingMore, loadingMore = _f === void 0 ? false : _f, verticalAlignment = mergedOptions.verticalAlignment, allowEmptySelection = mergedOptions.allowEmptySelection, resourceName = mergedOptions.resourceName;
          this.title = title;
          this.items = items;
          this.selectedItems = selectedItems;
          this.maxSelectable = maxSelectable;
          this.loading = loading;
          this.searchQuery = searchQuery;
          this.searchQueryPlaceholder = searchQueryPlaceholder;
          this.primaryActionLabel = primaryActionLabel;
          this.secondaryActionLabel = secondaryActionLabel;
          this.emptySearchLabel = emptySearchLabel;
          this.canLoadMore = canLoadMore;
          this.loadingMore = loadingMore;
          this.verticalAlignment = verticalAlignment;
          this.allowEmptySelection = allowEmptySelection;
          this.resourceName = resourceName;
          if (shouldUpdate) {
            this.update();
          }
          return this;
        };
        unstable_Picker2.prototype.dispatch = function(action, payload) {
          if (action === Action2.OPEN) {
            this.open();
          } else if (action === Action2.UPDATE) {
            this.update();
          } else if (action === Action2.CANCEL) {
            this.cancel();
          } else if (action === Action2.SELECT) {
            this.selectedItems = (payload === null || payload === void 0 ? void 0 : payload.selectedItems) || [];
            this.app.dispatch(select({ id: this.id, selectedItems: this.selectedItems }));
          } else if (action === Action2.SEARCH) {
            this.searchQuery = (payload === null || payload === void 0 ? void 0 : payload.searchQuery) || "";
            this.app.dispatch(search({ id: this.id, searchQuery: this.searchQuery }));
          } else if (action === Action2.LOAD_MORE) {
            this.loadMore();
          }
          return this;
        };
        unstable_Picker2.prototype.update = function() {
          this.app.dispatch(update(this.payload));
        };
        unstable_Picker2.prototype.open = function() {
          this.app.dispatch(open(this.payload));
        };
        unstable_Picker2.prototype.cancel = function() {
          this.app.dispatch(cancel({ id: this.id }));
        };
        unstable_Picker2.prototype.loadMore = function() {
          this.app.dispatch(loadMore(this.payload));
        };
        return unstable_Picker2;
      }(ActionSet_1.ActionSet)
    );
    exports.unstable_Picker = unstable_Picker;
  }
});

// node_modules/@shopify/app-bridge/actions/Picker/index.js
var require_Picker2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/Picker/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create = exports.unstable_Picker = exports.update = exports.select = exports.search = exports.open = exports.loadMore = exports.cancel = exports.ALL_RESOURCE_VERTICAL_ALIGNMENT = exports.ALL_MEDIA_KINDS = exports.ALL_BADGE_STATUSES = exports.ALL_BADGE_PROGRESSES = exports.Action = void 0;
    var Picker_1 = require_Picker();
    Object.defineProperty(exports, "unstable_Picker", { enumerable: true, get: function() {
      return Picker_1.unstable_Picker;
    } });
    var Picker_2 = require_Picker();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Picker_2.Action;
    } });
    Object.defineProperty(exports, "ALL_BADGE_PROGRESSES", { enumerable: true, get: function() {
      return Picker_2.ALL_BADGE_PROGRESSES;
    } });
    Object.defineProperty(exports, "ALL_BADGE_STATUSES", { enumerable: true, get: function() {
      return Picker_2.ALL_BADGE_STATUSES;
    } });
    Object.defineProperty(exports, "ALL_MEDIA_KINDS", { enumerable: true, get: function() {
      return Picker_2.ALL_MEDIA_KINDS;
    } });
    Object.defineProperty(exports, "ALL_RESOURCE_VERTICAL_ALIGNMENT", { enumerable: true, get: function() {
      return Picker_2.ALL_RESOURCE_VERTICAL_ALIGNMENT;
    } });
    Object.defineProperty(exports, "cancel", { enumerable: true, get: function() {
      return Picker_2.cancel;
    } });
    Object.defineProperty(exports, "loadMore", { enumerable: true, get: function() {
      return Picker_2.loadMore;
    } });
    Object.defineProperty(exports, "open", { enumerable: true, get: function() {
      return Picker_2.open;
    } });
    Object.defineProperty(exports, "search", { enumerable: true, get: function() {
      return Picker_2.search;
    } });
    Object.defineProperty(exports, "select", { enumerable: true, get: function() {
      return Picker_2.select;
    } });
    Object.defineProperty(exports, "update", { enumerable: true, get: function() {
      return Picker_2.update;
    } });
    var create = function(app, options) {
      return new Picker_1.unstable_Picker(app, options);
    };
    exports.create = create;
  }
});

// node_modules/web-vitals/dist/web-vitals.umd.cjs
var require_web_vitals_umd = __commonJS({
  "node_modules/web-vitals/dist/web-vitals.umd.cjs"(exports, module) {
    !function(e, n) {
      "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n((e = "undefined" != typeof globalThis ? globalThis : e || self).webVitals = {});
    }(exports, function(e) {
      "use strict";
      var n, t, i, r, o, a = -1, c = function(e2) {
        addEventListener("pageshow", function(n2) {
          n2.persisted && (a = n2.timeStamp, e2(n2));
        }, true);
      }, u = function() {
        return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
      }, s = function() {
        var e2 = u();
        return e2 && e2.activationStart || 0;
      }, f = function(e2, n2) {
        var t2 = u(), i2 = "navigate";
        a >= 0 ? i2 = "back-forward-cache" : t2 && (document.prerendering || s() > 0 ? i2 = "prerender" : document.wasDiscarded ? i2 = "restore" : t2.type && (i2 = t2.type.replace(/_/g, "-")));
        return { name: e2, value: void 0 === n2 ? -1 : n2, rating: "good", delta: 0, entries: [], id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12), navigationType: i2 };
      }, d = function(e2, n2, t2) {
        try {
          if (PerformanceObserver.supportedEntryTypes.includes(e2)) {
            var i2 = new PerformanceObserver(function(e3) {
              Promise.resolve().then(function() {
                n2(e3.getEntries());
              });
            });
            return i2.observe(Object.assign({ type: e2, buffered: true }, t2 || {})), i2;
          }
        } catch (e3) {
        }
      }, l = function(e2, n2, t2, i2) {
        var r2, o2;
        return function(a2) {
          n2.value >= 0 && (a2 || i2) && ((o2 = n2.value - (r2 || 0)) || void 0 === r2) && (r2 = n2.value, n2.delta = o2, n2.rating = function(e3, n3) {
            return e3 > n3[1] ? "poor" : e3 > n3[0] ? "needs-improvement" : "good";
          }(n2.value, t2), e2(n2));
        };
      }, p = function(e2) {
        requestAnimationFrame(function() {
          return requestAnimationFrame(function() {
            return e2();
          });
        });
      }, v = function(e2) {
        var n2 = function(n3) {
          "pagehide" !== n3.type && "hidden" !== document.visibilityState || e2(n3);
        };
        addEventListener("visibilitychange", n2, true), addEventListener("pagehide", n2, true);
      }, m = function(e2) {
        var n2 = false;
        return function(t2) {
          n2 || (e2(t2), n2 = true);
        };
      }, h = -1, g = function() {
        return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
      }, T = function(e2) {
        "hidden" === document.visibilityState && h > -1 && (h = "visibilitychange" === e2.type ? e2.timeStamp : 0, C());
      }, y = function() {
        addEventListener("visibilitychange", T, true), addEventListener("prerenderingchange", T, true);
      }, C = function() {
        removeEventListener("visibilitychange", T, true), removeEventListener("prerenderingchange", T, true);
      }, E = function() {
        return h < 0 && (h = g(), y(), c(function() {
          setTimeout(function() {
            h = g(), y();
          }, 0);
        })), { get firstHiddenTime() {
          return h;
        } };
      }, L = function(e2) {
        document.prerendering ? addEventListener("prerenderingchange", function() {
          return e2();
        }, true) : e2();
      }, b = [1800, 3e3], S = function(e2, n2) {
        n2 = n2 || {}, L(function() {
          var t2, i2 = E(), r2 = f("FCP"), o2 = d("paint", function(e3) {
            e3.forEach(function(e4) {
              "first-contentful-paint" === e4.name && (o2.disconnect(), e4.startTime < i2.firstHiddenTime && (r2.value = Math.max(e4.startTime - s(), 0), r2.entries.push(e4), t2(true)));
            });
          });
          o2 && (t2 = l(e2, r2, b, n2.reportAllChanges), c(function(i3) {
            r2 = f("FCP"), t2 = l(e2, r2, b, n2.reportAllChanges), p(function() {
              r2.value = performance.now() - i3.timeStamp, t2(true);
            });
          }));
        });
      }, w = [0.1, 0.25], P = function(e2, n2) {
        n2 = n2 || {}, S(m(function() {
          var t2, i2 = f("CLS", 0), r2 = 0, o2 = [], a2 = function(e3) {
            e3.forEach(function(e4) {
              if (!e4.hadRecentInput) {
                var n3 = o2[0], t3 = o2[o2.length - 1];
                r2 && e4.startTime - t3.startTime < 1e3 && e4.startTime - n3.startTime < 5e3 ? (r2 += e4.value, o2.push(e4)) : (r2 = e4.value, o2 = [e4]);
              }
            }), r2 > i2.value && (i2.value = r2, i2.entries = o2, t2());
          }, u2 = d("layout-shift", a2);
          u2 && (t2 = l(e2, i2, w, n2.reportAllChanges), v(function() {
            a2(u2.takeRecords()), t2(true);
          }), c(function() {
            r2 = 0, i2 = f("CLS", 0), t2 = l(e2, i2, w, n2.reportAllChanges), p(function() {
              return t2();
            });
          }), setTimeout(t2, 0));
        }));
      }, F = { passive: true, capture: true }, I = /* @__PURE__ */ new Date(), A = function(e2, r2) {
        n || (n = r2, t = e2, i = /* @__PURE__ */ new Date(), k(removeEventListener), M());
      }, M = function() {
        if (t >= 0 && t < i - I) {
          var e2 = { entryType: "first-input", name: n.type, target: n.target, cancelable: n.cancelable, startTime: n.timeStamp, processingStart: n.timeStamp + t };
          r.forEach(function(n2) {
            n2(e2);
          }), r = [];
        }
      }, D = function(e2) {
        if (e2.cancelable) {
          var n2 = (e2.timeStamp > 1e12 ? /* @__PURE__ */ new Date() : performance.now()) - e2.timeStamp;
          "pointerdown" == e2.type ? function(e3, n3) {
            var t2 = function() {
              A(e3, n3), r2();
            }, i2 = function() {
              r2();
            }, r2 = function() {
              removeEventListener("pointerup", t2, F), removeEventListener("pointercancel", i2, F);
            };
            addEventListener("pointerup", t2, F), addEventListener("pointercancel", i2, F);
          }(n2, e2) : A(n2, e2);
        }
      }, k = function(e2) {
        ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function(n2) {
          return e2(n2, D, F);
        });
      }, x = [100, 300], B = function(e2, i2) {
        i2 = i2 || {}, L(function() {
          var o2, a2 = E(), u2 = f("FID"), s2 = function(e3) {
            e3.startTime < a2.firstHiddenTime && (u2.value = e3.processingStart - e3.startTime, u2.entries.push(e3), o2(true));
          }, p2 = function(e3) {
            e3.forEach(s2);
          }, h2 = d("first-input", p2);
          o2 = l(e2, u2, x, i2.reportAllChanges), h2 && v(m(function() {
            p2(h2.takeRecords()), h2.disconnect();
          })), h2 && c(function() {
            var a3;
            u2 = f("FID"), o2 = l(e2, u2, x, i2.reportAllChanges), r = [], t = -1, n = null, k(addEventListener), a3 = s2, r.push(a3), M();
          });
        });
      }, N = 0, R = 1 / 0, H = 0, O = function(e2) {
        e2.forEach(function(e3) {
          e3.interactionId && (R = Math.min(R, e3.interactionId), H = Math.max(H, e3.interactionId), N = H ? (H - R) / 7 + 1 : 0);
        });
      }, j = function() {
        return o ? N : performance.interactionCount || 0;
      }, _ = function() {
        "interactionCount" in performance || o || (o = d("event", O, { type: "event", buffered: true, durationThreshold: 0 }));
      }, q = [200, 500], V = 0, z = function() {
        return j() - V;
      }, G = [], J = {}, K = function(e2) {
        var n2 = G[G.length - 1], t2 = J[e2.interactionId];
        if (t2 || G.length < 10 || e2.duration > n2.latency) {
          if (t2)
            t2.entries.push(e2), t2.latency = Math.max(t2.latency, e2.duration);
          else {
            var i2 = { id: e2.interactionId, latency: e2.duration, entries: [e2] };
            J[i2.id] = i2, G.push(i2);
          }
          G.sort(function(e3, n3) {
            return n3.latency - e3.latency;
          }), G.splice(10).forEach(function(e3) {
            delete J[e3.id];
          });
        }
      }, Q = function(e2, n2) {
        n2 = n2 || {}, L(function() {
          _();
          var t2, i2 = f("INP"), r2 = function(e3) {
            e3.forEach(function(e4) {
              (e4.interactionId && K(e4), "first-input" === e4.entryType) && (!G.some(function(n4) {
                return n4.entries.some(function(n5) {
                  return e4.duration === n5.duration && e4.startTime === n5.startTime;
                });
              }) && K(e4));
            });
            var n3, r3 = (n3 = Math.min(G.length - 1, Math.floor(z() / 50)), G[n3]);
            r3 && r3.latency !== i2.value && (i2.value = r3.latency, i2.entries = r3.entries, t2());
          }, o2 = d("event", r2, { durationThreshold: n2.durationThreshold || 40 });
          t2 = l(e2, i2, q, n2.reportAllChanges), o2 && (o2.observe({ type: "first-input", buffered: true }), v(function() {
            r2(o2.takeRecords()), i2.value < 0 && z() > 0 && (i2.value = 0, i2.entries = []), t2(true);
          }), c(function() {
            G = [], V = j(), i2 = f("INP"), t2 = l(e2, i2, q, n2.reportAllChanges);
          }));
        });
      }, U = [2500, 4e3], W = {}, X = function(e2, n2) {
        n2 = n2 || {}, L(function() {
          var t2, i2 = E(), r2 = f("LCP"), o2 = function(e3) {
            var n3 = e3[e3.length - 1];
            n3 && n3.startTime < i2.firstHiddenTime && (r2.value = Math.max(n3.startTime - s(), 0), r2.entries = [n3], t2());
          }, a2 = d("largest-contentful-paint", o2);
          if (a2) {
            t2 = l(e2, r2, U, n2.reportAllChanges);
            var u2 = m(function() {
              W[r2.id] || (o2(a2.takeRecords()), a2.disconnect(), W[r2.id] = true, t2(true));
            });
            ["keydown", "click"].forEach(function(e3) {
              addEventListener(e3, u2, true);
            }), v(u2), c(function(i3) {
              r2 = f("LCP"), t2 = l(e2, r2, U, n2.reportAllChanges), p(function() {
                r2.value = performance.now() - i3.timeStamp, W[r2.id] = true, t2(true);
              });
            });
          }
        });
      }, Y = [800, 1800], Z = function e2(n2) {
        document.prerendering ? L(function() {
          return e2(n2);
        }) : "complete" !== document.readyState ? addEventListener("load", function() {
          return e2(n2);
        }, true) : setTimeout(n2, 0);
      }, $ = function(e2, n2) {
        n2 = n2 || {};
        var t2 = f("TTFB"), i2 = l(e2, t2, Y, n2.reportAllChanges);
        Z(function() {
          var r2 = u();
          if (r2) {
            var o2 = r2.responseStart;
            if (o2 <= 0 || o2 > performance.now())
              return;
            t2.value = Math.max(o2 - s(), 0), t2.entries = [r2], i2(true), c(function() {
              t2 = f("TTFB", 0), (i2 = l(e2, t2, Y, n2.reportAllChanges))(true);
            });
          }
        });
      };
      e.CLSThresholds = w, e.FCPThresholds = b, e.FIDThresholds = x, e.INPThresholds = q, e.LCPThresholds = U, e.TTFBThresholds = Y, e.getCLS = P, e.getFCP = S, e.getFID = B, e.getINP = Q, e.getLCP = X, e.getTTFB = $, e.onCLS = P, e.onFCP = S, e.onFID = B, e.onINP = Q, e.onLCP = X, e.onTTFB = $, Object.defineProperty(e, "__esModule", { value: true });
    });
  }
});

// node_modules/@shopify/app-bridge-core/actions/WebVitals/index.js
var require_WebVitals = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/WebVitals/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = void 0;
    var Action2;
    (function(Action3) {
      Action3["LARGEST_CONTENTFUL_PAINT"] = "APP::WEB_VITALS::LARGEST_CONTENTFUL_PAINT";
      Action3["FIRST_INPUT_DELAY"] = "APP::WEB_VITALS::FIRST_INPUT_DELAY";
      Action3["CUMULATIVE_LAYOUT_SHIFT"] = "APP::WEB_VITALS::CUMULATIVE_LAYOUT_SHIFT";
      Action3["FIRST_CONTENTFUL_PAINT"] = "APP::WEB_VITALS::FIRST_CONTENTFUL_PAINT";
      Action3["TIME_TO_FIRST_BYTE"] = "APP::WEB_VITALS::TIME_TO_FIRST_BYTE";
      Action3["INTERACTION_TO_NEXT_PAINT"] = "APP::WEB_VITALS::INTERACTION_TO_NEXT_PAINT";
    })(Action2 = exports.Action || (exports.Action = {}));
  }
});

// node_modules/@shopify/app-bridge-core/util/env.js
var require_env = __commonJS({
  "node_modules/@shopify/app-bridge-core/util/env.js"(exports) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isUnframed = exports.isClient = exports.isServer = void 0;
    exports.isServer = typeof window === "undefined";
    exports.isClient = !exports.isServer;
    exports.isUnframed = exports.isClient && ((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.indexOf("Unframed")) > 0;
  }
});

// node_modules/@shopify/app-bridge/util/env.js
var require_env2 = __commonJS({
  "node_modules/@shopify/app-bridge/util/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isDevelopmentClient = exports.isProduction = exports.isDevelopment = exports.isUnframed = exports.isServer = exports.isClient = void 0;
    var env_1 = require_env();
    var env_2 = require_env();
    Object.defineProperty(exports, "isClient", { enumerable: true, get: function() {
      return env_2.isClient;
    } });
    Object.defineProperty(exports, "isServer", { enumerable: true, get: function() {
      return env_2.isServer;
    } });
    Object.defineProperty(exports, "isUnframed", { enumerable: true, get: function() {
      return env_2.isUnframed;
    } });
    exports.isDevelopment = typeof process !== "undefined" && process.env && true;
    exports.isProduction = !exports.isDevelopment;
    exports.isDevelopmentClient = exports.isDevelopment && env_1.isClient;
  }
});

// node_modules/@shopify/app-bridge/utilities/platform.js
var require_platform = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/platform.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isShopifyPing = exports.isShopifyPOS = exports.isShopifyMobile = exports.isShopifyEmbedded = exports.isMobile = void 0;
    var env_1 = require_env2();
    function isMobile() {
      return isShopifyMobile() || isShopifyPOS() || isShopifyPing();
    }
    exports.isMobile = isMobile;
    function isShopifyEmbedded() {
      return env_1.isClient && window.top !== window.self || env_1.isUnframed;
    }
    exports.isShopifyEmbedded = isShopifyEmbedded;
    function isShopifyMobile() {
      return typeof navigator !== "undefined" && navigator.userAgent.indexOf("Shopify Mobile") >= 0;
    }
    exports.isShopifyMobile = isShopifyMobile;
    function isShopifyPOS() {
      return typeof navigator !== "undefined" && navigator.userAgent.indexOf("Shopify POS") >= 0;
    }
    exports.isShopifyPOS = isShopifyPOS;
    function isShopifyPing() {
      return typeof navigator !== "undefined" && navigator.userAgent.indexOf("Shopify Ping") >= 0;
    }
    exports.isShopifyPing = isShopifyPing;
  }
});

// node_modules/@shopify/app-bridge/actions/WebVitals/actions.js
var require_actions4 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/WebVitals/actions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initializeWebVitals = exports.interactionToNextPaint = exports.timeToFirstByte = exports.firstContentfulPaint = exports.cumulativeLayoutShift = exports.firstInputDelay = exports.largestContentfulPaint = exports.Action = void 0;
    var web_vitals_1 = require_web_vitals_umd();
    var WebVitals_1 = require_WebVitals();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return WebVitals_1.Action;
    } });
    var env_1 = require_env2();
    var types_1 = require_types2();
    var helper_1 = require_helper2();
    var platform_1 = require_platform();
    function largestContentfulPaint(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.WebVitals,
        type: WebVitals_1.Action.LARGEST_CONTENTFUL_PAINT,
        payload
      });
    }
    exports.largestContentfulPaint = largestContentfulPaint;
    function firstInputDelay(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.WebVitals,
        type: WebVitals_1.Action.FIRST_INPUT_DELAY,
        payload
      });
    }
    exports.firstInputDelay = firstInputDelay;
    function cumulativeLayoutShift(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.WebVitals,
        type: WebVitals_1.Action.CUMULATIVE_LAYOUT_SHIFT,
        payload
      });
    }
    exports.cumulativeLayoutShift = cumulativeLayoutShift;
    function firstContentfulPaint(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.WebVitals,
        type: WebVitals_1.Action.FIRST_CONTENTFUL_PAINT,
        payload
      });
    }
    exports.firstContentfulPaint = firstContentfulPaint;
    function timeToFirstByte(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.WebVitals,
        type: WebVitals_1.Action.TIME_TO_FIRST_BYTE,
        payload
      });
    }
    exports.timeToFirstByte = timeToFirstByte;
    function interactionToNextPaint(payload) {
      return helper_1.actionWrapper({
        group: types_1.Group.WebVitals,
        type: WebVitals_1.Action.INTERACTION_TO_NEXT_PAINT,
        payload
      });
    }
    exports.interactionToNextPaint = interactionToNextPaint;
    function initializeWebVitals(app) {
      function onReport(cb) {
        return function(data) {
          var id = data.id, metricName = data.name, value = data.value;
          var payload = { id, metricName, value };
          var event = cb(payload);
          app.dispatch(event);
        };
      }
      var untypedWindow = window;
      if (env_1.isServer || env_1.isClient && untypedWindow.__is_web_vitals_initialized__ || platform_1.isMobile()) {
        return;
      }
      untypedWindow.__is_web_vitals_initialized__ = true;
      web_vitals_1.onLCP(onReport(largestContentfulPaint));
      web_vitals_1.onFID(onReport(firstInputDelay));
      web_vitals_1.onCLS(onReport(cumulativeLayoutShift));
      web_vitals_1.onFCP(onReport(firstContentfulPaint));
      web_vitals_1.onTTFB(onReport(timeToFirstByte));
      web_vitals_1.onINP(onReport(interactionToNextPaint));
    }
    exports.initializeWebVitals = initializeWebVitals;
  }
});

// node_modules/@shopify/app-bridge/actions/WebVitals/index.js
var require_WebVitals2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/WebVitals/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_actions4(), exports);
  }
});

// node_modules/@shopify/app-bridge-core/actions/validator.js
var require_validator = __commonJS({
  "node_modules/@shopify/app-bridge-core/actions/validator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPermitted = exports.getPermissionKey = exports.isPerformanceOrWebVitalsAction = exports.isAppMessage = exports.isAppBridgeAction = void 0;
    var types_1 = require_types3();
    var constants_1 = require_constants();
    var helper_1 = require_helper();
    function isAppBridgeAction(action) {
      return action instanceof Object && Object.prototype.hasOwnProperty.call(action, "type") && action.type.toString().startsWith(constants_1.PREFIX);
    }
    exports.isAppBridgeAction = isAppBridgeAction;
    function isAppMessage(event) {
      if (typeof event !== "object" || !event.data || typeof event.data !== "object") {
        return false;
      }
      var data = event.data;
      return Object.prototype.hasOwnProperty.call(data, "type") && helper_1.findMatchInEnum(types_1.MessageType, data.type) !== void 0;
    }
    exports.isAppMessage = isAppMessage;
    function isPerformanceOrWebVitalsAction(_a) {
      var type = _a.type;
      return type.match(/^APP::(PERFORMANCE|WEB_VITALS)::/);
    }
    exports.isPerformanceOrWebVitalsAction = isPerformanceOrWebVitalsAction;
    function getPermissionKey(type) {
      return type.replace(new RegExp("^" + constants_1.PREFIX + constants_1.SEPARATOR + "\\w+" + constants_1.SEPARATOR), "");
    }
    exports.getPermissionKey = getPermissionKey;
    function isPermitted(features, _a, permissionType) {
      var group = _a.group, type = _a.type;
      if (!group || !Object.prototype.hasOwnProperty.call(features, group)) {
        return false;
      }
      var feature = features[group];
      if (!feature) {
        return false;
      }
      var actionType = getPermissionKey(type);
      return feature[actionType] ? feature[actionType][permissionType] === true : false;
    }
    exports.isPermitted = isPermitted;
  }
});

// node_modules/@shopify/app-bridge/actions/validator.js
var require_validator2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/validator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isFromApp = exports.isPerformanceOrWebVitalsAction = exports.getPermissionKey = exports.isPermitted = exports.isAppMessage = exports.isAppBridgeAction = void 0;
    var validator_1 = require_validator();
    Object.defineProperty(exports, "isAppBridgeAction", { enumerable: true, get: function() {
      return validator_1.isAppBridgeAction;
    } });
    Object.defineProperty(exports, "isAppMessage", { enumerable: true, get: function() {
      return validator_1.isAppMessage;
    } });
    Object.defineProperty(exports, "isPermitted", { enumerable: true, get: function() {
      return validator_1.isPermitted;
    } });
    Object.defineProperty(exports, "getPermissionKey", { enumerable: true, get: function() {
      return validator_1.getPermissionKey;
    } });
    Object.defineProperty(exports, "isPerformanceOrWebVitalsAction", { enumerable: true, get: function() {
      return validator_1.isPerformanceOrWebVitalsAction;
    } });
    function isFromApp(action) {
      if (typeof action !== "object" || typeof action.source !== "object") {
        return false;
      }
      return typeof action.source.apiKey === "string";
    }
    exports.isFromApp = isFromApp;
  }
});

// node_modules/@shopify/app-bridge/actions/index.js
var require_actions5 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVitals = exports.unstable_Picker = exports.Performance = exports.Pos = exports.AppLink = exports.ChannelMenu = exports.NavigationMenu = exports.Share = exports.ContextualSaveBar = exports.MarketingExternalActivityTopBar = exports.TitleBar = exports.SessionToken = exports.ResourcePicker = exports.Redirect = exports.Print = exports.ModalContent = exports.Modal = exports.Loading = exports.LeaveConfirmation = exports.History = exports.Toast = exports.Fullscreen = exports.FeedbackModal = exports.Features = exports.Flash = exports.Error = exports.Client = exports.Cart = exports.Scanner = exports.ButtonGroup = exports.Button = exports.AuthCode = exports.isAppBridgeAction = void 0;
    var AuthCode = __importStar(require_AuthCode2());
    exports.AuthCode = AuthCode;
    var Button2 = __importStar(require_Button2());
    exports.Button = Button2;
    var ButtonGroup = __importStar(require_ButtonGroup2());
    exports.ButtonGroup = ButtonGroup;
    var Cart = __importStar(require_Cart2());
    exports.Cart = Cart;
    var Client = __importStar(require_Client2());
    exports.Client = Client;
    var Error2 = __importStar(require_Error2());
    exports.Error = Error2;
    var Flash = __importStar(require_Flash());
    exports.Flash = Flash;
    var Features = __importStar(require_Features2());
    exports.Features = Features;
    var FeedbackModal = __importStar(require_FeedbackModal2());
    exports.FeedbackModal = FeedbackModal;
    var Fullscreen = __importStar(require_Fullscreen2());
    exports.Fullscreen = Fullscreen;
    var LeaveConfirmation = __importStar(require_LeaveConfirmation2());
    exports.LeaveConfirmation = LeaveConfirmation;
    var Loading = __importStar(require_Loading2());
    exports.Loading = Loading;
    var Modal2 = __importStar(require_Modal2());
    exports.Modal = Modal2;
    var ModalContent = __importStar(require_ModalContent2());
    exports.ModalContent = ModalContent;
    var History = __importStar(require_History2());
    exports.History = History;
    var Redirect4 = __importStar(require_Redirect2());
    exports.Redirect = Redirect4;
    var Print = __importStar(require_Print2());
    exports.Print = Print;
    var ResourcePicker = __importStar(require_ResourcePicker2());
    exports.ResourcePicker = ResourcePicker;
    var Scanner = __importStar(require_Scanner2());
    exports.Scanner = Scanner;
    var SessionToken = __importStar(require_SessionToken2());
    exports.SessionToken = SessionToken;
    var TitleBar = __importStar(require_TitleBar2());
    exports.TitleBar = TitleBar;
    var Toast = __importStar(require_Toast2());
    exports.Toast = Toast;
    var ContextualSaveBar = __importStar(require_ContextualSaveBar2());
    exports.ContextualSaveBar = ContextualSaveBar;
    var Share = __importStar(require_Share2());
    exports.Share = Share;
    var NavigationMenu = __importStar(require_NavigationMenu2());
    exports.NavigationMenu = NavigationMenu;
    var ChannelMenu = __importStar(require_ChannelMenu2());
    exports.ChannelMenu = ChannelMenu;
    var AppLink = __importStar(require_AppLink2());
    exports.AppLink = AppLink;
    var Pos = __importStar(require_Pos2());
    exports.Pos = Pos;
    var MarketingExternalActivityTopBar = __importStar(require_MarketingExternalActivityTopBar2());
    exports.MarketingExternalActivityTopBar = MarketingExternalActivityTopBar;
    var Performance2 = __importStar(require_Performance2());
    exports.Performance = Performance2;
    var unstable_Picker = __importStar(require_Picker2());
    exports.unstable_Picker = unstable_Picker;
    var WebVitals = __importStar(require_WebVitals2());
    exports.WebVitals = WebVitals;
    var validator_1 = require_validator2();
    Object.defineProperty(exports, "isAppBridgeAction", { enumerable: true, get: function() {
      return validator_1.isAppBridgeAction;
    } });
    __exportStar(require_types2(), exports);
  }
});

// node_modules/@shopify/app-bridge-react/context.js
var require_context = __commonJS({
  "node_modules/@shopify/app-bridge-react/context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppBridgeContext = void 0;
    var react_1 = require_react();
    exports.AppBridgeContext = react_1.createContext(null);
  }
});

// node_modules/@shopify/app-bridge-react/useAppBridge.js
var require_useAppBridge = __commonJS({
  "node_modules/@shopify/app-bridge-react/useAppBridge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAppBridge = void 0;
    var react_1 = require_react();
    var context_1 = require_context();
    function useAppBridge3() {
      var appBridge = react_1.useContext(context_1.AppBridgeContext);
      if (!appBridge) {
        throw new Error("No AppBridge context provided. Your component must be wrapped in the <Provider> component from App Bridge React.");
      }
      return appBridge;
    }
    exports.useAppBridge = useAppBridge3;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useAppBridgeState/useAppBridgeState.js
var require_useAppBridgeState = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useAppBridgeState/useAppBridgeState.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAppBridgeState = void 0;
    var react_1 = require_react();
    var useAppBridge_1 = require_useAppBridge();
    var useAppBridgeState = function(query) {
      var app = useAppBridge_1.useAppBridge();
      var _a = react_1.useState(), state = _a[0], setState = _a[1];
      var isUnmounted = react_1.useRef(false);
      var refresh = react_1.useCallback(function() {
        return __awaiter(void 0, void 0, void 0, function() {
          var newState, _a2;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                if (!query)
                  return [3, 2];
                return [4, app.getState(query)];
              case 1:
                _a2 = _b.sent();
                return [3, 4];
              case 2:
                return [4, app.getState()];
              case 3:
                _a2 = _b.sent();
                _b.label = 4;
              case 4:
                newState = _a2;
                if (isUnmounted.current) {
                  return [
                    2
                    /*return*/
                  ];
                }
                setState(function(currentState) {
                  if (JSON.stringify(newState) === JSON.stringify(currentState)) {
                    return currentState;
                  }
                  return newState;
                });
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, [app, query]);
      react_1.useEffect(function() {
        refresh();
        return app.subscribe(function() {
          refresh();
        });
      }, [app, refresh]);
      react_1.useEffect(function() {
        return function() {
          isUnmounted.current = true;
        };
      }, [app]);
      return state;
    };
    exports.useAppBridgeState = useAppBridgeState;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useAppBridgeState/index.js
var require_useAppBridgeState2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useAppBridgeState/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_useAppBridgeState(), exports);
  }
});

// node_modules/@shopify/app-bridge-core/MessageTransport.js
var require_MessageTransport = __commonJS({
  "node_modules/@shopify/app-bridge-core/MessageTransport.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createTransportListener = exports.fromWindow = exports.fromFrame = exports.Context = void 0;
    var Error_1 = require_Error();
    var validator_1 = require_validator();
    var types_1 = require_types3();
    var collection_1 = require_collection();
    var env_1 = require_env();
    var Context;
    (function(Context2) {
      Context2["Modal"] = "Modal";
      Context2["Main"] = "Main";
    })(Context = exports.Context || (exports.Context = {}));
    function fromFrame(frame, localOrigin, context) {
      var handlers = [];
      var host = frame.host, frameWindow = frame.window;
      if (!host) {
        throw Error_1.fromAction("App frame is undefined", Error_1.AppActionType.WINDOW_UNDEFINED);
      }
      if (env_1.isUnframed && window.MobileWebView) {
        Object.assign(window.MobileWebView, {
          postMessageToIframe: function(message, origin) {
            frameWindow === null || frameWindow === void 0 ? void 0 : frameWindow.postMessage(message, origin);
            if (isDispatchAction(message)) {
              host.postMessage(JSON.stringify(message.payload), location.origin);
            }
          },
          updateIframeUrl: function(newUrl) {
            var currentWindowLocation = window.location;
            var frameWindowLocation = (frame.window || {}).location;
            try {
              var newUrlOrigin = new URL(newUrl).origin;
              if (newUrlOrigin === localOrigin && frameWindowLocation) {
                frameWindowLocation.replace(newUrl);
              } else {
                currentWindowLocation.href = newUrl;
              }
            } catch (_) {
            }
          }
        });
      }
      host.addEventListener("message", function(event) {
        if (event.source === host || !validator_1.isAppMessage(event)) {
          return;
        }
        if (event.origin !== localOrigin) {
          var errorMessage = "Message origin '" + event.origin + "' does not match app origin '" + localOrigin + "'.";
          var payload = Error_1.invalidOriginAction(errorMessage);
          var message = {
            type: "dispatch",
            payload
          };
          frameWindow === null || frameWindow === void 0 ? void 0 : frameWindow.postMessage(message, event.origin);
          return;
        }
        if (env_1.isUnframed && window.MobileWebView) {
          var payload = JSON.stringify({
            id: "unframed://fromClient",
            origin: localOrigin,
            data: event.data
          });
          window.MobileWebView.postMessage(payload);
          return;
        }
        for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
          var handler = handlers_1[_i];
          handler(event);
        }
      });
      return {
        context,
        localOrigin,
        frameWindow,
        hostFrame: host,
        dispatch: function(message) {
          frameWindow === null || frameWindow === void 0 ? void 0 : frameWindow.postMessage(message, localOrigin);
        },
        subscribe: function(handler) {
          return collection_1.addAndRemoveFromCollection(handlers, handler);
        }
      };
    }
    exports.fromFrame = fromFrame;
    function fromWindow(contentWindow, localOrigin) {
      var handlers = [];
      if (typeof window !== void 0) {
        window.addEventListener("message", function(event) {
          if (window === contentWindow && !env_1.isUnframed || event.source !== contentWindow || !(validator_1.isAppBridgeAction(event.data.payload) || validator_1.isAppMessage(event))) {
            return;
          }
          for (var _i = 0, handlers_2 = handlers; _i < handlers_2.length; _i++) {
            var handler = handlers_2[_i];
            handler(event);
          }
        });
      }
      return {
        localOrigin,
        hostFrame: contentWindow,
        dispatch: function(message) {
          var _a;
          if (!((_a = message.source) === null || _a === void 0 ? void 0 : _a.host)) {
            return;
          }
          if (env_1.isUnframed && window && window.MobileWebView) {
            var payload = JSON.stringify({
              id: "unframed://fromClient",
              origin: localOrigin,
              data: message
            });
            window.MobileWebView.postMessage(payload);
            return;
          }
          var messageOrigin = new URL("https://" + message.source.host).origin;
          contentWindow.postMessage(message, messageOrigin);
        },
        subscribe: function(handler) {
          return collection_1.addAndRemoveFromCollection(handlers, handler);
        }
      };
    }
    exports.fromWindow = fromWindow;
    function createTransportListener() {
      var listeners = [];
      var actionListeners = {};
      function createSubscribeHandler(dispatcher) {
        function subscribe() {
          if (arguments.length < 2) {
            return collection_1.addAndRemoveFromCollection(listeners, { callback: arguments[0] });
          }
          var _a = Array.from(arguments), type = _a[0], callback = _a[1], id = _a[2];
          var actionCallback = { callback, id };
          var payload = { type, id };
          if (!Object.prototype.hasOwnProperty.call(actionListeners, type)) {
            actionListeners[type] = [];
          }
          if (dispatcher) {
            dispatcher(types_1.MessageType.Subscribe, payload);
          }
          return collection_1.addAndRemoveFromCollection(actionListeners[type], actionCallback, function() {
            if (dispatcher) {
              dispatcher(types_1.MessageType.Unsubscribe, payload);
            }
          });
        }
        return subscribe;
      }
      return {
        createSubscribeHandler,
        handleMessage: function(message) {
          listeners.forEach(function(listener) {
            return listener.callback(message);
          });
        },
        handleActionDispatch: function(_a) {
          var type = _a.type, payload = _a.payload;
          var hasCallback = false;
          if (Object.prototype.hasOwnProperty.call(actionListeners, type)) {
            for (var _i = 0, _b = actionListeners[type]; _i < _b.length; _i++) {
              var listener = _b[_i];
              var id = listener.id, callback = listener.callback;
              var matchId = payload && payload.id === id;
              if (matchId || !id) {
                callback(payload);
                hasCallback = true;
              }
            }
          }
          return hasCallback;
        }
      };
    }
    exports.createTransportListener = createTransportListener;
    function isDispatchAction(message) {
      return message !== null && typeof message === "object" && !Array.isArray(message) && message.type === "dispatch" && typeof message.payload === "object";
    }
  }
});

// node_modules/@shopify/app-bridge/MessageTransport.js
var require_MessageTransport2 = __commonJS({
  "node_modules/@shopify/app-bridge/MessageTransport.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_MessageTransport(), exports);
  }
});

// node_modules/@shopify/app-bridge/utilities/modal.js
var require_modal = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/modal.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createMutationObserver = exports.setupModalAutoSizing = void 0;
    var Modal_1 = require_Modal2();
    var MessageTransport_1 = require_MessageTransport2();
    var platform_1 = require_platform();
    var AUTO_SIZE_CLASS = "app-bridge-utils-modal-auto-size";
    var autoSizeStylesheet = createAutoSizeStylesheet();
    function createAutoSizeStylesheet() {
      if (typeof document === "undefined") {
        return null;
      }
      var autoSizeStylesheet2 = document.createElement("style");
      autoSizeStylesheet2.type = "text/css";
      autoSizeStylesheet2.innerHTML = "." + AUTO_SIZE_CLASS + " { overflow: hidden; height: auto; min-height: auto; }";
      return autoSizeStylesheet2;
    }
    function addAutoSizing(app, id) {
      if (!autoSizeStylesheet) {
        return function() {
        };
      }
      var head = document.getElementsByTagName("head")[0];
      var classList = document.body.classList;
      head.appendChild(autoSizeStylesheet);
      classList.add(AUTO_SIZE_CLASS);
      var mutationObserver = createMutationObserver(app, id);
      return function() {
        classList.remove(AUTO_SIZE_CLASS);
        if (head.contains(autoSizeStylesheet)) {
          head.removeChild(autoSizeStylesheet);
        }
        if (mutationObserver) {
          mutationObserver.disconnect();
        }
      };
    }
    function setupModalAutoSizing(app) {
      return __awaiter(this, void 0, void 0, function() {
        function cleanup() {
          if (removeAutoSizing) {
            removeAutoSizing();
            removeAutoSizing = void 0;
          }
        }
        function handleModalSizeUpdate(appState) {
          var context = appState.context, id = appState.modal.id;
          if (platform_1.isMobile() || context !== MessageTransport_1.Context.Modal) {
            cleanup();
            return cleanup;
          }
          if (!removeAutoSizing) {
            removeAutoSizing = addAutoSizing(app, id);
          }
          return cleanup;
        }
        var removeAutoSizing;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, app.getState().then(handleModalSizeUpdate)];
            case 1:
              _a.sent();
              return [2, cleanup];
          }
        });
      });
    }
    exports.setupModalAutoSizing = setupModalAutoSizing;
    function createMutationObserver(app, id) {
      if (typeof document === "undefined") {
        return;
      }
      var lastKnownWindowHeight = -1;
      var mutationTimeoutId;
      var mutationObserverConfig = {
        attributes: true,
        attributeOldValue: false,
        characterData: true,
        characterDataOldValue: false,
        childList: true,
        subtree: true
      };
      var mutationObserver = new MutationObserver(debouncedResizeHandler);
      mutationObserver.observe(document, mutationObserverConfig);
      updateHeight();
      function debouncedResizeHandler() {
        if (mutationTimeoutId) {
          window.clearTimeout(mutationTimeoutId);
        }
        mutationTimeoutId = window.setTimeout(updateHeight, 16);
      }
      function updateHeight() {
        var height = document.body.scrollHeight;
        if (height !== lastKnownWindowHeight) {
          lastKnownWindowHeight = height;
          app.dispatch(Modal_1.updateModalSize({ id, height: String(height) }));
        }
      }
      return mutationObserver;
    }
    exports.createMutationObserver = createMutationObserver;
  }
});

// node_modules/@shopify/app-bridge/utilities/session-token/session-token.js
var require_session_token = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/session-token/session-token.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSessionToken = void 0;
    var Error_1 = require_Error();
    var SessionToken = __importStar(require_SessionToken());
    function getSessionToken(appBridge) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, new Promise(function(resolve, reject) {
            var unsubscribe = appBridge.subscribe(SessionToken.Action.RESPOND, function(_a2) {
              var sessionToken = _a2.sessionToken;
              if (sessionToken) {
                resolve(sessionToken);
              } else {
                reject(Error_1.fromAction("Failed to retrieve a session token", Error_1.Action.FAILED_AUTHENTICATION));
              }
              unsubscribe();
            });
            appBridge.dispatch(SessionToken.request());
          })];
        });
      });
    }
    exports.getSessionToken = getSessionToken;
  }
});

// node_modules/@shopify/app-bridge/utilities/session-token/authenticated-fetch.js
var require_authenticated_fetch = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/session-token/authenticated-fetch.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.authenticatedFetch = void 0;
    var actions_1 = require_actions5();
    var session_token_1 = require_session_token();
    function authenticatedFetch(app, fetchOperationOrOptions) {
      var _this = this;
      if (fetchOperationOrOptions === void 0) {
        fetchOperationOrOptions = void 0;
      }
      return function(uri, options) {
        if (options === void 0) {
          options = {};
        }
        return __awaiter(_this, void 0, void 0, function() {
          var sessionToken, headers, finalHeaders, authenticatedFetchOptions, fetchOperation, response, reauthorizeUrl_1, requestFailureReauthorizeUrlHeader_1;
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                return [4, session_token_1.getSessionToken(app)];
              case 1:
                sessionToken = _b.sent();
                headers = new Headers(options.headers);
                headers.append("Authorization", "Bearer " + sessionToken);
                headers.append("X-Requested-With", "XMLHttpRequest");
                finalHeaders = {};
                headers.forEach(function(value, key) {
                  finalHeaders[key] = value;
                });
                authenticatedFetchOptions = typeof fetchOperationOrOptions === "object" ? fetchOperationOrOptions : void 0;
                fetchOperation = typeof fetchOperationOrOptions === "function" ? fetchOperationOrOptions : (_a = authenticatedFetchOptions === null || authenticatedFetchOptions === void 0 ? void 0 : authenticatedFetchOptions.fetchOperation) !== null && _a !== void 0 ? _a : fetch;
                return [4, fetchOperation(uri, __assign(__assign({}, options), { headers: finalHeaders }))];
              case 2:
                response = _b.sent();
                if (authenticatedFetchOptions) {
                  reauthorizeUrl_1 = authenticatedFetchOptions.reauthorizeUrl, requestFailureReauthorizeUrlHeader_1 = authenticatedFetchOptions.requestFailureReauthorizeUrlHeader;
                  response.headers.forEach(function(value, name) {
                    if (requestFailureReauthorizeUrlHeader_1.toLowerCase() === name.toLowerCase()) {
                      var redirectUrl = new URL(reauthorizeUrl_1 || value, location.href).href;
                      var redirect = actions_1.Redirect.create(app);
                      if (redirectUrl) {
                        redirect.dispatch(actions_1.Redirect.Action.REMOTE, redirectUrl);
                      } else {
                        console.warn("Couldn't find a fallback auth path to redirect to.");
                      }
                    }
                  });
                }
                return [2, response];
            }
          });
        });
      };
    }
    exports.authenticatedFetch = authenticatedFetch;
  }
});

// node_modules/@shopify/app-bridge/utilities/session-token/index.js
var require_session_token2 = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/session-token/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_session_token(), exports);
    __exportStar(require_authenticated_fetch(), exports);
  }
});

// node_modules/@shopify/app-bridge/actions/uuid.js
var require_uuid2 = __commonJS({
  "node_modules/@shopify/app-bridge/actions/uuid.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateUuid = void 0;
    var uuid_1 = require_uuid();
    Object.defineProperty(exports, "generateUuid", { enumerable: true, get: function() {
      return uuid_1.generateUuid;
    } });
    exports.default = uuid_1.generateUuid;
  }
});

// node_modules/@shopify/app-bridge/utilities/authorization-code/authorization-code.js
var require_authorization_code = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/authorization-code/authorization-code.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAuthorizationCodePayload = void 0;
    var AuthCode = __importStar(require_AuthCode2());
    var Error_1 = require_Error2();
    var uuid_1 = __importDefault(require_uuid2());
    function getAuthorizationCodePayload(app) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, new Promise(function(resolve, reject) {
            var requestId = uuid_1.default();
            var unsubscribe = app.subscribe(AuthCode.Action.RESPOND, function(payload) {
              switch (payload === null || payload === void 0 ? void 0 : payload.status) {
                case "needsExchange":
                  resolve(payload);
                  break;
                default:
                  reject(Error_1.fromAction("Failed to retrieve an authorization code", Error_1.Action.FAILED_AUTHENTICATION));
              }
              unsubscribe();
            }, requestId);
            app.dispatch(AuthCode.request(requestId));
          })];
        });
      });
    }
    exports.getAuthorizationCodePayload = getAuthorizationCodePayload;
  }
});

// node_modules/@shopify/app-bridge/utilities/authorization-code/user-authorized-fetch.js
var require_user_authorized_fetch = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/authorization-code/user-authorized-fetch.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.userAuthorizedFetch = void 0;
    var authorization_code_1 = require_authorization_code();
    var DEFAULT_CALLBACK_URI = "auth/shopify/callback";
    function needsAuthorizationCode(response) {
      var headerValue = response.headers.get("X-Shopify-API-Request-Failure-Unauthorized");
      if (headerValue) {
        return headerValue.toLowerCase() === "true";
      }
      return false;
    }
    function userAuthorizedFetch(_a) {
      var _this = this;
      var app = _a.app, _b = _a.callbackUri, callbackUri = _b === void 0 ? DEFAULT_CALLBACK_URI : _b, _c = _a.isAuthorizationCodeRequired, isAuthorizationCodeRequired = _c === void 0 ? needsAuthorizationCode : _c, fetchOperation = _a.fetchOperation;
      return function(uri, options) {
        return __awaiter(_this, void 0, void 0, function() {
          var response, _a2, code, hmac, shop, timestamp, formattedCallbackUri, callbackResponse;
          return __generator(this, function(_b2) {
            switch (_b2.label) {
              case 0:
                return [4, fetchOperation(uri, options)];
              case 1:
                response = _b2.sent();
                if (!isAuthorizationCodeRequired(response)) {
                  return [2, response];
                }
                return [4, authorization_code_1.getAuthorizationCodePayload(app)];
              case 2:
                _a2 = _b2.sent(), code = _a2.code, hmac = _a2.hmac, shop = _a2.shop, timestamp = _a2.timestamp;
                formattedCallbackUri = encodeURI("https://" + window.location.hostname + "/" + callbackUri + "?code=" + code + "&hmac=" + hmac + "&shop=" + shop + "&timestamp=" + timestamp);
                return [4, fetchOperation(formattedCallbackUri, {})];
              case 3:
                callbackResponse = _b2.sent();
                if (!callbackResponse.ok) {
                  throw new Error("Failed to authorize request.");
                }
                return [2, fetchOperation(uri, options)];
            }
          });
        });
      };
    }
    exports.userAuthorizedFetch = userAuthorizedFetch;
  }
});

// node_modules/@shopify/app-bridge/utilities/authorization-code/index.js
var require_authorization_code2 = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/authorization-code/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_authorization_code(), exports);
    __exportStar(require_user_authorized_fetch(), exports);
  }
});

// node_modules/@shopify/app-bridge/utilities/index.js
var require_utilities = __commonJS({
  "node_modules/@shopify/app-bridge/utilities/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_modal(), exports);
    __exportStar(require_platform(), exports);
    __exportStar(require_session_token2(), exports);
    __exportStar(require_authorization_code2(), exports);
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useAuthenticatedFetch/useAuthenticatedFetch.js
var require_useAuthenticatedFetch = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useAuthenticatedFetch/useAuthenticatedFetch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAuthenticatedFetch = void 0;
    var react_1 = require_react();
    var utilities_1 = require_utilities();
    var useAppBridge_1 = require_useAppBridge();
    function useAuthenticatedFetch(options) {
      if (options === void 0) {
        options = void 0;
      }
      var app = useAppBridge_1.useAppBridge();
      var fetchFunction = react_1.useMemo(function() {
        return utilities_1.authenticatedFetch(app, options);
      }, [app, options]);
      return fetchFunction;
    }
    exports.useAuthenticatedFetch = useAuthenticatedFetch;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useAuthenticatedFetch/index.js
var require_useAuthenticatedFetch2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useAuthenticatedFetch/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_useAuthenticatedFetch(), exports);
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useContextualSaveBar/useContextualSaveBar.js
var require_useContextualSaveBar = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useContextualSaveBar/useContextualSaveBar.js"(exports) {
    "use strict";
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useContextualSaveBar = void 0;
    var react_1 = require_react();
    var ContextualSaveBar_1 = require_ContextualSaveBar2();
    var useAppBridge_1 = require_useAppBridge();
    function useContextualSaveBar() {
      var app = useAppBridge_1.useAppBridge();
      var visibleRef = react_1.useRef(false);
      var _a = react_1.useState(), onSaveAction = _a[0], setOnSaveAction = _a[1];
      var _b = react_1.useState(), onDiscardAction = _b[0], setOnDiscardAction = _b[1];
      var contextualSaveBar = react_1.useMemo(function() {
        return ContextualSaveBar_1.create(app);
      }, [app]);
      var show = react_1.useCallback(function(options) {
        if (options) {
          contextualSaveBar.set(options, false);
        }
        contextualSaveBar.dispatch(ContextualSaveBar_1.Action.SHOW);
        visibleRef.current = true;
      }, [contextualSaveBar]);
      var hide = react_1.useCallback(function() {
        contextualSaveBar.dispatch(ContextualSaveBar_1.Action.HIDE);
        visibleRef.current = false;
      }, [contextualSaveBar]);
      var saveAction = react_1.useMemo(function() {
        return {
          setOptions: function(_a2) {
            var onAction = _a2.onAction, saveAction2 = __rest(_a2, ["onAction"]);
            var shouldUpdate = JSON.stringify(contextualSaveBar.options.saveAction) !== JSON.stringify(saveAction2) && visibleRef.current;
            setOnSaveAction(function() {
              return onAction;
            });
            contextualSaveBar.set({ saveAction: saveAction2 }, shouldUpdate);
          }
        };
      }, [contextualSaveBar]);
      var discardAction = react_1.useMemo(function() {
        return {
          setOptions: function(_a2) {
            var onAction = _a2.onAction, discardAction2 = __rest(_a2, ["onAction"]);
            var shouldUpdate = JSON.stringify(contextualSaveBar.options.discardAction) !== JSON.stringify(discardAction2) && visibleRef.current;
            setOnDiscardAction(function() {
              return onAction;
            });
            contextualSaveBar.set({ discardAction: discardAction2 }, shouldUpdate);
          }
        };
      }, [contextualSaveBar]);
      react_1.useEffect(function() {
        return function() {
          if (visibleRef.current) {
            hide();
          }
        };
      }, []);
      react_1.useEffect(function() {
        return contextualSaveBar.subscribe(ContextualSaveBar_1.Action.DISCARD, function() {
          onDiscardAction === null || onDiscardAction === void 0 ? void 0 : onDiscardAction();
        });
      }, [contextualSaveBar, onDiscardAction]);
      react_1.useEffect(function() {
        return contextualSaveBar.subscribe(ContextualSaveBar_1.Action.SAVE, function() {
          onSaveAction === null || onSaveAction === void 0 ? void 0 : onSaveAction();
        });
      }, [contextualSaveBar, onSaveAction]);
      return { show, hide, saveAction, discardAction };
    }
    exports.useContextualSaveBar = useContextualSaveBar;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useContextualSaveBar/index.js
var require_useContextualSaveBar2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useContextualSaveBar/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useContextualSaveBar = void 0;
    var useContextualSaveBar_1 = require_useContextualSaveBar();
    Object.defineProperty(exports, "useContextualSaveBar", { enumerable: true, get: function() {
      return useContextualSaveBar_1.useContextualSaveBar;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useFeaturesAvailable/useFeaturesAvailable.js
var require_useFeaturesAvailable = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useFeaturesAvailable/useFeaturesAvailable.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useFeaturesAvailable = void 0;
    var react_1 = require_react();
    var types_1 = require_types5();
    var useAppBridge_1 = require_useAppBridge();
    function useFeaturesAvailable() {
      var _this = this;
      var query = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        query[_i] = arguments[_i];
      }
      var app = useAppBridge_1.useAppBridge();
      var _a = react_1.useState(), state = _a[0], setState = _a[1];
      var queryRef = react_1.useRef([]);
      var refresh = react_1.useCallback(function() {
        var isUnmounted = false;
        (function() {
          return __awaiter(_this, void 0, void 0, function() {
            var features;
            return __generator(this, function(_a2) {
              switch (_a2.label) {
                case 0:
                  return [4, app.featuresAvailable.apply(app, queryRef.current)];
                case 1:
                  features = _a2.sent();
                  if (!isUnmounted) {
                    setState(function(currentFeatures) {
                      if (JSON.stringify(currentFeatures) === JSON.stringify(features)) {
                        return currentFeatures;
                      }
                      return features;
                    });
                  }
                  return [
                    2
                    /*return*/
                  ];
              }
            });
          });
        })();
        return function() {
          isUnmounted = true;
        };
      }, [app]);
      react_1.useEffect(function() {
        queryRef.current = query;
        return refresh();
      }, [JSON.stringify(query)]);
      react_1.useEffect(function() {
        var onRefreshCleanup;
        var unsubscribe = app.subscribe(types_1.Action.UPDATE, function() {
          onRefreshCleanup = refresh();
        });
        return function() {
          unsubscribe();
          onRefreshCleanup === null || onRefreshCleanup === void 0 ? void 0 : onRefreshCleanup();
        };
      }, [app, refresh]);
      return state;
    }
    exports.useFeaturesAvailable = useFeaturesAvailable;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useFeaturesAvailable/index.js
var require_useFeaturesAvailable2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useFeaturesAvailable/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useFeaturesAvailable = void 0;
    var useFeaturesAvailable_1 = require_useFeaturesAvailable();
    Object.defineProperty(exports, "useFeaturesAvailable", { enumerable: true, get: function() {
      return useFeaturesAvailable_1.useFeaturesAvailable;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useFeatureRequest/useFeatureRequest.js
var require_useFeatureRequest = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useFeatureRequest/useFeatureRequest.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useFeatureRequest = void 0;
    var react_1 = require_react();
    var Features_1 = require_Features2();
    var useAppBridge_1 = require_useAppBridge();
    var useFeaturesAvailable_1 = require_useFeaturesAvailable2();
    function useFeatureRequest(group, action) {
      var app = useAppBridge_1.useAppBridge();
      var featuresAvailable = useFeaturesAvailable_1.useFeaturesAvailable();
      var _a = react_1.useState(), feature = _a[0], setFeature = _a[1];
      var handleFeatureUpdate = react_1.useCallback(function(featuresAvailable2) {
        var updatedFeatures = featuresAvailable2 === null || featuresAvailable2 === void 0 ? void 0 : featuresAvailable2[group];
        if (action && (updatedFeatures === null || updatedFeatures === void 0 ? void 0 : updatedFeatures[action])) {
          var actionPermission_1 = updatedFeatures === null || updatedFeatures === void 0 ? void 0 : updatedFeatures[action];
          setFeature(function(currentState) {
            if (JSON.stringify(actionPermission_1) !== JSON.stringify(currentState)) {
              return actionPermission_1;
            }
            return currentState;
          });
          return;
        }
        setFeature(function(currentState) {
          if (JSON.stringify(updatedFeatures) !== JSON.stringify(currentState)) {
            return updatedFeatures;
          }
          return currentState;
        });
      }, [group, action]);
      react_1.useEffect(function() {
        Features_1.create(app).dispatch(Features_1.Action.REQUEST, { feature: group, action });
      }, [app, group, action]);
      react_1.useEffect(function() {
        handleFeatureUpdate(featuresAvailable);
      }, [featuresAvailable, handleFeatureUpdate]);
      return feature;
    }
    exports.useFeatureRequest = useFeatureRequest;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useFeatureRequest/index.js
var require_useFeatureRequest2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useFeatureRequest/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_useFeatureRequest(), exports);
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useLocale/useLocale.js
var require_useLocale = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useLocale/useLocale.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useLocale = void 0;
    var useAppBridgeState_1 = require_useAppBridgeState2();
    function useLocale() {
      return useAppBridgeState_1.useAppBridgeState("staffMember.locale");
    }
    exports.useLocale = useLocale;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useLocale/index.js
var require_useLocale2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useLocale/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useLocale = void 0;
    var useLocale_1 = require_useLocale();
    Object.defineProperty(exports, "useLocale", { enumerable: true, get: function() {
      return useLocale_1.useLocale;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useNavigationHistory/useNavigationHistory.js
var require_useNavigationHistory = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useNavigationHistory/useNavigationHistory.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNavigationHistory = void 0;
    var react_1 = require_react();
    var actions_1 = require_actions5();
    var useAppBridge_1 = require_useAppBridge();
    function useNavigationHistory() {
      var app = useAppBridge_1.useAppBridge();
      return react_1.useMemo(function() {
        var history = actions_1.History.create(app);
        function push(location2) {
          history.dispatch(actions_1.History.Action.PUSH, location2.pathname);
        }
        function replace(location2) {
          history.dispatch(actions_1.History.Action.REPLACE, location2.pathname);
        }
        return { push, replace };
      }, []);
    }
    exports.useNavigationHistory = useNavigationHistory;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useNavigationHistory/index.js
var require_useNavigationHistory2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useNavigationHistory/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNavigationHistory = void 0;
    var useNavigationHistory_1 = require_useNavigationHistory();
    Object.defineProperty(exports, "useNavigationHistory", { enumerable: true, get: function() {
      return useNavigationHistory_1.useNavigationHistory;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useNavigate/useNavigate.js
var require_useNavigate = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useNavigate/useNavigate.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNavigate = void 0;
    var react_1 = require_react();
    var Redirect_1 = require_Redirect2();
    var useAppBridge_1 = require_useAppBridge();
    var useNavigationHistory_1 = require_useNavigationHistory2();
    function useNavigate() {
      var app = useAppBridge_1.useAppBridge();
      var history = useNavigationHistory_1.useNavigationHistory();
      var redirect = react_1.useMemo(function() {
        return Redirect_1.create(app);
      }, [app]);
      var handleRedirect2 = react_1.useCallback(function(to, options) {
        var url = Redirect_1.normalizeUrl(to);
        var isAppUrl = url.startsWith(app.localOrigin);
        var isHostUrl = url.startsWith(app.hostOrigin);
        var isRelative = url.startsWith("/");
        if (isAppUrl || isHostUrl || isRelative) {
          var path = Redirect_1.getRelativePath(url);
          if (isHostUrl || (options === null || options === void 0 ? void 0 : options.target) === "new" || (options === null || options === void 0 ? void 0 : options.target) === "host") {
            redirect.dispatch(Redirect_1.Action.ADMIN_PATH, {
              path: path.replace(/^\/admin/, ""),
              newContext: (options === null || options === void 0 ? void 0 : options.target) === "new"
            });
            return;
          }
          if (((options === null || options === void 0 ? void 0 : options.target) === "self" || !(options === null || options === void 0 ? void 0 : options.target)) && (options === null || options === void 0 ? void 0 : options.replace)) {
            history.replace({ pathname: path });
            return;
          }
          redirect.dispatch(Redirect_1.Action.APP, path);
          return;
        }
        redirect.dispatch(Redirect_1.Action.REMOTE, {
          url,
          newContext: (options === null || options === void 0 ? void 0 : options.target) === "new"
        });
      }, [redirect, history]);
      return react_1.useCallback(function(to, options) {
        if (Redirect_1.isAdminSection(to)) {
          var convertedSection = __assign(__assign({}, to), { name: Redirect_1.ResourceType[to.name] });
          redirect.dispatch(Redirect_1.Action.ADMIN_SECTION, {
            section: convertedSection,
            newContext: (options === null || options === void 0 ? void 0 : options.target) === "new"
          });
          return;
        }
        handleRedirect2(to, options);
      }, [handleRedirect2, redirect]);
    }
    exports.useNavigate = useNavigate;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useNavigate/index.js
var require_useNavigate2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useNavigate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useNavigate = void 0;
    var useNavigate_1 = require_useNavigate();
    Object.defineProperty(exports, "useNavigate", { enumerable: true, get: function() {
      return useNavigate_1.useNavigate;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useToast/useToast.js
var require_useToast = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useToast/useToast.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useToast = exports.DEFAULT_TOAST_DURATION = void 0;
    var react_1 = require_react();
    var Toast_1 = require_Toast2();
    var useAppBridge_1 = require_useAppBridge();
    exports.DEFAULT_TOAST_DURATION = 5e3;
    function useToast() {
      var app = useAppBridge_1.useAppBridge();
      var toastList = react_1.useRef([]);
      var show = react_1.useCallback(function(content, options) {
        var toast = Toast_1.create(app, {
          message: content,
          isError: options === null || options === void 0 ? void 0 : options.isError,
          duration: (options === null || options === void 0 ? void 0 : options.duration) || exports.DEFAULT_TOAST_DURATION,
          action: options === null || options === void 0 ? void 0 : options.action
        });
        toast.dispatch(Toast_1.Action.SHOW);
        toastList.current.push(toast);
        toast.subscribe(Toast_1.Action.CLEAR, function() {
          var _a;
          (_a = options === null || options === void 0 ? void 0 : options.onDismiss) === null || _a === void 0 ? void 0 : _a.call(options);
          toastList.current.splice(toastList.current.indexOf(toast), 1);
          toast.unsubscribe();
        });
        toast.subscribe(Toast_1.Action.ACTION, function() {
          var _a, _b;
          (_b = (_a = options === null || options === void 0 ? void 0 : options.action) === null || _a === void 0 ? void 0 : _a.onAction) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
      }, [app]);
      react_1.useEffect(function() {
        return function() {
          toastList.current.forEach(function(toast) {
            return toast === null || toast === void 0 ? void 0 : toast.unsubscribe();
          });
        };
      }, []);
      return { show };
    }
    exports.useToast = useToast;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useToast/index.js
var require_useToast2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useToast/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useToast = void 0;
    var useToast_1 = require_useToast();
    Object.defineProperty(exports, "useToast", { enumerable: true, get: function() {
      return useToast_1.useToast;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/hooks/index.js
var require_hooks = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useToast = exports.useNavigationHistory = exports.useNavigate = exports.useLocale = exports.useFeatureRequest = exports.useFeaturesAvailable = exports.useContextualSaveBar = exports.useAuthenticatedFetch = exports.useAppBridgeState = void 0;
    var useAppBridgeState_1 = require_useAppBridgeState2();
    Object.defineProperty(exports, "useAppBridgeState", { enumerable: true, get: function() {
      return useAppBridgeState_1.useAppBridgeState;
    } });
    var useAuthenticatedFetch_1 = require_useAuthenticatedFetch2();
    Object.defineProperty(exports, "useAuthenticatedFetch", { enumerable: true, get: function() {
      return useAuthenticatedFetch_1.useAuthenticatedFetch;
    } });
    var useContextualSaveBar_1 = require_useContextualSaveBar2();
    Object.defineProperty(exports, "useContextualSaveBar", { enumerable: true, get: function() {
      return useContextualSaveBar_1.useContextualSaveBar;
    } });
    var useFeaturesAvailable_1 = require_useFeaturesAvailable2();
    Object.defineProperty(exports, "useFeaturesAvailable", { enumerable: true, get: function() {
      return useFeaturesAvailable_1.useFeaturesAvailable;
    } });
    var useFeatureRequest_1 = require_useFeatureRequest2();
    Object.defineProperty(exports, "useFeatureRequest", { enumerable: true, get: function() {
      return useFeatureRequest_1.useFeatureRequest;
    } });
    var useLocale_1 = require_useLocale2();
    Object.defineProperty(exports, "useLocale", { enumerable: true, get: function() {
      return useLocale_1.useLocale;
    } });
    var useNavigate_1 = require_useNavigate2();
    Object.defineProperty(exports, "useNavigate", { enumerable: true, get: function() {
      return useNavigate_1.useNavigate;
    } });
    var useNavigationHistory_1 = require_useNavigationHistory2();
    Object.defineProperty(exports, "useNavigationHistory", { enumerable: true, get: function() {
      return useNavigationHistory_1.useNavigationHistory;
    } });
    var useToast_1 = require_useToast2();
    Object.defineProperty(exports, "useToast", { enumerable: true, get: function() {
      return useToast_1.useToast;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/components/ContextualSaveBar/ContextualSaveBar.js
var require_ContextualSaveBar3 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/ContextualSaveBar/ContextualSaveBar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    var hooks_1 = require_hooks();
    function ContextualSaveBar(_a) {
      var _b = _a.discardAction, discardAction = _b === void 0 ? {} : _b, _c = _a.saveAction, saveAction = _c === void 0 ? {} : _c, fullWidth = _a.fullWidth, leaveConfirmationDisable = _a.leaveConfirmationDisable, visible = _a.visible;
      var _d = hooks_1.useContextualSaveBar(), show = _d.show, hide = _d.hide, saveActionSetOptions = _d.saveAction.setOptions, discardActionSetOptions = _d.discardAction.setOptions;
      react_1.useEffect(function() {
        saveActionSetOptions(saveAction);
      }, [saveAction]);
      react_1.useEffect(function() {
        discardActionSetOptions(discardAction);
      }, [discardAction]);
      react_1.useEffect(function() {
        if (visible) {
          show({ fullWidth, leaveConfirmationDisable });
        } else {
          hide();
        }
      }, [fullWidth, leaveConfirmationDisable, visible]);
      return null;
    }
    exports.default = ContextualSaveBar;
  }
});

// node_modules/@shopify/app-bridge-react/components/ContextualSaveBar/index.js
var require_ContextualSaveBar4 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/ContextualSaveBar/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var ContextualSaveBar_1 = __importDefault(require_ContextualSaveBar3());
    exports.default = ContextualSaveBar_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/components/Loading/Loading.js
var require_Loading3 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Loading/Loading.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = __importDefault(require_react());
    var actions_1 = require_actions5();
    var context_1 = require_context();
    var Loading = (
      /** @class */
      function(_super) {
        __extends(Loading2, _super);
        function Loading2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Loading2.prototype.componentDidMount = function() {
          var app = this.context;
          this.loading = actions_1.Loading.create(app);
          if (this.loading != null) {
            this.loading.dispatch(actions_1.Loading.Action.START);
          }
        };
        Loading2.prototype.componentWillUnmount = function() {
          if (this.loading != null) {
            this.loading.dispatch(actions_1.Loading.Action.STOP);
          }
        };
        Loading2.prototype.render = function() {
          return null;
        };
        Loading2.contextType = context_1.AppBridgeContext;
        return Loading2;
      }(react_1.default.Component)
    );
    exports.default = Loading;
  }
});

// node_modules/@shopify/app-bridge-react/components/Loading/index.js
var require_Loading4 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Loading/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Loading_1 = __importDefault(require_Loading3());
    exports.default = Loading_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/utilities/transformers.js
var require_transformers = __commonJS({
  "node_modules/@shopify/app-bridge-react/utilities/transformers.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformActions = exports.generateRedirect = void 0;
    var Button2 = __importStar(require_Button2());
    var ButtonGroup = __importStar(require_ButtonGroup2());
    var Redirect4 = __importStar(require_Redirect2());
    function generateRedirect(appBridge, url, target, external) {
      if (target === void 0) {
        target = "APP";
      }
      if (url == null) {
        return void 0;
      }
      var redirect = Redirect4.create(appBridge);
      var payload = external === true ? {
        url,
        newContext: true
      } : url;
      return function() {
        redirect.dispatch(redirectAction(target, external), payload);
      };
    }
    exports.generateRedirect = generateRedirect;
    function redirectAction(target, external) {
      if (external === true) {
        return Redirect4.Action.REMOTE;
      }
      return Redirect4.Action[target];
    }
    function transformActions(appBridge, _a) {
      var primaryAction = _a.primaryAction, secondaryActions = _a.secondaryActions, actionGroups = _a.actionGroups;
      var primary = transformPrimaryAction(appBridge, primaryAction);
      var secondary = __spreadArray(__spreadArray([], transformSecondaryActions(appBridge, secondaryActions)), transformActionGroups(appBridge, actionGroups));
      return {
        primary,
        secondary
      };
    }
    exports.transformActions = transformActions;
    function transformAction(appBridge, action) {
      var style = action.destructive === true ? Button2.Style.Danger : void 0;
      var button = Button2.create(appBridge, {
        label: action.content || "",
        disabled: action.disabled,
        loading: action.loading,
        plain: action.plain,
        style
      });
      if (action.onAction) {
        button.subscribe(Button2.Action.CLICK, action.onAction);
      }
      var redirect = generateRedirect(appBridge, action.url, action.target, action.external);
      if (redirect != null) {
        button.subscribe(Button2.Action.CLICK, redirect);
      }
      return button;
    }
    function transformPrimaryAction(appBridge, primaryAction) {
      if (primaryAction == null) {
        return void 0;
      }
      var primary = transformAction(appBridge, primaryAction);
      return primary;
    }
    function transformSecondaryActions(appBridge, secondaryActions) {
      if (secondaryActions === void 0) {
        secondaryActions = [];
      }
      var secondary = __spreadArray([], secondaryActions.map(function(secondaryAction) {
        return transformAction(appBridge, secondaryAction);
      }));
      return secondary;
    }
    function transformActionGroups(appBridge, actionGroups) {
      if (actionGroups === void 0) {
        actionGroups = [];
      }
      var buttonGroups = __spreadArray([], actionGroups.map(function(group) {
        var buttons = group.actions.map(function(groupAction) {
          return transformAction(appBridge, groupAction);
        });
        return ButtonGroup.create(appBridge, { label: group.title, plain: group.plain, buttons });
      }));
      return buttonGroups;
    }
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useOnceEffect/useOnceEffect.js
var require_useOnceEffect = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useOnceEffect/useOnceEffect.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useOnceEffect = void 0;
    var react_1 = __importDefault(require_react());
    exports.useOnceEffect = react_1.default.useInsertionEffect || react_1.default.useLayoutEffect;
  }
});

// node_modules/@shopify/app-bridge-react/hooks/useOnceEffect/index.js
var require_useOnceEffect2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/hooks/useOnceEffect/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_useOnceEffect(), exports);
  }
});

// node_modules/@shopify/app-bridge-react/components/Modal/Modal.js
var require_Modal3 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Modal/Modal.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    var Modal_1 = require_Modal2();
    var transformers_1 = require_transformers();
    var useAppBridge_1 = require_useAppBridge();
    var useOnceEffect_1 = require_useOnceEffect2();
    function Modal2(props) {
      var app = useAppBridge_1.useAppBridge();
      var focusReturnPoint = react_1.useRef(null);
      var prevProps = react_1.useRef({ open: false });
      var open = props.open;
      var isUnmounted = react_1.useRef(false);
      var modal = react_1.useMemo(function() {
        var primaryAction = props.primaryAction, secondaryActions = props.secondaryActions, rest = __rest(props, ["primaryAction", "secondaryActions"]);
        return Modal_1.create(app, transformProps(app, rest));
      }, [app]);
      react_1.useEffect(function() {
        if (isUnmounted.current) {
          prevProps.current = props;
          return;
        }
        var wasOpen = prevProps.current.open;
        var openUpdated = wasOpen !== open;
        if (open) {
          var transformedProps = transformProps(app, props, wasOpen);
          var shouldSendUpdate = !openUpdated;
          if (isIframeModal(transformedProps)) {
            modal.set(transformedProps, shouldSendUpdate);
          } else {
            modal.set(transformedProps, shouldSendUpdate);
          }
        }
        if (openUpdated) {
          if (open) {
            modal.dispatch(Modal_1.Action.OPEN);
            focusReturnPoint.current = document.activeElement;
          } else {
            modal.dispatch(Modal_1.Action.CLOSE);
            if (focusReturnPoint.current != null && document.contains(focusReturnPoint.current)) {
              focusReturnPoint.current.focus();
              focusReturnPoint.current = null;
            }
          }
        }
        if (props.onClose != null) {
          modal.subscribe(Modal_1.Action.CLOSE, props.onClose);
        }
        prevProps.current = props;
        return function() {
          modal.unsubscribe();
        };
      }, [props, open]);
      useOnceEffect_1.useOnceEffect(function() {
        return function() {
          if (prevProps.current.open) {
            modal.dispatch(Modal_1.Action.CLOSE);
          }
        };
      }, []);
      return null;
    }
    function isIframeModal(options) {
      return typeof options.url === "string" || typeof options.path === "string";
    }
    function transformProps(app, props, wasOpen) {
      var title = props.title, size = props.size, message = props.message, src = props.src, primaryAction = props.primaryAction, secondaryActions = props.secondaryActions, loading = props.loading;
      var safeSize = size == null ? void 0 : Modal_1.Size[size];
      var srcPayload = {};
      if (src != null) {
        if (src.match("^https?://")) {
          srcPayload.url = src;
        } else {
          srcPayload.path = src;
        }
      }
      return __assign(__assign({ title, message, size: safeSize }, srcPayload), { footer: {
        buttons: transformers_1.transformActions(app, {
          primaryAction,
          secondaryActions
        })
      }, loading: wasOpen ? void 0 : loading });
    }
    exports.default = Modal2;
  }
});

// node_modules/@shopify/app-bridge-react/components/Modal/ModalContent/ModalContent.js
var require_ModalContent3 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Modal/ModalContent/ModalContent.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = __importDefault(require_react());
    var actions_1 = require_actions5();
    var context_1 = require_context();
    var ModalContent = (
      /** @class */
      function(_super) {
        __extends(ModalContent2, _super);
        function ModalContent2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        ModalContent2.prototype.componentDidMount = function() {
          var app = this.context;
          this.modalContent = actions_1.ModalContent.create(app);
          this.syncLoadingStatus();
        };
        ModalContent2.prototype.componentDidUpdate = function() {
          this.syncLoadingStatus();
        };
        ModalContent2.prototype.syncLoadingStatus = function() {
          if (!this.modalContent)
            return;
          if (this.props.loading) {
            this.modalContent.loading();
          } else {
            this.modalContent.loaded();
          }
        };
        ModalContent2.prototype.render = function() {
          return null;
        };
        ModalContent2.contextType = context_1.AppBridgeContext;
        return ModalContent2;
      }(react_1.default.Component)
    );
    exports.default = ModalContent;
  }
});

// node_modules/@shopify/app-bridge-react/components/Modal/ModalContent/index.js
var require_ModalContent4 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Modal/ModalContent/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var ModalContent_1 = __importDefault(require_ModalContent3());
    exports.default = ModalContent_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/components/Modal/index.js
var require_Modal4 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Modal/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModalContent = void 0;
    var Modal_1 = __importDefault(require_Modal3());
    var ModalContent_1 = require_ModalContent4();
    Object.defineProperty(exports, "ModalContent", { enumerable: true, get: function() {
      return __importDefault(ModalContent_1).default;
    } });
    exports.default = Modal_1.default;
  }
});

// node_modules/@shopify/app-bridge/util/shared.js
var require_shared = __commonJS({
  "node_modules/@shopify/app-bridge/util/shared.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mockAppBridge = exports.serverAppBridge = void 0;
    var Error_1 = require_Error2();
    var noop3 = function() {
    };
    var noopPromise = new Promise(function() {
    });
    exports.serverAppBridge = {
      dispatch: function() {
        return {};
      },
      error: function() {
        return noop3;
      },
      featuresAvailable: function() {
        return Promise.reject(Error_1.fromAction("Feature detection is only available on the client side.", Error_1.AppActionType.WINDOW_UNDEFINED));
      },
      getState: function() {
        return Promise.reject(Error_1.fromAction("State is only available on the client side.", Error_1.AppActionType.WINDOW_UNDEFINED));
      },
      localOrigin: "",
      hostOrigin: "",
      subscribe: function() {
        return noop3;
      }
    };
    exports.mockAppBridge = {
      dispatch: function() {
        return {};
      },
      error: function() {
        return noop3;
      },
      featuresAvailable: function() {
        return noopPromise;
      },
      getState: function() {
        return noopPromise;
      },
      localOrigin: "",
      hostOrigin: "",
      subscribe: function() {
        return noop3;
      }
    };
  }
});

// node_modules/@shopify/app-bridge/client/redirect.js
var require_redirect = __commonJS({
  "node_modules/@shopify/app-bridge/client/redirect.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getWindow = exports.getLocation = exports.redirect = exports.shouldRedirect = void 0;
    function shouldRedirect(frame) {
      return frame === window;
    }
    exports.shouldRedirect = shouldRedirect;
    function redirect(url) {
      var location2 = getLocation();
      if (!location2) {
        return;
      }
      location2.assign(url);
    }
    exports.redirect = redirect;
    function getLocation() {
      return hasWindow() ? window.location : void 0;
    }
    exports.getLocation = getLocation;
    function getWindow() {
      return hasWindow() ? window : void 0;
    }
    exports.getWindow = getWindow;
    function hasWindow() {
      return typeof window !== "undefined";
    }
  }
});

// node_modules/@shopify/app-bridge/client/print.js
var require_print = __commonJS({
  "node_modules/@shopify/app-bridge/client/print.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleAppPrint = void 0;
    var redirect_1 = require_redirect();
    function isRunningOniOS() {
      return navigator.userAgent.indexOf("iOS") >= 0;
    }
    function createHiddenInput() {
      var currentWindow = redirect_1.getWindow();
      if (!currentWindow || !currentWindow.document || !currentWindow.document.body) {
        return;
      }
      var inputElement = currentWindow.document.createElement("input");
      inputElement.style.display = "none";
      currentWindow.document.body.appendChild(inputElement);
      return inputElement;
    }
    function printWindow() {
      var _a;
      (_a = redirect_1.getWindow()) === null || _a === void 0 ? void 0 : _a.print();
    }
    function handleMobileAppPrint() {
      var input = createHiddenInput();
      if (!input) {
        return;
      }
      input.select();
      printWindow();
      input.remove();
    }
    function handleAppPrint() {
      if (isRunningOniOS()) {
        handleMobileAppPrint();
      } else {
        printWindow();
      }
    }
    exports.handleAppPrint = handleAppPrint;
  }
});

// node_modules/@shopify/app-bridge/client/types.js
var require_types6 = __commonJS({
  "node_modules/@shopify/app-bridge/client/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isV1Config = exports.MessageType = exports.LifecycleHook = exports.PermissionType = void 0;
    var types_1 = require_types3();
    Object.defineProperty(exports, "MessageType", { enumerable: true, get: function() {
      return types_1.MessageType;
    } });
    var types_2 = require_types3();
    Object.defineProperty(exports, "PermissionType", { enumerable: true, get: function() {
      return types_2.PermissionType;
    } });
    Object.defineProperty(exports, "LifecycleHook", { enumerable: true, get: function() {
      return types_2.LifecycleHook;
    } });
    function isV1Config(config) {
      return !config.host;
    }
    exports.isV1Config = isV1Config;
  }
});

// node_modules/@shopify/app-bridge/util/collection.js
var require_collection2 = __commonJS({
  "node_modules/@shopify/app-bridge/util/collection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeFromCollection = exports.addAndRemoveFromCollection = void 0;
    var collection_1 = require_collection();
    Object.defineProperty(exports, "addAndRemoveFromCollection", { enumerable: true, get: function() {
      return collection_1.addAndRemoveFromCollection;
    } });
    Object.defineProperty(exports, "removeFromCollection", { enumerable: true, get: function() {
      return collection_1.removeFromCollection;
    } });
  }
});

// node_modules/@shopify/app-bridge/client/Hooks.js
var require_Hooks = __commonJS({
  "node_modules/@shopify/app-bridge/client/Hooks.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var collection_1 = require_collection2();
    var Hooks = (
      /** @class */
      function() {
        function Hooks2() {
          this.map = {};
        }
        Hooks2.prototype.set = function(hook, handler) {
          if (!Object.prototype.hasOwnProperty.call(this.map, hook)) {
            this.map[hook] = [];
          }
          var value = { handler, remove: function() {
          } };
          var remove = collection_1.addAndRemoveFromCollection(this.map[hook], value);
          value = { handler, remove };
          return remove;
        };
        Hooks2.prototype.get = function(hook) {
          var value = this.map[hook];
          return value ? value.map(function(val) {
            return val.handler;
          }) : void 0;
        };
        Hooks2.prototype.run = function(hook, final, context) {
          var initialArgs = [];
          for (var _i = 3; _i < arguments.length; _i++) {
            initialArgs[_i - 3] = arguments[_i];
          }
          var index = 0;
          var handlers = this.get(hook) || [];
          function handler() {
            var args = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              args[_i2] = arguments[_i2];
            }
            var childHandler = handlers[index++];
            if (childHandler) {
              return childHandler(handler).apply(context, args);
            }
            return final.apply(context, args);
          }
          return handler.apply(context, initialArgs);
        };
        return Hooks2;
      }()
    );
    exports.default = Hooks;
  }
});

// node_modules/@shopify/app-bridge/client/Client.js
var require_Client3 = __commonJS({
  "node_modules/@shopify/app-bridge/client/Client.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createApp = exports.createAppWrapper = exports.createClientApp = exports.WINDOW_UNDEFINED_MESSAGE = void 0;
    var helper_1 = require_helper2();
    var Print_1 = require_Print2();
    var Error_1 = require_Error2();
    var MessageTransport_1 = require_MessageTransport2();
    var shared_1 = require_shared();
    var env_1 = require_env2();
    var Client_1 = require_Client2();
    var WebVitals_1 = require_WebVitals2();
    var print_1 = require_print();
    var redirect_1 = require_redirect();
    var types_1 = require_types6();
    var Hooks_1 = __importDefault(require_Hooks());
    exports.WINDOW_UNDEFINED_MESSAGE = "window is not defined. Running an app outside a browser is not supported";
    function redirectHandler(hostFrame, config) {
      var apiKey = config.apiKey, host = config.host, _a = config.forceRedirect, forceRedirect = _a === void 0 ? !env_1.isDevelopmentClient : _a;
      var location2 = redirect_1.getLocation();
      if (env_1.isUnframed || !location2 || !apiKey || !host || !forceRedirect || !redirect_1.shouldRedirect(hostFrame)) {
        return false;
      }
      var url = "https://" + host + "/apps/" + apiKey + location2.pathname + (location2.search || "");
      redirect_1.redirect(url);
      return true;
    }
    var actionWrapper = function(next) {
      return function(action) {
        return next(__assign(__assign({}, action), { version: helper_1.getVersion(), clientInterface: {
          name: helper_1.getPackageName(),
          version: helper_1.getVersion()
        } }));
      };
    };
    var actionWrappingMiddleware = function(hooks) {
      hooks.set(types_1.LifecycleHook.DispatchAction, actionWrapper);
    };
    function appSetUp(app) {
      app.subscribe(Print_1.Action.APP, print_1.handleAppPrint);
      app.dispatch(Client_1.initialize());
      try {
        WebVitals_1.initializeWebVitals(app);
      } catch (err) {
        console.error("App-Bridge failed to initialize web-vitals", err);
      }
    }
    var createClientApp = function(transport, middlewares) {
      if (middlewares === void 0) {
        middlewares = [];
      }
      var getStateListeners = [];
      var transportListener = MessageTransport_1.createTransportListener();
      var handler = function(event) {
        var message = event.data;
        var type = message.type, payload = message.payload;
        switch (type) {
          case "getState": {
            var resolvers = getStateListeners.splice(0);
            resolvers.forEach(function(resolver) {
              return resolver(payload);
            });
            break;
          }
          case "dispatch": {
            transportListener.handleMessage(payload);
            var hasCallback = transportListener.handleActionDispatch(payload);
            if (hasCallback) {
              return;
            }
            var errorType = helper_1.findMatchInEnum(Error_1.Action, payload.type);
            if (errorType) {
              Error_1.throwError(errorType, payload);
            }
            break;
          }
          default:
        }
      };
      transport.subscribe(handler);
      return function(config) {
        var decodedConfig = validateAndDecodeConfig(config);
        var isRedirecting = redirectHandler(transport.hostFrame, decodedConfig);
        if (isRedirecting) {
          return shared_1.mockAppBridge;
        }
        var dispatcher = createDispatcher(transport, decodedConfig);
        var subscribe = transportListener.createSubscribeHandler(dispatcher);
        dispatcher(types_1.MessageType.Unsubscribe);
        function dispatch(action) {
          dispatcher(types_1.MessageType.Dispatch, action);
          return action;
        }
        var hostOrigin = new URL("https://" + decodedConfig.host).origin;
        var hooks = new Hooks_1.default();
        var app = {
          hostOrigin,
          localOrigin: transport.localOrigin,
          hooks,
          dispatch: function(action) {
            if (!app.hooks) {
              return dispatch(action);
            }
            return app.hooks.run(types_1.LifecycleHook.DispatchAction, dispatch, app, action);
          },
          featuresAvailable: function() {
            var features = [];
            for (var _i2 = 0; _i2 < arguments.length; _i2++) {
              features[_i2] = arguments[_i2];
            }
            var firstItem = features[0];
            var parsedFeatures = Array.isArray(firstItem) ? __spreadArray([], firstItem) : features;
            return app.getState("features").then(function(state) {
              if (parsedFeatures.length) {
                return parsedFeatures.reduce(function(acc, feature) {
                  if (Object.keys(state).includes(feature)) {
                    acc[feature] = state[feature];
                  }
                  return acc;
                }, {});
              }
              return state;
            });
          },
          getState: function(query) {
            if (query && typeof query !== "string") {
              return Promise.resolve(void 0);
            }
            return new Promise(function(resolve) {
              getStateListeners.push(resolve);
              dispatcher(types_1.MessageType.GetState);
            }).then(function(state) {
              var newState = state;
              if (query) {
                for (var _i2 = 0, _a = query.split("."); _i2 < _a.length; _i2++) {
                  var key = _a[_i2];
                  if (newState == null || typeof newState !== "object" || Array.isArray(newState) || !Object.keys(newState).includes(key)) {
                    return void 0;
                  }
                  newState = newState[key];
                }
              }
              return newState;
            });
          },
          subscribe,
          error: function(listener, id) {
            var unsubscribeCb = [];
            helper_1.forEachInEnum(Error_1.Action, function(eventNameSpace) {
              unsubscribeCb.push(subscribe(eventNameSpace, listener, id));
            });
            return function() {
              unsubscribeCb.forEach(function(unsubscribe) {
                return unsubscribe();
              });
            };
          }
        };
        for (var _i = 0, middlewares_1 = middlewares; _i < middlewares_1.length; _i++) {
          var middleware = middlewares_1[_i];
          middleware(hooks, app);
        }
        appSetUp(app);
        return app;
      };
    };
    exports.createClientApp = createClientApp;
    function validateAndDecodeConfig(config) {
      var _a;
      if (!config.host) {
        throw Error_1.fromAction("host must be provided", Error_1.AppActionType.INVALID_CONFIG);
      }
      if (!config.apiKey) {
        throw Error_1.fromAction("apiKey must be provided", Error_1.AppActionType.INVALID_CONFIG);
      }
      try {
        var host = atob((_a = config.host) === null || _a === void 0 ? void 0 : _a.replace(/_/g, "/").replace(/-/g, "+"));
        return __assign(__assign({}, config), { host });
      } catch (_b) {
        var message = "not a valid host, please use the value provided by Shopify";
        throw Error_1.fromAction(message, Error_1.AppActionType.INVALID_CONFIG);
      }
    }
    function createAppWrapper(frame, localOrigin, middleware) {
      if (middleware === void 0) {
        middleware = [];
      }
      if (!frame) {
        throw Error_1.fromAction(exports.WINDOW_UNDEFINED_MESSAGE, Error_1.AppActionType.WINDOW_UNDEFINED);
      }
      var location2 = redirect_1.getLocation();
      var origin = localOrigin || location2 && location2.origin;
      if (!origin) {
        throw Error_1.fromAction("local origin cannot be blank", Error_1.AppActionType.MISSING_LOCAL_ORIGIN);
      }
      var transport = MessageTransport_1.fromWindow(frame, origin);
      var appCreator = exports.createClientApp(transport, __spreadArray([actionWrappingMiddleware], middleware));
      return appCreator;
    }
    exports.createAppWrapper = createAppWrapper;
    function createApp(config) {
      var currentWindow = redirect_1.getWindow();
      if (!currentWindow || !currentWindow.top) {
        return shared_1.serverAppBridge;
      }
      return createAppWrapper(currentWindow.top)(config);
    }
    exports.createApp = createApp;
    function createDispatcher(transport, config) {
      return function(type, payload) {
        transport.dispatch({
          payload,
          source: config,
          type
        });
      };
    }
    exports.default = createApp;
  }
});

// node_modules/@shopify/app-bridge/client/index.js
var require_client = __commonJS({
  "node_modules/@shopify/app-bridge/client/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Client_1 = require_Client3();
    __exportStar(require_types6(), exports);
    __exportStar(require_Client3(), exports);
    exports.default = Client_1.createClientApp;
  }
});

// node_modules/@shopify/app-bridge-core/validate/type-validate.js
var require_type_validate = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/type-validate.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = exports.matchesPositiveInteger = exports.matchesBoolean = exports.makeOptional = exports.matchesString = exports.matchesObject = exports.getErrors = exports.oneOf = exports.matchesArray = exports.matchesEnum = exports.composeSchemas = exports.TYPE_ERROR = void 0;
    exports.TYPE_ERROR = "type_error_expected";
    function composeSchemas() {
      var validators = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        validators[_i] = arguments[_i];
      }
      return function(val) {
        var error;
        var i = 0;
        var len = validators.length;
        while (!error && i < len) {
          error = validators[i](val);
          if (error) {
            return error;
          }
          i++;
        }
      };
    }
    exports.composeSchemas = composeSchemas;
    function matchesEnum(types, options) {
      return function(value) {
        var values = Object.keys(types).map(function(key) {
          return types[key];
        });
        var message = options && options.message || "expected:" + values.map(function(val) {
          return "`" + val + "`";
        }).join(" or ");
        return values.includes(value) ? void 0 : constructErrors(value, "invalid_enum_value", __assign(__assign({}, options), { message }));
      };
    }
    exports.matchesEnum = matchesEnum;
    function matchesArray(validator, options) {
      return function(value) {
        if (!Array.isArray(value)) {
          return constructErrors(value, exports.TYPE_ERROR + "_array", options);
        }
        if (!validator) {
          return;
        }
        var errors = [];
        value.forEach(function(val, key) {
          var objectError = validator(val);
          if (objectError) {
            errors = errors.concat(objectError.map(function(error) {
              return __assign(__assign({}, error), { path: "['" + key + "']" + (error.path || "") });
            }));
          }
        });
        return errors.length ? errors : void 0;
      };
    }
    exports.matchesArray = matchesArray;
    function oneOf() {
      var validators = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        validators[_i] = arguments[_i];
      }
      return function(val) {
        var errors = [];
        for (var _i2 = 0, validators_1 = validators; _i2 < validators_1.length; _i2++) {
          var validator = validators_1[_i2];
          var result = validator(val);
          if (result == null)
            return result;
          errors.push.apply(errors, result);
        }
        return errors;
      };
    }
    exports.oneOf = oneOf;
    function constructErrors(value, error, options) {
      if (options === void 0) {
        options = { message: void 0 };
      }
      return [
        {
          value,
          error,
          message: typeof options.message === "function" ? options.message(error, value) : options.message
        }
      ];
    }
    function getErrors(obj, validator, key) {
      var value = key ? obj[key] : obj;
      var path = key ? "['" + key + "']" : void 0;
      var error = validator(value);
      if (!error) {
        return;
      }
      return error.map(function(errorObj) {
        return __assign(__assign({}, errorObj), { path: "" + (path || "") + (errorObj.path || "") || void 0 });
      });
    }
    exports.getErrors = getErrors;
    function matchesObject(schema, options) {
      return function(val) {
        if (typeof val !== "object" || !val || Array.isArray(val)) {
          return constructErrors(val, exports.TYPE_ERROR + "_object", options);
        }
        var flattened = Object.keys(schema).reduce(function(acc, key) {
          return __spreadArray(__spreadArray([], acc), getErrors(val, schema[key], key) || []);
        }, []);
        return flattened.length ? flattened : void 0;
      };
    }
    exports.matchesObject = matchesObject;
    function matchesString(options) {
      return function(value) {
        return typeof value === "string" ? void 0 : constructErrors(value, exports.TYPE_ERROR + "_string", options);
      };
    }
    exports.matchesString = matchesString;
    function makeOptional(validator) {
      return function(value) {
        if (value === void 0 || value === null) {
          return void 0;
        }
        return validator(value);
      };
    }
    exports.makeOptional = makeOptional;
    function matchesBoolean(options) {
      return function(value) {
        return typeof value === "boolean" ? void 0 : constructErrors(value, exports.TYPE_ERROR + "_boolean", options);
      };
    }
    exports.matchesBoolean = matchesBoolean;
    function matchesPositiveInteger(options) {
      return function(value) {
        return !Number.isInteger(value) || value < 0 ? constructErrors(value, exports.TYPE_ERROR + "_integer", options) : void 0;
      };
    }
    exports.matchesPositiveInteger = matchesPositiveInteger;
    function validate(obj, validator) {
      return getErrors(obj, validator);
    }
    exports.validate = validate;
  }
});

// node_modules/@shopify/app-bridge-core/validate/utils.js
var require_utils = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.relativePathSchema = exports.relativeUrlSchema = exports.isValidRelativePath = exports.createActionValidator = void 0;
    var type_validate_1 = require_type_validate();
    function createActionValidator(type, payloadSchema, payloadRequired, idRequired) {
      if (payloadSchema === void 0) {
        payloadSchema = void 0;
      }
      if (payloadRequired === void 0) {
        payloadRequired = false;
      }
      if (idRequired === void 0) {
        idRequired = false;
      }
      var idSchema = type_validate_1.matchesObject({
        id: idRequired ? type_validate_1.matchesString() : type_validate_1.makeOptional(type_validate_1.matchesString())
      });
      var schema = payloadSchema ? type_validate_1.composeSchemas(idSchema, payloadSchema) : idSchema;
      return type_validate_1.matchesObject({
        type: type_validate_1.matchesEnum(type, {
          message: function(_, val) {
            return "The action type `" + val + "` is invalid or unsupported";
          }
        }),
        payload: payloadRequired ? schema : type_validate_1.makeOptional(schema)
      });
    }
    exports.createActionValidator = createActionValidator;
    function isValidRelativePath(path) {
      return typeof path === "string" && (path === "" || path.startsWith("/"));
    }
    exports.isValidRelativePath = isValidRelativePath;
    exports.relativeUrlSchema = type_validate_1.composeSchemas(type_validate_1.matchesString(), function(value) {
      return isValidRelativePath(value) ? void 0 : [{ error: "invalid_relative_path", value, message: "expected string to start with `/`" }];
    });
    exports.relativePathSchema = type_validate_1.matchesObject({
      path: exports.relativeUrlSchema
    });
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/button.js
var require_button = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/button.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = exports.buttonSchemaWithId = exports.buttonSchema = void 0;
    var Button_1 = require_Button();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Button_1.Action;
    } });
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    exports.buttonSchema = type_validate_1.matchesObject({
      disabled: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      label: type_validate_1.matchesString(),
      style: type_validate_1.makeOptional(type_validate_1.matchesEnum(Button_1.Style)),
      icon: type_validate_1.makeOptional(type_validate_1.matchesEnum(Button_1.Icon)),
      loading: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      plain: type_validate_1.makeOptional(type_validate_1.matchesBoolean())
    });
    exports.buttonSchemaWithId = type_validate_1.composeSchemas(type_validate_1.matchesObject({
      id: type_validate_1.matchesString()
    }), exports.buttonSchema);
    function validateProps(props) {
      return type_validate_1.validate(props, exports.buttonSchema);
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      var validator = utils_1.createActionValidator(Button_1.Action, action.type === Button_1.Action.UPDATE ? exports.buttonSchema : void 0, true, true);
      return type_validate_1.validate(action, validator);
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/buttonGroup.js
var require_buttonGroup = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/buttonGroup.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = exports.buttonGroupSchema = void 0;
    var ButtonGroup_1 = require_ButtonGroup();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return ButtonGroup_1.Action;
    } });
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    var button_1 = require_button();
    exports.buttonGroupSchema = type_validate_1.composeSchemas(button_1.buttonSchema, type_validate_1.matchesObject({
      buttons: type_validate_1.matchesArray(type_validate_1.makeOptional(button_1.buttonSchemaWithId))
    }));
    function validateProps(props) {
      return type_validate_1.validate(props, exports.buttonGroupSchema);
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      var validator = utils_1.createActionValidator(ButtonGroup_1.Action, exports.buttonGroupSchema, true, true);
      return type_validate_1.validate(action, validator);
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/contextualSaveBar.js
var require_contextualSaveBar = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/contextualSaveBar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = exports.contextSaveBarSchema = void 0;
    var type_validate_1 = require_type_validate();
    var ContextualSaveBar_1 = require_ContextualSaveBar();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return ContextualSaveBar_1.Action;
    } });
    var utils_1 = require_utils();
    exports.contextSaveBarSchema = type_validate_1.makeOptional(type_validate_1.matchesObject({
      fullWidth: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      discardAction: type_validate_1.makeOptional(type_validate_1.matchesObject({
        disabled: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
        discardConfirmationModal: type_validate_1.makeOptional(type_validate_1.matchesBoolean())
      })),
      saveAction: type_validate_1.makeOptional(type_validate_1.matchesObject({
        disabled: type_validate_1.makeOptional(type_validate_1.matchesBoolean())
      })),
      leaveConfirmationDisable: type_validate_1.makeOptional(type_validate_1.matchesBoolean())
    }));
    function validateProps(props) {
      return type_validate_1.validate(props, exports.contextSaveBarSchema);
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      var validator = utils_1.createActionValidator(ContextualSaveBar_1.Action, exports.contextSaveBarSchema);
      return type_validate_1.validate(action, validator);
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/feedbackModal.js
var require_feedbackModal = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/feedbackModal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = exports.feedbackModalSchema = void 0;
    var FeedbackModal_1 = require_FeedbackModal();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return FeedbackModal_1.Action;
    } });
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    exports.feedbackModalSchema = type_validate_1.matchesObject({
      formId: type_validate_1.matchesPositiveInteger()
    });
    function validateProps(props) {
      return type_validate_1.validate(props, exports.feedbackModalSchema);
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      switch (action.type) {
        case FeedbackModal_1.Action.OPEN:
          return type_validate_1.validate(action, utils_1.createActionValidator(FeedbackModal_1.Action, exports.feedbackModalSchema, true));
        case FeedbackModal_1.Action.CLOSE:
        default:
          return type_validate_1.validate(action, utils_1.createActionValidator(FeedbackModal_1.Action));
      }
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/leaveConfirmation.js
var require_leaveConfirmation = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/leaveConfirmation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = void 0;
    var LeaveConfirmation_1 = require_LeaveConfirmation();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return LeaveConfirmation_1.Action;
    } });
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    function validateAction(action) {
      var validator = utils_1.createActionValidator(LeaveConfirmation_1.Action);
      return type_validate_1.validate(action, validator);
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/link.js
var require_link = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/link.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = exports.linkActionSchema = exports.linkPropsSchema = void 0;
    var AppLink_1 = require_AppLink();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return AppLink_1.Action;
    } });
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    var AllowedRedirectType;
    (function(AllowedRedirectType2) {
      AllowedRedirectType2["APP"] = "APP::NAVIGATION::REDIRECT::APP";
      AllowedRedirectType2["LEGACY_APP"] = "APP";
    })(AllowedRedirectType || (AllowedRedirectType = {}));
    exports.linkPropsSchema = type_validate_1.matchesObject({
      label: type_validate_1.matchesString(),
      destination: utils_1.relativeUrlSchema,
      redirectType: type_validate_1.matchesEnum(AllowedRedirectType)
    });
    exports.linkActionSchema = type_validate_1.matchesObject({
      label: type_validate_1.matchesString(),
      destination: utils_1.relativePathSchema,
      redirectType: type_validate_1.matchesEnum(AllowedRedirectType)
    });
    function validateProps(props) {
      return type_validate_1.validate(props, exports.linkPropsSchema);
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      return type_validate_1.validate(action, utils_1.createActionValidator(AppLink_1.Action, exports.linkActionSchema, true, true));
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/menu.js
var require_menu = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/menu.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAction = exports.validateProps = void 0;
    var NavigationMenu_1 = require_NavigationMenu();
    var ChannelMenu_1 = require_ChannelMenu();
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    var helper_1 = require_helper();
    var link_1 = require_link();
    var linkOptionsValidator = type_validate_1.matchesObject({ id: type_validate_1.matchesString(), options: link_1.linkPropsSchema });
    function activeLinkError(value) {
      return [
        {
          error: "invalid_active_item",
          value,
          message: "expected active item to exist in menu items"
        }
      ];
    }
    function getOptionsSchema(options) {
      var baseSchema = type_validate_1.matchesObject({
        items: type_validate_1.makeOptional(type_validate_1.matchesArray(linkOptionsValidator)),
        active: type_validate_1.makeOptional(linkOptionsValidator)
      });
      var items = options.items, active = options.active;
      if (items && active) {
        var activeItemSchema = type_validate_1.matchesObject({
          active: type_validate_1.composeSchemas(linkOptionsValidator, function(value) {
            return items.find(function(item) {
              return item.id === value.id;
            }) ? void 0 : activeLinkError(value);
          })
        });
        return type_validate_1.composeSchemas(baseSchema, activeItemSchema);
      }
      return baseSchema;
    }
    function getPayloadSchema(payload) {
      var baseSchema = type_validate_1.matchesObject({
        items: type_validate_1.makeOptional(type_validate_1.matchesArray(link_1.linkActionSchema)),
        active: type_validate_1.makeOptional(type_validate_1.matchesString())
      });
      var items = payload.items, active = payload.active;
      if (items && active) {
        var activeItemSchema = type_validate_1.matchesObject({
          active: type_validate_1.composeSchemas(type_validate_1.matchesString(), function(value) {
            return items.find(function(item) {
              return item.id === value;
            }) ? void 0 : activeLinkError(value);
          })
        });
        return type_validate_1.composeSchemas(baseSchema, activeItemSchema);
      }
      return baseSchema;
    }
    function validateProps(props) {
      var result = type_validate_1.validate(props, getOptionsSchema(props));
      return result;
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      var actionType = NavigationMenu_1.Action;
      if (helper_1.findMatchInEnum(ChannelMenu_1.Action, action.type)) {
        actionType = ChannelMenu_1.Action;
      }
      return type_validate_1.validate(action, utils_1.createActionValidator(actionType, getPayloadSchema(action.payload), true, false));
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/util/constants.js
var require_constants2 = __commonJS({
  "node_modules/@shopify/app-bridge-core/util/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.INTERNAL_PROTOCOL = void 0;
    exports.INTERNAL_PROTOCOL = "shopify:";
  }
});

// node_modules/@shopify/app-bridge-core/validate/safe-redirect.js
var require_safe_redirect = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/safe-redirect.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isSafe = void 0;
    var constants_1 = require_constants2();
    var FILE_URI_MATCH = /\/\/\//;
    var INVALID_RELATIVE_URL = /[/\\][/\\]/;
    var VALID_PROTOCOLS = ["https:", "http:"];
    var DUMMY_HOSTNAME = "http://test.com";
    function isSafe(redirectUrl, _a) {
      var _b = _a === void 0 ? {} : _a, _c = _b.allowedDomains, allowedDomains = _c === void 0 ? [] : _c, _d = _b.subdomains, subdomains = _d === void 0 ? [] : _d, matchPath = _b.matchPath, requireAbsolute = _b.requireAbsolute, requireSSL = _b.requireSSL, allowInternalProtocol = _b.allowInternalProtocol;
      if (FILE_URI_MATCH.test(redirectUrl)) {
        return false;
      }
      if (redirectUrl.startsWith("/")) {
        if (allowedDomains.length > 0 || subdomains.length > 0 || requireAbsolute || requireSSL) {
          return false;
        }
        if (matchPath) {
          return pathMatches(new URL(redirectUrl, DUMMY_HOSTNAME), redirectUrl, matchPath);
        }
        return !INVALID_RELATIVE_URL.test(redirectUrl);
      }
      var url;
      try {
        url = new URL(redirectUrl);
      } catch (error) {
        return false;
      }
      if (allowInternalProtocol && url.protocol === constants_1.INTERNAL_PROTOCOL) {
        return true;
      }
      if (!VALID_PROTOCOLS.includes(url.protocol)) {
        return false;
      }
      if (requireSSL && url.protocol !== "https:") {
        return false;
      }
      if (url.username || url.password) {
        return false;
      }
      if (matchPath && !pathMatches(url, redirectUrl, matchPath)) {
        return false;
      }
      if (!hostIsValid(url, allowedDomains, subdomains)) {
        return false;
      }
      return true;
    }
    exports.isSafe = isSafe;
    function hostIsValid(url, allowedDomains, subdomains) {
      if (!subdomains.every(function(subdomain) {
        return subdomain.startsWith(".");
      })) {
        throw new TypeError("Subdomains must begin with .");
      }
      var hostname = url.hostname;
      return allowedDomains.length === 0 && subdomains.length === 0 || allowedDomains.includes(hostname) || subdomains.some(function(subdomain) {
        return hostname.endsWith(subdomain);
      });
    }
    function pathMatches(url, originalUrl, matcher) {
      var pathname = url.pathname;
      var originalPathname = originalUrl.replace(url.origin, "").split("?")[0];
      return typeof matcher === "string" ? pathname === matcher && originalPathname === matcher : matcher.test(pathname) && matcher.test(originalPathname);
    }
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/modal.js
var require_modal2 = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/modal.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = void 0;
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    var Modal_1 = require_Modal();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Modal_1.Action;
    } });
    var Button_1 = require_Button();
    var safe_redirect_1 = require_safe_redirect();
    var button_1 = require_button();
    function matchesSafeOrigin(value, localOrigin) {
      var hostName;
      try {
        hostName = new URL(localOrigin).hostname;
      } catch (error) {
        return [
          {
            error: "invalid_app_origin",
            value: localOrigin,
            message: "Provided value for app origin: `" + localOrigin + "` is invalid"
          }
        ];
      }
      var isSafeSrc = safe_redirect_1.isSafe(value, {
        requireAbsolute: true,
        requireSSL: true,
        allowInternalProtocol: true,
        allowedDomains: [hostName]
      });
      if (!isSafeSrc) {
        return [
          {
            error: "not_matching_app_origin",
            value,
            message: "Provided URL origin does not match app origin `" + hostName + "`"
          }
        ];
      }
    }
    function matchesSize() {
      return function(value) {
        var values = [Modal_1.Size.Small, Modal_1.Size.Medium, Modal_1.Size.Large];
        if (values.includes(value)) {
          return;
        }
        var message = "expected:" + values.map(function(val) {
          return "`" + val + "`";
        }).join(" or ");
        if (value === Modal_1.Size.Full) {
          message += ". Size `" + value + "` is deprecated as of version 1.6.5 and will fall back to size `medium`";
        }
        if (value === Modal_1.Size.Auto) {
          message += ". Size `" + value + "` is deprecated as of version 1.12.x and will fall back to size `medium`. Use the `setUpModalAutoSizing` utility from `app-bridge` instead";
        }
        return [
          {
            error: "invalid_enum_value",
            value,
            message
          }
        ];
      };
    }
    function getModalSchema(props, localOrigin) {
      if (props === void 0) {
        props = {};
      }
      var baseModalSchema = type_validate_1.matchesObject({
        title: type_validate_1.makeOptional(type_validate_1.matchesString()),
        footer: type_validate_1.makeOptional(type_validate_1.matchesObject({
          buttons: type_validate_1.matchesObject({
            primary: type_validate_1.makeOptional(button_1.buttonSchemaWithId),
            secondary: type_validate_1.makeOptional(type_validate_1.matchesArray(button_1.buttonSchemaWithId))
          })
        })),
        size: type_validate_1.makeOptional(matchesSize())
      });
      if (Modal_1.isIframeModal(props)) {
        if (props.url) {
          var urlSchema = type_validate_1.matchesObject({
            url: type_validate_1.composeSchemas(type_validate_1.matchesString(), function(value) {
              return localOrigin ? matchesSafeOrigin(value, localOrigin) : void 0;
            })
          });
          return type_validate_1.composeSchemas(baseModalSchema, urlSchema);
        }
        return type_validate_1.composeSchemas(baseModalSchema, utils_1.relativePathSchema);
      }
      return type_validate_1.composeSchemas(baseModalSchema, type_validate_1.matchesObject({ message: type_validate_1.matchesString() }));
    }
    function validateProps(props, localOrigin) {
      return type_validate_1.validate(props, getModalSchema(props, localOrigin));
    }
    exports.validateProps = validateProps;
    function validateAction(action, localOrigin) {
      var schema = getModalSchema(action.payload, localOrigin);
      switch (action.type) {
        case Modal_1.Action.OPEN:
        case Modal_1.Action.UPDATE:
          return type_validate_1.validate(action, utils_1.createActionValidator(Modal_1.Action, schema, true, action.type === Modal_1.Action.UPDATE));
        case Modal_1.Action.FOOTER_BUTTON_CLICK:
          return button_1.validateAction(__assign(__assign({}, action), { type: Button_1.Action.CLICK }));
        case Modal_1.Action.FOOTER_BUTTON_UPDATE:
          return button_1.validateAction(__assign(__assign({}, action), { type: Button_1.Action.UPDATE }));
        case Modal_1.Action.CLOSE:
        default:
          return type_validate_1.validate(action, utils_1.createActionValidator(Modal_1.Action));
      }
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/navigation.js
var require_navigation = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/navigation.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAction = exports.getSectionSchema = exports.matchesAbsolutePath = void 0;
    var History = __importStar(require_History());
    var Redirect4 = __importStar(require_Redirect());
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    function matchesAbsolutePath(value) {
      return value.match("^https?://") ? void 0 : [
        {
          value,
          error: "invalid_absolute_url",
          message: "expected string to start with `https://` or `http://`"
        }
      ];
    }
    exports.matchesAbsolutePath = matchesAbsolutePath;
    function getSectionSchema(payload) {
      var isProductVariant = payload && payload.section && payload.section.resource && payload.section.name === Redirect4.ResourceType.Product;
      var resourceSchema = {
        create: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
        id: type_validate_1.makeOptional(type_validate_1.matchesString())
      };
      var productVariantSchema = __assign(__assign({}, resourceSchema), { variant: type_validate_1.makeOptional(type_validate_1.matchesObject(resourceSchema)) });
      return type_validate_1.matchesObject({
        section: type_validate_1.matchesObject({
          name: type_validate_1.matchesEnum(Redirect4.ResourceType),
          resource: type_validate_1.makeOptional(type_validate_1.matchesObject(isProductVariant ? productVariantSchema : resourceSchema))
        })
      });
    }
    exports.getSectionSchema = getSectionSchema;
    function validateAction(action) {
      var newContextSchema = type_validate_1.matchesObject({ newContext: type_validate_1.makeOptional(type_validate_1.matchesBoolean()) });
      var actionType = Redirect4.Action;
      var schema;
      switch (action.type) {
        case History.Action.PUSH:
        case History.Action.REPLACE:
          actionType = History.Action;
          schema = utils_1.relativePathSchema;
          break;
        case Redirect4.Action.APP:
          schema = utils_1.relativePathSchema;
          break;
        case Redirect4.Action.REMOTE:
          schema = type_validate_1.composeSchemas(type_validate_1.matchesObject({
            url: type_validate_1.composeSchemas(type_validate_1.matchesString(), function(value) {
              return matchesAbsolutePath(value);
            })
          }), newContextSchema);
          break;
        case Redirect4.Action.ADMIN_PATH:
          schema = type_validate_1.composeSchemas(utils_1.relativePathSchema, newContextSchema);
          break;
        case Redirect4.Action.ADMIN_SECTION:
          schema = type_validate_1.composeSchemas(getSectionSchema(action.payload), newContextSchema);
          break;
      }
      return type_validate_1.validate(action, utils_1.createActionValidator(actionType, schema));
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/resourcePicker.js
var require_resourcePicker = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/resourcePicker.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = void 0;
    var ResourcePicker_1 = require_ResourcePicker();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return ResourcePicker_1.Action;
    } });
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    var resourceSelectionSchema = type_validate_1.matchesArray(type_validate_1.matchesObject({
      id: type_validate_1.matchesString()
    }));
    var resourcePickerOptions = type_validate_1.matchesObject({
      initialQuery: type_validate_1.makeOptional(type_validate_1.matchesString()),
      initialSelectionIds: type_validate_1.makeOptional(resourceSelectionSchema),
      selectMultiple: type_validate_1.makeOptional(type_validate_1.oneOf(type_validate_1.matchesBoolean(), type_validate_1.matchesPositiveInteger())),
      showHidden: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      showVariants: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      showDraft: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      showArchived: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      showDraftBadge: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      showArchivedBadge: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      actionVerb: type_validate_1.makeOptional(type_validate_1.matchesEnum(ResourcePicker_1.ActionVerb))
    });
    var resourcePickerActionSchema = type_validate_1.matchesObject({
      resourceType: type_validate_1.matchesEnum(ResourcePicker_1.ResourceType),
      options: type_validate_1.makeOptional(resourcePickerOptions)
    });
    var selectionSchema = type_validate_1.matchesObject({
      selection: resourceSelectionSchema
    });
    function validateProps(props) {
      return type_validate_1.validate(props, resourcePickerOptions);
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      switch (action.type) {
        case ResourcePicker_1.Action.UPDATE:
        case ResourcePicker_1.Action.OPEN:
          return type_validate_1.validate(action, utils_1.createActionValidator(ResourcePicker_1.Action, resourcePickerActionSchema, false, true));
        case ResourcePicker_1.Action.SELECT:
          return type_validate_1.validate(action, utils_1.createActionValidator(ResourcePicker_1.Action, selectionSchema, true, true));
        case ResourcePicker_1.Action.CANCEL:
        case ResourcePicker_1.Action.CLOSE:
        default:
          return type_validate_1.validate(action, utils_1.createActionValidator(ResourcePicker_1.Action));
      }
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/titleBar.js
var require_titleBar = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/titleBar.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = exports.titleBarSchema = void 0;
    var TitleBar_1 = require_TitleBar();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return TitleBar_1.Action;
    } });
    var Button_1 = require_Button();
    var ButtonGroup_1 = require_ButtonGroup();
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    var button_1 = require_button();
    var buttonGroup_1 = require_buttonGroup();
    var buttonSchemaWithId = type_validate_1.composeSchemas(button_1.buttonSchema, type_validate_1.matchesObject({
      id: type_validate_1.matchesString()
    }));
    exports.titleBarSchema = type_validate_1.matchesObject({
      breadcrumbs: type_validate_1.makeOptional(button_1.buttonSchema),
      title: type_validate_1.makeOptional(type_validate_1.matchesString()),
      buttons: type_validate_1.makeOptional(type_validate_1.matchesObject({
        primary: type_validate_1.makeOptional(buttonSchemaWithId),
        secondary: type_validate_1.makeOptional(type_validate_1.matchesArray(type_validate_1.composeSchemas(buttonSchemaWithId, type_validate_1.matchesObject({
          buttons: type_validate_1.makeOptional(type_validate_1.matchesArray(buttonSchemaWithId))
        }))))
      }))
    });
    function validateProps(props) {
      return type_validate_1.validate(props, exports.titleBarSchema);
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      switch (action.type) {
        default:
        case TitleBar_1.Action.UPDATE:
          return type_validate_1.validate(action, utils_1.createActionValidator(TitleBar_1.Action, exports.titleBarSchema, true, false));
        case TitleBar_1.Action.BUTTON_CLICK:
        case TitleBar_1.Action.BREADCRUMBS_CLICK:
          return button_1.validateAction(__assign(__assign({}, action), { type: Button_1.Action.CLICK }));
        case TitleBar_1.Action.BUTTON_UPDATE:
        case TitleBar_1.Action.BREADCRUMBS_UPDATE:
          return button_1.validateAction(__assign(__assign({}, action), { type: Button_1.Action.UPDATE }));
        case TitleBar_1.Action.BUTTON_GROUP_UPDATE:
          return buttonGroup_1.validateAction(__assign(__assign({}, action), { type: ButtonGroup_1.Action.UPDATE }));
      }
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/toast.js
var require_toast = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/toast.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateProps = exports.validateAction = exports.toastSchema = void 0;
    var Toast_1 = require_Toast();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Toast_1.Action;
    } });
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    exports.toastSchema = type_validate_1.matchesObject({
      message: type_validate_1.matchesString(),
      duration: type_validate_1.matchesPositiveInteger(),
      isError: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      action: type_validate_1.makeOptional(type_validate_1.matchesObject({
        content: type_validate_1.matchesString()
      }))
    });
    function validateAction(action) {
      switch (action.type) {
        case Toast_1.Action.SHOW:
          return type_validate_1.validate(action, utils_1.createActionValidator(Toast_1.Action, exports.toastSchema, true));
        default:
          return type_validate_1.validate(action, utils_1.createActionValidator(Toast_1.Action));
      }
    }
    exports.validateAction = validateAction;
    function validateProps(props) {
      return type_validate_1.validate(props, exports.toastSchema);
    }
    exports.validateProps = validateProps;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/picker.js
var require_picker = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/picker.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = exports.validateProps = void 0;
    var Picker_1 = require_Picker();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Picker_1.Action;
    } });
    var type_validate_1 = require_type_validate();
    var utils_1 = require_utils();
    var resourceBadge = type_validate_1.matchesObject({
      content: type_validate_1.matchesString(),
      id: type_validate_1.matchesString(),
      progress: type_validate_1.matchesEnum(Picker_1.ALL_BADGE_PROGRESSES),
      status: type_validate_1.matchesEnum(Picker_1.ALL_BADGE_STATUSES)
    });
    var resourceMedia = type_validate_1.matchesObject({
      accessibilityLabel: type_validate_1.makeOptional(type_validate_1.matchesString()),
      alt: type_validate_1.makeOptional(type_validate_1.matchesString()),
      initials: type_validate_1.makeOptional(type_validate_1.matchesString()),
      kind: type_validate_1.makeOptional(type_validate_1.matchesEnum(Picker_1.ALL_MEDIA_KINDS)),
      name: type_validate_1.makeOptional(type_validate_1.matchesString()),
      source: type_validate_1.matchesString()
    });
    var sharedResourceSchema = {
      accessibilityLabel: type_validate_1.makeOptional(type_validate_1.matchesString()),
      badges: type_validate_1.makeOptional(type_validate_1.matchesArray(resourceBadge)),
      disabled: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      id: type_validate_1.matchesString(),
      loading: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      media: type_validate_1.makeOptional(resourceMedia),
      name: type_validate_1.makeOptional(type_validate_1.matchesString()),
      caption: type_validate_1.makeOptional(type_validate_1.matchesString()),
      selectable: type_validate_1.makeOptional(type_validate_1.matchesBoolean())
    };
    var resourceOption = type_validate_1.matchesObject(__assign({}, sharedResourceSchema));
    var resourceSelectionSchema = type_validate_1.matchesArray(type_validate_1.matchesObject(__assign(__assign({}, sharedResourceSchema), { options: type_validate_1.makeOptional(type_validate_1.matchesArray(resourceOption)) })));
    var resourceName = type_validate_1.matchesObject({
      plural: type_validate_1.matchesString(),
      singular: type_validate_1.matchesString()
    });
    var pickerOptions = type_validate_1.matchesObject({
      canLoadMore: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      emptySearchLabel: type_validate_1.makeOptional(type_validate_1.matchesObject({
        title: type_validate_1.matchesString(),
        description: type_validate_1.matchesString(),
        withIllustration: type_validate_1.matchesBoolean()
      })),
      items: type_validate_1.makeOptional(resourceSelectionSchema),
      loading: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      loadingMore: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      maxSelectable: type_validate_1.makeOptional(type_validate_1.matchesPositiveInteger()),
      primaryActionLabel: type_validate_1.makeOptional(type_validate_1.matchesString()),
      searchQuery: type_validate_1.makeOptional(type_validate_1.matchesString()),
      searchQueryPlaceholder: type_validate_1.makeOptional(type_validate_1.matchesString()),
      secondaryActionLabel: type_validate_1.makeOptional(type_validate_1.matchesString()),
      selectedItems: type_validate_1.makeOptional(type_validate_1.matchesArray(type_validate_1.matchesObject(sharedResourceSchema))),
      title: type_validate_1.makeOptional(type_validate_1.matchesString()),
      verticalAlignment: type_validate_1.makeOptional(type_validate_1.matchesEnum(Picker_1.ALL_RESOURCE_VERTICAL_ALIGNMENT)),
      allowEmptySelection: type_validate_1.makeOptional(type_validate_1.matchesBoolean()),
      resourceName: type_validate_1.makeOptional(resourceName)
    });
    var pickerActionSchema = type_validate_1.matchesObject({
      options: type_validate_1.makeOptional(resourceSelectionSchema)
    });
    var selectionSchema = type_validate_1.matchesObject({
      selectedItems: resourceSelectionSchema
    });
    var searchSchema = type_validate_1.matchesObject({
      searchQuery: type_validate_1.makeOptional(type_validate_1.matchesString())
    });
    function validateProps(props) {
      return type_validate_1.validate(props, pickerOptions);
    }
    exports.validateProps = validateProps;
    function validateAction(action) {
      switch (action.type) {
        case Picker_1.Action.UPDATE:
        case Picker_1.Action.OPEN:
          return type_validate_1.validate(action, utils_1.createActionValidator(Picker_1.Action, pickerActionSchema, false, true));
        case Picker_1.Action.SELECT:
          return type_validate_1.validate(action, utils_1.createActionValidator(Picker_1.Action, selectionSchema, true, true));
        case Picker_1.Action.SEARCH:
          return type_validate_1.validate(action, utils_1.createActionValidator(Picker_1.Action, searchSchema, true, true));
        case Picker_1.Action.CANCEL:
        case Picker_1.Action.LOAD_MORE:
          return type_validate_1.validate(action, utils_1.createActionValidator(Picker_1.Action));
        default:
          return type_validate_1.validate(action, utils_1.createActionValidator(Picker_1.Action));
      }
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge-core/validate/actions/index.js
var require_actions6 = __commonJS({
  "node_modules/@shopify/app-bridge-core/validate/actions/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unstable_Picker = exports.Toast = exports.TitleBar = exports.ResourcePicker = exports.Navigation = exports.Modal = exports.Menu = exports.Link = exports.LeaveConfirmation = exports.FeedbackModal = exports.ContextualSaveBar = exports.ButtonGroup = exports.Button = void 0;
    var Button2 = __importStar(require_button());
    exports.Button = Button2;
    var ButtonGroup = __importStar(require_buttonGroup());
    exports.ButtonGroup = ButtonGroup;
    var ContextualSaveBar = __importStar(require_contextualSaveBar());
    exports.ContextualSaveBar = ContextualSaveBar;
    var FeedbackModal = __importStar(require_feedbackModal());
    exports.FeedbackModal = FeedbackModal;
    var LeaveConfirmation = __importStar(require_leaveConfirmation());
    exports.LeaveConfirmation = LeaveConfirmation;
    var Link2 = __importStar(require_link());
    exports.Link = Link2;
    var Menu = __importStar(require_menu());
    exports.Menu = Menu;
    var Modal2 = __importStar(require_modal2());
    exports.Modal = Modal2;
    var Navigation = __importStar(require_navigation());
    exports.Navigation = Navigation;
    var ResourcePicker = __importStar(require_resourcePicker());
    exports.ResourcePicker = ResourcePicker;
    var TitleBar = __importStar(require_titleBar());
    exports.TitleBar = TitleBar;
    var Toast = __importStar(require_toast());
    exports.Toast = Toast;
    var unstable_Picker = __importStar(require_picker());
    exports.unstable_Picker = unstable_Picker;
  }
});

// node_modules/@shopify/app-bridge/validate/type-validate.js
var require_type_validate2 = __commonJS({
  "node_modules/@shopify/app-bridge/validate/type-validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchesPositiveNumber = exports.TYPE_ERROR = exports.oneOf = exports.matchesArray = exports.validate = exports.matchesPositiveInteger = exports.matchesBoolean = exports.makeOptional = exports.matchesString = exports.matchesObject = exports.matchesEnum = exports.composeSchemas = void 0;
    var type_validate_1 = require_type_validate();
    Object.defineProperty(exports, "TYPE_ERROR", { enumerable: true, get: function() {
      return type_validate_1.TYPE_ERROR;
    } });
    var type_validate_2 = require_type_validate();
    Object.defineProperty(exports, "composeSchemas", { enumerable: true, get: function() {
      return type_validate_2.composeSchemas;
    } });
    Object.defineProperty(exports, "matchesEnum", { enumerable: true, get: function() {
      return type_validate_2.matchesEnum;
    } });
    Object.defineProperty(exports, "matchesObject", { enumerable: true, get: function() {
      return type_validate_2.matchesObject;
    } });
    Object.defineProperty(exports, "matchesString", { enumerable: true, get: function() {
      return type_validate_2.matchesString;
    } });
    Object.defineProperty(exports, "makeOptional", { enumerable: true, get: function() {
      return type_validate_2.makeOptional;
    } });
    Object.defineProperty(exports, "matchesBoolean", { enumerable: true, get: function() {
      return type_validate_2.matchesBoolean;
    } });
    Object.defineProperty(exports, "matchesPositiveInteger", { enumerable: true, get: function() {
      return type_validate_2.matchesPositiveInteger;
    } });
    Object.defineProperty(exports, "validate", { enumerable: true, get: function() {
      return type_validate_2.validate;
    } });
    Object.defineProperty(exports, "matchesArray", { enumerable: true, get: function() {
      return type_validate_2.matchesArray;
    } });
    Object.defineProperty(exports, "oneOf", { enumerable: true, get: function() {
      return type_validate_2.oneOf;
    } });
    function constructErrors(value, error, options) {
      if (options === void 0) {
        options = { message: void 0 };
      }
      return [
        {
          value,
          error,
          message: typeof options.message === "function" ? options.message(error, value) : options.message
        }
      ];
    }
    function matchesPositiveNumber(options) {
      return function(value) {
        return Number.isNaN(value) || !Number.isFinite(value) || value < 0 ? constructErrors(value, type_validate_1.TYPE_ERROR + "_number", options) : void 0;
      };
    }
    exports.matchesPositiveNumber = matchesPositiveNumber;
  }
});

// node_modules/@shopify/app-bridge/validate/utils.js
var require_utils2 = __commonJS({
  "node_modules/@shopify/app-bridge/validate/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mixedAppClientCheck = exports.actionMessage = exports.relativePathSchema = exports.relativeUrlSchema = exports.isValidRelativePath = exports.createActionValidator = void 0;
    var utils_1 = require_utils();
    Object.defineProperty(exports, "createActionValidator", { enumerable: true, get: function() {
      return utils_1.createActionValidator;
    } });
    Object.defineProperty(exports, "isValidRelativePath", { enumerable: true, get: function() {
      return utils_1.isValidRelativePath;
    } });
    Object.defineProperty(exports, "relativeUrlSchema", { enumerable: true, get: function() {
      return utils_1.relativeUrlSchema;
    } });
    Object.defineProperty(exports, "relativePathSchema", { enumerable: true, get: function() {
      return utils_1.relativePathSchema;
    } });
    function actionMessage(errors) {
      return errors.map(function(err) {
        var path = err.path, error = err.error, message = err.message, value = err.value;
        var valueStr = typeof value === "object" ? JSON.stringify(value) : value;
        return "`" + error + "` thrown for" + (path ? " path: " + path + " and" : "") + " value: `" + valueStr + "`" + (message ? " with message: " + message : "");
      }).join(" | ");
    }
    exports.actionMessage = actionMessage;
    function mixedAppClientCheck(window2) {
      window2.addEventListener("DOMContentLoaded", function() {
        if (!Object.prototype.hasOwnProperty.call(window2, "ShopifyApp")) {
          return;
        }
        console.error("%cException Detected \u{1F6AB}\n\n%cAn instance of the EASDK client was detected while initializing Shopify App Bridge. Using Shopify App Bridge and the EASDK simultaneously is not supported.\n\nIf you're migrating an existing app that was built with the shopify_app gem, then the EASDK client might have been included in the home page view template. In this case, remove it from your app before initializing Shopify App Bridge again.", "font-size: large;", "font-size: normal;");
      }, { once: true });
    }
    exports.mixedAppClientCheck = mixedAppClientCheck;
  }
});

// node_modules/@shopify/app-bridge/validate/actions/cart.js
var require_cart = __commonJS({
  "node_modules/@shopify/app-bridge/validate/actions/cart.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = void 0;
    var Cart_1 = require_Cart2();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Cart_1.Action;
    } });
    var type_validate_1 = require_type_validate2();
    var utils_1 = require_utils2();
    var addressSchema = type_validate_1.matchesObject({
      address1: type_validate_1.makeOptional(type_validate_1.matchesString()),
      address2: type_validate_1.makeOptional(type_validate_1.matchesString()),
      city: type_validate_1.makeOptional(type_validate_1.matchesString()),
      company: type_validate_1.makeOptional(type_validate_1.matchesString()),
      firstName: type_validate_1.makeOptional(type_validate_1.matchesString()),
      lastName: type_validate_1.makeOptional(type_validate_1.matchesString()),
      phone: type_validate_1.makeOptional(type_validate_1.matchesString()),
      province: type_validate_1.makeOptional(type_validate_1.matchesString()),
      country: type_validate_1.makeOptional(type_validate_1.matchesString()),
      zip: type_validate_1.makeOptional(type_validate_1.matchesString()),
      name: type_validate_1.makeOptional(type_validate_1.matchesString()),
      provinceCode: type_validate_1.makeOptional(type_validate_1.matchesString()),
      countryCode: type_validate_1.makeOptional(type_validate_1.matchesString())
    });
    var discountSchema = type_validate_1.matchesObject({
      amount: type_validate_1.makeOptional(type_validate_1.matchesPositiveInteger()),
      discountDescription: type_validate_1.makeOptional(type_validate_1.matchesString()),
      type: type_validate_1.makeOptional(type_validate_1.matchesString()),
      discountCode: type_validate_1.makeOptional(type_validate_1.matchesString())
    });
    var discountAmount = type_validate_1.matchesObject({
      amount: type_validate_1.matchesPositiveNumber(),
      discountDescription: type_validate_1.makeOptional(type_validate_1.matchesString()),
      type: type_validate_1.makeOptional(type_validate_1.matchesString())
    });
    var discountCode = type_validate_1.matchesObject({
      discountCode: type_validate_1.matchesString()
    });
    var lineItemSchema = type_validate_1.matchesObject({
      price: type_validate_1.makeOptional(type_validate_1.matchesPositiveNumber()),
      quantity: type_validate_1.makeOptional(type_validate_1.matchesPositiveInteger()),
      title: type_validate_1.makeOptional(type_validate_1.matchesString()),
      variantId: type_validate_1.makeOptional(type_validate_1.matchesPositiveInteger()),
      discount: type_validate_1.makeOptional(discountAmount)
    });
    var updateLineItemSchema = type_validate_1.matchesObject({
      quantity: type_validate_1.matchesPositiveInteger()
    });
    var customerSchema = type_validate_1.matchesObject({
      id: type_validate_1.makeOptional(type_validate_1.matchesPositiveInteger()),
      email: type_validate_1.makeOptional(type_validate_1.matchesString()),
      firstName: type_validate_1.makeOptional(type_validate_1.matchesString()),
      lastName: type_validate_1.makeOptional(type_validate_1.matchesString()),
      note: type_validate_1.makeOptional(type_validate_1.matchesString()),
      addresses: type_validate_1.makeOptional(type_validate_1.matchesArray(addressSchema))
    });
    var noteSchema = type_validate_1.matchesObject({
      name: type_validate_1.matchesString(),
      value: type_validate_1.matchesString()
    });
    var cartSchema = type_validate_1.matchesObject({
      cartDiscount: type_validate_1.makeOptional(discountSchema),
      customer: type_validate_1.makeOptional(customerSchema),
      grandTotal: type_validate_1.makeOptional(type_validate_1.matchesString()),
      lineItems: type_validate_1.makeOptional(type_validate_1.matchesArray(lineItemSchema)),
      noteAttributes: type_validate_1.makeOptional(type_validate_1.matchesArray(noteSchema)),
      subTotal: type_validate_1.makeOptional(type_validate_1.matchesString()),
      taxTotal: type_validate_1.makeOptional(type_validate_1.matchesString())
    });
    var propertiesSchema = type_validate_1.composeSchemas(type_validate_1.matchesObject({}), function(value) {
      var validator = type_validate_1.matchesString();
      var schema = Object.keys(value).reduce(function(acc, key) {
        acc[key] = validator;
        return acc;
      }, {});
      return type_validate_1.validate(value, type_validate_1.matchesObject(schema));
    });
    var matchesStringArray = type_validate_1.matchesArray(type_validate_1.matchesString());
    function createDataValidator(data) {
      return utils_1.createActionValidator(Cart_1.Action, data ? type_validate_1.matchesObject({ data }) : void 0, true, true);
    }
    function createDataValidatorWithIndex(data) {
      var indexSchema = type_validate_1.matchesObject({ index: type_validate_1.matchesPositiveInteger() });
      if (data) {
        var dataSchema = type_validate_1.matchesObject({ data });
        return utils_1.createActionValidator(Cart_1.Action, type_validate_1.composeSchemas(indexSchema, dataSchema), true, true);
      }
      return utils_1.createActionValidator(Cart_1.Action, indexSchema, true, true);
    }
    function getDiscountSchema(data) {
      if (data.amount) {
        return discountAmount;
      }
      return discountCode;
    }
    function validateAction(action) {
      switch (action.type) {
        case Cart_1.Action.UPDATE:
          return type_validate_1.validate(action, createDataValidator(cartSchema));
        case Cart_1.Action.SET_CUSTOMER:
          return type_validate_1.validate(action, createDataValidator(customerSchema));
        case Cart_1.Action.ADD_CUSTOMER_ADDRESS:
          return type_validate_1.validate(action, createDataValidator(addressSchema));
        case Cart_1.Action.UPDATE_CUSTOMER_ADDRESS:
          return type_validate_1.validate(action, createDataValidatorWithIndex(addressSchema));
        case Cart_1.Action.SET_DISCOUNT:
          return type_validate_1.validate(action, createDataValidator(getDiscountSchema(action.payload.data)));
        case Cart_1.Action.SET_PROPERTIES:
          return type_validate_1.validate(action, createDataValidator(propertiesSchema));
        case Cart_1.Action.REMOVE_PROPERTIES:
          return type_validate_1.validate(action, createDataValidator(matchesStringArray));
        case Cart_1.Action.ADD_LINE_ITEM:
          return type_validate_1.validate(action, createDataValidator(lineItemSchema));
        case Cart_1.Action.UPDATE_LINE_ITEM:
          return type_validate_1.validate(action, createDataValidatorWithIndex(updateLineItemSchema));
        case Cart_1.Action.REMOVE_LINE_ITEM:
          return type_validate_1.validate(action, createDataValidatorWithIndex());
        case Cart_1.Action.SET_LINE_ITEM_DISCOUNT:
          return type_validate_1.validate(action, createDataValidatorWithIndex(discountAmount));
        case Cart_1.Action.REMOVE_LINE_ITEM_DISCOUNT:
          return type_validate_1.validate(action, createDataValidatorWithIndex());
        case Cart_1.Action.SET_LINE_ITEM_PROPERTIES:
          return type_validate_1.validate(action, createDataValidatorWithIndex(propertiesSchema));
        case Cart_1.Action.REMOVE_LINE_ITEM_PROPERTIES:
          return type_validate_1.validate(action, createDataValidatorWithIndex(matchesStringArray));
        case Cart_1.Action.FETCH:
        case Cart_1.Action.REMOVE_CUSTOMER:
        case Cart_1.Action.REMOVE_DISCOUNT:
        case Cart_1.Action.CLEAR:
        default:
          return type_validate_1.validate(action, utils_1.createActionValidator(Cart_1.Action, void 0, false, true));
      }
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge/validate/actions/fullscreen.js
var require_fullscreen = __commonJS({
  "node_modules/@shopify/app-bridge/validate/actions/fullscreen.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = void 0;
    var Fullscreen_1 = require_Fullscreen2();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Fullscreen_1.Action;
    } });
    var type_validate_1 = require_type_validate2();
    var utils_1 = require_utils2();
    function validateAction(action) {
      var validator = utils_1.createActionValidator(Fullscreen_1.Action);
      return type_validate_1.validate(action, validator);
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge/validate/actions/loading.js
var require_loading = __commonJS({
  "node_modules/@shopify/app-bridge/validate/actions/loading.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = void 0;
    var Loading_1 = require_Loading2();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Loading_1.Action;
    } });
    var type_validate_1 = require_type_validate2();
    var utils_1 = require_utils2();
    function validateAction(action) {
      var validator = utils_1.createActionValidator(Loading_1.Action);
      return type_validate_1.validate(action, validator);
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge/validate/actions/print.js
var require_print2 = __commonJS({
  "node_modules/@shopify/app-bridge/validate/actions/print.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = void 0;
    var Print_1 = require_Print2();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Print_1.Action;
    } });
    var type_validate_1 = require_type_validate2();
    var utils_1 = require_utils2();
    function validateAction(action) {
      return type_validate_1.validate(action, utils_1.createActionValidator(Print_1.Action));
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge/validate/actions/scanner.js
var require_scanner = __commonJS({
  "node_modules/@shopify/app-bridge/validate/actions/scanner.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Action = exports.validateAction = void 0;
    var Scanner_1 = require_Scanner2();
    Object.defineProperty(exports, "Action", { enumerable: true, get: function() {
      return Scanner_1.Action;
    } });
    var type_validate_1 = require_type_validate2();
    var utils_1 = require_utils2();
    function validateAction(action) {
      return type_validate_1.validate(action, utils_1.createActionValidator(Scanner_1.Action));
    }
    exports.validateAction = validateAction;
  }
});

// node_modules/@shopify/app-bridge/validate/actions/index.js
var require_actions7 = __commonJS({
  "node_modules/@shopify/app-bridge/validate/actions/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unstable_Picker = exports.Toast = exports.TitleBar = exports.Scanner = exports.ResourcePicker = exports.Print = exports.Navigation = exports.Modal = exports.Menu = exports.Loading = exports.Link = exports.LeaveConfirmation = exports.Fullscreen = exports.FeedbackModal = exports.ContextualSaveBar = exports.Cart = exports.ButtonGroup = exports.Button = void 0;
    var actions_1 = require_actions6();
    Object.defineProperty(exports, "Button", { enumerable: true, get: function() {
      return actions_1.Button;
    } });
    Object.defineProperty(exports, "ButtonGroup", { enumerable: true, get: function() {
      return actions_1.ButtonGroup;
    } });
    Object.defineProperty(exports, "ContextualSaveBar", { enumerable: true, get: function() {
      return actions_1.ContextualSaveBar;
    } });
    Object.defineProperty(exports, "FeedbackModal", { enumerable: true, get: function() {
      return actions_1.FeedbackModal;
    } });
    Object.defineProperty(exports, "LeaveConfirmation", { enumerable: true, get: function() {
      return actions_1.LeaveConfirmation;
    } });
    Object.defineProperty(exports, "Link", { enumerable: true, get: function() {
      return actions_1.Link;
    } });
    Object.defineProperty(exports, "Menu", { enumerable: true, get: function() {
      return actions_1.Menu;
    } });
    Object.defineProperty(exports, "Modal", { enumerable: true, get: function() {
      return actions_1.Modal;
    } });
    Object.defineProperty(exports, "Navigation", { enumerable: true, get: function() {
      return actions_1.Navigation;
    } });
    Object.defineProperty(exports, "ResourcePicker", { enumerable: true, get: function() {
      return actions_1.ResourcePicker;
    } });
    Object.defineProperty(exports, "TitleBar", { enumerable: true, get: function() {
      return actions_1.TitleBar;
    } });
    Object.defineProperty(exports, "Toast", { enumerable: true, get: function() {
      return actions_1.Toast;
    } });
    Object.defineProperty(exports, "unstable_Picker", { enumerable: true, get: function() {
      return actions_1.unstable_Picker;
    } });
    var Cart = __importStar(require_cart());
    exports.Cart = Cart;
    var Fullscreen = __importStar(require_fullscreen());
    exports.Fullscreen = Fullscreen;
    var Loading = __importStar(require_loading());
    exports.Loading = Loading;
    var Print = __importStar(require_print2());
    exports.Print = Print;
    var Scanner = __importStar(require_scanner());
    exports.Scanner = Scanner;
  }
});

// node_modules/@shopify/app-bridge/validate/validator.js
var require_validator3 = __commonJS({
  "node_modules/@shopify/app-bridge/validate/validator.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validatorMiddleware = exports.connectValidatorToDispatchHook = exports.connectValidatorToUpdateHook = void 0;
    var client_1 = require_client();
    var types_1 = require_types2();
    var Error_1 = require_Error2();
    var helper_1 = require_helper2();
    var actions_1 = require_actions7();
    var type_validate_1 = require_type_validate2();
    var utils_1 = require_utils2();
    function updateValidator(localOrigin, group, options) {
      switch (group) {
        case types_1.Group.Button:
          return actions_1.Button.validateProps(options);
        case types_1.Group.ButtonGroup:
          return actions_1.ButtonGroup.validateProps(options);
        case types_1.Group.Modal:
          return actions_1.Modal.validateProps(options, localOrigin);
        case types_1.Group.Menu:
          return actions_1.Menu.validateProps(options);
        case types_1.Group.Link:
          return actions_1.Link.validateProps(options);
        case types_1.Group.TitleBar:
          return actions_1.TitleBar.validateProps(options);
        case types_1.Group.ResourcePicker:
          return actions_1.ResourcePicker.validateProps(options);
        case types_1.Group.Toast:
          return actions_1.Toast.validateProps(options);
        case types_1.Group.ContextualSaveBar:
          return actions_1.ContextualSaveBar.validateProps(options);
        case types_1.Group.unstable_Picker:
          return actions_1.unstable_Picker.validateProps(options);
      }
    }
    function dispatchPayloadValidator(action, localOrigin) {
      switch (action.group) {
        case types_1.Group.Button:
          return actions_1.Button.validateAction(action);
        case types_1.Group.ButtonGroup:
          return actions_1.ButtonGroup.validateAction(action);
        case types_1.Group.Modal:
          return actions_1.Modal.validateAction(action, localOrigin);
        case types_1.Group.Menu:
          return actions_1.Menu.validateAction(action);
        case types_1.Group.TitleBar:
          return actions_1.TitleBar.validateAction(action);
        case types_1.Group.ResourcePicker:
          return actions_1.ResourcePicker.validateAction(action);
        case types_1.Group.Loading:
          return actions_1.Loading.validateAction(action);
        case types_1.Group.Toast:
          return actions_1.Toast.validateAction(action);
        case types_1.Group.Cart:
          return actions_1.Cart.validateAction(action);
        case types_1.Group.Navigation:
          return actions_1.Navigation.validateAction(action);
        case types_1.Group.Print:
          return actions_1.Print.validateAction(action);
        case types_1.Group.Scanner:
          return actions_1.Scanner.validateAction(action);
        case types_1.Group.Fullscreen:
          return actions_1.Fullscreen.validateAction(action);
        case types_1.Group.ContextualSaveBar:
          return actions_1.ContextualSaveBar.validateAction(action);
        case types_1.Group.Link:
          return actions_1.Link.validateAction(action);
        case types_1.Group.unstable_Picker:
          return actions_1.unstable_Picker.validateAction(action);
      }
    }
    function dispatchValidator(action, origin) {
      var errors = type_validate_1.validate(action, type_validate_1.matchesObject({
        group: type_validate_1.matchesEnum(types_1.Group, {
          message: function(_, value) {
            return "Unknown or unsupported action group `" + value + "`";
          }
        }),
        version: type_validate_1.matchesString()
      }));
      if (errors) {
        return Error_1.invalidAction(action, utils_1.actionMessage(errors));
      }
      var payloadErrors = dispatchPayloadValidator(action, origin);
      return payloadErrors ? Error_1.invalidPayload(action, utils_1.actionMessage(payloadErrors)) : action;
    }
    var connectValidatorToUpdateHook = function(next) {
      return function(options) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        var mergedOptions = helper_1.getMergedProps(this.options, options);
        var errors = updateValidator(this.app.localOrigin, this.defaultGroup, mergedOptions);
        if (errors) {
          throw Error_1.fromAction(utils_1.actionMessage(errors), Error_1.Action.INVALID_OPTIONS);
        }
        return next.apply(void 0, __spreadArray([options], args));
      };
    };
    exports.connectValidatorToUpdateHook = connectValidatorToUpdateHook;
    var connectValidatorToDispatchHook = function(next) {
      return function(action) {
        var finalAction = dispatchValidator(action, this.localOrigin);
        return next(finalAction);
      };
    };
    exports.connectValidatorToDispatchHook = connectValidatorToDispatchHook;
    var validatorMiddleware = function(hooks) {
      hooks.set(client_1.LifecycleHook.UpdateAction, exports.connectValidatorToUpdateHook);
      hooks.set(client_1.LifecycleHook.DispatchAction, exports.connectValidatorToDispatchHook);
    };
    exports.validatorMiddleware = validatorMiddleware;
  }
});

// node_modules/@shopify/app-bridge/validate/index.js
var require_validate = __commonJS({
  "node_modules/@shopify/app-bridge/validate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validator_1 = require_validator3();
    exports.default = validator_1.validatorMiddleware;
  }
});

// node_modules/@shopify/app-bridge/development.js
var require_development = __commonJS({
  "node_modules/@shopify/app-bridge/development.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createApp = void 0;
    var validate_1 = __importDefault(require_validate());
    var utils_1 = require_utils2();
    var redirect_1 = require_redirect();
    var client_1 = require_client();
    var shared_1 = require_shared();
    function createApp(config) {
      var currentWindow = redirect_1.getWindow();
      if (!currentWindow || !currentWindow.top) {
        return shared_1.serverAppBridge;
      }
      utils_1.mixedAppClientCheck(currentWindow);
      return client_1.createAppWrapper(currentWindow.top, currentWindow.location.origin, [validate_1.default])(config);
    }
    exports.createApp = createApp;
    exports.default = createApp;
    __exportStar(require_MessageTransport2(), exports);
    __exportStar(require_client(), exports);
  }
});

// node_modules/@shopify/app-bridge/index.js
var require_app_bridge = __commonJS({
  "node_modules/@shopify/app-bridge/index.js"(exports, module) {
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_development();
    }
  }
});

// node_modules/@shopify/app-bridge-react/components/ClientRouter/router.js
var require_router = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/ClientRouter/router.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleRouteChange = void 0;
    var actions_1 = require_actions5();
    function handleRouteChange(app, history) {
      return app.subscribe(actions_1.Redirect.Action.APP, function(_a) {
        var path = _a.path;
        history.replace(path);
      });
    }
    exports.handleRouteChange = handleRouteChange;
  }
});

// node_modules/@shopify/app-bridge-react/components/ClientRouter/ClientRouter.js
var require_ClientRouter = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/ClientRouter/ClientRouter.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = __importDefault(require_react());
    var context_1 = require_context();
    var router_1 = require_router();
    var ClientRouter = (
      /** @class */
      function(_super) {
        __extends(ClientRouter2, _super);
        function ClientRouter2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        ClientRouter2.prototype.componentDidMount = function() {
          var history = this.props.history;
          this.unsubscribe = router_1.handleRouteChange(this.context, history);
        };
        ClientRouter2.prototype.componentWillUnmount = function() {
          if (this.unsubscribe) {
            this.unsubscribe();
          }
        };
        ClientRouter2.prototype.render = function() {
          return null;
        };
        ClientRouter2.contextType = context_1.AppBridgeContext;
        return ClientRouter2;
      }(react_1.default.Component)
    );
    exports.default = ClientRouter;
  }
});

// node_modules/@shopify/app-bridge-react/components/ClientRouter/hook.js
var require_hook = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/ClientRouter/hook.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    var useAppBridge_1 = require_useAppBridge();
    var router_1 = require_router();
    function useClientRouting(history) {
      var app = useAppBridge_1.useAppBridge();
      react_1.useEffect(function() {
        return router_1.handleRouteChange(app, history);
      }, [app, history]);
    }
    exports.default = useClientRouting;
  }
});

// node_modules/@shopify/app-bridge-react/components/ClientRouter/index.js
var require_ClientRouter2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/ClientRouter/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useClientRouting = exports.ClientRouter = void 0;
    var ClientRouter_1 = require_ClientRouter();
    Object.defineProperty(exports, "ClientRouter", { enumerable: true, get: function() {
      return __importDefault(ClientRouter_1).default;
    } });
    var hook_1 = require_hook();
    Object.defineProperty(exports, "useClientRouting", { enumerable: true, get: function() {
      return __importDefault(hook_1).default;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/components/RoutePropagator/globals.js
var require_globals = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/RoutePropagator/globals.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getOrigin = exports.getTopWindow = exports.getSelfWindow = void 0;
    function getSelfWindow() {
      return window.self;
    }
    exports.getSelfWindow = getSelfWindow;
    function getTopWindow() {
      return window.top;
    }
    exports.getTopWindow = getTopWindow;
    function getOrigin() {
      return location.origin;
    }
    exports.getOrigin = getOrigin;
  }
});

// node_modules/@shopify/app-bridge-react/components/RoutePropagator/route-propagator.js
var require_route_propagator = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/RoutePropagator/route-propagator.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateHistory = void 0;
    var MessageTransport_1 = require_MessageTransport2();
    var actions_1 = require_actions5();
    var globals_1 = require_globals();
    var embeddedFrameParamsToRemove = [
      "hmac",
      "locale",
      "protocol",
      "session",
      "shop",
      "timestamp",
      "host"
    ];
    function updateHistory(app, location2) {
      return __awaiter(this, void 0, void 0, function() {
        var selfWindow, topWindow, renderedInTheTopWindow, renderedAsMainApp, normalizedLocation, pathname, search, hash, locationStr;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              selfWindow = globals_1.getSelfWindow();
              topWindow = globals_1.getTopWindow();
              renderedInTheTopWindow = selfWindow === topWindow;
              return [4, app.getState("context").then(function(context) {
                return context === MessageTransport_1.Context.Main;
              })];
            case 1:
              renderedAsMainApp = _a.sent();
              if (renderedInTheTopWindow || !renderedAsMainApp) {
                return [
                  2
                  /*return*/
                ];
              }
              normalizedLocation = getNormalizedURL(location2);
              embeddedFrameParamsToRemove.forEach(function(param) {
                return normalizedLocation.searchParams.delete(param);
              });
              pathname = normalizedLocation.pathname, search = normalizedLocation.search, hash = normalizedLocation.hash;
              locationStr = "" + pathname + search + hash;
              actions_1.History.create(app).dispatch(actions_1.History.Action.REPLACE, locationStr);
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }
    exports.updateHistory = updateHistory;
    function getNormalizedURL(location2) {
      var origin = globals_1.getOrigin();
      if (typeof location2 === "string") {
        return new URL(location2, origin);
      }
      var pathname = location2.pathname, search = location2.search, hash = location2.hash;
      return new URL("" + pathname + search + hash, origin);
    }
  }
});

// node_modules/@shopify/app-bridge-react/components/RoutePropagator/RoutePropagator.js
var require_RoutePropagator = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/RoutePropagator/RoutePropagator.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = __importDefault(require_react());
    var context_1 = require_context();
    var route_propagator_1 = require_route_propagator();
    var RoutePropagator = (
      /** @class */
      function(_super) {
        __extends(RoutePropagator2, _super);
        function RoutePropagator2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        RoutePropagator2.prototype.componentDidMount = function() {
          var location2 = this.props.location;
          route_propagator_1.updateHistory(this.context, location2);
        };
        RoutePropagator2.prototype.componentDidUpdate = function(_a) {
          var prevLocation = _a.location;
          var location2 = this.props.location;
          if (location2 !== prevLocation) {
            route_propagator_1.updateHistory(this.context, location2);
          }
        };
        RoutePropagator2.prototype.render = function() {
          return null;
        };
        RoutePropagator2.contextType = context_1.AppBridgeContext;
        return RoutePropagator2;
      }(react_1.default.Component)
    );
    exports.default = RoutePropagator;
  }
});

// node_modules/@shopify/app-bridge-react/components/RoutePropagator/hook.js
var require_hook2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/RoutePropagator/hook.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    var useAppBridge_1 = require_useAppBridge();
    var route_propagator_1 = require_route_propagator();
    function useRoutePropagation(location2) {
      var app = useAppBridge_1.useAppBridge();
      react_1.useEffect(function() {
        route_propagator_1.updateHistory(app, location2);
      }, [app, location2]);
    }
    exports.default = useRoutePropagation;
  }
});

// node_modules/@shopify/app-bridge-react/components/RoutePropagator/index.js
var require_RoutePropagator2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/RoutePropagator/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useRoutePropagation = exports.RoutePropagator = void 0;
    var RoutePropagator_1 = require_RoutePropagator();
    Object.defineProperty(exports, "RoutePropagator", { enumerable: true, get: function() {
      return __importDefault(RoutePropagator_1).default;
    } });
    var hook_1 = require_hook2();
    Object.defineProperty(exports, "useRoutePropagation", { enumerable: true, get: function() {
      return __importDefault(hook_1).default;
    } });
  }
});

// node_modules/@shopify/app-bridge-react/package.json
var require_package2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/package.json"(exports, module) {
    module.exports = {
      name: "@shopify/app-bridge-react",
      version: "3.7.8",
      types: "index.d.ts",
      main: "index.js",
      unpkg: "umd/index.js",
      jsdelivr: "umd/index.js",
      files: [
        "/components/",
        "/umd/",
        "/hooks/",
        "/utilities/",
        "/context.d.ts",
        "/context.js",
        "/index.d.ts",
        "/index.js",
        "/types.d.ts",
        "/types.js",
        "/useAppBridge.d.ts",
        "/useAppBridge.js"
      ],
      private: false,
      publishConfig: {
        access: "public",
        "@shopify:registry": "https://registry.npmjs.org"
      },
      repository: "git@github.com:Shopify/app-bridge.git",
      homepage: "https://shopify.dev/tools/app-bridge/react-components",
      author: "Shopify Inc.",
      license: "MIT",
      scripts: {
        build: "yarn build:tsc && yarn build:umd",
        "build:tsc": "NODE_ENV=production tsc",
        "build:umd": "NODE_ENV=production webpack -p",
        check: "tsc",
        clean: "yarn clean:tsc && yarn clean:umd",
        "clean:tsc": "NODE_ENV=production tsc --build --clean",
        "clean:umd": "rm -rf ./umd",
        pack: "yarn pack",
        size: "size-limit"
      },
      sideEffects: false,
      "size-limit": [
        {
          limit: "36.4 KB",
          path: "index.js"
        }
      ],
      dependencies: {
        "@shopify/app-bridge": "^3.7.8"
      },
      devDependencies: {
        "@shopify/app-bridge-testing-library": "^0.0.4",
        "@shopify/react-testing": "^4.1.1",
        "@types/react": "^18.0.2",
        "react-dom": "^18.2.0"
      },
      peerDependencies: {
        react: "^16.0.0 || ^17.0.0 || ^18.0.0"
      }
    };
  }
});

// node_modules/@shopify/app-bridge-react/components/Provider/Provider.js
var require_Provider = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Provider/Provider.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useRouter = exports.setClientInterfaceHook = void 0;
    var react_1 = __importStar(require_react());
    var app_bridge_1 = __importStar(require_app_bridge());
    var context_1 = require_context();
    var ClientRouter_1 = require_ClientRouter2();
    var RoutePropagator_1 = require_RoutePropagator2();
    var packageJson = require_package2();
    function Provider(_a) {
      var config = _a.config, router = _a.router, children = _a.children;
      var app = react_1.useMemo(function() {
        return app_bridge_1.default(config);
      }, []);
      react_1.useEffect(function() {
        if (app === null || app === void 0 ? void 0 : app.hooks) {
          app.hooks.set(app_bridge_1.LifecycleHook.DispatchAction, exports.setClientInterfaceHook);
        }
      }, [app]);
      var routerMarkup = (router === null || router === void 0 ? void 0 : router.history) && (router === null || router === void 0 ? void 0 : router.location) ? react_1.default.createElement(Router, { router }, children) : children;
      return react_1.default.createElement(context_1.AppBridgeContext.Provider, { value: app }, routerMarkup);
    }
    var setClientInterfaceHook = function(next) {
      return function(action) {
        action.clientInterface = {
          name: "@shopify/app-bridge-react",
          version: packageJson.version
        };
        return next(action);
      };
    };
    exports.setClientInterfaceHook = setClientInterfaceHook;
    var RouterContext = react_1.createContext(void 0);
    function useRouter() {
      return react_1.useContext(RouterContext);
    }
    exports.useRouter = useRouter;
    function Router(_a) {
      var router = _a.router, children = _a.children;
      ClientRouter_1.useClientRouting(router.history);
      RoutePropagator_1.useRoutePropagation(router.location);
      return react_1.default.createElement(RouterContext.Provider, { value: router }, children);
    }
    exports.default = Provider;
  }
});

// node_modules/@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu.js
var require_NavigationMenu3 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    var AppLink_1 = require_AppLink2();
    var NavigationMenu_1 = require_NavigationMenu2();
    var useAppBridge_1 = require_useAppBridge();
    var Provider_1 = require_Provider();
    function defaultMatcher(link, location2) {
      var pathname = typeof location2 === "string" ? new URL(location2).pathname : location2.pathname;
      return link.destination.replace(/\/$/, "") === pathname.replace(/\/$/, "");
    }
    function NavigationMenu(_a) {
      var navigationLinks = _a.navigationLinks, _b = _a.matcher, matcher = _b === void 0 ? defaultMatcher : _b;
      var app = useAppBridge_1.useAppBridge();
      var _c = react_1.useState(), items = _c[0], setItems = _c[1];
      var locationOrHref = (Provider_1.useRouter() || {}).location;
      var location2 = react_1.useMemo(function() {
        return locationOrHref !== null && locationOrHref !== void 0 ? locationOrHref : window.location;
      }, [locationOrHref]);
      react_1.useEffect(function() {
        var items2 = navigationLinks.map(function(link) {
          return AppLink_1.create(app, link);
        });
        setItems(items2);
      }, [app, JSON.stringify(navigationLinks)]);
      var activeLink = react_1.useMemo(function() {
        var activeLinkIndex = (items || []).findIndex(function(link) {
          return matcher(link, location2);
        });
        if (activeLinkIndex >= 0) {
          return items === null || items === void 0 ? void 0 : items[activeLinkIndex];
        }
      }, [items, matcher, location2]);
      react_1.useEffect(function() {
        if (!items) {
          return;
        }
        NavigationMenu_1.create(app, { items, active: activeLink });
      }, [items, activeLink, app]);
      return null;
    }
    exports.default = NavigationMenu;
  }
});

// node_modules/@shopify/app-bridge-react/components/NavigationMenu/index.js
var require_NavigationMenu4 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/NavigationMenu/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var NavigationMenu_1 = __importDefault(require_NavigationMenu3());
    exports.default = NavigationMenu_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/components/Provider/index.js
var require_Provider2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Provider/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Provider_1 = __importDefault(require_Provider());
    exports.default = Provider_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/components/ResourcePicker/ResourcePicker.js
var require_ResourcePicker3 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/ResourcePicker/ResourcePicker.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResourceType = exports.ActionVerb = void 0;
    var react_1 = require_react();
    var ResourcePicker_1 = require_ResourcePicker2();
    Object.defineProperty(exports, "ActionVerb", { enumerable: true, get: function() {
      return ResourcePicker_1.ActionVerb;
    } });
    Object.defineProperty(exports, "ResourceType", { enumerable: true, get: function() {
      return ResourcePicker_1.ResourceType;
    } });
    var useAppBridge_1 = require_useAppBridge();
    function ResourcePicker(_a) {
      var open = _a.open, resourceType = _a.resourceType, onSelection = _a.onSelection, onCancel = _a.onCancel, allowMultiple = _a.allowMultiple, selectMultiple = _a.selectMultiple, props = __rest(_a, ["open", "resourceType", "onSelection", "onCancel", "allowMultiple", "selectMultiple"]);
      var options = react_1.useMemo(function() {
        return __assign(__assign({}, props), { selectMultiple: selectMultiple !== null && selectMultiple !== void 0 ? selectMultiple : allowMultiple });
      }, [allowMultiple, props, selectMultiple]);
      var app = useAppBridge_1.useAppBridge();
      var isUnmountedRef = react_1.useRef(false);
      react_1.useEffect(function() {
        return function() {
          isUnmountedRef.current = true;
        };
      }, []);
      var openRef = react_1.useRef(false);
      var optionsRef = react_1.useRef(options);
      var picker = react_1.useMemo(function() {
        return ResourcePicker_1.create(app, {
          resourceType: ResourcePicker_1.ResourceType[resourceType],
          options: optionsRef.current
        });
      }, [app, resourceType]);
      react_1.useEffect(function() {
        openRef.current = false;
        return function() {
          if (openRef.current && isUnmountedRef.current) {
            picker.dispatch(ResourcePicker_1.Action.CANCEL);
          }
        };
      }, [picker]);
      var focusReturnPointRef = react_1.useRef(null);
      var storeFocusReturnPoint = react_1.useCallback(function() {
        if (document.activeElement instanceof HTMLElement) {
          focusReturnPointRef.current = document.activeElement;
        }
      }, []);
      var applyFocusReturnPoint = react_1.useCallback(function() {
        var focusReturnPoint = focusReturnPointRef.current;
        focusReturnPointRef.current = null;
        if (focusReturnPoint && document.contains(focusReturnPoint)) {
          focusReturnPoint.focus();
        }
      }, []);
      react_1.useEffect(function() {
        if (open === openRef.current)
          return;
        openRef.current = open;
        if (open) {
          picker.dispatch(ResourcePicker_1.Action.OPEN);
          storeFocusReturnPoint();
        } else {
          picker.dispatch(ResourcePicker_1.Action.CLOSE);
          applyFocusReturnPoint();
        }
      }, [picker, open, storeFocusReturnPoint, applyFocusReturnPoint]);
      react_1.useEffect(function() {
        if (!onSelection)
          return;
        return picker.subscribe(ResourcePicker_1.Action.SELECT, function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          openRef.current = false;
          applyFocusReturnPoint();
          return onSelection.apply(void 0, args);
        });
      }, [picker, onSelection, applyFocusReturnPoint]);
      react_1.useEffect(function() {
        if (!onCancel)
          return;
        return picker.subscribe(ResourcePicker_1.Action.CANCEL, function() {
          openRef.current = false;
          applyFocusReturnPoint();
          return onCancel();
        });
      }, [picker, onCancel, applyFocusReturnPoint]);
      react_1.useEffect(function() {
        var shouldUpdate = JSON.stringify(options) !== JSON.stringify(optionsRef.current);
        if (!shouldUpdate)
          return;
        optionsRef.current = options;
        picker.set(options);
      }, [picker, options]);
      return null;
    }
    exports.default = ResourcePicker;
  }
});

// node_modules/@shopify/app-bridge-react/components/ResourcePicker/index.js
var require_ResourcePicker4 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/ResourcePicker/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourcePicker_1 = __importDefault(require_ResourcePicker3());
    exports.default = ResourcePicker_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/components/TitleBar/TitleBar.js
var require_TitleBar3 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/TitleBar/TitleBar.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    var Button_1 = require_Button2();
    var TitleBar_1 = require_TitleBar2();
    var ButtonGroup_1 = require_ButtonGroup2();
    var transformers_1 = require_transformers();
    var useAppBridge_1 = require_useAppBridge();
    function TitleBar(props) {
      var app = useAppBridge_1.useAppBridge();
      var currentProps = react_1.useRef();
      var titleBar = react_1.useMemo(function() {
        return TitleBar_1.create(app, {});
      }, [app]);
      react_1.useEffect(function() {
        var _a;
        var propsChanged = JSON.stringify(currentProps.current) !== JSON.stringify(props);
        currentProps.current = props;
        if (propsChanged) {
          titleBar.set(transformProps(app, props));
        } else {
          var primaryAction = props.primaryAction, secondaryActions = props.secondaryActions, actionGroups = props.actionGroups, breadcrumbs = props.breadcrumbs;
          var breadcrumb = Array.isArray(breadcrumbs) ? breadcrumbs[breadcrumbs.length - 1] : breadcrumbs;
          updateButton(breadcrumb, titleBar.options.breadcrumbs);
          updateButton(primaryAction, (_a = titleBar.options.buttons) === null || _a === void 0 ? void 0 : _a.primary);
          updateSecondaryActions(titleBar, secondaryActions);
          updateActionGroups(titleBar, actionGroups);
        }
        return function() {
          titleBar.unsubscribe();
        };
      }, [titleBar, props]);
      return null;
    }
    exports.default = TitleBar;
    function updateSecondaryActions(titleBar, secondaryActions) {
      var _a, _b;
      var secondaryButtons = ((_b = (_a = titleBar.options.buttons) === null || _a === void 0 ? void 0 : _a.secondary) === null || _b === void 0 ? void 0 : _b.filter(function(button) {
        return !ButtonGroup_1.isGroupedButton(button);
      })) || [];
      secondaryButtons === null || secondaryButtons === void 0 ? void 0 : secondaryButtons.forEach(function(secondaryButton, index) {
        return updateButton(
          secondaryActions === null || secondaryActions === void 0 ? void 0 : secondaryActions[index],
          // This needs to be casted as the React TitleBar component doesn't accept button groups for secondary actions
          secondaryButton
        );
      });
    }
    function updateActionGroups(titleBar, actionGroups) {
      var _a, _b;
      var actionGroupButtons = ((_b = (_a = titleBar.options.buttons) === null || _a === void 0 ? void 0 : _a.secondary) === null || _b === void 0 ? void 0 : _b.filter(ButtonGroup_1.isGroupedButton)) || [];
      actionGroupButtons === null || actionGroupButtons === void 0 ? void 0 : actionGroupButtons.forEach(function(actionBroupButton, index) {
        var actionGroup = actionGroups === null || actionGroups === void 0 ? void 0 : actionGroups[index];
        if (!actionGroup) {
          return;
        }
        actionBroupButton.options.buttons.forEach(function(nestedButton, nestedIndex) {
          return updateButton(actionGroup.actions[nestedIndex], nestedButton);
        });
      });
    }
    function transformProps(app, _a) {
      var actionGroups = _a.actionGroups, breadcrumbs = _a.breadcrumbs, primaryAction = _a.primaryAction, secondaryActions = _a.secondaryActions, title = _a.title;
      var breadcrumb = Array.isArray(breadcrumbs) ? breadcrumbs[breadcrumbs.length - 1] : breadcrumbs;
      return {
        title,
        buttons: transformers_1.transformActions(app, {
          primaryAction,
          secondaryActions,
          actionGroups
        }),
        breadcrumbs: breadcrumb ? transformBreadcrumb(app, breadcrumb) : void 0
      };
    }
    function transformBreadcrumb(app, breadcrumb, updateBreadcrumb) {
      var button = updateBreadcrumb || Button_1.create(app, {
        label: breadcrumb.content || ""
      });
      updateButton(breadcrumb, button);
      return button;
    }
    function updateButton(actionProps, button) {
      if (!actionProps || !button) {
        return;
      }
      var redirect = transformers_1.generateRedirect(button.app, actionProps.url, actionProps.target, actionProps.external);
      if (redirect) {
        button.subscribe(Button_1.Action.CLICK, redirect, button);
      }
      if (actionProps === null || actionProps === void 0 ? void 0 : actionProps.onAction) {
        button.subscribe(Button_1.Action.CLICK, actionProps.onAction, button);
      }
    }
  }
});

// node_modules/@shopify/app-bridge-react/components/TitleBar/index.js
var require_TitleBar4 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/TitleBar/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var TitleBar_1 = __importDefault(require_TitleBar3());
    exports.default = TitleBar_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/components/Toast/Toast.js
var require_Toast3 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Toast/Toast.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_TOAST_DURATION = void 0;
    var react_1 = __importDefault(require_react());
    var actions_1 = require_actions5();
    var context_1 = require_context();
    exports.DEFAULT_TOAST_DURATION = 5e3;
    var Toast = (
      /** @class */
      function(_super) {
        __extends(Toast2, _super);
        function Toast2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Toast2.prototype.componentDidMount = function() {
          var app = this.context;
          var _a = this.props, error = _a.error, content = _a.content, _b = _a.duration, duration = _b === void 0 ? exports.DEFAULT_TOAST_DURATION : _b, onDismiss = _a.onDismiss, action = _a.action;
          this.toast = actions_1.Toast.create(app, {
            message: content,
            duration,
            isError: error,
            action: (action === null || action === void 0 ? void 0 : action.content) ? {
              content: action === null || action === void 0 ? void 0 : action.content
            } : void 0
          });
          if (action === null || action === void 0 ? void 0 : action.onAction) {
            this.toast.subscribe(actions_1.Toast.Action.ACTION, action === null || action === void 0 ? void 0 : action.onAction);
          }
          this.toast.subscribe(actions_1.Toast.Action.CLEAR, onDismiss);
          this.toast.dispatch(actions_1.Toast.Action.SHOW);
        };
        Toast2.prototype.componentWillUnmount = function() {
          this.toast.unsubscribe();
        };
        Toast2.prototype.render = function() {
          return null;
        };
        Toast2.contextType = context_1.AppBridgeContext;
        return Toast2;
      }(react_1.default.PureComponent)
    );
    exports.default = Toast;
  }
});

// node_modules/@shopify/app-bridge-react/components/Toast/index.js
var require_Toast4 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/Toast/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Toast_1 = __importDefault(require_Toast3());
    exports.default = Toast_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/components/unstable_Picker/unstable_Picker.js
var require_unstable_Picker = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/unstable_Picker/unstable_Picker.js"(exports) {
    "use strict";
    var __rest = exports && exports.__rest || function(s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    var Picker_1 = require_Picker2();
    var useAppBridge_1 = require_useAppBridge();
    function Picker(_a) {
      var open = _a.open, onCancel = _a.onCancel, onSelect = _a.onSelect, onSearch = _a.onSearch, onLoadMore = _a.onLoadMore, options = __rest(_a, ["open", "onCancel", "onSelect", "onSearch", "onLoadMore"]);
      var app = useAppBridge_1.useAppBridge();
      var isUnmountedRef = react_1.useRef(false);
      react_1.useEffect(function() {
        return function() {
          isUnmountedRef.current = true;
        };
      }, []);
      var openRef = react_1.useRef(false);
      var optionsRef = react_1.useRef(options);
      var picker = react_1.useMemo(function() {
        return Picker_1.create(app, optionsRef.current);
      }, [app]);
      react_1.useEffect(function() {
        openRef.current = false;
        return function() {
          if (openRef.current && isUnmountedRef.current) {
            picker.dispatch(Picker_1.Action.CANCEL);
          }
        };
      }, [picker]);
      react_1.useEffect(function() {
        if (open === openRef.current)
          return;
        openRef.current = open;
        if (open) {
          picker.dispatch(Picker_1.Action.OPEN);
        } else {
          picker.dispatch(Picker_1.Action.CANCEL);
        }
      }, [picker, open]);
      react_1.useEffect(function() {
        if (!onSelect)
          return;
        return picker.subscribe(Picker_1.Action.SELECT, function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          openRef.current = false;
          return onSelect.apply(void 0, args);
        });
      }, [picker, onSelect]);
      react_1.useEffect(function() {
        if (!onCancel)
          return;
        return picker.subscribe(Picker_1.Action.CANCEL, function() {
          openRef.current = false;
          return onCancel();
        });
      }, [picker, onCancel]);
      react_1.useEffect(function() {
        if (!onSearch)
          return;
        return picker.subscribe(Picker_1.Action.SEARCH, onSearch);
      }, [picker, onSearch]);
      react_1.useEffect(function() {
        if (!onLoadMore)
          return;
        return picker.subscribe(Picker_1.Action.LOAD_MORE, onLoadMore);
      }, [picker, onLoadMore]);
      react_1.useEffect(function() {
        var shouldUpdate = JSON.stringify(options) !== JSON.stringify(optionsRef.current);
        if (!shouldUpdate)
          return;
        optionsRef.current = options;
        picker.set(options, openRef.current);
      }, [picker, options]);
      return null;
    }
    exports.default = Picker;
  }
});

// node_modules/@shopify/app-bridge-react/components/unstable_Picker/index.js
var require_unstable_Picker2 = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/unstable_Picker/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var unstable_Picker_1 = __importDefault(require_unstable_Picker());
    exports.default = unstable_Picker_1.default;
  }
});

// node_modules/@shopify/app-bridge-react/components/index.js
var require_components = __commonJS({
  "node_modules/@shopify/app-bridge-react/components/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unstable_Picker = exports.Toast = exports.TitleBar = exports.ResourcePicker = exports.Provider = exports.NavigationMenu = exports.ModalContent = exports.Modal = exports.Loading = exports.ContextualSaveBar = void 0;
    var ContextualSaveBar_1 = require_ContextualSaveBar4();
    Object.defineProperty(exports, "ContextualSaveBar", { enumerable: true, get: function() {
      return __importDefault(ContextualSaveBar_1).default;
    } });
    var Loading_1 = require_Loading4();
    Object.defineProperty(exports, "Loading", { enumerable: true, get: function() {
      return __importDefault(Loading_1).default;
    } });
    var Modal_1 = require_Modal4();
    Object.defineProperty(exports, "Modal", { enumerable: true, get: function() {
      return __importDefault(Modal_1).default;
    } });
    Object.defineProperty(exports, "ModalContent", { enumerable: true, get: function() {
      return Modal_1.ModalContent;
    } });
    var NavigationMenu_1 = require_NavigationMenu4();
    Object.defineProperty(exports, "NavigationMenu", { enumerable: true, get: function() {
      return __importDefault(NavigationMenu_1).default;
    } });
    var Provider_1 = require_Provider2();
    Object.defineProperty(exports, "Provider", { enumerable: true, get: function() {
      return __importDefault(Provider_1).default;
    } });
    var ResourcePicker_1 = require_ResourcePicker4();
    Object.defineProperty(exports, "ResourcePicker", { enumerable: true, get: function() {
      return __importDefault(ResourcePicker_1).default;
    } });
    var TitleBar_1 = require_TitleBar4();
    Object.defineProperty(exports, "TitleBar", { enumerable: true, get: function() {
      return __importDefault(TitleBar_1).default;
    } });
    var Toast_1 = require_Toast4();
    Object.defineProperty(exports, "Toast", { enumerable: true, get: function() {
      return __importDefault(Toast_1).default;
    } });
    var unstable_Picker_1 = require_unstable_Picker2();
    Object.defineProperty(exports, "unstable_Picker", { enumerable: true, get: function() {
      return __importDefault(unstable_Picker_1).default;
    } });
    __exportStar(require_RoutePropagator2(), exports);
    __exportStar(require_ClientRouter2(), exports);
  }
});

// node_modules/@shopify/app-bridge-react/index.js
var require_app_bridge_react = __commonJS({
  "node_modules/@shopify/app-bridge-react/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAppBridge = exports.Context = void 0;
    var context_1 = require_context();
    Object.defineProperty(exports, "Context", { enumerable: true, get: function() {
      return context_1.AppBridgeContext;
    } });
    var useAppBridge_1 = require_useAppBridge();
    Object.defineProperty(exports, "useAppBridge", { enumerable: true, get: function() {
      return useAppBridge_1.useAppBridge;
    } });
    __exportStar(require_components(), exports);
    __exportStar(require_hooks(), exports);
  }
});

// node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "node_modules/lodash/lodash.js"(exports, module) {
    (function() {
      var undefined2;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        // Latin Extended-A block.
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined2 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined2 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined2 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        lodash.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined2;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined2 : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined2 : get(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined2 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined2 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get(object, path);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined2;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined2;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined2,
                args,
                holders,
                undefined2,
                undefined2,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined2;
            }
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop3 : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined2 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop3 : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize3(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined2 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined2 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize3(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize3.Cache || MapCache)();
          return memoized;
        }
        memoize3.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined2 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite2(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString2(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString2(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path);
          return result2 === undefined2 ? defaultValue : result2;
        }
        function has(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index < length) {
            var value = object == null ? undefined2 : object[toKey(path[index])];
            if (value === undefined2) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad2(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined2;
          }
          string = toString(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined2, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop3() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined2 : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize3;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite2;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN2;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString2;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop3;
        lodash.now = now;
        lodash.pad = pad2;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      };
      var _ = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _;
        define(function() {
          return _;
        });
      } else if (freeModule) {
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
      } else {
        root._ = _;
      }
    }).call(exports);
  }
});

// .yalc/@shopify/discount-app-components/build/esm/constants.js
var Weekday = /* @__PURE__ */ function(Weekday4) {
  Weekday4[Weekday4["Sunday"] = 0] = "Sunday";
  Weekday4[Weekday4["Monday"] = 1] = "Monday";
  Weekday4[Weekday4["Tuesday"] = 2] = "Tuesday";
  Weekday4[Weekday4["Wednesday"] = 3] = "Wednesday";
  Weekday4[Weekday4["Thursday"] = 4] = "Thursday";
  Weekday4[Weekday4["Friday"] = 5] = "Friday";
  Weekday4[Weekday4["Saturday"] = 6] = "Saturday";
  return Weekday4;
}({});
var DEFAULT_WEEK_START_DAY = Weekday.Sunday;
var DiscountMethod = /* @__PURE__ */ function(DiscountMethod2) {
  DiscountMethod2["Code"] = "Code";
  DiscountMethod2["Automatic"] = "Automatic";
  return DiscountMethod2;
}({});
var DiscountClass = /* @__PURE__ */ function(DiscountClass2) {
  DiscountClass2["Product"] = "PRODUCT";
  DiscountClass2["Order"] = "ORDER";
  DiscountClass2["Shipping"] = "SHIPPING";
  return DiscountClass2;
}({});
var DEFAULT_DISCOUNT_CODE_LENGTH = 12;
var RecurringPaymentType = /* @__PURE__ */ function(RecurringPaymentType2) {
  RecurringPaymentType2["FirstPayment"] = "FIRST_PAYMENT";
  RecurringPaymentType2["MultiplePayments"] = "MULTIPLE_PAYMENTS";
  RecurringPaymentType2["AllPayments"] = "ALL_PAYMENTS";
  return RecurringPaymentType2;
}({});
var RequirementType = /* @__PURE__ */ function(RequirementType2) {
  RequirementType2["None"] = "NONE";
  RequirementType2["Subtotal"] = "SUBTOTAL";
  RequirementType2["Quantity"] = "QUANTITY";
  return RequirementType2;
}({});
var CountrySelectionType = /* @__PURE__ */ function(CountrySelectionType2) {
  CountrySelectionType2["AllCountries"] = "ALL_COUNTRIES";
  CountrySelectionType2["SelectedCountries"] = "SELECTED_COUNTRIES";
  return CountrySelectionType2;
}({});
var DiscountStatus = /* @__PURE__ */ function(DiscountStatus2) {
  DiscountStatus2["Active"] = "ACTIVE";
  DiscountStatus2["Expired"] = "EXPIRED";
  DiscountStatus2["Scheduled"] = "SCHEDULED";
  return DiscountStatus2;
}({});
var PurchaseType = /* @__PURE__ */ function(PurchaseType2) {
  PurchaseType2["OneTimePurchase"] = "ONE_TIME_PURCHASE";
  PurchaseType2["Subscription"] = "SUBSCRIPTION";
  PurchaseType2["Both"] = "BOTH";
  return PurchaseType2;
}({});
var Eligibility = /* @__PURE__ */ function(Eligibility2) {
  Eligibility2["Everyone"] = "EVERYONE";
  Eligibility2["Customers"] = "CUSTOMERS";
  Eligibility2["CustomerSegments"] = "CUSTOMER_SEGMENTS";
  return Eligibility2;
}({});

// .yalc/@shopify/discount-app-components/build/esm/utilities/navigation.js
var import_actions = __toESM(require_actions5());
function onBreadcrumbAction(redirect, isAdmin, fallbackPath) {
  if (isAdmin) {
    handleRedirect({
      redirect,
      url: "/discounts",
      action: import_actions.Redirect.Action.ADMIN_PATH
    });
  } else {
    handleRedirect({
      redirect,
      url: fallbackPath || "/",
      action: import_actions.Redirect.Action.APP
    });
  }
}
function handleRedirect({
  redirect,
  ...props
}) {
  switch (props.action) {
    case import_actions.Redirect.Action.ADMIN_PATH:
      redirect.dispatch(import_actions.Redirect.Action.ADMIN_PATH, {
        path: props.url,
        newContext: Boolean(props.newContext)
      });
      break;
    case import_actions.Redirect.Action.APP:
      redirect.dispatch(import_actions.Redirect.Action.APP, props.url);
      break;
    case import_actions.Redirect.Action.REMOTE:
      redirect.dispatch(import_actions.Redirect.Action.REMOTE, {
        url: props.url,
        newContext: Boolean(props.newContext)
      });
      break;
    case import_actions.Redirect.Action.ADMIN_SECTION:
      redirect.dispatch(import_actions.Redirect.Action.ADMIN_SECTION, props.payload);
      break;
    default:
      throw new Error("Unsupported redirect action. Please refer to https://shopify.dev/apps/tools/app-bridge/actions/navigation/redirect for usage.");
  }
}

// .yalc/@shopify/discount-app-components/build/esm/components/ActiveDatesCard/ActiveDatesCard.js
var import_react7 = __toESM(require_react());

// node_modules/@shopify/function-enhancers/build/esm/memoize.mjs
var MAX_MAP_ENTRIES = 50;
function memoize(method, resolver) {
  const weakMapCache = /* @__PURE__ */ new WeakMap();
  const mapCache = /* @__PURE__ */ new Map();
  const mapKeys = [];
  return function memoized(...args) {
    if (typeof window === "undefined") {
      return method.apply(this, args);
    }
    const useWeakMap = args.length === 1 && typeof args[0] === "object" && !resolver;
    let key;
    if (useWeakMap) {
      key = args[0];
    } else if (resolver && resolver instanceof Function) {
      key = resolver(...args);
    } else {
      key = args[0];
    }
    const cache = useWeakMap ? weakMapCache : mapCache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = method.apply(this, args);
    if (useWeakMap) {
      weakMapCache.set(key, result);
    } else {
      mapCache.set(key, result);
      mapKeys.push(key);
      if (mapCache.size > MAX_MAP_ENTRIES) {
        const oldestKey = mapKeys[0];
        mapCache.delete(oldestKey);
        mapKeys.shift();
      }
    }
    return result;
  };
}

// node_modules/@shopify/dates/build/esm/sanitise-date-string.mjs
function sanitiseDateString(string) {
  return string.replace(String.fromCharCode(8206), "");
}

// node_modules/@shopify/dates/build/esm/utilities/formatDate.mjs
var intl = /* @__PURE__ */ new Map();
function memoizedGetDateTimeFormat(locales, options) {
  const key = dateTimeFormatCacheKey(locales, options);
  if (intl.has(key)) {
    return intl.get(key);
  }
  const i = new Intl.DateTimeFormat(locales, options);
  intl.set(key, i);
  return i;
}
var browserFeatureDetectionDate = Intl.DateTimeFormat("en", {
  hour: "numeric"
});
var resolvedOptions = typeof browserFeatureDetectionDate.resolvedOptions === "undefined" ? void 0 : browserFeatureDetectionDate.resolvedOptions();
function formatDate(date, locales, options = {}) {
  const hourCycleRequired = resolvedOptions != null && options.hour12 === false && resolvedOptions.hourCycle != null;
  if (hourCycleRequired) {
    options.hour12 = void 0;
    options.hourCycle = "h23";
  }
  if (options.timeZone != null && options.timeZone === "Etc/GMT+12") {
    const adjustedDate = new Date(date.valueOf() - 12 * 60 * 60 * 1e3);
    return memoizedGetDateTimeFormat(locales, {
      ...options,
      timeZone: "UTC"
    }).format(adjustedDate);
  }
  return memoizedGetDateTimeFormat(locales, options).format(date);
}
function dateTimeFormatCacheKey(locales, options = {}) {
  const localeKey = Array.isArray(locales) ? locales.sort().join("-") : locales;
  return `${localeKey}-${JSON.stringify(options)}`;
}

// node_modules/@shopify/dates/build/esm/get-date-time-parts.mjs
var TWO_DIGIT_REGEX = /(\d{2})/;
function getDateTimeParts(date, timeZone) {
  return {
    year: () => DateTimeParts.getYear(date, timeZone),
    month: () => DateTimeParts.getMonth(date, timeZone),
    day: () => DateTimeParts.getDay(date, timeZone),
    weekday: () => DateTimeParts.getWeekday(date, timeZone),
    hour: () => DateTimeParts.getHour(date, timeZone),
    minute: () => DateTimeParts.getMinute(date, timeZone),
    second: () => DateTimeParts.getSecond(date, timeZone)
  };
}
function dateTimeCacheKey(unit) {
  return (date, timeZone) => `${unit}-${date.toString()}-${timeZone}`;
}
var Weekday2;
(function(Weekday4) {
  Weekday4["Monday"] = "Monday";
  Weekday4["Tuesday"] = "Tuesday";
  Weekday4["Wednesday"] = "Wednesday";
  Weekday4["Thursday"] = "Thursday";
  Weekday4["Friday"] = "Friday";
  Weekday4["Saturday"] = "Saturday";
  Weekday4["Sunday"] = "Sunday";
})(Weekday2 || (Weekday2 = {}));
var weekdays = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6
};
function isWeekday(weekday2) {
  return Object.keys(weekdays).some((key) => key === weekday2);
}
function assertNever(message) {
  throw new Error(message);
}
function getWeekdayValue(weekday2) {
  if (!isWeekday(weekday2)) {
    return assertNever(`Unexpected weekday: ${weekday2}`);
  }
  return weekdays[weekday2];
}
var DateTimeParts = class {
};
DateTimeParts.getYear = memoize((date, timeZone) => {
  if (isNaN(date.valueOf())) {
    throw new Error(`Unable to parse date: ${date} for timezone: ${timeZone}`);
  }
  const yearString = formatDate(date, "en", {
    timeZone,
    year: "numeric"
  });
  const sanitisedYearString = sanitiseDateString(yearString);
  const year2 = parseInt(sanitisedYearString, 10);
  if (isNaN(year2)) {
    throw new Error(`Unable to parse year: '${yearString}'`);
  }
  return year2;
}, dateTimeCacheKey("year"));
DateTimeParts.getMonth = memoize((date, timeZone) => {
  const monthString = formatDate(date, "en", {
    timeZone,
    month: "numeric"
  });
  const sanitisedMonthString = sanitiseDateString(monthString);
  const month = parseInt(sanitisedMonthString, 10);
  if (isNaN(month)) {
    throw new Error(`Unable to parse month: '${monthString}'`);
  }
  return month;
}, dateTimeCacheKey("month"));
DateTimeParts.getDay = memoize((date, timeZone) => {
  const dayString = formatDate(date, "en", {
    timeZone,
    day: "numeric"
  });
  const sanitisedDayString = sanitiseDateString(dayString);
  const day2 = parseInt(sanitisedDayString, 10);
  if (isNaN(day2)) {
    throw new Error(`Unable to parse day: '${dayString}'`);
  }
  return day2;
}, dateTimeCacheKey("day"));
DateTimeParts.getWeekday = memoize((date, timeZone) => {
  const weekdayString = formatDate(date, "en", {
    timeZone,
    weekday: "long"
  });
  const sanitisedWeekdayString = sanitiseDateString(weekdayString);
  return getWeekdayValue(sanitisedWeekdayString);
}, dateTimeCacheKey("weekday"));
DateTimeParts.getHour = memoize((date, timeZone) => {
  const hourString = formatDate(date, "en", {
    timeZone,
    hour12: false,
    hour: "numeric"
  });
  let hour = parseInt(hourString, 10);
  if (isNaN(hour)) {
    hour = DateTimeParts.getTimePartsFallback(date, timeZone).hour;
  }
  return hour;
}, dateTimeCacheKey("hour"));
DateTimeParts.getMinute = memoize((date, timeZone) => {
  const minuteString = formatDate(date, "en", {
    timeZone,
    minute: "numeric"
  });
  let minute = parseInt(minuteString, 10);
  if (isNaN(minute)) {
    minute = DateTimeParts.getTimePartsFallback(date, timeZone).minute;
  }
  return minute;
}, dateTimeCacheKey("minute"));
DateTimeParts.getSecond = memoize((date, timeZone) => {
  const secondString = formatDate(date, "en", {
    timeZone,
    second: "numeric"
  });
  let second = parseInt(secondString, 10);
  if (isNaN(second)) {
    second = DateTimeParts.getTimePartsFallback(date, timeZone).second;
  }
  return second;
}, dateTimeCacheKey("second"));
DateTimeParts.getTimePartsFallback = memoize((date, timeZone) => {
  const timeString = formatDate(date, "en", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  const [dirtyHour, dirtyMinute, dirtySecond] = timeString.split(":");
  const rawHour = new RegExp(TWO_DIGIT_REGEX).exec(dirtyHour);
  const rawMinute = new RegExp(TWO_DIGIT_REGEX).exec(dirtyMinute);
  const rawSecond = new RegExp(TWO_DIGIT_REGEX).exec(dirtySecond);
  if (rawHour != null && rawMinute != null && rawSecond != null) {
    const hour = parseInt(rawHour[1], 10);
    const minute = parseInt(rawMinute[1], 10);
    const second = parseInt(rawSecond[1], 10);
    return {
      hour,
      minute,
      second
    };
  }
  throw new Error(`Unable to parse timeString: '${timeString}'`);
}, dateTimeCacheKey("timePartsFallback"));

// node_modules/@shopify/dates/build/esm/get-time-zone-offset.mjs
function getTimeZoneOffset(date = /* @__PURE__ */ new Date(), timeZone1, timeZone2) {
  const date1 = constructZonedDateFromParts(date, timeZone1);
  const date2 = constructZonedDateFromParts(date, timeZone2);
  return (date1.valueOf() - date2.valueOf()) / (1e3 * 60);
}
function constructZonedDateFromParts(date, timeZone) {
  const {
    year: year2,
    month,
    day: day2,
    hour,
    minute,
    second
  } = getDateTimeParts(date, timeZone);
  return new Date(Date.UTC(year2(), month() - 1, day2(), hour(), minute(), second()));
}

// node_modules/@shopify/dates/build/esm/apply-time-zone-offset.mjs
function applyTimeZoneOffset(date, timeZone1, timeZone2) {
  const initialOffset = getTimeZoneOffset(date, timeZone1, timeZone2);
  const adjustedDate = new Date(date.valueOf() - initialOffset * 60 * 1e3);
  const targetOffset = getTimeZoneOffset(adjustedDate, timeZone1, timeZone2);
  const offsetDiff = targetOffset - initialOffset;
  return new Date(adjustedDate.valueOf() - offsetDiff * 60 * 1e3);
}

// node_modules/@shopify/dates/build/esm/constants/index.mjs
var TimeUnit;
(function(TimeUnit2) {
  TimeUnit2[TimeUnit2["Second"] = 1e3] = "Second";
  TimeUnit2[TimeUnit2["Minute"] = 6e4] = "Minute";
  TimeUnit2[TimeUnit2["Hour"] = 36e5] = "Hour";
  TimeUnit2[TimeUnit2["Day"] = 864e5] = "Day";
  TimeUnit2[TimeUnit2["Week"] = 6048e5] = "Week";
  TimeUnit2[TimeUnit2["Year"] = 31536e6] = "Year";
})(TimeUnit || (TimeUnit = {}));

// node_modules/@shopify/dates/build/esm/is-future-date.mjs
function isFutureDate(date, now = /* @__PURE__ */ new Date()) {
  return now < date;
}

// node_modules/@shopify/dates/build/esm/is-less-than-one-hour-ago.mjs
function isLessThanOneHourAgo(date, now = /* @__PURE__ */ new Date()) {
  return !isFutureDate(date, now) && now.getTime() - date.getTime() < TimeUnit.Hour;
}

// node_modules/@shopify/dates/build/esm/is-less-than-one-minute-ago.mjs
function isLessThanOneMinuteAgo(date, now = /* @__PURE__ */ new Date()) {
  return !isFutureDate(date, now) && now.getTime() - date.getTime() < TimeUnit.Minute;
}

// node_modules/@shopify/dates/build/esm/is-less-than-one-week-ago.mjs
function isLessThanOneWeekAgo(date, now = /* @__PURE__ */ new Date()) {
  return !isFutureDate(date, now) && now.getTime() - date.getTime() < TimeUnit.Week;
}

// node_modules/@shopify/dates/build/esm/is-less-than-one-week-away.mjs
function isLessThanOneWeekAway(date, now = /* @__PURE__ */ new Date()) {
  return isFutureDate(date, now) && date.getTime() - now.getTime() < TimeUnit.Week;
}

// node_modules/@shopify/dates/build/esm/is-less-than-one-year-ago.mjs
function isLessThanOneYearAgo(date, now = /* @__PURE__ */ new Date()) {
  return !isFutureDate(date, now) && now.getTime() - date.getTime() < TimeUnit.Year;
}

// node_modules/@shopify/dates/build/esm/is-less-than-one-year-away.mjs
function isLessThanOneYearAway(date, now = /* @__PURE__ */ new Date()) {
  return isFutureDate(date, now) && date.getTime() - now.getTime() < TimeUnit.Year;
}

// node_modules/@shopify/dates/build/esm/is-same-year.mjs
function isSameYear(date1, date2, timeZone) {
  const {
    year: year1
  } = getDateTimeParts(date1, timeZone);
  const {
    year: year2
  } = getDateTimeParts(date2, timeZone);
  return year1() === year2();
}

// node_modules/@shopify/dates/build/esm/is-same-month.mjs
function isSameMonth(date1, date2, timeZone) {
  const {
    month: month1
  } = getDateTimeParts(date1, timeZone);
  const {
    month: month2
  } = getDateTimeParts(date2, timeZone);
  return isSameYear(date1, date2, timeZone) && month1() === month2();
}

// node_modules/@shopify/dates/build/esm/is-same-day.mjs
function isSameDay(date1, date2, timeZone) {
  const {
    day: day1
  } = getDateTimeParts(date1, timeZone);
  const {
    day: day2
  } = getDateTimeParts(date2, timeZone);
  return isSameMonth(date1, date2, timeZone) && day1() === day2();
}

// node_modules/@shopify/dates/build/esm/is-today.mjs
function isToday(date, timeZone) {
  return isSameDay(date, /* @__PURE__ */ new Date(), timeZone);
}

// node_modules/@shopify/dates/build/esm/is-yesterday.mjs
function isYesterday(date, timeZone) {
  const now = /* @__PURE__ */ new Date();
  const yesterday = new Date(now.valueOf() - 24 * 60 * 60 * 1e3);
  return isSameDay(date, yesterday, timeZone);
}

// node_modules/@shopify/dates/build/esm/is-tomorrow.mjs
function isTomorrow(date, timeZone) {
  const now = /* @__PURE__ */ new Date();
  const tomorrow = new Date(now.valueOf() + 24 * 60 * 60 * 1e3);
  return isSameDay(date, tomorrow, timeZone);
}

// node_modules/@shopify/dates/build/esm/utilities/timezone.mjs
function getIanaTimeZone(locale2, options) {
  return memoizedGetDateTimeFormat(locale2, options).resolvedOptions().timeZone;
}

// node_modules/@shopify/react-i18n/build/esm/context.mjs
var import_react = __toESM(require_react(), 1);
var I18nContext = /* @__PURE__ */ import_react.default.createContext(null);
var I18nIdsContext = /* @__PURE__ */ import_react.default.createContext([]);
var I18nParentContext = /* @__PURE__ */ import_react.default.createContext(null);

// node_modules/@shopify/react-i18n/build/esm/manager.mjs
var I18nManager = class {
  get loading() {
    return this.translationPromises.size > 0;
  }
  constructor(details, initialTranslations = {}) {
    this.translationGetters = /* @__PURE__ */ new Map();
    this.fallbacks = /* @__PURE__ */ new Map();
    this.translations = /* @__PURE__ */ new Map();
    this.asyncTranslationIds = /* @__PURE__ */ new Set();
    this.subscriptions = /* @__PURE__ */ new Map();
    this.translationPromises = /* @__PURE__ */ new Map();
    this.idsToUpdate = /* @__PURE__ */ new Set();
    this.details = details;
    for (const [id, translation] of Object.entries(initialTranslations)) {
      this.translations.set(id, translation);
      this.asyncTranslationIds.add(id);
    }
  }
  async resolve() {
    await Promise.all([...this.translationPromises.values()]);
  }
  extract() {
    return [...this.asyncTranslationIds].reduce((extracted, id) => ({
      ...extracted,
      [id]: this.translations.get(id)
    }), {});
  }
  register({
    id,
    translations,
    fallback
  }) {
    if (!this.fallbacks.has(id)) {
      this.fallbacks.set(id, fallback);
    }
    if (this.details.fallbackLocale != null && fallback != null) {
      const translationId = getTranslationId(id, this.details.fallbackLocale);
      if (!this.translations.has(translationId)) {
        this.translations.set(translationId, fallback);
      }
    }
    if (this.translationGetters.has(id)) {
      return;
    }
    const translationGetter = translations ? normalizeTranslationGetter(translations) : noop;
    this.setTranslations(id, translationGetter);
  }
  state(ids) {
    const {
      locale: locale2,
      fallbackLocale
    } = this.details;
    const possibleLocales = getPossibleLocales(locale2);
    const omitFallbacks = fallbackLocale != null && possibleLocales.includes(fallbackLocale);
    let loading = false;
    let hasUnresolvedTranslations = false;
    const translations = ids.reduce((otherTranslations, id) => {
      const translationsForId = [];
      for (const locale3 of possibleLocales) {
        const translationId = getTranslationId(id, locale3);
        const translation = this.translations.get(translationId);
        if (translation == null) {
          if (this.translationPromises.has(translationId)) {
            hasUnresolvedTranslations = true;
          }
        } else {
          translationsForId.push(translation);
        }
      }
      if (translationsForId.length === 0 && hasUnresolvedTranslations) {
        loading = true;
      }
      if (!omitFallbacks) {
        const fallback = this.fallbacks.get(id);
        if (fallback != null) {
          translationsForId.push(fallback);
        }
      }
      return [...otherTranslations, ...translationsForId];
    }, []);
    return {
      loading,
      translations
    };
  }
  subscribe(ids, subscriber) {
    this.subscriptions.set(subscriber, ids);
    return () => {
      this.subscriptions.delete(subscriber);
    };
  }
  update(details) {
    this.details = details;
    for (const [id, translationGetter] of this.translationGetters) {
      this.setTranslations(id, translationGetter);
    }
    for (const [subscriber, ids] of this.subscriptions) {
      subscriber(this.state(ids), this.details);
    }
  }
  setTranslations(id, translationGetter) {
    this.translationGetters.set(id, translationGetter);
    for (const locale2 of getPossibleLocales(this.details.locale)) {
      const translationId = getTranslationId(id, locale2);
      if (this.translations.has(translationId)) {
        continue;
      }
      const translations = translationGetter(locale2);
      if (isPromise(translations)) {
        const promise = translations.then((result) => {
          this.translationPromises.delete(translationId);
          this.translations.set(translationId, result);
          this.asyncTranslationIds.add(translationId);
          if (result != null) {
            this.updateSubscribersForId(id);
          }
        }).catch(() => {
          this.translationPromises.delete(translationId);
          this.translations.set(translationId, void 0);
          this.asyncTranslationIds.add(translationId);
        });
        this.translationPromises.set(translationId, promise);
      } else {
        this.translations.set(translationId, translations);
      }
    }
  }
  updateSubscribersForId(id) {
    this.idsToUpdate.add(id);
    if (this.enqueuedUpdate != null) {
      return;
    }
    const isBrowser = typeof window !== "undefined";
    const enqueue = isBrowser ? window.requestAnimationFrame : setImmediate;
    this.enqueuedUpdate = enqueue(() => {
      delete this.enqueuedUpdate;
      const idsToUpdate = [...this.idsToUpdate];
      this.idsToUpdate.clear();
      for (const [subscriber, ids] of this.subscriptions) {
        if (ids.some((id2) => idsToUpdate.includes(id2))) {
          subscriber(this.state(ids), this.details);
        }
      }
    });
  }
};
function getPossibleLocales(locale2) {
  const split = locale2.split("-");
  return split.length > 1 ? [`${split[0]}-${split[1].toUpperCase()}`, split[0]] : [locale2];
}
function isPromise(maybePromise) {
  return maybePromise != null && maybePromise.then != null;
}
function getTranslationId(id, locale2) {
  return `${id}__${locale2}`;
}
function noop() {
  return void 0;
}
function normalizeTranslationGetter(translations) {
  return typeof translations === "function" ? translations : (locale2) => translations[locale2];
}

// node_modules/@shopify/i18n/build/esm/locale.mjs
function regionFromLocale(locale2) {
  const code = locale2.split("-")[1];
  return code && code.toUpperCase();
}
function languageFromLocale(locale2) {
  return locale2.split("-")[0].toLowerCase();
}

// node_modules/@shopify/i18n/build/esm/pseudotranslate.mjs
var LETTERS = /* @__PURE__ */ new Map([["a", "\u03B1"], ["b", "\u1E05"], ["c", "\u037C"], ["d", "\u1E0D"], ["e", "\u1E1B"], ["f", "\u03DD"], ["g", "\u1E21"], ["h", "\u1E25"], ["i", "\u1E2D"], ["j", "\u0135"], ["k", "\u1E33"], ["l", "\u1E3D"], ["m", "\u1E43"], ["n", "\u1E47"], ["o", "\u1E53"], ["p", "\u1E57"], ["q", "\u02A0"], ["r", "\u1E5B"], ["s", "\u1E61"], ["t", "\u1E6D"], ["u", "\u1E75"], ["v", "\u1E7D"], ["w", "\u1E81"], ["x", "\u1E8B"], ["y", "\u1E8F"], ["z", "\u1E93"], ["A", "\u1E00"], ["B", "\u1E02"], ["C", "\u1E08"], ["D", "\u1E0C"], ["E", "\u1E1A"], ["F", "\u1E1E"], ["G", "\u1E20"], ["H", "\u1E24"], ["I", "\u1E2C"], ["J", "\u0134"], ["K", "\u1E30"], ["L", "\u1E3A"], ["M", "\u1E40"], ["N", "\u1E44"], ["O", "\u1E4E"], ["P", "\u1E54"], ["Q", "\u01EA"], ["R", "\u1E5A"], ["S", "\u1E62"], ["T", "\u1E6A"], ["U", "\u1E72"], ["V", "\u1E7E"], ["W", "\u0174"], ["X", "\u1E8A"], ["Y", "\u0176"], ["Z", "\u017B"]]);
var DEFAULT_RATIO = 1.15;
var LOCALE_RATIOS = /* @__PURE__ */ new Map([["zh", 0.5], ["ja", 0.5], ["ko", 0.8], ["fr", 1.3], ["it", 1.3], ["de", 1.5], ["nl", 1.5]]);
function sizeRatio({
  to: locale2
}) {
  if (locale2 == null) {
    return DEFAULT_RATIO;
  }
  return LOCALE_RATIOS.get(locale2) || LOCALE_RATIOS.get(languageFromLocale(locale2)) || DEFAULT_RATIO;
}
function pseudotranslate(string, {
  delimiter,
  startDelimiter = delimiter,
  endDelimiter = delimiter,
  prepend,
  append,
  toLocale
} = {}) {
  const parts = createParts(string, {
    startDelimiter,
    endDelimiter
  });
  const adjustableCharacters = parts.reduce((sum, part) => typeof part === "string" ? sum + countAdjustableCharacters(part) : sum, 0);
  const charactersToAdjust = Math.ceil(adjustableCharacters * sizeRatio({
    to: toLocale
  })) - adjustableCharacters;
  const adjustEvery = adjustableCharacters / Math.abs(charactersToAdjust);
  let adjustAt = adjustEvery;
  let adjustableCharacterIndex = -1;
  const pseudotranslated = parts.reduce((pseudotranslated2, part) => {
    const pseudotranslatedPart = typeof part === "string" ? [...part].map((character) => {
      const isAdjustable = isAdjustableCharacter(character);
      if (isAdjustable) {
        adjustableCharacterIndex++;
      }
      const newCharacter = LETTERS.get(character) || character;
      const shouldAdjust = isAdjustable && adjustableCharacterIndex + 1 === Math.floor(adjustAt);
      if (shouldAdjust) {
        adjustAt += adjustEvery;
        return charactersToAdjust < 0 ? "" : newCharacter.repeat(2);
      } else {
        return newCharacter;
      }
    }).join("") : part[0];
    return pseudotranslated2 + pseudotranslatedPart;
  }, "");
  return `${prepend || ""}${pseudotranslated}${append || ""}`;
}
function isAdjustableCharacter(character) {
  return LETTERS.has(character);
}
function countAdjustableCharacters(string) {
  return [...string].filter(isAdjustableCharacter).length;
}
function createParts(string, {
  startDelimiter,
  endDelimiter
}) {
  const delimiterRegex = startDelimiter && endDelimiter ? createDelimiterRegex(startDelimiter, endDelimiter) : void 0;
  let lastTokenEndIndex = 0;
  const parts = [];
  if (delimiterRegex) {
    let token = delimiterRegex.exec(string);
    while (token) {
      parts.push(string.substring(lastTokenEndIndex, token.index));
      parts.push(token);
      lastTokenEndIndex = token.index + token[0].length;
      token = delimiterRegex.exec(string);
    }
    parts.push(string.substring(lastTokenEndIndex, string.length));
  } else {
    parts.push(string);
  }
  return parts;
}
function createDelimiterRegex(startDelimiter, endDelimiter) {
  if (startDelimiter.length === 1 && endDelimiter.length === 1) {
    return new RegExp(`\\${startDelimiter}[^\\${endDelimiter}]*\\${endDelimiter}`, "g");
  }
  const escapedStart = [...startDelimiter].map((character) => `\\${character}`).join("");
  const escapedEnd = [...endDelimiter].map((character) => `\\${character}`).join("");
  return new RegExp(`${escapedStart}.*?${escapedEnd}`, "g");
}

// node_modules/@shopify/react-i18n/build/esm/types.mjs
var LanguageDirection;
(function(LanguageDirection2) {
  LanguageDirection2[LanguageDirection2["Rtl"] = 0] = "Rtl";
  LanguageDirection2[LanguageDirection2["Ltr"] = 1] = "Ltr";
})(LanguageDirection || (LanguageDirection = {}));

// node_modules/@shopify/react-i18n/build/esm/constants/index.mjs
var DateStyle;
(function(DateStyle2) {
  DateStyle2["Long"] = "Long";
  DateStyle2["Short"] = "Short";
  DateStyle2["Humanize"] = "Humanize";
  DateStyle2["Time"] = "Time";
  DateStyle2["DateTime"] = "DateTime";
})(DateStyle || (DateStyle = {}));
var dateStyle = {
  [DateStyle.Long]: {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric"
  },
  [DateStyle.Short]: {
    month: "short",
    day: "numeric",
    year: "numeric"
  },
  [DateStyle.Humanize]: {
    month: "long",
    day: "numeric",
    year: "numeric"
  },
  [DateStyle.Time]: {
    hour: "2-digit",
    minute: "2-digit"
  },
  [DateStyle.DateTime]: {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric"
  }
};
var Weekday3;
(function(Weekday4) {
  Weekday4["Sunday"] = "sunday";
  Weekday4["Monday"] = "monday";
  Weekday4["Tuesday"] = "tuesday";
  Weekday4["Wednesday"] = "wednesday";
  Weekday4["Thursday"] = "thursday";
  Weekday4["Friday"] = "friday";
  Weekday4["Saturday"] = "saturday";
})(Weekday3 || (Weekday3 = {}));
var DEFAULT_WEEK_START_DAY2 = Weekday3.Sunday;
var WEEK_START_DAYS = /* @__PURE__ */ new Map([
  // Saturday
  ["AE", Weekday3.Saturday],
  ["AF", Weekday3.Saturday],
  ["BH", Weekday3.Saturday],
  ["DZ", Weekday3.Saturday],
  ["EG", Weekday3.Saturday],
  ["IQ", Weekday3.Saturday],
  ["IR", Weekday3.Saturday],
  ["JO", Weekday3.Saturday],
  ["KW", Weekday3.Saturday],
  ["LY", Weekday3.Saturday],
  ["OM", Weekday3.Saturday],
  ["QA", Weekday3.Saturday],
  ["SA", Weekday3.Saturday],
  ["SY", Weekday3.Saturday],
  ["YE", Weekday3.Saturday],
  // Sunday
  ["AR", Weekday3.Sunday],
  ["BO", Weekday3.Sunday],
  ["BR", Weekday3.Sunday],
  ["BZ", Weekday3.Sunday],
  ["CA", Weekday3.Sunday],
  ["CL", Weekday3.Sunday],
  ["CO", Weekday3.Sunday],
  ["CR", Weekday3.Sunday],
  ["DO", Weekday3.Sunday],
  ["EC", Weekday3.Sunday],
  ["GT", Weekday3.Sunday],
  ["HK", Weekday3.Sunday],
  ["HN", Weekday3.Sunday],
  ["IL", Weekday3.Sunday],
  ["JM", Weekday3.Sunday],
  ["JP", Weekday3.Sunday],
  ["KE", Weekday3.Sunday],
  ["KR", Weekday3.Sunday],
  ["MO", Weekday3.Sunday],
  ["MX", Weekday3.Sunday],
  ["NI", Weekday3.Sunday],
  ["PA", Weekday3.Sunday],
  ["PE", Weekday3.Sunday],
  ["PH", Weekday3.Sunday],
  ["SG", Weekday3.Sunday],
  ["SV", Weekday3.Sunday],
  ["TW", Weekday3.Sunday],
  ["US", Weekday3.Sunday],
  ["VE", Weekday3.Sunday],
  ["ZA", Weekday3.Sunday],
  ["ZW", Weekday3.Sunday],
  // Monday
  ["AD", Weekday3.Monday],
  ["AL", Weekday3.Monday],
  ["AM", Weekday3.Monday],
  ["AU", Weekday3.Monday],
  ["AZ", Weekday3.Monday],
  ["BE", Weekday3.Monday],
  ["BG", Weekday3.Monday],
  ["BN", Weekday3.Monday],
  ["BY", Weekday3.Monday],
  ["CH", Weekday3.Monday],
  ["CN", Weekday3.Monday],
  ["CZ", Weekday3.Monday],
  ["DE", Weekday3.Monday],
  ["DK", Weekday3.Monday],
  ["EE", Weekday3.Monday],
  ["ES", Weekday3.Monday],
  ["FI", Weekday3.Monday],
  ["FR", Weekday3.Monday],
  ["GB", Weekday3.Monday],
  ["GE", Weekday3.Monday],
  ["GF", Weekday3.Monday],
  ["GR", Weekday3.Monday],
  ["HR", Weekday3.Monday],
  ["HU", Weekday3.Monday],
  ["ID", Weekday3.Monday],
  ["IE", Weekday3.Monday],
  ["IN", Weekday3.Monday],
  ["IS", Weekday3.Monday],
  ["IT", Weekday3.Monday],
  ["KG", Weekday3.Monday],
  ["KZ", Weekday3.Monday],
  ["LB", Weekday3.Monday],
  ["LT", Weekday3.Monday],
  ["LU", Weekday3.Monday],
  ["LV", Weekday3.Monday],
  ["MA", Weekday3.Monday],
  ["MC", Weekday3.Monday],
  ["MK", Weekday3.Monday],
  ["MN", Weekday3.Monday],
  ["MY", Weekday3.Monday],
  ["NL", Weekday3.Monday],
  ["NO", Weekday3.Monday],
  ["NZ", Weekday3.Monday],
  ["PK", Weekday3.Monday],
  ["PL", Weekday3.Monday],
  ["PT", Weekday3.Monday],
  ["PY", Weekday3.Monday],
  ["RO", Weekday3.Monday],
  ["RS", Weekday3.Monday],
  ["RU", Weekday3.Monday],
  ["SE", Weekday3.Monday],
  ["SK", Weekday3.Monday],
  ["TH", Weekday3.Monday],
  ["TN", Weekday3.Monday],
  ["TR", Weekday3.Monday],
  ["UA", Weekday3.Monday],
  ["UY", Weekday3.Monday],
  ["UZ", Weekday3.Monday],
  ["VN", Weekday3.Monday],
  ["XK", Weekday3.Monday]
]);
var RTL_LANGUAGES = [
  "ae",
  // Avestan
  "ar",
  // 'العربية', Arabic
  "arc",
  // Aramaic
  "bcc",
  // 'بلوچی مکرانی', Southern Balochi
  "bqi",
  // 'بختياري', Bakthiari
  "ckb",
  // 'Soranî / کوردی', Sorani
  "dv",
  // Dhivehi
  "fa",
  // 'فارسی', Persian
  "glk",
  // 'گیلکی', Gilaki
  "he",
  // 'עברית', Hebrew
  "ku",
  // 'Kurdî / كوردی', Kurdish
  "mzn",
  // 'مازِرونی', Mazanderani
  "nqo",
  // N'Ko
  "pnb",
  // 'پنجابی', Western Punjabi
  "ps",
  // 'پښتو', Pashto,
  "sd",
  // 'سنڌي', Sindhi
  "ug",
  // 'Uyghurche / ئۇيغۇرچە', Uyghur
  "ur",
  // 'اردو', Urdu
  "yi"
  // 'ייִדיש', Yiddish
];
var EASTERN_NAME_ORDER_FORMATTERS = /* @__PURE__ */ new Map([["ko", (firstName, lastName, full) => full ? `${lastName}${firstName}` : lastName], ["ja", (firstName, lastName, full) => full ? `${lastName}${firstName}` : `${lastName}\u69D8`], ["zh-CN", (firstName, lastName, full) => full ? `${lastName}${firstName}` : lastName], ["zh-TW", (firstName, lastName, full) => full ? `${lastName}${firstName}` : lastName]]);
var CurrencyShortFormException = {
  BRL: "R$",
  HKD: "HK$"
};
var UnicodeCharacterSet;
(function(UnicodeCharacterSet2) {
  UnicodeCharacterSet2["DirectionControl"] = "[\u200E\u200F\u202A-\u202E]";
  UnicodeCharacterSet2["Negative"] = "[-\u058A\u05BE\u1806\u2010-\u2015\u2212\u2796\u2E3A\u2E3B\uFE58\uFE63\uFF0D]";
  UnicodeCharacterSet2["Punctuation"] = "[!-#%-\\*,-\\/:;\\?@\\[-\\]_\\{\\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65\uD800]|[\uDD00-\uDD02\uDF9F\uDFD0]|\u{1056F}|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\u{1BC9F}|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]";
  UnicodeCharacterSet2["Latin"] = "[A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB64\uAB66-\uAB69\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A]|\uD801[\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD837[\uDF00-\uDF1E]";
  UnicodeCharacterSet2["Han"] = "[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]";
  UnicodeCharacterSet2["Hangul"] = "[\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]";
  UnicodeCharacterSet2["Katakana"] = "[\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D\uD82B]|[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00\uDD20-\uDD22\uDD64-\uDD67]";
  UnicodeCharacterSet2["Hiragana"] = "[\u3041-\u3096\u309D-\u309F]|\uD82C[\uDC01-\uDD1F\uDD50-\uDD52]|\u{1F200}";
  UnicodeCharacterSet2["Thai"] = "[\u0E01-\u0E3A\u0E40-\u0E5B]";
})(UnicodeCharacterSet || (UnicodeCharacterSet = {}));

// node_modules/@shopify/react-i18n/build/esm/errors.mjs
var MissingTranslationError = class extends Error {
  constructor(key, locale2) {
    super(`Missing translation for key: ${key} in locale: ${locale2}`);
  }
};
var MissingReplacementError = class extends Error {
  constructor(replacement, replacements = {}) {
    let errorMessage = "";
    const replacementKeys = Object.keys(replacements);
    if (replacementKeys.length < 1) {
      errorMessage = `No replacement found for key '${replacement}' (and no replacements were passed in).`;
    } else {
      errorMessage = `No replacement found for key '${replacement}'. The following replacements were passed: ${replacementKeys.map((key) => `'${key}'`).join(", ")}`;
    }
    super(errorMessage);
  }
};
var MissingCurrencyCodeError = class extends Error {
  constructor(additionalMessage = "") {
    const baseErrorMessage = "No currency code provided.";
    super(additionalMessage === "" ? baseErrorMessage : `${baseErrorMessage} ${additionalMessage}`);
  }
};
var MissingCountryError = class extends Error {
  constructor(additionalMessage = "") {
    const baseErrorMessage = "No country code provided.";
    super(additionalMessage === "" ? baseErrorMessage : `${baseErrorMessage} ${additionalMessage}`);
  }
};

// node_modules/@shopify/react-i18n/build/esm/utilities/translate.mjs
var import_react2 = __toESM(require_react(), 1);

// node_modules/@shopify/react-i18n/build/esm/utilities/interpolate.mjs
var DEFAULT_FORMAT = /{\s*(\w+)\s*}/g;

// node_modules/@shopify/react-i18n/build/esm/utilities/translate.mjs
var MISSING_TRANSLATION = Symbol("Missing translation");
var CARDINAL_PLURALIZATION_KEY_NAME = "count";
var ORDINAL_PLURALIZATION_KEY_NAME = "ordinal";
var SEPARATOR = ".";
var UNICODE_NUMBERING_SYSTEM = "-u-nu-";
var LATIN = "latn";
var isString = (value) => typeof value === "string";
var numberFormats = /* @__PURE__ */ new Map();
function memoizedNumberFormatter(locales, options) {
  const latnLocales = latinLocales(locales);
  const key = numberFormatCacheKey(latnLocales, options);
  if (numberFormats.has(key)) {
    return numberFormats.get(key);
  }
  const i = new Intl.NumberFormat(latnLocales, options);
  numberFormats.set(key, i);
  return i;
}
function latinLocales(locales) {
  return Array.isArray(locales) ? locales.map((locale2) => latinLocale(locale2)) : latinLocale(locales);
}
function latinLocale(locale2) {
  if (!locale2)
    return locale2;
  try {
    return new Intl.Locale(locale2, {
      numberingSystem: LATIN
    }).toString();
  } catch {
    const numberingSystemRegex = new RegExp(`(?:-x|${UNICODE_NUMBERING_SYSTEM}).*`, "g");
    const latinNumberingSystem = `${UNICODE_NUMBERING_SYSTEM}${LATIN}`;
    return locale2.replace(numberingSystemRegex, "").concat(latinNumberingSystem);
  }
}
var PSEUDOTRANSLATE_OPTIONS = {
  startDelimiter: "{",
  endDelimiter: "}",
  prepend: "[!!",
  append: "!!]"
};
function numberFormatCacheKey(locales, options = {}) {
  const localeKey = Array.isArray(locales) ? locales.sort().join("-") : locales;
  return `${localeKey}-${JSON.stringify(options)}`;
}
function pluralRules(locale2, options = {}) {
  return new Intl.PluralRules(locale2, options);
}
var memoizedPluralRules = memoize(pluralRules, (locale2, options = {}) => `${locale2}${JSON.stringify(options)}`);
function getTranslationTree(id, translations, locale2, replacements) {
  const normalizedTranslations = Array.isArray(translations) ? translations : [translations];
  let result;
  for (const translationDictionary of normalizedTranslations) {
    result = translationDictionary;
    for (const part of id.split(SEPARATOR)) {
      result = result[part];
      if (!result)
        break;
    }
    if (result) {
      if (replacements) {
        return isString(result) ? updateStringWithReplacements(result, replacements) : updateTreeWithReplacements(result, locale2, replacements);
      }
      return result;
    }
  }
  throw new MissingTranslationError(id, locale2);
}
function translate(id, options, translations, locale2) {
  const {
    scope,
    replacements,
    pseudotranslate: pseudotranslate2,
    interpolate
  } = options;
  const normalizedTranslations = Array.isArray(translations) ? translations : [translations];
  const normalizedId = normalizeIdentifier(id, scope);
  for (const translationDictionary of normalizedTranslations) {
    const result = translateWithDictionary(normalizedId, translationDictionary, locale2, replacements, {
      pseudotranslate: pseudotranslate2,
      interpolate
    });
    if (result !== MISSING_TRANSLATION) {
      return result;
    }
  }
  throw new MissingTranslationError(normalizedId, locale2);
}
function translateWithDictionary(id, translations, locale2, replacements, {
  pseudotranslate: pseudotranslate$1 = false,
  interpolate
} = {}) {
  let result = translations;
  for (const part of id.split(SEPARATOR)) {
    if (result == null || typeof result !== "object") {
      return MISSING_TRANSLATION;
    }
    result = result[part];
  }
  const additionalReplacements = {};
  if (typeof result === "object" && replacements != null && Object.prototype.hasOwnProperty.call(replacements, CARDINAL_PLURALIZATION_KEY_NAME)) {
    const count = replacements[CARDINAL_PLURALIZATION_KEY_NAME];
    if (typeof count === "number") {
      if (count === 0 && result["0"] !== void 0) {
        result = result["0"];
      } else if (count === 1 && result["1"] !== void 0) {
        result = result["1"];
      } else {
        const group = memoizedPluralRules(locale2).select(count);
        result = result[group] || result.other;
      }
      additionalReplacements[CARDINAL_PLURALIZATION_KEY_NAME] = memoizedNumberFormatter(locale2).format(count);
    }
  } else if (typeof result === "object" && replacements != null && Object.prototype.hasOwnProperty.call(replacements, ORDINAL_PLURALIZATION_KEY_NAME)) {
    const count = replacements[ORDINAL_PLURALIZATION_KEY_NAME];
    if (typeof count === "number") {
      const group = memoizedPluralRules(locale2, {
        type: "ordinal"
      }).select(count);
      result = result.ordinal[group] || result.ordinal["other"];
      additionalReplacements[ORDINAL_PLURALIZATION_KEY_NAME] = memoizedNumberFormatter(locale2).format(count);
    }
  }
  const processedString = isString(result) && pseudotranslate$1 ? pseudotranslate(result, {
    ...PSEUDOTRANSLATE_OPTIONS,
    toLocale: typeof pseudotranslate$1 === "boolean" ? void 0 : pseudotranslate$1
  }) : result;
  if (!isString(processedString)) {
    return MISSING_TRANSLATION;
  }
  return updateStringWithReplacements(processedString, {
    ...replacements,
    ...additionalReplacements
  }, {
    interpolate
  });
}
function updateStringWithReplacements(str, replacements = {}, {
  interpolate
} = {}) {
  const pieces = [];
  const replaceFinder = new RegExp(interpolate || DEFAULT_FORMAT, "g");
  let matchIndex = 0;
  let lastOffset = 0;
  str.replace(replaceFinder, (match, replacementKey, offset) => {
    if (!replacementKey) {
      throw new Error("Invalid replacement key. The interpolatation format RegExp is possibly too permissive.");
    }
    if (!Object.prototype.hasOwnProperty.call(replacements, replacementKey)) {
      throw new MissingReplacementError(replacementKey, replacements);
    }
    matchIndex += 1;
    const previousString = str.substring(lastOffset, offset);
    if (previousString)
      pieces.push(previousString);
    lastOffset = offset + match.length;
    const replacementValue = replacements[replacementKey];
    if (/* @__PURE__ */ import_react2.default.isValidElement(replacementValue)) {
      pieces.push(/* @__PURE__ */ import_react2.default.cloneElement(replacementValue, {
        key: matchIndex
      }));
    } else if (typeof replacementValue === "object") {
      pieces.push(replacementValue);
    } else {
      pieces.push(String(replacementValue));
    }
    return "";
  });
  const lastPart = str.substring(lastOffset);
  if (lastPart)
    pieces.push(lastPart);
  return pieces.every(isString) ? pieces.join("") : pieces;
}
function normalizeIdentifier(id, scope) {
  if (scope == null) {
    return id;
  }
  return `${isString(scope) ? scope : scope.join(SEPARATOR)}${SEPARATOR}${id}`;
}
function updateTreeWithReplacements(translationTree, locale2, replacements) {
  if (Object.prototype.hasOwnProperty.call(replacements, CARDINAL_PLURALIZATION_KEY_NAME)) {
    const count = replacements[CARDINAL_PLURALIZATION_KEY_NAME];
    if (typeof count === "number") {
      const group = memoizedPluralRules(locale2).select(count);
      if (isString(translationTree[group])) {
        return updateStringWithReplacements(translationTree[group], {
          ...replacements,
          CARDINAL_PLURALIZATION_KEY_NAME: memoizedNumberFormatter(locale2).format(count)
        });
      }
    }
  } else if (Object.prototype.hasOwnProperty.call(replacements, ORDINAL_PLURALIZATION_KEY_NAME)) {
    const count = replacements[ORDINAL_PLURALIZATION_KEY_NAME];
    if (typeof count === "number") {
      const group = memoizedPluralRules(locale2, {
        type: "ordinal"
      }).select(count);
      if (isString(translationTree[group])) {
        return updateStringWithReplacements(translationTree[group], {
          ...replacements,
          ORDINAL_PLURALIZATION_KEY_NAME: memoizedNumberFormatter(locale2).format(count)
        });
      }
    }
  }
  return Object.keys(translationTree).reduce((acc, key) => ({
    ...acc,
    [key]: isString(translationTree[key]) ? updateStringWithReplacements(translationTree[key], replacements) : updateTreeWithReplacements(translationTree[key], locale2, replacements)
  }), {});
}

// node_modules/@shopify/react-i18n/build/esm/constants/currency-decimal-places.mjs
var DEFAULT_DECIMAL_PLACES = 2;
var currencyDecimalPlaces = /* @__PURE__ */ new Map([["AED", 2], ["AFN", 2], ["ALL", 2], ["AMD", 2], ["ANG", 2], ["AOA", 2], ["ARS", 2], ["AUD", 2], ["AWG", 2], ["AZN", 2], ["BAM", 2], ["BBD", 2], ["BDT", 2], ["BGN", 2], ["BHD", 3], ["BIF", 0], ["BMD", 2], ["BND", 2], ["BOB", 2], ["BOV", 2], ["BRL", 2], ["BSD", 2], ["BTN", 2], ["BWP", 2], ["BYN", 2], ["BYR", 0], ["BZD", 2], ["CAD", 2], ["CDF", 2], ["CHE", 2], ["CHF", 2], ["CHW", 2], ["CLF", 4], ["CLP", 0], ["CNY", 2], ["COP", 2], ["COU", 2], ["CRC", 2], ["CUC", 2], ["CUP", 2], ["CVE", 2], ["CZK", 2], ["DJF", 0], ["DKK", 2], ["DOP", 2], ["DZD", 2], ["EGP", 2], ["ERN", 2], ["ETB", 2], ["EUR", 2], ["FJD", 2], ["FKP", 2], ["GBP", 2], ["GEL", 2], ["GHS", 2], ["GIP", 2], ["GMD", 2], ["GNF", 0], ["GTQ", 2], ["GYD", 2], ["HKD", 2], ["HNL", 2], ["HRK", 2], ["HTG", 2], ["HUF", 2], ["IDR", 2], ["ILS", 2], ["INR", 2], ["IQD", 3], ["IRR", 2], ["ISK", 0], ["JEP", 2], ["JMD", 2], ["JOD", 3], ["JPY", 0], ["KES", 2], ["KGS", 2], ["KHR", 2], ["KMF", 0], ["KPW", 2], ["KRW", 0], ["KWD", 3], ["KYD", 2], ["KZT", 2], ["LAK", 2], ["LBP", 2], ["LKR", 2], ["LRD", 2], ["LSL", 2], ["LYD", 3], ["MAD", 2], ["MDL", 2], ["MGA", 2], ["MKD", 2], ["MMK", 2], ["MNT", 2], ["MOP", 2], ["MRO", 5], ["MUR", 2], ["MVR", 2], ["MWK", 2], ["MXN", 2], ["MXV", 2], ["MYR", 2], ["MZN", 2], ["NAD", 2], ["NGN", 2], ["NIO", 2], ["NOK", 2], ["NPR", 2], ["NZD", 2], ["OMR", 3], ["PAB", 2], ["PEN", 2], ["PGK", 2], ["PHP", 2], ["PKR", 2], ["PLN", 2], ["PYG", 0], ["QAR", 2], ["RON", 2], ["RSD", 2], ["RUB", 2], ["RWF", 0], ["SAR", 2], ["SBD", 2], ["SCR", 2], ["SDG", 2], ["SEK", 2], ["SGD", 2], ["SHP", 2], ["SLL", 2], ["SOS", 2], ["SRD", 2], ["SSP", 2], ["STD", 2], ["STN", 2], ["SVC", 2], ["SYP", 2], ["SZL", 2], ["THB", 2], ["TJS", 2], ["TMT", 2], ["TND", 3], ["TOP", 2], ["TRY", 2], ["TTD", 2], ["TWD", 2], ["TZS", 2], ["UAH", 2], ["UGX", 0], ["USD", 2], ["USN", 2], ["UYI", 0], ["UYU", 2], ["UYW", 4], ["UZS", 2], ["VED", 2], ["VEF", 2], ["VES", 2], ["VND", 0], ["VUV", 0], ["WST", 2], ["XAF", 0], ["XAG", 0], ["XAU", 0], ["XBA", 0], ["XBB", 0], ["XBC", 0], ["XBD", 0], ["XCD", 2], ["XDR", 0], ["XOF", 0], ["XPD", 0], ["XPF", 0], ["XPT", 0], ["XSU", 0], ["XTS", 0], ["XUA", 0], ["YER", 2], ["ZAR", 2], ["ZMW", 2], ["ZWL", 2]]);

// node_modules/@shopify/react-i18n/build/esm/utilities/identifyScripts.mjs
var SUPPORTED_SCRIPTS = [UnicodeCharacterSet.Latin, UnicodeCharacterSet.Han, UnicodeCharacterSet.Hiragana, UnicodeCharacterSet.Katakana, UnicodeCharacterSet.Hangul, UnicodeCharacterSet.Thai];
function identifyScripts(text) {
  return SUPPORTED_SCRIPTS.filter((supportedScript) => new RegExp(`${supportedScript}`).test(text));
}

// node_modules/@shopify/react-i18n/build/esm/utilities/tryAbbreviateName.mjs
function tryAbbreviateName({
  firstName,
  lastName,
  idealMaxLength = 3
}) {
  if (!firstName && !lastName) {
    return void 0;
  }
  const firstNameTrimmed = firstName === null || firstName === void 0 ? void 0 : firstName.trim();
  const lastNameTrimmed = lastName === null || lastName === void 0 ? void 0 : lastName.trim();
  const combinedName = [firstNameTrimmed, lastNameTrimmed].join("");
  if (new RegExp(`${UnicodeCharacterSet.Punctuation}|\\s`).test(combinedName)) {
    return void 0;
  }
  const scripts = identifyScripts(combinedName);
  if (scripts.length !== 1) {
    return void 0;
  }
  const script = scripts[0];
  switch (script) {
    case UnicodeCharacterSet.Latin:
      return [firstNameTrimmed === null || firstNameTrimmed === void 0 ? void 0 : firstNameTrimmed[0], lastNameTrimmed === null || lastNameTrimmed === void 0 ? void 0 : lastNameTrimmed[0]].join("");
    case UnicodeCharacterSet.Han:
    case UnicodeCharacterSet.Katakana:
    case UnicodeCharacterSet.Hiragana:
      return lastNameTrimmed;
    case UnicodeCharacterSet.Hangul:
      if (firstNameTrimmed) {
        if (firstNameTrimmed.length > idealMaxLength) {
          var _getGraphemes;
          return (_getGraphemes = getGraphemes({
            text: firstNameTrimmed,
            locale: "ko"
          })) === null || _getGraphemes === void 0 ? void 0 : _getGraphemes[0];
        } else {
          return firstNameTrimmed;
        }
      } else {
        return lastNameTrimmed;
      }
    case UnicodeCharacterSet.Thai:
      if (firstNameTrimmed) {
        var _getGraphemes2;
        return (_getGraphemes2 = getGraphemes({
          text: firstNameTrimmed,
          locale: "th"
        })) === null || _getGraphemes2 === void 0 ? void 0 : _getGraphemes2[0];
      } else {
        var _getGraphemes3;
        return (_getGraphemes3 = getGraphemes({
          text: lastNameTrimmed,
          locale: "th"
        })) === null || _getGraphemes3 === void 0 ? void 0 : _getGraphemes3[0];
      }
    default:
      return void 0;
  }
}
function getGraphemes({
  text,
  locale: locale2
}) {
  if (!text || !Intl.Segmenter) {
    return void 0;
  }
  const segmenter = new Intl.Segmenter(locale2, {
    granularity: "grapheme"
  });
  return Array.from(segmenter.segment(text)).map((grapheme) => grapheme.segment);
}

// node_modules/@shopify/react-i18n/build/esm/utilities/money.mjs
function getCurrencySymbol(locale2, options) {
  const currencyStringRaw = formatCurrency(0, locale2, options);
  const controlChars = new RegExp(`${UnicodeCharacterSet.DirectionControl}*`, "gu");
  const currencyString = currencyStringRaw.replace(controlChars, "");
  const matchResult = /\p{Nd}\p{Po}*\p{Nd}*/gu.exec(currencyString);
  if (!matchResult) {
    throw new Error(`Number input in locale ${locale2} is currently not supported.`);
  }
  const formattedAmount = matchResult[0];
  const [currencyPrefix, currencySuffix] = currencyString.split(formattedAmount);
  const elements = {
    symbol: currencyPrefix || currencySuffix,
    prefixed: currencyPrefix !== ""
  };
  return elements;
}
function formatCurrency(amount, locale2, options) {
  return memoizedNumberFormatter(locale2, {
    style: "currency",
    ...options
  }).format(amount);
}

// node_modules/@shopify/react-i18n/build/esm/utilities/string.mjs
function convertFirstSpaceToNonBreakingSpace(str) {
  return str.replace(" ", "\xA0");
}

// node_modules/@shopify/react-i18n/build/esm/i18n.mjs
var PERIOD = ".";
var NEGATIVE_SIGN = "-";
var REGEX_DIGITS = /\d/g;
var REGEX_NON_DIGITS = /\D/g;
var REGEX_PERIODS = /\./g;
var I18n = class {
  get language() {
    return languageFromLocale(this.locale);
  }
  get region() {
    return regionFromLocale(this.locale);
  }
  /**
   * @deprecated Use I18n#region instead.
   */
  get countryCode() {
    return regionFromLocale(this.locale);
  }
  get languageDirection() {
    return RTL_LANGUAGES.includes(this.language) ? LanguageDirection.Rtl : LanguageDirection.Ltr;
  }
  get isRtlLanguage() {
    return this.languageDirection === LanguageDirection.Rtl;
  }
  get isLtrLanguage() {
    return this.languageDirection === LanguageDirection.Ltr;
  }
  constructor(translations, {
    locale: _locale,
    currency: _currency,
    timezone,
    country,
    pseudolocalize = false,
    onError,
    loading,
    interpolate
  }) {
    this.getCurrencySymbol = (currencyCode, locale2 = this.locale) => {
      const currency = currencyCode || this.defaultCurrency;
      if (currency == null) {
        throw new MissingCurrencyCodeError("formatCurrency cannot be called without a currency code.");
      }
      return this.getShortCurrencySymbol(currency, locale2);
    };
    this.numberSymbols = memoize(() => {
      const formattedNumber = this.formatNumber(123456.7, {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1
      });
      let thousandSymbol;
      let decimalSymbol;
      for (const char of formattedNumber) {
        if (isNaN(parseInt(char, 10))) {
          if (thousandSymbol)
            decimalSymbol = char;
          else
            thousandSymbol = char;
        }
      }
      return {
        thousandSymbol,
        decimalSymbol
      };
    });
    this.translations = translations;
    this.locale = _locale;
    this.defaultCountry = country;
    this.defaultCurrency = _currency;
    this.defaultTimezone = timezone;
    this.pseudolocalize = pseudolocalize;
    this.defaultInterpolate = interpolate;
    this.onError = onError || this.defaultOnError;
    this.loading = loading || false;
  }
  translate(id, optionsOrReplacements, replacements) {
    const {
      pseudolocalize,
      defaultInterpolate
    } = this;
    let normalizedOptions;
    const defaultOptions = {
      pseudotranslate: pseudolocalize,
      interpolate: defaultInterpolate
    };
    if (optionsOrReplacements == null) {
      normalizedOptions = defaultOptions;
    } else if (this.isTranslateOptions(optionsOrReplacements)) {
      normalizedOptions = {
        ...defaultOptions,
        ...optionsOrReplacements,
        replacements
      };
    } else {
      normalizedOptions = {
        ...defaultOptions,
        replacements: optionsOrReplacements
      };
    }
    try {
      return translate(id, normalizedOptions, this.translations, this.locale);
    } catch (error) {
      this.onError(error);
      return "";
    }
  }
  getTranslationTree(id, replacements) {
    try {
      if (!replacements) {
        return getTranslationTree(id, this.translations, this.locale);
      }
      return getTranslationTree(id, this.translations, this.locale, replacements);
    } catch (error) {
      this.onError(error);
      return "";
    }
  }
  translationKeyExists(id) {
    try {
      getTranslationTree(id, this.translations, this.locale);
      return true;
    } catch (error) {
      return false;
    }
  }
  formatNumber(amount, {
    as,
    precision,
    ...options
  } = {}) {
    const {
      locale: locale2,
      defaultCurrency: currency
    } = this;
    if (as === "currency" && currency == null && options.currency == null) {
      this.onError(new MissingCurrencyCodeError(`formatNumber(amount, {as: 'currency'}) cannot be called without a currency code.`));
      return "";
    }
    return memoizedNumberFormatter(locale2, {
      style: as,
      maximumFractionDigits: precision,
      currency,
      ...options
    }).format(amount);
  }
  unformatNumber(input) {
    const {
      decimalSymbol
    } = this.numberSymbols();
    const normalizedValue = this.normalizedNumber(input, decimalSymbol);
    return normalizedValue === "" ? "" : parseFloat(normalizedValue).toString();
  }
  formatCurrency(amount, {
    form,
    ...options
  } = {}) {
    switch (form) {
      case "auto":
        return this.formatCurrencyAuto(amount, options);
      case "explicit":
        return this.formatCurrencyExplicit(amount, options);
      case "short":
        return this.formatCurrencyShort(amount, options);
      case "none":
        return this.formatCurrencyNone(amount, options);
      default:
        return this.formatCurrencyAuto(amount, options);
    }
  }
  unformatCurrency(input, currencyCode) {
    const {
      decimalSymbol
    } = this.numberSymbols();
    const decimalPlaces = currencyDecimalPlaces.get(currencyCode.toUpperCase());
    const normalizedValue = this.normalizedNumber(input, decimalSymbol, decimalPlaces);
    if (normalizedValue === "") {
      return "";
    }
    if (decimalPlaces === 0) {
      const roundedAmount = parseFloat(normalizedValue).toFixed(0);
      return `${roundedAmount}.${"0".repeat(DEFAULT_DECIMAL_PLACES)}`;
    }
    return parseFloat(normalizedValue).toFixed(decimalPlaces);
  }
  formatPercentage(amount, options = {}) {
    return this.formatNumber(amount, {
      as: "percent",
      ...options
    });
  }
  formatDate(date, options = {}) {
    const {
      locale: locale2,
      defaultTimezone
    } = this;
    const {
      timeZone = defaultTimezone
    } = options;
    const {
      style = void 0,
      ...formatOptions
    } = options || {};
    if (style) {
      switch (style) {
        case DateStyle.Humanize:
          return this.humanizeDate(date, {
            ...formatOptions,
            timeZone
          });
        case DateStyle.DateTime:
          return this.formatDateTime(date, {
            ...formatOptions,
            timeZone,
            ...dateStyle[style]
          });
        default:
          return this.formatDate(date, {
            ...formatOptions,
            ...dateStyle[style]
          });
      }
    }
    return formatDate(date, locale2, {
      ...formatOptions,
      timeZone
    });
  }
  ordinal(amount) {
    const {
      locale: locale2
    } = this;
    const group = memoizedPluralRules(locale2, {
      type: "ordinal"
    }).select(amount);
    return this.translate(group, {
      scope: "ordinal"
    }, {
      amount
    });
  }
  weekStartDay(argCountry) {
    const country = argCountry || this.defaultCountry;
    if (!country) {
      throw new MissingCountryError("weekStartDay() cannot be called without a country code.");
    }
    return WEEK_START_DAYS.get(country) || DEFAULT_WEEK_START_DAY2;
  }
  /**
   * @deprecated Replace usage of `i18n.getCurrencySymbolLocalized(locale, currency)` with `i18n.getCurrencySymbol(currency, locale)`
   */
  getCurrencySymbolLocalized(locale2, currency) {
    return this.getShortCurrencySymbol(currency, locale2);
  }
  formatName(firstName, lastName, options) {
    if (!firstName) {
      return lastName || "";
    }
    if (!lastName) {
      return firstName;
    }
    const isFullName = Boolean(options && options.full);
    const customNameFormatter = EASTERN_NAME_ORDER_FORMATTERS.get(this.locale) || EASTERN_NAME_ORDER_FORMATTERS.get(this.language);
    if (customNameFormatter) {
      return customNameFormatter(firstName, lastName, isFullName);
    }
    if (isFullName) {
      return `${firstName} ${lastName}`;
    }
    return firstName;
  }
  // Note: A similar Ruby implementation of this function also exists at https://github.com/Shopify/shopify-i18n/blob/main/lib/shopify-i18n/name_formatter.rb.
  abbreviateName({
    firstName,
    lastName,
    idealMaxLength = 3
  }) {
    var _tryAbbreviateName;
    return (_tryAbbreviateName = tryAbbreviateName({
      firstName,
      lastName,
      idealMaxLength
    })) !== null && _tryAbbreviateName !== void 0 ? _tryAbbreviateName : this.formatName(firstName, lastName);
  }
  identifyScript(text) {
    return identifyScripts(text);
  }
  hasEasternNameOrderFormatter() {
    const easternNameOrderFormatter = EASTERN_NAME_ORDER_FORMATTERS.get(this.locale) || EASTERN_NAME_ORDER_FORMATTERS.get(this.language);
    return Boolean(easternNameOrderFormatter);
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  formatCurrencyAuto(amount, options = {}) {
    const formatShort = options.currency == null || this.defaultCurrency == null || options.currency === this.defaultCurrency;
    return formatShort ? this.formatCurrencyShort(amount, options) : this.formatCurrencyExplicit(amount, options);
  }
  formatCurrencyExplicit(amount, options = {}) {
    const value = this.formatCurrencyShort(amount, options);
    const isoCode = options.currency || this.defaultCurrency || "";
    if (value.includes(isoCode)) {
      return value;
    }
    return `${value} ${isoCode}`;
  }
  formatCurrencyShort(amount, options = {}) {
    var _negativeRegex$exec;
    const formattedAmount = this.formatCurrencyNone(amount, options);
    const negativeRegex = new RegExp(`${UnicodeCharacterSet.DirectionControl}*${UnicodeCharacterSet.Negative}`, "g");
    const negativeMatch = ((_negativeRegex$exec = negativeRegex.exec(formattedAmount)) === null || _negativeRegex$exec === void 0 ? void 0 : _negativeRegex$exec.shift()) || "";
    const shortSymbol = this.getShortCurrencySymbol(options.currency);
    const formattedWithSymbol = shortSymbol.prefixed ? `${shortSymbol.symbol}${formattedAmount}` : `${formattedAmount}${shortSymbol.symbol}`;
    return `${negativeMatch}${formattedWithSymbol.replace(negativeMatch, "")}`;
  }
  formatCurrencyNone(amount, options = {}) {
    const {
      locale: locale2
    } = this;
    let adjustedPrecision = options.precision;
    if (adjustedPrecision === void 0) {
      const currency = options.currency || this.defaultCurrency || "";
      adjustedPrecision = currencyDecimalPlaces.get(currency.toUpperCase());
    }
    return memoizedNumberFormatter(locale2, {
      style: "decimal",
      minimumFractionDigits: adjustedPrecision,
      maximumFractionDigits: adjustedPrecision,
      ...options
    }).format(amount);
  }
  // Intl.NumberFormat sometimes annotates the "currency symbol" with a country code.
  // For example, in locale 'fr-FR', 'USD' is given the "symbol" of " $US".
  // This method strips out the country-code annotation, if there is one.
  // (So, for 'fr-FR' and 'USD', the return value would be " $").
  //
  // For other currencies, e.g. CHF and OMR, the "symbol" is the ISO currency code.
  // In those cases, we return the full currency code without stripping the country.
  getShortCurrencySymbol(currency = this.defaultCurrency || "", locale2 = this.locale) {
    const regionCode = currency.substring(0, 2);
    let shortSymbolResult;
    try {
      shortSymbolResult = getCurrencySymbol(locale2, {
        currency,
        currencyDisplay: "narrowSymbol"
      });
    } catch {
      shortSymbolResult = getCurrencySymbol(locale2, {
        currency
      });
    }
    if (currency in CurrencyShortFormException) {
      return {
        symbol: CurrencyShortFormException[currency],
        prefixed: shortSymbolResult.prefixed
      };
    }
    const shortSymbol = shortSymbolResult.symbol.replace(regionCode, "");
    const alphabeticCharacters = /[A-Za-zÀ-ÖØ-öø-ÿĀ-ɏḂ-ỳ]/;
    return alphabeticCharacters.exec(shortSymbol) ? shortSymbolResult : {
      symbol: shortSymbol,
      prefixed: shortSymbolResult.prefixed
    };
  }
  humanizeDate(date, options) {
    return isFutureDate(date) ? this.humanizeFutureDate(date, options) : this.humanizePastDate(date, options);
  }
  formatDateTime(date, options) {
    const {
      defaultTimezone
    } = this;
    const {
      timeZone = defaultTimezone
    } = options;
    return this.translate("date.humanize.lessThanOneYearAway", {
      date: this.getDateFromDate(date, {
        ...options,
        timeZone
      }),
      time: this.getTimeFromDate(date, {
        ...options,
        timeZone
      })
    });
  }
  humanizePastDate(date, options) {
    if (isLessThanOneMinuteAgo(date)) {
      return this.translate("date.humanize.lessThanOneMinuteAgo");
    }
    if (isLessThanOneHourAgo(date)) {
      const now = /* @__PURE__ */ new Date();
      const minutes = Math.floor((now.getTime() - date.getTime()) / TimeUnit.Minute);
      return this.translate("date.humanize.lessThanOneHourAgo", {
        count: minutes
      });
    }
    const timeZone = options === null || options === void 0 ? void 0 : options.timeZone;
    const time = this.getTimeFromDate(date, options);
    if (isToday(date, timeZone)) {
      return time;
    }
    if (isYesterday(date, timeZone)) {
      return this.translate("date.humanize.yesterday", {
        time
      });
    }
    if (isLessThanOneWeekAgo(date)) {
      const weekday2 = this.getWeekdayFromDate(date, options);
      return this.translate("date.humanize.lessThanOneWeekAgo", {
        weekday: weekday2,
        time
      });
    }
    if (isLessThanOneYearAgo(date)) {
      const monthDay = this.getMonthDayFromDate(date, options);
      return this.translate("date.humanize.lessThanOneYearAgo", {
        date: monthDay,
        time
      });
    }
    return this.formatDate(date, {
      ...options,
      style: DateStyle.Short
    });
  }
  humanizeFutureDate(date, options) {
    const timeZone = options === null || options === void 0 ? void 0 : options.timeZone;
    const time = this.getTimeFromDate(date, options);
    if (isToday(date, timeZone)) {
      return this.translate("date.humanize.today", {
        time
      });
    }
    if (isTomorrow(date, timeZone)) {
      return this.translate("date.humanize.tomorrow", {
        time
      });
    }
    if (isLessThanOneWeekAway(date)) {
      const weekday2 = this.getWeekdayFromDate(date, options);
      return this.translate("date.humanize.lessThanOneWeekAway", {
        weekday: weekday2,
        time
      });
    }
    if (isLessThanOneYearAway(date)) {
      const monthDay = this.getMonthDayFromDate(date, options);
      return this.translate("date.humanize.lessThanOneYearAway", {
        date: monthDay,
        time
      });
    }
    return this.formatDate(date, {
      ...options,
      style: DateStyle.Short
    });
  }
  getTimeZone(date, options) {
    const {
      localeMatcher,
      formatMatcher,
      timeZone
    } = options || {};
    const hourZone = this.formatDate(date, {
      localeMatcher,
      formatMatcher,
      timeZone,
      hour12: false,
      timeZoneName: "short",
      hour: "numeric"
    });
    const zoneMatchGroup = /\s([\w()+\-:.]+$)/.exec(hourZone);
    return zoneMatchGroup ? zoneMatchGroup[1] : "";
  }
  getDateFromDate(date, options) {
    const {
      localeMatcher,
      formatMatcher,
      weekday: weekday2,
      day: day2,
      month,
      year: year2,
      era,
      timeZone,
      timeZoneName
    } = options || {};
    const formattedDate = this.formatDate(date, {
      localeMatcher,
      formatMatcher,
      weekday: weekday2,
      day: day2,
      month,
      year: year2,
      era,
      timeZone,
      timeZoneName: timeZoneName === "short" ? void 0 : timeZoneName
    });
    return formattedDate;
  }
  getTimeFromDate(date, options) {
    const {
      localeMatcher,
      formatMatcher,
      hour12,
      timeZone,
      timeZoneName
    } = options || {};
    const formattedTime = this.formatDate(date, {
      localeMatcher,
      formatMatcher,
      hour12,
      timeZone,
      timeZoneName: timeZoneName === "short" ? void 0 : timeZoneName,
      hour: "numeric",
      minute: "2-digit"
    }).toLocaleLowerCase();
    const time = timeZoneName === "short" ? `${formattedTime} ${this.getTimeZone(date, options)}` : formattedTime;
    return convertFirstSpaceToNonBreakingSpace(time);
  }
  getWeekdayFromDate(date, options) {
    const {
      localeMatcher,
      formatMatcher,
      hour12,
      timeZone
    } = options || {};
    return this.formatDate(date, {
      localeMatcher,
      formatMatcher,
      hour12,
      timeZone,
      weekday: "long"
    });
  }
  getMonthDayFromDate(date, options) {
    const {
      localeMatcher,
      formatMatcher,
      hour12,
      timeZone
    } = options || {};
    return this.formatDate(date, {
      localeMatcher,
      formatMatcher,
      hour12,
      timeZone,
      month: "short",
      day: "numeric"
    });
  }
  normalizedNumber(input, decimalSymbol, decimalPlaces = DEFAULT_DECIMAL_PLACES) {
    const maximumDecimalPlaces = Math.max(decimalPlaces, DEFAULT_DECIMAL_PLACES);
    const lastIndexOfPeriod = input.lastIndexOf(PERIOD);
    let lastIndexOfDecimal = input.lastIndexOf(decimalSymbol);
    if (decimalSymbol !== PERIOD && (input.match(REGEX_PERIODS) || []).length === 1 && this.decimalValue(input, lastIndexOfPeriod).length <= maximumDecimalPlaces) {
      lastIndexOfDecimal = lastIndexOfPeriod;
    }
    const integerValue = this.integerValue(input, lastIndexOfDecimal);
    const decimalValue = this.decimalValue(input, lastIndexOfDecimal);
    const negativeRegex = new RegExp(`^(${UnicodeCharacterSet.DirectionControl}|\\s)*${UnicodeCharacterSet.Negative}`, "u");
    const negativeSign = input.match(negativeRegex) ? NEGATIVE_SIGN : "";
    const normalizedDecimal = lastIndexOfDecimal === -1 ? "" : PERIOD;
    const normalizedValue = `${negativeSign}${integerValue}${normalizedDecimal}${decimalValue}`;
    return normalizedValue.match(REGEX_DIGITS) ? normalizedValue : "";
  }
  integerValue(input, lastIndexOfDecimal) {
    return input.substring(0, lastIndexOfDecimal).replace(REGEX_NON_DIGITS, "");
  }
  decimalValue(input, lastIndexOfDecimal) {
    return input.substring(lastIndexOfDecimal + 1).replace(REGEX_NON_DIGITS, "");
  }
  isTranslateOptions(object) {
    return "scope" in object;
  }
  defaultOnError(error) {
    throw error;
  }
};

// node_modules/@shopify/react-i18n/build/esm/hooks.mjs
var import_react4 = __toESM(require_react(), 1);

// node_modules/@shopify/react-hooks/build/esm/hooks/lazy-ref.mjs
var import_react3 = __toESM(require_react(), 1);
function useLazyRef(getValue) {
  const [value] = (0, import_react3.useState)(getValue);
  const ref = (0, import_react3.useRef)(value);
  return ref;
}

// node_modules/@shopify/react-i18n/build/esm/hooks.mjs
function useI18n(options) {
  const manager = import_react4.default.useContext(I18nContext);
  if (manager == null) {
    throw new Error("Missing i18n manager. Make sure to use an <I18nContext.Provider /> somewhere in your React tree.");
  }
  const registerOptions = import_react4.default.useRef(options);
  if (shouldRegister(registerOptions.current) !== shouldRegister(options)) {
    throw new Error("You switched between providing registration options and not providing them, which is not supported.");
  }
  if (options == null) {
    return useSimpleI18n(manager);
  } else {
    return useComplexI18n(options, manager);
  }
}
function useComplexI18n({
  id,
  fallback,
  translations
}, manager) {
  const managerRef = import_react4.default.useRef(null);
  const unsubscribeRef = import_react4.default.useRef(noop2);
  const parentIds = import_react4.default.useContext(I18nIdsContext);
  const ids = useLazyRef(() => id ? [id, ...parentIds] : parentIds);
  if (manager !== managerRef.current) {
    managerRef.current = manager;
    unsubscribeRef.current();
    unsubscribeRef.current = manager.subscribe(ids.current, ({
      translations: translations2,
      loading
    }, details) => {
      const newI18n = new I18n(translations2, {
        ...details,
        loading
      });
      i18nRef.current = newI18n;
      setI18n(newI18n);
    });
    if (id && (translations || fallback)) {
      manager.register({
        id,
        translations,
        fallback
      });
    }
  }
  const [i18n, setI18n] = import_react4.default.useState(() => {
    const managerState = manager.state(ids.current);
    const {
      translations: translations2,
      loading
    } = managerState;
    return new I18n(translations2, {
      ...manager.details,
      loading
    });
  });
  const i18nRef = import_react4.default.useRef(i18n);
  import_react4.default.useEffect(() => {
    return unsubscribeRef.current;
  }, []);
  const shareTranslationsComponent = useLazyRef(() => function ShareTranslations({
    children
  }) {
    return /* @__PURE__ */ import_react4.default.createElement(I18nIdsContext.Provider, {
      value: ids.current
    }, /* @__PURE__ */ import_react4.default.createElement(I18nParentContext.Provider, {
      value: i18nRef.current
    }, children));
  });
  return [i18n, shareTranslationsComponent.current];
}
function useSimpleI18n(manager) {
  const i18n = import_react4.default.useContext(I18nParentContext) || new I18n([], manager.details);
  return [i18n, IdentityComponent];
}
function IdentityComponent({
  children
}) {
  return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, children);
}
function shouldRegister({
  fallback,
  translations
} = {}) {
  return fallback != null || translations != null;
}
function noop2() {
}

// .yalc/@shopify/discount-app-components/build/esm/utilities/dates.js
var import_lodash = __toESM(require_lodash());
var getDateTimeInShopTimeZone = (date, ianaTimezone) => applyTimeZoneOffset(new Date(date), getIanaTimeZone(), ianaTimezone);
var getDateInShopTimeZone = (date, ianaTimezone) => applyTimeZoneOffset(date, getIanaTimeZone(), ianaTimezone);
var getDateInUTC = (date, ianaTimezone) => applyTimeZoneOffset(date, ianaTimezone, getIanaTimeZone());
var getBrowserAndShopTimeZoneOffset = (0, import_lodash.memoize)((ianaTimezone) => {
  const browserTimeZone = getIanaTimeZone();
  const timeZoneOffsetMinutes = getTimeZoneOffset(/* @__PURE__ */ new Date(), browserTimeZone, ianaTimezone);
  return timeZoneOffsetMinutes / 60;
});
var getNewDateAtStartOfDay = (date) => {
  const newDate = new Date(date.getTime());
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};
var getNewDateAtEndOfDay = (date) => {
  const newDate = new Date(date.getTime());
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

// .yalc/@shopify/discount-app-components/build/esm/components/DatePicker/DatePicker.js
var import_react5 = __toESM(require_react());

// node_modules/d3-time/src/interval.js
var t0 = /* @__PURE__ */ new Date();
var t1 = /* @__PURE__ */ new Date();
function newInterval(floori, offseti, count, field) {
  function interval(date) {
    return floori(date = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date)), date;
  }
  interval.floor = function(date) {
    return floori(date = /* @__PURE__ */ new Date(+date)), date;
  };
  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };
  interval.round = function(date) {
    var d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };
  interval.offset = function(date, step) {
    return offseti(date = /* @__PURE__ */ new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };
  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0))
      return range;
    do
      range.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };
  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date)
        while (floori(date), !test(date))
          date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0)
          while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {
            }
          }
        else
          while (--step >= 0) {
            while (offseti(date, 1), !test(date)) {
            }
          }
      }
    });
  };
  if (count) {
    interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };
    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
        return field(d) % step === 0;
      } : function(d) {
        return interval.count(0, d) % step === 0;
      });
    };
  }
  return interval;
}

// node_modules/d3-time/src/duration.js
var durationMinute = 6e4;
var durationDay = 864e5;
var durationWeek = 6048e5;

// node_modules/d3-time/src/day.js
var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
}, function(date) {
  return date.getDate() - 1;
});
var day_default = day;
var days = day.range;

// node_modules/d3-time/src/week.js
function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

// node_modules/d3-time/src/year.js
var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
var year_default = year;
var years = year.range;

// node_modules/d3-time/src/utcDay.js
var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});
var utcDay_default = utcDay;
var utcDays = utcDay.range;

// node_modules/d3-time/src/utcWeek.js
function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek;
  });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

// node_modules/d3-time/src/utcYear.js
var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
var utcYear_default = utcYear;
var utcYears = utcYear.range;

// node_modules/d3-time-format/src/locale.js
function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newYear(y) {
  return { y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale2) {
  var locale_dateTime = locale2.dateTime, locale_date = locale2.date, locale_time = locale2.time, locale_periods = locale2.periods, locale_weekdays = locale2.days, locale_shortWeekdays = locale2.shortDays, locale_months = locale2.months, locale_shortMonths = locale2.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date) {
      var string = [], i = -1, j = 0, n = specifier.length, c, pad2, format;
      if (!(date instanceof Date))
        date = /* @__PURE__ */ new Date(+date);
      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad2 = pads[c = specifier.charAt(++i)]) != null)
            c = specifier.charAt(++i);
          else
            pad2 = c === "e" ? " " : "0";
          if (format = formats2[c])
            c = format(date, pad2);
          string.push(c);
          j = i + 1;
        }
      }
      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }
  function newParse(specifier, newDate) {
    return function(string) {
      var d = newYear(1900), i = parseSpecifier(d, specifier, string += "", 0), week, day2;
      if (i != string.length)
        return null;
      if ("Q" in d)
        return new Date(d.Q);
      if ("p" in d)
        d.H = d.H % 12 + d.p * 12;
      if ("V" in d) {
        if (d.V < 1 || d.V > 53)
          return null;
        if (!("w" in d))
          d.w = 1;
        if ("Z" in d) {
          week = utcDate(newYear(d.y)), day2 = week.getUTCDay();
          week = day2 > 4 || day2 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay_default.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = newDate(newYear(d.y)), day2 = week.getDay();
          week = day2 > 4 || day2 === 0 ? monday.ceil(week) : monday(week);
          week = day_default.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d))
          d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day2 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day2 + 5) % 7 : d.w + d.U * 7 - (day2 + 6) % 7;
      }
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }
      return newDate(d);
    };
  }
  function parseSpecifier(d, specifier, string, j) {
    var i = 0, n = specifier.length, m = string.length, c, parse;
    while (i < n) {
      if (j >= m)
        return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || (j = parse(d, string, j)) < 0)
          return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }
  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }
  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }
  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }
  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }
  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }
  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }
  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }
  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }
  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }
  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }
  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }
  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }
  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }
  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", localDate);
      p.toString = function() {
        return specifier;
      };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() {
        return specifier;
      };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier, utcDate);
      p.toString = function() {
        return specifier;
      };
      return p;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" };
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s) {
  return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n)
    map[names[i].toLowerCase()] = i;
  return map;
}
function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1e3), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0] * 1e3, i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
  return pad(1 + day_default.count(year_default(d), d), p, 3);
}
function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
  var day2 = d.getDay();
  return day2 === 0 ? 7 : day2;
}
function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year_default(d), d), p, 2);
}
function formatWeekNumberISO(d, p) {
  var day2 = d.getDay();
  d = day2 >= 4 || day2 === 0 ? thursday(d) : thursday.ceil(d);
  return pad(thursday.count(year_default(d), d) + (year_default(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
  return d.getDay();
}
function formatWeekNumberMonday(d, p) {
  return pad(monday.count(year_default(d), d), p, 2);
}
function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
  return pad(d.getFullYear() % 1e4, p, 4);
}
function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay_default.count(utcYear_default(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear_default(d), d), p, 2);
}
function formatUTCWeekNumberISO(d, p) {
  var day2 = d.getUTCDay();
  d = day2 >= 4 || day2 === 0 ? utcThursday(d) : utcThursday.ceil(d);
  return pad(utcThursday.count(utcYear_default(d), d) + (utcYear_default(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear_default(d), d), p, 2);
}
function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 1e4, p, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d) {
  return +d;
}
function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1e3);
}

// node_modules/d3-time-format/src/defaultLocale.js
var locale;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  timeFormat = locale.format;
  timeParse = locale.parse;
  utcFormat = locale.utcFormat;
  utcParse = locale.utcParse;
  return locale;
}

// node_modules/d3-time-format/src/isoFormat.js
var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";
function formatIsoNative(date) {
  return date.toISOString();
}
var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

// node_modules/d3-time-format/src/isoParse.js
function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}
var parseIso = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

// .yalc/@shopify/discount-app-components/build/esm/components/DatePicker/DatePicker.js
var DATE_BLOCKLIST_REGEX = /[^\d-]/g;
var VALID_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;
function DatePicker2({
  date,
  label,
  labelHidden = false,
  disabled = false,
  disableDatesBefore,
  weekStartsOn = DEFAULT_WEEK_START_DAY
}) {
  const [i18n] = useI18n();
  const ianaTimezone = i18n.defaultTimezone;
  const selectedDate = getDateTimeInShopTimeZone(date.value, ianaTimezone);
  const localeFormattedDate = getFormattedDate(selectedDate);
  const [datePickerView, setDatePickerView] = (0, import_react5.useState)({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear()
  });
  const [userInput, setUserInput] = (0, import_react5.useState)(localeFormattedDate);
  const [error, setError] = (0, import_react5.useState)();
  const [isActive, setIsActive] = (0, import_react5.useState)(false);
  const disableDatesBeforeInShopTZAtStartOfDay = (0, import_react5.useMemo)(() => {
    return disableDatesBefore ? getNewDateAtStartOfDay(getDateTimeInShopTimeZone(disableDatesBefore, ianaTimezone)) : void 0;
  }, [disableDatesBefore, ianaTimezone]);
  (0, import_react5.useEffect)(() => {
    const selectedDate2 = getDateTimeInShopTimeZone(date.value, ianaTimezone);
    setDatePickerView({
      month: selectedDate2.getMonth(),
      year: selectedDate2.getFullYear()
    });
    setUserInput(getFormattedDate(selectedDate2));
  }, [date.value, ianaTimezone]);
  const handleMonthChange = (month, year2) => {
    setDatePickerView({
      month,
      year: year2
    });
  };
  const handleTextFieldChange = (inputValue) => setUserInput(inputValue.replace(DATE_BLOCKLIST_REGEX, ""));
  const handleTextFieldBlur = () => {
    var _date$onBlur;
    if (userInput === localeFormattedDate) {
      return;
    }
    setError(null);
    if (userInput === "") {
      setUserInput(localeFormattedDate);
    } else if (isValidDateString(userInput)) {
      const newDate = timeParse("%Y-%m-%d")(userInput);
      const hasDisabledDatesAndInputIsAfterDisabledDate = disableDatesBeforeInShopTZAtStartOfDay && newDate >= disableDatesBeforeInShopTZAtStartOfDay;
      if (!disableDatesBeforeInShopTZAtStartOfDay || hasDisabledDatesAndInputIsAfterDisabledDate) {
        setDatePickerView({
          month: newDate.getMonth(),
          year: newDate.getFullYear()
        });
        handleDateChange(getDateTimeInShopTimeZone(date.value, ianaTimezone), newDate, date.onChange, ianaTimezone);
      } else {
        setUserInput(localeFormattedDate);
      }
    } else {
      setError(i18n.translate("DiscountAppComponents.DatePicker.dateFormatError"));
    }
    (_date$onBlur = date.onBlur) === null || _date$onBlur === void 0 ? void 0 : _date$onBlur.call(date);
  };
  const handleDatePickerChange = (value) => {
    const formattedDate = getFormattedDate(value.start);
    setError(null);
    setUserInput(formattedDate);
    setIsActive(false);
    setDatePickerView({
      month: value.start.getMonth(),
      year: value.start.getFullYear()
    });
    handleDateChange(getDateTimeInShopTimeZone(date.value, ianaTimezone), value.start, date.onChange, ianaTimezone);
  };
  return /* @__PURE__ */ import_react5.default.createElement(Popover, {
    activator: /* @__PURE__ */ import_react5.default.createElement(TextField, {
      value: userInput,
      label,
      labelHidden,
      prefix: /* @__PURE__ */ import_react5.default.createElement(Icon, {
        source: SvgCalendarMajor,
        color: "subdued"
      }),
      placeholder: i18n.translate("DiscountAppComponents.DatePicker.datePlaceholder"),
      error: date.error || error || false,
      autoComplete: "off",
      onFocus: () => setIsActive(true),
      onChange: handleTextFieldChange,
      onBlur: handleTextFieldBlur,
      disabled
    }),
    active: isActive,
    onClose: () => setIsActive(false),
    autofocusTarget: "none",
    sectioned: true
  }, /* @__PURE__ */ import_react5.default.createElement(DatePicker, {
    month: datePickerView.month,
    year: datePickerView.year,
    disableDatesBefore: disableDatesBeforeInShopTZAtStartOfDay,
    weekStartsOn,
    onMonthChange: handleMonthChange,
    selected: selectedDate,
    onChange: handleDatePickerChange
  }));
}
function isValidDateString(date) {
  if (!date) {
    return false;
  }
  return VALID_DATE_REGEX.test(date) && !isNaN(new Date(date).getTime());
}
var getFormattedDate = (selectedDate) => timeFormat("%Y-%m-%d")(selectedDate);
var handleDateChange = (oldDate, newDate, onChange, ianaTimezone) => {
  newDate.setHours(oldDate.getHours(), oldDate.getMinutes(), oldDate.getSeconds(), oldDate.getMilliseconds());
  if (oldDate.getTime() !== newDate.getTime()) {
    onChange(getDateInUTC(newDate, ianaTimezone).toISOString());
  }
};

// .yalc/@shopify/discount-app-components/build/esm/components/TimePicker/TimePicker.js
var import_react6 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/components/TimePicker/utilities.js
var TIME_INCREMENT = 30;
var USER_INPUT_TIME_REGEX = /^(\d{1,2})[:\s]?(\d{1,2})?[:-\s]?(?:\d{1,2})?(\s?[APap][Mm])?/;
function generateTimes(startDate, disableTimesBefore) {
  if (disableTimesBefore && isSameDay(startDate, disableTimesBefore)) {
    const nowMinutes = disableTimesBefore.getMinutes();
    const startDateWithCurrentTime = new Date(startDate.getTime());
    startDateWithCurrentTime.setHours(disableTimesBefore.getHours(), nowMinutes);
    const timeNotAlreadyInList = nowMinutes !== 0 && nowMinutes !== TIME_INCREMENT;
    return [...timeNotAlreadyInList ? [startDateWithCurrentTime] : [], ...buildTimeListForDate(startDateWithCurrentTime)];
  }
  const startDateAtStartOfDay = new Date(startDate.getTime());
  startDateAtStartOfDay.setHours(0, 0, 0, 0);
  return buildTimeListForDate(startDateAtStartOfDay);
}
function buildTimeListForDate(date) {
  const timeList = [];
  const dayDate = date.getDate();
  const nextDate = roundDateTimeForDisplay(new Date(date.getTime()));
  while (nextDate.getDate() === dayDate) {
    timeList.push(new Date(nextDate.getTime()));
    nextDate.setMinutes(nextDate.getMinutes() + TIME_INCREMENT);
  }
  return timeList;
}
function roundDateTimeForDisplay(date) {
  const dateMinutes = date.getMinutes();
  if (dateMinutes === 0) {
    return date;
  }
  const nextDate = new Date(date.getTime());
  if (dateMinutes > 30) {
    nextDate.setHours(date.getHours() + 1);
    nextDate.setMinutes(0);
  } else {
    nextDate.setMinutes(30);
  }
  return nextDate;
}
function isValidTime(time) {
  if (!time) {
    return false;
  }
  const [, hours = "", minutes = "", period = "", rest] = time.split(USER_INPUT_TIME_REGEX);
  const isInvalid = hours && Number(hours) > 24 || minutes && Number(minutes) > 59 || period && Number(hours) > 12 || rest;
  return !isInvalid && USER_INPUT_TIME_REGEX.test(time);
}
function formatDateListAsOptionList(dates, locale2, ianaTimezone) {
  return dates.map((date) => ({
    value: applyTimeZoneOffset(date, ianaTimezone).toISOString(),
    label: getLocalizedTimeForDate(date, locale2)
  }));
}
function getLocalizedTimeForDate(date, locale2) {
  return formatDate(date, locale2, {
    hour: "numeric",
    minute: "numeric"
  });
}
function getValidDateForTime(timeInput, forDate, ianaTimezone) {
  if (isValidTime(timeInput)) {
    const nextDate = new Date(forDate.getTime());
    const [, hours = "", minutes = "", period = ""] = timeInput.split(USER_INPUT_TIME_REGEX);
    nextDate.setHours(buildNextDateHour(hours, period, getBrowserAndShopTimeZoneOffset(ianaTimezone)), Number(minutes));
    return nextDate;
  }
  return null;
}
function buildNextDateHour(hours, period, browserAndShopTimeZoneOffset) {
  const formattedPeriod = period.toLowerCase();
  const numberHours = Number(hours);
  const hoursWithTimeZoneOffset = numberHours + browserAndShopTimeZoneOffset;
  if (formattedPeriod === "pm" && numberHours !== 12) {
    return hoursWithTimeZoneOffset + 12;
  }
  if (formattedPeriod === "am" && numberHours === 12) {
    return hoursWithTimeZoneOffset - 12;
  }
  return hoursWithTimeZoneOffset;
}

// .yalc/@shopify/discount-app-components/build/esm/components/TimePicker/TimePicker.js
var TIME_BLOCKLIST_REGEX = /[^\d\s:apmAPM]/g;
function TimePicker({
  label,
  labelHidden = false,
  time,
  disabled = false,
  disableTimesBefore
}) {
  const [i18n] = useI18n();
  const ianaTimezone = i18n.defaultTimezone;
  const locale2 = i18n.locale;
  const selectedDate = getDateTimeInShopTimeZone(time.value, ianaTimezone);
  const localeFormattedTime = getLocalizedTimeForDate(selectedDate, locale2);
  const [userInput, setUserInput] = (0, import_react6.useState)(localeFormattedTime);
  const disableTimesBeforeInShopTZ = (0, import_react6.useMemo)(() => {
    return disableTimesBefore ? getDateTimeInShopTimeZone(disableTimesBefore, ianaTimezone) : void 0;
  }, [disableTimesBefore, ianaTimezone]);
  const options = (0, import_react6.useMemo)(() => formatDateListAsOptionList(generateTimes(selectedDate, disableTimesBeforeInShopTZ), locale2, ianaTimezone), [selectedDate, disableTimesBeforeInShopTZ, locale2, ianaTimezone]);
  (0, import_react6.useEffect)(() => {
    setUserInput(localeFormattedTime);
  }, [localeFormattedTime]);
  const handleTextFieldChange = (inputValue) => setUserInput(inputValue.replace(TIME_BLOCKLIST_REGEX, ""));
  const handleTextFieldBlur = () => {
    var _time$onBlur;
    if (userInput === localeFormattedTime) {
      return;
    }
    const requestedNewTime = getValidDateForTime(userInput, selectedDate, ianaTimezone);
    const userInputInShopTimeZone = requestedNewTime && getDateInShopTimeZone(requestedNewTime, ianaTimezone);
    const hasDisabledTimesAndInputIsAfterDisabledTime = userInputInShopTimeZone && disableTimesBeforeInShopTZ && userInputInShopTimeZone >= disableTimesBeforeInShopTZ;
    if (requestedNewTime && (!disableTimesBeforeInShopTZ || hasDisabledTimesAndInputIsAfterDisabledTime)) {
      time.onChange(requestedNewTime.toISOString());
    } else {
      setUserInput(localeFormattedTime);
    }
    (_time$onBlur = time.onBlur) === null || _time$onBlur === void 0 ? void 0 : _time$onBlur.call(time);
  };
  return /* @__PURE__ */ import_react6.default.createElement(Autocomplete, {
    options,
    selected: [time.value],
    onSelect: (selected) => time.onChange(selected[0]),
    textField: /* @__PURE__ */ import_react6.default.createElement(Autocomplete.TextField, {
      label,
      labelHidden,
      prefix: /* @__PURE__ */ import_react6.default.createElement(Icon, {
        source: SvgClockMinor,
        color: "subdued"
      }),
      placeholder: i18n.translate("DiscountAppComponents.TimePicker.timePlaceholder"),
      autoComplete: "off",
      error: time.error,
      onBlur: handleTextFieldBlur,
      onChange: handleTextFieldChange,
      value: userInput,
      disabled
    })
  });
}

// .yalc/@shopify/discount-app-components/build/esm/components/ActiveDatesCard/ActiveDatesCard.js
function ActiveDatesCard({
  startDate,
  endDate,
  timezoneAbbreviation,
  weekStartsOn = DEFAULT_WEEK_START_DAY,
  disabled
}) {
  const [i18n] = useI18n();
  const nowInUTC = /* @__PURE__ */ new Date();
  const ianaTimezone = i18n.defaultTimezone;
  const showEndDate = Boolean(endDate.value);
  const handleStartDateTimeChange = (nextStart) => {
    startDate.onChange(nextStart);
    if (endDate.value) {
      const nextEndDate = getValidEndDateTime(nextStart, endDate.value, ianaTimezone);
      if (nextEndDate !== endDate.value) {
        endDate.onChange(nextEndDate);
      }
    }
  };
  const handleEndDateTimeChange = (requestedEndDate) => {
    const nextEndDate = getValidEndDateTime(startDate.value, requestedEndDate, ianaTimezone);
    endDate.onChange(nextEndDate);
  };
  const handleShowEndDateChange = () => {
    if (showEndDate) {
      endDate.onChange(null);
    } else {
      const startDateInShopTZ = getDateTimeInShopTimeZone(startDate.value, ianaTimezone);
      const endDateAtEndOfDay = getDateInUTC(getNewDateAtEndOfDay(startDateInShopTZ), ianaTimezone);
      endDate.onChange(endDateAtEndOfDay.toISOString());
    }
  };
  const endDateIsStartDate = endDate.value && isSameDay(new Date(endDate.value), new Date(startDate.value));
  const disableEndDatesBefore = getEndDatePickerDisableDatesBefore(nowInUTC, new Date(startDate.value));
  return /* @__PURE__ */ import_react7.default.createElement(LegacyCard, {
    title: i18n.translate("DiscountAppComponents.ActiveDatesCard.title"),
    sectioned: true
  }, /* @__PURE__ */ import_react7.default.createElement(FormLayout, null, /* @__PURE__ */ import_react7.default.createElement(FormLayout.Group, null, /* @__PURE__ */ import_react7.default.createElement(DatePicker2, {
    date: {
      ...startDate,
      onChange: handleStartDateTimeChange
    },
    weekStartsOn,
    disabled,
    label: i18n.translate("DiscountAppComponents.ActiveDatesCard.startDate"),
    disableDatesBefore: nowInUTC.toISOString()
  }), /* @__PURE__ */ import_react7.default.createElement(TimePicker, {
    time: {
      ...startDate,
      onChange: handleStartDateTimeChange
    },
    disabled,
    label: i18n.translate("DiscountAppComponents.ActiveDatesCard.startTime", {
      timezoneAbbreviation
    }),
    disableTimesBefore: nowInUTC.toISOString()
  })), /* @__PURE__ */ import_react7.default.createElement(FormLayout.Group, null, /* @__PURE__ */ import_react7.default.createElement(Checkbox, {
    label: i18n.translate("DiscountAppComponents.ActiveDatesCard.setEndDate"),
    checked: showEndDate,
    disabled,
    onChange: handleShowEndDateChange
  })), showEndDate && endDate.value && /* @__PURE__ */ import_react7.default.createElement(FormLayout.Group, null, /* @__PURE__ */ import_react7.default.createElement(DatePicker2, {
    date: {
      ...endDate,
      onChange: handleEndDateTimeChange,
      error: endDateIsStartDate ? void 0 : endDate.error
    },
    weekStartsOn,
    disabled,
    label: i18n.translate("DiscountAppComponents.ActiveDatesCard.endDate"),
    disableDatesBefore: disableEndDatesBefore.toISOString()
  }), /* @__PURE__ */ import_react7.default.createElement(TimePicker, {
    time: {
      ...endDate,
      onChange: handleEndDateTimeChange,
      error: endDateIsStartDate ? endDate.error : void 0
    },
    disabled,
    label: i18n.translate("DiscountAppComponents.ActiveDatesCard.endTime", {
      timezoneAbbreviation
    }),
    disableTimesBefore: disableEndDatesBefore.toISOString()
  }))));
}
function getEndDatePickerDisableDatesBefore(now, startDate) {
  return now > startDate ? now : startDate;
}
function getValidEndDateTime(startDateTime, endDateTime, ianaTimezone) {
  const startDate = getDateTimeInShopTimeZone(startDateTime, ianaTimezone);
  const endDate = getDateTimeInShopTimeZone(endDateTime, ianaTimezone);
  return startDate >= endDate ? getDateInUTC(getNewDateAtEndOfDay(startDate), ianaTimezone).toISOString() : endDateTime;
}

// .yalc/@shopify/discount-app-components/build/esm/components/CombinationCard/CombinationCard.js
var import_react9 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/components/CombinationCard/components/HelpText/HelpText.js
var import_react8 = __toESM(require_react());
var import_app_bridge_react = __toESM(require_app_bridge_react());
var import_actions2 = __toESM(require_actions5());
var import_Modal = __toESM(require_Modal2());
var DISCOUNT_COMBINATION_MODAL_APP_BRIDGE_URL = "shopify://app-bridge/modal/discounts-combinations";
function HelpText({
  currentDiscountClass,
  targetDiscountClass,
  currentDiscountId,
  count,
  currentDiscountName
}) {
  const buttonWrapperRef = (0, import_react8.useRef)(null);
  const [i18n] = useI18n();
  const app = (0, import_app_bridge_react.useAppBridge)();
  const myModal = import_actions2.Modal.create(app, {
    url: DISCOUNT_COMBINATION_MODAL_APP_BRIDGE_URL
  });
  const productCombinesWithProduct = currentDiscountClass === DiscountClass.Product && targetDiscountClass === DiscountClass.Product;
  const targetDiscountClassLabel = targetDiscountClass.toLocaleLowerCase();
  const scope = `DiscountAppComponents.CombinationCard.HelpText`;
  const handleModalOpen = () => {
    myModal.dispatch(import_Modal.Action.DATA, {
      discountOptions: {
        currentDiscountName,
        currentDiscountClass,
        currentDiscountId,
        targetDiscountClass
      }
    });
    myModal.dispatch(import_actions2.Modal.Action.OPEN);
    const closeUnsubscribe = myModal.subscribe(import_actions2.Modal.Action.CLOSE, () => {
      var _buttonWrapperRef$cur, _buttonWrapperRef$cur2;
      (_buttonWrapperRef$cur = buttonWrapperRef.current) === null || _buttonWrapperRef$cur === void 0 ? void 0 : (_buttonWrapperRef$cur2 = _buttonWrapperRef$cur.getElementsByTagName("button")[0]) === null || _buttonWrapperRef$cur2 === void 0 ? void 0 : _buttonWrapperRef$cur2.focus();
      closeUnsubscribe();
    });
  };
  return count > 0 ? /* @__PURE__ */ import_react8.default.createElement(LegacyStack, {
    spacing: "none",
    vertical: true
  }, /* @__PURE__ */ import_react8.default.createElement(Text, {
    as: "span",
    color: "subdued"
  }, i18n.translate("combinations.info", {
    scope
  }, {
    count,
    discountCountLink: /* @__PURE__ */ import_react8.default.createElement("span", {
      ref: buttonWrapperRef
    }, /* @__PURE__ */ import_react8.default.createElement(Button, {
      onClick: handleModalOpen,
      plain: true
    }, i18n.translate(`combinations.counts.${productCombinesWithProduct ? "productOther" : targetDiscountClassLabel}`, {
      scope
    }, {
      count
    })))
  })), productCombinesWithProduct && /* @__PURE__ */ import_react8.default.createElement(Text, {
    as: "span",
    color: "subdued"
  }, i18n.translate("combinations.multipleEligibleDiscounts", {
    scope
  }))) : /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement(Text, {
    as: "span",
    color: "subdued"
  }, i18n.translate("title", {
    scope: `${scope}.emptyState.${currentDiscountClass.toLowerCase()}`
  }), " ", i18n.translate(`warning.with${currentDiscountClass.toLowerCase()}`, {
    scope: `${scope}.emptyState.${currentDiscountClass.toLowerCase()}`
  }), " ", /* @__PURE__ */ import_react8.default.createElement(Link, {
    url: `https://help.shopify.com/${i18n.locale}/manual/discounts/combining-discounts`,
    external: true
  }, i18n.translate(`${scope}.emptyState.link`))));
}

// .yalc/@shopify/discount-app-components/build/esm/components/CombinationCard/CombinationCard.js
var I18N_SCOPE = {
  scope: "DiscountAppComponents.CombinationCard"
};
function CombinationCard({
  discountClass,
  discountDescriptor,
  combinableDiscountTypes,
  combinableDiscountCounts,
  discountId
}) {
  const [i18n] = useI18n();
  const handleDiscountCombinesWithChange = (selectedChoices) => {
    combinableDiscountTypes.onChange({
      orderDiscounts: selectedChoices.includes(DiscountClass.Order),
      productDiscounts: selectedChoices.includes(DiscountClass.Product),
      shippingDiscounts: selectedChoices.includes(DiscountClass.Shipping)
    });
  };
  const trimmedDescriptor = discountDescriptor.trim();
  return /* @__PURE__ */ import_react9.default.createElement(LegacyCard, {
    title: i18n.translate("title", I18N_SCOPE),
    sectioned: true
  }, /* @__PURE__ */ import_react9.default.createElement(LegacyStack, {
    vertical: true,
    spacing: "baseTight"
  }, /* @__PURE__ */ import_react9.default.createElement("p", null, trimmedDescriptor ? /* @__PURE__ */ import_react9.default.createElement(import_react9.default.Fragment, null, /* @__PURE__ */ import_react9.default.createElement(Text, {
    as: "span",
    fontWeight: "semibold"
  }, trimmedDescriptor), " ", i18n.translate("discountNameFilled", I18N_SCOPE)) : i18n.translate("discountNameNotFilled", I18N_SCOPE, {
    discountClass: i18n.translate(`discountClass.${discountClass.toLowerCase()}`, I18N_SCOPE)
  })), /* @__PURE__ */ import_react9.default.createElement(ChoiceList, {
    title: i18n.translate("combinesWith", I18N_SCOPE),
    titleHidden: true,
    allowMultiple: true,
    choices: buildChoices({
      discountClass,
      discountId,
      discountDescriptor,
      i18n,
      combinableDiscountCounts
    }),
    selected: getSelectedChoices(combinableDiscountTypes.value),
    onChange: handleDiscountCombinesWithChange
  })));
}
function buildChoices({
  discountClass: currentDiscountClass,
  combinableDiscountCounts,
  discountId: currentDiscountId,
  discountDescriptor,
  i18n
}) {
  const hasCounts = typeof combinableDiscountCounts !== "undefined";
  const productOption = {
    label: currentDiscountClass === DiscountClass.Product ? i18n.translate("options.productLabelOther", I18N_SCOPE) : i18n.translate("options.productLabel", I18N_SCOPE),
    value: DiscountClass.Product,
    renderChildren: (isSelected) => isSelected && hasCounts ? /* @__PURE__ */ import_react9.default.createElement(HelpText, {
      currentDiscountClass,
      targetDiscountClass: DiscountClass.Product,
      count: getActualCombiningDiscountsCount(combinableDiscountCounts.productDiscountsCount, currentDiscountClass === DiscountClass.Product, currentDiscountId),
      currentDiscountId,
      currentDiscountName: discountDescriptor
    }) : null
  };
  const orderOption = {
    label: i18n.translate("options.orderLabel", I18N_SCOPE),
    value: DiscountClass.Order,
    renderChildren: (isSelected) => isSelected && hasCounts ? /* @__PURE__ */ import_react9.default.createElement(HelpText, {
      currentDiscountClass,
      targetDiscountClass: DiscountClass.Order,
      count: getActualCombiningDiscountsCount(combinableDiscountCounts.orderDiscountsCount, currentDiscountClass === DiscountClass.Order, currentDiscountId),
      currentDiscountId,
      currentDiscountName: discountDescriptor
    }) : null
  };
  const shippingOption = {
    label: i18n.translate("options.shippingLabel", I18N_SCOPE),
    value: DiscountClass.Shipping,
    renderChildren: (isSelected) => isSelected && hasCounts ? /* @__PURE__ */ import_react9.default.createElement(HelpText, {
      currentDiscountClass,
      targetDiscountClass: DiscountClass.Shipping,
      count: getActualCombiningDiscountsCount(combinableDiscountCounts.shippingDiscountsCount, currentDiscountClass === DiscountClass.Shipping, currentDiscountId),
      currentDiscountId,
      currentDiscountName: discountDescriptor
    }) : null
  };
  switch (currentDiscountClass) {
    case DiscountClass.Product:
      return [productOption, shippingOption];
    case DiscountClass.Order:
      return [shippingOption];
    case DiscountClass.Shipping:
      return [productOption, orderOption];
    default:
      return [{
        label: "",
        value: ""
      }];
  }
}
function getActualCombiningDiscountsCount(numCombinableDiscountsForClass, discountClassesMatch, currentDiscountId) {
  if (discountClassesMatch && Boolean(currentDiscountId)) {
    return numCombinableDiscountsForClass - 1;
  }
  return numCombinableDiscountsForClass;
}
var getSelectedChoices = (combinableDiscountTypes) => [...combinableDiscountTypes.productDiscounts ? [DiscountClass.Product] : [], ...combinableDiscountTypes.orderDiscounts ? [DiscountClass.Order] : [], ...combinableDiscountTypes.shippingDiscounts ? [DiscountClass.Shipping] : []];

// .yalc/@shopify/discount-app-components/build/esm/components/MethodCard/MethodCard.js
var import_react11 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/components/DiscountCodeGenerator/DiscountCodeGenerator.js
var import_react10 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/components/DiscountCodeGenerator/utilities.js
var CHARS = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
var generateRandomDiscountCode = (length = DEFAULT_DISCOUNT_CODE_LENGTH) => {
  if (length < 1) {
    throw new Error("Discount code length must be greater than 0");
  }
  return [...Array(length)].map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
};

// .yalc/@shopify/discount-app-components/build/esm/components/DiscountCodeGenerator/DiscountCodeGenerator.js
function DiscountCodeGenerator({
  discountCode,
  defaultLength = DEFAULT_DISCOUNT_CODE_LENGTH
}) {
  const [i18n] = useI18n();
  const handleGenerateDiscount = () => discountCode.onChange(generateRandomDiscountCode(defaultLength));
  return /* @__PURE__ */ import_react10.default.createElement(TextField, Object.assign({
    autoComplete: "off",
    label: i18n.translate("DiscountAppComponents.DiscountCodeGenerator.field.label"),
    helpText: i18n.translate("DiscountAppComponents.DiscountCodeGenerator.field.helpText")
  }, discountCode, {
    connectedRight: /* @__PURE__ */ import_react10.default.createElement(Button, {
      onClick: handleGenerateDiscount
    }, i18n.translate("DiscountAppComponents.DiscountCodeGenerator.buttonText"))
  }));
}

// .yalc/@shopify/discount-app-components/build/esm/components/MethodCard/MethodCard.js
var DISCOUNT_TITLE_MAX_LENGTH = 255;
function MethodCard({
  title,
  discountClass,
  discountMethod,
  discountMethodHidden,
  discountTitle,
  discountCode,
  defaultDiscountCodeLength = DEFAULT_DISCOUNT_CODE_LENGTH
}) {
  const [i18n] = useI18n();
  const handleChangeMethod = (methods) => {
    discountMethod.onChange(methods[0]);
  };
  return /* @__PURE__ */ import_react11.default.createElement(LegacyCard, null, /* @__PURE__ */ import_react11.default.createElement(LegacyCard.Section, null, /* @__PURE__ */ import_react11.default.createElement(LegacyStack, {
    distribution: "equalSpacing",
    alignment: "center"
  }, /* @__PURE__ */ import_react11.default.createElement(Text, {
    variant: "headingMd",
    as: "h2"
  }, title), /* @__PURE__ */ import_react11.default.createElement(Text, {
    as: "span",
    color: "subdued"
  }, getDiscountClassLabel(discountClass, i18n)))), /* @__PURE__ */ import_react11.default.createElement(LegacyCard.Section, {
    title: !discountMethodHidden && i18n.translate("DiscountAppComponents.MethodCard.methodSubtitle")
  }, /* @__PURE__ */ import_react11.default.createElement(LegacyStack, {
    vertical: true
  }, !discountMethodHidden && /* @__PURE__ */ import_react11.default.createElement(ChoiceList, {
    title: i18n.translate("DiscountAppComponents.MethodCard.choiceList.title"),
    titleHidden: true,
    choices: [{
      value: DiscountMethod.Code,
      label: i18n.translate("DiscountAppComponents.MethodCard.choiceList.code")
    }, {
      value: DiscountMethod.Automatic,
      label: i18n.translate("DiscountAppComponents.MethodCard.choiceList.automatic")
    }],
    selected: [discountMethod.value],
    onChange: handleChangeMethod
  }), discountMethod.value === DiscountMethod.Code ? /* @__PURE__ */ import_react11.default.createElement(DiscountCodeGenerator, {
    defaultLength: defaultDiscountCodeLength,
    discountCode
  }) : /* @__PURE__ */ import_react11.default.createElement(TextField, Object.assign({
    autoComplete: "off",
    label: i18n.translate("DiscountAppComponents.MethodCard.discountField.label"),
    helpText: i18n.translate("DiscountAppComponents.MethodCard.discountField.helpText"),
    maxLength: DISCOUNT_TITLE_MAX_LENGTH
  }, discountTitle)))));
}
var getDiscountClassLabel = (discountClass, i18n) => {
  switch (discountClass) {
    case DiscountClass.Order:
      return i18n.translate("DiscountAppComponents.MethodCard.discountClassLabel.order");
    case DiscountClass.Product:
      return i18n.translate("DiscountAppComponents.MethodCard.discountClassLabel.product");
    case DiscountClass.Shipping:
      return i18n.translate("DiscountAppComponents.MethodCard.discountClassLabel.shipping");
    default:
      return "";
  }
};

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/SummaryCard.js
var import_react24 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/Header/Header.js
var import_react12 = __toESM(require_react());
var BadgeStatus = /* @__PURE__ */ function(BadgeStatus2) {
  BadgeStatus2["Success"] = "success";
  BadgeStatus2["Attention"] = "attention";
  return BadgeStatus2;
}({});
var I18N_SCOPE2 = {
  scope: "DiscountAppComponents.SummaryCard.Header"
};
function Header(props) {
  const {
    discountMethod,
    discountDescriptor
  } = props;
  const [i18n] = useI18n();
  const trimmedDescriptor = discountDescriptor.trim();
  return /* @__PURE__ */ import_react12.default.createElement(LegacyStack, {
    vertical: true,
    spacing: "loose"
  }, trimmedDescriptor ? /* @__PURE__ */ import_react12.default.createElement(LegacyStack, {
    distribution: "equalSpacing",
    alignment: "center",
    wrap: true
  }, /* @__PURE__ */ import_react12.default.createElement(Text, {
    variant: "headingMd",
    as: "h3"
  }, trimmedDescriptor), isEditing(props) && renderBadgeForStatus(props.discountStatus, i18n)) : /* @__PURE__ */ import_react12.default.createElement(Text, {
    as: "span",
    fontWeight: "semibold",
    color: "subdued"
  }, i18n.translate(`emptyState.${discountMethod}`, I18N_SCOPE2)), /* @__PURE__ */ import_react12.default.createElement(LegacyStack, {
    vertical: true,
    spacing: "tight"
  }, /* @__PURE__ */ import_react12.default.createElement(Text, {
    variant: "headingXs",
    as: "h3"
  }, i18n.translate("typeAndMethod", I18N_SCOPE2)), /* @__PURE__ */ import_react12.default.createElement(List, {
    type: "bullet"
  }, /* @__PURE__ */ import_react12.default.createElement(List.Item, null, props.appDiscountType), /* @__PURE__ */ import_react12.default.createElement(List.Item, null, i18n.translate(`discountMethod.${discountMethod}`, I18N_SCOPE2)))));
}
function renderBadgeForStatus(status, i18n) {
  switch (status) {
    case DiscountStatus.Active:
      return /* @__PURE__ */ import_react12.default.createElement(Badge, {
        status: BadgeStatus.Success
      }, i18n.translate("badge.active", I18N_SCOPE2));
    case DiscountStatus.Expired:
      return /* @__PURE__ */ import_react12.default.createElement(Badge, null, i18n.translate("badge.expired", I18N_SCOPE2));
    case DiscountStatus.Scheduled:
      return /* @__PURE__ */ import_react12.default.createElement(Badge, {
        status: BadgeStatus.Attention
      }, i18n.translate("badge.scheduled", I18N_SCOPE2));
    default:
      return null;
  }
}
function isEditing(props) {
  return Boolean(props.isEditing);
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/AppliesToPurchaseType/AppliesToPurchaseType.js
var import_react13 = __toESM(require_react());
var I18N_SCOPE3 = {
  scope: "DiscountAppComponents.SummaryCard.AppliesToPurchaseType"
};
function AppliesToPurchaseType({
  purchaseType
}) {
  const [i18n] = useI18n();
  return /* @__PURE__ */ import_react13.default.createElement(List.Item, null, getPurchaseTypeSummary(purchaseType, i18n));
}
var getPurchaseTypeSummary = (purchaseType, i18n) => {
  switch (purchaseType) {
    case PurchaseType.OneTimePurchase:
      return i18n.translate("appliesToPurchaseTypeOneTime", I18N_SCOPE3);
    case PurchaseType.Subscription:
      return i18n.translate("appliesToPurchaseTypeSubscription", I18N_SCOPE3);
    case PurchaseType.Both:
      return i18n.translate("appliesToPurchaseTypeBoth", I18N_SCOPE3);
  }
};

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/RecurringPayment/RecurringPayment.js
var import_react14 = __toESM(require_react());
var I18N_SCOPE4 = {
  scope: "DiscountAppComponents.SummaryCard.RecurringPayment"
};
function RecurringPayment({
  isRecurring,
  recurringPaymentType,
  recurringPaymentLimit
}) {
  const [i18n] = useI18n();
  if (!isRecurring) {
    return null;
  }
  switch (recurringPaymentType) {
    case RecurringPaymentType.MultiplePayments:
      return recurringPaymentLimit !== null && recurringPaymentLimit !== void 0 && recurringPaymentLimit.length ? /* @__PURE__ */ import_react14.default.createElement(List.Item, null, i18n.translate("subscriptionRecurringPayments", I18N_SCOPE4, {
        count: Number(recurringPaymentLimit)
      })) : null;
    case RecurringPaymentType.AllPayments:
      return /* @__PURE__ */ import_react14.default.createElement(List.Item, null, i18n.translate("subscriptionRecurringPayments.none", I18N_SCOPE4));
    case RecurringPaymentType.FirstPayment:
      return /* @__PURE__ */ import_react14.default.createElement(List.Item, null, i18n.translate("subscriptionRecurringPayments", I18N_SCOPE4, {
        count: 1
      }));
    default:
      return null;
  }
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/SelectedCountries/SelectedCountries.js
var import_react15 = __toESM(require_react());
var I18N_SCOPE5 = {
  scope: "DiscountAppComponents.SummaryCard.SelectedCountries"
};
function SelectedCountries({
  countrySelectionType,
  selectedCountries
}) {
  const [i18n] = useI18n();
  if (countrySelectionType === CountrySelectionType.SelectedCountries && selectedCountries.length === 0) {
    return null;
  }
  if (countrySelectionType === CountrySelectionType.AllCountries) {
    return /* @__PURE__ */ import_react15.default.createElement(List.Item, null, i18n.translate("forAllCountries", I18N_SCOPE5));
  }
  return selectedCountries.length === 1 ? /* @__PURE__ */ import_react15.default.createElement(List.Item, null, i18n.translate("forSpecificCountry", I18N_SCOPE5, {
    countryName: i18n.translate(selectedCountries[0], {
      scope: "DiscountAppComponents.Countries"
    })
  })) : /* @__PURE__ */ import_react15.default.createElement(List.Item, null, i18n.translate("forNumberOfCountries", I18N_SCOPE5, {
    numberOfCountries: selectedCountries.length
  }));
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/MaximumShippingPrice/MaximumShippingPrice.js
var import_react16 = __toESM(require_react());
function MaximumShippingPrice({
  maximumShippingPrice,
  currencyCode
}) {
  const [i18n] = useI18n();
  const priceAsNumber = Number(maximumShippingPrice);
  const validatedPrice = isNaN(priceAsNumber) ? "" : i18n.formatCurrency(priceAsNumber, {
    currency: currencyCode
  });
  if (priceAsNumber <= 0 || validatedPrice.length < 1) {
    return null;
  }
  return /* @__PURE__ */ import_react16.default.createElement(List.Item, null, i18n.translate("DiscountAppComponents.SummaryCard.RatesExclusion.forShippingRatesUnder", {
    value: validatedPrice
  }));
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/MinimumRequirements/MinimumRequirements.js
var import_react17 = __toESM(require_react());
var I18N_SCOPE6 = {
  scope: "DiscountAppComponents.SummaryCard.MinimumRequirements"
};
function MinimumRequirements({
  requirementType,
  quantity,
  subtotal,
  currencyCode
}) {
  const [i18n] = useI18n();
  switch (requirementType) {
    case RequirementType.None:
      return /* @__PURE__ */ import_react17.default.createElement(List.Item, null, i18n.translate("noMinimumPurchaseRequirement", I18N_SCOPE6));
    case RequirementType.Subtotal:
      const validSubtotal = getValidSubtotal(i18n, currencyCode, subtotal);
      return validSubtotal ? /* @__PURE__ */ import_react17.default.createElement(List.Item, null, i18n.translate("minimumPurchaseSubtotal", I18N_SCOPE6, {
        subtotal: validSubtotal
      })) : null;
    case RequirementType.Quantity:
      return isValidQuantity(quantity) ? /* @__PURE__ */ import_react17.default.createElement(List.Item, null, i18n.translate("minimumPurchaseQuantity", I18N_SCOPE6, {
        count: Number(quantity)
      })) : null;
    default:
      return null;
  }
}
function getValidSubtotal(i18n, currencyCode, subtotal) {
  if (subtotal === void 0 || currencyCode === void 0) {
    return null;
  }
  const subtotalNumber = Number(subtotal);
  const validatedSubtotal = isNaN(subtotalNumber) ? "" : i18n.formatCurrency(Math.abs(subtotalNumber), {
    currency: currencyCode
  });
  if (subtotal.length > 0 && subtotalNumber > 0 && validatedSubtotal.length > 0) {
    return validatedSubtotal;
  }
  return null;
}
function isValidQuantity(quantity) {
  if (quantity === void 0) {
    return false;
  }
  const quantityNumber = Number(quantity);
  const validatedQuantity = isNaN(quantityNumber) ? "" : Math.abs(quantityNumber).toString();
  return quantity.length > 0 && quantityNumber > 0 && validatedQuantity.length > 0;
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/CustomerEligibility/CustomerEligibility.js
var import_react18 = __toESM(require_react());
var I18N_SCOPE7 = {
  scope: "DiscountAppComponents.SummaryCard.CustomerEligibility"
};
function CustomerEligibility({
  eligibility,
  selectedCustomerSegments,
  selectedCustomers
}) {
  const [i18n] = useI18n();
  switch (eligibility) {
    case Eligibility.Everyone:
      return /* @__PURE__ */ import_react18.default.createElement(List.Item, null, i18n.translate("allCustomers", I18N_SCOPE7));
    case Eligibility.Customers:
      return selectedCustomers !== null && selectedCustomers !== void 0 && selectedCustomers.length ? /* @__PURE__ */ import_react18.default.createElement(List.Item, null, i18n.translate("customers", I18N_SCOPE7, {
        customerName: selectedCustomers[0].displayName,
        count: selectedCustomers.length
      })) : null;
    case Eligibility.CustomerSegments:
      return selectedCustomerSegments !== null && selectedCustomerSegments !== void 0 && selectedCustomerSegments.length ? /* @__PURE__ */ import_react18.default.createElement(List.Item, null, i18n.translate("customerSegments", I18N_SCOPE7, {
        segmentName: selectedCustomerSegments[0].name,
        count: selectedCustomerSegments.length
      })) : null;
    default:
      return null;
  }
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/UsageLimits/UsageLimits.js
var import_react19 = __toESM(require_react());
var I18N_SCOPE8 = {
  scope: "DiscountAppComponents.SummaryCard.UsageLimits"
};
function UsageLimits({
  totalUsageLimit,
  oncePerCustomer
}) {
  const [i18n] = useI18n();
  return /* @__PURE__ */ import_react19.default.createElement(List.Item, null, getUsageSummary(totalUsageLimit, oncePerCustomer, i18n));
}
var getUsageSummary = (totalUsageLimit, oncePerCustomer, i18n) => {
  const hasValidUsageLimit = totalUsageLimit !== null && totalUsageLimit.length > 0;
  if (hasValidUsageLimit) {
    return i18n.translate(oncePerCustomer ? "totalUsageLimitWithOneUsePerCustomer" : "totalUsageLimit", I18N_SCOPE8, {
      count: Number(totalUsageLimit)
    });
  } else if (oncePerCustomer) {
    return i18n.translate("oneUsePerCustomer", I18N_SCOPE8);
  } else {
    return i18n.translate("noUsageLimits", I18N_SCOPE8);
  }
};

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/Combinations/Combinations.js
var import_react20 = __toESM(require_react());
var I18N_SCOPE9 = {
  scope: "DiscountAppComponents.SummaryCard.Combinations"
};
function Combinations({
  combinesWith
}) {
  const [i18n] = useI18n();
  const combinations = [...combinesWith.productDiscounts ? [DiscountClass.Product] : [], ...combinesWith.orderDiscounts ? [DiscountClass.Order] : [], ...combinesWith.shippingDiscounts ? [DiscountClass.Shipping] : []];
  return /* @__PURE__ */ import_react20.default.createElement(List.Item, null, getContent(combinations, i18n));
}
function getContent(combinations, i18n) {
  switch (combinations.length) {
    case 0:
      return i18n.translate("cannotCombine", I18N_SCOPE9);
    case 1:
      return i18n.translate(`combinesWithOne.${combinations[0].toLowerCase()}`, I18N_SCOPE9);
    case 2:
      return i18n.translate(`combinesWithTwo.${combinations[0].toLowerCase()}And${capitalizeFirstLetter(combinations[1].toLowerCase())}`, I18N_SCOPE9);
    default:
      return "";
  }
}
function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/ActiveDates/ActiveDates.js
var import_react21 = __toESM(require_react());
var I18N_SCOPE10 = {
  scope: "DiscountAppComponents.SummaryCard.ActiveDates"
};
function ActiveDates({
  startDate,
  endDate
}) {
  const [i18n] = useI18n();
  return /* @__PURE__ */ import_react21.default.createElement(List.Item, null, getDateSummary(startDate, endDate, i18n));
}
var getDateSummary = (startDate, endDate, i18n) => {
  const ianaTimezone = i18n.defaultTimezone;
  const startDateAsDate = new Date(startDate);
  const startsAtIsToday = isToday(startDateAsDate, ianaTimezone);
  if (!endDate || startDate === endDate) {
    const date = startsAtIsToday ? i18n.translate("today", I18N_SCOPE10) : formatDateForSummary(startDateAsDate, i18n);
    return i18n.translate("activeFromDate", I18N_SCOPE10, {
      date
    });
  }
  const endDateAsDate = new Date(endDate);
  const endsAtIsToday = isToday(endDateAsDate, ianaTimezone);
  if (isSameDay(startDateAsDate, endDateAsDate, ianaTimezone)) {
    const date = startsAtIsToday ? i18n.translate("today", I18N_SCOPE10) : formatDateForSummary(startDateAsDate, i18n);
    return i18n.translate("activeSingleDate", I18N_SCOPE10, {
      date
    });
  } else if (startsAtIsToday) {
    return i18n.translate("activeFromTodayUntilDate", I18N_SCOPE10, {
      date: formatDateForSummary(endDateAsDate, i18n)
    });
  } else if (endsAtIsToday) {
    return i18n.translate("activeFromDateUntilToday", I18N_SCOPE10, {
      date: formatDateForSummary(startDateAsDate, i18n)
    });
  } else {
    return i18n.translate("activeFromDateToDate", I18N_SCOPE10, {
      startDate: formatDateForSummary(startDateAsDate, i18n),
      endDate: formatDateForSummary(endDateAsDate, i18n)
    });
  }
};
var DATE_FORMATS = {
  sameYear: {
    month: "short",
    day: "numeric"
  },
  differentYear: {
    month: "short",
    day: "numeric",
    year: "numeric"
  }
};
function formatDateForSummary(date, i18n) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return date.getFullYear() === currentYear ? i18n.formatDate(date, DATE_FORMATS.sameYear) : i18n.formatDate(date, DATE_FORMATS.differentYear);
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/Performance/Performance.js
var import_react23 = __toESM(require_react());
var import_actions4 = __toESM(require_actions5());

// .yalc/@shopify/discount-app-components/build/esm/components/AppBridgeLink/AppBridgeLink.js
var import_react22 = __toESM(require_react());
var import_app_bridge_react2 = __toESM(require_app_bridge_react());
var import_actions3 = __toESM(require_actions5());
var AppBridgeLink = ({
  children,
  ...rest
}) => {
  const app = (0, import_app_bridge_react2.useAppBridge)();
  const redirect = import_actions3.Redirect.create(app);
  return /* @__PURE__ */ import_react22.default.createElement(Link, Object.assign({
    onClick: () => handleRedirect({
      redirect,
      ...rest
    })
  }, rest), children);
};

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/components/Performance/Performance.js
var CODE_DISCOUNT_ADMIN_REPORT_URL = `/reports/sales_by_discount`;
var I18N_SCOPE11 = {
  scope: "DiscountAppComponents.SummaryCard.Performance"
};
function Performance({
  isEditing: isEditing2,
  status,
  totalSales,
  hasReports,
  discountMethod,
  usageCount
}) {
  const [i18n] = useI18n();
  const isActiveOrExpired = status === DiscountStatus.Active || status === DiscountStatus.Expired;
  return /* @__PURE__ */ import_react23.default.createElement(LegacyCard.Section, {
    title: i18n.translate("title", I18N_SCOPE11)
  }, /* @__PURE__ */ import_react23.default.createElement(VerticalStack, null, (isEditing2 || status === DiscountStatus.Scheduled) && /* @__PURE__ */ import_react23.default.createElement(Text, {
    as: "span",
    color: "subdued"
  }, i18n.translate("notActive", I18N_SCOPE11)), isActiveOrExpired && /* @__PURE__ */ import_react23.default.createElement(import_react23.default.Fragment, null, /* @__PURE__ */ import_react23.default.createElement(List, {
    type: "bullet"
  }, /* @__PURE__ */ import_react23.default.createElement(List.Item, null, i18n.translate("usageCount", I18N_SCOPE11, {
    usageCount
  })), totalSales && /* @__PURE__ */ import_react23.default.createElement(List.Item, null, i18n.translate("totalSales", I18N_SCOPE11, {
    totalSales: i18n.formatCurrency(Number(totalSales.amount), {
      currency: totalSales.currencyCode
    })
  }))), hasReports && discountMethod === DiscountMethod.Code && /* @__PURE__ */ import_react23.default.createElement("p", null, /* @__PURE__ */ import_react23.default.createElement(AppBridgeLink, {
    action: import_actions4.Redirect.Action.ADMIN_PATH,
    url: CODE_DISCOUNT_ADMIN_REPORT_URL
  }, i18n.translate("performanceLink", I18N_SCOPE11))))));
}

// .yalc/@shopify/discount-app-components/build/esm/components/SummaryCard/SummaryCard.js
var OptionalSection = /* @__PURE__ */ function(OptionalSection2) {
  OptionalSection2["activeDates"] = "activeDates";
  OptionalSection2["additionalDetails"] = "additionalDetails";
  OptionalSection2["appliesToPurchaseType"] = "appliesToPurchaseType";
  OptionalSection2["combinations"] = "combinations";
  OptionalSection2["customerEligibility"] = "customerEligibility";
  OptionalSection2["maximumShippingPrice"] = "maximumShippingPrice";
  OptionalSection2["minimumRequirements"] = "minimumRequirements";
  OptionalSection2["recurringPayment"] = "recurringPayment";
  OptionalSection2["selectedCountries"] = "selectedCountries";
  OptionalSection2["usageLimits"] = "usageLimits";
  return OptionalSection2;
}(OptionalSection || {});
var I18N_SCOPE12 = {
  scope: "DiscountAppComponents.SummaryCard"
};
function SummaryCard(props) {
  var _props$additionalDeta;
  const [i18n] = useI18n();
  const showDetailsSection = Object.values(OptionalSection).some((section) => props[section]);
  return /* @__PURE__ */ import_react24.default.createElement(LegacyCard, {
    subdued: true,
    title: i18n.translate("title", I18N_SCOPE12)
  }, /* @__PURE__ */ import_react24.default.createElement(LegacyCard.Section, null, /* @__PURE__ */ import_react24.default.createElement(LegacyStack, {
    vertical: true,
    spacing: "loose"
  }, /* @__PURE__ */ import_react24.default.createElement(Header, props.header), showDetailsSection && /* @__PURE__ */ import_react24.default.createElement(LegacyStack, {
    vertical: true,
    spacing: "tight"
  }, /* @__PURE__ */ import_react24.default.createElement(Text, {
    variant: "headingXs",
    as: "h3"
  }, i18n.translate("details", I18N_SCOPE12)), /* @__PURE__ */ import_react24.default.createElement(List, {
    type: "bullet"
  }, (_props$additionalDeta = props.additionalDetails) === null || _props$additionalDeta === void 0 ? void 0 : _props$additionalDeta.map((detail) => /* @__PURE__ */ import_react24.default.createElement(List.Item, {
    key: detail.replace(/\s/g, "-")
  }, detail)), props.appliesToPurchaseType && /* @__PURE__ */ import_react24.default.createElement(AppliesToPurchaseType, props.appliesToPurchaseType), props.recurringPayment && /* @__PURE__ */ import_react24.default.createElement(RecurringPayment, props.recurringPayment), props.selectedCountries && /* @__PURE__ */ import_react24.default.createElement(SelectedCountries, props.selectedCountries), props.maximumShippingPrice && /* @__PURE__ */ import_react24.default.createElement(MaximumShippingPrice, props.maximumShippingPrice), props.minimumRequirements && /* @__PURE__ */ import_react24.default.createElement(MinimumRequirements, props.minimumRequirements), props.customerEligibility && /* @__PURE__ */ import_react24.default.createElement(CustomerEligibility, props.customerEligibility), props.usageLimits && /* @__PURE__ */ import_react24.default.createElement(UsageLimits, props.usageLimits), props.combinations && /* @__PURE__ */ import_react24.default.createElement(Combinations, props.combinations), props.activeDates && /* @__PURE__ */ import_react24.default.createElement(ActiveDates, props.activeDates))))), /* @__PURE__ */ import_react24.default.createElement(Performance, props.performance));
}

// .yalc/@shopify/discount-app-components/build/esm/components/UsageLimitsCard/UsageLimitsCard.js
var import_react26 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/components/UsageLimitsCard/UsageLimitsCard.scss.js
var styles = {
  "TotalUsageLimitTextField": "DiscountAppComponents-UsageLimitsCard__TotalUsageLimitTextField"
};

// .yalc/@shopify/discount-app-components/build/esm/utilities/numbers.js
function forcePositiveInteger(value) {
  return value.replace(/\D+/g, "");
}

// .yalc/@shopify/discount-app-components/build/esm/components/UsageLimitsCard/components/RecurringPayment/RecurringPayment.js
var import_react25 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/components/UsageLimitsCard/components/RecurringPayment/RecurringPayment.scss.js
var styles2 = {
  "RecurringPaymentTextField": "DiscountAppComponents-UsageLimitsCard-RecurringPayment__RecurringPaymentTextField"
};

// .yalc/@shopify/discount-app-components/build/esm/components/UsageLimitsCard/components/RecurringPayment/RecurringPayment.js
var RECURRING_PAYMENT_FIELD_ID = "RECURRING_PAYMENT_FIELD_ID";
function RecurringPayment2({
  recurringPaymentType,
  recurringPaymentLimit
}) {
  const [i18n] = useI18n();
  const choices = [{
    label: i18n.translate("DiscountAppComponents.RecurringPayment.firstPayment"),
    value: RecurringPaymentType.FirstPayment
  }, {
    label: i18n.translate("DiscountAppComponents.RecurringPayment.multiplePayments"),
    value: RecurringPaymentType.MultiplePayments,
    renderChildren: (isSelected) => {
      return isSelected && /* @__PURE__ */ import_react25.default.createElement(LegacyStack, {
        vertical: true,
        spacing: "extraTight"
      }, /* @__PURE__ */ import_react25.default.createElement("div", {
        className: styles2.RecurringPaymentTextField
      }, /* @__PURE__ */ import_react25.default.createElement(TextField, {
        id: RECURRING_PAYMENT_FIELD_ID,
        label: i18n.translate("DiscountAppComponents.RecurringPayment.multiplePayments"),
        labelHidden: true,
        value: recurringPaymentLimit.value,
        autoComplete: "off",
        onChange: (nextValue) => {
          recurringPaymentLimit.onChange(forcePositiveInteger(nextValue));
        },
        onBlur: recurringPaymentLimit.onBlur,
        error: Boolean(recurringPaymentLimit.error)
      })), /* @__PURE__ */ import_react25.default.createElement(Text, {
        as: "span",
        color: "subdued"
      }, i18n.translate("DiscountAppComponents.RecurringPayment.includesFirstPayment")), recurringPaymentLimit.error && /* @__PURE__ */ import_react25.default.createElement(InlineError, {
        fieldID: RECURRING_PAYMENT_FIELD_ID,
        message: recurringPaymentLimit.error
      }));
    }
  }, {
    label: i18n.translate("DiscountAppComponents.RecurringPayment.allPayments"),
    value: RecurringPaymentType.AllPayments
  }];
  return /* @__PURE__ */ import_react25.default.createElement(VerticalStack, null, /* @__PURE__ */ import_react25.default.createElement(Text, {
    variant: "headingXs",
    as: "h3"
  }, i18n.translate("DiscountAppComponents.RecurringPayment.title")), /* @__PURE__ */ import_react25.default.createElement(ChoiceList, {
    title: i18n.translate("DiscountAppComponents.RecurringPayment.options"),
    titleHidden: true,
    selected: [recurringPaymentType.value],
    choices,
    onChange: (paymentChoice) => recurringPaymentType.onChange(paymentChoice[0])
  }));
}

// .yalc/@shopify/discount-app-components/build/esm/components/UsageLimitsCard/UsageLimitsCard.js
var UsageLimitType = /* @__PURE__ */ function(UsageLimitType2) {
  UsageLimitType2["TotalUsageLimit"] = "TOTAL_USAGE_LIMIT";
  UsageLimitType2["OncePerCustomerLimit"] = "ONCE_PER_CUSTOMER_LIMIT";
  return UsageLimitType2;
}({});
var DISCOUNT_TOTAL_USAGE_LIMIT_FIELD = "totalUsageLimit";
function UsageLimitsCard(props) {
  const {
    totalUsageLimit,
    oncePerCustomer,
    isRecurring
  } = props;
  const [showUsageLimit, setShowUsageLimit] = (0, import_react26.useState)(totalUsageLimit.value !== null);
  const [i18n] = useI18n();
  (0, import_react26.useEffect)(() => setShowUsageLimit(totalUsageLimit.value !== null), [totalUsageLimit.value]);
  const handleUsageLimitsChoicesChange = (selectedUsageLimitTypes) => {
    const newOncePerCustomer = selectedUsageLimitTypes.includes(UsageLimitType.OncePerCustomerLimit);
    if (!selectedUsageLimitTypes.includes(UsageLimitType.TotalUsageLimit)) {
      totalUsageLimit.onChange(null);
    } else if (totalUsageLimit.value === null) {
      totalUsageLimit.onChange("");
    }
    newOncePerCustomer !== oncePerCustomer.value && oncePerCustomer.onChange(newOncePerCustomer);
  };
  return /* @__PURE__ */ import_react26.default.createElement(LegacyCard, {
    title: i18n.translate("DiscountAppComponents.UsageLimitsCard.title")
  }, /* @__PURE__ */ import_react26.default.createElement(LegacyCard.Section, null, /* @__PURE__ */ import_react26.default.createElement(ChoiceList, {
    title: i18n.translate("DiscountAppComponents.UsageLimitsCard.options"),
    titleHidden: true,
    allowMultiple: true,
    selected: [...showUsageLimit ? [UsageLimitType.TotalUsageLimit] : [], ...oncePerCustomer.value ? [UsageLimitType.OncePerCustomerLimit] : []],
    choices: [{
      label: i18n.translate("DiscountAppComponents.UsageLimitsCard.totalUsageLimitLabel"),
      value: UsageLimitType.TotalUsageLimit,
      renderChildren: (isSelected) => /* @__PURE__ */ import_react26.default.createElement(LegacyStack, {
        vertical: true,
        spacing: "extraTight"
      }, isSelected && /* @__PURE__ */ import_react26.default.createElement("div", {
        className: styles.TotalUsageLimitTextField
      }, /* @__PURE__ */ import_react26.default.createElement(TextField, {
        id: DISCOUNT_TOTAL_USAGE_LIMIT_FIELD,
        label: i18n.translate("DiscountAppComponents.UsageLimitsCard.totalUsageLimitLabel"),
        autoComplete: "off",
        labelHidden: true,
        value: totalUsageLimit.value || "",
        onChange: (nextValue) => {
          totalUsageLimit.onChange(forcePositiveInteger(nextValue));
        },
        onBlur: totalUsageLimit.onBlur,
        error: Boolean(totalUsageLimit.error)
      })), isRecurring && /* @__PURE__ */ import_react26.default.createElement(Text, {
        as: "span",
        color: "subdued"
      }, i18n.translate("DiscountAppComponents.UsageLimitsCard.totalUsageLimitHelpTextSubscription")), isSelected && totalUsageLimit.error && /* @__PURE__ */ import_react26.default.createElement(InlineError, {
        fieldID: DISCOUNT_TOTAL_USAGE_LIMIT_FIELD,
        message: totalUsageLimit.error
      }))
    }, {
      label: i18n.translate("DiscountAppComponents.UsageLimitsCard.oncePerCustomerLimitLabel"),
      value: UsageLimitType.OncePerCustomerLimit
    }],
    onChange: handleUsageLimitsChoicesChange
  })), isShowRecurringPaymentSection(props) && /* @__PURE__ */ import_react26.default.createElement(LegacyCard.Section, null, /* @__PURE__ */ import_react26.default.createElement(RecurringPayment2, {
    recurringPaymentType: props.recurringPaymentType,
    recurringPaymentLimit: props.recurringPaymentLimit
  })));
}
function isShowRecurringPaymentSection(props) {
  return Boolean(props.isRecurring);
}

// .yalc/@shopify/discount-app-components/build/esm/components/AppProvider/AppProvider.js
var import_react28 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/components/AppProvider/components/DiscountsI18nProvider/DiscountsI18nProvider.js
var import_react27 = __toESM(require_react());

// .yalc/@shopify/discount-app-components/build/esm/_virtual/en.json.js
var DiscountAppComponents = { ActiveDatesCard: { title: "Active dates", startDate: "Start date", startTime: "Start time ({timezoneAbbreviation})", endDate: "End date", endTime: "End time ({timezoneAbbreviation})", setEndDate: "Set end date" }, CustomerEligibilityCard: { title: "Customer eligibility", everyone: "All customers", customerSegments: "Specific customer segments", customers: "Specific customers" }, TimePicker: { timePlaceholder: "Enter time" }, DatePicker: { datePlaceholder: "YYYY-MM-DD", dateFormatError: "Date should be formatted YYYY-MM-DD" }, MethodCard: { methodSubtitle: "Method", choiceList: { title: "Select method options", code: "Discount code", automatic: "Automatic discount" }, discountClassLabel: { product: "Product discount", order: "Order discount", shipping: "Shipping discount" }, discountField: { label: "Title", helpText: "Customers will see this in their cart and at checkout." } }, DiscountCodeGenerator: { field: { label: "Discount code", helpText: "Customers must enter this code at checkout." }, buttonText: "Generate" }, UsageLimitsCard: { title: "Maximum discount uses", options: "Usage limit options", totalUsageLimitLabel: "Limit number of times this discount can be used in total", oncePerCustomerLimitLabel: "Limit to one use per customer", totalUsageLimitHelpTextSubscription: "A subscription with many payments will count as one use." }, RecurringPayment: { title: "Recurring payments for subscriptions", options: "Recurring payments options", firstPayment: "Limit discount to the first payment", multiplePayments: "Limit discount to multiple recurring payments", allPayments: "Discount applies to all recurring payments", includesFirstPayment: "Includes payment on first order." }, MinimumRequirementsCard: { title: "Minimum purchase requirements", none: "No minimum requirements", minimumSubtotal: "Minimum purchase amount ({currencySymbol})", minimumQuantity: "Minimum quantity of items", subscriptions: { appliesToCollections: "Applies only to subscription products in selected collections.", appliesToProducts: "Applies only to selected subscription products.", appliesToAllProducts: "Applies only to subscription products." }, oneTime: { appliesToCollections: "Applies only to selected collections.", appliesToProducts: "Applies only to selected products.", appliesToAllProducts: "Applies to all products." } }, CountriesAndRatesCard: { title: "Countries", choiceList: { title: "Countries and rates", all: "All countries", selected: "Specific countries" }, excludeShippingRatesSection: { title: "Shipping rates", checkboxLabel: "Exclude shipping rates over a certain amount" } }, PurchaseTypeList: { title: "Purchase type", choiceList: { title: "Purchase type", oneTimePurchase: "One-time purchase", subscription: "Subscription", both: "Both" } }, CombinationCard: { title: "Combinations", combinesWith: "Combines with", newBadge: "New", discountNameFilled: "can be combined with:", discountNameNotFilled: "This {discountClass} discount can be combined with:", options: { productLabelOther: "Other product discounts", productLabel: "Product discounts", orderLabel: "Order discounts", shippingLabel: "Shipping discounts" }, discountClass: { product: "product", order: "order", shipping: "shipping" }, HelpText: { emptyState: { product: { title: "No product discounts are currently set to combine.", warning: { withproduct: "To let customers use more than one discount, set up at least one product discount that combines with product discounts.", withorder: "To let customers use more than one discount, set up at least one product discount that combines with order discounts.", withshipping: "To let customers use more than one discount, set up at least one product discount that combines with shipping discounts." } }, order: { title: "No order discounts are currently set to combine.", warning: { withproduct: "To let customers use more than one discount, set up at least one order discount that combines with product discounts.", withorder: "To let customers use more than one discount, set up at least one order discount that combines with order discounts.", withshipping: "To let customers use more than one discount, set up at least one order discount that combines with shipping discounts." } }, shipping: { title: "No shipping discounts are currently set to combine.", warning: { withproduct: "To let customers use more than one discount, set up at least one shipping discount that combines with product discounts.", withorder: "To let customers use more than one discount, set up at least one shipping discount that combines with order discounts.", withshipping: "To let customers use more than one discount, set up at least one shipping discount that combines with shipping discounts." } }, link: "Learn more" }, combinations: { info: { one: "{discountCountLink} is currently set to combine.", other: "{discountCountLink} are currently set to combine." }, multipleEligibleDiscounts: "If an item is eligible for multiple discounts, only the largest discount will apply.", counts: { product: { one: "{count} product discount", other: "{count} product discounts" }, productOther: { one: "{count} other product discount", other: "{count} other product discounts" }, order: { one: "{count} order discount", other: "{count} order discounts" }, shipping: { one: "{count} shipping discount", other: "{count} shipping discounts" } } } } }, SummaryCard: { title: "Summary", details: "details", Header: { emptyState: { Code: "No discount code yet.", Automatic: "No title yet." }, badge: { active: "Active", expired: "Expired", scheduled: "Scheduled" }, typeAndMethod: "type and method", discountMethod: { Code: "Code", Automatic: "Automatic" } }, AppliesToPurchaseType: { appliesToPurchaseTypeSubscription: "Applies to subscription purchases", appliesToPurchaseTypeOneTime: "Applies to one-time purchases", appliesToPurchaseTypeBoth: "Applies to subscriptions and one-time purchases" }, ActiveDates: { today: "today", activeSingleDate: "Active {date}", activeFromDate: "Active from {date}", activeFromDateUntilToday: "Active from {date} until today", activeFromTodayUntilDate: "Active from today until {date}", activeFromDateToDate: "Active from {startDate} to {endDate}" }, AvailableOnPos: { availableOnCheckoutAndPos: "Available on online sales channels and Point of Sale", availableOnCheckoutOnly: "Available on online sales channels" }, Combinations: { cannotCombine: "Can't combine with other discounts", combinesWithOne: { product: "Combines with product discounts", order: "Combines with order discounts", shipping: "Combines with shipping discounts" }, combinesWithTwo: { productAndOrder: "Combines with product and order discounts", productAndShipping: "Combines with product and shipping discounts", orderAndShipping: "Combines with order and shipping discounts" } }, CustomerEligibility: { allCustomers: "All customers", customers: { one: "For {customerName}", other: "For {count} customers" }, customerSegments: { one: "For {segmentName}", other: "For {count} customer segments" } }, MinimumRequirements: { minimumPurchaseSubtotal: "Minimum purchase of {subtotal}", minimumPurchaseQuantity: { one: "Minimum purchase of {count} item", other: "Minimum purchase of {count} items" }, noMinimumPurchaseRequirement: "No minimum purchase requirement" }, Performance: { title: "Performance", notActive: "Discount is not active yet.", performanceLink: "View the sales by discount report", usageCount: "{usageCount} used", totalSales: "{totalSales} in total sales" }, RatesExclusion: { forShippingRatesUnder: "Applies to shipping rates under {value}" }, RecurringPayment: { subscriptionRecurringPayments: { none: "For all recurring payments", one: "Limited to {count} recurring payment", other: "Limited to {count} recurring payments" } }, SelectedCountries: { forAllCountries: "For all countries", forSpecificCountry: "For {countryName}", forNumberOfCountries: "For {numberOfCountries} countries" }, UsageLimits: { oneUsePerCustomer: "One use per customer", totalUsageLimit: { one: "Limit of {count} use", other: "Limit of {count} uses" }, totalUsageLimitWithOneUsePerCustomer: { one: "Limit of {count} use, one per customer", other: "Limit of {count} uses, one per customer" }, noUsageLimits: "No usage limits" } }, Countries: { AC: "Ascension Island", AD: "Andorra", AE: "United Arab Emirates", AF: "Afghanistan", AG: "Antigua & Barbuda", AI: "Anguilla", AL: "Albania", AM: "Armenia", AN: "Netherlands Antilles", AO: "Angola", AQ: "Antarctica", AR: "Argentina", AS: "American Samoa", AT: "Austria", AU: "Australia", AW: "Aruba", AX: "\xC5land Islands", AZ: "Azerbaijan", BA: "Bosnia & Herzegovina", BB: "Barbados", BD: "Bangladesh", BE: "Belgium", BF: "Burkina Faso", BG: "Bulgaria", BH: "Bahrain", BI: "Burundi", BJ: "Benin", BL: "St. Barth\xE9lemy", BM: "Bermuda", BN: "Brunei", BO: "Bolivia", BQ: "Caribbean Netherlands", BR: "Brazil", BS: "Bahamas", BT: "Bhutan", BV: "Bouvet Island", BW: "Botswana", BY: "Belarus", BZ: "Belize", CA: "Canada", CC: "Cocos (Keeling) Islands", CD: "Congo - Kinshasa", CF: "Central African Republic", CG: "Congo - Brazzaville", CH: "Switzerland", CI: "C\xF4te d\u2019Ivoire", CK: "Cook Islands", CL: "Chile", CM: "Cameroon", CN: "China", CO: "Colombia", CP: "Clipperton Island", CR: "Costa Rica", CU: "Cuba", CV: "Cape Verde", CW: "Cura\xE7ao", CX: "Christmas Island", CY: "Cyprus", CZ: "Czech Republic", DE: "Germany", DG: "Diego Garcia", DJ: "Djibouti", DK: "Denmark", DM: "Dominica", DO: "Dominican Republic", DZ: "Algeria", EA: "Ceuta & Melilla", EC: "Ecuador", EE: "Estonia", EG: "Egypt", EH: "Western Sahara", ER: "Eritrea", ES: "Spain", ET: "Ethiopia", EU: "European Union", FI: "Finland", FJ: "Fiji", FK: "Falkland Islands", FM: "Micronesia", FO: "Faroe Islands", FR: "France", GA: "Gabon", GB: "United Kingdom", GD: "Grenada", GE: "Georgia", GF: "French Guiana", GG: "Guernsey", GH: "Ghana", GI: "Gibraltar", GL: "Greenland", GM: "Gambia", GN: "Guinea", GP: "Guadeloupe", GQ: "Equatorial Guinea", GR: "Greece", GS: "South Georgia & South Sandwich Islands", GT: "Guatemala", GU: "Guam", GW: "Guinea-Bissau", GY: "Guyana", HK: "Hong Kong SAR China", HM: "Heard & McDonald Islands", HN: "Honduras", HR: "Croatia", HT: "Haiti", HU: "Hungary", IC: "Canary Islands", ID: "Indonesia", IE: "Ireland", IL: "Israel", IM: "Isle of Man", IN: "India", IO: "British Indian Ocean Territory", IQ: "Iraq", IR: "Iran", IS: "Iceland", IT: "Italy", JE: "Jersey", JM: "Jamaica", JO: "Jordan", JP: "Japan", KE: "Kenya", KG: "Kyrgyzstan", KH: "Cambodia", KI: "Kiribati", KM: "Comoros", KN: "St. Kitts & Nevis", KP: "North Korea", KR: "South Korea", KW: "Kuwait", KY: "Cayman Islands", KZ: "Kazakhstan", LA: "Laos", LB: "Lebanon", LC: "St. Lucia", LI: "Liechtenstein", LK: "Sri Lanka", LR: "Liberia", LS: "Lesotho", LT: "Lithuania", LU: "Luxembourg", LV: "Latvia", LY: "Libya", MA: "Morocco", MC: "Monaco", MD: "Moldova", ME: "Montenegro", MF: "St. Martin", MG: "Madagascar", MH: "Marshall Islands", MK: "Macedonia", ML: "Mali", MM: "Myanmar (Burma)", MN: "Mongolia", MO: "Macau SAR China", MP: "Northern Mariana Islands", MQ: "Martinique", MR: "Mauritania", MS: "Montserrat", MT: "Malta", MU: "Mauritius", MV: "Maldives", MW: "Malawi", MX: "Mexico", MY: "Malaysia", MZ: "Mozambique", NA: "Namibia", NC: "New Caledonia", NE: "Niger", NF: "Norfolk Island", NG: "Nigeria", NI: "Nicaragua", NL: "Netherlands", NO: "Norway", NP: "Nepal", NR: "Nauru", NU: "Niue", NZ: "New Zealand", OM: "Oman", PA: "Panama", PE: "Peru", PF: "French Polynesia", PG: "Papua New Guinea", PH: "Philippines", PK: "Pakistan", PL: "Poland", PM: "St. Pierre & Miquelon", PN: "Pitcairn Islands", PR: "Puerto Rico", PS: "Palestinian Territories", PT: "Portugal", PW: "Palau", PY: "Paraguay", QA: "Qatar", QO: "Outlying Oceania", RE: "R\xE9union", REST_OF_WORLD: "Rest of world", RO: "Romania", RS: "Serbia", RU: "Russia", RW: "Rwanda", SA: "Saudi Arabia", SB: "Solomon Islands", SC: "Seychelles", SD: "Sudan", SE: "Sweden", SG: "Singapore", SH: "St. Helena", SI: "Slovenia", SJ: "Svalbard & Jan Mayen", SK: "Slovakia", SL: "Sierra Leone", SM: "San Marino", SN: "Senegal", SO: "Somalia", SR: "Suriname", SS: "South Sudan", ST: "S\xE3o Tom\xE9 & Pr\xEDncipe", SV: "El Salvador", SX: "Saint Martin", SY: "Syria", SZ: "Eswatini", TA: "Tristan da Cunha", TC: "Turks & Caicos Islands", TD: "Chad", TF: "French Southern Territories", TG: "Togo", TH: "Thailand", TJ: "Tajikistan", TK: "Tokelau", TL: "Timor-Leste", TM: "Turkmenistan", TN: "Tunisia", TO: "Tonga", TR: "Turkey", TT: "Trinidad & Tobago", TV: "Tuvalu", TW: "Taiwan", TZ: "Tanzania", UA: "Ukraine", UG: "Uganda", UM: "U.S. Outlying Islands", US: "United States", UY: "Uruguay", UZ: "Uzbekistan", VA: "Vatican City", VC: "St. Vincent & Grenadines", VE: "Venezuela", VG: "British Virgin Islands", VI: "U.S. Virgin Islands", VN: "Vietnam", VU: "Vanuatu", WF: "Wallis & Futuna", WS: "Samoa", XK: "Kosovo", YE: "Yemen", YT: "Mayotte", ZA: "South Africa", ZM: "Zambia", ZW: "Zimbabwe" } };
var defaultTranslations = { DiscountAppComponents };

// .yalc/@shopify/discount-app-components/build/esm/components/AppProvider/components/DiscountsI18nProvider/DiscountsI18nProvider.js
function DiscountsI18nProvider({
  children
}) {
  const [, ShareTranslations] = useI18n({
    id: "DiscountAppComponents",
    fallback: defaultTranslations,
    async translations(locale2) {
      return import(
        /* webpackChunkName: "DiscountAppComponents-i18n", webpackMode: "lazy-once" */
        `../../../../../../locales/${locale2}.json`
      ).then((dictionary) => {
        if (!dictionary) {
          return void 0;
        }
        return dictionary.default;
      });
    }
  });
  return /* @__PURE__ */ import_react27.default.createElement(ShareTranslations, null, children);
}

// .yalc/@shopify/discount-app-components/build/esm/components/AppProvider/AppProvider.js
var FALLBACK_TRANSLATIONS_LOCALE = "en";
function AppProvider(props) {
  if (!props.locale) {
    throw new Error("DiscountsAppProvider: locale is required");
  } else if (!props.ianaTimezone) {
    throw new Error("DiscountsAppProvider: ianaTimezone is required");
  }
  const i18nManager = (0, import_react28.useMemo)(() => new I18nManager({
    locale: props.locale,
    timezone: props.ianaTimezone,
    fallbackLocale: FALLBACK_TRANSLATIONS_LOCALE
  }), [props.locale, props.ianaTimezone]);
  return /* @__PURE__ */ import_react28.default.createElement(I18nContext.Provider, {
    value: i18nManager
  }, /* @__PURE__ */ import_react28.default.createElement(DiscountsI18nProvider, null, props.children));
}

export {
  require_actions5 as require_actions,
  require_app_bridge_react,
  DiscountMethod,
  DiscountClass,
  RequirementType,
  DiscountStatus,
  onBreadcrumbAction,
  AppProvider,
  ActiveDatesCard,
  CombinationCard,
  MethodCard,
  SummaryCard,
  UsageLimitsCard
};
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=/build/_shared/chunk-JY3U5FKI.js.map
