// Generated by purs version 0.15.2
import * as Data_HeytingAlgebra from "../Data.HeytingAlgebra/index.js";
var booleanAlgebraUnit = {
    HeytingAlgebra0: function () {
        return Data_HeytingAlgebra.heytingAlgebraUnit;
    }
};
var booleanAlgebraRecordNil = {
    HeytingAlgebraRecord0: function () {
        return Data_HeytingAlgebra.heytingAlgebraRecordNil;
    }
};
var booleanAlgebraRecordCons = function (dictIsSymbol) {
    return function () {
        return function (dictBooleanAlgebraRecord) {
            return function (dictBooleanAlgebra) {
                return {
                    HeytingAlgebraRecord0: function () {
                        return Data_HeytingAlgebra.heytingAlgebraRecordCons(dictIsSymbol)()(dictBooleanAlgebraRecord.HeytingAlgebraRecord0())(dictBooleanAlgebra.HeytingAlgebra0());
                    }
                };
            };
        };
    };
};
var booleanAlgebraRecord = function () {
    return function (dictBooleanAlgebraRecord) {
        return {
            HeytingAlgebra0: function () {
                return Data_HeytingAlgebra.heytingAlgebraRecord()(dictBooleanAlgebraRecord.HeytingAlgebraRecord0());
            }
        };
    };
};
var booleanAlgebraProxy = {
    HeytingAlgebra0: function () {
        return Data_HeytingAlgebra.heytingAlgebraProxy;
    }
};
var booleanAlgebraFn = function (dictBooleanAlgebra) {
    return {
        HeytingAlgebra0: function () {
            return Data_HeytingAlgebra.heytingAlgebraFunction(dictBooleanAlgebra.HeytingAlgebra0());
        }
    };
};
var booleanAlgebraBoolean = {
    HeytingAlgebra0: function () {
        return Data_HeytingAlgebra.heytingAlgebraBoolean;
    }
};
export {
    booleanAlgebraBoolean,
    booleanAlgebraUnit,
    booleanAlgebraFn,
    booleanAlgebraRecord,
    booleanAlgebraProxy,
    booleanAlgebraRecordNil,
    booleanAlgebraRecordCons
};
export {
    conj,
    disj,
    ff,
    implies,
    not,
    tt
} from "../Data.HeytingAlgebra/index.js";