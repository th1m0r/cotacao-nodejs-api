const { Model, DataTypes } = require('sequelize');

class Vendedor extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                field: 'idtb_vendedor'
            },
            nome: { type: DataTypes.STRING, field: 'nome' },
            cpf: { type: DataTypes.STRING, field: 'cpf' },
            telefone: { type: DataTypes.STRING, field: 'telefone' },
            celular: { type: DataTypes.STRING, field: 'celular' },
            email: { type: DataTypes.STRING, field: 'email' },
            usuario: { type: DataTypes.STRING, field: 'login' },
            senha: { type: DataTypes.STRING, field: 'senha' },
        }, {
            sequelize,
            modelName: 'Vendedor',
            tableName: 'tb_vendedor',
            timestamps: false,
        })
    }
    static associate(models) {
        this.belongsToMany(models.Fornecedor, { as: 'fornecedores', through: 'FornecedorVendedor' });
    }
}
module.exports = Vendedor;