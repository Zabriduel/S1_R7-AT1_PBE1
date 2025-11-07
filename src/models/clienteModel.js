const { pool } = require('../config/db');

const clienteModel = {
    selecionarClientes:async () => {
        const sql = 'SELECT * FROM clientes;';
        const [rows] = await pool.query(sql);
        return rows;
    },
     selecionarById:async (pId) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente=?;';
        const values = [pId]
        const [rows] = await pool.query(sql,values);
        return rows;
    },
    selecionarByCpf:async (cpf) => {
        const sql = 'SELECT * FROM clientes WHERE cpf_cliente=?;';
        const values = [cpf]
        const [rows] = await pool.query(sql,values);
        return rows;
    },
    insert: async (pNomeCliente,pCpfCliente) => {
        const sql = 'INSERT INTO clientes (nome_cliente,cpf_cliente) VALUES (?,?);';
        const values =[pNomeCliente,pCpfCliente];
        const [rows] = await pool.query(sql,values);
        return rows;
    },
    update: async (pId, pNomeCliente, pCpfCliente) => {
        const sql = 'UPDATE clientes SET nome_cliente=?, cpf_cliente =? WHERE id_cliente =?;';
        const values = [pNomeCliente,pCpfCliente,pId];
        const [rows] = await pool.query(sql,values);
        return rows;
    },
    delete: async (pId) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente =?;'
        const values = [pId];
        const [rows] = await pool.query(sql,values);
        return rows;
        
    }
}

module.exports = {clienteModel}