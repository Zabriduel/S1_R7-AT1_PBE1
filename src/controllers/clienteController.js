
const { clienteModel } = require('../models/clienteModel');
const { produtoModel } = require('../models/produtoModel');

const clienteController = {
    consultaClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionarClientes();
            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A consulta não retornou resultados' });
            }
            return res.status(200).json({ data: resultado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
    ,
    incluiClientes: async (req, res) => {
        try {
            const { nome, cpf } = req.body;

            if (!nome || !cpf || !isNaN(nome) || isNaN(cpf) || cpf.toString().length < 11 || cpf.toString().length > 11) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente!' });
            }

            const selecionarCpf = await clienteModel.selecionarByCpf(cpf);
            if(selecionarCpf.length===1){
                return res.status(409).json({ message: 'Não foi possível realizar a operação, CPF já está cadastrado no sistema.' });
            }
            const resultado = await clienteModel.insert(nome, cpf);
          
            if (resultado.insertId === 0) {
                throw new Error('Ocorreu um erro ao incluir o Cliente');
            }

            res.status(201).json({ message: 'Registro incluido com sucesso', data: resultado });
        } catch (error) {
                res.status(500).json({ message: 'Ocorreu um errro no servidor', errorMessage: error.message });
            
        }
    },
    alteraCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            const { nome, cpf } = req.body;

            
            if (!idCliente || (!nome && !cpf) || (!isNaN(nome) || isNaN(cpf)) || typeof idCliente != 'number' || nome.length < 3 || cpf.toString().length < 11 || cpf.toString().length > 11) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente!' });
            }
            const selecionarCpf = await clienteModel.selecionarByCpf(cpf);
            if(selecionarCpf.length===1){
                return res.status(409).json({ message: 'Não foi possível realizar a operação, CPF já está cadastrado no sistema.' });
            }
            const clienteAtual = await clienteModel.selecionarById(idCliente);
            if (clienteAtual.length === 0) {
                return res.status(200).json({ message: 'Cliente não localizado' });
            }
            const novoNome = nome ?? clienteAtual[0].nome_cliente;
            const novoCpf = cpf ?? clienteAtual[0].cpf_cliente;

            const resultadoUpdate = await clienteModel.update(idCliente, novoNome, novoCpf);
            if (resultadoUpdate.affectedRows === 1 && resultadoUpdate.changedRows === 0) {
                return res.status(200).json({ message: 'Não há alterações a serem realizadas' });
            }
            if (resultadoUpdate.affectedRows === 1 && resultadoUpdate.changedRows === 1) {
                res.status(200).json({ message: 'Registro alterado com sucesso' });
            }

        } catch (error) {
            console.error(error);
                res.status(500).json({ message: 'Ocorreu um errro no servidor', errorMessage: error.message });
            
        }
    },
    deletaCliente: async (req, res) => {
        try {
            const idCliente = Number(req.params.idCliente);
            console.log(idCliente)
            if (!idCliente || !Number.isInteger(idCliente)) {
                return res.status(401).json({ message: 'Forneça um identificador válido' });
            }

            const clienteSelecionado = await clienteModel.selecionarById(idCliente);
            if (clienteSelecionado.length === 0) {
                return res.status(200).json({ message: 'Cliente não localizado na base de dados' });
            }

            const resultadoDelete = await clienteModel.delete(idCliente);
            if (resultadoDelete.affectedRows === 0) {
                return res.status(200).json({ message: 'Ocorreu um erro ao excluir o cliente' });
            }
            res.status(200).json({ message: 'Cliente excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um errro no servidor', errorMessage: error.message });
        }
    }
}

module.exports = { clienteController }