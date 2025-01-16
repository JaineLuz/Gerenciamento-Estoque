import express from 'express';
import cors from 'cors';
import router from './router.js';
import ProdutoModel from '../models/ProdutoModel.js';
import session from 'express-session';
import { auth } from "./auth.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static('public'));

app.use(session({
  secret: 'chave-secreta',
  resave: false,
  saveUninitialized: false, // Não salva sessões vazias
  cookie: {
    maxAge: 1000 * 60 * 30, // Expira em 30 minutos
    secure: false, // Altere para 'true' em produção com HTTPS
    httpOnly: true
  }
}));

/*app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Buscar na tabela superUsuarios
    const superUsuarios = await prisma.superUsuarios.findMany();

    // Procurar o usuário com o email e senha fornecidos
    const usuario = superUsuarios.find(user => user.email === email && user.senha === senha);

    if (usuario) {
      res.status(200).json({ superUsuarios });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar superUsuarios:', error);
    res.status(500).json({ message: 'Erro ao buscar superUsuarios. Tente novamente mais tarde.' });
  }
});
*/

app.get("/", (req, res) => {
  res.sendFile("public/js/views/login.html", { root: process.cwd() });
});

app.get("/estoque", auth, (req, res) => {
  res.sendFile("public/js/views/estoque.html", { root: process.cwd() });
});

app.get("/vendas", (req, res) => {
  res.sendFile("public/js/views/vendas.html", { root: process.cwd() });
})
app.put('/produtos/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Certifique-se de converter para número
  const { nome, descricao, quantidade, valorUnitario, categoria } = req.body;

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

// Exemplo de endpoint DELETE
app.delete('/produtos/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await ProdutoModel.delete(id);
    res.status(204).send(); // Retorna sucesso sem conteúdo
  } catch (error) {
    console.error("Erro ao excluir produto:", error.message);
    res.status(500).json({ message: "Erro ao excluir produto", error: error.message });
  }
});



app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null; // Disponibiliza o usuário em todas as views
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});