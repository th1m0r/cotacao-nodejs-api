const { Model, DataTypes } = require('sequelize');

class Fornecedor extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                field: 'idfornecedor'
            },
            razaoSocial: { type: DataTypes.STRING, field: 'nome' },
            nomeFantasia: { type: DataTypes.STRING, field: 'fantasia' },
            cnpj: { type: DataTypes.STRING, field: 'cpf_cgc' },
            inscricaoEstadual: { type: DataTypes.STRING, field: 'rg_ie' },
            email: { type: DataTypes.STRING, field: 'email' },
            usuario: { type: DataTypes.STRING, field: 'vendedor' },
            senha: { type: DataTypes.STRING, field: 'senhacotacao' },
        }, {
            sequelize,
            modelName: 'Fornecedor',
            tableName: 'fornecedor',
            timestamps: false,
        })
    }
    static associate(models) {
        this.belongsToMany(models.Vendedor, { as: 'vendedores', through: 'FornecedorVendedor' });
    }
}
module.exports = Fornecedor;