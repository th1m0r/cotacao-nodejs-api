const { Model, DataTypes } = require('sequelize');
const Fornecedor = require('./Fornecedor')
const Vendedor = require('./Vendedor')

class FornecedorVendedor extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                field: 'idtb_vendedor_fornecedor'
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
                    key: 'id',
                }
            }
        },
            {
                sequelize,
                modelName: 'FornecedorVendedor',
                tableName: 'tb_vendedor_fornecedor',
                timestamps: false,
            })
    }
}
module.exports = FornecedorVendedor;