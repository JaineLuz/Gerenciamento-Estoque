import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SuperUsuarioModel {
  async find() {
    try {
      const usuarios = await prisma.superUsuario.findMany();
      console.log('Usuários encontrados no banco:', usuarios);
      return usuarios;
    } catch (error) {
      console.error('Erro ao buscar usuarios: ', error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const usuario = await prisma.superUsuario.findUnique({
        where: {
          id: id
        }
      })
      return usuario;
    } catch (error) {
      console.error(`Erro ao buscar usuario com ID ${id}:`, error);
      throw error;
    }
  }

  async findByUsername(email) {
    const usuario = prisma.superUsuario.findUnique({
      where: {
        email: email
      }
    })
    return usuario;
  }

  async create(superusuario) {
    console.log(superusuario);
    try {
      const usuario_criado = await prisma.superUsuario.create({
        data: {
          nome: superusuario.nome,
          email: superusuario.email,
          senha: superusuario.senha
        }
      });
      return usuario_criado
    } catch (error) {
      console.error('Erro ao criar usuario:', error);
      throw error;
    }
  }

  async update(superusuario) {
    try {
      const usuario_atualizado = await prisma.superUsuario.update({
        where: {
          id: superusuario.id
        },
        data: {
          nome: superusuario.nome,
          email: superusuario.email,
          senha: superusuario.senha
        }
      })

      return usuario_atualizado
    } catch (error) {
      console.error('Erro ao atualizar usuario:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const usuario_deletado = await prisma.superUsuario.delete({
        where: {
          id: id
        }
      })

    } catch (error) {
      console.error(`Erro ao deletar usuario com ID ${id}:`, error);
      throw error;
    }
  }
}

export default new SuperUsuarioModel();
