// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as React_Basic from "../React.Basic/index.js";
var globalEvent = function (target) {
    return function (v) {
        return function (child) {
            return React_Basic.element($foreign.globalEvent_)({
                target: target,
                eventType: v.eventType,
                handler: v.handler,
                options: v.options,
                child: child
            });
        };
    };
};
var globalEvents = function (target) {
    return Data_Function.flip(Data_Foldable.foldr(Data_Foldable.foldableArray)(globalEvent(target)));
};
var windowEvents = /* #__PURE__ */ globalEvents($foreign.unsafeWindowEventTarget);
var windowEvent = /* #__PURE__ */ (function () {
    var $7 = Control_Applicative.pure(Control_Applicative.applicativeArray);
    return function ($8) {
        return windowEvents($7($8));
    };
})();
var defaultOptions = {
    capture: false,
    once: false,
    passive: false
};
export {
    defaultOptions,
    globalEvent,
    globalEvents,
    windowEvent,
    windowEvents
};