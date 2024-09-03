import React from 'react'

export default function PaginacaoSelect({itensPage,setItensPage}) {
  return (
   <>
    {/* itens por pagina */}
   
   <div className='itenspag'>
    <span className='itenspags'>Itens Por Página</span>
      <select value={itensPage} onChange={(e)=>setItensPage(Number(e.target.value))} >
        <option value={3}>3</option>
        <option value={6}>6</option>
        <option value={9}>9</option>
      </select>
    </div> 
    </>
  )
}
