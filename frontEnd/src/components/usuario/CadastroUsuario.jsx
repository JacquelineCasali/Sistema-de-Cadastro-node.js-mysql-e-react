import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { createUsuario } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./Cadastro.css"
const CadastroUsuario = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
const [ confirmPassword,setConfirmPassword]= useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "green",
  };

  const handleValidation = () => {
   
    if (name === "") {
      // console.log("validation", toast);
      toast.error("Por favor, preencha seu Nome", toastOptions);
      return false;
   
   
    }else if (email === "") {
    //   //campo nao pode ser vazio
     toast.error("Por favor, preencha seu email", toastOptions);
    //   return false;
    } else if (password === "") {
        toast.error("Por favor, preencha a senha", toastOptions);
      return false; 
    
    }else if (password !== confirmPassword) {
      // console.log("validation", toast);
      toast.error("Senha e Confirme a senha devem ser iguais", toastOptions);
      return false
    }
    return true;

  };



  //enviando o formulario
  const handleCadastro = async (e) => {
    //não recarrega a pagina
    try {
      e.preventDefault();
      if (handleValidation()) {
      const teste = await createUsuario(name,  email, password,telefone);
      navigate("/");
      console.log(teste);
    }} catch (err) {
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
   
   
    {/* imprimir mensagem */}
      {message ? <h1>{message}</h1> : ""}
     
      <div className="titulo">Sitema de Contatos</div>
      <form onSubmit={handleCadastro} className="form">
      
      <div className="formulario">
      <p className="titulo-p">Cadastro Usuário</p>
      <input
             className="form-control"
           type="text"
       placeholder="Nome Completo do Cliente"
            onChange={(e) => setName(e.target.value)}
            //  onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
<div className="div-interna">
<input
             className="form-control"
           type="email"
            placeholder="Digite o Email"
            onChange={(e) => setEmail(e.target.value)}
            //  onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
  <input
            className="form-control"
          type="tel"
                         
          minLength="9"
          maxlength="17"
          pattern="[0-9]{2} [0-9]{5}-[0-9]{4}"
          placeholder="(xx) xxxxx-xxxx"
            onChange={(e) => setTelefone(e.target.value)}
          />
</div>
<div className="div-interna">
     
          <input
            className="form-control"
          type="password"
         placeholder="Crie sua senha"
            onChange={(e) => setPassword(e.target.value)}
         required
         />


<input
            className="form-control"
          type="password"
    placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
         required
         />
      </div>
  
    <button className="btn-cadastrar"  type="submit">Cadastrar</button>
    <Link className="text-login" to="/">Faça Login aqui</Link>
 
    </div>
       
      </form>
      <ToastContainer toastStyle={{ backgroundColor: "crimson" }} />

    </section>
  );
};

export default CadastroUsuario;
