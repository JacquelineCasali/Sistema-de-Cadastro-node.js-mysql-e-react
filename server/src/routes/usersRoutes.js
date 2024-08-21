const express = require("express");
const clientesControllers = require("../controllers/clientesControllers");
const contatosControllers = require("../controllers/contatosControllers");
const loginController = require("../controllers/loginController");
const router = express.Router();


const auth=require('../middlewares/auth')
// rota desportegido

router.post('/login',loginController.login)

router.post('/cliente',clientesControllers.criar)

router.get('/cliente',clientesControllers.listar)
router.get('/repo',contatosControllers.listar)




 //controler privado 
// daqui para baixo sistema de autenticação
 //proteção torna as rotas privadas apartir daqui
// router.use(auth);

router.post('/logout',loginController.logout);
router.get("/cliente/:id", clientesControllers.ler);
router.put('/cliente/:id',clientesControllers.update)
router.delete("/cliente/:id",clientesControllers.delete);

//criando o repositorio para o usuario id
router.get("/cliente/:clienteId/contato",contatosControllers.listar)
router.get("/cliente/:clienteId/contato/:id", contatosControllers.ler);


router.post('/cliente/:clienteId/contato',contatosControllers.criar)

router.put('/cliente/:clienteId/contato/:id',contatosControllers.update)
 router.delete("/cliente/:clienteId/contato/:id",contatosControllers.delete);


module.exports = router;