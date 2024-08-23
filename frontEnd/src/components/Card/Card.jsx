



import React, { useEffect, useState } from "react";

import Footer from "../Footer/Footer";
import Hearder from "../Hearder/Hearder";
import Contato from "./Contato";
import { getrepository } from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";




export default function Card() {
 
  const { user } = useContext(AuthContext);

  const [repositores, setRepositores] = useState([]);






  const loadData = async (query = "") => {
    try {
      // setLoading(true);
      //user?.id se existir execulta o id
      const response = await getrepository(user?.id, query);
      setRepositores(response.data.repositorio);

      // setLoading(false);
      console.log(response.data);
    } catch (err) {
      console.error(err);
      // setLoadingError(true);
    }
  };

  useEffect(() => {
    (async () => await loadData())();
    
    //chama a funçao da api
  }, []);


  return (
    <>
       <Hearder/>
       <Contato
        repositores={repositores}
     
      />
    <Footer/>
    </>
  );
}
