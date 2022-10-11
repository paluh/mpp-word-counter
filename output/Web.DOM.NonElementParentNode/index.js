// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Nullable from "../Data.Nullable/index.js";
import * as Effect from "../Effect/index.js";
var getElementById = function (eid) {
    var $0 = Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe);
    var $1 = $foreign["_getElementById"](eid);
    return function ($2) {
        return $0($1($2));
    };
};
export {
    getElementById
};
