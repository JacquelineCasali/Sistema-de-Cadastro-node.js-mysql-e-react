import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate ,useParams} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import "./Editar.css"

import { api } from "../../../db/axios";
import Hearder from "../../Hearder/Hearder";
import Footer from "../../Footer/Footer";


import { ImExit } from "react-icons/im";


import * as Icon from "react-bootstrap-icons";

import { IoPersonAddOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";



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
 
 </div>
    
    <h3 >Clientes</h3>   
 
 

  



    <li>
    <Link to={`/${values.id}`}>
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


 <Link to={`/edit/${values.id}`}>
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        /> Editar
                      </Link>


 </li>
 <li>
 <Link onClick={() => handleDelete(values.id)}>
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
 <Link to={`/${values.id}`}>
                        <IoPersonAddOutline
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                          Cadastrar </Link>

  
 </li>
 
 <li>
 <Link to={`/${values.id}`}>
                        <FaRegAddressCard
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                         Detalhe </Link>
  </li>

<li>
<Link to={`/edit/${values.id}`}>
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        /> Editar 
                      </Link>
</li>
<li>
<Link onClick={() => handleDelete(values.id)}>
                        <Icon.Trash3
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icones"
                        /> Deletar </Link>
  
  
 </li>



 <li>
  
 <Link onClick={() => handleDelete(values.id)}>
                        <ImExit
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icones"
                        /> Sair
                      </Link>


  

  </li>
 <p > Data da Criação do Cliente{values.createdAt}</p> 
  </ul>
</nav>


</aside>

 




<main className="lado-direito">


      <div className="edite" >
      {/* <div className="titulo-edite">Sitema de Contatos</div> */}
      <h3 >Editar Clientes</h3> 
          
     </div>
        <form onSubmit={handleUpdate} >
      
        {/* <div className="formulario-edite"> */}
<div className="formularios">


<label htmlFor=""className="test">Nome:</label>

<input
  className="form-control"
  type="text"
  placeholder="Digite o nome"
  value={values.name}
  onChange={(e) => setValues({ ...values, name: e.target.value })}

/>
</div>   
   <div className="formularios">
   <label htmlFor=""className="test">Email:</label>

<input
  className="form-control"
  type="email"
  placeholder="Digite o Email"
  value={values.email}
  onChange={(e) => setValues({ ...values, email: e.target.value })}

/>

    </div>      
           
           
           <div className="formularios">

         
                        <label htmlFor="" className="test">Telefone:</label>

            <input
              className="form-control"
              type="text"
              placeholder="Digite o Telefone"
              value={values.telefone}
              onChange={(e) => setValues({ ...values, telefone: e.target.value })}
          
           />
  </div>

          <button className="btn-editar">Editar</button>
       {/* </div> */}
        </form>
      
       
        

  
    </main>
    </section>
    <Footer/>
    </>


  );
}

