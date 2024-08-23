import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Helmet, HelmetProvider } from "react-helmet-async";

//pesquisa
//lista vem de fora repositorio
// onDeleteRepo deleta e onNewRepo cadastra
const Repositorio = ({ onNewRepo }) => {
 
  const [values, setValues] = useState({
    nome: "",
    emails: "",
    telefones:""
  });
 

  return (
    <>
 <section className="body">
      <HelmetProvider>
        <Helmet title="Cadastro Cliente" />
      </HelmetProvider>



      <div className="titulo">Sitema de Contatos</div>
      <form  className="form">

    

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
        <button className="btn-cadastrar"
        onClick={() => onNewRepo(values)}
        >Cadastrar</button>


<Link className="text-login" to="/login">Faça Login aqui</Link>


</div>
      </form>
      {/* <ToastContainer toastStyle={{ backgroundColor: "crimson" }} /> */}
    </section>
    </>
  );
};
export default Repositorio;
