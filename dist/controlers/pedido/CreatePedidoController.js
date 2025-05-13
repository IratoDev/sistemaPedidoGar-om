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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePedidoController = void 0;
const CreatePedidoService_1 = require("../../services/pedidos/CreatePedidoService");
class CreatePedidoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, name } = req.body;
            const createPedidoService = new CreatePedidoService_1.CreatePedidoService();
            const pedido = yield createPedidoService.execute({
                table,
                name,
            });
            return res.json(pedido);
        });
    }
}
exports.CreatePedidoController = CreatePedidoController;
