const cotacaoService = require('../services/cotacao.service');

listar = (req, res, next) => {
    cotacaoService.listar()
        .then(cotacoes => (cotacoes ? res.json(cotacoes)
            : res.status(404).json({ mensagem: "Não existem cotações em aberto!" })))
        .catch(next);
}

pesquisar = ({ params: { id } }, res, next) => {
    cotacaoService.pesquisar(id)
        .then(cotacao => (cotacao ? res.json(cotacao)
            : res.status(404).json({ mensagem: "Cotação não encontrada!" })))
        .catch(next);
}

carregarItens = ({ params: { id, id_fornecedor } }, res, next) => {
    cotacaoService.carregarItens(id, id_fornecedor)
        .then(itens => (itens ? res.json(itens)
            : res.status(404).json({ mensagem: "Cotação não encontrada!" })))
        .catch(next);
}

resposta = (req, res, next) => {
    cotacaoService.salvarResposta(req.body)
        .then(retorno => (retorno ? res.status(201).json({ mensagem: "Cotação salva com sucesso!" })
            : res.status(400).json({ menssagem: "Erro ao salvar resposta!" })))
        .catch(next)
}

module.exports = {
    listar,
    pesquisar,
    carregarItens,
    resposta
}
