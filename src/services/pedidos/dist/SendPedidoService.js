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
exports.SendPedidoService = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var prisma_1 = require("../../prisma");
var SendPedidoService = /** @class */ (function () {
    function SendPedidoService() {
    }
    SendPedidoService.prototype.execute = function (_a) {
        var pedido_id = _a.pedido_id;
        return __awaiter(this, void 0, void 0, function () {
            var pedidoItens, pedido, pedidoAtualizado, folderPath, fileName, filePath, fileContent_1, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, prisma_1["default"].pedidoItem.findMany({
                                where: {
                                    pedido_id: pedido_id
                                },
                                include: {
                                    product: true
                                }
                            })];
                    case 1:
                        pedidoItens = _b.sent();
                        return [4 /*yield*/, prisma_1["default"].pedido.update({
                                where: {
                                    id: pedido_id
                                },
                                data: {
                                    draft: false
                                }
                            })];
                    case 2:
                        pedido = _b.sent();
                        if (!pedidoItens || pedidoItens.length === 0) {
                            throw new Error("Nenhum item encontrado para o pedido.");
                        }
                        return [4 /*yield*/, prisma_1["default"].pedido.update({
                                where: {
                                    id: pedido_id
                                },
                                data: {
                                    status: false
                                }
                            })];
                    case 3:
                        pedidoAtualizado = _b.sent();
                        folderPath = path_1["default"].resolve(__dirname, "C:\\click\\TXT");
                        // Criar a pasta, caso não exista
                        if (!fs_1["default"].existsSync(folderPath)) {
                            fs_1["default"].mkdirSync(folderPath, { recursive: true });
                        }
                        fileName = pedido.table + ".txt";
                        filePath = path_1["default"].join(folderPath, fileName);
                        fileContent_1 = "";
                        pedidoItens.forEach(function (item) {
                            var quantidade = item.amount || 1; // Definir quantidade como 1 se não definida
                            var nomeProduto = item.product.name || "Produto sem nome";
                            var precoUnitario = parseFloat(item.product.price) || 0.0;
                            var total = quantidade * precoUnitario;
                            // Formatar linha no formato desejado
                            fileContent_1 += quantidade.toString().padEnd(5) + " " + nomeProduto.padEnd(40) + " " + precoUnitario.toFixed(2).padStart(6) + "  " + total.toFixed(2).padStart(6) + "\n";
                        });
                        // Escrever o conteúdo no arquivo
                        fs_1["default"].writeFileSync(filePath, fileContent_1, "utf-8");
                        // Retornar sucesso
                        return [2 /*return*/, { success: true, message: "Pedido atualizado e arquivo gerado com sucesso!" }];
                    case 4:
                        err_1 = _b.sent();
                        console.error("Erro ao processar o pedido:", err_1.message);
                        throw new Error("Erro ao processar o pedido. Verifique os logs.");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return SendPedidoService;
}());
exports.SendPedidoService = SendPedidoService;
