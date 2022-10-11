// Generated by purs version 0.15.2
import * as Data_Bounded from "../Data.Bounded/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Show from "../Data.Show/index.js";
var Down = function (x) {
    return x;
};
var showDown = function (dictShow) {
    return {
        show: function (v) {
            return "(Down " + (Data_Show.show(dictShow)(v) + ")");
        }
    };
};
var newtypeDown = {
    Coercible0: function () {
        return undefined;
    }
};
var eqDown = function (dictEq) {
    return dictEq;
};
var ordDown = function (dictOrd) {
    return {
        compare: function (v) {
            return function (v1) {
                return Data_Ordering.invert(Data_Ord.compare(dictOrd)(v)(v1));
            };
        },
        Eq0: function () {
            return eqDown(dictOrd.Eq0());
        }
    };
};
var boundedDown = function (dictBounded) {
    return {
        top: Data_Bounded.bottom(dictBounded),
        bottom: Data_Bounded.top(dictBounded),
        Ord0: function () {
            return ordDown(dictBounded.Ord0());
        }
    };
};
export {
    Down,
    newtypeDown,
    eqDown,
    ordDown,
    boundedDown,
    showDown
};
