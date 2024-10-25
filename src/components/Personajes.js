import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {

    state={
        personajes:[]
    }
    loadPersonajes=()=>{
        let idSerie=this.props.idSerie;
        let request='api/series/personajesserie/'+idSerie;
        let url=Global.urlApi+request;
        axios.get(url).then(response=>{
            console.log(response.data);
            this.setState({
                personajes:response.data
            })
        })
    }
    componentDidMount=()=>{
        this.loadPersonajes();
    }
  render() {
    return (
      <div>
        <h1>Personajes de {this.props.idSerie}</h1>
        <hr/>
        <button className='btn btn-info'><NavLink to={'/DETALLES/'+this.props.idSerie}>VOLVER</NavLink></button>

        <table className='table table-dark table-striped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.personajes.length!==0 && 
                    (
                        this.state.personajes.map((pers,i)=>{
                            return(
                                <tr key={i}>
                                    <td><img src={pers.imagen} style={{height:'100px'}}/></td>
                                    <td>{pers.nombre}</td>
                                </tr>
                            )
                        })
                    )
                }
            </tbody>
        </table>
      </div>
    )
  }
}
