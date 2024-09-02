import axios from "axios";

export const api = axios.create({ baseURL:"http://localhost:3002" });

//metodo que cria a sessao do login

export const createSession = async (email, password) => {
  const url = `/login`;
  return api.post(url, { email: email, password: password });
};

export const createUsuario = async (name,email, password,telefone) => {
  const url = `/user`;
  return api.post(url, {name:name, email: email, password: password,telefone:telefone });
};
export const createSenha = async (email, password) => {
  const url = `/senha`;
  return api.post(url, {email: email, password: password});
};
export const editarUsuario = async (id,name,email, telefone,password) => {
  const url = `/user/${id}`;
  return api.patch(url,{ name:name,email: email,password: password, telefone:telefone, });
};
export const getUsuario = async (id,headers) => {
  let url = `/user/${id}`;

  console.log("query", url);
  return api.get(url,headers);
};


export const deleteUsuario = async (url) => {

 var mensagem;
 
     // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição e o endereço
     await axios.delete(url)
     .then((response) => { // Acessa o then quando a API retornar status 200
         mensagem = response.data.mensagem;
     }).catch((err) => { // Acessa o catch quando a API retornar erro
         // Atribuir a mensagem no state message
         //console.log(err.response.data.mensagem);
         if (err.response) {
             mensagem = err.response.data.mensagem;
         } else {
             mensagem = "Erro: Tente novamente mais tarde ou entre contato com ...!";
         }
     });

 // Retornar a mensagem de sucesso ou erro
 return mensagem;
};


