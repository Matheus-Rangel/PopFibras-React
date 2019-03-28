import React, { Component } from 'react';
import { Drawer, withStyles } from '@material-ui/core';

import Dashboard from '../Dashboard';
import Locais from '../Locais';
import Cabos from '../Cabos';
import Estados from '../Estados';
import Dios from '../Dios';
import TabelaPortas from '../TabelaPortas';
const styles = (theme) => ({
  drawerPaper: {
    maxHeight: 'calc(100% - 64px)'
  }
});

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLocal: null,
      currentDio: null,
      locais: false,
      cabos: false,
      estados: false,
      dios: false,
    };
    this.refreshToken = this.refreshToken.bind(this)
  }
  refreshToken(){
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
      this.props.history.push('/login')
    }else{
      fetch('/token/refresh',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '.concat(refreshToken)
        }
      }
      ).then(res => {
        if (res.status != 200){
          this.props.history.push('/login')
          console.log(res)
          return null
        }
        return res.json()
      }).then(data => {
        localStorage.setItem('access_token', data.access_token);
      });
    }
  }
  toggleDrawer = (state, open) => () =>{
    console.log('state ' + state +', open ' + open);
    this.setState({[state]:open});
  };
  setDio = (dio) => {
    this.setState({currentDio: dio})
  }
  setLocal = (local) => {
    this.setState({currentLocal: local, currentDio: local.dios[0]})
  }
  handleLogout = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }
  render() {
    const {classes} = this.props
    return (
      <div>
        <Dashboard 
          currentLocal={this.state.currentLocal} 
          currentDio={this.state.currentDio} 
          toggleDrawer={this.toggleDrawer}
          handleLogout={this.handleLogout}
          >
          <TabelaPortas currentDio={this.state.currentDio}/>
        </Dashboard>

        <Drawer 
          open={this.state.locais} 
          onClose={this.toggleDrawer('locais', false)}
          anchor='bottom'
          classes={{
            paperAnchorBottom: classes.drawerPaper
          }}
        >
          <Locais setLocal={this.setLocal} refreshToken={this.refreshToken}/>
        </Drawer>

        <Drawer 
          open={this.state.cabos} 
          onClose={this.toggleDrawer('cabos', false)}
          anchor='bottom'
        >
          <Cabos refreshToken={this.refreshToken}/>
        </Drawer>

        <Drawer 
          open={this.state.estados} 
          onClose={this.toggleDrawer('estados', false)}
          anchor='bottom'
        >
          <Estados />
        </Drawer>

        <Drawer 
          open={this.state.dios} 
          onClose={this.toggleDrawer('dios', false)}
          anchor='bottom'
        >
          <Dios setDio={this.setDio}/>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(App)