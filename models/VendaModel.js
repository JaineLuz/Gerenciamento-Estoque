import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class VendaModel {
  async find() {
    try {
      const vendas = await prisma.venda.findMany();
      return vendas;
    } catch (error) {
      console.error('Erro ao buscar vendas: ', error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const venda = await prisma.venda.findUnique({
        where: {
          id: id
        }
      })
      return venda;
    } catch (error) {
      console.error(`Erro ao buscar venda com ID ${id}:`, error);
      throw error;
    }
  }

  async create(venda) {
    const venda_criada = await prisma.venda.create({
      data: {
        valorTotal: venda.valorTotal,
        valorDespesas: venda.valorDespesas,
        quantPecas: venda.quantPecas,
        dataVenda: venda.dataVenda
      }
    });
    return venda_criada
  }

  async update(venda) {
    if (!venda.id) {
      throw new Error("ID da venda é obrigatório para atualizar.");
    }
    const venda_atualizada = await prisma.venda.update({
      where: {
        id: venda.id
      },
      data: {
        valorTotal: venda.valorTotal,
        valorDespesas: venda.valorDespesas,
        quantPecas: venda.quantPecas,
        dataVenda: venda.dataVenda
      }
    })
    return venda_atualizada
  }

  async delete(id) {
    const venda_deletada = await prisma.venda.delete({
      where: {
        id: id
      }
    })
    return venda_deletada;
  }
}

export default new VendaModel();
