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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendPedidoService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = __importDefault(require("../../prisma"));
class SendPedidoService {
    execute({ pedido_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Passo 1: Buscar os itens do pedido
                const pedidoItens = yield prisma_1.default.pedidoItem.findMany({
                    where: {
                        pedido_id: pedido_id,
                    },
                    include: {
                        product: true, // Inclui o produto
                    },
                });
                // Atualiza o pedido no banco de dados
                const pedido = yield prisma_1.default.pedido.update({
                    where: {
                        id: pedido_id,
                    },
                    data: {
                        draft: false,
                    },
                });
                if (!pedidoItens || pedidoItens.length === 0) {
                    throw new Error("Nenhum item encontrado para o pedido.");
                }
                // Passo 2: Atualizar o status do pedido para `false`
                const pedidoAtualizado = yield prisma_1.default.pedido.update({
                    where: {
                        id: pedido_id,
                    },
                    data: {
                        status: false, // Atualiza o status
                    },
                });
                // Passo 3: Criar o arquivo TXT
                const folderPath = path_1.default.resolve(__dirname, "C:\\click\\TXT");
                // Criar a pasta, caso não exista
                if (!fs_1.default.existsSync(folderPath)) {
                    fs_1.default.mkdirSync(folderPath, { recursive: true });
                }
                // Nome do arquivo
                const fileName = `${pedido.table}.txt`;
                const filePath = path_1.default.join(folderPath, fileName);
                // Criar conteúdo do arquivo
                let fileContent = "";
                pedidoItens.forEach((item) => {
                    const quantidade = item.amount || 1; // Definir quantidade como 1 se não definida
                    const nomeProduto = item.product.name || "Produto sem nome";
                    const precoUnitario = parseFloat(item.product.price) || 0.0;
                    const total = quantidade * precoUnitario;
                    // Formatar linha no formato desejado
                    fileContent += `${quantidade.toString().padEnd(5)} ${nomeProduto.padEnd(40)} ${precoUnitario.toFixed(2).padStart(6)}  ${total.toFixed(2).padStart(6)}\n`;
                });
                // Escrever o conteúdo no arquivo
                fs_1.default.writeFileSync(filePath, fileContent, "utf-8");
                // Retornar sucesso
                return { success: true, message: "Pedido atualizado e arquivo gerado com sucesso!" };
            }
            catch (err) {
                console.error("Erro ao processar o pedido:", err.message);
                throw new Error("Erro ao processar o pedido. Verifique os logs.");
            }
        });
    }
}
exports.SendPedidoService = SendPedidoService;
