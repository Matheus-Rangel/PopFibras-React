import React, { Component } from 'react';
import Dashboard from '../Dashboard'
import Locais from '../Locais'
import {Route, Redirect} from 'react-router-dom';
import { access } from 'fs';
class App extends Component {
  constructor(props){
    super(props)
    state = {
      isLoggedIn: true,
      locais: true,
    };
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (<Redirect to='/' />)
    }
    return (
      <div>
        <Dashboard>
          <Route path="/locais" exact={true} component={Locais} />
          <Route path="/cabos" exact={true} component={Locais} />
          <Route path="/estados-link" exact={true} component={Locais} />
          <Route path="/dios" exact={true} component={Locais} />
          <Portas expand={Dios}/>
        </Dashboard> : 
        <Redirect to='/login'/>
      </div>
    );
  }
}

export default App;
