const { Model, DataTypes } = require('sequelize');
const Produto = require('../models/Produto');
const Cotacao = require('../models/Cotacao');
const Fornecedor = require('../models/Fornecedor');
const Vendedor = require('../models/Vendedor');

class CotacaoResultado extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                field: 'idcotacao_resultado'
            },
            precoCotado: { type: DataTypes.DECIMAL, field: 'precocotado' },
            prazoEntrega: { type: DataTypes.INTEGER, field: 'prazo_entrega' },
            prazoPagamento: { type: DataTypes.INTEGER, field: 'prazo_pagto' },
			CotacaoId: {
                type: DataTypes.BIGINT,
                field: 'idcotacao',
                references: {
                    model: Cotacao,
                    key: 'id'                    
                }
            },
			ProdutoId: {
                type: DataTypes.BIGINT,
                field: 'idproduto',
                references: {
                    model: Produto,
                    key: 'id'                    
                }
            },
			FornecedorId: {
                type: DataTypes.BIGINT,
                field: 'idfornecedor',
                references: {
                    model: Fornecedor,
                    key: 'id'                    
                }
            },
			VendedorId: {
                type: DataTypes.BIGINT,
                field: 'idvendedor',
                references: {
                    model: Vendedor,
                    key: 'id'                    
                }
            },
        }, {
            sequelize,
            modelName: 'CotacaoResultado',
            tableName: 'cotacao_resultado',
            timestamps: false,
        })
    }

    static associate(models) {
        this.belongsTo(models.Cotacao, { foreignKey: 'idcotacao', as: 'cotacao' })
        this.belongsTo(models.Fornecedor, { foreignKey: 'idfornecedor', as: 'fornecedor' })
        this.belongsTo(models.Produto, { foreignKey: 'idproduto', as: 'produto' })
        this.belongsTo(models.Vendedor, { foreignKey: 'idvendedor', as: 'vendedor' })
    }
}

module.exports = CotacaoResultado;