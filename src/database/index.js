const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV || 'development']);

const Produto = require('../models/Produto');
const Empresa = require('../models/Empresa');
const ProdutoEmpresa = require('../models/ProdutoEmpresa');
const Cotacao = require('../models/Cotacao');
const CotacaoItens = require('../models/CotacaoItens');
const Familia = require('../models/Familia');
const Fornecedor = require('../models/Fornecedor');
const Vendedor = require('../models/Vendedor');
const FornecedorVendedor = require('../models/FornecedorVendedor');
const CotacaoResultado = require('../models/CotacaoResultado');

Produto.init(sequelize);
Empresa.init(sequelize);
ProdutoEmpresa.init(sequelize);
Cotacao.init(sequelize);
CotacaoItens.init(sequelize);
Familia.init(sequelize);
Fornecedor.init(sequelize);
Vendedor.init(sequelize);
FornecedorVendedor.init(sequelize);
CotacaoResultado.init(sequelize);

Produto.associate(sequelize.models);
Empresa.associate(sequelize.models);
ProdutoEmpresa.associate(sequelize.models);
Cotacao.associate(sequelize.models);
CotacaoItens.associate(sequelize.models);
Familia.associate(sequelize.models);
Fornecedor.associate(sequelize.models);
Vendedor.associate(sequelize.models);
CotacaoResultado.associate(sequelize.models);

module.exports = sequelize;