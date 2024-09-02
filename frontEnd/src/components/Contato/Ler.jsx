import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../usuario/Ler.css";

import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import Hearder from "../Hearder/Hearder";
import Footer from "../Footer/Footer";

import { api } from "../../services/api";
import Menu from "../Menu/Menu";

import { AuthContext } from "../../context/auth";


function LerContato({onLogout}) {
 
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [clientes, setClientes] = useState([]);

  
   const [message, setMessage] = useState("");
   
  
  
  const headers={
    'headers':{
      'x-access-token':api.defaults.headers['x-access-token'],
    
    }
  }






  useEffect(() => {
    //  banco de dados
   
   try {
    api
    .get(`/user/${user?.id}/contato/`+id,
      headers

    )
    .then((res) => {
      setClientes(res.data);
      setMessage(res.data.message);
      console.log(res);
    })
   } catch (err) {

    console.error(err);
    if (err.response) {
      setMessage(err.response.data.message);
    }
    };
   }
   
   
  ,[]);

      return (
  
  <>
 
<HelmetProvider>
        <Helmet title="Detalhe do Clinete" />
      </HelmetProvider>

    <Hearder onClick={onLogout} />
<section className="menu">

<Menu/>
{/* </aside> */}
<main className="lado-direitos">
  {/* <div className="container"> */}
  <div className="edite" >
      {/* <div className="titulo-edite">Sitema de Contatos</div> */}
      <h3 >Detalhe Clientes</h3> 
          
     </div>
     {message ? <h1>{message}</h1> : ""}


          <div className="card-ler">
          <div className="card">
<div className="card-item">
<p className="tes">
Nome:
</p>
<p > {clientes.nome}</p>

</div>

<div className="card-item">
<p className="tes">Email:</p>

  <p > {clientes.emails}</p>
    </div>       
    <div className="card-item">
<p className="tes">Telefone:</p>

  <p > {clientes.telefones}</p>
    </div>        
          
         
       
      <div>
      <Link to={`/${user.id}/contato`} className="btn btn-primary me-2">
          Voltar
        </Link>

        <Link to={`/${user.id}/edit/${id}`} className="btn btn-info">
          
     
          Editar
        </Link>
      </div>
  
       
        </div> 
      </div>
      </main>
      </section>
      <Footer/>
      </>
  

  );
}
export default LerContato;
