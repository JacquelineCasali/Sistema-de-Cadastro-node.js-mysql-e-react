import "./card.css";


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import * as Icon from "react-bootstrap-icons";
import { api } from "../../db/axios";
import Footer from "../Footer/Footer";
import Hearder from "../Hearder/Hearder";

import { ImExit } from "react-icons/im";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
export default function Card() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // puxando dados do banco
    //  banco de dados
    axios
      .get(api+`/cliente/${id}` )
      .then((res) => {
        console.log(res);
 
        setClientes(res.data);
      })
 
 
      
      .catch((err) => console.log(err));
  }, []);
 

  
  useEffect(() => {
   
    axios
      .get(api + "/cliente")
      .then((res) => setData(res.data.clientes))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);


  const [busca, setBusca] = useState("");
  //corventendo para miniscula
  const searchLowerCase = busca.toLowerCase();
  console.log(busca);
  const nome = data.filter(
    (cliente) =>
      cliente.name.toLowerCase().includes(searchLowerCase) 
  
  );

  const order = nome.sort((a, b) => a.email.localeCompare(b.name));
  console.log(order);
  // delete
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/cliente/" + id)
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };


 

  return (
    <>
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
<main className="lado-lista">
{/* <main className="lado-direito"> */}
    {/* <div className="container"> */}
      <div className="busca">
        {/* filtro */}
        <input
          type="texts"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pesquisa"
          placeholder="Pesquise aqui"
        />

        <div className="lupa">
          <BsSearch size={30} />
        </div>

        </div>
 

        <div className="clientes" >
     
      <h3 >Clientes</h3> 
          
     </div>

   

  

          {/* <div className="teste"> */}

            
        <Link className="button" to={"/cadastro"}>Cadastro
        
        </Link>
      {/* </div>
       */}
      <div className="card-grid">
        {nome?.map((menbro, index) => (
        // <Link  to={`/${menbro.id}`}>
       <div className="cards" key={index}>
          
          
            <h2 className="texto">{menbro.name}</h2>
           

            <div className="card-item">
            <p className="tes">Email:</p>

              <p className="texto">
            {menbro.email}
                  </p> 

                  </div>

                  <div className="card-item">
                  <p className="tes">Telefone:</p>

                  <p >
            {menbro.telefone}
                  </p> 
                  </div>
    <div className="iconetable">

    <Link  to={`/${menbro.id}`}>
                        <Icon.Book
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icone"
                        />
                      </Link>

    <Link to={`/edit/${menbro.id}`}>
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icone"
                        />
                      </Link>
    <Link onClick={() => handleDelete(menbro.id)}>
                        <Icon.Trash3
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icone"
                        />
                      </Link>



    </div>
               
            
          </div>
          
          // </Link>
        ))}
      </div>

    
    {/* </div> */}
    </main>
    </section>
    <Footer/>
    </>
  );
}
