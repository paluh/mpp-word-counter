// Generated by purs version 0.15.2
import * as Control_Alt from "../Control.Alt/index.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Lazy from "../Control.Lazy/index.js";
import * as Control_Monad_Rec_Class from "../Control.Monad.Rec.Class/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_List from "../Data.List/index.js";
import * as Data_List_NonEmpty from "../Data.List.NonEmpty/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_NonEmpty from "../Data.NonEmpty/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as StringParser_Parser from "../StringParser.Parser/index.js";
var withError = function (p) {
    return function (msg) {
        return Control_Alt.alt(StringParser_Parser.altParser)(p)(StringParser_Parser.fail(msg));
    };
};
var $$try = function (v) {
    return function (s) {
        var v1 = v(s);
        if (v1 instanceof Data_Either.Left) {
            return new Data_Either.Left({
                pos: s.position,
                error: v1.value0.error
            });
        };
        return v1;
    };
};
var optional = function (p) {
    return Control_Alt.alt(StringParser_Parser.altParser)(Control_Bind.bind(StringParser_Parser.bindParser)(p)(function (v) {
        return Control_Applicative.pure(StringParser_Parser.applicativeParser)(Data_Unit.unit);
    }))(Control_Applicative.pure(StringParser_Parser.applicativeParser)(Data_Unit.unit));
};
var option = function (a) {
    return function (p) {
        return Control_Alt.alt(StringParser_Parser.altParser)(p)(Control_Applicative.pure(StringParser_Parser.applicativeParser)(a));
    };
};
var optionMaybe = function (p) {
    return option(Data_Maybe.Nothing.value)(Data_Functor.map(StringParser_Parser.functorParser)(Data_Maybe.Just.create)(p));
};
var lookAhead = function (v) {
    return function (s) {
        var v1 = v(s);
        if (v1 instanceof Data_Either.Right) {
            return new Data_Either.Right({
                result: v1.value0.result,
                suffix: s
            });
        };
        return v1;
    };
};
var tryAhead = function ($20) {
    return $$try(lookAhead($20));
};
var cons$prime = function (h) {
    return function (t) {
        return new Data_NonEmpty.NonEmpty(h, t);
    };
};
var sepEndBy1 = function (p) {
    return function (sep) {
        return Control_Bind.bind(StringParser_Parser.bindParser)(p)(function (a) {
            return Control_Alt.alt(StringParser_Parser.altParser)(Control_Bind.bind(StringParser_Parser.bindParser)(sep)(function () {
                return Control_Bind.bind(StringParser_Parser.bindParser)(sepEndBy(p)(sep))(function (as) {
                    return Control_Applicative.pure(StringParser_Parser.applicativeParser)(cons$prime(a)(as));
                });
            }))(Control_Applicative.pure(StringParser_Parser.applicativeParser)(Data_List_NonEmpty.singleton(a)));
        });
    };
};
var sepEndBy = function (p) {
    return function (sep) {
        return Control_Alt.alt(StringParser_Parser.altParser)(Data_Functor.mapFlipped(StringParser_Parser.functorParser)(sepEndBy1(p)(sep))(Data_List_NonEmpty.toList))(Control_Alt.alt(StringParser_Parser.altParser)(Data_Functor.voidLeft(StringParser_Parser.functorParser)(sep)(Data_List_Types.Nil.value))(Control_Applicative.pure(StringParser_Parser.applicativeParser)(Data_List_Types.Nil.value)));
    };
};
var choice = function (dictFoldable) {
    return Data_Foldable.foldl(dictFoldable)(Control_Alt.alt(StringParser_Parser.altParser))(StringParser_Parser.fail("Nothing to parse"));
};
var chainr1$prime = function (p) {
    return function (f) {
        return function (a) {
            return Control_Alt.alt(StringParser_Parser.altParser)(Control_Bind.bind(StringParser_Parser.bindParser)(f)(function (f$prime) {
                return Control_Bind.bind(StringParser_Parser.bindParser)(chainr1(p)(f))(function (a$prime) {
                    return Control_Applicative.pure(StringParser_Parser.applicativeParser)(f$prime(a)(a$prime));
                });
            }))(Control_Applicative.pure(StringParser_Parser.applicativeParser)(a));
        };
    };
};
var chainr1 = function (p) {
    return function (f) {
        return Control_Bind.bind(StringParser_Parser.bindParser)(p)(function (a) {
            return chainr1$prime(p)(f)(a);
        });
    };
};
var chainr = function (p) {
    return function (f) {
        return function (a) {
            return Control_Alt.alt(StringParser_Parser.altParser)(chainr1(p)(f))(Control_Applicative.pure(StringParser_Parser.applicativeParser)(a));
        };
    };
};
var chainl1$prime = function (p) {
    return function (f) {
        return function (a) {
            return Control_Alt.alt(StringParser_Parser.altParser)(Control_Bind.bind(StringParser_Parser.bindParser)(f)(function (f$prime) {
                return Control_Bind.bind(StringParser_Parser.bindParser)(p)(function (a$prime) {
                    return chainl1$prime(p)(f)(f$prime(a)(a$prime));
                });
            }))(Control_Applicative.pure(StringParser_Parser.applicativeParser)(a));
        };
    };
};
var chainl1 = function (p) {
    return function (f) {
        return Control_Bind.bind(StringParser_Parser.bindParser)(p)(function (a) {
            return chainl1$prime(p)(f)(a);
        });
    };
};
var chainl = function (p) {
    return function (f) {
        return function (a) {
            return Control_Alt.alt(StringParser_Parser.altParser)(chainl1(p)(f))(Control_Applicative.pure(StringParser_Parser.applicativeParser)(a));
        };
    };
};
var between = function (open) {
    return function (close) {
        return function (p) {
            return Control_Apply.applyFirst(StringParser_Parser.applyParser)(Control_Apply.applySecond(StringParser_Parser.applyParser)(open)(p))(close);
        };
    };
};
var assertConsume = function (v) {
    return function (s) {
        var v1 = v(s);
        if (v1 instanceof Data_Either.Right) {
            var $18 = s.position < v1.value0.suffix.position;
            if ($18) {
                return new Data_Either.Right(v1.value0);
            };
            return new Data_Either.Left({
                pos: s.position,
                error: "Consumed no input."
            });
        };
        return v1;
    };
};
var many = /* #__PURE__ */ (function () {
    var $21 = Data_List.manyRec(StringParser_Parser.monadRecParser)(StringParser_Parser.alternativeParser);
    return function ($22) {
        return $21(assertConsume($22));
    };
})();
var many1 = function (p) {
    return Control_Apply.apply(StringParser_Parser.applyParser)(Data_Functor.map(StringParser_Parser.functorParser)(cons$prime)(p))(many(p));
};
var endBy1 = function (p) {
    return function (sep) {
        return many1(Control_Apply.applyFirst(StringParser_Parser.applyParser)(p)(sep));
    };
};
var endBy = function (p) {
    return function (sep) {
        return Control_Alt.alt(StringParser_Parser.altParser)(Data_Functor.mapFlipped(StringParser_Parser.functorParser)(endBy1(p)(sep))(Data_List_NonEmpty.toList))(Data_Functor.voidLeft(StringParser_Parser.functorParser)(sep)(Data_List_Types.Nil.value));
    };
};
var sepBy1 = function (p) {
    return function (sep) {
        return Control_Bind.bind(StringParser_Parser.bindParser)(p)(function (a) {
            return Control_Bind.bind(StringParser_Parser.bindParser)(many(Control_Apply.applySecond(StringParser_Parser.applyParser)(sep)(p)))(function (as) {
                return Control_Applicative.pure(StringParser_Parser.applicativeParser)(cons$prime(a)(as));
            });
        });
    };
};
var sepBy = function (p) {
    return function (sep) {
        return Control_Alt.alt(StringParser_Parser.altParser)(Data_Functor.map(StringParser_Parser.functorParser)(Data_List_NonEmpty.toList)(sepBy1(p)(sep)))(Control_Applicative.pure(StringParser_Parser.applicativeParser)(Data_List_Types.Nil.value));
    };
};
var many1Till = function (p) {
    return function (end) {
        var ending = function (acc) {
            return Control_Bind.bind(StringParser_Parser.bindParser)(end)(function () {
                return Control_Applicative.pure(StringParser_Parser.applicativeParser)(new Control_Monad_Rec_Class.Done(Data_List_NonEmpty.reverse(acc)));
            });
        };
        var $$continue = function (acc) {
            return Control_Bind.bind(StringParser_Parser.bindParser)(assertConsume(p))(function (c) {
                return Control_Applicative.pure(StringParser_Parser.applicativeParser)(new Control_Monad_Rec_Class.Loop(Data_List_NonEmpty.cons(c)(acc)));
            });
        };
        var inner = function (acc) {
            return Control_Alt.alt(StringParser_Parser.altParser)(ending(acc))($$continue(acc));
        };
        return Control_Bind.bind(StringParser_Parser.bindParser)(p)(function (x) {
            return Control_Monad_Rec_Class.tailRecM(StringParser_Parser.monadRecParser)(inner)(Control_Applicative.pure(Data_List_Types.applicativeNonEmptyList)(x));
        });
    };
};
var manyTill = function (p) {
    return function (end) {
        return Control_Alt.alt(StringParser_Parser.altParser)(Control_Apply.applySecond(StringParser_Parser.applyParser)(end)(Control_Applicative.pure(StringParser_Parser.applicativeParser)(Data_List_Types.Nil.value)))(Data_Functor.map(StringParser_Parser.functorParser)(Data_List_NonEmpty.toList)(many1Till(p)(end)));
    };
};
export {
    $$try as try,
    lookAhead,
    tryAhead,
    many,
    many1,
    manyTill,
    many1Till,
    assertConsume,
    withError,
    between,
    option,
    optional,
    optionMaybe,
    sepBy,
    sepBy1,
    sepEndBy,
    sepEndBy1,
    endBy1,
    endBy,
    chainr,
    chainl,
    chainl1,
    chainr1,
    choice
};
export {
    fix
} from "../Control.Lazy/index.js";