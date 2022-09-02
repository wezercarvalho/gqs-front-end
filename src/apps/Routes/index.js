import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Features from '../../features'

/**
 * Determina o conteúdo que será renderizado para cada rota
 * @param {object} data Recebe a store 
 * @returns 
 */
export default function PageRoutes(data) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Features.ListRegisters data={data} />} />
        <Route path='/register' element={<Features.Register data={data} novaPropriedade={'teste'} />} />
      </Routes>
    </BrowserRouter>
  )
}