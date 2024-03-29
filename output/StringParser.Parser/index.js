// Generated by purs version 0.15.2
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Monad_Rec_Class from "../Control.Monad.Rec.Class/index.js";
import * as Data_Boolean from "../Data.Boolean/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
var Parser = function (x) {
    return x;
};
var unParser = function (v) {
    return v;
};
var runParser = function (v) {
    return function (s) {
        return Data_Functor.map(Data_Either.functorEither)(function (v1) {
            return v1.result;
        })(v({
            substring: s,
            position: 0
        }));
    };
};
var printParserError = function (rec) {
    return rec.error + ("; pos = " + Data_Show.show(Data_Show.showInt)(rec.pos));
};
var lazyParser = {
    defer: function (f) {
        return function (str) {
            return unParser(f(Data_Unit.unit))(str);
        };
    }
};
var functorParser = {
    map: function (f) {
        return function (v) {
            var $55 = Data_Functor.map(Data_Either.functorEither)(function (v1) {
                return {
                    result: f(v1.result),
                    suffix: v1.suffix
                };
            });
            return function ($56) {
                return $55(v($56));
            };
        };
    }
};
var fail = function (error) {
    return function (v) {
        return new Data_Either.Left({
            pos: v.position,
            error: error
        });
    };
};
var applyParser = {
    apply: function (v) {
        return function (v1) {
            return function (s) {
                return Control_Bind.bind(Data_Either.bindEither)(v(s))(function (v2) {
                    return Control_Bind.bind(Data_Either.bindEither)(v1(v2.suffix))(function (v3) {
                        return Control_Applicative.pure(Data_Either.applicativeEither)({
                            result: v2.result(v3.result),
                            suffix: v3.suffix
                        });
                    });
                });
            };
        };
    },
    Functor0: function () {
        return functorParser;
    }
};
var bindParser = {
    bind: function (v) {
        return function (f) {
            return function (s) {
                return Control_Bind.bind(Data_Either.bindEither)(v(s))(function (v1) {
                    return unParser(f(v1.result))(v1.suffix);
                });
            };
        };
    },
    Apply0: function () {
        return applyParser;
    }
};
var semigroupParser = function (dictSemigroup) {
    return {
        append: Control_Apply.lift2(applyParser)(Data_Semigroup.append(dictSemigroup))
    };
};
var applicativeParser = {
    pure: function (a) {
        return function (s) {
            return new Data_Either.Right({
                result: a,
                suffix: s
            });
        };
    },
    Apply0: function () {
        return applyParser;
    }
};
var monadParser = {
    Applicative0: function () {
        return applicativeParser;
    },
    Bind1: function () {
        return bindParser;
    }
};
var monadRecParser = {
    tailRecM: function (f) {
        return function (a) {
            var split = function (v) {
                if (v.result instanceof Control_Monad_Rec_Class.Loop) {
                    return new Control_Monad_Rec_Class.Loop({
                        state: v.result.value0,
                        str: v.suffix
                    });
                };
                if (v.result instanceof Control_Monad_Rec_Class.Done) {
                    return new Control_Monad_Rec_Class.Done({
                        result: v.result.value0,
                        suffix: v.suffix
                    });
                };
                throw new Error("Failed pattern match at StringParser.Parser (line 87, column 5 - line 87, column 68): " + [ v.constructor.name ]);
            };
            return function (str) {
                return Control_Monad_Rec_Class.tailRecM(Control_Monad_Rec_Class.monadRecEither)(function (st) {
                    return Data_Functor.map(Data_Either.functorEither)(split)(unParser(f(st.state))(st.str));
                })({
                    state: a,
                    str: str
                });
            };
        };
    },
    Monad0: function () {
        return monadParser;
    }
};
var monoidParser = function (dictMonoid) {
    return {
        mempty: Control_Applicative.pure(applicativeParser)(Data_Monoid.mempty(dictMonoid)),
        Semigroup0: function () {
            return semigroupParser(dictMonoid.Semigroup0());
        }
    };
};
var altParser = {
    alt: function (v) {
        return function (v1) {
            return function (s) {
                var v2 = v(s);
                if (v2 instanceof Data_Either.Left) {
                    if (s.position === v2.value0.pos) {
                        return v1(s);
                    };
                    if (Data_Boolean.otherwise) {
                        return new Data_Either.Left({
                            error: v2.value0.error,
                            pos: v2.value0.pos
                        });
                    };
                };
                return v2;
            };
        };
    },
    Functor0: function () {
        return functorParser;
    }
};
var plusParser = {
    empty: /* #__PURE__ */ fail("No alternative"),
    Alt0: function () {
        return altParser;
    }
};
var alternativeParser = {
    Applicative0: function () {
        return applicativeParser;
    },
    Plus1: function () {
        return plusParser;
    }
};
var monadPlusParser = {
    Monad0: function () {
        return monadParser;
    },
    Alternative1: function () {
        return alternativeParser;
    }
};
export {
    Parser,
    unParser,
    runParser,
    printParserError,
    fail,
    functorParser,
    applyParser,
    applicativeParser,
    altParser,
    plusParser,
    alternativeParser,
    bindParser,
    monadParser,
    monadPlusParser,
    monadRecParser,
    lazyParser,
    semigroupParser,
    monoidParser
};
