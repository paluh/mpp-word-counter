// Generated by purs version 0.15.2
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Control_Monad_Error_Class from "../Control.Monad.Error.Class/index.js";
import * as Data_Either from "../Data.Either/index.js";
import * as Data_Foldable from "../Data.Foldable/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Function_Uncurried from "../Data.Function.Uncurried/index.js";
import * as Data_Maybe from "../Data.Maybe/index.js";
import * as Data_Monoid from "../Data.Monoid/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Effect from "../Effect/index.js";
import * as Effect_Aff from "../Effect.Aff/index.js";
import * as Effect_Class from "../Effect.Class/index.js";
import * as Effect_Exception from "../Effect.Exception/index.js";
import * as Effect_Unsafe from "../Effect.Unsafe/index.js";
import * as React_Basic_Hooks from "../React.Basic.Hooks/index.js";
import * as React_Basic_Hooks_Internal from "../React.Basic.Hooks.Internal/index.js";
import * as Type_Equality from "../Type.Equality/index.js";
var UseAff = function (x) {
    return x;
};
var AffReducer = function (x) {
    return x;
};
var UseAffReducer = function (x) {
    return x;
};
var runAffReducer = function (v) {
    return Data_Function_Uncurried.runFn2(v);
};
var ntUseAffReducer = {
    Coercible0: function () {
        return undefined;
    }
};
var useAffReducer = function (initialState) {
    return function (affReducer) {
        return React_Basic_Hooks_Internal.coerceHook()(React_Basic_Hooks_Internal.bind(React_Basic_Hooks_Internal.ixBindRender)(React_Basic_Hooks.useMemo(React_Basic_Hooks.eqUnsafeReference)(affReducer)(function (v) {
            return Effect_Unsafe.unsafePerformEffect(React_Basic_Hooks.mkReducer(function (v1) {
                return runAffReducer(affReducer)(v1.state);
            }));
        }))(function (reducer$prime) {
            return React_Basic_Hooks_Internal.bind(React_Basic_Hooks_Internal.ixBindRender)(React_Basic_Hooks.useReducer({
                state: initialState,
                effects: [  ]
            })(reducer$prime))(function (v) {
                return React_Basic_Hooks_Internal.discard(React_Basic_Hooks_Internal.ixBindRender)(React_Basic_Hooks.useEffect(React_Basic_Hooks.eqUnsafeReference)(v.value0.effects)(function __do() {
                    Data_Foldable.for_(Effect.applicativeEffect)(Data_Foldable.foldableArray)(v.value0.effects)(function (aff) {
                        return Effect_Aff.launchAff_(Control_Bind.bind(Effect_Aff.bindAff)(aff)(function (actions) {
                            return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(Data_Foldable.for_(Effect.applicativeEffect)(Data_Foldable.foldableArray)(actions)(v.value1));
                        }));
                    })();
                    return Data_Monoid.mempty(Effect.monoidEffect(Effect.monoidEffect(Data_Monoid.monoidUnit)))();
                }))(function () {
                    return Control_Applicative.pure(React_Basic_Hooks_Internal.applicativeRender(Type_Equality.refl))(new Data_Tuple.Tuple(v.value0.state, v.value1));
                });
            });
        }));
    };
};
var ntUseAff = {
    Coercible0: function () {
        return undefined;
    }
};
var useAff = function (dictEq) {
    return function (deps) {
        return function (aff) {
            return React_Basic_Hooks_Internal.coerceHook()(React_Basic_Hooks_Internal.bind(React_Basic_Hooks_Internal.ixBindRender)(React_Basic_Hooks.useState(Data_Maybe.Nothing.value))(function (v) {
                return React_Basic_Hooks_Internal.discard(React_Basic_Hooks_Internal.ixBindRender)(React_Basic_Hooks.useEffect(dictEq)(deps)(function __do() {
                    v.value1(Data_Function["const"](Data_Maybe.Nothing.value))();
                    var fiber = Effect_Aff.launchAff(Control_Bind.bind(Effect_Aff.bindAff)(Control_Monad_Error_Class["try"](Effect_Aff.monadErrorAff)(aff))(function (r) {
                        return Effect_Class.liftEffect(Effect_Aff.monadEffectAff)(v.value1(function (v1) {
                            return new Data_Maybe.Just(r);
                        }));
                    }))();
                    return Effect_Aff.launchAff_(Effect_Aff.killFiber(Effect_Exception.error("Stale request cancelled"))(fiber));
                }))(function () {
                    return React_Basic_Hooks_Internal.unsafeRenderEffect((function () {
                        if (v.value0 instanceof Data_Maybe.Just && v.value0.value0 instanceof Data_Either.Left) {
                            return Control_Monad_Error_Class.throwError(Control_Monad_Error_Class.monadThrowEffect)(v.value0.value0.value0);
                        };
                        if (v.value0 instanceof Data_Maybe.Just && v.value0.value0 instanceof Data_Either.Right) {
                            return Control_Applicative.pure(Effect.applicativeEffect)(new Data_Maybe.Just(v.value0.value0.value0));
                        };
                        if (v.value0 instanceof Data_Maybe.Nothing) {
                            return Control_Applicative.pure(Effect.applicativeEffect)(Data_Maybe.Nothing.value);
                        };
                        throw new Error("Failed pattern match at React.Basic.Hooks.Aff (line 53, column 24 - line 56, column 30): " + [ v.value0.constructor.name ]);
                    })());
                });
            }));
        };
    };
};
var noEffects = function (state) {
    return {
        state: state,
        effects: [  ]
    };
};
var mkAffReducer = /* #__PURE__ */ (function () {
    var $23 = Control_Applicative.pure(Effect.applicativeEffect);
    return function ($24) {
        return $23(AffReducer(Data_Function_Uncurried.mkFn2($24)));
    };
})();
export {
    useAff,
    UseAff,
    useAffReducer,
    mkAffReducer,
    runAffReducer,
    noEffects,
    UseAffReducer,
    ntUseAff,
    ntUseAffReducer
};