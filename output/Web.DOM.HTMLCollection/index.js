// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Nullable from "../Data.Nullable/index.js";
import * as Effect from "../Effect/index.js";
import * as Web_DOM_Internal_Types from "../Web.DOM.Internal.Types/index.js";
var namedItem = function (id) {
    var $0 = Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe);
    var $1 = $foreign["_namedItem"](id);
    return function ($2) {
        return $0($1($2));
    };
};
var item = function (i) {
    var $3 = Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe);
    var $4 = $foreign["_item"](i);
    return function ($5) {
        return $3($4($5));
    };
};
export {
    length,
    toArray
} from "./foreign.js";
export {
    item,
    namedItem
};
