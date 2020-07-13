const Cotacao = require('../models/Cotacao');
const CotacaoItens = require('../models/CotacaoItens');
const CotacaoResultado = require('../models/CotacaoResultado');
const Produto = require('../models/Produto');
const Model = require('sequelize/lib/model');

const { Op } = require('sequelize');

const { SQL_COTACAO_ITENS, SQL_COTACAO_ITENS_LOJAS } = require('../sql/cotacao.query');

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

const carregarResposta = async (id, id_fornecedor) => {
    return CotacaoResultado.findAll({
        where: {
            idcotacao: id,
            idfornecedor: id_fornecedor
        }
    })
}

const carregarItens = async (id) => {
    return CotacaoItens.findAll({
        where: {
            idcotacao: id,
        }
    })
}

const carregarItensCotacao = async (id_cotacao, id_fornecedor) => {
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

const carregarItensLojas = async (id_fornecedor) => {
    const resultado = await CotacaoItens.sequelize.query(
        SQL_COTACAO_ITENS_LOJAS,
        {
            replacements: {
                id_fornecedor
            },
        })
    return resultado;
}

const salvarResposta = async (respostas) =>
    await CotacaoResultado.bulkCreate(respostas, { updateOnDuplicate: ['idvendedor', 'precoCotado'] });

module.exports = {
    listar,
    pesquisar,
    carregarItens,
    carregarItensCotacao,
    salvarResposta,
    carregarItensLojas,
    carregarResposta
};