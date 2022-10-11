// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Control_Alternative from "../Control.Alternative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Boolean from "../Data.Boolean/index.js";
import * as Data_Bounded from "../Data.Bounded/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unfoldable from "../Data.Unfoldable/index.js";
import * as Data_Unfoldable1 from "../Data.Unfoldable1/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
var Cardinality = function (x) {
    return x;
};
var toEnum = function (dict) {
    return dict.toEnum;
};
var succ = function (dict) {
    return dict.succ;
};
var upFromIncluding = function (dictEnum) {
    return function (dictUnfoldable1) {
        return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(Control_Apply.apply(Control_Apply.applyFn)(Data_Tuple.Tuple.create)(succ(dictEnum)));
    };
};
var showCardinality = {
    show: function (v) {
        return "(Cardinality " + (Data_Show.show(Data_Show.showInt)(v) + ")");
    }
};
var pred = function (dict) {
    return dict.pred;
};
var ordCardinality = Data_Ord.ordInt;
var newtypeCardinality = {
    Coercible0: function () {
        return undefined;
    }
};
var fromEnum = function (dict) {
    return dict.fromEnum;
};
var toEnumWithDefaults = function (dictBoundedEnum) {
    return function (low) {
        return function (high) {
            return function (x) {
                var v = toEnum(dictBoundedEnum)(x);
                if (v instanceof Data_Maybe.Just) {
                    return v.value0;
                };
                if (v instanceof Data_Maybe.Nothing) {
                    var $54 = x < fromEnum(dictBoundedEnum)(Data_Bounded.bottom(dictBoundedEnum.Bounded0()));
                    if ($54) {
                        return low;
                    };
                    return high;
                };
                throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [ v.constructor.name ]);
            };
        };
    };
};
var eqCardinality = Data_Eq.eqInt;
var enumUnit = /* #__PURE__ */ (function () {
    return {
        succ: Data_Function["const"](Data_Maybe.Nothing.value),
        pred: Data_Function["const"](Data_Maybe.Nothing.value),
        Ord0: function () {
            return Data_Ord.ordUnit;
        }
    };
})();
var enumTuple = function (dictEnum) {
    return function (dictBoundedEnum) {
        return {
            succ: function (v) {
                return Data_Maybe.maybe(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Function.flip(Data_Tuple.Tuple.create)(Data_Bounded.bottom(dictBoundedEnum.Bounded0())))(succ(dictEnum)(v.value0)))((function () {
                    var $97 = Data_Tuple.Tuple.create(v.value0);
                    return function ($98) {
                        return Data_Maybe.Just.create($97($98));
                    };
                })())(succ(dictBoundedEnum.Enum1())(v.value1));
            },
            pred: function (v) {
                return Data_Maybe.maybe(Data_Functor.map(Data_Maybe.functorMaybe)(Data_Function.flip(Data_Tuple.Tuple.create)(Data_Bounded.top(dictBoundedEnum.Bounded0())))(pred(dictEnum)(v.value0)))((function () {
                    var $99 = Data_Tuple.Tuple.create(v.value0);
                    return function ($100) {
                        return Data_Maybe.Just.create($99($100));
                    };
                })())(pred(dictBoundedEnum.Enum1())(v.value1));
            },
            Ord0: function () {
                return Data_Tuple.ordTuple(dictEnum.Ord0())((dictBoundedEnum.Enum1()).Ord0());
            }
        };
    };
};
var enumOrdering = {
    succ: function (v) {
        if (v instanceof Data_Ordering.LT) {
            return new Data_Maybe.Just(Data_Ordering.EQ.value);
        };
        if (v instanceof Data_Ordering.EQ) {
            return new Data_Maybe.Just(Data_Ordering.GT.value);
        };
        if (v instanceof Data_Ordering.GT) {
            return Data_Maybe.Nothing.value;
        };
        throw new Error("Failed pattern match at Data.Enum (line 72, column 1 - line 78, column 20): " + [ v.constructor.name ]);
    },
    pred: function (v) {
        if (v instanceof Data_Ordering.LT) {
            return Data_Maybe.Nothing.value;
        };
        if (v instanceof Data_Ordering.EQ) {
            return new Data_Maybe.Just(Data_Ordering.LT.value);
        };
        if (v instanceof Data_Ordering.GT) {
            return new Data_Maybe.Just(Data_Ordering.EQ.value);
        };
        throw new Error("Failed pattern match at Data.Enum (line 72, column 1 - line 78, column 20): " + [ v.constructor.name ]);
    },
    Ord0: function () {
        return Data_Ord.ordOrdering;
    }
};
var enumMaybe = function (dictBoundedEnum) {
    return {
        succ: function (v) {
            if (v instanceof Data_Maybe.Nothing) {
                return new Data_Maybe.Just(new Data_Maybe.Just(Data_Bounded.bottom(dictBoundedEnum.Bounded0())));
            };
            if (v instanceof Data_Maybe.Just) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Maybe.Just.create)(succ(dictBoundedEnum.Enum1())(v.value0));
            };
            throw new Error("Failed pattern match at Data.Enum (line 80, column 1 - line 84, column 32): " + [ v.constructor.name ]);
        },
        pred: function (v) {
            if (v instanceof Data_Maybe.Nothing) {
                return Data_Maybe.Nothing.value;
            };
            if (v instanceof Data_Maybe.Just) {
                return new Data_Maybe.Just(pred(dictBoundedEnum.Enum1())(v.value0));
            };
            throw new Error("Failed pattern match at Data.Enum (line 80, column 1 - line 84, column 32): " + [ v.constructor.name ]);
        },
        Ord0: function () {
            return Data_Maybe.ordMaybe((dictBoundedEnum.Enum1()).Ord0());
        }
    };
};
var enumInt = {
    succ: function (n) {
        var $67 = n < Data_Bounded.top(Data_Bounded.boundedInt);
        if ($67) {
            return new Data_Maybe.Just(n + 1 | 0);
        };
        return Data_Maybe.Nothing.value;
    },
    pred: function (n) {
        var $68 = n > Data_Bounded.bottom(Data_Bounded.boundedInt);
        if ($68) {
            return new Data_Maybe.Just(n - 1 | 0);
        };
        return Data_Maybe.Nothing.value;
    },
    Ord0: function () {
        return Data_Ord.ordInt;
    }
};
var enumFromTo = function (dictEnum) {
    return function (dictUnfoldable1) {
        var go = function (step) {
            return function (op) {
                return function (to) {
                    return function (a) {
                        return new Data_Tuple.Tuple(a, Control_Bind.bind(Data_Maybe.bindMaybe)(step(a))(function (a$prime) {
                            return Data_Functor.voidLeft(Data_Maybe.functorMaybe)(Control_Alternative.guard(Data_Maybe.alternativeMaybe)(op(a$prime)(to)))(a$prime);
                        }));
                    };
                };
            };
        };
        return function (v) {
            return function (v1) {
                if (Data_Eq.eq((dictEnum.Ord0()).Eq0())(v)(v1)) {
                    return Data_Unfoldable1.singleton(dictUnfoldable1)(v);
                };
                if (Data_Ord.lessThan(dictEnum.Ord0())(v)(v1)) {
                    return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(go(succ(dictEnum))(Data_Ord.lessThanOrEq(dictEnum.Ord0()))(v1))(v);
                };
                if (Data_Boolean.otherwise) {
                    return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(go(pred(dictEnum))(Data_Ord.greaterThanOrEq(dictEnum.Ord0()))(v1))(v);
                };
                throw new Error("Failed pattern match at Data.Enum (line 186, column 14 - line 190, column 51): " + [ v.constructor.name, v1.constructor.name ]);
            };
        };
    };
};
var enumFromThenTo = function (dictUnfoldable) {
    return function (dictFunctor) {
        return function (dictBoundedEnum) {
            var go = function (step) {
                return function (to) {
                    return function (e) {
                        if (e <= to) {
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(e, e + step | 0));
                        };
                        if (Data_Boolean.otherwise) {
                            return Data_Maybe.Nothing.value;
                        };
                        throw new Error("Failed pattern match at Data.Enum (line 217, column 5 - line 219, column 28): " + [ step.constructor.name, to.constructor.name, e.constructor.name ]);
                    };
                };
            };
            return function (a) {
                return function (b) {
                    return function (c) {
                        var c$prime = fromEnum(dictBoundedEnum)(c);
                        var b$prime = fromEnum(dictBoundedEnum)(b);
                        var a$prime = fromEnum(dictBoundedEnum)(a);
                        return Data_Functor.map(dictFunctor)((function () {
                            var $101 = Data_Maybe.fromJust();
                            var $102 = toEnum(dictBoundedEnum);
                            return function ($103) {
                                return $101($102($103));
                            };
                        })())(Data_Unfoldable.unfoldr(dictUnfoldable)(go(b$prime - a$prime | 0)(c$prime))(a$prime));
                    };
                };
            };
        };
    };
};
var enumEither = function (dictBoundedEnum) {
    return function (dictBoundedEnum1) {
        return {
            succ: function (v) {
                if (v instanceof Data_Either.Left) {
                    return Data_Maybe.maybe(new Data_Maybe.Just(new Data_Either.Right(Data_Bounded.bottom(dictBoundedEnum1.Bounded0()))))(function ($104) {
                        return Data_Maybe.Just.create(Data_Either.Left.create($104));
                    })(succ(dictBoundedEnum.Enum1())(v.value0));
                };
                if (v instanceof Data_Either.Right) {
                    return Data_Maybe.maybe(Data_Maybe.Nothing.value)(function ($105) {
                        return Data_Maybe.Just.create(Data_Either.Right.create($105));
                    })(succ(dictBoundedEnum1.Enum1())(v.value0));
                };
                throw new Error("Failed pattern match at Data.Enum (line 86, column 1 - line 90, column 69): " + [ v.constructor.name ]);
            },
            pred: function (v) {
                if (v instanceof Data_Either.Left) {
                    return Data_Maybe.maybe(Data_Maybe.Nothing.value)(function ($106) {
                        return Data_Maybe.Just.create(Data_Either.Left.create($106));
                    })(pred(dictBoundedEnum.Enum1())(v.value0));
                };
                if (v instanceof Data_Either.Right) {
                    return Data_Maybe.maybe(new Data_Maybe.Just(new Data_Either.Left(Data_Bounded.top(dictBoundedEnum.Bounded0()))))(function ($107) {
                        return Data_Maybe.Just.create(Data_Either.Right.create($107));
                    })(pred(dictBoundedEnum1.Enum1())(v.value0));
                };
                throw new Error("Failed pattern match at Data.Enum (line 86, column 1 - line 90, column 69): " + [ v.constructor.name ]);
            },
            Ord0: function () {
                return Data_Either.ordEither((dictBoundedEnum.Enum1()).Ord0())((dictBoundedEnum1.Enum1()).Ord0());
            }
        };
    };
};
var enumBoolean = {
    succ: function (v) {
        if (!v) {
            return new Data_Maybe.Just(true);
        };
        return Data_Maybe.Nothing.value;
    },
    pred: function (v) {
        if (v) {
            return new Data_Maybe.Just(false);
        };
        return Data_Maybe.Nothing.value;
    },
    Ord0: function () {
        return Data_Ord.ordBoolean;
    }
};
var downFromIncluding = function (dictEnum) {
    return function (dictUnfoldable1) {
        return Data_Unfoldable1.unfoldr1(dictUnfoldable1)(Control_Apply.apply(Control_Apply.applyFn)(Data_Tuple.Tuple.create)(pred(dictEnum)));
    };
};
var diag = function (a) {
    return new Data_Tuple.Tuple(a, a);
};
var downFrom = function (dictEnum) {
    return function (dictUnfoldable) {
        return Data_Unfoldable.unfoldr(dictUnfoldable)((function () {
            var $108 = Data_Functor.map(Data_Maybe.functorMaybe)(diag);
            var $109 = pred(dictEnum);
            return function ($110) {
                return $108($109($110));
            };
        })());
    };
};
var upFrom = function (dictEnum) {
    return function (dictUnfoldable) {
        return Data_Unfoldable.unfoldr(dictUnfoldable)((function () {
            var $111 = Data_Functor.map(Data_Maybe.functorMaybe)(diag);
            var $112 = succ(dictEnum);
            return function ($113) {
                return $111($112($113));
            };
        })());
    };
};
var defaultToEnum = function (dictBounded) {
    return function (dictEnum) {
        return function (i$prime) {
            var go = function ($copy_i) {
                return function ($copy_x) {
                    var $tco_var_i = $copy_i;
                    var $tco_done = false;
                    var $tco_result;
                    function $tco_loop(i, x) {
                        var $82 = i === 0;
                        if ($82) {
                            $tco_done = true;
                            return new Data_Maybe.Just(x);
                        };
                        var v = succ(dictEnum)(x);
                        if (v instanceof Data_Maybe.Just) {
                            $tco_var_i = i - 1 | 0;
                            $copy_x = v.value0;
                            return;
                        };
                        if (v instanceof Data_Maybe.Nothing) {
                            $tco_done = true;
                            return Data_Maybe.Nothing.value;
                        };
                        throw new Error("Failed pattern match at Data.Enum (line 296, column 12 - line 298, column 33): " + [ v.constructor.name ]);
                    };
                    while (!$tco_done) {
                        $tco_result = $tco_loop($tco_var_i, $copy_x);
                    };
                    return $tco_result;
                };
            };
            var $85 = i$prime < 0;
            if ($85) {
                return Data_Maybe.Nothing.value;
            };
            return go(i$prime)(Data_Bounded.bottom(dictBounded));
        };
    };
};
var defaultSucc = function (toEnum$prime) {
    return function (fromEnum$prime) {
        return function (a) {
            return toEnum$prime(fromEnum$prime(a) + 1 | 0);
        };
    };
};
var defaultPred = function (toEnum$prime) {
    return function (fromEnum$prime) {
        return function (a) {
            return toEnum$prime(fromEnum$prime(a) - 1 | 0);
        };
    };
};
var defaultFromEnum = function (dictEnum) {
    var go = function ($copy_i) {
        return function ($copy_x) {
            var $tco_var_i = $copy_i;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(i, x) {
                var v = pred(dictEnum)(x);
                if (v instanceof Data_Maybe.Just) {
                    $tco_var_i = i + 1 | 0;
                    $copy_x = v.value0;
                    return;
                };
                if (v instanceof Data_Maybe.Nothing) {
                    $tco_done = true;
                    return i;
                };
                throw new Error("Failed pattern match at Data.Enum (line 309, column 5 - line 311, column 19): " + [ v.constructor.name ]);
            };
            while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_i, $copy_x);
            };
            return $tco_result;
        };
    };
    return go(0);
};
var defaultCardinality = function (dictBounded) {
    return function (dictEnum) {
        var go = function ($copy_i) {
            return function ($copy_x) {
                var $tco_var_i = $copy_i;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(i, x) {
                    var v = succ(dictEnum)(x);
                    if (v instanceof Data_Maybe.Just) {
                        $tco_var_i = i + 1 | 0;
                        $copy_x = v.value0;
                        return;
                    };
                    if (v instanceof Data_Maybe.Nothing) {
                        $tco_done = true;
                        return i;
                    };
                    throw new Error("Failed pattern match at Data.Enum (line 276, column 5 - line 278, column 19): " + [ v.constructor.name ]);
                };
                while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_i, $copy_x);
                };
                return $tco_result;
            };
        };
        return go(1)(Data_Bounded.bottom(dictBounded));
    };
};
var charToEnum = function (v) {
    if (v >= Data_Bounded.bottom(Data_Bounded.boundedInt) && v <= Data_Bounded.top(Data_Bounded.boundedInt)) {
        return new Data_Maybe.Just($foreign.fromCharCode(v));
    };
    return Data_Maybe.Nothing.value;
};
var enumChar = {
    succ: /* #__PURE__ */ defaultSucc(charToEnum)($foreign.toCharCode),
    pred: /* #__PURE__ */ defaultPred(charToEnum)($foreign.toCharCode),
    Ord0: function () {
        return Data_Ord.ordChar;
    }
};
var cardinality = function (dict) {
    return dict.cardinality;
};
var boundedEnumUnit = {
    cardinality: 1,
    toEnum: function (v) {
        if (v === 0) {
            return new Data_Maybe.Just(Data_Unit.unit);
        };
        return Data_Maybe.Nothing.value;
    },
    fromEnum: /* #__PURE__ */ Data_Function["const"](0),
    Bounded0: function () {
        return Data_Bounded.boundedUnit;
    },
    Enum1: function () {
        return enumUnit;
    }
};
var boundedEnumOrdering = {
    cardinality: 3,
    toEnum: function (v) {
        if (v === 0) {
            return new Data_Maybe.Just(Data_Ordering.LT.value);
        };
        if (v === 1) {
            return new Data_Maybe.Just(Data_Ordering.EQ.value);
        };
        if (v === 2) {
            return new Data_Maybe.Just(Data_Ordering.GT.value);
        };
        return Data_Maybe.Nothing.value;
    },
    fromEnum: function (v) {
        if (v instanceof Data_Ordering.LT) {
            return 0;
        };
        if (v instanceof Data_Ordering.EQ) {
            return 1;
        };
        if (v instanceof Data_Ordering.GT) {
            return 2;
        };
        throw new Error("Failed pattern match at Data.Enum (line 137, column 1 - line 145, column 18): " + [ v.constructor.name ]);
    },
    Bounded0: function () {
        return Data_Bounded.boundedOrdering;
    },
    Enum1: function () {
        return enumOrdering;
    }
};
var boundedEnumChar = /* #__PURE__ */ (function () {
    return {
        cardinality: $foreign.toCharCode(Data_Bounded.top(Data_Bounded.boundedChar)) - $foreign.toCharCode(Data_Bounded.bottom(Data_Bounded.boundedChar)) | 0,
        toEnum: charToEnum,
        fromEnum: $foreign.toCharCode,
        Bounded0: function () {
            return Data_Bounded.boundedChar;
        },
        Enum1: function () {
            return enumChar;
        }
    };
})();
var boundedEnumBoolean = {
    cardinality: 2,
    toEnum: function (v) {
        if (v === 0) {
            return new Data_Maybe.Just(false);
        };
        if (v === 1) {
            return new Data_Maybe.Just(true);
        };
        return Data_Maybe.Nothing.value;
    },
    fromEnum: function (v) {
        if (!v) {
            return 0;
        };
        if (v) {
            return 1;
        };
        throw new Error("Failed pattern match at Data.Enum (line 118, column 1 - line 124, column 20): " + [ v.constructor.name ]);
    },
    Bounded0: function () {
        return Data_Bounded.boundedBoolean;
    },
    Enum1: function () {
        return enumBoolean;
    }
};
export {
    succ,
    pred,
    cardinality,
    toEnum,
    fromEnum,
    toEnumWithDefaults,
    Cardinality,
    enumFromTo,
    enumFromThenTo,
    upFrom,
    upFromIncluding,
    downFrom,
    downFromIncluding,
    defaultSucc,
    defaultPred,
    defaultCardinality,
    defaultToEnum,
    defaultFromEnum,
    enumBoolean,
    enumInt,
    enumChar,
    enumUnit,
    enumOrdering,
    enumMaybe,
    enumEither,
    enumTuple,
    boundedEnumBoolean,
    boundedEnumChar,
    boundedEnumUnit,
    boundedEnumOrdering,
    newtypeCardinality,
    eqCardinality,
    ordCardinality,
    showCardinality
};