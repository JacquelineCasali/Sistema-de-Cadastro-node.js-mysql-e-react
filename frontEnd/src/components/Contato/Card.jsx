import React, { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Menu from '../Menu/Menu'
import { BsSearch } from "react-icons/bs";
import * as Icon from "react-bootstrap-icons";
import { AuthContext } from '../../context/auth';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import "./Card.css"
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';


export default function Card() {
  const { user } = useContext(AuthContext);
  const [repositores, setRepositores] = useState([]);  

  const [message, setMessage] = useState("");


  const [openModal, setOpenModal] = useState(false);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  // Função que abre a modal
  function abrirModal() {
    setOpenModal(true);
  }

  // Função que fecha a modal
  function fecharModal() {
    setOpenModal(false);
  }


  const headers={
    'headers':{
      'x-access-token':api.defaults.headers['x-access-token'],
    
    }
  }
  useEffect(() => {
      try {
     
        //user?.id se existir execulta o id
        api
        .get(`/user/${user?.id}/contato`,headers
        ).then((response)=>{
         setRepositores(response.data.contato);
         console.log(response.data);
         setMessage(response.data.message);
  })} catch (err) {         
    console.error(err);   
    if (err.response) {
          setMessage(err.response.data.message);
        } 
      }; }, []);
  //corventendo para miniscula
  const searchLowerCase = busca.toLowerCase();
  console.log(busca);
  const nomes = repositores.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchLowerCase) 
  
  );

    //ordenando por nome
    const order = nomes.sort((a, b) => a.nome.localeCompare(b.nome));
    console.log(order);
    const handleDelete = (id) => {
      api
        .delete(`/user/${user?.id}/contato/` + id,headers
             
        )

        .then((res) => {
       // window.location.reload();
         // fecharModal()
         navigate(`/${user.id}/cadastrar/contato`);   
          fecharModal()
        })
        .catch((err) => console.log(err));
    };

  
  return (
    <>
<HelmetProvider>
        <Helmet title="Lita de Contato" />
      </HelmetProvider>
      {/* <Hearder onClick={onLogout} /> */}
       <section className="menu">
       <Menu
       />
<main className="lado-lista">
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
 
        <Link className="button" to={`/${user?.id}/cadastrar/contato`}>Cadastro
        
        </Link>
        <div className="clientes" >
     
      <h3 >Contatos</h3> 
          
     </div>

   

 
     {nomes.length>0?(
 
  <div className="card-grid">
  {message ? <h1>{message}</h1> : ""}
        {nomes?.map((menbro) => (
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

    <Link  to={`/${user?.id}/contato/${menbro.id}`}>
   
                           <Icon.Book
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icone"
                        />
                      </Link>

    <Link to={`/${user?.id}/edit/${menbro.id}`}>
      
    
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icone"
                        />
                      </Link>


<div className='app' onClick={abrirModal}>
<Icon.Trash3
  color="black"
  size={30}
  cursor="pointer"
  
  className="icones"
/>  
</div> 
<Modal isOpen={openModal} isClose={fecharModal}

>
<h2>Olá</h2>
<p>{menbro.nome}</p>
<span className='span'>Tem certeza que deseja deletar essa Conta?</span>
<div>
<button onClick={fecharModal} className="btn btn-primary me-2 mt-3">
          Cancelar
         </button>

<button onClick={() => handleDelete(menbro.id)} 

className="btn btn-danger mt-3 ml-3">
                        <Icon.Trash3
                          color="white"
                          size={20}
                          cursor="pointer"
                          
                          //className="icone"
                        />Deletar
                      </button>
</div>


</Modal>



    </div>
               
            
          </div>
          
          // </Link>
        ))}
      </div>
     ):(
      <p className='text-mensagem'>Nenhum contato Cadastrado. Clique em cadastrar</p>
     )}
  
    </main>

    </section>
    <Footer/>
    </>
  );
 
}
