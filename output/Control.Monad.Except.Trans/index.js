// Generated by purs version 0.15.2
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Apply from "../Control.Apply/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Category from "../Control.Category/index.js";
import * as Control_Monad from "../Control.Monad/index.js";
import * as Control_Monad_Cont_Class from "../Control.Monad.Cont.Class/index.js";
import * as Control_Monad_Error_Class from "../Control.Monad.Error.Class/index.js";
import * as Control_Monad_Reader_Class from "../Control.Monad.Reader.Class/index.js";
import * as Control_Monad_Rec_Class from "../Control.Monad.Rec.Class/index.js";
import * as Control_Monad_State_Class from "../Control.Monad.State.Class/index.js";
import * as Control_Monad_Trans_Class from "../Control.Monad.Trans.Class/index.js";
import * as Control_Monad_Writer_Class from "../Control.Monad.Writer.Class/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Semigroup from "../Data.Semigroup/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Effect_Class from "../Effect.Class/index.js";
var ExceptT = function (x) {
    return x;
};
var withExceptT = function (dictFunctor) {
    return function (f) {
        return function (v) {
            var mapLeft = function (v1) {
                return function (v2) {
                    if (v2 instanceof Data_Either.Right) {
                        return new Data_Either.Right(v2.value0);
                    };
                    if (v2 instanceof Data_Either.Left) {
                        return new Data_Either.Left(v1(v2.value0));
                    };
                    throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 42, column 3 - line 42, column 32): " + [ v1.constructor.name, v2.constructor.name ]);
                };
            };
            return Data_Functor.map(dictFunctor)(mapLeft(f))(v);
        };
    };
};
var runExceptT = function (v) {
    return v;
};
var newtypeExceptT = {
    Coercible0: function () {
        return undefined;
    }
};
var monadTransExceptT = {
    lift: function (dictMonad) {
        return function (m) {
            return Control_Bind.bind(dictMonad.Bind1())(m)(function (a) {
                return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(a));
            });
        };
    }
};
var mapExceptT = function (f) {
    return function (v) {
        return f(v);
    };
};
var functorExceptT = function (dictFunctor) {
    return {
        map: function (f) {
            return mapExceptT(Data_Functor.map(dictFunctor)(Data_Functor.map(Data_Either.functorEither)(f)));
        }
    };
};
var except = function (dictApplicative) {
    var $87 = Control_Applicative.pure(dictApplicative);
    return function ($88) {
        return ExceptT($87($88));
    };
};
var monadExceptT = function (dictMonad) {
    return {
        Applicative0: function () {
            return applicativeExceptT(dictMonad);
        },
        Bind1: function () {
            return bindExceptT(dictMonad);
        }
    };
};
var bindExceptT = function (dictMonad) {
    return {
        bind: function (v) {
            return function (k) {
                return Control_Bind.bind(dictMonad.Bind1())(v)(Data_Either.either((function () {
                    var $89 = Control_Applicative.pure(dictMonad.Applicative0());
                    return function ($90) {
                        return $89(Data_Either.Left.create($90));
                    };
                })())(function (a) {
                    var v1 = k(a);
                    return v1;
                }));
            };
        },
        Apply0: function () {
            return applyExceptT(dictMonad);
        }
    };
};
var applyExceptT = function (dictMonad) {
    return {
        apply: Control_Monad.ap(monadExceptT(dictMonad)),
        Functor0: function () {
            return functorExceptT(((dictMonad.Bind1()).Apply0()).Functor0());
        }
    };
};
var applicativeExceptT = function (dictMonad) {
    return {
        pure: (function () {
            var $91 = Control_Applicative.pure(dictMonad.Applicative0());
            return function ($92) {
                return ExceptT($91(Data_Either.Right.create($92)));
            };
        })(),
        Apply0: function () {
            return applyExceptT(dictMonad);
        }
    };
};
var semigroupExceptT = function (dictMonad) {
    return function (dictSemigroup) {
        return {
            append: Control_Apply.lift2(applyExceptT(dictMonad))(Data_Semigroup.append(dictSemigroup))
        };
    };
};
var monadAskExceptT = function (dictMonadAsk) {
    return {
        ask: Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)),
        Monad0: function () {
            return monadExceptT(dictMonadAsk.Monad0());
        }
    };
};
var monadReaderExceptT = function (dictMonadReader) {
    return {
        local: function (f) {
            return mapExceptT(Control_Monad_Reader_Class.local(dictMonadReader)(f));
        },
        MonadAsk0: function () {
            return monadAskExceptT(dictMonadReader.MonadAsk0());
        }
    };
};
var monadContExceptT = function (dictMonadCont) {
    return {
        callCC: function (f) {
            return Control_Monad_Cont_Class.callCC(dictMonadCont)(function (c) {
                var v = f(function (a) {
                    return c(new Data_Either.Right(a));
                });
                return v;
            });
        },
        Monad0: function () {
            return monadExceptT(dictMonadCont.Monad0());
        }
    };
};
var monadEffectExceptT = function (dictMonadEffect) {
    return {
        liftEffect: (function () {
            var $93 = Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadEffect.Monad0());
            var $94 = Effect_Class.liftEffect(dictMonadEffect);
            return function ($95) {
                return $93($94($95));
            };
        })(),
        Monad0: function () {
            return monadExceptT(dictMonadEffect.Monad0());
        }
    };
};
var monadRecExceptT = function (dictMonadRec) {
    return {
        tailRecM: function (f) {
            var $96 = Control_Monad_Rec_Class.tailRecM(dictMonadRec)(function (a) {
                var v = f(a);
                return Control_Bind.bind((dictMonadRec.Monad0()).Bind1())(v)(function (m$prime) {
                    return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())((function () {
                        if (m$prime instanceof Data_Either.Left) {
                            return new Control_Monad_Rec_Class.Done(new Data_Either.Left(m$prime.value0));
                        };
                        if (m$prime instanceof Data_Either.Right && m$prime.value0 instanceof Control_Monad_Rec_Class.Loop) {
                            return new Control_Monad_Rec_Class.Loop(m$prime.value0.value0);
                        };
                        if (m$prime instanceof Data_Either.Right && m$prime.value0 instanceof Control_Monad_Rec_Class.Done) {
                            return new Control_Monad_Rec_Class.Done(new Data_Either.Right(m$prime.value0.value0));
                        };
                        throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 74, column 14 - line 77, column 43): " + [ m$prime.constructor.name ]);
                    })());
                });
            });
            return function ($97) {
                return ExceptT($96($97));
            };
        },
        Monad0: function () {
            return monadExceptT(dictMonadRec.Monad0());
        }
    };
};
var monadStateExceptT = function (dictMonadState) {
    return {
        state: function (f) {
            return Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadState.Monad0())(Control_Monad_State_Class.state(dictMonadState)(f));
        },
        Monad0: function () {
            return monadExceptT(dictMonadState.Monad0());
        }
    };
};
var monadTellExceptT = function (dictMonadTell) {
    return {
        tell: (function () {
            var $98 = Control_Monad_Trans_Class.lift(monadTransExceptT)(dictMonadTell.Monad1());
            var $99 = Control_Monad_Writer_Class.tell(dictMonadTell);
            return function ($100) {
                return $98($99($100));
            };
        })(),
        Semigroup0: dictMonadTell.Semigroup0,
        Monad1: function () {
            return monadExceptT(dictMonadTell.Monad1());
        }
    };
};
var monadWriterExceptT = function (dictMonadWriter) {
    return {
        listen: mapExceptT(function (m) {
            return Control_Bind.bind(((dictMonadWriter.MonadTell1()).Monad1()).Bind1())(Control_Monad_Writer_Class.listen(dictMonadWriter)(m))(function (v) {
                return Control_Applicative.pure(((dictMonadWriter.MonadTell1()).Monad1()).Applicative0())(Data_Functor.map(Data_Either.functorEither)(function (r) {
                    return new Data_Tuple.Tuple(r, v.value1);
                })(v.value0));
            });
        }),
        pass: mapExceptT(function (m) {
            return Control_Monad_Writer_Class.pass(dictMonadWriter)(Control_Bind.bind(((dictMonadWriter.MonadTell1()).Monad1()).Bind1())(m)(function (a) {
                return Control_Applicative.pure(((dictMonadWriter.MonadTell1()).Monad1()).Applicative0())((function () {
                    if (a instanceof Data_Either.Left) {
                        return new Data_Tuple.Tuple(new Data_Either.Left(a.value0), Control_Category.identity(Control_Category.categoryFn));
                    };
                    if (a instanceof Data_Either.Right) {
                        return new Data_Tuple.Tuple(new Data_Either.Right(a.value0.value0), a.value0.value1);
                    };
                    throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 134, column 10 - line 136, column 45): " + [ a.constructor.name ]);
                })());
            }));
        }),
        Monoid0: dictMonadWriter.Monoid0,
        MonadTell1: function () {
            return monadTellExceptT(dictMonadWriter.MonadTell1());
        }
    };
};
var monadThrowExceptT = function (dictMonad) {
    return {
        throwError: (function () {
            var $101 = Control_Applicative.pure(dictMonad.Applicative0());
            return function ($102) {
                return ExceptT($101(Data_Either.Left.create($102)));
            };
        })(),
        Monad0: function () {
            return monadExceptT(dictMonad);
        }
    };
};
var monadErrorExceptT = function (dictMonad) {
    return {
        catchError: function (v) {
            return function (k) {
                return Control_Bind.bind(dictMonad.Bind1())(v)(Data_Either.either(function (a) {
                    var v1 = k(a);
                    return v1;
                })((function () {
                    var $103 = Control_Applicative.pure(dictMonad.Applicative0());
                    return function ($104) {
                        return $103(Data_Either.Right.create($104));
                    };
                })()));
            };
        },
        MonadThrow0: function () {
            return monadThrowExceptT(dictMonad);
        }
    };
};
var monoidExceptT = function (dictMonad) {
    return function (dictMonoid) {
        return {
            mempty: Control_Applicative.pure(applicativeExceptT(dictMonad))(Data_Monoid.mempty(dictMonoid)),
            Semigroup0: function () {
                return semigroupExceptT(dictMonad)(dictMonoid.Semigroup0());
            }
        };
    };
};
var altExceptT = function (dictSemigroup) {
    return function (dictMonad) {
        return {
            alt: function (v) {
                return function (v1) {
                    return Control_Bind.bind(dictMonad.Bind1())(v)(function (rm) {
                        if (rm instanceof Data_Either.Right) {
                            return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(rm.value0));
                        };
                        if (rm instanceof Data_Either.Left) {
                            return Control_Bind.bind(dictMonad.Bind1())(v1)(function (rn) {
                                if (rn instanceof Data_Either.Right) {
                                    return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(rn.value0));
                                };
                                if (rn instanceof Data_Either.Left) {
                                    return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Left(Data_Semigroup.append(dictSemigroup)(rm.value0)(rn.value0)));
                                };
                                throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 86, column 9 - line 88, column 49): " + [ rn.constructor.name ]);
                            });
                        };
                        throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 82, column 5 - line 88, column 49): " + [ rm.constructor.name ]);
                    });
                };
            },
            Functor0: function () {
                return functorExceptT(((dictMonad.Bind1()).Apply0()).Functor0());
            }
        };
    };
};
var plusExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return {
            empty: Control_Monad_Error_Class.throwError(monadThrowExceptT(dictMonad))(Data_Monoid.mempty(dictMonoid)),
            Alt0: function () {
                return altExceptT(dictMonoid.Semigroup0())(dictMonad);
            }
        };
    };
};
var alternativeExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return {
            Applicative0: function () {
                return applicativeExceptT(dictMonad);
            },
            Plus1: function () {
                return plusExceptT(dictMonoid)(dictMonad);
            }
        };
    };
};
var monadPlusExceptT = function (dictMonoid) {
    return function (dictMonad) {
        return {
            Monad0: function () {
                return monadExceptT(dictMonad);
            },
            Alternative1: function () {
                return alternativeExceptT(dictMonoid)(dictMonad);
            }
        };
    };
};
export {
    ExceptT,
    runExceptT,
    withExceptT,
    mapExceptT,
    except,
    newtypeExceptT,
    functorExceptT,
    applyExceptT,
    applicativeExceptT,
    bindExceptT,
    monadExceptT,
    monadRecExceptT,
    altExceptT,
    plusExceptT,
    alternativeExceptT,
    monadPlusExceptT,
    monadTransExceptT,
    monadEffectExceptT,
    monadContExceptT,
    monadThrowExceptT,
    monadErrorExceptT,
    monadAskExceptT,
    monadReaderExceptT,
    monadStateExceptT,
    monadTellExceptT,
    monadWriterExceptT,
    semigroupExceptT,
    monoidExceptT
};
export {
    catchError,
    throwError
} from "../Control.Monad.Error.Class/index.js";
export {
    lift
} from "../Control.Monad.Trans.Class/index.js";