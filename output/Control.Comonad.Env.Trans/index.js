// Generated by purs version 0.15.2
import * as Control_Comonad from "../Control.Comonad/index.js";
import * as Control_Extend from "../Control.Extend/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_FoldableWithIndex from "../Data.FoldableWithIndex/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_FunctorWithIndex from "../Data.FunctorWithIndex/index.js";
import * as Data_Traversable from "../Data.Traversable/index.js";
import * as Data_TraversableWithIndex from "../Data.TraversableWithIndex/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
var EnvT = function (x) {
    return x;
};
var withEnvT = function (f) {
    return function (v) {
        return new Data_Tuple.Tuple(f(v.value0), v.value1);
    };
};
var runEnvT = function (v) {
    return v;
};
var newtypeEnvT = {
    Coercible0: function () {
        return undefined;
    }
};
var mapEnvT = function (f) {
    return function (v) {
        return new Data_Tuple.Tuple(v.value0, f(v.value1));
    };
};
var functorEnvT = function (dictFunctor) {
    return {
        map: function (f) {
            return function (v) {
                return new Data_Tuple.Tuple(v.value0, Data_Functor.map(dictFunctor)(f)(v.value1));
            };
        }
    };
};
var functorWithIndexEnvT = function (dictFunctorWithIndex) {
    return {
        mapWithIndex: function (f) {
            return function (v) {
                return new Data_Tuple.Tuple(v.value0, Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex)(f)(v.value1));
            };
        },
        Functor0: function () {
            return functorEnvT(dictFunctorWithIndex.Functor0());
        }
    };
};
var foldableEnvT = function (dictFoldable) {
    return {
        foldl: function (fn) {
            return function (a) {
                return function (v) {
                    return Data_Foldable.foldl(dictFoldable)(fn)(a)(v.value1);
                };
            };
        },
        foldr: function (fn) {
            return function (a) {
                return function (v) {
                    return Data_Foldable.foldr(dictFoldable)(fn)(a)(v.value1);
                };
            };
        },
        foldMap: function (dictMonoid) {
            return function (fn) {
                return function (v) {
                    return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(fn)(v.value1);
                };
            };
        }
    };
};
var foldableWithIndexEnvT = function (dictFoldableWithIndex) {
    return {
        foldlWithIndex: function (f) {
            return function (a) {
                return function (v) {
                    return Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex)(f)(a)(v.value1);
                };
            };
        },
        foldrWithIndex: function (f) {
            return function (a) {
                return function (v) {
                    return Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex)(f)(a)(v.value1);
                };
            };
        },
        foldMapWithIndex: function (dictMonoid) {
            return function (f) {
                return function (v) {
                    return Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex)(dictMonoid)(f)(v.value1);
                };
            };
        },
        Foldable0: function () {
            return foldableEnvT(dictFoldableWithIndex.Foldable0());
        }
    };
};
var traversableEnvT = function (dictTraversable) {
    return {
        sequence: function (dictApplicative) {
            return function (v) {
                return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Functor.map(Data_Functor.functorFn)(EnvT)(Data_Tuple.Tuple.create(v.value0)))(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v.value1));
            };
        },
        traverse: function (dictApplicative) {
            return function (f) {
                return function (v) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Functor.map(Data_Functor.functorFn)(EnvT)(Data_Tuple.Tuple.create(v.value0)))(Data_Traversable.traverse(dictTraversable)(dictApplicative)(f)(v.value1));
                };
            };
        },
        Functor0: function () {
            return functorEnvT(dictTraversable.Functor0());
        },
        Foldable1: function () {
            return foldableEnvT(dictTraversable.Foldable1());
        }
    };
};
var traversableWithIndexEnvT = function (dictTraversableWithIndex) {
    return {
        traverseWithIndex: function (dictApplicative) {
            return function (f) {
                return function (v) {
                    return Data_Functor.map((dictApplicative.Apply0()).Functor0())(Data_Functor.map(Data_Functor.functorFn)(EnvT)(Data_Tuple.Tuple.create(v.value0)))(Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex)(dictApplicative)(f)(v.value1));
                };
            };
        },
        FunctorWithIndex0: function () {
            return functorWithIndexEnvT(dictTraversableWithIndex.FunctorWithIndex0());
        },
        FoldableWithIndex1: function () {
            return foldableWithIndexEnvT(dictTraversableWithIndex.FoldableWithIndex1());
        },
        Traversable2: function () {
            return traversableEnvT(dictTraversableWithIndex.Traversable2());
        }
    };
};
var extendEnvT = function (dictExtend) {
    return {
        extend: function (f) {
            return function (v) {
                return new Data_Tuple.Tuple(v.value0, Data_Functor.map(dictExtend.Functor0())(f)(Control_Extend.extend(dictExtend)((function () {
                    var $97 = Data_Tuple.Tuple.create(v.value0);
                    return function ($98) {
                        return EnvT($97($98));
                    };
                })())(v.value1)));
            };
        },
        Functor0: function () {
            return functorEnvT(dictExtend.Functor0());
        }
    };
};
var comonadTransEnvT = {
    lower: function (dictComonad) {
        return function (v) {
            return v.value1;
        };
    }
};
var comonadEnvT = function (dictComonad) {
    return {
        extract: function (v) {
            return Control_Comonad.extract(dictComonad)(v.value1);
        },
        Extend0: function () {
            return extendEnvT(dictComonad.Extend0());
        }
    };
};
export {
    EnvT,
    runEnvT,
    withEnvT,
    mapEnvT,
    newtypeEnvT,
    functorEnvT,
    extendEnvT,
    comonadEnvT,
    comonadTransEnvT,
    foldableEnvT,
    traversableEnvT,
    functorWithIndexEnvT,
    foldableWithIndexEnvT,
    traversableWithIndexEnvT
};