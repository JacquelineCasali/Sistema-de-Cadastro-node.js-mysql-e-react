const db = require("../db/models");
const bcrypt = require("../middlewares/bcrypt");
const jwt= require('jsonwebtoken')

const loginController = {

  

  //cadastrar
  async login(req, res) {
   
   
    const { email, password } = req.body;
    const users = await db.Users.findOne({ where: { email } });

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
  const token= jwt.sign({id},
    
    process.env.APP_SECRET,{expiresIn:"1d"})

  res.cookie('token',token)

     return res.json({
      auth:true,
      // message: 'logado com sucesso',
      users:{
        id, email
       },
      token,
      message:'Logado com sucesso'
     }
      
     );
  
  },

  //cadastrar
  async senha(req, res) {
   
   
    const { email, password } = req.body;
    const users = await db.Users.findOne({ where: { email } });

    if (!users) {
      return res.status(422).json({message: `Email ${email} não encontrado` });
    }else{
      await db.Users.update(
        { password: bcrypt.generateHash(password) },
        { where: { email } }
      )
    }
    const{id}=users;
     return res.json({
       users:{
        id, email
       },
       message:'Atualizada com sucesso'
     }
      
     );
  
  },

};
module.exports = loginController;
