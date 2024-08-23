import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error/Error";
import Loginelogaut from "../pages/Login";


// import { Container, Loading } from "../styles/styles";
import { AuthProvider, AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

import Cadastro from "../components/Cliente/Cadastro/Cadastro";
import Ler from "../components/Cliente/Ler/Ler";
import Editar from "../components/Cliente/Editar/Editar"
import Detalhe from "../pages/Delalhe";
import EditarContato from "../components/Cliente/Editar/EditarContato";
import CadastroContato from "../components/Repo";


const AppRoutes = () => {
  //rotas privadas
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);


    //se nao tiver autenticado navega ate o login
    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        {/* <Hearder onClick={onLogout} /> */}

   
          <Routes>
          <Route exact path="/ler" element={<Ler />} />
      <Route exact path="/cadastro" element={<Cadastro />} />
      <Route exact path="/login" element={<Loginelogaut />} />
          
            <Route
              exact
              path="/"
              element={
                <Private>
                  <Home />
                </Private>
              }
            />
   <Route
              exact
              path="/:id/ler"
              element={
                <Private>
                  <Detalhe />
                </Private>
              }
            />

            <Route
              exact
              path="/cadastrocontato"
              element={
                <Private>
                  <CadastroContato />
                </Private>
              }
            />
            <Route exact path="/login" element={<Loginelogaut />} />
            {/* <Route exact path="/cadastro" element={<CadastroLogin />} /> */}
            <Route exact path="/edit/:id" element={
              <Private>
 <Editar />
              </Private>





           } />


   <Route exact path="/edit/:id/contato/:id" element={
     <Private>
    
    <EditarContato />
    </Private>} />
            <Route path="*" element={<Error />} />
          </Routes>
  
      </AuthProvider>
    </Router>
  );
};
export default AppRoutes;
