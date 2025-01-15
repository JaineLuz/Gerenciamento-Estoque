import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Produto from './ProdutoModel.js';
import Venda from './VendaModel.js';

const ProdutoVenda = sequelize.define('ProdutoVenda', {
  produtoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Produto,
      key: 'id',
    },
  },
  vendaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Venda,
      key: 'id',
    },
  },
}, {
  timestamps: false, // Remove os campos createdAt e updatedAt
  tableName: 'ProdutoVenda', // Nome da tabela no banco de dados
});

// Configurando os relacionamentos
Produto.belongsToMany(Venda, { through: ProdutoVenda, foreignKey: 'produtoId' });
Venda.belongsToMany(Produto, { through: ProdutoVenda, foreignKey: 'vendaId' });

export default ProdutoVenda;
