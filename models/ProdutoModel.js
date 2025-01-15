import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProdutoModel {
  async find() {
    try {
      const produtos = await prisma.produto.findMany({ orderBy: { id: 'asc' } }); // Corrigido: Prisma -> prisma
      return produtos;
    } catch (error) {
      console.error('Erro ao buscar produtos: ', error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const produto = await prisma.produto.findUnique({ // Corrigido: Prisma -> prisma
        where: {
          id: id
        }
      });
      return produto;
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error);
      throw error;
    }
  }

  async create(produto) {

    const produto_criado = await prisma.produto.create({ // Corrigido: Prisma -> prisma
      data: {
        nome: produto.nome,
        descricao: produto.descricao,
        quantidade: produto.quantidade,
        valorUnitario: produto.valorUnitario,
        categoria: produto.categoria
      }
    });
    return produto_criado;
  }

  async update(produto) {
    if (!produto.id) {
      throw new Error("ID do produto é obrigatório para atualizar.");
    }

    const produtoAtualizado = await prisma.produto.update({
      where: {
        id: produto.id, // Use "id" como está definido no banco
      },
      data: {
        nome: produto.nome,
        descricao: produto.descricao,
        quantidade: produto.quantidade,
        valorUnitario: produto.valorUnitario,
        categoria: produto.categoria,
      },
    });

    return produtoAtualizado;
  }


  async delete(id) {
    const produto_deletado = await prisma.produto.delete({ // Corrigido: Prisma -> prisma
      where: {
        id: id
      }
    });
    return produto_deletado; // Adicionado retorno do produto deletado
  }
}

export default new ProdutoModel();
