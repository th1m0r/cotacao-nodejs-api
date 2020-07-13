const jwt = require('jsonwebtoken');
const Vendedor = require('../models/Vendedor');

const authenticate = async ({ username, password }) => {
    const vendedor = await Vendedor.findOne({
        attributes: ['id', 'nome', 'senha', 'email'],
        where: { login: username },
        include: [
            {
                association: 'fornecedores',
                attributes: ['id', 'razaoSocial', 'cnpj', 'email'],
            }
        ]
    })
    if (vendedor && (vendedor.senha === password)) {
        const token = await jwt.sign({ id: vendedor.id }, process.env.SECRET, { expiresIn: '15h', });
        user = {
            id: vendedor.id,
            nome: vendedor.nome,
            email: vendedor.email,
            fornecedor: vendedor.fornecedores[0]
        }
        return { token, user };
    }
    return Promise.reject(new Error('Dados de usuário inválidos'))
}

const validarToken = token => jwt.verify(token, process.env.SECRET, (err, decoded) => {
    return !err
});


module.exports = {
    authenticate,
    validarToken
};