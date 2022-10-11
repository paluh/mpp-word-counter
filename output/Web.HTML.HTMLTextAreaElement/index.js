// Generated by purs version 0.15.2
import * as $foreign from "./foreign.js";
import * as Data_Functor from "../Data.Functor/index.js";
import * as Data_Nullable from "../Data.Nullable/index.js";
import * as Effect from "../Effect/index.js";
import * as Unsafe_Coerce from "../Unsafe.Coerce/index.js";
import * as Web_HTML_SelectionMode from "../Web.HTML.SelectionMode/index.js";
import * as Web_Internal_FFI from "../Web.Internal.FFI/index.js";
var toParentNode = Unsafe_Coerce.unsafeCoerce;
var toNonDocumentTypeChildNode = Unsafe_Coerce.unsafeCoerce;
var toNode = Unsafe_Coerce.unsafeCoerce;
var toHTMLElement = Unsafe_Coerce.unsafeCoerce;
var toEventTarget = Unsafe_Coerce.unsafeCoerce;
var toElement = Unsafe_Coerce.unsafeCoerce;
var toChildNode = Unsafe_Coerce.unsafeCoerce;
var setRangeText$prime = function (rpl) {
    return function (s) {
        return function (e) {
            return function (mode) {
                return function (area) {
                    return function () {
                        return $foreign["_setRangeText"](rpl, s, e, Web_HTML_SelectionMode.print(mode), area);
                    };
                };
            };
        };
    };
};
var fromParentNode = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLTextAreaElement");
var fromNonDocumentTypeChildNode = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLTextAreaElement");
var fromNode = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLTextAreaElement");
var fromHTMLElement = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLTextAreaElement");
var fromEventTarget = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLTextAreaElement");
var fromElement = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLTextAreaElement");
var fromChildNode = /* #__PURE__ */ Web_Internal_FFI.unsafeReadProtoTagged("HTMLTextAreaElement");
var form = /* #__PURE__ */ (function () {
    var $0 = Data_Functor.map(Effect.functorEffect)(Data_Nullable.toMaybe);
    return function ($1) {
        return $0($foreign["_form"]($1));
    };
})();
export {
    autocomplete,
    setAutocomplete,
    autofocus,
    setAutofocus,
    cols,
    setCols,
    dirName,
    setDirName,
    disabled,
    setDisabled,
    maxLength,
    setMaxLength,
    minLength,
    setMinLength,
    name,
    setName,
    placeholder,
    setPlaceholder,
    readOnly,
    setReadOnly,
    required,
    setRequired,
    rows,
    setRows,
    wrap,
    setWrap,
    type_,
    defaultValue,
    setDefaultValue,
    value,
    setValue,
    textLength,
    willValidate,
    validity,
    validationMessage,
    checkValidity,
    reportValidity,
    setCustomValidity,
    labels,
    select,
    selectionStart,
    setSelectionStart,
    selectionEnd,
    setSelectionEnd,
    selectionDirection,
    setSelectionDirection,
    setRangeText,
    setSelectionRange
} from "./foreign.js";
export {
    fromHTMLElement,
    fromElement,
    fromNode,
    fromChildNode,
    fromNonDocumentTypeChildNode,
    fromParentNode,
    fromEventTarget,
    toHTMLElement,
    toElement,
    toNode,
    toChildNode,
    toNonDocumentTypeChildNode,
    toParentNode,
    toEventTarget,
    form,
    setRangeText$prime
};
