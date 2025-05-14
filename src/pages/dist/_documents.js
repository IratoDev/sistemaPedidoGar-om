"use strict";
exports.__esModule = true;
var document_1 = require("next/document");
var react_1 = require("react");
function Document() {
    return (react_1["default"].createElement(document_1.Html, null,
        react_1["default"].createElement(document_1.Head, null),
        react_1["default"].createElement("body", null,
            react_1["default"].createElement(document_1.Main, null),
            react_1["default"].createElement(document_1.NextScript, null))));
}
exports["default"] = Document;
