// Generated by purs version 0.15.2
import * as Control_Category from "../Control.Category/index.js";
import * as Data_Eq from "../Data.Eq/index.js";
import * as Data_Newtype from "../Data.Newtype/index.js";
import * as Data_Ord from "../Data.Ord/index.js";
import * as Data_Ring from "../Data.Ring/index.js";
import * as Data_Show from "../Data.Show/index.js";
var Seconds = function (x) {
    return x;
};
var Minutes = function (x) {
    return x;
};
var Milliseconds = function (x) {
    return x;
};
var Hours = function (x) {
    return x;
};
var Days = function (x) {
    return x;
};
var toDuration = function (dict) {
    return dict.toDuration;
};
var showSeconds = {
    show: function (v) {
        return "(Seconds " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
    }
};
var showMinutes = {
    show: function (v) {
        return "(Minutes " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
    }
};
var showMilliseconds = {
    show: function (v) {
        return "(Milliseconds " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
    }
};
var showHours = {
    show: function (v) {
        return "(Hours " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
    }
};
var showDays = {
    show: function (v) {
        return "(Days " + (Data_Show.show(Data_Show.showNumber)(v) + ")");
    }
};
var semigroupSeconds = {
    append: function (v) {
        return function (v1) {
            return v + v1;
        };
    }
};
var semigroupMinutes = {
    append: function (v) {
        return function (v1) {
            return v + v1;
        };
    }
};
var semigroupMilliseconds = {
    append: function (v) {
        return function (v1) {
            return v + v1;
        };
    }
};
var semigroupHours = {
    append: function (v) {
        return function (v1) {
            return v + v1;
        };
    }
};
var semigroupDays = {
    append: function (v) {
        return function (v1) {
            return v + v1;
        };
    }
};
var ordSeconds = Data_Ord.ordNumber;
var ordMinutes = Data_Ord.ordNumber;
var ordMilliseconds = Data_Ord.ordNumber;
var ordHours = Data_Ord.ordNumber;
var ordDays = Data_Ord.ordNumber;
var newtypeSeconds = {
    Coercible0: function () {
        return undefined;
    }
};
var newtypeMinutes = {
    Coercible0: function () {
        return undefined;
    }
};
var newtypeMilliseconds = {
    Coercible0: function () {
        return undefined;
    }
};
var newtypeHours = {
    Coercible0: function () {
        return undefined;
    }
};
var newtypeDays = {
    Coercible0: function () {
        return undefined;
    }
};
var monoidSeconds = {
    mempty: 0.0,
    Semigroup0: function () {
        return semigroupSeconds;
    }
};
var monoidMinutes = {
    mempty: 0.0,
    Semigroup0: function () {
        return semigroupMinutes;
    }
};
var monoidMilliseconds = {
    mempty: 0.0,
    Semigroup0: function () {
        return semigroupMilliseconds;
    }
};
var monoidHours = {
    mempty: 0.0,
    Semigroup0: function () {
        return semigroupHours;
    }
};
var monoidDays = {
    mempty: 0.0,
    Semigroup0: function () {
        return semigroupDays;
    }
};
var fromDuration = function (dict) {
    return dict.fromDuration;
};
var negateDuration = function (dictDuration) {
    var $43 = toDuration(dictDuration);
    var $44 = Data_Newtype.over()()(Milliseconds)(Data_Ring.negate(Data_Ring.ringNumber));
    var $45 = fromDuration(dictDuration);
    return function ($46) {
        return $43($44($45($46)));
    };
};
var eqSeconds = Data_Eq.eqNumber;
var eqMinutes = Data_Eq.eqNumber;
var eqMilliseconds = Data_Eq.eqNumber;
var eqHours = Data_Eq.eqNumber;
var eqDays = Data_Eq.eqNumber;
var durationSeconds = {
    fromDuration: /* #__PURE__ */ Data_Newtype.over()()(Seconds)(function (v) {
        return v * 1000.0;
    }),
    toDuration: /* #__PURE__ */ Data_Newtype.over()()(Milliseconds)(function (v) {
        return v / 1000.0;
    })
};
var durationMinutes = {
    fromDuration: /* #__PURE__ */ Data_Newtype.over()()(Minutes)(function (v) {
        return v * 60000.0;
    }),
    toDuration: /* #__PURE__ */ Data_Newtype.over()()(Milliseconds)(function (v) {
        return v / 60000.0;
    })
};
var durationMilliseconds = {
    fromDuration: /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn),
    toDuration: /* #__PURE__ */ Control_Category.identity(Control_Category.categoryFn)
};
var durationHours = {
    fromDuration: /* #__PURE__ */ Data_Newtype.over()()(Hours)(function (v) {
        return v * 3600000.0;
    }),
    toDuration: /* #__PURE__ */ Data_Newtype.over()()(Milliseconds)(function (v) {
        return v / 3600000.0;
    })
};
var durationDays = {
    fromDuration: /* #__PURE__ */ Data_Newtype.over()()(Days)(function (v) {
        return v * 8.64e7;
    }),
    toDuration: /* #__PURE__ */ Data_Newtype.over()()(Milliseconds)(function (v) {
        return v / 8.64e7;
    })
};
var convertDuration = function (dictDuration) {
    return function (dictDuration1) {
        var $47 = toDuration(dictDuration1);
        var $48 = fromDuration(dictDuration);
        return function ($49) {
            return $47($48($49));
        };
    };
};
export {
    fromDuration,
    toDuration,
    Milliseconds,
    Seconds,
    Minutes,
    Hours,
    Days,
    convertDuration,
    negateDuration,
    newtypeMilliseconds,
    eqMilliseconds,
    ordMilliseconds,
    semigroupMilliseconds,
    monoidMilliseconds,
    showMilliseconds,
    newtypeSeconds,
    eqSeconds,
    ordSeconds,
    semigroupSeconds,
    monoidSeconds,
    showSeconds,
    newtypeMinutes,
    eqMinutes,
    ordMinutes,
    semigroupMinutes,
    monoidMinutes,
    showMinutes,
    newtypeHours,
    eqHours,
    ordHours,
    semigroupHours,
    monoidHours,
    showHours,
    newtypeDays,
    eqDays,
    ordDays,
    semigroupDays,
    monoidDays,
    showDays,
    durationMilliseconds,
    durationSeconds,
    durationMinutes,
    durationHours,
    durationDays
};
