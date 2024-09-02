import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina
import Hearder from "../components/Hearder/Hearder";
import Card from "../components/Contato/Card";


export default function Home({onLogout}) {

  return (
  
   
   <>
     <HelmetProvider>
        <Helmet title="Sistema de Repositorios" />
      </HelmetProvider>

      <Hearder onClick={onLogout} />
    <Card/>



   </>
   
    

  )
}
