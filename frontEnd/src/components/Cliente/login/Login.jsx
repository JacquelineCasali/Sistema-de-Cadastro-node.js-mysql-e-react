import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import "./login.css";

import { api } from "../../../db/axios";


function Login() {

  // criar cadastro
  const [values, setValues] = useState({
    email: "",
    password:""

  });
 

  const navigate = useNavigate();
  // validação da senha
 
  const handleSubmit = async (e) => {
   
     e.preventDefault();

      axios
        .post(api+ "/login", values)
        .then((res) => {
          console.log(res);
          // navigate("/login");
          navigate("/");
        })
        .catch((err) => console.log(err));
 
   
   
   

  };
  return (
    <section className="body">
      <HelmetProvider>
        <Helmet title="Cadastro Cliente" />
      </HelmetProvider>



      <div className="titulo">Sitema de Contatos</div>
      <form onSubmit={handleSubmit} className="form">

    

<div className="formulario-login">
<p className="titulo-p">Login</p>

        <input
          className="form-login"
          type="email"
          placeholder="Digite o Email"
        
          autofocus
          required
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
     
<input
          className="form-login"
          type="password"
          placeholder="Digite sua senha"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        required
        />





        <button className="btn-login">Login</button>


<Link className="text-login" to="/cadastro">Crie Sua Conta</Link>


</div>
      </form>

    </section>
  );
}
export default Login;