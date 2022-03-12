import React$2, { useContext, useEffect, useRef, useDebugValue, createElement, useState } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

console.log('FandomPlugin loaded'); // Utilities

var fetchWIREWAXVidId = function (mediaid) {
  return __awaiter(void 0, void 0, void 0, function () {
    var response, vidId;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!mediaid) {
            throw new TypeError('No JW media id is specified.');
          }

          return [4
          /*yield*/
          , fetch("https://edge-player.wirewax.com/jwPlayerData/".concat(mediaid, ".txt"))];

        case 1:
          response = _a.sent();

          if (response.status !== 200) {
            throw new Error('No vidId is mapped with this mediaid');
          }

          return [4
          /*yield*/
          , response.json()];

        case 2:
          vidId = _a.sent();
          return [2
          /*return*/
          , vidId];
      }
    });
  });
};

var injectEmbedderSDK = function () {
  if (window.createWirewaxEmbedder) {
    console.warn('Embedder SDK is already loaded');
    return;
  }

  var fandomSDKUrl = 'https://edge-assets-wirewax.wikia-services.com/creativeData/sdk-fandom/wirewax-embedder-sdk.js';
  console.log('inject WIREWAX embedder SDK fandom build', fandomSDKUrl);
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.src = fandomSDKUrl;
    script.addEventListener('load', resolve);
    script.addEventListener('error', function (e) {
      return reject(e.error);
    });
    document.head.appendChild(script);
  });
};

var FandomWirewaxPlugin =
/** @class */
function () {
  function FandomWirewaxPlugin(rootId, options) {
    var _this = this; // ES6


    this.JWPlayHandler = function () {
      console.log('JW -> WIREWAX: play');

      _this.startTimeUpdate();

      try {
        _this.embedder.play();
      } catch (error) {
        console.warn(error);
      }
    };

    this.JWPauseHandler = function () {
      console.log('JW -> WIREWAX: pause');

      _this.stopTimeUpdate();

      try {
        _this.embedder.pause();
      } catch (error) {
        console.warn(error);
      }
    };

    this.JWSeekHandler = function (event) {
      console.log('JW -> WIREWAX: seek');

      try {
        _this.embedder.setCurrentTime(event.offset);
      } catch (error) {
        console.warn(error);
      }
    };

    this.WirewaxPlayHandler = function () {
      console.log('WIREWAX -> JW: play');

      try {
        _this.player.play();
      } catch (err) {
        console.log(err);
      }
    };

    this.WirewaxPauseHandler = function () {
      console.log('WIREWAX -> JW: pause');

      try {
        _this.player.pause();
      } catch (err) {
        console.log(err);
      }
    };

    this.WirewaxSeekedHandler = function (event) {
      console.log('WIREWAX -> JW: seek', event);

      try {
        _this.player.seek(event.seekTo);
      } catch (err) {
        console.log(err);
      }
    };

    this.WirewaxHotspotClickHandler = function (event) {
      console.log('hotspot click', {
        event: event
      });
    };

    this.WirewaxOverlayShowHandler = function (event) {
      console.log('overlay open', {
        event: event
      });
    };

    this.WirewaxOverlayHideHandler = function (event) {
      console.log('overlay close', {
        event: event
      });
    };

    this.isPlayerRegistered = false;
    this.rootId = rootId;
    this.options = options;
    this.player = options.player;
    this.autoPlay = true;
    this.player.on('playlistItem', function () {
      if (_this.embedder) {
        _this.stopTimeUpdate(); // Dispose pre video interaction


        try {
          _this.embedder.dispose();
        } catch (error) {
          console.log(error);
        }
      } // Search JW media id


      var mediaId = _this.player.getConfig().playlistItem.mediaid || _this.player.getConfig().playlistItem.videoId; // validate interaction


      fetchWIREWAXVidId(mediaId).then(function (vidId) {
        _this.vidId = vidId; // Inject SDK

        return injectEmbedderSDK();
      }).then(function () {
        return _this.setupEmbedder();
      }).then(function () {
        return _this.registerEvents();
      }).catch(function (error) {
        console.warn(error);
      });
    });
    return this;
  } // on(event, callback) {
  // 	// ...
  // }


  FandomWirewaxPlugin.prototype.setupEmbedder = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (!this.embedder) {
          // Create a container
          this.container = document.createElement('div');
          this.container.classList.add('vjs-wirewax-container');
          this.container.setAttribute('style', 'position: absolute; height: 100%; width: 100%; top: 0; pointer-events: none');
          this.player.getContainer().appendChild(this.container); // Initialize embedder

          this.embedder = window.createWirewaxEmbedder();
        } // Create video-less WIREWAX player


        this.embedder.createEl(this.container, {
          isPlugin: true,
          videoId: this.vidId,
          rootId: this.rootId
        });
        return [2
        /*return*/
        , this.embedder.ready()];
      });
    });
  };

  FandomWirewaxPlugin.prototype.registerEvents = function () {
    var _this = this; // Custom time sync handler


    var HTML5VideoEl = this.player.getConfig().mediaElement;

    this.setWIREWAXCurrentTime = function () {
      _this.embedder.setCurrentTime(HTML5VideoEl.currentTime);

      _this.animationId = window.requestAnimationFrame(_this.setWIREWAXCurrentTime);
    }; // Handle the delay caused by injecting script


    var isPlaying = this.player.getState() === 'playing';

    if (isPlaying || this.autoPlay) {
      this.startTimeUpdate();
      this.embedder.play();
    }

    if (this.isPlayerRegistered) return; // Bind WIREWAX to JW player events

    this.player.on('play', this.JWPlayHandler);
    this.player.on('pause', this.JWPauseHandler);
    this.player.on('seek', this.JWSeekHandler); // Bind JW to WIREWAX events

    this.embedder.on('play', this.WirewaxPlayHandler);
    this.embedder.on('pause', this.WirewaxPauseHandler);
    this.embedder.on('seeked', this.WirewaxSeekedHandler);
    this.embedder.on('overlayshow', this.WirewaxOverlayShowHandler);
    this.embedder.on('overlayhide', this.WirewaxOverlayHideHandler);
    this.embedder.on('hotspotclick', this.WirewaxHotspotClickHandler);
    this.isPlayerRegistered = true;
  };

  FandomWirewaxPlugin.prototype.startTimeUpdate = function () {
    window.cancelAnimationFrame(this.animationId);
    this.animationId = window.requestAnimationFrame(this.setWIREWAXCurrentTime);
  };

  FandomWirewaxPlugin.prototype.stopTimeUpdate = function () {
    window.cancelAnimationFrame(this.animationId);
  };

  return FandomWirewaxPlugin;
}();

var PlayerContext = /*#__PURE__*/React$2.createContext(null);

/**
 * gets the android player if user is on an android device browser
 */

var getDefaultPlayerUrl = function () {
  return navigator.userAgent.match(/android/i) ? 'https://cdn.jwplayer.com/libraries/MFqndUHM.js' : 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
};

