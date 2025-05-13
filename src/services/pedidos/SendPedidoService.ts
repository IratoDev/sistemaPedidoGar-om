import fs from "fs";
import path from "path";
import prismaClient from "../../prisma";

interface PedidoRequest {
  pedido_id: string;
}

class SendPedidoService {
  async execute({ pedido_id }: PedidoRequest) {
    try {
      // Passo 1: Buscar os itens do pedido
      const pedidoItens = await prismaClient.pedidoItem.findMany({
        where: {
          pedido_id: pedido_id,
        },
        include: {
          product: true,  // Inclui o produto
        },
      });

       // Atualiza o pedido no banco de dados
       const pedido = await prismaClient.pedido.update({
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
      const pedidoAtualizado = await prismaClient.pedido.update({
        where: {
          id: pedido_id,
        },
        data: {
          status: false, // Atualiza o status
        },
      });

      // Passo 3: Criar o arquivo TXT
      const folderPath = path.resolve(__dirname, "C:\\click\\TXT");

      // Criar a pasta, caso não exista
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Nome do arquivo
      const fileName = `${pedido.table}.txt`;
      const filePath = path.join(folderPath, fileName);

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
      fs.writeFileSync(filePath, fileContent, "utf-8");

      // Retornar sucesso
      return { success: true, message: "Pedido atualizado e arquivo gerado com sucesso!" };
    } catch (err) {
      console.error("Erro ao processar o pedido:", err.message);
      throw new Error("Erro ao processar o pedido. Verifique os logs.");
    }
  }
}

export { SendPedidoService };
