// Generated by purs version 0.15.2
import * as Control_Comonad from "../Control.Comonad/index.js";
import * as Control_Extend from "../Control.Extend/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
var StoreT = function (x) {
    return x;
};
var runStoreT = function (v) {
    return v;
};
var newtypeStoreT = {
    Coercible0: function () {
        return undefined;
    }
};
var functorStoreT = function (dictFunctor) {
    return {
        map: function (f) {
            return function (v) {
                return new Data_Tuple.Tuple(Data_Functor.map(dictFunctor)(function (h) {
                    return function ($25) {
                        return f(h($25));
                    };
                })(v.value0), v.value1);
            };
        }
    };
};
var extendStoreT = function (dictExtend) {
    return {
        extend: function (f) {
            return function (v) {
                return new Data_Tuple.Tuple(Control_Extend.extend(dictExtend)(function (w$prime) {
                    return function (s$prime) {
                        return f(new Data_Tuple.Tuple(w$prime, s$prime));
                    };
                })(v.value0), v.value1);
            };
        },
        Functor0: function () {
            return functorStoreT(dictExtend.Functor0());
        }
    };
};
var comonadTransStoreT = {
    lower: function (dictComonad) {
        return function (v) {
            return Data_Functor.map((dictComonad.Extend0()).Functor0())(function (v1) {
                return v1(v.value1);
            })(v.value0);
        };
    }
};
var comonadStoreT = function (dictComonad) {
    return {
        extract: function (v) {
            return Control_Comonad.extract(dictComonad)(v.value0)(v.value1);
        },
        Extend0: function () {
            return extendStoreT(dictComonad.Extend0());
        }
    };
};
export {
    StoreT,
    runStoreT,
    newtypeStoreT,
    functorStoreT,
    extendStoreT,
    comonadStoreT,
    comonadTransStoreT
};
