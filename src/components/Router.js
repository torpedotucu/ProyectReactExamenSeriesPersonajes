import React, { Component } from 'react'
import { Route,Routes,BrowserRouter, useParams } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import DetalleSerie from './DetalleSerie';
import Personajes from './Personajes';
import NuevoPersonaje from './NuevoPersonaje';
import ModificarPersonaje from './ModificarPersonaje';
export default class Router extends Component {
  render() {
    function DetalleSerieElement(){
      var {id}=useParams();
      return <DetalleSerie idSerie={id}/>
    }
    function PersonajesElement(){
      var {idSerie}=useParams();
      return <Personajes idSerie={idSerie}/>
    }
    return (
      <BrowserRouter>
        <Menu/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/detalles/:id' element={<DetalleSerieElement/>}/>
          <Route path='/personajes/:idSerie' element={<PersonajesElement/>}/>
          <Route path='/nuevoPersonaje' element={<NuevoPersonaje/>}/>
          <Route path='/update' element={<ModificarPersonaje/>}/>
        </Routes>

      </BrowserRouter>
    )
  }
}
