const { pool } = require('../config/db');

const produtoModel = {
    /**
     * Retorna todos os produtos cadastrados na tabela produtos
     * @async
     * @function selectALL
     * @returns {Promise<Array<Object>>} Retorna um array de objetos, cada objeto representa um produto
     * @example 
     * const produtos = await produtoModel.selectALL();
     * console.log(produtos)
     * // Saída esperada
     * [
     *      {coluna1: "Valor coluna1", coluna2: "Valor coluna 2", ...},
     *      {coluna1: "Valor coluna1", coluna2: "Valor coluna 2", ...},
     * ]
     */
    selectALL: async () => {
        const sql = 'SELECT * FROM produtos';
        const [rows] = await pool.query(sql);
        return rows;
    },
    
    selectById: async(pId)=>{
        const sql = 'SELECT * FROM produtos WHERE id_produto =?';
        const values = [pId]
        const [rows] = await pool.query(sql, values);
        return rows;

    },
    /**
     *Insere um produto na base de daos 
     * @param {string} pNomeProd Descrição do nome do produto que deve ser inserido no bancdo de dados. Ex.:'Teclado'
     * @param {number} pValorProd Valor do produto que deve ser inserido no banco de dados. Ex.: 126.25
     * @returns {Promise<Object>} Retorna um objeto contendo propriedades sobre o resultado da execução da query.
     * @example
     * const result = await produtoModel,insert(paramA,paramB)
     * 
     * // Saida
     *  "result":{
     *      "fieldCount" : 0,
     *      "affectedRows": 1,
     *      "insertId": 1,
     *      "info": "",
     *      "serverStatus": 2,
     *      "warningStatus": 0,
     *      "changedRows": 0 
     * }
     */
    insert: async (pNomeProd, pValorProd) => {
        const sql = 'INSERT INTO produtos (nome_produto,valor_produto) VALUES (?, ?);';
        const values = [pNomeProd, pValorProd];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * 
     * @param {number} pId Recebe o valor único de cadastro do item para ser atualizado
     * @param {string} pDescricao Recebe o novo nome produto 
     * @param {number} pValor Recebe o novo valor do produto 
     * @returns {Promise<Object>} Retorna um objeto contendo propriedades sobre o resultado da execução da query
     */
    update: async (pId, pDescricao, pValor) => {
        const sql = "UPDATE produtos SET nome_produto=?, valor_produto=? WHERE id_produto=?;";
        const values = [pDescricao, pValor, pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    delete: async(pId)=>{
        const sql = "DELETE FROM produtos WHERE id_produto=?;";
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
}

module.exports = { produtoModel };