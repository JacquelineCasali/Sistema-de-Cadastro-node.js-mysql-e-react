// import Search from "./Search";
import Repositorio from "./Repositorio";
import React, { useState, useEffect, useContext } from "react";
import {
  getrepository,
  createRepository,
  deleteRepository,
} from "../../services/api";

import { AuthContext } from "../../context/auth";
import Hearder from "../Hearder/Hearder";


//const userId='4'

export default function Card({onLogout}) {
  const { user } = useContext(AuthContext);

  const [repositores, setRepositores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const loadData = async (query = "") => {
    try {
      setLoading(true);
      //user?.id se existir execulta o id
      const response = await getrepository(user?.id, query);
      setRepositores(response.data.repositorio);

      setLoading(false);
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  };

  useEffect(() => {
    (async () => await loadData())();

    //chama a funçao da api
  }, []);


  //parametro de busca
  // const handleSearch = (query) => {
  //   loadData(query);

  // };
  // repositorio
  const handleDeleterepo = async (repository) => {
    await deleteRepository(user?.id, repository.id);
    await loadData();
    console.log("delete", repository);
  };

  const handleNewRepo = async () => {
    try {
      //userId=user?.id
      await createRepository(user?.id);
      await loadData();
    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }

    console.log("criar");
  };

//   if (loadingError) {
//     return (
// //       <Loading>
// //  Repositório não encontrado    
    
// //         <Link to={"/repo"}>   Cadastrar</Link>
// //       </Loading>
//     );
//   }

  // if (loading) {
  //   return <Loading>Carregando...</Loading>;
  // }

  return (
    <>
      <Hearder onClick={onLogout} />
      {/* <Search onSearch={handleSearch} /> */}
      <Repositorio
        repositores={repositores}
        onDeleteRepo={handleDeleterepo}
        onNewRepo={handleNewRepo}
      />
    </>
  );
}
