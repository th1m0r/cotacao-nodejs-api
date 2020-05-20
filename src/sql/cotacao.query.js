const SQL_COTACAO_ITENS = "SELECT"
    + " i.idcotacao_itens as id,"
    + " unidade,"
    + " embalagem,"
    + " quantidade,"
    + " i.idcotacao as 'cotacao.id',"
    + " i.idproduto as 'produto.id',"
    + " p.ean as 'produto.ean',"
    + " p.descricao as 'produto.descricao',"
    + " r.idcotacao_resultado as 'resultado.id',"
    + " i.idcotacao as 'resultado.idcotacao',"
    + " i.idproduto as 'resultado.idproduto',"
    + " r.idfornecedor as 'resultado.idfornecedor',"
    + " ifnull(r.idvendedor,0) as 'resultado.idvendedor',"
    + " format(ifnull(r.precoCotado,0.00),2) as 'resultado.precoCotado',"
    + " ifnull(r.prazo_pagto,0) as 'resultado.prazoPagamento',"
    + " ifnull(r.prazo_entrega,0) as 'resultado.prazoEntrega',"
    + " ifnull(v.idtb_vendedor,0) as 'resultado.vendedor.id',"
    + " v.nome as 'resultado.vendedor.nome'"
    + " FROM cotacao_itens i"
    + " inner join produto p on i.idproduto=p.idproduto"
    + " left outer join cotacao_resultado r on i.idcotacao=r.idcotacao and i.idproduto=r.idproduto and idfornecedor=:id_fornecedor"
    + " left join tb_vendedor v on v.idtb_vendedor = r.idvendedor"
    + " where i.idcotacao=:id_cotacao;"


module.exports = {
    SQL_COTACAO_ITENS,
}