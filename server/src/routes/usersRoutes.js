const express = require("express");
const usersControllers = require("../controllers/usersControllers");
const contatoControllers = require("../controllers/contatoControllers");
const loginController = require("../controllers/loginController");
const router = express.Router();


const auth=require('../middlewares/auth')
// rota desportegido

router.post('/login',loginController.login)
router.post('/senha',loginController.senha)
router.post('/user',usersControllers.criar)
//router.post('/user/:userId/repositorio',repositoriosControllers.criar)
router.patch('/user/:id',usersControllers.update);
router.get('/user',usersControllers.listar)
// router.get('/repo',repositoriosControllers.listar)

//  router.put('/user/:id',usersControllers.update)
//  router.delete("/user/:id",usersControllers.delete);

router.get("/user/:id", usersControllers.ler);



 //controler privado 
// daqui para baixo sistema de autenticação
 //proteção torna as rotas privadas apartir daqui
router.use(auth);
router.get("/user/:id", usersControllers.ler);
// router.patch('/user/:id',usersControllers.update);
router.delete("/user/:id",usersControllers.delete);
router.get("/user/:userId/contato",contatoControllers.listar)

router.get("/user/:userId/contato/:id", contatoControllers.ler);

//criando o repositorio para o usuario id
router.post('/user/:userId/contato',contatoControllers.criar);


 router.put('/user/:userId/contato/:id',contatoControllers.update)
 router.delete("/user/:userId/contato/:id",contatoControllers.delete);


module.exports = router;