import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../db/axios";
import "./Ler.css";

import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import Hearder from "../../Hearder/Hearder";
import Footer from "../../Footer/Footer";
import { ImExit } from "react-icons/im";


import * as Icon from "react-bootstrap-icons";

import { IoPersonAddOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
function Ler() {
  const { id } = useParams();
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    //  banco de dados
    axios
      .get(api + "/cliente/" + id)
      .then((res) => {
        console.log(res);

        setClientes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
  
  <>

  
<HelmetProvider>
        <Helmet title="Detalhe do Clinete" />
      </HelmetProvider>
    <Hearder/>

<section className="menu">
<aside className="lado-esquerdo">

<nav  >
  <ul className="ul">
  <h3>MEUS DADOS</h3>
 <div className='dados'>
 
  <div className="card-item">
<p className="tes">
Nome:
</p>
<p > {clientes.name}</p>

</div>

<div className="card-item">
<p className="tes">Email:</p>

  <p > {clientes.email}</p>
    </div>  

        <div className="card-item">
<p className="tes">Telefone:</p>

  <p > {clientes.telefone}</p>
    </div> 
 
 </div>
    
    <h3 >Clientes</h3>   
 
 

  



    <li>
    <Link to={`/${clientes.id}`}>
                        <FaRegAddressCard 
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                         Detalhe
                      </Link>
      
     </li>

 <li>


 <Link to={`/edit/${clientes.id}`}>
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        /> Editar
                      </Link>


 </li>
 <li>
 <Link onClick={() => handleDelete(clientes.id)}>
                        <Icon.Trash3
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icones"
                        /> Deletar 
                      </Link>
  
  
 </li>

 

 <h3>Contatos</h3> 
 
 <li>
 <Link to={`/${clientes.id}`}>
                        <IoPersonAddOutline
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                          Cadastrar </Link>

  
 </li>
 
 <li>
 <Link to={`/${clientes.id}`}>
                        <FaRegAddressCard
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                         Detalhe </Link>
  </li>

<li>
<Link to={`/edit/${clientes.id}`}>
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        /> Editar 
                      </Link>
</li>
<li>
<Link onClick={() => handleDelete(clientes.id)}>
                        <Icon.Trash3
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icones"
                        /> Deletar </Link>
  
  
 </li>



 <li>
  
 <Link onClick={() => handleDelete(clientes.id)}>
                        <ImExit
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icones"
                        /> Sair
                      </Link>


  

  </li>
 <p > Data da Criação do Cliente{clientes.createdAt}</p> 
  </ul>
</nav>


</aside>
<main className="lado-direitos">
  {/* <div className="container"> */}
  <div className="edite" >
      {/* <div className="titulo-edite">Sitema de Contatos</div> */}
      <h3 >Detalhe Clientes</h3> 
          
     </div>
  


          <div className="card-ler">
          <div className="card">
<div className="card-item">
<p className="tes">
Nome:
</p>
<p > {clientes.name}</p>

</div>

<div className="card-item">
<p className="tes">Email:</p>

  <p > {clientes.email}</p>
    </div>       
    <div className="card-item">
<p className="tes">Telefone:</p>

  <p > {clientes.telefone}</p>
    </div>        
          
         
       
      <div>
      <Link to="/" className="btn btn-primary me-2">
          Voltar
        </Link>

        <Link to={`/edit/${clientes.id}`} className="btn btn-info">
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
