// Generated by purs version 0.15.2
import * as Control_Applicative_Indexed from "../Control.Applicative.Indexed/index.js";
import * as Control_Apply_Indexed from "../Control.Apply.Indexed/index.js";
import * as Control_Bind_Indexed from "../Control.Bind.Indexed/index.js";
import * as Data_Functor_Indexed from "../Data.Functor.Indexed/index.js";
var pure = function (dictIxApplicative) {
    return Control_Applicative_Indexed.ipure(dictIxApplicative);
};
var map = function (dictIxFunctor) {
    return Data_Functor_Indexed.imap(dictIxFunctor);
};
var discard = function (dictIxBind) {
    return function (dictIxDiscard) {
        return Control_Bind_Indexed.idiscard(dictIxDiscard)(dictIxBind);
    };
};
var bind = function (dictIxMonad) {
    return Control_Bind_Indexed.ibind(dictIxMonad.IxBind1());
};
var apply = function (dictIxApply) {
    return Control_Apply_Indexed.iapply(dictIxApply);
};
export {
    map,
    apply,
    pure,
    bind,
    discard
};