var JwPlayerWrapper = function () {
  var setPlayer = useContext(PlayerContext).setPlayer;
  useEffect(function () {
    // TODO: check if jwplayer is already loaded
    initPlayer('fandom-video-player', getDefaultPlayerUrl());
  }, []);

  function initPlayer(elementId, playerURL) {
    var script = document.createElement('script');
    script.async = true;
    script.src = playerURL || getDefaultPlayerUrl();

    script.onload = function () {
      var registerPlugin = window.jwplayer().registerPlugin;
      registerPlugin('wirewax', '8.0', FandomWirewaxPlugin);
      var playerInstance = window.jwplayer(elementId).setup({
        playlist: 'https://cdn.jwplayer.com/v2/media/dWVV3F7S',
        plugins: {
          fandomWirewax: {}
        }
      }).on('ready', function (event) {
        new FandomWirewaxPlugin(elementId, {
          player: window.jwplayer(elementId),
          ready: event
        });
      });
      setPlayer(playerInstance);
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  return /*#__PURE__*/React$2.createElement("div", null, /*#__PURE__*/React$2.createElement("div", {
    id: "fandom-video-player"
  }));
};

var VideoPlayer = function () {
  return /*#__PURE__*/React$2.createElement(JwPlayerWrapper, null);
};

var reactIs$1 = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$1="function"===typeof Symbol&&Symbol.for,c=b$1?Symbol.for("react.element"):60103,d=b$1?Symbol.for("react.portal"):60106,e=b$1?Symbol.for("react.fragment"):60107,f=b$1?Symbol.for("react.strict_mode"):60108,g$1=b$1?Symbol.for("react.profiler"):60114,h=b$1?Symbol.for("react.provider"):60109,k$1=b$1?Symbol.for("react.context"):60110,l=b$1?Symbol.for("react.async_mode"):60111,m=b$1?Symbol.for("react.concurrent_mode"):60111,n=b$1?Symbol.for("react.forward_ref"):60112,p$1=b$1?Symbol.for("react.suspense"):60113,q$1=b$1?
Symbol.for("react.suspense_list"):60120,r=b$1?Symbol.for("react.memo"):60115,t=b$1?Symbol.for("react.lazy"):60116,v$1=b$1?Symbol.for("react.block"):60121,w$1=b$1?Symbol.for("react.fundamental"):60117,x$1=b$1?Symbol.for("react.responder"):60118,y$1=b$1?Symbol.for("react.scope"):60119;
function z$1(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g$1:case f:case p$1:return a;default:switch(a=a&&a.$$typeof,a){case k$1:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z$1(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k$1;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
reactIs_production_min.Profiler=g$1;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p$1;reactIs_production_min.isAsyncMode=function(a){return A(a)||z$1(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z$1(a)===k$1};reactIs_production_min.isContextProvider=function(a){return z$1(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z$1(a)===n};reactIs_production_min.isFragment=function(a){return z$1(a)===e};reactIs_production_min.isLazy=function(a){return z$1(a)===t};
reactIs_production_min.isMemo=function(a){return z$1(a)===r};reactIs_production_min.isPortal=function(a){return z$1(a)===d};reactIs_production_min.isProfiler=function(a){return z$1(a)===g$1};reactIs_production_min.isStrictMode=function(a){return z$1(a)===f};reactIs_production_min.isSuspense=function(a){return z$1(a)===p$1};
reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g$1||a===f||a===p$1||a===q$1||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k$1||a.$$typeof===n||a.$$typeof===w$1||a.$$typeof===x$1||a.$$typeof===y$1||a.$$typeof===v$1)};reactIs_production_min.typeOf=z$1;

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== "production") {
  (function() {

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

reactIs_development.AsyncMode = AsyncMode;
reactIs_development.ConcurrentMode = ConcurrentMode;
reactIs_development.ContextConsumer = ContextConsumer;
reactIs_development.ContextProvider = ContextProvider;
reactIs_development.Element = Element;
reactIs_development.ForwardRef = ForwardRef;
reactIs_development.Fragment = Fragment;
reactIs_development.Lazy = Lazy;
reactIs_development.Memo = Memo;
reactIs_development.Portal = Portal;
reactIs_development.Profiler = Profiler;
reactIs_development.StrictMode = StrictMode;
reactIs_development.Suspense = Suspense;
reactIs_development.isAsyncMode = isAsyncMode;
reactIs_development.isConcurrentMode = isConcurrentMode;
reactIs_development.isContextConsumer = isContextConsumer;
reactIs_development.isContextProvider = isContextProvider;
reactIs_development.isElement = isElement;
reactIs_development.isForwardRef = isForwardRef;
reactIs_development.isFragment = isFragment;
reactIs_development.isLazy = isLazy;
reactIs_development.isMemo = isMemo;
reactIs_development.isPortal = isPortal;
reactIs_development.isProfiler = isProfiler;
reactIs_development.isStrictMode = isStrictMode;
reactIs_development.isSuspense = isSuspense;
reactIs_development.isValidElementType = isValidElementType;
reactIs_development.typeOf = typeOf;
  })();
}

if (process.env.NODE_ENV === 'production') {
  reactIs$1.exports = reactIs_production_min;
} else {
  reactIs$1.exports = reactIs_development;
}

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var unitless_cjs = {exports: {}};

var unitless_cjs_prod = {};

Object.defineProperty(unitless_cjs_prod, "__esModule", {
  value: !0
});

var unitlessKeys$1 = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

unitless_cjs_prod.default = unitlessKeys$1;

var unitless_cjs_dev = {};

Object.defineProperty(unitless_cjs_dev, '__esModule', { value: true });

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

unitless_cjs_dev.default = unitlessKeys;

if (process.env.NODE_ENV === "production") {
  unitless_cjs.exports = unitless_cjs_prod;
} else {
  unitless_cjs.exports = unitless_cjs_dev;
}

var p = unitless_cjs.exports;

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var reactIs = reactIs$1.exports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

function y(){return (y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e}).apply(this,arguments)}var v=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},g=function(t){return null!==t&&"object"==typeof t&&"[object Object]"===(t.toString?t.toString():Object.prototype.toString.call(t))&&!reactIs$1.exports.typeOf(t)},S=Object.freeze([]),w=Object.freeze({});function E(e){return "function"==typeof e}function b(e){return "production"!==process.env.NODE_ENV&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function _(e){return e&&"string"==typeof e.styledComponentId}var N="undefined"!=typeof process&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",C="undefined"!=typeof window&&"HTMLElement"in window,I=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!==process.env.NODE_ENV),O="production"!==process.env.NODE_ENV?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n"}:{};function R(){for(var e=arguments.length<=0?void 0:arguments[0],t=[],n=1,r=arguments.length;n<r;n+=1)t.push(n<0||arguments.length<=n?void 0:arguments[n]);return t.forEach((function(t){e=e.replace(/%[a-z]/,t);})),e}function D(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw "production"===process.env.NODE_ENV?new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):"")):new Error(R.apply(void 0,[O[e]].concat(n)).trim())}var j=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e;}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&D(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0;}for(var i=this.indexOfGroup(e+1),a=0,c=t.length;a<c;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++);},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n);}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+=this.tag.getRule(s)+"/*!sc*/\n";return t},e}(),T=new Map,x=new Map,k=1,V=function(e){if(T.has(e))return T.get(e);for(;x.has(k);)k++;var t=k++;return "production"!==process.env.NODE_ENV&&((0|t)<0||t>1<<30)&&D(16,""+t),T.set(e,t),x.set(t,e),t},z=function(e){return x.get(e)},B=function(e,t){t>=k&&(k=t+1),T.set(e,t),x.set(t,e);},M="style["+N+'][data-styled-version="5.3.3"]',G=new RegExp("^"+N+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),L=function(e,t,n){for(var r,o=n.split(","),s=0,i=o.length;s<i;s++)(r=o[s])&&e.registerName(t,r);},F=function(e,t){for(var n=(t.textContent||"").split("/*!sc*/\n"),r=[],o=0,s=n.length;o<s;o++){var i=n[o].trim();if(i){var a=i.match(G);if(a){var c=0|parseInt(a[1],10),u=a[2];0!==c&&(B(u,c),L(e,u,a[3]),e.getTag().insertRules(c,r)),r.length=0;}else r.push(i);}}},Y=function(){return "undefined"!=typeof window&&void 0!==window.__webpack_nonce__?window.__webpack_nonce__:null},q=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(N))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(N,"active"),r.setAttribute("data-styled-version","5.3.3");var i=Y();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},H=function(){function e(e){var t=this.element=q(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}D(17);}(t),this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return !1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--;},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),$=function(){function e(e){var t=this.element=q(e);this.nodes=t.childNodes,this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return !1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--;},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),W=function(){function e(e){this.rules=[],this.length=0;}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--;},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),U=C,J={isServer:!C,useCSSOMInjection:!I},X=function(){function e(e,t,n){void 0===e&&(e=w),void 0===t&&(t={}),this.options=y({},J,{},e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&C&&U&&(U=!1,function(e){for(var t=document.querySelectorAll(M),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(N)&&(F(e,o),o.parentNode&&o.parentNode.removeChild(o));}}(this));}e.registerId=function(e){return V(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(y({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new W(o):r?new H(o):new $(o),new j(e)));var e,t,n,r,o;},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(V(e),this.names.has(e))this.names.get(e).add(t);else {var n=new Set;n.add(t),this.names.set(e,n);}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(V(e),n);},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear();},t.clearRules=function(e){this.getTag().clearGroup(V(e)),this.clearNames(e);},t.clearTag=function(){this.tag=void 0;},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var s=z(o);if(void 0!==s){var i=e.names.get(s),a=t.getGroup(o);if(i&&a&&i.size){var c=N+".g"+o+'[id="'+s+'"]',u="";void 0!==i&&i.forEach((function(e){e.length>0&&(u+=e+",");})),r+=""+a+c+'{content:"'+u+'"}/*!sc*/\n';}}}return r}(this)},e}(),Z=/(a)(d)/gi,K=function(e){return String.fromCharCode(e+(e>25?39:97))};function Q(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=K(t%52)+n;return (K(t%52)+n).replace(Z,"$1-$2")}var ee=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},te=function(e){return ee(5381,e)};function ne(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(E(n)&&!_(n))return !1}return !0}var re=te("5.3.3"),oe=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic="production"===process.env.NODE_ENV&&(void 0===n||n.isStatic)&&ne(e),this.componentId=t,this.baseHash=ee(re,t),this.baseStyle=n,X.registerId(t);}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else {var s=_e(this.rules,e,t,n).join(""),i=Q(ee(this.baseHash,s)>>>0);if(!t.hasNameForId(r,i)){var a=n(s,"."+i,void 0,r);t.insertRules(r,i,a);}o.push(i),this.staticRulesId=i;}else {for(var c=this.rules.length,u=ee(this.baseHash,n.hash),l="",d=0;d<c;d++){var h=this.rules[d];if("string"==typeof h)l+=h,"production"!==process.env.NODE_ENV&&(u=ee(u,h+d));else if(h){var p=_e(h,e,t,n),f=Array.isArray(p)?p.join(""):p;u=ee(u,f+d),l+=f;}}if(l){var m=Q(u>>>0);if(!t.hasNameForId(r,m)){var y=n(l,"."+m,void 0,r);t.insertRules(r,m,y);}o.push(m);}}return o.join(" ")},e}(),se=/^\s*\/\/.*$/gm,ie=[":","[",".","#"];function ae(e){var t,n,r,o,s=void 0===e?w:e,i=s.options,a=void 0===i?w:i,c=s.plugins,u=void 0===c?S:c,l=new stylis_min(a),d=[],p=function(e){function t(t){if(t)try{e(t+"}");}catch(e){}}return function(n,r,o,s,i,a,c,u,l,d){switch(n){case 1:if(0===l&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===u)return r+"/*|*/";break;case 3:switch(u){case 102:case 112:return e(o[0]+r),"";default:return r+(0===d?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t);}}}((function(e){d.push(e);})),f=function(e,r,s){return 0===r&&-1!==ie.indexOf(s[n.length])||s.match(o)?e:"."+t};function m(e,s,i,a){void 0===a&&(a="&");var c=e.replace(se,""),u=s&&i?i+" "+s+" { "+c+" }":c;return t=a,n=s,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}"),l(i||!s?"":s,u)}return l.use([].concat(u,[function(e,t,o){2===e&&o.length&&o[0].lastIndexOf(n)>0&&(o[0]=o[0].replace(r,f));},p,function(e){if(-2===e){var t=d;return d=[],t}}])),m.hash=u.length?u.reduce((function(e,t){return t.name||D(15),ee(e,t.name)}),5381).toString():"",m}var ce=React$2.createContext();ce.Consumer;var le=React$2.createContext(),de=(le.Consumer,new X),he=ae();function pe(){return useContext(ce)||de}function fe(){return useContext(le)||he}var ye=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=he);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"));},this.toString=function(){return D(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t;}return e.prototype.getName=function(e){return void 0===e&&(e=he),this.name+e.hash},e}(),ve=/([A-Z])/,ge=/([A-Z])/g,Se=/^ms-/,we=function(e){return "-"+e.toLowerCase()};function Ee(e){return ve.test(e)?e.replace(ge,we).replace(Se,"-ms-"):e}var be=function(e){return null==e||!1===e||""===e};function _e(e,n,r,o){if(Array.isArray(e)){for(var s,i=[],a=0,c=e.length;a<c;a+=1)""!==(s=_e(e[a],n,r,o))&&(Array.isArray(s)?i.push.apply(i,s):i.push(s));return i}if(be(e))return "";if(_(e))return "."+e.styledComponentId;if(E(e)){if("function"!=typeof(l=e)||l.prototype&&l.prototype.isReactComponent||!n)return e;var u=e(n);return "production"!==process.env.NODE_ENV&&reactIs$1.exports.isElement(u)&&console.warn(b(e)+" is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."),_e(u,n,r,o)}var l;return e instanceof ye?r?(e.inject(r,o),e.getName(o)):e:g(e)?function e(t,n){var r,o,s=[];for(var i in t)t.hasOwnProperty(i)&&!be(t[i])&&(Array.isArray(t[i])&&t[i].isCss||E(t[i])?s.push(Ee(i)+":",t[i],";"):g(t[i])?s.push.apply(s,e(t[i],i)):s.push(Ee(i)+": "+(r=i,null==(o=t[i])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in p?String(o).trim():o+"px")+";"));return n?[n+" {"].concat(s,["}"]):s}(e):e.toString()}var Ne=function(e){return Array.isArray(e)&&(e.isCss=!0),e};function Ae(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return E(e)||g(e)?Ne(_e(v(S,[e].concat(n)))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:Ne(_e(v(e,n)))}var Ce=/invalid hook call/i,Ie=new Set,Pe=function(e,t){if("production"!==process.env.NODE_ENV){var n="The component "+e+(t?' with the id of "'+t+'"':"")+" has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",r=console.error;try{var o=!0;console.error=function(e){if(Ce.test(e))o=!1,Ie.delete(n);else {for(var t=arguments.length,s=new Array(t>1?t-1:0),i=1;i<t;i++)s[i-1]=arguments[i];r.apply(void 0,[e].concat(s));}},useRef(),o&&!Ie.has(n)&&(console.warn(n),Ie.add(n));}catch(e){Ce.test(e.message)&&Ie.delete(n);}finally{console.error=r;}}},Oe=function(e,t,n){return void 0===n&&(n=w),e.theme!==n.theme&&e.theme||t||n.theme},Re=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,De=/(^-|-$)/g;function je(e){return e.replace(Re,"-").replace(De,"")}var Te=function(e){return Q(te(e)>>>0)};function xe(e){return "string"==typeof e&&("production"===process.env.NODE_ENV||e.charAt(0)===e.charAt(0).toLowerCase())}var ke=function(e){return "function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Ve=function(e){return "__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function ze(e,t,n){var r=e[n];ke(t)&&ke(r)?Be(r,t):e[n]=t;}function Be(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,s=n;o<s.length;o++){var i=s[o];if(ke(i))for(var a in i)Ve(a)&&ze(e,i[a],a);}return e}var Me=React$2.createContext();Me.Consumer;var Fe={};function Ye(e,t,n){var o=_(e),i=!xe(e),a=t.attrs,c=void 0===a?S:a,d=t.componentId,h=void 0===d?function(e,t){var n="string"!=typeof e?"sc":je(e);Fe[n]=(Fe[n]||0)+1;var r=n+"-"+Te("5.3.3"+n+Fe[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):d,p=t.displayName,v=void 0===p?function(e){return xe(e)?"styled."+e:"Styled("+b(e)+")"}(e):p,g=t.displayName&&t.componentId?je(t.displayName)+"-"+t.componentId:t.componentId||h,N=o&&e.attrs?Array.prototype.concat(e.attrs,c).filter(Boolean):c,A=t.shouldForwardProp;o&&e.shouldForwardProp&&(A=t.shouldForwardProp?function(n,r,o){return e.shouldForwardProp(n,r,o)&&t.shouldForwardProp(n,r,o)}:e.shouldForwardProp);var C,I=new oe(n,g,o?e.componentStyle:void 0),P=I.isStatic&&0===c.length,O=function(e,t){return function(e,t,n,r){var o=e.attrs,i=e.componentStyle,a=e.defaultProps,c=e.foldedComponentIds,d=e.shouldForwardProp,h=e.styledComponentId,p=e.target;"production"!==process.env.NODE_ENV&&useDebugValue(h);var m=function(e,t,n){void 0===e&&(e=w);var r=y({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,s,i=e;for(t in E(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],s=i[t],n&&s?n+" "+s:n||s):i[t];})),[r,o]}(Oe(t,useContext(Me),a)||w,t,o),v=m[0],g=m[1],S=function(e,t,n,r){var o=pe(),s=fe(),i=t?e.generateAndInjectStyles(w,o,s):e.generateAndInjectStyles(n,o,s);return "production"!==process.env.NODE_ENV&&useDebugValue(i),"production"!==process.env.NODE_ENV&&!t&&r&&r(i),i}(i,r,v,"production"!==process.env.NODE_ENV?e.warnTooManyClasses:void 0),b=n,_=g.$as||t.$as||g.as||t.as||p,N=xe(_),A=g!==t?y({},t,{},g):t,C={};for(var I in A)"$"!==I[0]&&"as"!==I&&("forwardedAs"===I?C.as=A[I]:(d?d(I,index,_):!N||index(I))&&(C[I]=A[I]));return t.style&&g.style!==t.style&&(C.style=y({},t.style,{},g.style)),C.className=Array.prototype.concat(c,h,S!==h?S:null,t.className,g.className).filter(Boolean).join(" "),C.ref=b,createElement(_,C)}(C,e,t,P)};return O.displayName=v,(C=React$2.forwardRef(O)).attrs=N,C.componentStyle=I,C.displayName=v,C.shouldForwardProp=A,C.foldedComponentIds=o?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):S,C.styledComponentId=g,C.target=o?e.target:e,C.withComponent=function(e){var r=t.componentId,o=function(e,t){if(null==e)return {};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),s=r&&r+"-"+(xe(e)?e:je(b(e)));return Ye(e,y({},o,{attrs:N,componentId:s}),n)},Object.defineProperty(C,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=o?Be({},e.defaultProps,t):t;}}),"production"!==process.env.NODE_ENV&&(Pe(v,g),C.warnTooManyClasses=function(e,t){var n={},r=!1;return function(o){if(!r&&(n[o]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'+t+'"':"";console.warn("Over 200 classes were generated for component "+e+s+".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),r=!0,n={};}}}(v,g)),C.toString=function(){return "."+C.styledComponentId},i&&hoistNonReactStatics_cjs(C,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),C}var qe=function(e){return function e(t,r,o){if(void 0===o&&(o=w),!reactIs$1.exports.isValidElementType(r))return D(1,String(r));var s=function(){return t(r,o,Ae.apply(void 0,arguments))};return s.withConfig=function(n){return e(t,r,y({},o,{},n))},s.attrs=function(n){return e(t,r,y({},o,{attrs:Array.prototype.concat(o.attrs,n).filter(Boolean)}))},s}(Ye,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){qe[e]=qe(e);}));"production"!==process.env.NODE_ENV&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"),"production"!==process.env.NODE_ENV&&"test"!==process.env.NODE_ENV&&"undefined"!=typeof window&&(window["__styled-components-init__"]=window["__styled-components-init__"]||0,1===window["__styled-components-init__"]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window["__styled-components-init__"]+=1);var styled = qe;

