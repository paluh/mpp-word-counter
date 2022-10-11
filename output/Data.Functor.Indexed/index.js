// Generated by purs version 0.15.2
import * as Data_Function from "../Data.Function/index.js";
import * as Data_Unit from "../Data.Unit/index.js";
var imap = function (dict) {
    return dict.imap;
};
var ivoid = function (dictIxFunctor) {
    return imap(dictIxFunctor)(Data_Function["const"](Data_Unit.unit));
};
var ivoidLeft = function (dictIxFunctor) {
    return function (f) {
        return function (x) {
            return imap(dictIxFunctor)(Data_Function["const"](x))(f);
        };
    };
};
var ivoidRight = function (dictIxFunctor) {
    return function (x) {
        return imap(dictIxFunctor)(Data_Function["const"](x));
    };
};
export {
    imap,
    ivoid,
    ivoidRight,
    ivoidLeft
};