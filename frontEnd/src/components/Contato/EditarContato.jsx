import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";
import { api } from "../../services/api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Hearder from "../Hearder/Hearder";
import Footer from "../Footer/Footer";
import "./Editar.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../context/auth";
import Menu from "../Menu/Menu";

const EditarContato = ({onLogout}) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext)
   const [message, setMessage] = useState("");
  const [contato, setContatos] = useState({
    nome:"",
     emails: "",
     
     telefones:""
   });

   const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "green",
  };
   
   const navigate = useNavigate();

  const headers={
    'headers':{
      'x-access-token':api.defaults.headers['x-access-token'],
    
    }
  }

  const handleValidation = () => {

    if (contato.nome === "") {
      toast.error("Por favor, preencha o nome", toastOptions);
    return false; 
  
  } else 
    if (contato.emails === "") {
    //   //campo nao pode ser vazio
     toast.error("Por favor, preencha seu email", toastOptions);
    //   return false;
    } else if (contato.telefones < 9) {
      toast.error("0 Telefone precisa de no mínio de 9 dígitos", toastOptions);
      return false;
    }
    return true;

  };



  useEffect(() => {
    //  banco de dados
   
   try {

    
    api
    .get(`/user/${user?.id}/contato/`+id,headers)
    .then((res) => {
      setContatos(res.data);
      setMessage(res.data.message);
         
    })
   } catch (err) {

    console.error(err);
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Erro tente Novemante! Banco não conectado");
      }
    };
   }
   
   
  ,[]);
 



  const handleEditar = async (e) => {
   
    try {
       // intercepitação do evento
       e.preventDefault();
    
       if (handleValidation()) {
    
       api
      .put(`/user/${user?.id}/contato/`+id,contato,headers)
      .then((res) => {
        navigate(`/${user.id}/contato`);
        console.log(res);
      })
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
        <Helmet title="Editar Usuário" />
      </HelmetProvider>
      <Hearder onClick={onLogout} />
      <section className="menu">
      <Menu/>
      <main className="lado-direito">
      <div className="edite" >
      <h3 >Editar Contatos</h3> 
     </div>

      {/* imprimir mensagem */}
      {message ? <h1>{message}</h1> : ""}
      <form onSubmit={handleEditar}>
      
      <div className="formularios">
    
    
    
    
      <label htmlFor=""className="test">Nome:</label>
          <input
           className="form-control"
         type="text"
                 value={contato.nome}
            onChange={(e) => setContatos({ ...contato, nome: e.target.value })}
          />
      
        </div>
        <div className="formularios">
        <label htmlFor=""className="test">Email:</label>
        
        <input
          
          value={contato.emails}
          className="form-control"
          type="email"
    
            onChange={(e) => setContatos({ ...contato, emails: e.target.value })}
          />
        
        </div>
        <div className="formularios">
        <label htmlFor=""className="test">Telefone:</label>
          <input
            value={contato.telefones}
           className="form-control"
          type="text"
                      
          minLength="9"
          maxlength="17"
            onChange={(e) => setContatos({ ...contato, telefones: e.target.value })}
          />
       
        </div>

        <button className="btn-editar" type="submit">
          Editar
        </button>

 
      </form>



</main>
 
</section>
    <Footer/>
    <ToastContainer toastStyle={{ backgroundColor: "crimson" }} />

    </>
  );
};

export default EditarContato;
