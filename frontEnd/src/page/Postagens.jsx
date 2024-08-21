import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina

import Post from "../components/Postagens/Post";

export default function Postagens() {
  return (
  

   <>
     <HelmetProvider>
        <Helmet title="Sistema de Gerenciamaneto de Clientes" />
      </HelmetProvider>


   <Post/>
   </>
   
    

  )
}