var wdsOnlyScreen = "only screen";
var wdsBreakpointSmall = "0";
var wdsBreakpointMedium = "768px";
var wdsBreakpointLarge = "1024px";
var wdsBreakpointXlarge = "1280px";
var wdsBreakpointXxlarge = "1500px";
var wdsBreakpointSmallOnly = "(max-width: 767px)";
var wdsBreakpointMediumOnly = "(max-width: 1023px)";
var wdsBreakpointLargeOnly = "(max-width: 1279px)";
var wdsBreakpointXlargeOnly = "(max-width: 1499px)";
var wdsBreakpointXxlargeOnly = "(min-width: 1500px)";
var wdsBreakpointSmallUp = "only screen";
var wdsBreakpointMediumUp = "(min-width: 768px)";
var wdsBreakpointLargeUp = "(min-width: 1024px)";
var wdsBreakpointXlargeUp = "(min-width: 1280px)";
var wdsBreakpointXxlargeUp = "only screen and (min-width: 1500px)";
var wdsBreakpointSmallDown = "only screen and (max-width: 767px)";
var wdsBreakpointMediumDown = "(max-width: 1023px)";
var wdsBreakpointLargeDown = "(max-width: 1279px)";
var wdsBreakpointXlargeDown = "(max-width: 1499px)";
var wdsBreakpointXxlargeDown = "only screen";
var wdsColorLink = "#088488";
var wdsFandomColorButtonBackground = "#00cdd0";
var wdsFandomColorLink = "#088488";
var wdsFandomColorLinkHover = "#005252";
var wdsFandomColorAqua = "#00d6d6";
var wdsFandomColorDarkGray = "#5f7a7b";
var wdsFandomColorNavy = "#002a32";
var wdsFandomColorBlack = "#0e191a";
var wdsFandomColorCoral = "#ff776d";
var wdsFandomColorLightGray = "#838d86";
var wdsFandomColorMidLightGray = "#bed1cf";
var wdsFandomColorMiddleGray = "#7f9998";
var wdsColorNightSky = "#262626";
var wdsColorFaintGray = "#c7c7c7";
var wdsColorMediumGray = "#666";
var wdsFandomColorRed = "#fa005a";
var wdsFandomColorYellow = "#ffc500";
var wdsFandomColorPurple = "#520044";
var wdsFandomColorCream = "#f9edd8";
var wdsFandomColorCrimson = "#9b004e";
var wdsFandomColorLightBlue = "#86d7dc";
var wdsFandomColorPurpleBlack = "#280033";
var wdsColorWhite = "#fff";
var wdsColorLightGray = "#f5f3f5";
var wdsColorMidLightGray = "#d6d0d5";
var wdsColorMiddleGray = "#595358";
var wdsColorDarkGray = "#291927";
var wdsColorBlack = "#1e0c1b";
var wdsColorTextLight = "#e6e6e6";
var wdsColorTextDark = "#3a3a3a";
var wdsOverlayColor = "rgba(0, 0, 0, 0.5)";
var wdsColorAlert = "#bf0017";
var wdsColorMessage = "#753369";
var wdsColorSuccess = "#0c742f";
var wdsColorWarning = "#cf721c";
var wdsColorSocialFacebook = "#3b5998";
var wdsColorSocialGoogleplus = "#dd4b39";
var wdsColorSocialInstagram = "#e02d69";
var wdsColorSocialLine = "#00c300";
var wdsColorSocialLinkedin = "#0077b5";
var wdsColorSocialMeneame = "#ff6400";
var wdsColorSocialNk = "#4077a7";
var wdsColorSocialOdnoklassniki = "#f96900";
var wdsColorSocialReddit = "#ff4500";
var wdsColorSocialTumblr = "#34465d";
var wdsColorSocialTwitter = "#1da1f2";
var wdsColorSocialVkontakte = "#587ca3";
var wdsColorSocialWykop = "#fb803f";
var wdsColorSocialWeibo = "#ff8140";
var wdsColorSocialYoutube = "#cd201f";
var wdsColorFaintBlueGray = "#f2f6fa";
var wdsColorBlueGray = "#c5ced9";
var wdsColorDarkBlueGray = "#39424d";
var wdsColorDarkBlue = "#092344";
var wdsColorBrightBlue = "#257ff5";
var wdsColorSlateGray = "#656e78";
var wdsRoundedCornerRadius = "3px";
var wdsDefaultTransitionDuration = "300ms";
var wdsActiveColorModificationFactor = "20%";
var wdsFadeoutColorOpacity = "0.15";
var wdsBoxShadow = "0 3px 12px 0 rgba(0, 0, 0, 0.3)";
var wdsContentWellMargins = "18px";
var wdsButtonTransitionDuration = "300ms";
var wdsButtonHorizontalPadding = "18px";
var wdsButtonVerticalPadding = "7px";
var wdsDropdownBorderRadius = "4px";
var wdsDropdownBorderWidth = "1px";
var wdsDropdownHeight = "270px";
var wdsDropdownPadding = "18px";
var wdsListItemVerticalPadding = "11px";
var wdsDialogPadding = "24px";
var wdsDialogActionsPadding = "12px";
var wdsDefaultAvatarSize = "30px";
var wdsGlobalNavigationHeight = "55px";
var searchTransitionDuration = "200ms";
var wdsGridGap = "10px";
var wdsGridColumns = "12";
var wdsGridGapSpace = "110px";
var wdsIconSize = "24px";
var wdsIconSmallSize = "18px";
var wdsIconTinySize = "12px";
var wdsPlayerIconPlayTiny = "30px";
var wdsPlayerIconPlaySmall = "42px";
var wdsPlayerIconPlayMedium = "60px";
var wdsPlayerIconPlayLarge = "90px";
var wdsPlayerIconPlayXl = "120px";
var wdsPlayerIconPlayXxl = "150px";
var wdsSpacingXxs = "6px";
var wdsSpacingXs = "12px";
var wdsSpacingS = "18px";
var wdsSpacingM = "24px";
var wdsSpacingL = "30px";
var wdsSpacingXl = "36px";
var wdsSpacingXxl = "42px";
var wdsFandomFontFamily = "rubik, helvetica, arial, sans-serif";
var wdsFontFamily = "Helvetica Neue, helvetica, arial, sans-serif";
var wdsFontWeightLight = "300";
var wdsFontWeightNormal = "400";
var wdsFontWeightMedium = "500";
var wdsFontWeightBold = "700";
var wdsFontWeightBlack = "900";
var wdsLineHeightNone = "1";
var wdsLineHeightTight = "1.25";
var wdsLineHeightNormal = "1.5";
var wdsLineHeightLoose = "1.75";
var wdsFontSizeXxs = "10px";
var wdsFontSizeXs = "12px";
var wdsFontSizeS = "14px";
var wdsFontSizeBase = "16px";
var wdsFontSizeL = "18px";
var wdsFontSizeXl = "24px";
var wdsFontSizeXxl = "28px";
var wdsFontSize3xl = "36px";
var wdsFontSize4xl = "52px";
var zMin = "-1";
var z1 = "100";
var z2 = "200";
var z3 = "300";
var z4 = "400";
var z5 = "500";
var z6 = "600";
var z7 = "700";
var z8 = "800";
var z9 = "900";
var zMax = "10000";
var WDSVariables = {
	wdsOnlyScreen: wdsOnlyScreen,
	wdsBreakpointSmall: wdsBreakpointSmall,
	wdsBreakpointMedium: wdsBreakpointMedium,
	wdsBreakpointLarge: wdsBreakpointLarge,
	wdsBreakpointXlarge: wdsBreakpointXlarge,
	wdsBreakpointXxlarge: wdsBreakpointXxlarge,
	wdsBreakpointSmallOnly: wdsBreakpointSmallOnly,
	wdsBreakpointMediumOnly: wdsBreakpointMediumOnly,
	wdsBreakpointLargeOnly: wdsBreakpointLargeOnly,
	wdsBreakpointXlargeOnly: wdsBreakpointXlargeOnly,
	wdsBreakpointXxlargeOnly: wdsBreakpointXxlargeOnly,
	wdsBreakpointSmallUp: wdsBreakpointSmallUp,
	wdsBreakpointMediumUp: wdsBreakpointMediumUp,
	wdsBreakpointLargeUp: wdsBreakpointLargeUp,
	wdsBreakpointXlargeUp: wdsBreakpointXlargeUp,
	wdsBreakpointXxlargeUp: wdsBreakpointXxlargeUp,
	wdsBreakpointSmallDown: wdsBreakpointSmallDown,
	wdsBreakpointMediumDown: wdsBreakpointMediumDown,
	wdsBreakpointLargeDown: wdsBreakpointLargeDown,
	wdsBreakpointXlargeDown: wdsBreakpointXlargeDown,
	wdsBreakpointXxlargeDown: wdsBreakpointXxlargeDown,
	wdsColorLink: wdsColorLink,
	wdsFandomColorButtonBackground: wdsFandomColorButtonBackground,
	wdsFandomColorLink: wdsFandomColorLink,
	wdsFandomColorLinkHover: wdsFandomColorLinkHover,
	wdsFandomColorAqua: wdsFandomColorAqua,
	wdsFandomColorDarkGray: wdsFandomColorDarkGray,
	wdsFandomColorNavy: wdsFandomColorNavy,
	wdsFandomColorBlack: wdsFandomColorBlack,
	wdsFandomColorCoral: wdsFandomColorCoral,
	wdsFandomColorLightGray: wdsFandomColorLightGray,
	wdsFandomColorMidLightGray: wdsFandomColorMidLightGray,
	wdsFandomColorMiddleGray: wdsFandomColorMiddleGray,
	wdsColorNightSky: wdsColorNightSky,
	wdsColorFaintGray: wdsColorFaintGray,
	wdsColorMediumGray: wdsColorMediumGray,
	wdsFandomColorRed: wdsFandomColorRed,
	wdsFandomColorYellow: wdsFandomColorYellow,
	wdsFandomColorPurple: wdsFandomColorPurple,
	wdsFandomColorCream: wdsFandomColorCream,
	wdsFandomColorCrimson: wdsFandomColorCrimson,
	wdsFandomColorLightBlue: wdsFandomColorLightBlue,
	wdsFandomColorPurpleBlack: wdsFandomColorPurpleBlack,
	wdsColorWhite: wdsColorWhite,
	wdsColorLightGray: wdsColorLightGray,
	wdsColorMidLightGray: wdsColorMidLightGray,
	wdsColorMiddleGray: wdsColorMiddleGray,
	wdsColorDarkGray: wdsColorDarkGray,
	wdsColorBlack: wdsColorBlack,
	wdsColorTextLight: wdsColorTextLight,
	wdsColorTextDark: wdsColorTextDark,
	wdsOverlayColor: wdsOverlayColor,
	wdsColorAlert: wdsColorAlert,
	wdsColorMessage: wdsColorMessage,
	wdsColorSuccess: wdsColorSuccess,
	wdsColorWarning: wdsColorWarning,
	wdsColorSocialFacebook: wdsColorSocialFacebook,
	wdsColorSocialGoogleplus: wdsColorSocialGoogleplus,
	wdsColorSocialInstagram: wdsColorSocialInstagram,
	wdsColorSocialLine: wdsColorSocialLine,
	wdsColorSocialLinkedin: wdsColorSocialLinkedin,
	wdsColorSocialMeneame: wdsColorSocialMeneame,
	wdsColorSocialNk: wdsColorSocialNk,
	wdsColorSocialOdnoklassniki: wdsColorSocialOdnoklassniki,
	wdsColorSocialReddit: wdsColorSocialReddit,
	wdsColorSocialTumblr: wdsColorSocialTumblr,
	wdsColorSocialTwitter: wdsColorSocialTwitter,
	wdsColorSocialVkontakte: wdsColorSocialVkontakte,
	wdsColorSocialWykop: wdsColorSocialWykop,
	wdsColorSocialWeibo: wdsColorSocialWeibo,
	wdsColorSocialYoutube: wdsColorSocialYoutube,
	wdsColorFaintBlueGray: wdsColorFaintBlueGray,
	wdsColorBlueGray: wdsColorBlueGray,
	wdsColorDarkBlueGray: wdsColorDarkBlueGray,
	wdsColorDarkBlue: wdsColorDarkBlue,
	wdsColorBrightBlue: wdsColorBrightBlue,
	wdsColorSlateGray: wdsColorSlateGray,
	wdsRoundedCornerRadius: wdsRoundedCornerRadius,
	wdsDefaultTransitionDuration: wdsDefaultTransitionDuration,
	wdsActiveColorModificationFactor: wdsActiveColorModificationFactor,
	wdsFadeoutColorOpacity: wdsFadeoutColorOpacity,
	wdsBoxShadow: wdsBoxShadow,
	wdsContentWellMargins: wdsContentWellMargins,
	wdsButtonTransitionDuration: wdsButtonTransitionDuration,
	wdsButtonHorizontalPadding: wdsButtonHorizontalPadding,
	wdsButtonVerticalPadding: wdsButtonVerticalPadding,
	wdsDropdownBorderRadius: wdsDropdownBorderRadius,
	wdsDropdownBorderWidth: wdsDropdownBorderWidth,
	wdsDropdownHeight: wdsDropdownHeight,
	wdsDropdownPadding: wdsDropdownPadding,
	wdsListItemVerticalPadding: wdsListItemVerticalPadding,
	wdsDialogPadding: wdsDialogPadding,
	wdsDialogActionsPadding: wdsDialogActionsPadding,
	wdsDefaultAvatarSize: wdsDefaultAvatarSize,
	wdsGlobalNavigationHeight: wdsGlobalNavigationHeight,
	searchTransitionDuration: searchTransitionDuration,
	wdsGridGap: wdsGridGap,
	wdsGridColumns: wdsGridColumns,
	wdsGridGapSpace: wdsGridGapSpace,
	wdsIconSize: wdsIconSize,
	wdsIconSmallSize: wdsIconSmallSize,
	wdsIconTinySize: wdsIconTinySize,
	wdsPlayerIconPlayTiny: wdsPlayerIconPlayTiny,
	wdsPlayerIconPlaySmall: wdsPlayerIconPlaySmall,
	wdsPlayerIconPlayMedium: wdsPlayerIconPlayMedium,
	wdsPlayerIconPlayLarge: wdsPlayerIconPlayLarge,
	wdsPlayerIconPlayXl: wdsPlayerIconPlayXl,
	wdsPlayerIconPlayXxl: wdsPlayerIconPlayXxl,
	wdsSpacingXxs: wdsSpacingXxs,
	wdsSpacingXs: wdsSpacingXs,
	wdsSpacingS: wdsSpacingS,
	wdsSpacingM: wdsSpacingM,
	wdsSpacingL: wdsSpacingL,
	wdsSpacingXl: wdsSpacingXl,
	wdsSpacingXxl: wdsSpacingXxl,
	wdsFandomFontFamily: wdsFandomFontFamily,
	wdsFontFamily: wdsFontFamily,
	wdsFontWeightLight: wdsFontWeightLight,
	wdsFontWeightNormal: wdsFontWeightNormal,
	wdsFontWeightMedium: wdsFontWeightMedium,
	wdsFontWeightBold: wdsFontWeightBold,
	wdsFontWeightBlack: wdsFontWeightBlack,
	wdsLineHeightNone: wdsLineHeightNone,
	wdsLineHeightTight: wdsLineHeightTight,
	wdsLineHeightNormal: wdsLineHeightNormal,
	wdsLineHeightLoose: wdsLineHeightLoose,
	wdsFontSizeXxs: wdsFontSizeXxs,
	wdsFontSizeXs: wdsFontSizeXs,
	wdsFontSizeS: wdsFontSizeS,
	wdsFontSizeBase: wdsFontSizeBase,
	wdsFontSizeL: wdsFontSizeL,
	wdsFontSizeXl: wdsFontSizeXl,
	wdsFontSizeXxl: wdsFontSizeXxl,
	wdsFontSize3xl: wdsFontSize3xl,
	wdsFontSize4xl: wdsFontSize4xl,
	zMin: zMin,
	z1: z1,
	z2: z2,
	z3: z3,
	z4: z4,
	z5: z5,
	z6: z6,
	z7: z7,
	z8: z8,
	z9: z9,
	zMax: zMax
};

