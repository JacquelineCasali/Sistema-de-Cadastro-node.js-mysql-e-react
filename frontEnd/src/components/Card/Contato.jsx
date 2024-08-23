import "./Card.css";



import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import * as Icon from "react-bootstrap-icons";
import Footer from "../Footer/Footer";
import Hearder from "../Hearder/Hearder";



import { ImExit } from "react-icons/im";
import { IoPersonAddOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";



export default function Contato({repositores}) {
 
  const { id } = useParams();
  const {user,logout} = useContext(AuthContext)
  const handleLogout= ()=>{
    console.log('sair')
    logout();
  }

  return (
    <>

       <section className="menu">
<aside className="lado-esquerdo">

<nav  >
  <ul className="ul">
    
    <h3 >Clientes</h3>   
 
 

  




 <h3>Contatos</h3> 
 
 <li>
 <Link to={`/cadastrocontato`}>
                        <IoPersonAddOutline
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                          Cadastrar </Link>

  
 </li>
 
 <li>
 <Link to={`/${user.id}/contato/${id}`}>
                        <FaRegAddressCard
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                         Detalhe </Link>
  </li>

<li>
<Link to={`/edit/${user.id}/contato/${id}`}>
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        /> Editar 
                      </Link>
</li>
<li>
{/* <Link onClick={() => handleDelete(clientes.id)}>
                        <Icon.Trash3
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icones"
                        /> Deletar </Link> */}
  
  
 </li>



 <li>
 <Link to={"login"} onClick={handleLogout}>
 <ImExit
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icones"
                        /> Sair          
                      </Link>


  

  </li>
 
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
          // value={busca}
         // onChange={(e) => setBusca(e.target.value)}
          className="pesquisa"
          placeholder="Pesquise aqui"
        />

        <div className="lupa">
          <BsSearch size={30} />
        </div>

        </div>
 

        <div className="clientes" >
     
      <h3 >Contatos</h3> 
          
     </div>

   

  

          {/* <div className="teste"> */}

            
        <Link className="button" to={"/cadastrocliete"}>Cadastro
        
        </Link>
      {/* </div>
       */}
      <div className="card-grid">
        {repositores.map((menbro) => (
        // <Link  to={`/${menbro.id}`}>
       <div className="cards" key={menbro.id}>
          
          
            <h2 className="texto">{menbro.nome}</h2>
           

            <div className="card-item">
            <p className="tes">Email:</p>

              <p className="texto">
            {menbro.emails}
                  </p> 

                  </div>

                  <div className="card-item">
                  <p className="tes">Telefone:</p>

                  <p >
            {menbro.telefones}
                  </p> 
                  </div>
    <div className="iconetable">

    <Link  to={`/${menbro.id}/ler`}>
                        <Icon.Book
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icone"
                        />
                      </Link>
{/* 
    <Link to={`/edit/${menbro.id}/contato/${id}`}>
          
    
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icone"
                        />
                      </Link> */}
    {/* <Link onClick={() => handleDelete(menbro.id)}>
                        <Icon.Trash3
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icone"
                        />
                      </Link> */}



    </div>
               
            
          </div>
          
          // </Link>
        ))}
      </div>

    
    {/* </div> */}
    </main>
    </section>

    </>
  );
}
