import React, { Component } from 'react';
import {List} from '@material-ui/core';
import Estado from './Estado';
import EstadoAdd from './EstadoAdd';
import {getEstados} from '../../services/FetchEstado';
export default class Estados extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount(){
    this.fetchEstados()
  }
  fetchEstados = async () => {
    let res = await getEstados();
    if (!res) {
      await this.props.refreshToken();
      res = await getEstados();
    }
    this.setState({data:res});  
  }
  
  render() {
    return (
      <List>
        { this.state.data &&
          this.state.data.estados.map(estado => 
          (<Estado refreshToken={this.props.refreshToken} key={estado.id} data={estado} list={this.state.data && this.state.data.estados} fetch={this.fetchEstados}/>))
        }
        <EstadoAdd refreshToken={this.props.refreshToken} fetch={this.fetchEstados} list={this.state.data && this.state.data.estados} data={this.state.data}/>
      </List>
    )
  }
}
