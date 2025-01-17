import ProdutoModel from '../models/ProdutoModel.js'; // Importe o modelo Produto

class ProdutoController {

  // Método para listar todos os produtos
  async index(req, res) {
    try {
      const produtos = await ProdutoModel.find();

      // Converter os valores de valorUnitario para número
      const produtosFormatados = produtos.map(produto => ({
        ...produto,
        valorUnitario: parseFloat(produto.valorUnitario), // Certifique-se de que o valor é numérico
      }));

      res.json(produtosFormatados); // Enviar resposta com os produtos formatados
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar produtos', error: error.message });
    }
  }


  // Método para criar um novo produto
  async store(req, res) {
    try {
      const nome = req.body.nome;
      const descricao = req.body.descricao;
      const valorUnitario = req.body.valorUnitario;
      const categoria = req.body.categoria;
      const quantidade = req.body.quantidade;

      const produto = await ProdutoModel.create({ // Criação de um novo produto usando Prisma
        nome,
        descricao,
        valorUnitario,
        categoria,
        quantidade,
      });
      res.status(201).json(produto); // Retorna o produto criado
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
    }
  }

  // Método para exibir um produto específico
  async show(req, res) {
    const id = req.params.id; // Captura o ID do produto da URL
    try {
      const produto = await ProdutoModel.findUnique(id); // Buscar produto pelo ID usando Prisma
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json(produto); // Retorna o produto encontrado
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
    }
  }


  // Método para atualizar um produto
  async update(req, res) {
    const id = parseInt(req.params.id);
    const { nome, descricao, quantidade, valorUnitario, categoria } = req.body;

    try {
      const produtoAtualizado = await ProdutoModel.update({
        id,
        nome,
        descricao,
        quantidade,
        valorUnitario,
        categoria,
      });
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error.message);
      res.status(500).json({ message: "Erro ao atualizar produto", error: error.message });
    }
  }

  // Método para excluir um produto
  async destroy(req, res) {
    const id = parseInt(req.params.id);

    try {
      await ProdutoModel.delete(id);
      res.status(204).send(); // Retorna sucesso sem conteúdo
    } catch (error) {
      console.error("Erro ao excluir produto:", error.message);
      res.status(500).json({ message: "Erro ao excluir produto", error: error.message });
    }
  }
};


export default new ProdutoController();
