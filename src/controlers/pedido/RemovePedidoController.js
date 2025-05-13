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
exports.RemovePedidoController = void 0;
const RemovePedidoService_1 = require("../../services/pedidos/RemovePedidoService");
class RemovePedidoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedido_id = req.query.pedido_id;
            const removePedido = new RemovePedidoService_1.RemovePedidoServce();
            const pedido = yield removePedido.execute({
                pedido_id
            });
            return res.json(pedido);
        });
    }
}
exports.RemovePedidoController = RemovePedidoController;
