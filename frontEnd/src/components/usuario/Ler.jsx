import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Ler.css";

import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import Hearder from "../Hearder/Hearder";
import Footer from "../Footer/Footer";

import { api, getUsuario } from "../../services/api";
import Menu from "../Menu/Menu";
function Ler() {
  const [message, setMessage] = useState("");
 
  const { id } = useParams();
  const [values, setValues] = useState({});
   const headers={
    'headers':{
      'x-access-token':api.defaults.headers['x-access-token'],
    
    }
  }
  
  const loadData = async () => {
    try {
    
      const response = await getUsuario(id,headers);
      setValues(response.data);
      setMessage(response.data.message);
     
      console.log(response.data);
    } catch (err) {
      console.error(err);

      if (err.response) {
        setMessage(err.response.data.message);
      } 


    }
  };

  useEffect(() => {
    (async () => await loadData())();
  }, []);
  return (
  
  <>

  
<HelmetProvider>
        <Helmet title="Detalhe do Clinete" />
      </HelmetProvider>
    <Hearder/>

<section className="menu">
<Menu/>

<main className="lado-direitos">

  <div className="edite" >

      <h3 >Detalhe Clientes</h3> 
          
     </div>
  
     {message ? <h1>{message}</h1> : ""}

          <div className="card-ler">
          <div className="card">
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
          
         
       
      <div>
      <Link to={`/${values?.id}/contato`} className="btn btn-primary me-2">
          Voltar
        </Link>

        <Link to={   `/edit/${id}`} className="btn btn-info">
          
     
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
export default Ler;
