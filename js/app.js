import express from 'express';
import cors from 'cors';
import router from './router.js';
import session from 'express-session';

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

app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null; // Disponibiliza o usuário em todas as views
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});