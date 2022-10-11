// Generated by purs version 0.15.2
import * as Control_Alt from "../Control.Alt/index.js";
import * as Control_Plus from "../Control.Plus/index.js";
import * as Data_Show from "../Data.Show/index.js";
var Alternate = function (x) {
    return x;
};
var showAlternate = function (dictShow) {
    return {
        show: function (v) {
            return "(Alternate " + (Data_Show.show(dictShow)(v) + ")");
        }
    };
};
var semigroupAlternate = function (dictAlt) {
    return {
        append: function (v) {
            return function (v1) {
                return Control_Alt.alt(dictAlt)(v)(v1);
            };
        }
    };
};
var plusAlternate = function (dictPlus) {
    return dictPlus;
};
var ordAlternate = function (dictOrd) {
    return dictOrd;
};
var ord1Alternate = function (dictOrd1) {
    return dictOrd1;
};
var newtypeAlternate = {
    Coercible0: function () {
        return undefined;
    }
};
var monoidAlternate = function (dictPlus) {
    return {
        mempty: Control_Plus.empty(dictPlus),
        Semigroup0: function () {
            return semigroupAlternate(dictPlus.Alt0());
        }
    };
};
var monadAlternate = function (dictMonad) {
    return dictMonad;
};
var functorAlternate = function (dictFunctor) {
    return dictFunctor;
};
var extendAlternate = function (dictExtend) {
    return dictExtend;
};
var eqAlternate = function (dictEq) {
    return dictEq;
};
var eq1Alternate = function (dictEq1) {
    return dictEq1;
};
var comonadAlternate = function (dictComonad) {
    return dictComonad;
};
var boundedAlternate = function (dictBounded) {
    return dictBounded;
};
var bindAlternate = function (dictBind) {
    return dictBind;
};
var applyAlternate = function (dictApply) {
    return dictApply;
};
var applicativeAlternate = function (dictApplicative) {
    return dictApplicative;
};
var alternativeAlternate = function (dictAlternative) {
    return dictAlternative;
};
var altAlternate = function (dictAlt) {
    return dictAlt;
};
export {
    Alternate,
    newtypeAlternate,
    eqAlternate,
    eq1Alternate,
    ordAlternate,
    ord1Alternate,
    boundedAlternate,
    functorAlternate,
    applyAlternate,
    applicativeAlternate,
    altAlternate,
    plusAlternate,
    alternativeAlternate,
    bindAlternate,
    monadAlternate,
    extendAlternate,
    comonadAlternate,
    showAlternate,
    semigroupAlternate,
    monoidAlternate
};
