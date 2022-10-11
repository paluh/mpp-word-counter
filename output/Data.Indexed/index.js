// Generated by purs version 0.15.2
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Show from "../Data.Show/index.js";
var Indexed = function (x) {
    return x;
};
var showIndexed = function (dictShow) {
    return {
        show: function (v) {
            return "(Indexed " + (Data_Show.show(dictShow)(v) + ")");
        }
    };
};
var ordIndexed = function (dictOrd) {
    return dictOrd;
};
var ord1Indexed = function (dictOrd1) {
    return dictOrd1;
};
var newtypeIndexed = {
    Coercible0: function () {
        return undefined;
    }
};
var monadIndexed = function (dictMonad) {
    return dictMonad;
};
var ixFunctorIndexed = function (dictFunctor) {
    return {
        imap: function (f) {
            return function (v) {
                return Data_Functor.map(dictFunctor)(f)(v);
            };
        }
    };
};
var ixApplyIndexed = function (dictApply) {
    return {
        iapply: function (v) {
            return function (v1) {
                return Control_Apply.apply(dictApply)(v)(v1);
            };
        },
        IxFunctor0: function () {
            return ixFunctorIndexed(dictApply.Functor0());
        }
    };
};
var ixBindIndexed = function (dictBind) {
    return {
        ibind: function (v) {
            return function (f) {
                return Control_Bind.bind(dictBind)(v)(function (a) {
                    var v1 = f(a);
                    return v1;
                });
            };
        },
        IxApply0: function () {
            return ixApplyIndexed(dictBind.Apply0());
        }
    };
};
var ixApplicativeIndexed = function (dictApplicative) {
    return {
        ipure: (function () {
            var $30 = Control_Applicative.pure(dictApplicative);
            return function ($31) {
                return Indexed($30($31));
            };
        })(),
        IxApply0: function () {
            return ixApplyIndexed(dictApplicative.Apply0());
        }
    };
};
var ixMonadIndexed = function (dictMonad) {
    return {
        IxApplicative0: function () {
            return ixApplicativeIndexed(dictMonad.Applicative0());
        },
        IxBind1: function () {
            return ixBindIndexed(dictMonad.Bind1());
        }
    };
};
var functorIndexed = function (dictFunctor) {
    return dictFunctor;
};
var eqIndexed = function (dictEq) {
    return dictEq;
};
var eq1Indexed = function (dictEq1) {
    return dictEq1;
};
var bindIndexed = function (dictBind) {
    return dictBind;
};
var applyIndexed = function (dictApply) {
    return dictApply;
};
var applicativeIndexed = function (dictApplicative) {
    return dictApplicative;
};
export {
    Indexed,
    newtypeIndexed,
    eqIndexed,
    eq1Indexed,
    ordIndexed,
    ord1Indexed,
    showIndexed,
    functorIndexed,
    applyIndexed,
    applicativeIndexed,
    bindIndexed,
    monadIndexed,
    ixFunctorIndexed,
    ixApplyIndexed,
    ixApplicativeIndexed,
    ixBindIndexed,
    ixMonadIndexed
};
