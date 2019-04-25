import React, { Component } from 'react';
import getLocais from '../services/FetchLocal'

const LocalContext = React.createContext();

export default class LocalProvider extends Component {
  state = {
    list: null,
    status: 404,
    currentId: 0,
  }
  getLocais = () => {
    res = getLocais()
    this.setState({status: res.status})
    if (res.status == 200){
      this.setState({
        username:username, 
        accessToken:res.data.access_token, 
        refreshToken: res.data.refresh_token,
      });
      if (rememberMe){
        localStorage.setItem('refresh_token', data.refreshToken);
        localStorage.setItem('username', username);
      }
    }
  }

  refreshAccessToken = () => {
    if (!this.state.refreshToken){
      this.setState({status:401})
    }
    res = refreshAccessToken(this.state.refreshToken);
    this.setState({status: res.status});
    if (res.status == 200){
      this.setState({accessToken:res.data.access_token});
    }
  }
  removeTokens = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.setState({status:401, username: null, accessToken:null, refreshToken:null})
  }
  render() {
    return (
      <LocalContext.Provider value={{
        state: this.state,
        getAccessToken: this.getAccessToken,
        removeTokens: this.removeTokens,
        refreshAccessToken: this.refreshAccessToken,
      }}>
        {this.props.children}
      </LocalContext.Provider>
    )
  }
}
