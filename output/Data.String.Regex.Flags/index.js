// Generated by purs version 0.15.2
import * as Control_Alternative from "../Control.Alternative/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_String_Common from "../Data.String.Common/index.js";
var RegexFlags = function (x) {
    return x;
};
var unicode = {
    global: false,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    sticky: false,
    unicode: true
};
var sticky = {
    global: false,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    sticky: true,
    unicode: false
};
var showRegexFlags = {
    show: function (v) {
        var usedFlags = Data_Semigroup.append(Data_Semigroup.semigroupArray)([  ])(Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Functor.voidLeft(Data_Functor.functorArray)(Control_Alternative.guard(Control_Alternative.alternativeArray)(v.global))("global"))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Functor.voidLeft(Data_Functor.functorArray)(Control_Alternative.guard(Control_Alternative.alternativeArray)(v.ignoreCase))("ignoreCase"))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Functor.voidLeft(Data_Functor.functorArray)(Control_Alternative.guard(Control_Alternative.alternativeArray)(v.multiline))("multiline"))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Functor.voidLeft(Data_Functor.functorArray)(Control_Alternative.guard(Control_Alternative.alternativeArray)(v.dotAll))("dotAll"))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_Functor.voidLeft(Data_Functor.functorArray)(Control_Alternative.guard(Control_Alternative.alternativeArray)(v.sticky))("sticky"))(Data_Functor.voidLeft(Data_Functor.functorArray)(Control_Alternative.guard(Control_Alternative.alternativeArray)(v.unicode))("unicode")))))));
        var $4 = Data_Eq.eq(Data_Eq.eqArray(Data_Eq.eqString))(usedFlags)([  ]);
        if ($4) {
            return "noFlags";
        };
        return "(" + (Data_String_Common.joinWith(" <> ")(usedFlags) + ")");
    }
};
var semigroupRegexFlags = {
    append: function (v) {
        return function (v1) {
            return {
                global: v.global || v1.global,
                ignoreCase: v.ignoreCase || v1.ignoreCase,
                multiline: v.multiline || v1.multiline,
                dotAll: v.dotAll || v1.dotAll,
                sticky: v.sticky || v1.sticky,
                unicode: v.unicode || v1.unicode
            };
        };
    }
};
var noFlags = {
    global: false,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    sticky: false,
    unicode: false
};
var newtypeRegexFlags = {
    Coercible0: function () {
        return undefined;
    }
};
var multiline = {
    global: false,
    ignoreCase: false,
    multiline: true,
    dotAll: false,
    sticky: false,
    unicode: false
};
var monoidRegexFlags = {
    mempty: noFlags,
    Semigroup0: function () {
        return semigroupRegexFlags;
    }
};
var ignoreCase = {
    global: false,
    ignoreCase: true,
    multiline: false,
    dotAll: false,
    sticky: false,
    unicode: false
};
var global = {
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    sticky: false,
    unicode: false
};
var eqRegexFlags = /* #__PURE__ */ Data_Eq.eqRec()(/* #__PURE__ */ Data_Eq.eqRowCons(/* #__PURE__ */ Data_Eq.eqRowCons(/* #__PURE__ */ Data_Eq.eqRowCons(/* #__PURE__ */ Data_Eq.eqRowCons(/* #__PURE__ */ Data_Eq.eqRowCons(/* #__PURE__ */ Data_Eq.eqRowCons(Data_Eq.eqRowNil)()({
    reflectSymbol: function () {
        return "unicode";
    }
})(Data_Eq.eqBoolean))()({
    reflectSymbol: function () {
        return "sticky";
    }
})(Data_Eq.eqBoolean))()({
    reflectSymbol: function () {
        return "multiline";
    }
})(Data_Eq.eqBoolean))()({
    reflectSymbol: function () {
        return "ignoreCase";
    }
})(Data_Eq.eqBoolean))()({
    reflectSymbol: function () {
        return "global";
    }
})(Data_Eq.eqBoolean))()({
    reflectSymbol: function () {
        return "dotAll";
    }
})(Data_Eq.eqBoolean));
var dotAll = {
    global: false,
    ignoreCase: false,
    multiline: false,
    dotAll: true,
    sticky: false,
    unicode: false
};
export {
    RegexFlags,
    noFlags,
    global,
    ignoreCase,
    multiline,
    sticky,
    unicode,
    dotAll,
    newtypeRegexFlags,
    semigroupRegexFlags,
    monoidRegexFlags,
    eqRegexFlags,
    showRegexFlags
};
