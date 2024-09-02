import { useState } from "react";
import { useNavigate,  useParams } from "react-router-dom";

import { useEffect } from "react";
import { api} from "../../services/api";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Hearder from "../Hearder/Hearder";
import Footer from "../Footer/Footer";
import "./Editar.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../Menu/Menu";

const EditarUsuario = ({onLogout}) => {
 
  const { id } = useParams();
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "green",
  };
  
  const [values, setValues] = useState({
   name:"",
    email: "",
    telefone:"",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  //enviando o formulario





  const handleValidation = () => {
   
    if (values.name === "") {
      // console.log("validation", toast);
      toast.error("Por favor, preencha seu Nome", toastOptions);
      return false;
   
   
    }else if (values.email === "") {
    //   //campo nao pode ser vazio
     toast.error("Por favor, preencha seu email", toastOptions);
    //   return false;
    } 
    return true;

  };
  useEffect(() => {
    //  banco de dados
   
   try {

    
    api
    .get(`/user/`+id)
    .then((res) => {
      setValues(res.data);
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
            .patch(`/user/`+id,values)
            .then((res) => {
              navigate(`/${id}`);
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

<Menu
/>

<main className="lado-direito">


      <div className="edite" >
      {/* <div className="titulo-edite">Sitema de Contatos</div> */}
      <h3 >Editar Clientes</h3> 
          
     </div>

      {/* imprimir mensagem */}
      {message ? <h1>{message}</h1> : ""}
      <form onSubmit={handleEditar}>
      
      <div className="formularios">
          <label htmlFor=""className="test">Nome:</label>
          <input
           className="form-control"
         type="text"
                 value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
      
        </div>
        <div className="formularios">
        <label htmlFor=""className="test">Email:</label>
        
        <input
          
          value={values.email}
          className="form-control"
          type="email"
    
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        
        </div>
        <div className="formularios">
        <label htmlFor=""className="test">Telefone:</label>
          <input
            value={values.telefone}
           className="form-control"
          type="tel"
                     onChange={(e) => setValues({ ...values, telefone: e.target.value })}
         minLength="9"
          maxlength="17"
 pattern="[0-9]{2} [0-9]{5}-[0-9]{4}"
        

        />
       
        </div>
        <div className="formularios">
        <label htmlFor=""className="test">Senha:</label>
          <input
        
           className="form-control"
          type="password"
            placeholder="Digite a Senha"
            required
            onChange={(e) => setValues({ ...values, password: e.target.value })}
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

export default EditarUsuario;
