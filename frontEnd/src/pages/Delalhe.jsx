import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina


import Card from "../components/Card/Card";
import Ler from "../components/Cliente/Ler/Ler";


export default function Detalhe() {

  return (
  
   
   <>
     <HelmetProvider>
        <Helmet title="Sistema de Repositorios" />
      </HelmetProvider>

{/* <Hearder/> */}
    <Ler/>



   </>
   
    

  )
}
