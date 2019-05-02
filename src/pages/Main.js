import React, { Component } from 'react';
import { Drawer, withStyles, Typography } from '@material-ui/core';

import Dashboard from '../Dashboard';
import Locais from '../Locais';
import Cabos from '../Cabos';
import Estados from '../Estados';
import Dios from '../Dios';
import TabelaPortas from '../TabelaPortas';

import {refreshAccessToken} from '../../services/AccessToken'
import DioTab from '../Tabs/DioTab';
import LocalTab from '../Tabs/LocalTab';

import {getLocais} from '../../services/FetchLocal';
import {getDios} from '../../services/FetchLocal';
import {getEstados} from '../../services/FetchLocal';
import {getCabos} from '../../services/FetchLocal';

const styles = (theme) => ({
  drawerPaper: {
    maxHeight: 'calc(100% - 64px)'
  }
});

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLocal: null,
      currentDio: null,
      locais: null,
      dios: null,
      estados: null,
      cabos: null,
      open: '',
    };
    this.refreshToken = this.refreshToken.bind(this)
  }
  componentDidMount(){
    this.refreshToken()

  }
  async refreshToken(){
    const res = await refreshAccessToken()
    if (res !== 200){
      this.props.history.push('/login');
    }
  }
  toggleDrawer = (state, open) => () =>{
    this.setState({[state]:open});
  };
  setDio = (event) => {
    this.setState({currentDio: event.target.value})
  }
  setLocal = (event) => {
    this.setState({currentLocal: event.target.value, currentDio: null})
  }
  handleLogout = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Dashboard 
          currentLocal={this.state.currentLocal} 
          currentDio={this.state.currentDio} 
          toggleDrawer={this.toggleDrawer}
          handleLogout={this.handleLogout}
          >
          <LocalTab/>
          <DioTab />
          
        {this.state.currentDio ? 
          <TabelaPortas currentDio={this.state.currentDio} refreshToken={this.refreshToken}/> :
          < Typography>
            Nenhum Dio Selecionado
          </Typography>
        }
        </Dashboard>
        <Drawer 
          open={this.state.locais} 
          onClose={this.toggleDrawer('locais', false)}
          anchor='bottom'
          classes={{
            paperAnchorBottom: classes.drawerPaper
          }}
        >
          <Locais setLocal={this.setLocal} currentLocal={this.state.currentLocal} refreshToken={this.refreshToken}/>
        </Drawer>

        <Drawer 
          open={this.state.cabos} 
          onClose={this.toggleDrawer('cabos', false)}
          anchor='bottom'
          classes={{
            paperAnchorBottom: classes.drawerPaper
          }}
        >
          <Cabos refreshToken={this.refreshToken}/>
        </Drawer>

        <Drawer 
          open={this.state.estados} 
          onClose={this.toggleDrawer('estados', false)}
          anchor='bottom'
          classes={{
            paperAnchorBottom: classes.drawerPaper
          }}
        >
          <Estados refreshToken={this.refreshToken}/>
        </Drawer>

        <Drawer 
          open={this.state.dios} 
          onClose={this.toggleDrawer('dios', false)}
          anchor='bottom'
          classes={{
            paperAnchorBottom: classes.drawerPaper
          }}
        >
          <Dios setDio={this.setDio} currentDio={this.state.currentDio} currentLocal={this.state.currentLocal} refreshToken={this.refreshToken}/>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(App)