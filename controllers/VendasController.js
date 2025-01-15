import Venda from '../models/VendaModel.js';

class VendaController {
  async index(req, res) {
    try {
      const vendas = await Venda.findAll();
      res.json(vendas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar vendas', error: error.message });
    }
  }

  async store(req, res) {
    try {
      const dataVenda = req.body;
      const valorTotal = req.body.produtos.reduce((total, produto) => total + produto.total, 0);
      const quantPecas = req.body.produtos.reduce((total, produto) => total + produto.quantidade, 0);
      const valorUnitario = req.body.produtos.reduce((total, produto) => total + produto.valorUnitario, 0);
      const valorDespesas = req.body;
      const produtos = req.body.produtos.map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        quantidade: produto.quantidade,
        valorUnitario: produto.valorUnitario,
      }));

      const venda = await Venda.create({
        dataVenda,
        valorTotal,
        quantPecas,
        valorUnitario,
        valorDespesas,
        produtos
      });

      // Salvar produtos relacionados (assumindo uma relação com outra tabela)
      await venda.addProdutos(produtos);

      res.status(201).json(venda);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar venda', error: error.message });
    }
  };

  async show(req, res) {
    const id = req.params.id;
    try {
      const venda = await Venda.findByPk(id, { include: ['produtos'] }); // Incluir produtos relacionados
      if (!venda) {
        return res.status(404).json({ message: 'Venda não encontrada' });
      }
      res.json(venda);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar venda', error: error.message });
    }
  };

  async destroy(req, res) {
    const id = req.params.id; // Captura o ID da venda da URL
    try {
      const venda = await Venda.findUnique(id); // Buscar a venda pelo ID usando Prisma
      if (!venda) {
        return res.status(404).json({ message: 'Venda não encontrada' });
      }

      await Venda.delete(id); // Excluir a venda do banco de dados usando Prisma
      res.status(204).send(); // Retorna uma resposta de sucesso sem conteúdo
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir venda', error: error.message });
    }
  }


}
export default new VendaController();
