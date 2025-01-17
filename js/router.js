import { Router } from "express";
import ProdutoController from '../controllers/ProdutoController.js';
import SuperUsuarioController from '../controllers/SuperUsuarioController.js';
import AutenticacaoController from '../controllers/AutenticacaoController.js';
import { auth } from "./auth.js";
import path from "path";

const router = Router();

//Rotas para as Páginas
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

// Rota para os produtos
router.get('/produtos', ProdutoController.index);

router.get('/produtos/', ProdutoController.show);

router.post('/produtos', ProdutoController.store);

router.put('/produtos/:id', ProdutoController.update);

router.delete('/produtos/:id', ProdutoController.destroy);

// Rota para os superusuários
router.get('/superusuarios', SuperUsuarioController.index);

router.get('/superusuarios/', SuperUsuarioController.show);

router.post('/superusuarios', SuperUsuarioController.store);

router.put('/superusuarios/:id', SuperUsuarioController.update); // Certifique-se de que o método update está exportado corretamente

router.delete('/superusuarios/:id', SuperUsuarioController.destroy);

// Rota para autenticação
router.get('/login', AutenticacaoController.index);

router.post('/login', AutenticacaoController.login);

router.get('/estoque', auth, AutenticacaoController.home);

router.get('/erro', AutenticacaoController.erro);

export default router;
