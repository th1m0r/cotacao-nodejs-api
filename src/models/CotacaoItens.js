const { Model, DataTypes } = require('sequelize');

class CotacaoItens extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, field: 'idcotacao_itens' },
            quantidade: { type: DataTypes.DECIMAL },
            unidade: { type: DataTypes.STRING },
            embalagem: { type: DataTypes.DECIMAL },
            consumo: { type: DataTypes.DECIMAL },
            media: { type: DataTypes.DECIMAL },
            estoque: { type: DataTypes.DECIMAL },
        }, {
            sequelize,
            modelName: 'CotacaoItens',
            tableName: 'cotacao_itens',
            timestamps: false,
        })
    }

    static associate(models) {
        this.belongsTo(models.Cotacao, { foreignKey: 'idcotacao', as: 'cotacao' })
        this.belongsTo(models.Produto, { foreignKey: 'idproduto', as: 'produto' })
        this.hasOne(models.CotacaoResultado, { foreignKey: 'idcotacao', as: 'cotacaoResultado' })
        this.hasOne(models.CotacaoResultado, { foreignKey: 'idproduto', as: 'produtoResultado' })
    }

}

module.exports = CotacaoItens;