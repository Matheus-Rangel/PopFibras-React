import React, { Component } from 'react'
import { getAccessToken, refreshAccessToken } from '../services/AccessToken';
import { access } from 'fs';

const UserContext = React.createContext();

export default class UserProvider extends Component {
  state = {
    username: localStorage.getItem('username'),
    accessToken: null,
    refreshToken: localStorage.getItem('refresh_token'),
    status: 0,
    timerID: null,
  }
  getAccessToken = (username, password, rememberMe) => {
    const res = getAccessToken(username, password)
    this.setState({status: res.status})
    if (res.status == 200){
      timerID = setInterval(this.refreshAccessToken,14 * 60 * 1000)
      this.setState({
        username:username, 
        accessToken:res.data.access_token, 
        refreshToken: res.data.refresh_token,
        timerID: timerID,
      });
      localStorage.setItem('access_token', res.data.access_token);
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
    refreshAccessToken(this.state.refreshToken).then(res => {
      this.setState({status: res.status});
      if (res.status == 200){
        this.setState({accessToken:res.data.access_token});
        localStorage.setItem('access_token', res.data.access_token);
        if(!this.state.timerID){
          this.setState({timerID:setInterval(this.refreshAccessToken,14 * 60 * 1000)})
        }
      }
    });
  }
  removeTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.setState({status:401, username: null, accessToken:null, refreshToken:null})
  }
  componentDidMount() {
    this.refreshAccessToken();
  }
  componentWillUnmount(){
    clearInterval(this.state.timerID);
  }
  render() {
    return (
      <UserContext.Provider value={{
        state: this.state,
        getAccessToken: this.getAccessToken,
        removeTokens: this.removeTokens,
        refreshAccessToken: this.refreshAccessToken,
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
