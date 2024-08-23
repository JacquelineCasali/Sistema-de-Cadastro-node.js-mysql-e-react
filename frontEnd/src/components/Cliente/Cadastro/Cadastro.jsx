import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import "./Cadastro.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
// import { createUsuario } from "../../../services/api";



function Cadastro() {
  // formatação de alerta
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "green",
  };

  // criar cadastro
  const [values, setValues] = useState({
    name: "",
    email: "",
    telefone: "",
    password:"",
    confirmPassword:""

  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // validação da senha
  const handleValidation = () => {
    const { name, email, telefone,password,confirmPassword } = values;
   
    if (password !== confirmPassword) {
      // console.log("validation", toast);
      toast.error("Senha e Confirme a senha devem ser iguais", toastOptions);
      return false;
   
   
    }else if (name === "") {
      //campo nao pode ser vazio
      toast.error("Por favor, preencha seu nome", toastOptions);
      return false;
    } else if (email === "") {
      // campo nao pode ser vazio
      toast.error("Por favor, preencha seu email", toastOptions);
      return false;
    } else if (telefone < 9) {
      toast.error("0 Telefone precisa de no mínio de 9 dígitos", toastOptions);
      return false;
    }
    return true;
  };
  // const isValidEmail=(){

  // }

  const handleSubmit = async (e) => {
   
   

     try {
      e.preventDefault();
      if (handleValidation()) {
           axios
        .post("http://localhost:3001/user", values)
        .then((res) => {
          console.log(res);
          // navigate("/login");
          navigate("/login");
        })
      
     
    }} catch (err) {
      console.error(err);
      if (err.response) {
        setMessage(err.response.data.message);
      }
    }




    // if (handleValidation()) {
    //   axios
    //     .post(api+ "/user", values)
    //     .then((res) => {
    //       console.log(res);
    //       // navigate("/login");
    //       navigate("/");
    //     })
    //     .catch((err) => console.log(err));
    // }
   
   
   

  };
  return (
    <section className="body">
      <HelmetProvider>
        <Helmet title="Cadastro Cliente" />
      </HelmetProvider>


      {message ? <h1>{message}</h1> : ""}
      <div className="titulo">Sitema de Contatos</div>
      <form onSubmit={handleSubmit} className="form">

    

<div className="formulario">
<p className="titulo-p">Cadastro Cliente</p>

      

        <input
           className="form-nome"
       
          type="text"
          placeholder="Nome Completo do Cliente"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
<div className="div-interna">


      
        <input
          className="form-control"
          type="email"
          placeholder="Digite o Email"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />

      
        <input
          className="form-control"
          type="tel"
          placeholder="Digite seu Telefone"
          onChange={(e) => setValues({ ...values, telefone: e.target.value })}
        />
</div>
<div className="div-interna">
<input
          className="form-control"
          type="password"
          placeholder="Crie sua senha"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
           <input
          className="form-control"
          type="password"
          placeholder="Confirme sua senha"
          onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
        />



</div>

        <button className="btn-cadastrar">Cadastrar</button>


<Link className="text-login" to="/login">Faça Login aqui</Link>


</div>
      </form>
      <ToastContainer toastStyle={{ backgroundColor: "crimson" }} />
    </section>
  );
}
export default Cadastro;