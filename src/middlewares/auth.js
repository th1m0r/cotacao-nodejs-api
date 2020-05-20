const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: 'Nenhum token fornecido.' })
    }
    const parts = authorization.split(' ');
    if (!parts.length === 2) {
        return res.status(401).json({ message: 'Formato padrão do token inválido' })
    }
    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).json({ message: 'Formato do token inválido' })
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' })
        }
        req.usuarioId = decoded.id;
        return next();
    })
}