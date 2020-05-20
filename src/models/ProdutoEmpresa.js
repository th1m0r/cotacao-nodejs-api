const { Model, DataTypes } = require('sequelize');

class ProdutoEmpresa extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                field: 'idproduto_preco'
            },
            precoCompra: { type: DataTypes.DECIMAL, field: 'custozero' },
            precoCusto: { type: DataTypes.DECIMAL, field: 'custo' },
            precoMargemZero: { type: DataTypes.DECIMAL, field: 'pmz' },
            margemLucro: { type: DataTypes.DECIMAL(5, 2), field: 'margem' },
            margemPraticada: { type: DataTypes.DECIMAL(5, 2), field: 'margem_praticada' },
            precoVenda: { type: DataTypes.DECIMAL, field: 'venda1' },
            precoPromocao: { type: DataTypes.DECIMAL, field: 'prpromocao' },
            dataInicioPromocao: { type: DataTypes.DATEONLY, field: 'dtiniciopromo' },
            dataFinalPromocao: { type: DataTypes.DATEONLY, field: 'dtfinalpromo' },
            dataUltimoReajuste: { type: DataTypes.DATEONLY, field: 'data_ult_reajuste' },
            dataUltimaVenda: { type: DataTypes.DATEONLY, field: 'data_ult_venda' },
            dataReajusteEtiqueta: { type: DataTypes.DATEONLY, field: 'data_reajuste_etq' },
            statusEtiqueta: { type: DataTypes.CHAR, field: 'situacaoetq' },
            precoPendente: { type: DataTypes.CHAR, field: 'pendente' },

        }, {
            sequelize,
            modelName: 'ProdutoEmpresa',
            tableName: 'produto_preco',
            timestamps: false,
        })
    }

    static associate(models) {
        this.belongsTo(models.Produto, { foreignKey: 'idproduto', as: 'produto' });
        this.belongsTo(models.Empresa, { foreignKey: 'id_loja', as: 'empresa' });
        this.belongsTo(models.Familia, { foreignKey: 'idfamilia', as: 'familia' })
    }
}

module.exports = ProdutoEmpresa;