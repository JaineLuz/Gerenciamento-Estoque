import SuperUsuarioModel from "../models/SuperUsuarioModel.js";


class AutenticacaoController {

    async index(req, res) {
        res.sendFile("/public/js/views/login.html", { root: process.cwd() });
    }

    async erro(req, res) {
        res.sendFile("erro.html", { root: process.cwd() });
    }

    async home(req, res) {
        res.sendFile("/public/js/views/estoque.html", { root: process.cwd() });

    }

    async login(req, res) {
        const username = req.body.email;
        const password = req.body.senha;

        console.log(username, password);
        const usuario = await SuperUsuarioModel.findByUsername(username);
        console.log(usuario, password);
        if (!usuario) {
            req.session.logado = false;
            return res.redirect("/erro");
        }
        if (password != usuario.senha) {
            req.session.logado = false;
            return res.redirect("/erro");
        }

        req.session.logado = true;
        res.redirect("/estoque");
    }
}

export default new AutenticacaoController();