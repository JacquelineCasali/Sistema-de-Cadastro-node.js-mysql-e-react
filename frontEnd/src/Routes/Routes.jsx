import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error/Error";
import Loginelogaut from "../pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

import Loading from "../components/Loading/Loading"
import CadastroUsuario from "../components/usuario/CadastroUsuario";
import EditarUsuario from "../components/usuario/EditarUsuario";
import Ler from "../components/usuario/Ler";
import CadastroContato from "../components/Contato/CadastroContato";
import LerContato from "../components/Contato/Ler";
import EditarContato from "../components/Contato/EditarContato";

import EditarSenha from "../components/usuario/EditarSenha";



const AppRoutes = () => {

 
  //rotas privadas
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <Loading/>;
    }

    //se nao tiver autenticado navega ate o login
    if (!authenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
       

    
          <Routes>
          
          <Route exact path="/" element={<Loginelogaut />} />
          <Route exact path="/senha" element={
            
 <EditarSenha/>
    
           } />
           
            <Route exact path="/cadastro" element={<CadastroUsuario />} />
            <Route exact path="/edit/:id" element={
               <Private>
 <EditarUsuario/>
               </Private>
           } />
                       <Route exact path="/:id" element={
              <Private>
 <Ler/>
              </Private>
           } />
  <Route
              exact
              path="/:id/contato"
              element={
                <Private>
                  <Home />
                </Private>
              }
            />
<Route
              exact
              path="/:id/cadastrar/contato"
              element={
                <Private >
                  <CadastroContato />
                </Private>
              }
            />
<Route
              exact
              path="/:id/contato/:id"
              element={
                <Private >
                  <LerContato />
                </Private>
              }
            />

<Route exact path="/:id/edit/:id" element={
              <Private>
 <EditarContato/>
              </Private>
           } />

            <Route path="*" element={<Error />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
};
export default AppRoutes;
