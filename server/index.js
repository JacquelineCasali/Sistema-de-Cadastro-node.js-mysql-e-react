
const express = require('express');
const port=process.env.PORT ||  3002;
const cors = require("cors");
const cookieParser = require('cookie-parser')
const path=require('path')
const morgan = require("morgan");

const app = express();

const usersRoutes=require('./src/routes/usersRoutes')
app.use(cookieParser())

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//resposta no console sobre a aplicação
app.use(morgan("dev"));
//acessando a imagem 
app.use(express.static(path.join(__dirname,"public")));



app.use("/",usersRoutes)



app.listen(port, () => {
  console.log("Estamos rodando em: http://localhost:" + port );
});
