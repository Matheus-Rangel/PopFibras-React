import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TabelaPortasToolbar from './TabelaPortasToolbar';
import { Toolbar, Typography } from '@material-ui/core';

const styles = theme => ({
  root : {
    width: '100%',
  }
});

const rows = [
  { id: 'estado', numeric: false, disablePadding: true, label: 'Estado de Link' },
  { id: 'numero_porta', numeric: true, disablePadding: false, label: 'Numero da Porta' },
  { id: 'local_destino', numeric: false, disablePadding: false, label: 'Local de Destino' },
  { id: 'dio_destino', numeric: false, disablePadding: false, label: 'Dio de Destino' },
  { id: 'porta_destino', numeric: true, disablePadding: false, label: 'Porta de Destino' },
];

export default class TabelaPortas extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      selectedRow: null,
      currentDio: null,
    }
  }

  static async fetchData(id){
    let token = localStorage.getItem('access_token')
    let data = await fetch('/dio?id='+ id,{
      headers: {
        Authorization : 'Bearer '+ token
      }
    }).then(res => {
      if (res.status == 401) {
        console.log(token)
        this.props.refreshToken().then(this.fetchData);
        return null;
      }else if(res.status != 200){
        console.log(res)
        console.log(res.json())
        return null
      }else{
        return res.json();
      }
    }).then( data => {
      if (!data){
        return null
      }
      return data
    });
    return data
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.currentDio!==prevState.currentDio){
      let data = TabelaPortas.fetchData(nextProps.currentDio)
      console.log(data)
      return {data:data, currentDio:nextProps.currentDio}
    }
    return null
  }
  render() {
    console.log(this.state.data)
    return (
      <div>
        {this.state.data ?
          <TabelaPortasToolbar currentLocal={this.state.data.local} currentDio={this.state.data.nome}/> : 
          <Toolbar>
            <Typography>
              Nenhum local selecionado
            </Typography>
          </Toolbar>
        }
      </div>
    )
  }
}

TabelaPortas.propTypes = {
  currentDio: PropTypes.any,
  refreshToken : PropTypes.func.isRequired,

}