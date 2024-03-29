// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Data_Eq from "../Data.Eq/index.js";
var UnsafeRefEqFallback = function (x) {
    return x;
};
var UnsafeRefEq = function (x) {
    return x;
};
var unsafeRefEq = $foreign.reallyUnsafeRefEq;
var eqUnsafeRefEqFallback = function (dictEq) {
    return {
        eq: function (v) {
            return function (v1) {
                return unsafeRefEq(v)(v1) || Data_Eq.eq(dictEq)(v)(v1);
            };
        }
    };
};
var eqUnsafeRefEq = {
    eq: function (v) {
        return function (v1) {
            return unsafeRefEq(v)(v1);
        };
    }
};
export {
    reallyUnsafeRefEq
} from "./foreign.js";
export {
    unsafeRefEq,
    UnsafeRefEq,
    UnsafeRefEqFallback,
    eqUnsafeRefEq,
    eqUnsafeRefEqFallback
};
