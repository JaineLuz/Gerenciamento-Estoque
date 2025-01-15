import Produto from '../models/ProdutoModel.js';
import Estoque from '../models/EstoqueModel.js';
import Venda from '../models/VendaModel.js';
import ProdutoVenda from '../models/ProdutoVendaModel.js';

// Produto e Estoque
Produto.hasOne(Estoque, { foreignKey: 'produto_id' });
Estoque.belongsTo(Produto, { foreignKey: 'produto_id' });

// Produto e ProdutoVenda
Produto.hasMany(ProdutoVenda, { foreignKey: 'produto_id' });

// Venda e ProdutoVenda
Venda.hasMany(ProdutoVenda, { foreignKey: 'venda_id' });

module.exports = { Produto, Estoque, Venda };
