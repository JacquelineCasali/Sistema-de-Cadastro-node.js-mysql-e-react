import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,useParams} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import "./Editar.css"
import BotaoVoltar from "../../Voltar/BotaoVoltar";
import { api } from "../../../db/axios";
import Hearder from "../../Hearder/Hearder";
import Footer from "../../Footer/Footer";


export default function Editar() {
  const { id } = useParams();
 
 
 
 
 
  useEffect(() => {
    // puxando dados do banco
    //  banco de dados
    axios
      .get(api+"/cliente/" + id)
      .then((res) => {
        console.log(res);

        setValues(res.data);
      })


      
      .catch((err) => console.log(err));
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    telefone:"",
 
    
  });
  //  editar
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(api+"/cliente/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
     // .catch((err) => console.log(err));
     .catch((error) =>
     {
    const { data } = error.response;
   
    alert(data.msg);
      console.log(data.msg)});
  
    };

  return (
  <>        
  
       <HelmetProvider>
        <Helmet title="Editar Cadastro" />
      </HelmetProvider>
    <Hearder/>
   
{/* lado direito  */}
<section>
{/* <!-- aside parte do menu - minha conta até sair --> */}
    <div class="menu">
        {/* <!-- para formatar minha conta --> */}
    {/* <section class="perfil">

    <a href="#" class="mobile-menu1"> MINHA CONTA</a>
   
   <div class="mobile-menu">
      <div class="line 1"></div>
      <div class="line 2"></div>
      <div class="line 3"></div>
  </div>  

    </section> */}

<nav>
  <ul>
  <h3>MEUS DADOS</h3>
  <div className="card-item">
<p className="tes">
Nome:
</p>
<p > {values.name}</p>

</div>

<div className="card-item">
<p className="tes">Email:</p>

  <p > {values.email}</p>
    </div>  

        <div className="card-item">
<p className="tes">Telefone:</p>

  <p > {values.telefone}</p>
    </div>    
 <Link to={`/edit/${id}`}>Editar</Link>
 
 <h3>Clientes</h3> 
    <li>
Cadastrar Cliente
    </li>
    <li>Todos os Clientes</li>
 <li>Editar Cliente</li>
 <li>Sair</li>
 
  </ul>
</nav>

   </div>


<section className="lado-esquerdo">


      <div className="edite" >
      {/* <div className="titulo-edite">Sitema de Contatos</div> */}
   
          
     
        <form onSubmit={handleUpdate} className="form">
        <div className="formulario-edite">
        <p className="titulo-p">Editar Membros</p>    
<div >
<label htmlFor=""className="test">Nome:</label>

<input
  className="form-edite"
  type="text"
  placeholder="Digite o nome"
  value={values.name}
  onChange={(e) => setValues({ ...values, name: e.target.value })}

/>
</div>
     
         
<div>
            <label htmlFor=""className="test">Email:</label>

            <input
              className="form-edite"
              type="email"
              placeholder="Digite o Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
           
           />
    </div>   
    <div>
            <label htmlFor="" className="test">Telefone:</label>

            <input
              className="form-edite"
              type="text"
              placeholder="Digite o Telefone"
              value={values.telefone}
              onChange={(e) => setValues({ ...values, telefone: e.target.value })}
          
           />
        </div>      
          <button className="btn-editar">Editar</button>
          </div>
        </form>
        </div>
       
        </section>
        

    </section>
    <Footer/>
    </>


  );
}

