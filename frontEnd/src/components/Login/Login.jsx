import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import { AuthContext } from "../../context/auth";
import "./login.css"



function Login() {

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlLogin = async (e) => {
    try {
      //não recarrega a pagina
      e.preventDefault();
      await login(email, password);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setMessage(err.response.data.message);
      }
    }
  };



  return (
    <section className="body">
      <HelmetProvider>
        <Helmet title="Cadastro Cliente" />
      </HelmetProvider>



      <div className="titulo">Sitema de Contatos</div>
   
      {message ? <h1>{message}</h1> : ""}
      <form onSubmit={handlLogin} className="form">

    

<div className="formulario-login">
<p className="titulo-p">Login</p>

        <input
          className="form-login"
          type="email"
          placeholder="Digite o Email"
        
          autofocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
     
<input
          className="form-login"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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