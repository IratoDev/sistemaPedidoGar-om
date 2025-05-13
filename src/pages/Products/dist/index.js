"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getServerSideProps = void 0;
var react_1 = require("react");
var head_1 = require("next/head");
var style_module_scss_1 = require("./style.module.scss");
//componentes
var Header_1 = require("../../components/Header");
//verificação se o usuario esta logado
var canSSRAuth_1 = require("../../utils/canSSRAuth");
//icones
var fi_1 = require("react-icons/fi");
var api_1 = require("../../service/api");
var react_toastify_1 = require("react-toastify");
function Product(_a) {
    var categoryList = _a.categoryList;
    var _b = react_1.useState(''), name = _b[0], setName = _b[1];
    var _c = react_1.useState(''), price = _c[0], setPrice = _c[1];
    var _d = react_1.useState(''), description = _d[0], setDescription = _d[1];
    //armazena imagem
    var _e = react_1.useState(''), avatarUrl = _e[0], setAvatarUrl = _e[1];
    var _f = react_1.useState(null), imageAvatar = _f[0], setImageAvatar = _f[1];
    //armazenamento de seleção
    var _g = react_1.useState(categoryList || []), categories = _g[0], setCategories = _g[1];
    var _h = react_1.useState(0), categorySelected = _h[0], setcategorySelected = _h[1];
    function handleFile(e) {
        if (!e.target.files) {
            return;
        }
        var image = e.target.files[0];
        if (!image) {
            return;
        }
        if (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    }
    //quando voce seleciona uma nova categoria na lista 
    function handleChangeCategory(event) {
        setcategorySelected(Number(event.target.value));
    }
    function handleRegister(event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, apiClient, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        data = new FormData();
                        if (name === "" || price === "" || description === "" || imageAvatar === null) {
                            react_toastify_1.toast.error("preencha todos os campos");
                            return [2 /*return*/];
                        }
                        data.append('name', name);
                        data.append('price', price);
                        data.append('description', description);
                        data.append('category_id', categories[categorySelected].id);
                        data.append('file', imageAvatar);
                        apiClient = api_1.setupApiClient();
                        return [4 /*yield*/, apiClient.post('/product', data)];
                    case 2:
                        _a.sent();
                        react_toastify_1.toast.success('cadastrado com sucesso!!');
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        react_toastify_1.toast.error("Ops Erro ao cadastrar");
                        return [3 /*break*/, 4];
                    case 4:
                        setName('');
                        setPrice('');
                        setDescription('');
                        setAvatarUrl('');
                        setImageAvatar(null);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Novo produto - Irato.Dev")),
        React.createElement("div", null,
            React.createElement(Header_1.Header, null),
            React.createElement("main", { className: style_module_scss_1["default"].conteiner },
                React.createElement("div", null,
                    React.createElement("form", { onSubmit: handleRegister },
                        React.createElement("label", null,
                            React.createElement("span", null,
                                React.createElement(fi_1.FiUpload, { size: 30, color: "#fff" })),
                            React.createElement("input", { type: "file", accept: "image/png, image/jpeg, image/jpg", onChange: handleFile }),
                            avatarUrl && (React.createElement("img", { className: style_module_scss_1["default"].previw, src: avatarUrl, alt: "foto do produto", width: 250, height: 250 }))),
                        React.createElement("select", { value: categorySelected, onChange: handleChangeCategory }, categories.map(function (item, index) {
                            return (React.createElement("option", { key: item.id, value: index }, item.name));
                        })),
                        React.createElement("input", { className: style_module_scss_1["default"].input, type: "text", placeholder: "Digite o nome do produto", value: name, onChange: function (e) { return setName(e.target.value); } }),
                        React.createElement("input", { className: style_module_scss_1["default"].input, type: "number", placeholder: "Pre\u00E7o do produto", value: price, onChange: function (e) { return setPrice(e.target.value); } }),
                        React.createElement("textarea", { className: style_module_scss_1["default"].input, placeholder: "Descreva seu produto...", value: description, onChange: function (e) { return setDescription(e.target.value); } }),
                        React.createElement("button", { className: style_module_scss_1["default"].buttonAdd, type: "submit" }, "Cadastrar")))))));
}
exports["default"] = Product;
exports.getServerSideProps = canSSRAuth_1.canSSRAuth(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var apiClient, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiClient = api_1.setupApiClient(ctx);
                return [4 /*yield*/, apiClient.get('/category')];
            case 1:
                response = _a.sent();
                return [2 /*return*/, {
                        props: {
                            categoryList: response.data
                        }
                    }];
        }
    });
}); });
