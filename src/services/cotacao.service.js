const Cotacao = require('../models/Cotacao');
const CotacaoItens = require('../models/CotacaoItens');
const CotacaoResultado = require('../models/CotacaoResultado');
const Produto = require('../models/Produto');
const Vendedor = require('../models/Vendedor');
const Model = require('sequelize/lib/model');

const { Op } = require('sequelize');

const { SQL_COTACAO_ITENS } = require('../sql/cotacao.query');

const listar = async () => {
    const cotacoes = await Cotacao.findAll({
        where: {
            dataInicial: { [Op.lte]: Date.now() },
            dataFinal: { [Op.gte]: Date.now() },
            situacao: 'A'
        },
        attributes: [
            'id',
            [Cotacao.sequelize.fn('date_format', Cotacao.sequelize.col('datainicio'), '%d/%m/%Y'), 'dataInicial'],
            [Cotacao.sequelize.fn('date_format', Cotacao.sequelize.col('datafinal'), '%d/%m/%Y'), 'dataFinal'],
            'descricao'
        ]

    });
    return cotacoes;
}

const pesquisar = async id => {
    const cotacao = await Cotacao.findByPk(id);
    return cotacao;
}

const carregarItens = async (id_cotacao, id_fornecedor) => {
    const includes = {
        include: [
            { model: Cotacao, as: 'cotacao' },
            { model: Produto, as: 'produto' },
            { model: CotacaoResultado, as: 'cotacaoResultado' }
        ]
    };
    Model._validateIncludedElements.call(CotacaoItens, includes);

    const itens = await CotacaoItens.sequelize.query(
        SQL_COTACAO_ITENS,
        {
            replacements: {
                id_cotacao,
                id_fornecedor
            },
            model: CotacaoItens,
            mapToModel: true,
            hasJoin: true,
            ...includes
        })
    return itens;
}

const salvarResposta = async (respostas) => {
    const retorno = await CotacaoResultado.bulkCreate(respostas, { updateOnDuplicate: ['idvendedor', 'precoCotado'] });
    return retorno;
}

module.exports = {
    listar,
    pesquisar,
    carregarItens,
    salvarResposta,
};