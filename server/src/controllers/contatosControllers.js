
const db = require("../db/models");

const contatosControllers = {
  //     async listar(req, res)  {
  //       //try if do erro
  //       try{
  //         const q=req.query.name
  //         console.log(req.query.name);
  //         let name = "";
  //         if (q) {
  //           name = q;
  //         }
  //   const contatos=await db.Contatos.findAll({
  //     order: [["name", "ASC"]],

  // //association:'users',
  //         //o que aparece na listagem
  //         // attributes:['id','name','url'],

  //          where: {
  //            name: {
  //              [Op.like]: `%${name}%`
  //            },
  //          },
  //     });

  //   return res.json({contatos

  //   })
  //       }catch(err){
  //         console.error(err);
  //   return res.status(500).json({error:"Erro do Servidor Interno"})

  //       }
  //     },

  //criar listar imagem
  async listar(req, res) {
    //try if do erro
    try {
      const { clienteId } = req.params;
     //verificnado se o usuario existe
      const user = await db.Clientes.findByPk(clienteId, {
        
     
        include: [
          
          {


            association: "contato",
            
            
            // attributes: ["id", "name", "email ","telefone"],
            through: {
              attributes: ["clienteId", "contatoId"],
            },
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "Cliente não encontrado" });
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
      const { clienteId } = req.params;
      const { name, email,telefone } = req.body;
      const contatos = await db.Clientes.findByPk(clienteId);
      if (!contatos) {
        return res.status(422).json({ message: `Cliente não encontrada` });
      }


      const [contato] = await db.Contatos.findOrCreate({
       
        where: { name, email,telefone  },
      });
      await contatos.addContato(contato);
      return res.json(contato);
    } catch (err) {
      return res.status(400).send({err: err.message });
      
     
    }
  },

  async ler(req, res) {
    const { id } = req.params;
    try {
      const contatos = await db.Contatos.findOne({ where: { id } });
      if (!contatos) {
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
      const {name, email,telefone,clienteId} = req.body;
      //imagem atual no banco de dados
      const estudante = await db.Contatos.findOne({ where: { id } });
      if (!estudante) {
        return res.status(400).json({
          message: "Contato não encontrado",
        });
      } else {
        await db.Contatos.update({ name, email,telefone,clienteId }, { where: { id } });
        // // apaga o arquivo

        return res.status(200).json({
          message: "Contato atualizado com suceso!",
          name, email,telefone
       
        });
        
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
      const { clienteId, id } = req.params;

      const user = await db.Clientes.findByPk(clienteId);
      if (!user) {
        return res.status(422).json({ message: `Cliente não encontrado` });
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
module.exports = contatosControllers;
