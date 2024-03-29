// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Data_Enum from "../Data.Enum/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Effect from "../Effect/index.js";
import * as Unsafe_Coerce from "../Unsafe.Coerce/index.js";
import * as Web_HTML_HTMLMediaElement_CanPlayType from "../Web.HTML.HTMLMediaElement.CanPlayType/index.js";
import * as Web_HTML_HTMLMediaElement_NetworkState from "../Web.HTML.HTMLMediaElement.NetworkState/index.js";
import * as Web_HTML_HTMLMediaElement_ReadyState from "../Web.HTML.HTMLMediaElement.ReadyState/index.js";
import * as Web_Internal_FFI from "../Web.Internal.FFI/index.js";
var toParentNode = Unsafe_Coerce.unsafeCoerce;
var toNonDocumentTypeChildNode = Unsafe_Coerce.unsafeCoerce;
var toNode = Unsafe_Coerce.unsafeCoerce;
var toHTMLElement = Unsafe_Coerce.unsafeCoerce;
var toEventTarget = Unsafe_Coerce.unsafeCoerce;
var toElement = Unsafe_Coerce.unsafeCoerce;
var toChildNode = Unsafe_Coerce.unsafeCoerce;
var readyState = function (el) {
    return Data_Functor.map(Effect.functorEffect)((function () {
        var $0 = Data_Maybe.fromMaybe(Web_HTML_HTMLMediaElement_ReadyState.HaveNothing.value);
        var $1 = Data_Enum.toEnum(Web_HTML_HTMLMediaElement_ReadyState.boundedEnumReadyState);
        return function ($2) {
            return $0($1($2));
        };
    })())(function () {
        return $foreign["_readyState"](el);
    });
};
var networkState = function (el) {
    return Data_Functor.map(Effect.functorEffect)((function () {
        var $3 = Data_Maybe.fromMaybe(Web_HTML_HTMLMediaElement_NetworkState.Empty.value);
        var $4 = Data_Enum.toEnum(Web_HTML_HTMLMediaElement_NetworkState.boundedEnumNetworkState);
        return function ($5) {
            return $3($4($5));
        };
    })())(function () {
        return $foreign["_networkState"](el);
    });
};
var fromParentNode = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLMediaElement");
var fromNonDocumentTypeChildNode = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLMediaElement");
var fromNode = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLMediaElement");
var fromHTMLElement = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLMediaElement");
var fromEventTarget = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLMediaElement");
var fromElement = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLMediaElement");
var fromChildNode = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLMediaElement");
var canPlayType = function (ty) {
    return function (el) {
        return Data_Functor.map(Effect.functorEffect)((function () {
            var $6 = Data_Maybe.fromMaybe(Web_HTML_HTMLMediaElement_CanPlayType.Unspecified.value);
            return function ($7) {
                return $6(Web_HTML_HTMLMediaElement_CanPlayType.parse($7));
            };
        })())(function () {
            return $foreign["_canPlayType"](ty, el);
        });
    };
};
export {
    src,
    setSrc,
    currentSrc,
    crossOrigin,
    setCrossOrigin,
    preload,
    setPreload,
    load,
    seeking,
    currentTime,
    setCurrentTime,
    duration,
    getStartDate,
    paused,
    defaultPlaybackRate,
    setDefaultPlaybackRate,
    playbackRate,
    setPlaybackRate,
    ended,
    autoplay,
    setAutoplay,
    loop,
    setLoop,
    play,
    pause,
    mediaGroup,
    setMediaGroup,
    controls,
    setControls,
    volume,
    setVolume,
    muted,
    setMuted,
    defaultMuted,
    setDefaultMuted
} from "./foreign.js";
export {
    fromHTMLElement,
    fromElement,
    fromNode,
    fromChildNode,
    fromNonDocumentTypeChildNode,
    fromParentNode,
    fromEventTarget,
    toHTMLElement,
    toElement,
    toNode,
    toChildNode,
    toNonDocumentTypeChildNode,
    toParentNode,
    toEventTarget,
    networkState,
    canPlayType,
    readyState
};
