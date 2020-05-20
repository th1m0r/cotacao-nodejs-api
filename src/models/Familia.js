const { Model, DataTypes } = require('sequelize');

class Familia extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                field: 'idfamilia'
            },
            nome: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Familia',
            tableName: 'familia',
            timestamps: false,
        })
    }

    static associate(models) {
        this.hasMany(models.ProdutoEmpresa, { foreignKey: 'idfamilia', as: 'produtosEmpresa' });
        this.hasMany(models.Produto, { foreignKey: 'idfamilia', as: 'produtos' });
    }
}
module.exports = Familia;