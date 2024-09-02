
const db = require("../db/models");


const contatoControllers = {
  
  //criar listar imagem
  async listar(req, res) {
    //try if do erro
    try {
      const { userId } = req.params;
      //verificnado se o usuario existe
      const user = await db.Users.findByPk(userId, {
        include: [
          {
            association: "contato",
             
            attributes: ["id", "nome", "emails","telefones"],
            through: {
              attributes: ["userId", "contatoId"],
            },
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "Nenhum contato Cadastrado , clique em cadastrar" });
      }

     
      return res.json(user);
    } catch (err) {
     
      console.error(err);
      return res.status(404).json({ message: "Nenhum contato Cadastrado , clique em cadastrar" });
    }
  },

  //cadastrar
  async criar(req, res) {
    // receber dados enviados no corpo
    try {
      const { userId } = req.params;
      const { nome, emails,telefones } = req.body;
      const user = await db.Users.findByPk(userId);
      if (!user) {
        return res.status(422).json({ message: `Usuario não encontrada` });
      }

      // cadastrar no banco de dados
      // tecnologia criada ou encontrada no metodo findOrCreate
      const [contato] = await db.Contatos.findOrCreate({
        //procura produto onde esta tentando criar
        where: { nome, emails,telefones },
      });
      await user.addContato(contato);
      return res.json(contato);
    } catch (err) {
      return res.status(400).json({ message: `Erro ao cadastra o contato` });
    }
  },

  async ler(req, res) {
    const { id } = req.params;
    try {
      const estudante = await db.Contatos.findOne({ where: { id } });
      if (!estudante) {
        return res.status(400).json({
          message: "Contato não encontrado",
        });
      }

      const contato = await db.Contatos.findOne({ where: { id } });

      return res.status(200).json(contato);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, emails,telefones, userId } = req.body;
      //imagem atual no banco de dados
      const estudante = await db.Contatos.findOne({ where: { id } });
      if (!estudante) {
        return res.status(400).json({
          message: "Repositorio não encontrado",
        });
      } else {
        await db.Contatos.update({ nome, emails,telefones, userId }, { where: { id } });
        // // apaga o arquivo

        return res.status(200).json({
          message: "Repositorio atualizado com suceso!",
        });
        //  return res.status(200).json(edite);
      }
    } catch (err) {
      // return res.status(400).send(err);
      return res
        .status(400)
        .send({ err: err, message: "Preencha os dados Corretamente" });
    }
  },

  async delete(req, res) {
    try {
      const { userId, id } = req.params;

      const user = await db.Users.findByPk(userId);
      if (!user) {
        return res.status(422).json({ message: `Cliente não encontrada` });
      }
      const contato = await db.Contatos.findOne({
        //procura produto onde esta tentando criar
        where: { id },
      });
      if (!contato) {
        return res.status(400).json({
          message: "Contato não encontrado",
        });
      } else {
        await user.removeContato(contato);
        await res.status(200).json({
          message: "Deletado com suceso!",
        });
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};
module.exports = contatoControllers;