var React$1 = React$2;

function _interopNamespace$1(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace$1 = /*#__PURE__*/_interopNamespace$1(React$1);

function IconSoundOff(props) {
    return (React__namespace$1.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 0 24 24", width: "1em", height: "1em" }, props),
        React__namespace$1.createElement("defs", null,
            React__namespace$1.createElement("path", { id: "prefix__sound-off-a", d: "M21.414 12l2.293-2.292a.999.999 0 10-1.414-1.414L20 10.587l-2.293-2.293a.999.999 0 10-1.414 1.414L18.586 12l-2.293 2.293a.999.999 0 101.414 1.414L20 13.415l2.293 2.293a.997.997 0 001.414 0 .999.999 0 000-1.414L21.414 12zM10 19.587l-4.293-4.293A1.002 1.002 0 005 15H2V9h3c.265 0 .52-.105.707-.293L10 4.414v15.172zm1.383-18.51a.998.998 0 00-1.09.217L4.586 7H1a1 1 0 00-1 1v8a1 1 0 001 1h3.586l5.707 5.707a.996.996 0 001.09.217A1 1 0 0012 22V2c0-.404-.244-.769-.617-.924z" })),
        React__namespace$1.createElement("use", { fillRule: "evenodd", xlinkHref: "#prefix__sound-off-a" })));
}

var IconSoundOff_1 = IconSoundOff;

var UnmuteButtonWrapper = styled.div.withConfig({
  displayName: "UnmuteButton__UnmuteButtonWrapper",
  componentId: "sc-cng6xn-0"
})(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n\tposition: absolute;\n\ttop: 6px;\n\tleft: 6px;\n\tz-index: 2;\n\talign-items: center;\n\tbackground-color: rgba(255, 255, 255, 0.9);\n\tborder-radius: 2px;\n\tpadding: 5px 8px;\n\tcursor: pointer;\n\theight: 31px;\n\tbox-sizing: border-box;\n\tcolor: ", ";\n\tfont-size: ", ";\n\tfont-weight: ", ";\n"], ["\n\tposition: absolute;\n\ttop: 6px;\n\tleft: 6px;\n\tz-index: 2;\n\talign-items: center;\n\tbackground-color: rgba(255, 255, 255, 0.9);\n\tborder-radius: 2px;\n\tpadding: 5px 8px;\n\tcursor: pointer;\n\theight: 31px;\n\tbox-sizing: border-box;\n\tcolor: ", ";\n\tfont-size: ", ";\n\tfont-weight: ", ";\n"])), WDSVariables.wdsColorDarkBlueGray, WDSVariables.wdsFontSizeXs, WDSVariables.wdsFontWeightBold);

var UnmuteButton = function () {
  var player = useContext(PlayerContext).player;

  var _a = useState(true),
      muted = _a[0],
      setMuted = _a[1];

  var unmute = function () {
    console.log(player);
    player === null || player === void 0 ? void 0 : player.setMute(false);
    setMuted(false);
  };

  if (!muted) return null;
  return /*#__PURE__*/React$2.createElement(UnmuteButtonWrapper, {
    onClick: unmute,
    muted: muted
  }, /*#__PURE__*/React$2.createElement(IconSoundOff_1, null), "Play Sound");
};
var templateObject_1$9;

var React = React$2;

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function IconCrossSmall(props) {
    return (React__namespace.createElement("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 0 18 18", width: "1em", height: "1em" }, props),
        React__namespace.createElement("defs", null,
            React__namespace.createElement("path", { id: "prefix__cross-small", d: "M10.414 9l6.293-6.293a.999.999 0 10-1.414-1.414L9 7.586 2.707 1.293a.999.999 0 10-1.414 1.414L7.586 9l-6.293 6.293a.999.999 0 101.414 1.414L9 10.414l6.293 6.293a.997.997 0 001.414 0 .999.999 0 000-1.414L10.414 9z" })),
        React__namespace.createElement("use", { fillRule: "evenodd", xlinkHref: "#prefix__cross-small" })));
}

var IconCrossSmall_1 = IconCrossSmall;

