import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async"; // titulo da pagina


export default function DownloadPDF() {
  return (
  
   
   <>
     <HelmetProvider>
        <Helmet title="Sistema de Repositorios" />
      </HelmetProvider>

{/* <Hearder/> */}
{/* <Link href='/Video_login.gif' download={"Video_login.gif"}>
Download
</Link> */}
<button >
<a href="images/Video_login.gif" download={"Video_login.gif"}>Download</a> 


</button>

 </>
   
    

  )
}
