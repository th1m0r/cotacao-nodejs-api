const express = require('express');
const authMiddleware = require('./middlewares/auth');
const LoginController = require('./controllers/LoginController');
const CotacaoController = require('./controllers/CotacaoController');

const routes = express.Router();
routes.post('/login', LoginController.login);
routes.post('/validar', LoginController.validarToken);

routes.use(authMiddleware);

routes.get('/cotacoes', CotacaoController.listar);
routes.post('/cotacoes/:id/resposta', CotacaoController.resposta)
routes.get('/cotacoes/:id', CotacaoController.pesquisar);
routes.get('/cotacoes/:id/itens/fornecedor/:id_fornecedor', CotacaoController.carregarItens);

module.exports = routes;