import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
// import { Cadastrar } from "../MainPage/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";


//const userId='4'

export default function CadastroContato() {
   
  const navigate = useNavigate();
  const [values, setValues] = useState({
    nome: "",
    emails: "",
    telefones:""
  });

  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    axios
      .post(`http://localhost:3001/user/${user?.id}/repositorio`, values
             )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Erro tente Novemante! Banco não conectado");
        }
      });
    //alert("Enviando os dados:" + email + " - " + senha);
  };

  return (
    <>

<section className="body">
      <HelmetProvider>
        <Helmet title="Cadastro Cliente" />
      </HelmetProvider>



      <div className="titulo">Sitema de Contatos</div>
           {message ? <h1>{message}</h1> : ""}
      <form onSubmit={handleSubmit} className="form">

    

<div className="formulario">
<p className="titulo-p">Cadastro Cliente</p>

      

        <input
           className="form-nome"
       
          type="text"
          placeholder="Nome Completo do Cliente"
          onChange={(e) => setValues({ ...values, nome: e.target.value })}
        />
<div className="div-interna">


      
        <input
          className="form-control"
          type="email"
          placeholder="Digite o Email"
          onChange={(e) => setValues({ ...values, emails: e.target.value })}
        />

      
        <input
          className="form-control"
          type="tel"
          placeholder="Digite seu Telefone"
          onChange={(e) => setValues({ ...values, telefones: e.target.value })}
        />
</div>


        <button className="btn-cadastrar">Cadastrar Cliente</button>





</div>
      </form>
      {/* <ToastContainer toastStyle={{ backgroundColor: "crimson" }} /> */}
    </section>



 
    </>
  );
}