var CloseWrapper = styled.div.withConfig({
  displayName: "CloseButton__CloseWrapper",
  componentId: "sc-ofquqz-0"
})(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n\tcursor: pointer;\n"], ["\n\tcursor: pointer;\n"])));

var CloseButton = function (_a) {
  var dismissed = _a.dismissed;
  return /*#__PURE__*/React$2.createElement(CloseWrapper, {
    onClick: dismissed
  }, /*#__PURE__*/React$2.createElement(IconCrossSmall_1, null));
};
var templateObject_1$8;

var ThumbDownWrapper = styled.div.withConfig({
  displayName: "ThumbDownButton__ThumbDownWrapper",
  componentId: "sc-xmrg1q-0"
})(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n\talign-items: center;\n\tborder-radius: 50%;\n\tcursor: pointer;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\theight: 22px;\n\tjustify-content: center;\n\tmargin-left: 12px;\n\twidth: 22px;\n\tbackground-color: ", ";\n"], ["\n\talign-items: center;\n\tborder-radius: 50%;\n\tcursor: pointer;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\theight: 22px;\n\tjustify-content: center;\n\tmargin-left: 12px;\n\twidth: 22px;\n\tbackground-color: ", ";\n"])), WDSVariables.wdsColorAlert);

var ThumbDownButton = function (_a) {
  var dismissed = _a.dismissed;

  var thumbDownFeedback = function () {
    // TODO: figure out tracking, potentially see: unified-platform/node_modules/jwplayer-fandom/src/tracking.js
    dismissed();
  };

  return /*#__PURE__*/React$2.createElement(ThumbDownWrapper, {
    onClick: thumbDownFeedback
  }, /*#__PURE__*/React$2.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React$2.createElement("g", {
    fill: "#FFF",
    fillRule: "evenodd"
  }, /*#__PURE__*/React$2.createElement("path", {
    d: "M10.47 7.497H7.956v1.397c0 .977-.587 2.402-1.537 2.96-.14.057-.28.113-.42.113a.84.84 0 0 1-.838-.838V9.004L2.927 6.323v-5.14l.866-.42A5.035 5.035 0 0 1 6 .234h3.91c.755 0 1.398.615 1.398 1.37l.56 4.44v.03c0 .81-.616 1.424-1.398 1.424zm-8.38-.56H.412c-.168 0-.28-.11-.28-.28V.515c0-.168.112-.28.28-.28H2.09c.167 0 .28.112.28.28V6.66c0 .167-.113.28-.28.28z"
  }))));
};
var templateObject_1$7;

var ThumbUpWrapper = styled.div.withConfig({
  displayName: "ThumbUpButton__ThumbUpWrapper",
  componentId: "sc-1fo8131-0"
})(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n\talign-items: center;\n\tborder-radius: 50%;\n\tcursor: pointer;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\theight: 22px;\n\tjustify-content: center;\n\tmargin-left: 12px;\n\twidth: 22px;\n\tbackground-color: ", ";\n"], ["\n\talign-items: center;\n\tborder-radius: 50%;\n\tcursor: pointer;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\theight: 22px;\n\tjustify-content: center;\n\tmargin-left: 12px;\n\twidth: 22px;\n\tbackground-color: ", ";\n"])), WDSVariables.wdsColorSuccess);

var ThumbUpButton = function (_a) {
  var dismissed = _a.dismissed;

  var thumbUpFeedback = function () {
    // TODO: figure out tracking, potentially see: unified-platform/node_modules/jwplayer-fandom/src/tracking.js
    console.log('yo');
    dismissed();
  };

  return /*#__PURE__*/React$2.createElement(ThumbUpWrapper, {
    onClick: thumbUpFeedback
  }, /*#__PURE__*/React$2.createElement("svg", {
    width: "13",
    height: "12",
    viewBox: "0 0 13 12",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React$2.createElement("g", {
    fill: "#FFF",
    fillRule: "evenodd"
  }, /*#__PURE__*/React$2.createElement("path", {
    d: "M11.103 4.503H8.59V3.106c0-.977-.587-2.402-1.537-2.96-.14-.057-.28-.113-.42-.113a.84.84 0 0 0-.837.838v2.125L3.56 5.677v5.14l.866.42c.67.334 1.453.53 2.207.53h3.91c.756 0 1.398-.615 1.398-1.37l.56-4.44v-.03c0-.81-.615-1.424-1.397-1.424zm-8.38.56H1.045c-.168 0-.28.11-.28.28v6.144c0 .168.112.28.28.28h1.676c.168 0 .28-.112.28-.28V5.34c0-.166-.112-.28-.28-.28z"
  }))));
};
var templateObject_1$6;

var UserFeedbackWrapper = styled.div.withConfig({
  displayName: "UserFeedback__UserFeedbackWrapper",
  componentId: "sc-1qufyzf-0"
})(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n\tposition: absolute;\n\ttop: 6px;\n\tright: 6px;\n\tz-index: 2;\n\talign-items: center;\n\tbackground-color: rgba(255, 255, 255, 0.9);\n\tborder-radius: 2px;\n\tfont-size: 14px;\n\tmax-width: 90%;\n\tpadding: 5px 8px;\n\tdisplay: flex;\n\theight: 34px;\n\tbox-sizing: border-box;\n\tcolor: ", ";\n"], ["\n\tposition: absolute;\n\ttop: 6px;\n\tright: 6px;\n\tz-index: 2;\n\talign-items: center;\n\tbackground-color: rgba(255, 255, 255, 0.9);\n\tborder-radius: 2px;\n\tfont-size: 14px;\n\tmax-width: 90%;\n\tpadding: 5px 8px;\n\tdisplay: flex;\n\theight: 34px;\n\tbox-sizing: border-box;\n\tcolor: ", ";\n"])), WDSVariables.wdsColorDarkBlueGray);

var UserFeedback = function () {
  var _a = useState(false),
      visible = _a[0],
      setVisible = _a[1];

  var _b = useState(false),
      dismissed = _b[0],
      setDismissed = _b[1];

  var player = useContext(PlayerContext).player;
  useEffect(function () {
    player === null || player === void 0 ? void 0 : player.on('play', function (event) {
      return handlePlay(event);
    });
    player === null || player === void 0 ? void 0 : player.on('pause', function () {
      return setVisible(false);
    });
    return function () {
      player === null || player === void 0 ? void 0 : player.off('play', function (event) {
        return handlePlay(event);
      });
      player === null || player === void 0 ? void 0 : player.off('pause', function () {
        return setVisible(false);
      });
    };
  }, [player]);

  var setVisibleTimeCheck = function (event) {
    if (event.position > 5 && player.getState() === 'playing') {
      player === null || player === void 0 ? void 0 : player.off('time', setVisibleTimeCheck);
      setVisible(true);
    }
  };

  var handlePlay = function (event) {
    if (event.position > 5) {
      setVisible(true);
    } else {
      player === null || player === void 0 ? void 0 : player.on('time', setVisibleTimeCheck);
    }
  };

  if (!visible || dismissed) return null;
  return /*#__PURE__*/React$2.createElement(UserFeedbackWrapper, null, /*#__PURE__*/React$2.createElement(CloseButton, {
    dismissed: function () {
      return setDismissed(true);
    }
  }), "Do you like this video?", /*#__PURE__*/React$2.createElement(ThumbUpButton, {
    dismissed: function () {
      return setDismissed(true);
    }
  }), /*#__PURE__*/React$2.createElement(ThumbDownButton, {
    dismissed: function () {
      return setDismissed(true);
    }
  }));
};
var templateObject_1$5;

function usePlaylistItem() {
  var player = useContext(PlayerContext).player;

  var _a = useState({
    title: undefined,
    duration: undefined
  }),
      playlistItem = _a[0],
      setPlaylistItem = _a[1];

  useEffect(function () {
    if ((player === null || player === void 0 ? void 0 : player.getState()) === 'playing' || (player === null || player === void 0 ? void 0 : player.getConfig().autostart)) {
      setPlaylistItem(player === null || player === void 0 ? void 0 : player.getPlaylistItem());
    }

    player === null || player === void 0 ? void 0 : player.on('playlistItem', function (event) {
      setPlaylistItem(event.item);
    });
    return function () {
      player === null || player === void 0 ? void 0 : player.off('playlistItem', function (event) {
        setPlaylistItem(event.item);
      });
    };
  }, [player]);
  return playlistItem;
}

function formatTime(duration) {
  var hours = Math.floor(duration / 3600);
  var minutes = Math.floor(duration / 60);
  var seconds = duration % 60;
  return "".concat(hours ? "".concat(hours, ":") : '').concat(minutes ? "".concat(minutes, ":") : '').concat(seconds);
}

var VideoDetailsWrapper$1 = styled.div.withConfig({
  displayName: "VideoDetails__VideoDetailsWrapper",
  componentId: "sc-e6es9p-0"
})(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n\t-webkit-font-smoothing: antialiased;\n\tbackground-color: #000;\n\tfont-weight: 700;\n\tpadding: 10px 12px;\n"], ["\n\t-webkit-font-smoothing: antialiased;\n\tbackground-color: #000;\n\tfont-weight: 700;\n\tpadding: 10px 12px;\n"])));
var VideoLabel = styled.div.withConfig({
  displayName: "VideoDetails__VideoLabel",
  componentId: "sc-e6es9p-1"
})(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n\tcolor: #999;\n\tfont-size: 12px;\n\topacity: 0.5;\n\ttext-transform: uppercase;\n"], ["\n\tcolor: #999;\n\tfont-size: 12px;\n\topacity: 0.5;\n\ttext-transform: uppercase;\n"])));
var VideoTime = styled.span.withConfig({
  displayName: "VideoDetails__VideoTime",
  componentId: "sc-e6es9p-2"
})(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n\tborder: 0;\n\tfont: normal normal normal 100% inherit;\n\tmargin: 0;\n\tpadding: 0;\n\tvertical-align: baseline;\n"], ["\n\tborder: 0;\n\tfont: normal normal normal 100% inherit;\n\tmargin: 0;\n\tpadding: 0;\n\tvertical-align: baseline;\n"])));
var VideoTitle$1 = styled.div.withConfig({
  displayName: "VideoDetails__VideoTitle",
  componentId: "sc-e6es9p-3"
})(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n\tcolor: ", ";\n\tfont-size: 14px;\n"], ["\n\tcolor: ", ";\n\tfont-size: 14px;\n"])), WDSVariables.wdsColorWhite);

var VideoDetails$1 = function () {
  var _a = usePlaylistItem(),
      duration = _a.duration,
      title = _a.title;

  return /*#__PURE__*/React$2.createElement(VideoDetailsWrapper$1, null, /*#__PURE__*/React$2.createElement(VideoLabel, null, "Watch", /*#__PURE__*/React$2.createElement(VideoTime, null, formatTime(duration))), /*#__PURE__*/React$2.createElement(VideoTitle$1, null, title));
};
var templateObject_1$4, templateObject_2$3, templateObject_3$2, templateObject_4$2;

// Source: https://usehooks.com/useOnScreen/
function useOnScreen(ref, rootMargin) {
  if (rootMargin === void 0) {
    rootMargin = '0px';
  } // State and setter for storing whether element is visible


  var _a = useState(false),
      isIntersecting = _a[0],
      setIntersecting = _a[1];

  useEffect(function () {
    var observer = new IntersectionObserver(function (_a) {
      var entry = _a[0]; // Update our state when observer callback fires

      if (ref.current) {
        setIntersecting(entry.isIntersecting);
      }
    }, {
      rootMargin: rootMargin
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return function () {
      observer.disconnect();
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign =  function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var DEFAULT_OPTIONS =  {
    channelId: 'default',
    host: window,
    coordinatorHost: window.top,
};

var INTERNAL_TYPES =  {
    connect: 'connect',
    connected: 'connected',
};
var LIB_ID =  '@wikia/post-quecast';

function isAction(input) {
    return typeof input.type === 'string' && typeof input.timestamp === 'number';
}
function isActionOfType(input) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    return types.some(function (type) { return input.type === type; });
}

function isPostMessageData(input) {
    return input.channelId && input.libId === LIB_ID && input.action && isAction(input.action);
}

function isPostQuecastEvent(input) {
    return input && input.source && input.data && isPostMessageData(input.data);
}
function isEventPublic(event) {
    return !event.data.private;
}
function isEventPrivate(event) {
    return !!event.data.private;
}
function isEventOfChannel(event, channelId) {
    return event.data.channelId === channelId;
}
function isEventExternal(event) {
    return !Object.values(INTERNAL_TYPES).some(function (type) { return event.data.action.type === type; });
}
function isEventOfType(event) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    return types.some(function (type) { return event.data.action.type === type; });
}
function getEventAction(event) {
    return event.data.action;
}

function isCallbackMode(options) {
    var _a;
    return (options.host === options.coordinatorHost && !!((_a = options.coordinatorHost[LIB_ID]) === null || _a === void 0 ? void 0 : _a.callbackConnector));
}
var Connector = /*@__PURE__*/ (function () {
    function Connector() {
    }
    Connector.make = function (options) {
        if (isCallbackMode(options)) {
            return options.coordinatorHost[LIB_ID].callbackConnector;
        }
        return new PostMessageConnector({
            senderHost: options.coordinatorHost,
            listenerHost: options.host,
        });
    };
    return Connector;
}());
var CallbackConnector = /*@__PURE__*/ (function () {
    function CallbackConnector(coordinatorHost) {
        this.coordinatorHost = coordinatorHost;
        this.callbacks = [];
    }
    CallbackConnector.prototype.dispatch = function (data) {
        var _this = this;
        if (!isPostMessageData(data)) {
            throw new Error("Incorrect object type. Expected PostMessageData, but got " + data);
        }
        this.callbacks.forEach(function (cb) { return cb({ data: data, source: _this.coordinatorHost }); });
    };
    CallbackConnector.prototype.addListener = function (cb) {
        this.callbacks.push(cb);
    };
    CallbackConnector.prototype.removeListener = function (cb) {
        this.callbacks = this.callbacks.filter(function (_cb) { return _cb !== cb; });
    };
    return CallbackConnector;
}());
var PostMessageConnector = /*@__PURE__*/ (function () {
    function PostMessageConnector(options) {
        this.options = options;
        this.map = new Map();
    }
    PostMessageConnector.prototype.dispatch = function (data) {
        if (!isPostMessageData(data)) {
            throw new Error("Incorrect object type. Expected PostMessageData, but got " + data);
        }
        this.options.senderHost.postMessage(data, '*');
    };
    PostMessageConnector.prototype.addListener = function (cb) {
        var wrapper = function (event) {
            if (!isPostQuecastEvent(event)) {
                return;
            }
            cb(event);
        };
        this.map.set(cb, wrapper);
        this.options.listenerHost.addEventListener('message', wrapper);
    };
    PostMessageConnector.prototype.removeListener = function (cb) {
        var wrapper = this.map.get(cb);
        this.options.listenerHost.removeEventListener('message', wrapper);
        this.map.delete(cb);
    };
    return PostMessageConnector;
}());

var Receiver = /*@__PURE__*/ (function () {
    function Receiver(options) {
        this.callbacks = [];
        this.history = [];
        this.channelId = options.channelId;
        this.connector = Connector.make(options);
        this.setupActions();
        this.setupConnection();
    }
    Receiver.prototype.setupActions = function () {
        this.getHistory();
        this.listenEvent();
    };
    Receiver.prototype.getHistory = function () {
        var _this = this;
        var callback = function (event) {
            if (!isEventOfChannel(event, _this.channelId)) {
                return;
            }
            if (!isEventPrivate(event)) {
                return;
            }
            var action = getEventAction(event);
            if (!isActionOfType(action, INTERNAL_TYPES.connected)) {
                return;
            }
            _this.connector.removeListener(callback);
            _this.handleActions.apply(_this, action.history);
        };
        this.connector.addListener(callback);
    };
    Receiver.prototype.listenEvent = function () {
        var _this = this;
        var callback = function (event) {
            if (!isEventOfChannel(event, _this.channelId)) {
                return;
            }
            if (!isEventPublic(event)) {
                return;
            }
            var action = getEventAction(event);
            _this.handleActions(action);
        };
        this.connector.addListener(callback);
    };
    Receiver.prototype.handleActions = function () {
        var _a;
        var _this = this;
        var actions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actions[_i] = arguments[_i];
        }
        (_a = this.history).push.apply(_a, actions);
        actions.forEach(function (action) { return _this.callbacks.forEach(function (cb) { return cb(action); }); });
    };
    Receiver.prototype.setupConnection = function () {
        this.connector.dispatch({
            action: { type: INTERNAL_TYPES.connect, timestamp: Date.now() },
            channelId: this.channelId,
            private: true,
            libId: LIB_ID,
        });
    };
    Receiver.prototype.addListener = function (cb) {
        this.history.forEach(function (action) { return cb(action); });
        this.callbacks.push(cb);
    };
    Receiver.prototype.removeListener = function (cb) {
        this.callbacks = this.callbacks.filter(function (_cb) { return _cb !== cb; });
    };
    return Receiver;
}());

var Transmitter = /*@__PURE__*/ (function () {
    function Transmitter(_options) {
        if (_options === void 0) { _options = {}; }
        var options = __assign(__assign({}, DEFAULT_OPTIONS), _options);
        this.channelId = options.channelId;
        this.connector = Connector.make(options);
    }
    Transmitter.prototype.dispatch = function (action) {
        this.connector.dispatch({
            action: __assign(__assign({}, action), { timestamp: Date.now() }),
            channelId: this.channelId,
            private: true,
            libId: LIB_ID,
        });
    };
    return Transmitter;
}());

var Communicator = /*@__PURE__*/ (function () {
    function Communicator(_options) {
        if (_options === void 0) { _options = {}; }
        var options = __assign(__assign({}, DEFAULT_OPTIONS), _options);
        this.transmitter = new Transmitter(options);
        this.receiver = new Receiver(options);
    }
    Communicator.prototype.dispatch = function (action) {
        this.transmitter.dispatch(action);
    };
    Communicator.prototype.addListener = function (cb) {
        this.receiver.addListener(cb);
    };
    Communicator.prototype.removeListener = function (cb) {
        this.receiver.removeListener(cb);
    };
    return Communicator;
}());

var Channel = /*@__PURE__*/ (function () {
    function Channel(channelId, coordinatorHost) {
        this.channelId = channelId;
        this.connectors = new Map();
        this.history = [];
        this.connectors.set(coordinatorHost, coordinatorHost[LIB_ID].callbackConnector);
    }
    Channel.prototype.addConnection = function (connection) {
        this.ensureConnector(connection).dispatch({
            action: this.createConnectedAction(),
            private: true,
            channelId: this.channelId,
            libId: LIB_ID,
        });
    };
    Channel.prototype.createConnectedAction = function () {
        return {
            type: INTERNAL_TYPES.connected,
            history: this.history,
            timestamp: Date.now(),
        };
    };
    Channel.prototype.broadcast = function (action) {
        var _this = this;
        this.history.push(action);
        this.connectors.forEach(function (connector) {
            connector.dispatch({ action: action, channelId: _this.channelId, libId: LIB_ID });
        });
    };
    Channel.prototype.ensureConnector = function (connection) {
        if (!this.connectors.has(connection)) {
            this.connectors.set(connection, new PostMessageConnector({ senderHost: connection, listenerHost: connection }));
        }
        return this.connectors.get(connection);
    };
    return Channel;
}());

var Coordinator = /*@__PURE__*/ (function () {
    function Coordinator(coordinatorHost) {
        this.coordinatorHost = coordinatorHost;
        this.channels = new Map();
        this.callbackConnector = new CallbackConnector(coordinatorHost);
        this.postMessageConnector = new PostMessageConnector({
            senderHost: coordinatorHost,
            listenerHost: coordinatorHost,
        });
    }
    Coordinator.prototype.init = function () {
        var _this = this;
        var handleEvents = function (event) {
            if (isEventPublic(event)) {
                return;
            }
            _this.handleConnect(event);
            _this.handleBroadcast(event);
        };
        this.callbackConnector.addListener(handleEvents);
        this.postMessageConnector.addListener(handleEvents);
    };
    Coordinator.prototype.handleConnect = function (event) {
        if (!isEventOfType(event, INTERNAL_TYPES.connect)) {
            return;
        }
        var channel = this.ensureChannel(event.data.channelId);
        channel.addConnection(event.source);
    };
    Coordinator.prototype.handleBroadcast = function (event) {
        if (!isEventExternal(event)) {
            return;
        }
        var channel = this.ensureChannel(event.data.channelId);
        channel.broadcast(event.data.action);
    };
    Coordinator.prototype.ensureChannel = function (channelId) {
        if (!this.channels.has(channelId)) {
            this.channels.set(channelId, new Channel(channelId, this.coordinatorHost));
        }
        return this.channels.get(channelId);
    };
    return Coordinator;
}());

function setupPostQuecast(coordinatorHost) {
    if (coordinatorHost === void 0) { coordinatorHost = window; }
    if (!!coordinatorHost[LIB_ID]) {
        return;
    }
    var coordinator = new Coordinator(coordinatorHost);
    coordinator.init();
    coordinatorHost[LIB_ID] = coordinator;
}

function isFunction(value) {
    return typeof value === 'function';
}

function createErrorClass(createImpl) {
    var _super = function (instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
}

var UnsubscriptionError = createErrorClass(function (_super) {
    return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
            ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
            : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
    };
});

function arrRemove(arr, item) {
    if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
    }
}

var Subscription = (function () {
    function Subscription(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._teardowns = null;
    }
    Subscription.prototype.unsubscribe = function () {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
            this.closed = true;
            var _parentage = this._parentage;
            if (_parentage) {
                this._parentage = null;
                if (Array.isArray(_parentage)) {
                    try {
                        for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                            var parent_1 = _parentage_1_1.value;
                            parent_1.remove(this);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    _parentage.remove(this);
                }
            }
            var initialTeardown = this.initialTeardown;
            if (isFunction(initialTeardown)) {
                try {
                    initialTeardown();
                }
                catch (e) {
                    errors = e instanceof UnsubscriptionError ? e.errors : [e];
                }
            }
            var _teardowns = this._teardowns;
            if (_teardowns) {
                this._teardowns = null;
                try {
                    for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
                        var teardown_1 = _teardowns_1_1.value;
                        try {
                            execTeardown(teardown_1);
                        }
                        catch (err) {
                            errors = errors !== null && errors !== void 0 ? errors : [];
                            if (err instanceof UnsubscriptionError) {
                                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                            }
                            else {
                                errors.push(err);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (errors) {
                throw new UnsubscriptionError(errors);
            }
        }
    };
    Subscription.prototype.add = function (teardown) {
        var _a;
        if (teardown && teardown !== this) {
            if (this.closed) {
                execTeardown(teardown);
            }
            else {
                if (teardown instanceof Subscription) {
                    if (teardown.closed || teardown._hasParent(this)) {
                        return;
                    }
                    teardown._addParent(this);
                }
                (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
            }
        }
    };
    Subscription.prototype._hasParent = function (parent) {
        var _parentage = this._parentage;
        return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
    };
    Subscription.prototype._addParent = function (parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription.prototype._removeParent = function (parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
            this._parentage = null;
        }
        else if (Array.isArray(_parentage)) {
            arrRemove(_parentage, parent);
        }
    };
    Subscription.prototype.remove = function (teardown) {
        var _teardowns = this._teardowns;
        _teardowns && arrRemove(_teardowns, teardown);
        if (teardown instanceof Subscription) {
            teardown._removeParent(this);
        }
    };
    Subscription.EMPTY = (function () {
        var empty = new Subscription();
        empty.closed = true;
        return empty;
    })();
    return Subscription;
}());
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
    return (value instanceof Subscription ||
        (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
}
function execTeardown(teardown) {
    if (isFunction(teardown)) {
        teardown();
    }
    else {
        teardown.unsubscribe();
    }
}

var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
};

var timeoutProvider = {
    setTimeout: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(args)));
    },
    clearTimeout: function (handle) {
        return (clearTimeout)(handle);
    },
    delegate: undefined,
};

function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function () {
        {
            throw err;
        }
    });
}

function noop() { }

function errorContext(cb) {
    {
        cb();
    }
}

var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
            _this.destination = destination;
            if (isSubscription(destination)) {
                destination.add(_this);
            }
        }
        else {
            _this.destination = EMPTY_OBSERVER;
        }
        return _this;
    }
    Subscriber.create = function (next, error, complete) {
        return new SafeSubscriber(next, error, complete);
    };
    Subscriber.prototype.next = function (value) {
        if (this.isStopped) ;
        else {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (this.isStopped) ;
        else {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.isStopped = true;
            _super.prototype.unsubscribe.call(this);
            this.destination = null;
        }
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        try {
            this.destination.error(err);
        }
        finally {
            this.unsubscribe();
        }
    };
    Subscriber.prototype._complete = function () {
        try {
            this.destination.complete();
        }
        finally {
            this.unsubscribe();
        }
    };
    return Subscriber;
}(Subscription));
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
}
var ConsumerObserver = (function () {
    function ConsumerObserver(partialObserver) {
        this.partialObserver = partialObserver;
    }
    ConsumerObserver.prototype.next = function (value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
            try {
                partialObserver.next(value);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    ConsumerObserver.prototype.error = function (err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
            try {
                partialObserver.error(err);
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
        else {
            handleUnhandledError(err);
        }
    };
    ConsumerObserver.prototype.complete = function () {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
            try {
                partialObserver.complete();
            }
            catch (error) {
                handleUnhandledError(error);
            }
        }
    };
    return ConsumerObserver;
}());
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction(observerOrNext) || !observerOrNext) {
            partialObserver = {
                next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined,
                error: error !== null && error !== void 0 ? error : undefined,
                complete: complete !== null && complete !== void 0 ? complete : undefined,
            };
        }
        else {
            var context_1;
            if (_this && config.useDeprecatedNextContext) {
                context_1 = Object.create(observerOrNext);
                context_1.unsubscribe = function () { return _this.unsubscribe(); };
                partialObserver = {
                    next: observerOrNext.next && bind(observerOrNext.next, context_1),
                    error: observerOrNext.error && bind(observerOrNext.error, context_1),
                    complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                };
            }
            else {
                partialObserver = observerOrNext;
            }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
    }
    return SafeSubscriber;
}(Subscriber));
function handleUnhandledError(error) {
    {
        reportUnhandledError(error);
    }
}
function defaultErrorHandler(err) {
    throw err;
}
var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
};

var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

function identity(x) {
    return x;
}

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}

var Observable = (function () {
    function Observable(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
        errorContext(function () {
            var _a = _this, operator = _a.operator, source = _a.source;
            subscriber.add(operator
                ?
                    operator.call(subscriber, source)
                : source
                    ?
                        _this._subscribe(subscriber)
                    :
                        _this._trySubscribe(subscriber));
        });
        return subscriber;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscriber = new SafeSubscriber({
                next: function (value) {
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscriber.unsubscribe();
                    }
                },
                error: reject,
                complete: resolve,
            });
            _this.subscribe(subscriber);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable.prototype[observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        return pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
    return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
}

function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
    return function (source) {
        if (hasLift(source)) {
            return source.lift(function (liftedSource) {
                try {
                    return init(liftedSource, this);
                }
                catch (err) {
                    this.error(err);
                }
            });
        }
        throw new TypeError('Unable to lift unknown Observable type');
    };
}

function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function (_super) {
    __extends(OperatorSubscriber, _super);
    function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext
            ? function (value) {
                try {
                    onNext(value);
                }
                catch (err) {
                    destination.error(err);
                }
            }
            : _super.prototype._next;
        _this._error = onError
            ? function (err) {
                try {
                    onError(err);
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._error;
        _this._complete = onComplete
            ? function () {
                try {
                    onComplete();
                }
                catch (err) {
                    destination.error(err);
                }
                finally {
                    this.unsubscribe();
                }
            }
            : _super.prototype._complete;
        return _this;
    }
    OperatorSubscriber.prototype.unsubscribe = function () {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var closed_1 = this.closed;
            _super.prototype.unsubscribe.call(this);
            !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
    };
    return OperatorSubscriber;
}(Subscriber));

var ObjectUnsubscribedError = createErrorClass(function (_super) {
    return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
    };
});

var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype._throwIfClosed = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
    };
    Subject.prototype.next = function (value) {
        var _this = this;
        errorContext(function () {
            var e_1, _a;
            _this._throwIfClosed();
            if (!_this.isStopped) {
                var copy = _this.observers.slice();
                try {
                    for (var copy_1 = __values(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
                        var observer = copy_1_1.value;
                        observer.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return)) _a.call(copy_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    };
    Subject.prototype.error = function (err) {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.hasError = _this.isStopped = true;
                _this.thrownError = err;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().error(err);
                }
            }
        });
    };
    Subject.prototype.complete = function () {
        var _this = this;
        errorContext(function () {
            _this._throwIfClosed();
            if (!_this.isStopped) {
                _this.isStopped = true;
                var observers = _this.observers;
                while (observers.length) {
                    observers.shift().complete();
                }
            }
        });
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = this.closed = true;
        this.observers = null;
    };
    Object.defineProperty(Subject.prototype, "observed", {
        get: function () {
            var _a;
            return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
    });
    Subject.prototype._trySubscribe = function (subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
    };
    Subject.prototype._innerSubscribe = function (subscriber) {
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        return hasError || isStopped
            ? EMPTY_SUBSCRIPTION
            : (observers.push(subscriber), new Subscription(function () { return arrRemove(observers, subscriber); }));
    };
    Subject.prototype._checkFinalizedStatuses = function (subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
            subscriber.error(thrownError);
        }
        else if (isStopped) {
            subscriber.complete();
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable));
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject.prototype.error = function (err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject.prototype.complete = function () {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject;
}(Subject));

var dateTimestampProvider = {
    now: function () {
        return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
};

var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) { _bufferSize = Infinity; }
        if (_windowTime === void 0) { _windowTime = Infinity; }
        if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider; }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
            _buffer.push(value);
            !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
            subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
    };
    ReplaySubject.prototype._trimBuffer = function () {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
            var now = _timestampProvider.now();
            var last = 0;
            for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                last = i;
            }
            last && _buffer.splice(0, last + 1);
        }
    };
    return ReplaySubject;
}(Subject));

