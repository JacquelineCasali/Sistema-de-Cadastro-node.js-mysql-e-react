import React from 'react'
import { BsSearch } from 'react-icons/bs'

export default function Search({busca,setBusca}) {
  return (
    <div className="busca">
    {/* filtro */}
    <input
      type="texts"
     value={busca}
     onChange={(e) => setBusca(e.target.value)}
      className="pesquisa"
      placeholder="Pesquise aqui"
    />

    <div className="lupa">
      <BsSearch size={30} />
    </div>

    </div>
  )
}
