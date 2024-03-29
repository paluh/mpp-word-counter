// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Nullable from "../Data.Nullable/index.js";
import * as Effect from "../Effect/index.js";
import * as Effect_Uncurried from "../Effect.Uncurried/index.js";
var getSelection = /* #__PURE__ */ (function () {
    var $0 = Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe);
    var $1 = Effect_Uncurried.runEffectFn1($foreign.getSelectionImpl);
    return function ($2) {
        return $0($1($2));
    };
})();
export {
    toString,
    getSelectionImpl
} from "./foreign.js";
export {
    getSelection
};
