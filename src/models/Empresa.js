const { Model, DataTypes } = require('sequelize');

class Empresa extends Model {
    static init(sequelize) {
        super.init({
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, field: 'idempresa' },
            razaoSocial: { type: DataTypes.STRING, field: 'razaosocial' },
            nomeFantasia: { type: DataTypes.STRING, field: 'fantasia' },
            cnpj: { type: DataTypes.STRING, field: 'cgc_cpf' },
            inscricaoEstadual: { type: DataTypes.STRING, field: 'inscrg' }

        }, {
            sequelize,
            modelName: 'Empresa',
            tableName: 'empresa',
            timestamps: false,
        })
    }
    static associate(models) {
        this.hasMany(models.ProdutoEmpresa, { foreignKey: 'id_loja', as: 'produtos' });
    }
}
module.exports = Empresa;