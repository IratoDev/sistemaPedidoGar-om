"use strict";
exports.__esModule = true;
var express_1 = require("express");
require("express-async-errors");
var cors_1 = require("cors");
var path_1 = require("path");
var routes_1 = require("./routes");
var express_fileupload_1 = require("express-fileupload");
//criando servidor web
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(cors_1["default"]());
app.use(express_fileupload_1["default"]({
    limits: { fileSize: 50 * 1024 * 1024 }
}));
app.use(routes_1.router);
app.use('/files', express_1["default"].static(path_1["default"].resolve(__dirname, '..', 'tmp')));
app.use(function (err, req, res, next) {
    if (err instanceof Error) {
        //se for uma instancia do tipo erro
        return res.status(400).json({
            error: err.message
        });
    }
    ;
    return res.status(500).json({
        status: "error",
        message: "internal server error"
    });
});
app.listen(process.env.Port, function () { return console.log('servidor oline!!!'); });
