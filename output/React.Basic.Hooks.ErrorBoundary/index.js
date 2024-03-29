// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Data_Nullable from "../Data.Nullable/index.js";
import * as React_Basic from "../React.Basic/index.js";
var mkErrorBoundary = function (name) {
    var mapProps = function (render) {
        return {
            render: function (v) {
                return render({
                    error: Data_Nullable.toMaybe(v.error),
                    dismissError: v.dismissError
                });
            }
        };
    };
    return function __do() {
        var c = $foreign.errorBoundary_(name)();
        var $4 = React_Basic.element(c);
        return function ($5) {
            return $4(mapProps($5));
        };
    };
};
export {
    mkErrorBoundary
};
