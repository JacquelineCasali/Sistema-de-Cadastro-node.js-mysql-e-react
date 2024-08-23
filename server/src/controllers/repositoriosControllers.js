const { Op} = require("sequelize");
const db = require("../db/models");

const repositoriosControllers = {
      async listar(req, res)  {
        //try if do erro
        try{
          const q=req.query.nome
       
          let nome = "";
          if (q) {
            nome = q;
          }
    const users=await db.Repositorios.findAll({
      order: [["nome", "ASC"]],

  //association:'users',
          //o que aparece na listagem
          // attributes:['id','name','url'],

           where: {
             nome: {
               [Op.like]: `%${nome}%`
             },
           },
      });

    return res.json({users

    })
        }catch(err){
          console.error(err);
    return res.status(500).json({error:"Erro do Servidor Interno"})

        }
      },

  //criar listar imagem
  async index(req, res) {
    //try if do erro
    try {
      const { userId } = req.params;
     
      const t= req.query.nome
      let nome="";
      if(t) {
        nome = t; 
      }

      //verificnado se o usuario existe
      const user = await db.Users.findByPk(userId, {
        include: [
          {
            association: "repositorio",
            where: {
              nome: {
                [Op.like]: `%${nome}%`,
              },
             
            },
      
            attributes: ["id", "nome", "emails","telefones"],
            through: {
              attributes: ["userId", "repositorioId"],
            },
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "Repositório não encontrado" });
      }

     
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
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
      const [repositorio] = await db.Repositorios.findOrCreate({
        //procura produto onde esta tentando criar
        where: { nome, emails,telefones },
      });
      await user.addRepositorio(repositorio);
      return res.json(repositorio);
    } catch (err) {
      return res.status(400).json({ message: `Erro ao cadastra a url` });
    }
  },

  async ler(req, res) {
    const { id } = req.params;
    try {
      const estudante = await db.Repositorios.findOne({ where: { id } });
      if (!estudante) {
        return res.status(400).json({
          message: "Repositorio não encontrado",
        });
      }

      const repositorio = await db.Repositorios.findOne({ where: { id } });

      return res.status(200).json(repositorio);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, emails,telefones, userId } = req.body;
      //imagem atual no banco de dados
      const estudante = await db.Repositorios.findOne({ where: { id } });
      if (!estudante) {
        return res.status(400).json({
          message: "Repositorio não encontrado",
        });
      } else {
        await db.Repositorios.update({ nome, emails,telefones, userId }, { where: { id } });
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
      const repositorio = await db.Repositorios.findOne({
        //procura produto onde esta tentando criar
        where: { id },
      });
      if (!repositorio) {
        return res.status(400).json({
          message: "Contato não encontrado",
        });
      } else {
        await user.removeRepositorio(repositorio);
        await res.status(200).json({
          message: "Deletado com suceso!",
        });
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};
module.exports = repositoriosControllers;
