const loginService = require('../services/login.service');

login = (req, res, next) => {
    loginService
        .authenticate(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ message: "Dados do usuário inválido" , err}));
}

validarToken = (req, res) => {
    const token = req.body.token || '';
    const id = loginService.validarToken(token);
    res.status(200).json({ valido: !!id })
}

module.exports = {
    login,
    validarToken
}