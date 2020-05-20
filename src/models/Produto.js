const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, field: 'idproduto' },
            ean: DataTypes.BIGINT,
            descricao: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Produto',
            tableName: 'produto',
            timestamps: false,
        })
    }

    static associate(models) {
        this.hasMany(models.ProdutoEmpresa, { foreignKey: 'idproduto', as: 'produtosEmpresa'});
        this.belongsTo(models.Familia, { foreignKey: 'idfamilia', as: 'familia' });
    }
}
module.exports = Produto;