var Action = (function (_super) {
    __extends(Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        return this;
    };
    return Action;
}(Subscription));

var intervalProvider = {
    setInterval: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var delegate = intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, __spreadArray([], __read(args)));
    },
    clearInterval: function (handle) {
        return (clearInterval)(handle);
    },
    delegate: undefined,
};

var AsyncAction = (function (_super) {
    __extends(AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
        if (delay === void 0) { delay = 0; }
        return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        if (delay != null && this.delay === delay && this.pending === false) {
            return id;
        }
        intervalProvider.clearInterval(id);
        return undefined;
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, _delay) {
        var errored = false;
        var errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = e ? e : new Error('Scheduled action threw falsy error');
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype.unsubscribe = function () {
        if (!this.closed) {
            var _a = this, id = _a.id, scheduler = _a.scheduler;
            var actions = scheduler.actions;
            this.work = this.state = this.scheduler = null;
            this.pending = false;
            arrRemove(actions, this);
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, null);
            }
            this.delay = null;
            _super.prototype.unsubscribe.call(this);
        }
    };
    return AsyncAction;
}(Action));

var Scheduler = (function () {
    function Scheduler(schedulerActionCtor, now) {
        if (now === void 0) { now = Scheduler.now; }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) { delay = 0; }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
    };
    Scheduler.now = dateTimestampProvider.now;
    return Scheduler;
}());

