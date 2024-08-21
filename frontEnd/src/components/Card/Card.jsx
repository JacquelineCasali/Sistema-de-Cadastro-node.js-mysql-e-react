import "./card.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import * as Icon from "react-bootstrap-icons";
import { api } from "../../db/axios";
import Footer from "../Footer/Footer";
import Hearder from "../Hearder/Hearder";
export default function Card() {

  const [data, setData] = useState([]);
  useEffect(() => {
   
    axios
      .get(api +"/cliente")
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
  // delete
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/cliente" + id)
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };




  return (
    <>
       <Hearder/>
    
    <div className="container">
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
        <div className="titulo-cliente">Clientes


          
        </div>

  

        {/* <h2 className="h2">Membros</h2> */}
      </div>

          <div className="teste">

            
        <Link className="button" to={"/cadastro"}>Cadastro
        
        </Link>
      </div>
      
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

    
    </div>
    <Footer/>
    </>
  );
}
