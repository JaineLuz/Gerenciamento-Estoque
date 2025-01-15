import { Router } from "express";
import ProdutoController from '../controllers/ProdutoController.js';
import VendasController from '../controllers/VendasController.js';
import SuperUsuarioController from '../controllers/SuperUsuarioController.js';
import AutenticacaoController from '../controllers/AutenticacaoController.js';
import { auth } from "./auth.js";
import path from "path";

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/js/views/login.html'), { root: '' });
})

router.get('/cadastrar', (req, res) => {
    res.sendFile(path.resolve('public/js/views/cadastrar.html'), { root: '' });
})

router.get('/estoque', auth, (req, res) => {
    res.sendFile(path.resolve('public/js/views/estoque.html'), { root: '' });
})

router.get('/vendas', (req, res) => {
    res.sendFile(path.resolve('public/js/views/vendas.html'), { root: '' });
})

// Rota para listar todos os produtos
router.get('/produtos', ProdutoController.index);

// Rota para listar um produto específico por ID
router.get('/produtos/', ProdutoController.show);

// Rota para criar um novo produto
router.post('/produtos', ProdutoController.store);

// Rota para atualizar um produto existente
//router.put('/produtos/:id', ProdutoController.update); // Certifique-se de que o método update está exportado corretamente

router.put('/produtos/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Certifique-se de que o ID está sendo extraído como número
    const { nome, descricao, quantidade, valorUnitario, categoria } = req.body;

    if (!id) {
        return res.status(400).json({ message: "ID do produto é obrigatório." });
    }

    try {
        const produtoAtualizado = await ProdutoModel.update({
            id,
            nome,
            descricao,
            quantidade,
            valorUnitario,
            categoria,
        });
        res.status(200).json(produtoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar produto:", error.message);
        res.status(500).json({ message: "Erro ao atualizar produto", error: error.message });
    }
});


// Rota para excluir um produto
router.delete('/produtos/:id', ProdutoController.destroy);

// Rota para listar todas as vendas
router.get('/vendas', VendasController.index);

// Rota para criar uma nova venda
router.post('/vendas', VendasController.store);

router.put('/vendas/:id', async (req, res) => {
    const id = parseInt(req.params.id); // Certifique-se de que o ID está sendo extraído como número
    const { produto, quantidade, valorUnitario, custoUnitario, dataVenda } = req.body;

    if (!id) {
        return res.status(400).json({ message: "ID da venda é obrigatório." });
    }

    try {
        const vendaAtualizada = await VendasModel.update({
            id,
            produto,
            quantidade,
            valorUnitario,
            custoUnitario,
            dataVenda: new Date(dataVenda), // Converta a data para o formato Date
        });
        res.status(200).json(vendaAtualizada);
    } catch (error) {
        console.error("Erro ao atualizar venda:", error.message);
        res.status(500).json({ message: "Erro ao atualizar venda", error: error.message });
    }
});


// Rota para excluir uma venda
router.delete('/vendas/:id', VendasController.destroy);

// Rota para listar todos os superusuários
router.get('/superusuarios', SuperUsuarioController.index);

// Rota para listar um superusuário específico por ID
router.get('/superusuarios/', SuperUsuarioController.show);

// Rota para criar um novo superusuário
router.post('/superusuarios', SuperUsuarioController.store);

// Rota para atualizar um superusuário existente
router.put('/superusuarios/:id', SuperUsuarioController.update); // Certifique-se de que o método update está exportado corretamente

// Rota para excluir um superusuário
router.delete('/superusuarios/:id', SuperUsuarioController.destroy);

router.get('/login', AutenticacaoController.index);

router.post('/login', AutenticacaoController.login);


//router.get('/estoque', auth, AutenticacaoController.home);

router.get('/erro', AutenticacaoController.erro);


export default router;
