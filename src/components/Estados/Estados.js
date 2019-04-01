import React, { Component } from 'react';
import {List} from '@material-ui/core';
import Estado from './Estado';
import EstadoAdd from './EstadoAdd';

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
  fetchEstados = () => {
    let token = localStorage.getItem('access_token')
    fetch('/estados-link',{
      headers: {
        Authorization : 'Bearer '+ token
      }
    }).then(res => {
      if (res.status == 401) {
        console.log(token)
        this.props.refreshToken().then(() => this.fetchEstados());
        return null;
      }else if(res.status == 500){
        return null
      }else{
        return res.json();
      }
    }).then( data => {
      console.log(data)
      if (!data){
        return null
      }
      data.estados.sort((a,b) => {
        if (a.nome > b.nome) {
          return 1;
        }
        if (a.nome < b.nome) {
          return -1;
        }
        return 0;
      })
      this.setState({data:data});
      return null;
    });
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
