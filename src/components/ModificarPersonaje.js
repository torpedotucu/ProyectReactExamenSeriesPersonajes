import axios from 'axios'
import React, { Component } from 'react'
import Global from './Global'
import { Navigate } from 'react-router-dom';

export default class ModificarPersonaje extends Component {

    selectPersonaje=React.createRef();
    selectSerie=React.createRef();

    state={
        personajes:[],
        series:[],
        status:false,
    }

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
    loadPersonajes=()=>{
        let request='/api/personajes';
        let url=Global.urlApi+request;
        axios.get(url).then(response=>{
            //console.log(response.data);
            this.setState({
                personajes:response.data
            })
        })
    }

    getSeleccion=()=>{
        let aux=[];
        let seleccionada;
        let options=this.selectSerie.current.options;
        for (var opt of options){
            if(opt.selected==true){
                console.log("Serie seleccionada: "+opt.value);
                seleccionada=opt.value;
                aux.push(seleccionada);
            }
        }
        let perseleccionado;
        let options2=this.selectPersonaje.current.options;
        for (var opt2 of options2){
            if(opt2.selected===true){
                console.log("Personaje seleccionada: "+opt2.value);
                perseleccionado=opt2.value;
                aux.push(perseleccionado);
            }
        }
        return aux;
    }


    componentDidMount=()=>{
        this.loadPersonajes();
        this.loadSeries();
    }
    modificar=(e)=>{
        e.preventDefault();
        let array=this.getSeleccion();
        let ser=array[0];
        let pers=array[1];
        console.log(ser+","+pers);
        
        let request='api/personajes/'+pers+'/'+ser;
        let url=Global.urlApi+request;
        axios.put(url).then(response=>{
            console.log("Modificado");
            this.setState({
                status:true
            })
        })
    }
    
  render() {
    return (
      <div>
        {
            this.state.status===true && (
                <Navigate to={'/'}/>
            )
        }
        <h1>Modificar personajes</h1><br/><br/>
        <form>
            <label>Series</label>
            <select ref={this.selectSerie} className='form-control'>
                {
                    this.state.series.map((serie,index)=>{
                        return(
                            <option key={index} value={serie.idSerie} >{serie.nombre}</option>
                        )
                    })
                }
            </select>
            {/* personaje */}
            <div><br/>
            <label>Personajes</label>
            <select ref={this.selectPersonaje} className='form-control'>
                {
                    this.state.personajes.map((pers,index)=>{
                        return(
                            <option key={index} value={pers.idPersonaje}>{pers.nombre}</option>
                        )
                    })
                }
            </select>
            </div>
            <br/>
            <button onClick={this.modificar} className='btn btn-info'>Modificar</button>
        </form>
      </div>
    )
  }
}
