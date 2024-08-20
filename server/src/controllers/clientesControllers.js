
const db = require("../db/models");
const bcrypt = require("../services/auth");

const clientesControllers = {
  //criar listar imagem
  async listar(req, res) {
    //try if do erro
    try {
      const clientes = await db.Clientes.findAll();
      return res.json({ clientes });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },
  //cadastrar
  async criar(req, res) {
    //verificando se o email já esta cadastrado
    try {
      const {name, email, password,telefone } = req.body;
      const cliente = await db.Clientes.findOne({ where: { email },where:{name} });
      if (cliente) {
        return res
          .status(422)
          .json({message: `Email ${email} ou nome ${name} já cadastrado`});
      }

      const numero = await db.Clientes.findOne({ where: {telefone} });
      if (numero) {
        return res
          .status(422)
          .json({message: `Telefone ${telefone} já cadastrado`});
      }

      //criptografar a senha bcrypt

      // cadastrar no banco de dados
      const newCliente = await db.Clientes.create({
        name,
        email,
        password: bcrypt.generateHash(password),
        telefone
      });

      // cadastrado com sucesso
      return res.status(200).json(newCliente);
    } catch (err) {
      return res.status(400).send({err: err.message });
    }
  },

  async ler(req, res) {
    try {
      const { id } = req.params;
      const clientes = await db.Clientes.findOne({ where: { id } });
      // caso nao encotre o usuario
      if (!clientes) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return res.status(200).json(clientes);
    } catch (err) {
      return res.status(400).send({ err: err });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password,telefone } = req.body;
      const clientes = await db.Clientes.findOne({ where: { id } });
      if (!clientes) {
        return res.status(404).json({
          message: "Cliente não encontrado",
        });
      } else {
   await db.Clientes.update(
          { name, email, telefone, password: bcrypt.generateHash(password) },
          { where: { id } }
        );
        return res.status(200).json({
          name, email, telefone,
          message: "Cliente atualizado com suceso!",
        });
      }
    } catch (err) {
      // return res.status(400).send(err);
      return res.status(500).json({ err: err.message, message: `Email ou nome já cadastrado` });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const rows = await db.Clientes.findOne({ where: { id } });
      if (!rows) {
        return res.status(400).json({
          message: "Cliente não encontrado",
        });
      } else {
        await db.Clientes.destroy({ where: { id } });

        return res.status(200).json({
          message: "Deletado com suceso!",
        });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
module.exports = clientesControllers;
