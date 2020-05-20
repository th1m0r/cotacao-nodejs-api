const { Model, DataTypes } = require('sequelize');

class Cotacao extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                field: 'idcotacao'
            },
            dataInicial: { type: DataTypes.DATE, allowNull: false, field: 'datainicio' },
            dataFinal: { type: DataTypes.DATE, allowNull: false, field: 'datafinal' },
            situacao: { type: DataTypes.CHAR },
            descricao: { type: DataTypes.TEXT }
        },
            {
                sequelize,
                modelName: 'Cotacao',
                tableName: 'cotacao',
                timestamps: false,
            })
    }

    static associate(models) {
        this.belongsTo(models.Empresa, { foreignKey: 'idloja', as: 'empresa' });
        this.hasMany(models.CotacaoItens, { foreignKey: 'idcotacao', as: 'itens' });
        this.hasMany(models.CotacaoResultado, { foreignKey: 'idcotacao', as: 'itensRespondidos' });
    }

}

module.exports = Cotacao;