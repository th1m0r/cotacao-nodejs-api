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

carregarItens = (req, res, next) => {
    const { id } = req.params;
    cotacaoService.carregarItens(id)
        .then(itens => res.json(itens))
        .catch(next);
}


carregarItensLojas = (req, res, next) => {
    const { id_fornecedor } = req.query;
    //cotacaoService.carregarItens(id, id_fornecedor)
    cotacaoService.carregarItensLojas(id_fornecedor)
        .then(([itens, metadata]) => (itens ? res.json(itens)
            : res.status(404).json({ mensagem: "Sem cotações em aberto" })))
        .catch(next);
}

carregarResposta = (req, res, next) => {
    const { id } = req.params;
    const { id_fornecedor } = req.query;
    cotacaoService.carregarResposta(id, id_fornecedor)
        .then(itens => res.json(itens))
        .catch(next);
}

resposta = (req, res, next) => {
    const respostas = req.body;
    if(!respostas) {
        return res.send(400).json({mensagem: "Nenhuma resposta enviada"})
    }
    cotacaoService.salvarResposta(respostas)
        .then(retorno => (retorno ? res.status(201).json({ mensagem: "Cotação salva com sucesso!" })
            : res.status(400).json({ menssagem: "Erro ao salvar resposta!" })))
        .catch(next)
}

module.exports = {
    listar,
    pesquisar,
    carregarItens,
    carregarItensLojas,
    resposta,
    carregarResposta
}