var AsyncScheduler = (function (_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) { now = Scheduler.now; }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        _this._scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this._active) {
            actions.push(action);
            return;
        }
        var error;
        this._active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while ((action = actions.shift()));
        this._active = false;
        if (error) {
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(Scheduler));

var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;

var EMPTY = new Observable(function (subscriber) { return subscriber.complete(); });

function isScheduler(value) {
    return value && isFunction(value.schedule);
}

var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

function isInteropObservable(input) {
    return isFunction(input[observable]);
}

function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}

function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = getSymbolIterator();

function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = readableStream.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, , 9, 10]);
                    _b.label = 2;
                case 2:
                    return [4, __await(reader.read())];
                case 3:
                    _a = _b.sent(), value = _a.value, done = _a.done;
                    if (!done) return [3, 5];
                    return [4, __await(void 0)];
                case 4: return [2, _b.sent()];
                case 5: return [4, __await(value)];
                case 6: return [4, _b.sent()];
                case 7:
                    _b.sent();
                    return [3, 2];
                case 8: return [3, 10];
                case 9:
                    reader.releaseLock();
                    return [7];
                case 10: return [2];
            }
        });
    });
}
function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

function innerFrom(input) {
    if (input instanceof Observable) {
        return input;
    }
    if (input != null) {
        if (isInteropObservable(input)) {
            return fromInteropObservable(input);
        }
        if (isArrayLike(input)) {
            return fromArrayLike(input);
        }
        if (isPromise(input)) {
            return fromPromise(input);
        }
        if (isAsyncIterable(input)) {
            return fromAsyncIterable(input);
        }
        if (isIterable(input)) {
            return fromIterable(input);
        }
        if (isReadableStreamLike(input)) {
            return fromReadableStreamLike(input);
        }
    }
    throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
    return new Observable(function (subscriber) {
        var obs = obj[observable]();
        if (isFunction(obs.subscribe)) {
            return obs.subscribe(subscriber);
        }
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    });
}
function fromArrayLike(array) {
    return new Observable(function (subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    });
}
function fromPromise(promise) {
    return new Observable(function (subscriber) {
        promise
            .then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, reportUnhandledError);
    });
}
function fromIterable(iterable) {
    return new Observable(function (subscriber) {
        var e_1, _a;
        try {
            for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                var value = iterable_1_1.value;
                subscriber.next(value);
                if (subscriber.closed) {
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        subscriber.complete();
    });
}
function fromAsyncIterable(asyncIterable) {
    return new Observable(function (subscriber) {
        process$1(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
    });
}
function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process$1(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var value, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 11]);
                    asyncIterable_1 = __asyncValues(asyncIterable);
                    _b.label = 1;
                case 1: return [4, asyncIterable_1.next()];
                case 2:
                    if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                    value = asyncIterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return [2];
                    }
                    _b.label = 3;
                case 3: return [3, 1];
                case 4: return [3, 11];
                case 5:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 11];
                case 6:
                    _b.trys.push([6, , 9, 10]);
                    if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                    return [4, _a.call(asyncIterable_1)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 10];
                case 9:
                    if (e_2) throw e_2.error;
                    return [7];
                case 10: return [7];
                case 11:
                    subscriber.complete();
                    return [2];
            }
        });
    });
}

function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) { delay = 0; }
    if (repeat === void 0) { repeat = false; }
    var scheduleSubscription = scheduler.schedule(function () {
        work();
        if (repeat) {
            parentSubscription.add(this.schedule(null, delay));
        }
        else {
            this.unsubscribe();
        }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
        return scheduleSubscription;
    }
}

function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
    });
}

function subscribeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return operate(function (source, subscriber) {
        subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
    });
}

function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var i = 0;
        return scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
            }
            else {
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    this.schedule();
                }
            }
        });
    });
}

function scheduleIterable(input, scheduler) {
    return new Observable(function (subscriber) {
        var iterator$1;
        executeSchedule(subscriber, scheduler, function () {
            iterator$1 = input[iterator]();
            executeSchedule(subscriber, scheduler, function () {
                var _a;
                var value;
                var done;
                try {
                    (_a = iterator$1.next(), value = _a.value, done = _a.done);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                }
            }, 0, true);
        });
        return function () { return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return(); };
    });
}

function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        executeSchedule(subscriber, scheduler, function () {
            var iterator = input[Symbol.asyncIterator]();
            executeSchedule(subscriber, scheduler, function () {
                iterator.next().then(function (result) {
                    if (result.done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(result.value);
                    }
                });
            }, 0, true);
        });
    });
}

function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        if (isAsyncIterable(input)) {
            return scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable(input)) {
            return scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike(input)) {
            return scheduleReadableStreamLike(input, scheduler);
        }
    }
    throw createInvalidObservableTypeError(input);
}

function from(input, scheduler) {
    return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

var EmptyError = createErrorClass(function (_super) { return function EmptyErrorImpl() {
    _super(this);
    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
}; });

function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
}

function map(project, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            subscriber.next(project.call(thisArg, value, index++));
        }));
    });
}

var isArray$1 = Array.isArray;
function callOrApply(fn, args) {
    return isArray$1(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
    return map(function (args) { return callOrApply(fn, args); });
}

function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs(resultSelector));
    }
    return new Observable(function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction(removeHandler) ? function () { return removeHandler(handler, retValue); } : undefined;
    });
}

function timer(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) { dueTime = 0; }
    if (scheduler === void 0) { scheduler = async; }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
        if (isScheduler(intervalOrScheduler)) {
            scheduler = intervalOrScheduler;
        }
        else {
            intervalDuration = intervalOrScheduler;
        }
    }
    return new Observable(function (subscriber) {
        var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
            due = 0;
        }
        var n = 0;
        return scheduler.schedule(function () {
            if (!subscriber.closed) {
                subscriber.next(n++);
                if (0 <= intervalDuration) {
                    this.schedule(undefined, intervalDuration);
                }
                else {
                    subscriber.complete();
                }
            }
        }, due);
    });
}

var isArray = Array.isArray;
function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
}

function filter(predicate, thisArg) {
    return operate(function (source, subscriber) {
        var index = 0;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
    });
}

function race() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    sources = argsOrArgArray(sources);
    return sources.length === 1 ? innerFrom(sources[0]) : new Observable(raceInit(sources));
}
function raceInit(sources) {
    return function (subscriber) {
        var subscriptions = [];
        var _loop_1 = function (i) {
            subscriptions.push(innerFrom(sources[i]).subscribe(createOperatorSubscriber(subscriber, function (value) {
                if (subscriptions) {
                    for (var s = 0; s < subscriptions.length; s++) {
                        s !== i && subscriptions[s].unsubscribe();
                    }
                    subscriptions = null;
                }
                subscriber.next(value);
            })));
        };
        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
            _loop_1(i);
        }
    };
}

function defaultIfEmpty(defaultValue) {
    return operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () {
            if (!hasValue) {
                subscriber.next(defaultValue);
            }
            subscriber.complete();
        }));
    });
}

function take(count) {
    return count <= 0
        ?
            function () { return EMPTY; }
        : operate(function (source, subscriber) {
            var seen = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                if (++seen <= count) {
                    subscriber.next(value);
                    if (count <= seen) {
                        subscriber.complete();
                    }
                }
            }));
        });
}

function throwIfEmpty(errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return operate(function (source, subscriber) {
        var hasValue = false;
        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
            hasValue = true;
            subscriber.next(value);
        }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
    });
}
function defaultErrorFactory() {
    return new EmptyError();
}

function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) {
        return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); }));
    };
}

function share(options) {
    if (options === void 0) { options = {}; }
    var _a = options.connector, connector = _a === void 0 ? function () { return new Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function (wrapperSource) {
        var connection = null;
        var resetConnection = null;
        var subject = null;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function () {
            resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
            resetConnection = null;
        };
        var reset = function () {
            cancelReset();
            connection = subject = null;
            hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function () {
            var conn = connection;
            reset();
            conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return operate(function (source, subscriber) {
            refCount++;
            if (!hasErrored && !hasCompleted) {
                cancelReset();
            }
            var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
            subscriber.add(function () {
                refCount--;
                if (refCount === 0 && !hasErrored && !hasCompleted) {
                    resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                }
            });
            dest.subscribe(subscriber);
            if (!connection) {
                connection = new SafeSubscriber({
                    next: function (value) { return dest.next(value); },
                    error: function (err) {
                        hasErrored = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnError, err);
                        dest.error(err);
                    },
                    complete: function () {
                        hasCompleted = true;
                        cancelReset();
                        resetConnection = handleReset(reset, resetOnComplete);
                        dest.complete();
                    },
                });
                from(source).subscribe(connection);
            }
        })(wrapperSource);
    };
}
function handleReset(reset, on) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (on === true) {
        reset();
        return null;
    }
    if (on === false) {
        return null;
    }
    return on.apply(void 0, __spreadArray([], __read(args))).pipe(take(1))
        .subscribe(function () { return reset(); });
}

function shareReplay(configOrBufferSize, windowTime, scheduler) {
    var _a, _b;
    var bufferSize;
    var refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
        bufferSize = (_a = configOrBufferSize.bufferSize) !== null && _a !== void 0 ? _a : Infinity;
        windowTime = (_b = configOrBufferSize.windowTime) !== null && _b !== void 0 ? _b : Infinity;
        refCount = !!configOrBufferSize.refCount;
        scheduler = configOrBufferSize.scheduler;
    }
    else {
        bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
    }
    return share({
        connector: function () { return new ReplaySubject(bufferSize, windowTime, scheduler); },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount,
    });
}

