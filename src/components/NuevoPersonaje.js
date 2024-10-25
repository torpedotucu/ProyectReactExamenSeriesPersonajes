import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';

export default class NuevoPersonaje extends Component {
    state = {
        status: false,
        series:[],
        serie:null

    }

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSerie=React.createRef();

    loadSeries = () => {
        let request = 'api/series';
        let url = Global.urlApi + request;
        axios.get(url).then(response => {
            // console.log(response.data);
            this.setState({
                series: response.data
                
            })
        })
    }

    getSerieSeleccionada=()=>{
        let series=this.getSeleccion();
        
    }
    getSeleccion=()=>{
        let aux=[];
        let seleccionada
        let options=this.selectSerie.current.options;
        for (var opt of options){
            if(opt.selected==true){
                console.log("Selecionada: "+opt.value);
                seleccionada=opt.value;
            }
        }
        return seleccionada;
    }
    crearPersonaje = (e) => {
        e.preventDefault();
        let nombre=this.cajaNombre.current.value;
        let imagen=this.cajaImagen.current.value;
        let series=this.selectSerie.current.options
        for(var ser of series){
            if(ser.selected===true){
                this.setState({
                    serie:ser.value
                })
            }
        }
        let serie=parseInt(this.getSeleccion());
        console.log("IdSerie: "+parseInt(serie))
        console.log(nombre+" "+ imagen+ serie);
        let request='api/personajes';
        let nuevoPersonaje={
            idPersonaje:1450,
            nombre:nombre,
            imagen:imagen,
            idSerie:serie
        }
        console.log(nuevoPersonaje);
        let url=Global.urlApi+request;
        axios.post(url,nuevoPersonaje).then(response=>{
            console.log("PERSONAJE CREADO");
            this.setState({
                status:true
            })
        })

    }
    componentDidMount=()=>{
        this.loadSeries();
    }
    render() {
        return (
            <div>
                {this.state.status===true &&
                    (
                        <Navigate to={'/'}/>
                    )
                }
                <h1>Crear Personaje</h1>
                {/* FORM CON UN SPINNER PARA SELECCIONAR LA SERIE */}
                <form>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Nombre</span>
                        <input type="text" className="form-control" ref={this.cajaNombre} aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Imagen</span>
                        <input type="text" className="form-control" ref={this.cajaImagen} aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div>
                        <select ref={this.selectSerie} defaultValue={false} className='form-control' >
                            
                            {
                                this.state.series.map((serie,index)=>{
                                    return(
                                        <option key={index} value={serie.idSerie} >{serie.nombre}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <br/>
                    <button className='btn btn-outline-secondary' onClick={this.crearPersonaje}>Crear</button>
                </form>
            </div>
        )
    }
}
