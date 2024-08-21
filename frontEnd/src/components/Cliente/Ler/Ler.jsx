import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../../db/axios";
import "./Ler.css";
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
    <div className="container">
     <div className="tituloler">     
          <h2 className="h2">Detalhe Cadastro Cliente</h2>
          </div> 

          {/* <div className="card-ler"> */}
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
  );
}
export default Ler;
