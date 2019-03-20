import React, { Component } from 'react';
import './app.css';
import Dashboard from '../dashboard/dashboard'
import Locais from '../locais/locais'
import AccountProvider from '../account/accountContext';
class App extends Component {
  state = {
    isloggedin: false,
    locais: true,
  };
  render() {
    return (
      <div>
        <AccountProvider>
        <Dashboard>
          <Locais expand={this.state.locais}/>
        </Dashboard>
        </AccountProvider>
      </div>
    );
  }
}

export default App;
