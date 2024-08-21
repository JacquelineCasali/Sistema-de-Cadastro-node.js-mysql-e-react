import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../page/Home";
 import Cadastro from "../components/Cliente/Cadastro/Cadastro";
 import Ler from "../components/Cliente/Ler/Ler";
 import Editar from "../components/Cliente/Editar/Editar"
import Footer from "../components/Footer/Footer";
import Hearder from "../components/Hearder/Hearder";
import Error from "../page/Error/Error";
import Login from "../components/Cliente/login/Login";
// import Postagens from "../page/Postagens";


const AppRoutes = () => {
  return (
    <Router>
     {/* <Hearder/> */}
   {/* <Container> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/:id" element={<Ler />} />
      <Route exact path="/cadastro" element={<Cadastro />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/edit/:id" element={<Editar />} />  
       {/*
     
      <Route exact path="/postagens" element={<Postagens />} />   */}
    <Route path="*" element={<Error />} />
    </Routes>
    {/* </Container> */}
    {/* <Footer/> */}
  </Router>
  );
};
export default AppRoutes;
