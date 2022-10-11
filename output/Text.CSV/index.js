// Generated by purs version 0.15.2
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_String_Common from "../Data.String.Common/index.js";
import * as StringParser_Parser from "../StringParser.Parser/index.js";
import * as Text_CSV_Internal from "../Text.CSV.Internal/index.js";
var print = function (csv) {
    return Data_String_Common.joinWith("\x0d\x0a")(Data_Functor.map(Data_Functor.functorArray)((function () {
        var $0 = Data_String_Common.joinWith(",");
        var $1 = Data_Functor.map(Data_Functor.functorArray)(Text_CSV_Internal.escapeField(Text_CSV_Internal.CommaSeparated.value));
        return function ($2) {
            return $0($1($2));
        };
    })())(csv));
};
var parse = function (cs) {
    return StringParser_Parser.runParser(Text_CSV_Internal.csvParser(Text_CSV_Internal.CommaSeparated.value))(cs);
};
export {
    parse,
    print
};
export {
    CommaSeparated,
    TabSeparated,
    csvParser,
    escapeField
} from "../Text.CSV.Internal/index.js";
