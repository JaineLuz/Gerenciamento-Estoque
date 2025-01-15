import SuperUsuario from '../models/SuperUsuarioModel.js';

class SuperUsuarioController {
  // Método para listar todos os usuários
  async index(req, res) {
    try {
      const usuarios = await SuperUsuario.find(); // Buscar todos os usuários
      res.json(usuarios); // Enviar resposta com os usuários em formato JSON
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar usuários', error: error.message });
    }
  }

  // Método para criar um novo usuário
  async store(req, res) {
    try {
      const nome = req.body.nome;
      console.log(nome);
      const email = req.body.email;
      console.log(email);
      const senha = req.body.senha; // Captura os dados do corpo da requisição
      console.log(senha);

      const usuario = await SuperUsuario.create({ // Criação de um novo usuario
        nome,
        email,
        senha,
      });
      res.status(201).json(usuario);
      console.log(usuario); // Retorna o usuario criado
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuario', error: error.message });
    }
  }

  // Método para exibir um usuario específico
  async show(req, res) {
    const id = req.params.id; // Captura o ID do usuario da URL
    try {
      const usuario = await SuperUsuario.findByPk(id); // Buscar usuario pelo ID
      if (!usuario) {
        return res.status(404).json({ message: 'usuario não encontrado' });
      }
      res.json(usuario); // Retorna o usuario encontrado
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuario', error: error.message });
    }
  }

  // Método para atualizar um usuario
  async update(req, res) {
    const id = req.params.id; // Captura o ID do usuario da URL
    const { nome, email, senha } = req.body; // Captura os dados atualizados

    try {
      const usuario = await SuperUsuario.findByPk(id); // Buscar o usuario pelo ID
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario não encontrado' });
      }

      usuario.nome = nome || usuario.nome;
      usuario.email = email || usuario.email;
      usuario.senha = senha || usuario.senha;

      await usuario.save(); // Salvar as alterações no banco de dados
      res.json(usuario); // Retorna o usuario atualizado  
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar usuario', error: error.message });
    }
  }

  // Método para excluir um usuario
  async destroy(req, res) {
    const id = req.params.id; // Captura o ID do usuario da URL
    try {
      const usuario = await SuperUsuario.findByPk(id); // Buscar o usuario pelo ID
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario não encontrado' });
      }

      await usuario.destroy(); // Excluir o usuario do banco de dados
      res.status(204).send(); // Retorna uma resposta de sucesso sem conteúdo
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir usuario', error: error.message });
    }
  }
}

export default new SuperUsuarioController();