class CommunicationService {
  action$;
  /**
   * @private
   */

  communicator;

  constructor() {
    setupPostQuecast();
    this.communicator = new Communicator();
    this.action$ = fromEventPattern(handler => this.communicator.addListener(handler), handler => this.communicator.removeListener(handler)).pipe(shareReplay({
      refCount: true
    }));
  }

  dispatch(action) {
    this.communicator.dispatch({ ...action,
      __global: true
    });
  }

}

const communicationService = new CommunicationService();

function ofType(...types) {
  return source => {
    return source.pipe(filter(action => types.some(type => action.type === type)));
  };
}

// Source: https://usehooks.com/useOnScreen/
function useAdComplete() {
  var _a = useState(false),
      adComplete = _a[0],
      setAdComplete = _a[1];

  useEffect(function () {
    communicationService.action$.pipe(ofType('[AdEngine OptIn] set opt in'), first()).subscribe(function () {
      waitForAdEngine().then(function () {
        listenSetupJWPlayer(function () {
          setAdComplete(true);
        });
      });
    });
  }, []);

  var waitForAdEngine = function () {
    // to prevent prettier reformatting this line and then spitting out errors
    // prettier-ignore
    var adEngineConfigured$ = communicationService.action$.pipe(ofType('[AdEngine] Configured'), first());
    var adEngineTimeout = 2000;
    var adEngineTimeout$ = timer(adEngineTimeout);
    return race(adEngineConfigured$, adEngineTimeout$).toPromise();
  };

  var listenSetupJWPlayer = function (callback) {
    communicationService.action$.pipe(ofType('[Ad Engine] Setup JWPlayer'), first()).subscribe(callback);
  };

  return adComplete;
}

var PlayerWrapper = function (_a) {
  var children = _a.children;

  var _b = useState(null),
      jwPlayer = _b[0],
      setJwPlayer = _b[1];

  var setPlayer = function (player) {
    setJwPlayer(player);
  };

  return /*#__PURE__*/React$2.createElement(PlayerContext.Provider, {
    value: {
      player: jwPlayer,
      setPlayer: setPlayer
    }
  }, children);
};

var DesktopArticleVideoTopPlaceholder = styled.div.withConfig({
  displayName: "DesktopArticleVideoPlayer__DesktopArticleVideoTopPlaceholder",
  componentId: "sc-7j5an3-0"
})(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n\tbackground-color: black;\n\twidth: 100%;\n\theight: 100%;\n"], ["\n\tbackground-color: black;\n\twidth: 100%;\n\theight: 100%;\n"])));
var DesktopArticleVideoWrapper = styled.div.withConfig({
  displayName: "DesktopArticleVideoPlayer__DesktopArticleVideoWrapper",
  componentId: "sc-7j5an3-1"
})(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n\t", "\n"], ["\n\t", "\n"])), function (props) {
  return !props.visibleOnScreen && Ae(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n\t\t\tbottom: 18px;\n\t\t\tleft: auto;\n\t\t\tposition: fixed;\n\t\t\tright: 18px;\n\t\t\ttop: auto;\n\t\t\t-webkit-transition: right 0.4s, bottom 0.4s, width 0.4s;\n\t\t\ttransition: right 0.4s, bottom 0.4s, width 0.4s;\n\t\t\twidth: 300px;\n\t\t"], ["\n\t\t\tbottom: 18px;\n\t\t\tleft: auto;\n\t\t\tposition: fixed;\n\t\t\tright: 18px;\n\t\t\ttop: auto;\n\t\t\t-webkit-transition: right 0.4s, bottom 0.4s, width 0.4s;\n\t\t\ttransition: right 0.4s, bottom 0.4s, width 0.4s;\n\t\t\twidth: 300px;\n\t\t"])));
});
var TopBar = styled.div.withConfig({
  displayName: "DesktopArticleVideoPlayer__TopBar",
  componentId: "sc-7j5an3-2"
})(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n\twidth: 100%;\n\tposition: relative;\n\tdisplay: ", ";\n"], ["\n\twidth: 100%;\n\tposition: relative;\n\tdisplay: ", ";\n"])), function (props) {
  return props.visible ? 'block' : 'none';
});

var DesktopArticleVideoPlayer = function () {
  var ref = useRef(null);
  var adComplete = useAdComplete();
  var onScreen = useOnScreen(ref);
  return /*#__PURE__*/React$2.createElement(PlayerWrapper, null, /*#__PURE__*/React$2.createElement(DesktopArticleVideoTopPlaceholder, {
    ref: ref
  }, adComplete && /*#__PURE__*/React$2.createElement(DesktopArticleVideoWrapper, {
    visibleOnScreen: onScreen
  }, /*#__PURE__*/React$2.createElement(TopBar, {
    visible: onScreen
  }, /*#__PURE__*/React$2.createElement(UnmuteButton, null), /*#__PURE__*/React$2.createElement(UserFeedback, null)), /*#__PURE__*/React$2.createElement(JwPlayerWrapper, null), !onScreen && /*#__PURE__*/React$2.createElement(VideoDetails$1, null))));
};
var templateObject_1$3, templateObject_2$2, templateObject_3$1, templateObject_4$1;

function usePlaying() {
  var _a = useState(false),
      playing = _a[0],
      setPlaying = _a[1];

  var player = useContext(PlayerContext).player;
  useEffect(function () {
    if ((player === null || player === void 0 ? void 0 : player.getState()) === 'playing' || (player === null || player === void 0 ? void 0 : player.getConfig().autostart)) {
      setPlaying(true);
    }

    player === null || player === void 0 ? void 0 : player.on('play', function () {
      return setPlaying(true);
    });
    player === null || player === void 0 ? void 0 : player.on('pause', function () {
      return setPlaying(false);
    });
    return function () {
      player === null || player === void 0 ? void 0 : player.on('play', function () {
        return setPlaying(true);
      });
      player === null || player === void 0 ? void 0 : player.on('pause', function () {
        return setPlaying(false);
      });
    };
  }, [player]);
  return playing;
}

var VideoDetailsWrapper = styled.div.withConfig({
  displayName: "VideoDetails__VideoDetailsWrapper",
  componentId: "sc-1vgogfw-0"
})(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n\tbox-sizing: border-box;\n\ttransition: transform 0.3s;\n\tbackground: transparent;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tpadding: 13px 12px 15px;\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\twidth: 100%;\n\n\t", "\n"], ["\n\tbox-sizing: border-box;\n\ttransition: transform 0.3s;\n\tbackground: transparent;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tpadding: 13px 12px 15px;\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\twidth: 100%;\n\n\t", "\n"])), function (props) {
  return !props.collapsed && Ae(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n\t\t\tbackground-color: ", ";\n\t\t\ttransform: translate(0, 100%);\n\t\t"], ["\n\t\t\tbackground-color: ", ";\n\t\t\ttransform: translate(0, 100%);\n\t\t"])), WDSVariables.wdsColorWhite);
});
var VideoTitle = styled.h2.withConfig({
  displayName: "VideoDetails__VideoTitle",
  componentId: "sc-1vgogfw-1"
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tline-height: 1.14em;\n\tmargin-right: 6px;\n\tmargin-top: 4px;\n\n\tcolor: ", ";\n\tfont-size: ", ";\n\tfont-weight: ", ";\n"], ["\n\tline-height: 1.14em;\n\tmargin-right: 6px;\n\tmargin-top: 4px;\n\n\tcolor: ", ";\n\tfont-size: ", ";\n\tfont-weight: ", ";\n"])), function (props) {
  return props.collapsed ? WDSVariables.wdsColorWhite : WDSVariables.wdsColorBlack;
}, WDSVariables.wdsFontSizeBase, WDSVariables.wdsFontWeightMedium);
var VideoDuration = styled.span.withConfig({
  displayName: "VideoDetails__VideoDuration",
  componentId: "sc-1vgogfw-2"
})(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tbackground: #272727;\n\tborder-radius: 3px;\n\tline-height: 1;\n\topacity: 0.9;\n\tpadding: 3px 5px;\n\n\tcolor: ", ";\n\tfont-size: ", ";\n\tfont-weight: ", ";\n"], ["\n\tbackground: #272727;\n\tborder-radius: 3px;\n\tline-height: 1;\n\topacity: 0.9;\n\tpadding: 3px 5px;\n\n\tcolor: ", ";\n\tfont-size: ", ";\n\tfont-weight: ", ";\n"])), WDSVariables.wdsColorWhite, WDSVariables.wdsFontSizeXs, WDSVariables.wdsFontWeightMedium);

var VideoDetails = function (_a) {
  var playing = _a.playing;
  var playlistItem = usePlaylistItem();
  if (!playlistItem) return null;
  var duration = playlistItem.duration,
      title = playlistItem.title;
  return /*#__PURE__*/React$2.createElement(VideoDetailsWrapper, {
    collapsed: !playing
  }, /*#__PURE__*/React$2.createElement(VideoTitle, {
    collapsed: !playing
  }, title), /*#__PURE__*/React$2.createElement(VideoDuration, null, formatTime(duration)));
};
var templateObject_1$2, templateObject_2$1, templateObject_3, templateObject_4;

var OffScreenOverlayWrapper = styled.div.withConfig({
  displayName: "OffScreenOverlay__OffScreenOverlayWrapper",
  componentId: "sc-1kk1mzb-0"
})(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n\t", "\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tpointer-events: none;\n\tz-index: 5;\n"], ["\n\t", "\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tpointer-events: none;\n\tz-index: 5;\n"])), function (props) {
  return !props.playing && "background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));";
});

var OffScreenOverlay = function () {
  var playing = usePlaying();
  var controlbar = document.querySelector('.jw-controlbar');

  if (!playing) {
    if (controlbar) controlbar.style.visibility = 'hidden';
  } else {
    if (controlbar) controlbar.style.visibility = 'visible';
  }

  return /*#__PURE__*/React$2.createElement(OffScreenOverlayWrapper, {
    playing: playing
  }, /*#__PURE__*/React$2.createElement(VideoDetails, {
    playing: playing
  }));
};
var templateObject_1$1;

var MobileArticleVideoTopPlaceholder = styled.div.withConfig({
  displayName: "MobileArticleVideoPlayer__MobileArticleVideoTopPlaceholder",
  componentId: "sc-u5kl9n-0"
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tbackground-color: black;\n\twidth: 100%;\n\theight: 100%;\n"], ["\n\tbackground-color: black;\n\twidth: 100%;\n\theight: 100%;\n"])));
var MobileArticleVideoWrapper = styled.div.withConfig({
  displayName: "MobileArticleVideoPlayer__MobileArticleVideoWrapper",
  componentId: "sc-u5kl9n-1"
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t", "\n"], ["\n\t", "\n"])), function (props) {
  return !props.visibleOnScreen && "\n\t\t\tbox-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);\n\t\t\tposition: fixed;\n\t\t\ttop: 55px;\n\t\t\twidth: 100%;\n\t\t";
});

var MobileArticleVideoPlayer = function () {
  var ref = useRef(null);
  var onScreen = useOnScreen(ref);
  return /*#__PURE__*/React$2.createElement(PlayerWrapper, null, /*#__PURE__*/React$2.createElement(MobileArticleVideoTopPlaceholder, {
    ref: ref
  }, /*#__PURE__*/React$2.createElement(MobileArticleVideoWrapper, {
    visibleOnScreen: onScreen
  }, /*#__PURE__*/React$2.createElement(JwPlayerWrapper, null), !onScreen && /*#__PURE__*/React$2.createElement(OffScreenOverlay, null))));
};
var templateObject_1, templateObject_2;

export { DesktopArticleVideoPlayer, MobileArticleVideoPlayer, VideoPlayer };
