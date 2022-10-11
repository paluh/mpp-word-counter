// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Function_Uncurried from "../Data.Function.Uncurried/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
var warn = function () {
    return {};
};
var traceTime = /* #__PURE__ */ Data_Function_Uncurried.runFn2($foreign["_traceTime"]);
var trace = function () {
    return function (a) {
        return function (k) {
            return $foreign["_trace"](a, k);
        };
    };
};
var traceM = function () {
    return function (dictMonad) {
        return function (s) {
            return Control_Bind.discard(Control_Bind.discardUnit)(dictMonad.Bind1())(Control_Applicative.pure(dictMonad.Applicative0())(Data_Unit.unit))(function () {
                return trace()(s)(function (v) {
                    return Control_Applicative.pure(dictMonad.Applicative0())(Data_Unit.unit);
                });
            });
        };
    };
};
var spy = function () {
    return function (tag) {
        return function (a) {
            return $foreign["_spy"](tag, a);
        };
    };
};
var spyWith = function () {
    return function (msg) {
        return function (f) {
            return function (a) {
                return Data_Function["const"](a)(spy()(msg)(f(a)));
            };
        };
    };
};
var $$debugger = function () {
    return function (f) {
        return $foreign["_debugger"](f);
    };
};
export {
    trace,
    traceM,
    traceTime,
    spy,
    spyWith,
    $$debugger as debugger,
    warn
};
