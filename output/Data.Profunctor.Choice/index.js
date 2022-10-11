// Generated by purs version 0.15.2
import * as Control_Category from "../Control.Category/index.js";
import * as Control_Semigroupoid from "../Control.Semigroupoid/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Profunctor from "../Data.Profunctor/index.js";
var right = function (dict) {
    return dict.right;
};
var left = function (dict) {
    return dict.left;
};
var splitChoice = function (dictCategory) {
    return function (dictChoice) {
        return function (l) {
            return function (r) {
                return Control_Semigroupoid.composeFlipped(dictCategory.Semigroupoid0())(left(dictChoice)(l))(right(dictChoice)(r));
            };
        };
    };
};
var fanin = function (dictCategory) {
    return function (dictChoice) {
        return function (l) {
            return function (r) {
                var join = Data_Profunctor.dimap(dictChoice.Profunctor0())(Data_Either.either(Control_Category.identity(Control_Category.categoryFn))(Control_Category.identity(Control_Category.categoryFn)))(Control_Category.identity(Control_Category.categoryFn))(Control_Category.identity(dictCategory));
                return Control_Semigroupoid.composeFlipped(dictCategory.Semigroupoid0())(splitChoice(dictCategory)(dictChoice)(l)(r))(join);
            };
        };
    };
};
var choiceFn = {
    left: function (v) {
        return function (v1) {
            if (v1 instanceof Data_Either.Left) {
                return new Data_Either.Left(v(v1.value0));
            };
            if (v1 instanceof Data_Either.Right) {
                return new Data_Either.Right(v1.value0);
            };
            throw new Error("Failed pattern match at Data.Profunctor.Choice (line 32, column 1 - line 35, column 16): " + [ v.constructor.name, v1.constructor.name ]);
        };
    },
    right: /* #__PURE__ */ Data_Functor.map(Data_Either.functorEither),
    Profunctor0: function () {
        return Data_Profunctor.profunctorFn;
    }
};
export {
    left,
    right,
    splitChoice,
    fanin,
    choiceFn
};