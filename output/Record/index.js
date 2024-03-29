// Generated by purs version 0.15.2
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Symbol from "../Data.Symbol/index.js";
import * as Record_Unsafe from "../Record.Unsafe/index.js";
import * as Record_Unsafe_Union from "../Record.Unsafe.Union/index.js";
import * as Type_Proxy from "../Type.Proxy/index.js";
import * as Unsafe_Coerce from "../Unsafe.Coerce/index.js";
var union = function () {
    return function (l) {
        return function (r) {
            return Record_Unsafe_Union.unsafeUnionFn(l, r);
        };
    };
};
var set = function (dictIsSymbol) {
    return function () {
        return function () {
            return function (l) {
                return function (b) {
                    return function (r) {
                        return Record_Unsafe.unsafeSet(Data_Symbol.reflectSymbol(dictIsSymbol)(l))(b)(r);
                    };
                };
            };
        };
    };
};
var nub = function () {
    return Unsafe_Coerce.unsafeCoerce;
};
var merge = function () {
    return function () {
        return function (l) {
            return function (r) {
                return Record_Unsafe_Union.unsafeUnionFn(l, r);
            };
        };
    };
};
var insert = function (dictIsSymbol) {
    return function () {
        return function () {
            return function (l) {
                return function (a) {
                    return function (r) {
                        return Record_Unsafe.unsafeSet(Data_Symbol.reflectSymbol(dictIsSymbol)(l))(a)(r);
                    };
                };
            };
        };
    };
};
var get = function (dictIsSymbol) {
    return function () {
        return function (l) {
            return function (r) {
                return Record_Unsafe.unsafeGet(Data_Symbol.reflectSymbol(dictIsSymbol)(l))(r);
            };
        };
    };
};
var modify = function (dictIsSymbol) {
    return function () {
        return function () {
            return function (l) {
                return function (f) {
                    return function (r) {
                        return set(dictIsSymbol)()()(l)(f(get(dictIsSymbol)()(l)(r)))(r);
                    };
                };
            };
        };
    };
};
var equalFieldsNil = {
    equalFields: function (v) {
        return function (v1) {
            return function (v2) {
                return true;
            };
        };
    }
};
var equalFields = function (dict) {
    return dict.equalFields;
};
var equalFieldsCons = function (dictIsSymbol) {
    return function (dictEq) {
        return function () {
            return function (dictEqualFields) {
                return {
                    equalFields: function (v) {
                        return function (a) {
                            return function (b) {
                                var get$prime = get(dictIsSymbol)()(Type_Proxy["Proxy"].value);
                                var equalRest = equalFields(dictEqualFields)(Type_Proxy["Proxy"].value);
                                return Data_Eq.eq(dictEq)(get$prime(a))(get$prime(b)) && equalRest(a)(b);
                            };
                        };
                    }
                };
            };
        };
    };
};
var equal = function () {
    return function (dictEqualFields) {
        return function (a) {
            return function (b) {
                return equalFields(dictEqualFields)(Type_Proxy["Proxy"].value)(a)(b);
            };
        };
    };
};
var disjointUnion = function () {
    return function () {
        return function (l) {
            return function (r) {
                return Record_Unsafe_Union.unsafeUnionFn(l, r);
            };
        };
    };
};
var $$delete = function (dictIsSymbol) {
    return function () {
        return function () {
            return function (l) {
                return function (r) {
                    return Record_Unsafe.unsafeDelete(Data_Symbol.reflectSymbol(dictIsSymbol)(l))(r);
                };
            };
        };
    };
};
var rename = function (dictIsSymbol) {
    return function (dictIsSymbol1) {
        return function () {
            return function () {
                return function () {
                    return function () {
                        return function (prev) {
                            return function (next) {
                                return function (record) {
                                    return insert(dictIsSymbol1)()()(next)(get(dictIsSymbol)()(prev)(record))($$delete(dictIsSymbol)()()(prev)(record));
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export {
    get,
    set,
    modify,
    insert,
    $$delete as delete,
    rename,
    equal,
    merge,
    union,
    disjointUnion,
    nub,
    equalFields,
    equalFieldsCons,
    equalFieldsNil
};
