import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import * as Icon from "react-bootstrap-icons";
import { ImExit } from "react-icons/im";

import { FaRegAddressCard } from "react-icons/fa6";
import { deleteUsuario, getUsuario } from '../../services/api';
import { AuthContext } from '../../context/auth';
import 'react-day-picker/dist/style.css';
import "./Menu.css"
import Modal from '../Modal/Modal';
import { IoPersonAddOutline } from "react-icons/io5";
import {format} from 'date-fns';
import "react-day-picker/style.css";


import { ptBR } from "date-fns/locale";

const Menu=()=> {
    const {logout} = useContext(AuthContext)
    const [openModal, setOpenModal] = useState(false);
  
  // Função que abre a modal
      function abrirModal() {
        setOpenModal(true);
      }
    
      // Função que fecha a modal
      function fecharModal() {
        setOpenModal(false);
      }
    
    const handleLogout= ()=>{
      console.log('sair')
      logout();
    }
    const [values, setValues] = useState({
       });

    const { user } = useContext(AuthContext);
    const loadData = async () => {
        try {
          const response = await getUsuario(user?.id);
          setValues(response.data);
          console.log(response.data);
        } catch (err) {
          console.error(err);
        }
      };
    
      useEffect(() => {
        (async () => await loadData())();
      
      }, []);
    
      useEffect(() => {
        // Chamar a função com requisição para API
        getUsuario(user.id);
      }, []);
           const handleDelete = async () => {
      try{
         
          const response =await deleteUsuario(` http://localhost:3002/user/${user?.id}`);
          logout();
          console.log(response)
      }catch (err) {
        console.error(err);
           }};

    return (
    <>
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
    <Link to={`/${values?.id}`}>
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
 <Link to={`/edit/${values?.id}`}>
                        <Icon.Pencil
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        /> Editar
                      </Link>


 </li>

       <div>
      
<li className='app' onClick={abrirModal}>


<Icon.Trash3
  color="black"
  size={30}
  cursor="pointer"
  
  className="icones"
/> Deletar 
</li> 
<Modal isOpen={openModal} isClose={fecharModal}

>
<h2>Olá</h2>
<span className='span'>Tem certeza que deseja deletar essa Conta?</span>

<div >

       <button onClick={fecharModal} className="btn btn-primary me-2 mt-3">
          Cancelar
         </button>
    <button 
    onClick={() => handleDelete(user.id)}
    
   className="btn btn-danger mt-3">
                        <Icon.Trash3
                           color="white"
                           size={20}
                          cursor="pointer"
                          
                        //  className="icones"
                     /> Deletar </button>
 
    
     </div>
</Modal>
</div> 
 

 <h3>Contatos</h3> 
 
 <li>
 <Link to={`/${values?.id}/cadastrar/contato`}>
                        <IoPersonAddOutline
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                          Cadastrar </Link>

  
 </li>
 <li>
    <Link to={`/${values?.id}/contato`}>
                        <FaRegAddressCard 
                          color="black"
                          size={30}
                          cursor="pointer"
                          className="icones"
                        />
                         Contatos
                      </Link>
      
     </li>

 
 <li > 
  
  <Link to={"/login"} onClick={handleLogout} >
                        <ImExit
                          color="black"
                          size={30}
                          cursor="pointer"
                          
                          className="icones"
                        /> Sair
                      </Link>


  

  </li>
<div className='data'>
<p > Data da Criação do Usuário</p> 
 <p className="tes">
 {format(Date(values.createdAt), " d - MM - yyyy",   { locale: ptBR }) }
 </p>
</div>

  </ul>
</nav>


</aside> 
    </>
  )
}
export default Menu;;