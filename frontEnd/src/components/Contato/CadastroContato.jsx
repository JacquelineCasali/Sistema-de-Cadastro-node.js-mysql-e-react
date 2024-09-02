import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


import { Helmet, HelmetProvider } from "react-helmet-async";
import Hearder from "../Hearder/Hearder";
import Footer from "../Footer/Footer";
import "../usuario/Editar.css"
import Menu from "../Menu/Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../services/api";
import { AuthContext } from "../../context/auth";


const CadastroContato = ({onLogout}) => {
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    nome: "",
    emails: "",
    telefones:""
  });



  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  //enviando o formulario

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "green",
  };

  const handleValidation = () => {

    if (values.nome === "") {
      toast.error("Por favor, preencha o nome", toastOptions);
    return false; 
  
  } else 
    if (values.emails === "") {
    //   //campo nao pode ser vazio
     toast.error("Por favor, preencha seu email", toastOptions);
    //   return false;
    } else if (values.telefones < 9) {
      toast.error("0 Telefone precisa de no mínio de 9 dígitos", toastOptions);
      return false;
    }
    return true;

  };

  const headers={
    'headers':{
      'x-access-token':api.defaults.headers['x-access-token'],
    
    }
  }

  
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (handleValidation()) {

    api
      .post(`/user/${user?.id}/contato`, values,headers
             )
         .then((response)=>{
          console.log(response)
           setMessage(response.data.message);
         
               navigate(`/${user.id}/contato`);
      }).catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Erro tente Novemante! Banco não conectado");
        }
      });
    //alert("Enviando os dados:" + email + " - " + senha);
  };


  }

  return (

<>
<HelmetProvider>
        <Helmet title="Cadastrar Contato Usuário" />
      </HelmetProvider>
      <Hearder onClick={onLogout} />
    <section className="menu">

<Menu
/>

<main className="lado-direito">


      <div className="edite" >
      {/* <div className="titulo-edite">Sitema de Contatos</div> */}
      <h3 >Cadastrar Contatos</h3> 
          
     </div>

      {/* imprimir mensagem */}
      {message ? <h1>{message}</h1> : ""}
      
      <form onSubmit={handleSubmit} >
      <div className="formularios">
    
    
    
    
      <label htmlFor=""className="test">Nome:</label>
          <input
           className="form-control"
         type="text"
         placeholder="Nome Completo do Contato"   
         onChange={(e) => setValues({ ...values, nome: e.target.value })}

          />
      
        </div>
        <div className="formularios">
        <label htmlFor=""className="test">Email:</label>
        
        <input
          
         
          className="form-control"
          type="email"
            placeholder="Digite o email"
            onChange={(e) => setValues({ ...values, emails: e.target.value })}

         />
        
        </div>
        <div className="formularios">
        <label htmlFor=""className="test">Telefone:</label>
          <input
           
           className="form-control"
          type="text"
               minLength="9"
          maxlength="17"
         
          placeholder="Digite o telefone"
            onChange={(e) => setValues({ ...values, telefones: e.target.value })}

          />
       
        </div>

        <button className="btn-editar" >
          Cadastrar
        </button>

 
      </form>



</main>
    </section>

    <Footer/>
    <ToastContainer toastStyle={{ backgroundColor: "crimson" }} />

    </>
  );
};

export default CadastroContato;
