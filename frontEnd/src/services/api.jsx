import axios from "axios";

export const api = axios.create({ baseURL:"http://localhost:3001" });

//metodo que cria a sessao do login

export const createSession = async (email, password) => {
  const url = `/login`;
  return api.post(url, { email: email, password: password });
};

export const createUsuario = async (name, email, password, telefone) => {
  const url = `/user`;
  return api.post(url, { name:name,email: email, password: password,telefone:telefone });
};

export const editarUsuario = async (id,name,email, password,telefone) => {
  const url = `/user/${id}`;
  return api.put(url, { name:name,email: email, password: password,telefone:telefone  });
};
export const getUsuario = async (id) => {
  let url = `/user/${id}`;


  console.log("query", url);
  return api.get(url);
};


export const getrepository = async (userId, query) => {
  let url = `/user/${userId}/repositorio/`;
  //let url=`/repo/`

  if (query !== "") {
    url += `?url=${query}`;
  }

  console.log("query", url);
  return api.get(url);
};
// criar
// export const createRepository = async (userId, repositorioUrl) => {
  
//   const url = `/user/${userId}/repositorio`;
//   return api.post(url, { name: repositorioName, url: repositorioUrl });
// };


export const createRepository = async (nome, emails,  telefones,userId) => {
  const url = `/user/${userId}/repositorio`;
  return api.post(url, { nome:nome,emails: emails, telefones:telefones });
};



//deletar

export const deleteRepository = async (userId, id) => {
  const url = `/user/${userId}/repositorio/${id}`;
  return api.delete(url);
};
//extrarir o nome dentro da url
//regex
//https://ihateregex.io/expr/url/

