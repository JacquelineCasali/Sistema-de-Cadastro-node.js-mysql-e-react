 const jwt= require('jsonwebtoken')


 const auth=async(req,res,next)=>{
 
    const token=req.headers['x-access-token'];
    if(!token){
// //se nao existir
     return res.status(401).json({message:'Token não foi fornecido ou está invalido'})
 }
//validar com jwt
jwt.verify(token,process.env.SECRET,(err,decoded)=>{
    if(err) return res.status(500).json({message:'Falha na autenticação do Token' });
    req.clienteId=decoded.clienteId
    next()

})

 }
    

 module.exports=auth;

