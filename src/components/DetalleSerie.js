import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class DetalleSerie extends Component {

    state = {
        serie: []
    }
    loadDetalles = () => {
        var idSerie = this.props.idSerie;
        console.log(idSerie);
        let request = 'api/series/' + idSerie;
        let url = Global.urlApi + request;
        console.log(url);
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                serie: response.data
            })
        })
    }
    componentDidMount = () => {
        this.loadDetalles();
    }
    componentDidUpdate = (oldProps) => {
        if (oldProps.idSerie !== this.props.idSerie) {
            this.loadDetalles();
        }
    }
    render() {
        return (
            <div className="card" style={{ width: " 18rem" }}>
                <img src={this.state.serie.imagen} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{this.state.serie.nombre}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> IMDB: {this.state.serie.puntuacion}</li>
                        <li className="list-group-item">AÑO: {this.state.serie.anyo}</li>
                        
                    </ul>
                    <NavLink to={'/personajes/'+this.state.serie.idSerie} className="btn btn-primary">Personajes</NavLink>
                </div>
            </div>
        )
    }
}
