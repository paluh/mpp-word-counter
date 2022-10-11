// Generated by purs version 0.15.2
import * as Control_Alt from "../Control.Alt/index.js";
import * as Control_Alternative from "../Control.Alternative/index.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Control_Lazy from "../Control.Lazy/index.js";
import * as Data_Array from "../Data.Array/index.js";
import * as Data_Boolean from "../Data.Boolean/index.js";
import * as Data_Char from "../Data.Char/index.js";
import * as Data_CodePoint_Unicode from "../Data.CodePoint.Unicode/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Int from "../Data.Int/index.js";
import * as Data_List from "../Data.List/index.js";
import * as Data_List_Types from "../Data.List.Types/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Number from "../Data.Number/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ordering from "../Data.Ordering/index.js";
import * as Data_Ring from "../Data.Ring/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Show from "../Data.Show/index.js";
import * as Data_String_CodePoints from "../Data.String.CodePoints/index.js";
import * as Data_String_CodeUnits from "../Data.String.CodeUnits/index.js";
import * as Data_String_Common from "../Data.String.Common/index.js";
import * as Data_String_Unicode from "../Data.String.Unicode/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Unfoldable from "../Data.Unfoldable/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as Parsing from "../Parsing/index.js";
import * as Parsing_Combinators from "../Parsing.Combinators/index.js";
import * as Parsing_String from "../Parsing.String/index.js";
import * as Parsing_String_Basic from "../Parsing.String.Basic/index.js";
var LanguageDef = function (x) {
    return x;
};
var unGenLanguageDef = function (v) {
    return v;
};
var token = function (tokpos) {
    return Control_Bind.bind(Parsing.bindParserT)(Parsing.getParserT)(function (v) {
        var v1 = Data_List.uncons(v.value0);
        if (v1 instanceof Data_Maybe.Nothing) {
            return Parsing.fail("Unexpected EOF");
        };
        if (v1 instanceof Data_Maybe.Just) {
            return Control_Bind.discard(Control_Bind.discardUnit)(Parsing.bindParserT)(Parsing.stateParserT(function (v2) {
                return new Data_Tuple.Tuple(Data_Unit.unit, new Parsing.ParseState(v1.value0.tail, tokpos(v1.value0.head), true));
            }))(function () {
                return Control_Applicative.pure(Parsing.applicativeParserT)(v1.value0.head);
            });
        };
        throw new Error("Failed pattern match at Parsing.Token (line 55, column 3 - line 59, column 16): " + [ v1.constructor.name ]);
    });
};
var when = function (tokpos) {
    return function (f) {
        return Parsing_Combinators.tryRethrow(Control_Bind.bind(Parsing.bindParserT)(token(tokpos))(function (a) {
            return Control_Bind.discard(Control_Bind.discardUnit)(Parsing.bindParserT)(Control_Alternative.guard(Parsing.alternativeParserT)(f(a)))(function () {
                return Control_Applicative.pure(Parsing.applicativeParserT)(a);
            });
        }));
    };
};
var theReservedNames = function (v) {
    if (v.caseSensitive) {
        return Data_Array.sort(Data_Ord.ordString)(v.reservedNames);
    };
    if (Data_Boolean.otherwise) {
        return Data_Array.sort(Data_Ord.ordString)(Data_Functor.map(Data_Functor.functorArray)(Data_String_Common.toLower)(v.reservedNames));
    };
    throw new Error("Failed pattern match at Parsing.Token (line 825, column 1 - line 825, column 70): " + [ v.constructor.name ]);
};
var simpleSpace = /* #__PURE__ */ Parsing_Combinators.skipMany1(/* #__PURE__ */ Parsing_String.satisfyCodePoint(Data_CodePoint_Unicode.isSpace));
var oneLineComment = function (v) {
    return Control_Apply.applySecond(Parsing.applyParserT)(Parsing_Combinators["try"](Parsing_String.string(v.commentLine)))(Parsing_Combinators.skipMany(Parsing_String.satisfy(function (v1) {
        return v1 !== "\x0a";
    })));
};
var match = function (dictEq) {
    return function (tokpos) {
        return function (tok) {
            return when(tokpos)(function (v) {
                return Data_Eq.eq(dictEq)(v)(tok);
            });
        };
    };
};
var isReserved = function ($copy_names) {
    return function ($copy_name) {
        var $tco_var_names = $copy_names;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(names, name) {
            var v = Data_Array.uncons(names);
            if (v instanceof Data_Maybe.Nothing) {
                $tco_done = true;
                return false;
            };
            if (v instanceof Data_Maybe.Just) {
                var v1 = Data_Ord.compare(Data_Ord.ordString)(v.value0.head)(name);
                if (v1 instanceof Data_Ordering.LT) {
                    $tco_var_names = v.value0.tail;
                    $copy_name = name;
                    return;
                };
                if (v1 instanceof Data_Ordering.EQ) {
                    $tco_done = true;
                    return true;
                };
                if (v1 instanceof Data_Ordering.GT) {
                    $tco_done = true;
                    return false;
                };
                throw new Error("Failed pattern match at Parsing.Token (line 820, column 35 - line 823, column 18): " + [ v1.constructor.name ]);
            };
            throw new Error("Failed pattern match at Parsing.Token (line 818, column 3 - line 823, column 18): " + [ v.constructor.name ]);
        };
        while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_names, $copy_name);
        };
        return $tco_result;
    };
};
var isReservedName = function (v) {
    return function (name) {
        var caseName = (function () {
            if (v.caseSensitive) {
                return name;
            };
            if (Data_Boolean.otherwise) {
                return Data_String_Common.toLower(name);
            };
            throw new Error("Failed pattern match at Parsing.Token (line 812, column 3 - line 814, column 31): " + [  ]);
        })();
        return isReserved(theReservedNames(v))(caseName);
    };
};
var inCommentSingle = function (v) {
    var startEnd = Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_String_CodeUnits.toCharArray(v.commentEnd))(Data_String_CodeUnits.toCharArray(v.commentStart));
    return Control_Lazy.fix(Parsing.lazyParserT)(function (p) {
        return Control_Alt.alt(Parsing.altParserT)(Data_Functor["void"](Parsing.functorParserT)(Parsing_Combinators["try"](Parsing_String.string(v.commentEnd))))(Control_Alt.alt(Parsing.altParserT)(Control_Apply.applySecond(Parsing.applyParserT)(Parsing_Combinators.skipMany1(Parsing_String_Basic.noneOf(startEnd)))(p))(Parsing_Combinators.withErrorMessage(Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String_Basic.oneOf(startEnd))(p))("end of comment")));
    });
};
var multiLineComment = function (v) {
    return Control_Apply.applySecond(Parsing.applyParserT)(Parsing_Combinators["try"](Parsing_String.string(v.commentStart)))(inComment(v));
};
var inCommentMulti = function (v) {
    var startEnd = Data_Semigroup.append(Data_Semigroup.semigroupArray)(Data_String_CodeUnits.toCharArray(v.commentEnd))(Data_String_CodeUnits.toCharArray(v.commentStart));
    return Control_Lazy.fix(Parsing.lazyParserT)(function (p) {
        return Control_Alt.alt(Parsing.altParserT)(Data_Functor["void"](Parsing.functorParserT)(Parsing_Combinators["try"](Parsing_String.string(v.commentEnd))))(Control_Alt.alt(Parsing.altParserT)(Control_Apply.applySecond(Parsing.applyParserT)(multiLineComment(v))(p))(Control_Alt.alt(Parsing.altParserT)(Control_Apply.applySecond(Parsing.applyParserT)(Parsing_Combinators.skipMany1(Parsing_String_Basic.noneOf(startEnd)))(p))(Parsing_Combinators.withErrorMessage(Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String_Basic.oneOf(startEnd))(p))("end of comment"))));
    });
};
var inComment = function (v) {
    if (v.nestedComments) {
        return inCommentMulti(v);
    };
    return inCommentSingle(v);
};
var whiteSpace$prime = function (v) {
    if (Data_String_Common["null"](v.commentLine) && Data_String_Common["null"](v.commentStart)) {
        return Parsing_Combinators.skipMany(Parsing_Combinators.withErrorMessage(simpleSpace)(""));
    };
    if (Data_String_Common["null"](v.commentLine)) {
        return Parsing_Combinators.skipMany(Control_Alt.alt(Parsing.altParserT)(simpleSpace)(Parsing_Combinators.withErrorMessage(multiLineComment(v))("")));
    };
    if (Data_String_Common["null"](v.commentStart)) {
        return Parsing_Combinators.skipMany(Control_Alt.alt(Parsing.altParserT)(simpleSpace)(Parsing_Combinators.withErrorMessage(oneLineComment(v))("")));
    };
    if (Data_Boolean.otherwise) {
        return Parsing_Combinators.skipMany(Control_Alt.alt(Parsing.altParserT)(simpleSpace)(Control_Alt.alt(Parsing.altParserT)(oneLineComment(v))(Parsing_Combinators.withErrorMessage(multiLineComment(v))(""))));
    };
    throw new Error("Failed pattern match at Parsing.Token (line 834, column 1 - line 834, column 74): " + [ v.constructor.name ]);
};
var makeTokenParser = function (v) {
    var stringLetter = Parsing_String.satisfy(function (c) {
        return c !== "\"" && (c !== "\\" && c > "\x1a");
    });
    var sign = function (dictRing) {
        return Control_Alt.alt(Parsing.altParserT)(Data_Functor.voidLeft(Parsing.functorParserT)(Parsing_String["char"]("-"))(Data_Ring.negate(dictRing)))(Control_Alt.alt(Parsing.altParserT)(Data_Functor.voidLeft(Parsing.functorParserT)(Parsing_String["char"]("+"))(Control_Category.identity(Control_Category.categoryFn)))(Control_Applicative.pure(Parsing.applicativeParserT)(Control_Category.identity(Control_Category.categoryFn))));
    };
    var oper = (function () {
        var go = Control_Bind.bind(Parsing.bindParserT)(v.opStart)(function (c) {
            return Control_Bind.bind(Parsing.bindParserT)(Data_Array.many(Parsing.alternativeParserT)(Parsing.lazyParserT)(v.opLetter))(function (cs) {
                return Control_Applicative.pure(Parsing.applicativeParserT)(Data_String_CodeUnits.singleton(c) + Data_String_CodeUnits.fromCharArray(cs));
            });
        });
        return Parsing_Combinators.withErrorMessage(go)("operator");
    })();
    var number = function (base) {
        return function (baseDigit) {
            var folder = function (v1) {
                return function (v2) {
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return Data_Maybe.Nothing.value;
                    };
                    if (v1 instanceof Data_Maybe.Just) {
                        return Data_Functor.map(Data_Maybe.functorMaybe)(function (v3) {
                            return (base * v1.value0 | 0) + v3 | 0;
                        })(Data_CodePoint_Unicode.hexDigitToInt(Data_String_CodePoints.codePointFromChar(v2)));
                    };
                    throw new Error("Failed pattern match at Parsing.Token (line 704, column 5 - line 704, column 45): " + [ v1.constructor.name, v2.constructor.name ]);
                };
            };
            return Control_Bind.bind(Parsing.bindParserT)(Data_Array.some(Parsing.alternativeParserT)(Parsing.lazyParserT)(baseDigit))(function (digits) {
                return Data_Maybe.maybe(Parsing.fail("not digits"))(Control_Applicative.pure(Parsing.applicativeParserT))(Data_Foldable.foldl(Data_Foldable.foldableArray)(folder)(new Data_Maybe.Just(0))(digits));
            });
        };
    };
    var octal = Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String_Basic.oneOf([ "o", "O" ]))(number(8)(Parsing_String_Basic.octDigit));
    var lexeme = function (p) {
        return Control_Apply.applyFirst(Parsing.applyParserT)(p)(whiteSpace$prime(v));
    };
    var reservedOp = function (name) {
        var go = Control_Bind.bind(Parsing.bindParserT)(Parsing_String.string(name))(function () {
            return Parsing_Combinators.withErrorMessage(Parsing_Combinators.notFollowedBy(v.opLetter))("end of " + name);
        });
        return lexeme(Parsing_Combinators["try"](go));
    };
    var symbol = function (name) {
        return Data_Functor.voidLeft(Parsing.functorParserT)(lexeme(Parsing_String.string(name)))(name);
    };
    var parens = function (p) {
        return Parsing_Combinators.between(symbol("("))(symbol(")"))(p);
    };
    var semi = symbol(";");
    var semiSep = function (p) {
        return Parsing_Combinators.sepBy(p)(semi);
    };
    var semiSep1 = function (p) {
        return Parsing_Combinators.sepBy1(p)(semi);
    };
    var isReservedOp = function (name) {
        return isReserved(Data_Array.sort(Data_Ord.ordString)(v.reservedOpNames))(name);
    };
    var operator = (function () {
        var go = Control_Bind.bind(Parsing.bindParserT)(oper)(function (name) {
            var $65 = isReservedOp(name);
            if ($65) {
                return Parsing.fail("reserved operator " + name);
            };
            return Control_Applicative.pure(Parsing.applicativeParserT)(name);
        });
        return lexeme(Parsing_Combinators["try"](go));
    })();
    var ident = (function () {
        var go = Control_Bind.bind(Parsing.bindParserT)(v.identStart)(function (c) {
            return Control_Bind.bind(Parsing.bindParserT)(Data_Array.many(Parsing.alternativeParserT)(Parsing.lazyParserT)(v.identLetter))(function (cs) {
                return Control_Applicative.pure(Parsing.applicativeParserT)(Data_String_CodeUnits.singleton(c) + Data_String_CodeUnits.fromCharArray(cs));
            });
        });
        return Parsing_Combinators.withErrorMessage(go)("identifier");
    })();
    var identifier = (function () {
        var go = Control_Bind.bind(Parsing.bindParserT)(ident)(function (name) {
            var $66 = isReservedName(v)(name);
            if ($66) {
                return Parsing.fail("reserved word " + Data_Show.show(Data_Show.showString)(name));
            };
            return Control_Applicative.pure(Parsing.applicativeParserT)(name);
        });
        return lexeme(Parsing_Combinators["try"](go));
    })();
    var hexadecimal = Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String_Basic.oneOf([ "x", "X" ]))(number(16)(Parsing_String_Basic.hexDigit));
    var fraction = (function () {
        var op = function (v1) {
            return function (v2) {
                if (v2 instanceof Data_Maybe.Nothing) {
                    return Data_Maybe.Nothing.value;
                };
                if (v2 instanceof Data_Maybe.Just) {
                    return Control_Bind.bind(Data_Maybe.bindMaybe)(Data_CodePoint_Unicode.hexDigitToInt(Data_String_CodePoints.codePointFromChar(v1)))(function (int$prime) {
                        return Control_Applicative.pure(Data_Maybe.applicativeMaybe)((v2.value0 + Data_Int.toNumber(int$prime)) / 10.0);
                    });
                };
                throw new Error("Failed pattern match at Parsing.Token (line 651, column 5 - line 651, column 47): " + [ v1.constructor.name, v2.constructor.name ]);
            };
        };
        return Parsing_Combinators.asErrorMessage("fraction")(Control_Bind.bind(Parsing.bindParserT)(Parsing_String["char"]("."))(function () {
            return Control_Bind.bind(Parsing.bindParserT)(Parsing_Combinators.withErrorMessage(Data_Array.some(Parsing.alternativeParserT)(Parsing.lazyParserT)(Parsing_String_Basic.digit))("fraction"))(function (digits) {
                return Data_Maybe.maybe(Parsing.fail("not digit"))(Control_Applicative.pure(Parsing.applicativeParserT))(Data_Foldable.foldr(Data_Foldable.foldableArray)(op)(new Data_Maybe.Just(0.0))(digits));
            });
        }));
    })();
    var escapeGap = Parsing_Combinators.withErrorMessage(Control_Apply.applySecond(Parsing.applyParserT)(Data_Array.some(Parsing.alternativeParserT)(Parsing.lazyParserT)(Parsing_String_Basic.space))(Parsing_String["char"]("\\")))("end of string gap");
    var escapeEmpty = Parsing_String["char"]("&");
    var escMap = Data_Array.zip([ "a", "b", "f", "n", "r", "t", "v", "\\", "\"", "'" ])([ "\x07", "\x08", "\x0c", "\x0a", "\x0d", "\x09", "\x0b", "\\", "\"", "'" ]);
    var dot = symbol(".");
    var decimal = number(10)(Parsing_String_Basic.digit);
    var exponent$prime = (function () {
        var power = function (e) {
            if (e < 0) {
                return 1.0 / power(-e | 0);
            };
            if (Data_Boolean.otherwise) {
                return Data_Number.pow(10.0)(Data_Int.toNumber(e));
            };
            throw new Error("Failed pattern match at Parsing.Token (line 664, column 5 - line 664, column 27): " + [ e.constructor.name ]);
        };
        return Parsing_Combinators.asErrorMessage("exponent")(Control_Bind.bind(Parsing.bindParserT)(Parsing_String_Basic.oneOf([ "e", "E" ]))(function () {
            return Control_Bind.bind(Parsing.bindParserT)(sign(Data_Ring.ringInt))(function (f) {
                return Control_Bind.bind(Parsing.bindParserT)(Parsing_Combinators.withErrorMessage(decimal)("exponent"))(function (e) {
                    return Control_Applicative.pure(Parsing.applicativeParserT)(power(f(e)));
                });
            });
        }));
    })();
    var fractExponent = function (n) {
        var justExponent = Control_Bind.bind(Parsing.bindParserT)(exponent$prime)(function (expo) {
            return Control_Applicative.pure(Parsing.applicativeParserT)(Data_Int.toNumber(n) * expo);
        });
        var fractExponent$prime = Control_Bind.bind(Parsing.bindParserT)(fraction)(function (fract) {
            return Control_Bind.bind(Parsing.bindParserT)(Parsing_Combinators.option(1.0)(exponent$prime))(function (expo) {
                return Control_Applicative.pure(Parsing.applicativeParserT)((Data_Int.toNumber(n) + fract) * expo);
            });
        });
        return Control_Alt.alt(Parsing.altParserT)(fractExponent$prime)(justExponent);
    };
    var fractFloat = function (n) {
        return Data_Functor.map(Parsing.functorParserT)(Data_Either.Right.create)(fractExponent(n));
    };
    var decimalFloat = Control_Bind.bind(Parsing.bindParserT)(decimal)(function (n) {
        return Parsing_Combinators.option(new Data_Either.Left(n))(fractFloat(n));
    });
    var zeroNumFloat = Control_Alt.alt(Parsing.altParserT)(Data_Functor.map(Parsing.functorParserT)(Data_Either.Left.create)(Control_Alt.alt(Parsing.altParserT)(hexadecimal)(octal)))(Control_Alt.alt(Parsing.altParserT)(decimalFloat)(Control_Alt.alt(Parsing.altParserT)(fractFloat(0))(Control_Applicative.pure(Parsing.applicativeParserT)(new Data_Either.Left(0)))));
    var natFloat = Control_Alt.alt(Parsing.altParserT)(Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String["char"]("0"))(zeroNumFloat))(decimalFloat);
    var naturalOrFloat = Parsing_Combinators.withErrorMessage(lexeme(natFloat))("number");
    var floating = Control_Bind.bind(Parsing.bindParserT)(decimal)(fractExponent);
    var $$float = Parsing_Combinators.withErrorMessage(lexeme(floating))("float");
    var zeroNumber = Parsing_Combinators.withErrorMessage(Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String["char"]("0"))(Control_Alt.alt(Parsing.altParserT)(hexadecimal)(Control_Alt.alt(Parsing.altParserT)(octal)(Control_Alt.alt(Parsing.altParserT)(decimal)(Control_Applicative.pure(Parsing.applicativeParserT)(0))))))("");
    var nat = Control_Alt.alt(Parsing.altParserT)(zeroNumber)(decimal);
    var $$int = Control_Bind.bind(Parsing.bindParserT)(lexeme(sign(Data_Ring.ringInt)))(function (f) {
        return Control_Bind.bind(Parsing.bindParserT)(nat)(function (n) {
            return Control_Applicative.pure(Parsing.applicativeParserT)(f(n));
        });
    });
    var integer = Parsing_Combinators.withErrorMessage(lexeme($$int))("integer");
    var natural = Parsing_Combinators.withErrorMessage(lexeme(nat))("natural");
    var comma = symbol(",");
    var commaSep = function (p) {
        return Parsing_Combinators.sepBy(p)(comma);
    };
    var commaSep1 = function (p) {
        return Parsing_Combinators.sepBy1(p)(comma);
    };
    var colon = symbol(":");
    var charNum = Control_Bind.bind(Parsing.bindParserT)(Control_Alt.alt(Parsing.altParserT)(decimal)(Control_Alt.alt(Parsing.altParserT)(Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String["char"]("o"))(number(8)(Parsing_String_Basic.octDigit)))(Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String["char"]("x"))(number(16)(Parsing_String_Basic.hexDigit)))))(function (code) {
        var $71 = code > 1114111;
        if ($71) {
            return Parsing.fail("invalid escape sequence");
        };
        var v1 = Data_Char.fromCharCode(code);
        if (v1 instanceof Data_Maybe.Just) {
            return Control_Applicative.pure(Parsing.applicativeParserT)(v1.value0);
        };
        if (v1 instanceof Data_Maybe.Nothing) {
            return Parsing.fail("invalid character code (should not happen)");
        };
        throw new Error("Failed pattern match at Parsing.Token (line 498, column 10 - line 500, column 67): " + [ v1.constructor.name ]);
    });
    var charLetter = Parsing_String.satisfy(function (c) {
        return c !== "'" && (c !== "\\" && c > "\x1a");
    });
    var charEsc = (function () {
        var parseEsc = function (v1) {
            return Data_Functor.voidLeft(Parsing.functorParserT)(Parsing_String["char"](v1.value0))(v1.value1);
        };
        return Parsing_Combinators.choice(Data_Foldable.foldableArray)(Data_Functor.map(Data_Functor.functorArray)(parseEsc)(escMap));
    })();
    var charControl = Control_Bind.bind(Parsing.bindParserT)(Parsing_String["char"]("^"))(function () {
        return Control_Bind.bind(Parsing.bindParserT)(Parsing_String_Basic.upper)(function (code) {
            var v1 = Data_Char.fromCharCode((Data_Char.toCharCode(code) - Data_Char.toCharCode("A") | 0) + 1 | 0);
            if (v1 instanceof Data_Maybe.Just) {
                return Control_Applicative.pure(Parsing.applicativeParserT)(v1.value0);
            };
            if (v1 instanceof Data_Maybe.Nothing) {
                return Parsing.fail("invalid character code (should not happen)");
            };
            throw new Error("Failed pattern match at Parsing.Token (line 488, column 5 - line 490, column 67): " + [ v1.constructor.name ]);
        });
    });
    var caseString = function (name) {
        if (v.caseSensitive) {
            return Data_Functor.voidLeft(Parsing.functorParserT)(Parsing_String.string(name))(name);
        };
        if (Data_Boolean.otherwise) {
            var msg = Data_Show.show(Data_Show.showString)(name);
            var caseChar = function (c) {
                var v1 = function (v2) {
                    if (Data_Boolean.otherwise) {
                        return Parsing_String["char"](c);
                    };
                    throw new Error("Failed pattern match at Parsing.Token (line 355, column 1 - line 355, column 80): " + [ c.constructor.name ]);
                };
                var $82 = Data_CodePoint_Unicode.isAlpha(Data_String_CodePoints.codePointFromChar(c));
                if ($82) {
                    var $83 = Data_String_CodeUnits.toChar(Data_String_Unicode.toLowerSimple(Data_String_CodeUnits.singleton(c)));
                    if ($83 instanceof Data_Maybe.Just) {
                        var $84 = Data_String_CodeUnits.toChar(Data_String_Unicode.toUpperSimple(Data_String_CodeUnits.singleton(c)));
                        if ($84 instanceof Data_Maybe.Just) {
                            return Control_Alt.alt(Parsing.altParserT)(Parsing_String["char"]($83.value0))(Parsing_String["char"]($84.value0));
                        };
                        return v1(true);
                    };
                    return v1(true);
                };
                return v1(true);
            };
            var walk = function (name$prime) {
                var v1 = Data_String_CodeUnits.uncons(name$prime);
                if (v1 instanceof Data_Maybe.Nothing) {
                    return Control_Applicative.pure(Parsing.applicativeParserT)(Data_Unit.unit);
                };
                if (v1 instanceof Data_Maybe.Just) {
                    return Control_Apply.applySecond(Parsing.applyParserT)(Parsing_Combinators.withErrorMessage(caseChar(v1.value0.head))(msg))(walk(v1.value0.tail));
                };
                throw new Error("Failed pattern match at Parsing.Token (line 757, column 22 - line 759, column 72): " + [ v1.constructor.name ]);
            };
            return Data_Functor.voidLeft(Parsing.functorParserT)(walk(name))(name);
        };
        throw new Error("Failed pattern match at Parsing.Token (line 751, column 3 - line 751, column 50): " + [ name.constructor.name ]);
    };
    var reserved = function (name) {
        var go = Control_Apply.applySecond(Parsing.applyParserT)(caseString(name))(Parsing_Combinators.withErrorMessage(Parsing_Combinators.notFollowedBy(v.identLetter))("end of " + name));
        return lexeme(Parsing_Combinators["try"](go));
    };
    var brackets = function (p) {
        return Parsing_Combinators.between(symbol("["))(symbol("]"))(p);
    };
    var braces = function (p) {
        return Parsing_Combinators.between(symbol("{"))(symbol("}"))(p);
    };
    var ascii3codes = [ "NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL", "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB", "CAN", "SUB", "ESC", "DEL" ];
    var ascii3 = [ "\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07", "\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17", "\x18", "\x1a", "\x1b", "\x7f" ];
    var ascii2codes = [ "BS", "HT", "LF", "VT", "FF", "CR", "SO", "SI", "EM", "FS", "GS", "RS", "US", "SP" ];
    var ascii2 = [ "\x08", "\x09", "\x0a", "\x0b", "\x0c", "\x0d", "\x0e", "\x0f", "\x19", "\x1c", "\x1d", "\x1e", "\x1f", " " ];
    var asciiMap = Data_Array.zip(Data_Semigroup.append(Data_Semigroup.semigroupArray)(ascii3codes)(ascii2codes))(Data_Semigroup.append(Data_Semigroup.semigroupArray)(ascii3)(ascii2));
    var charAscii = (function () {
        var parseAscii = function (v1) {
            return Parsing_Combinators["try"](Data_Functor.voidLeft(Parsing.functorParserT)(Parsing_String.string(v1.value0))(v1.value1));
        };
        return Parsing_Combinators.choice(Data_Foldable.foldableArray)(Data_Functor.map(Data_Functor.functorArray)(parseAscii)(asciiMap));
    })();
    var escapeCode = Control_Alt.alt(Parsing.altParserT)(charEsc)(Control_Alt.alt(Parsing.altParserT)(charNum)(Control_Alt.alt(Parsing.altParserT)(charAscii)(Parsing_Combinators.withErrorMessage(charControl)("escape code"))));
    var charEscape = Control_Apply.applySecond(Parsing.applyParserT)(Parsing_String["char"]("\\"))(escapeCode);
    var characterChar = Control_Alt.alt(Parsing.altParserT)(charLetter)(Parsing_Combinators.withErrorMessage(charEscape)("literal character"));
    var charLiteral = (function () {
        var go = Parsing_Combinators.between(Parsing_String["char"]("'"))(Parsing_Combinators.withErrorMessage(Parsing_String["char"]("'"))("end of character"))(characterChar);
        return Parsing_Combinators.withErrorMessage(lexeme(go))("character");
    })();
    var stringEscape = Control_Bind.bind(Parsing.bindParserT)(Parsing_String["char"]("\\"))(function () {
        return Control_Alt.alt(Parsing.altParserT)(Data_Functor.voidLeft(Parsing.functorParserT)(escapeGap)(Data_Maybe.Nothing.value))(Control_Alt.alt(Parsing.altParserT)(Data_Functor.voidLeft(Parsing.functorParserT)(escapeEmpty)(Data_Maybe.Nothing.value))(Data_Functor.map(Parsing.functorParserT)(Data_Maybe.Just.create)(escapeCode)));
    });
    var stringChar = Control_Alt.alt(Parsing.altParserT)(Data_Functor.map(Parsing.functorParserT)(Data_Maybe.Just.create)(stringLetter))(Parsing_Combinators.withErrorMessage(stringEscape)("string character"));
    var stringLiteral = (function () {
        var folder = function (v1) {
            return function (chars) {
                if (v1 instanceof Data_Maybe.Nothing) {
                    return chars;
                };
                if (v1 instanceof Data_Maybe.Just) {
                    return new Data_List_Types.Cons(v1.value0, chars);
                };
                throw new Error("Failed pattern match at Parsing.Token (line 455, column 5 - line 455, column 51): " + [ v1.constructor.name, chars.constructor.name ]);
            };
        };
        var go = Control_Bind.bind(Parsing.bindParserT)(Parsing_Combinators.between(Parsing_String["char"]("\""))(Parsing_Combinators.withErrorMessage(Parsing_String["char"]("\""))("end of string"))(Data_List.many(Parsing.alternativeParserT)(Parsing.lazyParserT)(stringChar)))(function (maybeChars) {
            return Control_Applicative.pure(Parsing.applicativeParserT)(Data_String_CodeUnits.fromCharArray(Data_List.toUnfoldable(Data_Unfoldable.unfoldableArray)(Data_Foldable.foldr(Data_List_Types.foldableList)(folder)(Data_List_Types.Nil.value)(maybeChars))));
        });
        return lexeme(Parsing_Combinators.withErrorMessage(go)("literal string"));
    })();
    var angles = function (p) {
        return Parsing_Combinators.between(symbol("<"))(symbol(">"))(p);
    };
    return {
        identifier: identifier,
        reserved: reserved,
        operator: operator,
        reservedOp: reservedOp,
        charLiteral: charLiteral,
        stringLiteral: stringLiteral,
        natural: natural,
        integer: integer,
        "float": $$float,
        naturalOrFloat: naturalOrFloat,
        decimal: decimal,
        hexadecimal: hexadecimal,
        octal: octal,
        symbol: symbol,
        lexeme: lexeme,
        whiteSpace: whiteSpace$prime(v),
        parens: parens,
        braces: braces,
        angles: angles,
        brackets: brackets,
        semi: semi,
        comma: comma,
        colon: colon,
        dot: dot,
        semiSep: semiSep,
        semiSep1: semiSep1,
        commaSep: commaSep,
        commaSep1: commaSep1
    };
};
var eof = /* #__PURE__ */ Control_Bind.bind(Parsing.bindParserT)(Parsing.getParserT)(function (v) {
    var $98 = Data_List["null"](v.value0);
    if ($98) {
        return Parsing.consume;
    };
    return Parsing.fail("Expected EOF");
});
export {
    token,
    when,
    match,
    eof,
    LanguageDef,
    unGenLanguageDef,
    makeTokenParser
};
export {
    alphaNum,
    digit,
    hexDigit,
    letter,
    noneOf,
    octDigit,
    oneOf,
    space,
    upper
} from "../Parsing.String.Basic/index.js";