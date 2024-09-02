import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { createSenha} from "../../services/api";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./Editar.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";


const EditarSenha = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [ confirmPassword,setConfirmPassword]= useState("");

  const navigate = useNavigate();
 
  const [isShow, setIsShow]= useState(false);
  const [isCon, setIsCon]= useState(false);

  const handlePassword= ()=>setIsShow(!isShow)
  const handleConfPassword= ()=>setIsCon(!isCon)
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "green",
  };


  const handleValidation = () => {
   
   if (email === "") {
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


  const handleEditarSenha = async (e) => {
    try {
      //não recarrega a pagina
      e.preventDefault();
      if (handleValidation()) {
      const teste = await createSenha(email, password);
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

<>
<HelmetProvider>
        <Helmet title="Recuperar Senha" />
      </HelmetProvider>
    <section className="body">
    <div className="titulo">Sitema de Contatos</div>


<main className="formulario-login">
       
      <p className="titulo-p">Redefinir Senha</p>
      {/* imprimir mensagem */}
      {message ? <h1>{message}</h1> : ""}
      <form onSubmit={handleEditarSenha}>

      <div className="input-senha">  
        <input
          
          value={email}
          className="form-control"
          type="email"
    placeholder="Digite o email"
          onChange={(e) => setEmail(e.target.value)}
          />
           <FaUser className="icon" />
    
           </div>
           <div className="input-senha" >
          <input
        
           className="form-control"
           type={isShow? "text": "password"}
            placeholder="Digite a Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


<button onClick={handlePassword} type="button" className="icon-button"> 
  
  
  
  {/* visualizar senha */}
  {isShow ? (<MdVisibilityOff   size={20} />):( <MdVisibility size={20} />)
           }
  </button>

          </div>
          <div className="input-senha" >       
       <input
        
        className="form-control"
        type={isCon? "text": "password"}
         placeholder="Confirme a senha"
         required
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
       />
<button onClick={handleConfPassword} type="button" className="icon-button"> 
  
  
  
  {/* visualizar senha */}
  {isCon ? (<MdVisibilityOff   size={20} />):( <MdVisibility size={20} />)
           }
  </button>
</div>



        <button className="btn-editar" type="submit">
          Salvar
        </button>

 
      </form>

      <Link className="text-login" to="/">Faça Login aqui</Link>

</main>
    </section>

      <ToastContainer toastStyle={{ backgroundColor: "crimson" }} />


    </>
  );
};

export default EditarSenha;
