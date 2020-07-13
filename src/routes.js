const express = require('express');
const authMiddleware = require('./middlewares/auth');
const LoginController = require('./controllers/LoginController');
const CotacaoController = require('./controllers/CotacaoController');

const routes = express.Router();
routes.post('/login', LoginController.login);
routes.post('/validar', LoginController.validarToken);

routes.use(authMiddleware);

routes.get('/cotacoes', CotacaoController.listar);
routes.get('/cotacoes/itens', CotacaoController.carregarItensLojas);
routes.post('/cotacoes/resposta', CotacaoController.resposta);
routes.get('/cotacoes/:id/itens', CotacaoController.carregarItens);
routes.get('/cotacoes/:id/resposta', CotacaoController.carregarResposta);
routes.get('/cotacoes/:id', CotacaoController.pesquisar);

module.exports = routes;