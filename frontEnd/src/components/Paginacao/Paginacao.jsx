import React from 'react'
import "./Paginacao.css"
export default function Paginacao({setPageInicial,pageInicial,pages}) {
  return (
    <div>
      {Array.from(Array(pages),(menbro,index)=>{
      return <button 
      style={index===pageInicial?{color:"red",borderBottom:"blue"}:null}
      className='pagina'
      value={index} onClick={(e)=>setPageInicial(Number(e.target.value))}>{index+1}
      {/* qual  */}
      </button>
    })}  
    </div>
  )
}
