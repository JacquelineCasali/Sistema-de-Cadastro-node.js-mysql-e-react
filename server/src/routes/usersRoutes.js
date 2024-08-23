const express = require("express");
const loginController = require("../controllers/loginController");
const router = express.Router();
const usersControllers= require("../controllers/usersControllers")
const repositoriosControllers=require("../controllers/repositoriosControllers")
const auth=require('../middlewares/auth')
// rota desportegido

router.post('/login',loginController.login)




router.post('/user',usersControllers.criar)
//router.post('/user/:userId/repositorio',repositoriosControllers.criar)

router.get('/user',usersControllers.listar)

router.post('/user/:userId/repositorio',repositoriosControllers.criar)
router.get("/user/:userId/repositorio/:id", repositoriosControllers.ler);

 //controler privado 
// daqui para baixo sistema de autenticação
 //proteção torna as rotas privadas apartir daqui
 //router.use(auth);



//criando o repositorio para o usuario id

 router.put('/user/:id',usersControllers.update)
 router.delete("/user/:id",usersControllers.delete);
 
 //criando o repositorio para o usuario id
 router.get("/user/:userId/repositorio/",repositoriosControllers.index)
 router.get("/user/:userId/repositorio/:id", repositoriosControllers.ler);
  router.put('/user/:userId/repositorio/:id',repositoriosControllers.update)
  router.delete("/user/:userId/repositorio/:id",repositoriosControllers.delete);


module.exports = router;