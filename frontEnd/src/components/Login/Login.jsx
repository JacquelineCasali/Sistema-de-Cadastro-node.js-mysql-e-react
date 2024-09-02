
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";


import { Helmet, HelmetProvider } from "react-helmet-async";
import "./Login.css"
import {  FaUser } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";


const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [message, setMessage] = useState("");
  const [isShow, setIsShow]= useState(false);


const handlePassword= ()=>setIsShow(!isShow)




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
    <>
    
    
    
    
    <section className="body">
      <HelmetProvider>
        <Helmet title="Login" />
      </HelmetProvider>

      <div className="titulo">Sitema de Contatos</div>
   
      <form onSubmit={handlLogin} className="form">

    

<div className="formulario-login">
{message ? <h1>{message}</h1> : ""}

<p className="titulo-p">Login</p>
<div className="input-senha">
        <input
          className="form-control"
          type="email"
          placeholder="Digite o Email"
        
       
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <FaUser className="icon" />
         </div>
     <div className="input-senha" >



     <input
         className="form-control"
          type={isShow? "text": "password"}
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        required
       
       
       />
       
  <button onClick={handlePassword} type="button" className="icon-button"> 
  
  
  
  {/* visualizar senha */}
  {isShow ? (<MdVisibilityOff   size={20} />):( <MdVisibility size={20} />)
           }
  </button>
  
  </div>
        

          
  <Link className="text-esqueceu" to={"/senha"}>
  Esqueceu sua senha?
</Link> 

             
              
          
          
    




        <button className="btn-login">Login</button>


<Link className="text-login" to="/cadastro">Crie Sua Conta</Link>


</div>
      </form>


           </section>
    </>
  );
};

export default Login;
