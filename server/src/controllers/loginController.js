const db = require("../db/models");
const bcrypt = require("../services/auth");
const jwt= require('jsonwebtoken')


const loginController = {

  

  //cadastrar
  async login(req, res) {
    const { email, password } = req.body;
    const users = await db.Clientes.findOne({ where: { email } });

    if (!users) {
      return res.status(422).json({message: `Email ${email} não encontrado` });
    }
    const userSenha = bcrypt.compareHash(password, users.password);

   if (!userSenha) {
      return res.status(401).json({message: `Email ou senha não confere ` });
    }
    //resgatando o id do usuario
    const{id}=users;
    //expiresIn:300 expira em 5 minutos
    //expiresIn:7d expira em 7 
  // const token= jwt.sign({id},authConfig.secret,{expiresIn:"300"})

  const token= jwt.sign({id},process.env.SECRET,{expiresIn:"300"})

  res.cookie('token',token)

     return res.json({
      auth:true,
      token,
      message:'Logado com sucesso'
     });

  },

  async logout(req, res) {

 

    res.json({auth:false, token:null,  message:'Deslogado  com sucesso'})
  }
};
module.exports = loginController;
