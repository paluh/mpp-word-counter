// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Control_Applicative from "../Control.Applicative/index.js";
import * as Control_Bind from "../Control.Bind/index.js";
import * as Data_Bifunctor from "../Data.Bifunctor/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Function_Uncurried from "../Data.Function.Uncurried/index.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Nullable from "../Data.Nullable/index.js";
import * as Data_Tuple from "../Data.Tuple/index.js";
import * as Data_Tuple_Nested from "../Data.Tuple.Nested/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
import * as Effect from "../Effect/index.js";
import * as Effect_Uncurried from "../Effect.Uncurried/index.js";
import * as React_Basic from "../React.Basic/index.js";
import * as React_Basic_Hooks_Internal from "../React.Basic.Hooks.Internal/index.js";
import * as Unsafe_Coerce from "../Unsafe.Coerce/index.js";
import * as Unsafe_Reference from "../Unsafe.Reference/index.js";
var UnsafeReference = function (x) {
    return x;
};
var Reducer = function (x) {
    return x;
};
var writeRef = /* #__PURE__ */ Effect_Uncurried.runEffectFn2($foreign.writeRef_);
var useTransition = /* #__PURE__ */ React_Basic_Hooks_Internal.unsafeHook(function () {
    return $foreign.useTransition_(Data_Function_Uncurried.mkFn2(Data_Tuple.Tuple.create));
});
var useSyncExternalStore$prime = function (subscribe) {
    return function (getSnapshot) {
        return React_Basic_Hooks_Internal.unsafeHook(function () {
            return $foreign.useSyncExternalStore2_(Effect_Uncurried.mkEffectFn1(subscribe), getSnapshot);
        });
    };
};
var useSyncExternalStore = function (subscribe) {
    return function (getSnapshot) {
        return function (getServerSnapshot) {
            return React_Basic_Hooks_Internal.unsafeHook(function () {
                return $foreign.useSyncExternalStore3_(Effect_Uncurried.mkEffectFn1(subscribe), getSnapshot, getServerSnapshot);
            });
        };
    };
};
var useState = function (initialState) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useState_(Data_Function_Uncurried.mkFn2(Data_Tuple.Tuple.create), initialState);
    });
};
var useState$prime = function (initialState) {
    return Data_Functor.mapFlipped(React_Basic_Hooks_Internal.functorRender)(useState(initialState))(Data_Bifunctor.rmap(Data_Bifunctor.bifunctorTuple)(function (v) {
        return function ($19) {
            return v(Data_Function["const"]($19));
        };
    }));
};
var useRef = function (initialValue) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useRef_(initialValue);
    });
};
var useReducer = function (initialState) {
    return function (v) {
        return React_Basic_Hooks_Internal.unsafeHook(function () {
            return $foreign.useReducer_(Data_Function_Uncurried.mkFn2(Data_Tuple.Tuple.create), v, initialState);
        });
    };
};
var useMemo = function (dictEq) {
    return function (deps) {
        return function (computeA) {
            return React_Basic_Hooks_Internal.unsafeHook(function () {
                return $foreign.useMemo_(Data_Function_Uncurried.mkFn2(Data_Eq.eq(dictEq)), deps, computeA);
            });
        };
    };
};
var useLayoutEffectOnce = function (effect) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useLayoutEffect_(function (v, v1) {
            return true;
        }, Data_Unit.unit, effect);
    });
};
var useLayoutEffectAlways = function (effect) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useLayoutEffectAlways_(effect);
    });
};
var useLayoutEffect = function (dictEq) {
    return function (deps) {
        return function (effect) {
            return React_Basic_Hooks_Internal.unsafeHook(function () {
                return $foreign.useLayoutEffect_(Data_Function_Uncurried.mkFn2(Data_Eq.eq(dictEq)), deps, effect);
            });
        };
    };
};
var useInsertionEffectOnce = function (effect) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useInsertionEffect_(function (v, v1) {
            return true;
        }, Data_Unit.unit, effect);
    });
};
var useInsertionEffectAlways = function (effect) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useInsertionEffectAlways_(effect);
    });
};
var useInsertionEffect = function (dictEq) {
    return function (deps) {
        return function (effect) {
            return React_Basic_Hooks_Internal.unsafeHook(function () {
                return $foreign.useInsertionEffect_(Data_Function_Uncurried.mkFn2(Data_Eq.eq(dictEq)), deps, effect);
            });
        };
    };
};
var useId = /* #__PURE__ */ React_Basic_Hooks_Internal.unsafeHook($foreign.useId_);
var useEqCache = function (dictEq) {
    return function (a) {
        return React_Basic_Hooks_Internal.unsafeHook(function () {
            return $foreign.useEqCache_(Data_Function_Uncurried.mkFn2(Data_Eq.eq(dictEq)), a);
        });
    };
};
var useEffectOnce = function (effect) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useEffect_(function (v, v1) {
            return true;
        }, Data_Unit.unit, effect);
    });
};
var useEffectAlways = function (effect) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useEffectAlways_(effect);
    });
};
var useEffect = function (dictEq) {
    return function (deps) {
        return function (effect) {
            return React_Basic_Hooks_Internal.unsafeHook(function () {
                return $foreign.useEffect_(Data_Function_Uncurried.mkFn2(Data_Eq.eq(dictEq)), deps, effect);
            });
        };
    };
};
var useDeferredValue = function (a) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useDeferredValue_(a);
    });
};
var useDebugValue = function (debugValue) {
    return function (display) {
        return React_Basic_Hooks_Internal.unsafeHook(function () {
            return $foreign.useDebugValue_(debugValue, display);
        });
    };
};
var useContext = function (context) {
    return React_Basic_Hooks_Internal.unsafeHook(function () {
        return $foreign.useContext_(context);
    });
};
var unsafeReactFunctionComponent = Unsafe_Coerce.unsafeCoerce;
var unsafeDiscardRenderEffects = Unsafe_Coerce.unsafeCoerce;
var unsafeReactComponent = function () {
    return function () {
        return function (name) {
            return function (renderFn) {
                var c = unsafeReactFunctionComponent(function (props) {
                    return unsafeDiscardRenderEffects(renderFn(props))();
                });
                return function () {
                    return $foreign.unsafeSetDisplayName(name, c);
                };
            };
        };
    };
};
var runReducer = function (v) {
    return Data_Function_Uncurried.runFn2(v);
};
var readRef = /* #__PURE__ */ Effect_Uncurried.runEffectFn1($foreign.readRef_);
var readRefMaybe = function (a) {
    return Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe)(readRef(a));
};
var reactComponentWithChildren = unsafeReactComponent;
var reactComponent = function () {
    return unsafeReactComponent;
};
var reactComponentFromHook = function () {
    return function () {
        return function () {
            return function (name) {
                return function (propsToHook) {
                    return reactComponent()()()(name)(function (props) {
                        return Data_Functor.map(React_Basic_Hooks_Internal.functorRender)(props.render)(propsToHook(props));
                    });
                };
            };
        };
    };
};
var reactChildrenFromArray = Unsafe_Coerce.unsafeCoerce;
var newtypeUnsafeReference = {
    Coercible0: function () {
        return undefined;
    }
};
var mkReducer = /* #__PURE__ */ (function () {
    var $20 = Control_Applicative.pure(Effect.applicativeEffect);
    return function ($21) {
        return $20(Reducer(Data_Function_Uncurried.mkFn2($21)));
    };
})();
var memo$prime = function (arePropsEqual) {
    return function (comp) {
        return function __do() {
            var c = comp();
            return $foreign.memoEq_(c, Data_Function_Uncurried.mkFn2(arePropsEqual));
        };
    };
};
var memo = /* #__PURE__ */ Data_Function.flip(/* #__PURE__ */ Control_Bind.bind(Effect.bindEffect))(/* #__PURE__ */ Effect_Uncurried.runEffectFn1($foreign.memo_));
var eqUnsafeReference = {
    eq: Unsafe_Reference.unsafeRefEq
};
var component = function (name) {
    return function (renderFn) {
        return function __do() {
            var c = reactComponent()()()(name)(function ($22) {
                return renderFn((function (v) {
                    return v.nested;
                })($22));
            })();
            var $23 = React_Basic.element(c);
            return function ($24) {
                return $23((function (v) {
                    return {
                        nested: v
                    };
                })($24));
            };
        };
    };
};
export {
    reactChildrenToArray,
    displayName
} from "./foreign.js";
export {
    component,
    reactComponent,
    reactComponentWithChildren,
    reactComponentFromHook,
    reactChildrenFromArray,
    memo,
    memo$prime,
    useState,
    useState$prime,
    useEffect,
    useEffectOnce,
    useEffectAlways,
    useLayoutEffect,
    useLayoutEffectOnce,
    useLayoutEffectAlways,
    useInsertionEffect,
    useInsertionEffectOnce,
    useInsertionEffectAlways,
    mkReducer,
    runReducer,
    useReducer,
    readRef,
    readRefMaybe,
    writeRef,
    useRef,
    useContext,
    useEqCache,
    useMemo,
    useDebugValue,
    useId,
    useTransition,
    useDeferredValue,
    useSyncExternalStore,
    useSyncExternalStore$prime,
    UnsafeReference,
    newtypeUnsafeReference,
    eqUnsafeReference
};
export {
    consumer,
    contextConsumer,
    contextProvider,
    createContext,
    element,
    elementKeyed,
    empty,
    fragment,
    keyed,
    provider
} from "../React.Basic/index.js";
export {
    bind,
    coerceHook,
    discard,
    unsafeHook,
    unsafeRenderEffect
} from "../React.Basic.Hooks.Internal/index.js";
