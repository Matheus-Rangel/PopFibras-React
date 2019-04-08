import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TabelaPortasToolbar from './TabelaPortasToolbar';
import { Toolbar, Typography, Paper } from '@material-ui/core';
import TabelaPortasHead from './TabelaPortasHead'
const styles = theme => ({
  root : {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const rows = [
  { id: 'estado', numeric: false, disablePadding: true, label: 'Estado de Link' },
  { id: 'numero_porta', numeric: true, disablePadding: false, label: 'Numero da Porta' },
  { id: 'local_destino', numeric: false, disablePadding: false, label: 'Local de Destino' },
  { id: 'dio_destino', numeric: false, disablePadding: false, label: 'Dio de Destino' },
  { id: 'porta_destino', numeric: true, disablePadding: false, label: 'Porta de Destino' },
];

class TabelaPortas extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      selectedRow: null,
      currentDio: null,
      order: 'desc',
      orderBy: 'numero_porta'
    }
  }

  async fetchData(id){
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
      this.setState({data:data}, () => {console.log(this.state)})
      return data
    });
    return data
  }
  
  componentDidMount(){
    this.fetchData(this.props.currentDio)
  }
  componentDidUpdate(prevProps){
    if (prevProps.currentDio != this.props.currentDio){
      this.setState({data:null})
      this.fetchData(this.props.currentDio)
    }
  }
  render() {
    const {classes} = this.props
    return (
      <Paper className={classes.root}>
        {this.state.data ?
          <React.Fragment>
            <TabelaPortasToolbar currentLocal={this.state.data.local.nome} currentDio={this.state.data.nome}/> 
            <div className={classes.tableWrapper}>
              <TabelaPortasHead
                order={this.state.order}
                orderBy={this.state.orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={this.data ? this.data.portas.lenght : 0}
              />
            </div>
          </React.Fragment>
          :
          <Typography>
            Loading
          </Typography>
        }
      </Paper>
    )
  }
}

TabelaPortas.propTypes = {
  currentDio: PropTypes.any,
  refreshToken : PropTypes.func.isRequired,

}
export default withStyles(styles)(TabelaPortas);
