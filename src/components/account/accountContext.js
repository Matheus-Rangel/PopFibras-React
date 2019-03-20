import React, { Component } from 'react'

export const AccountContext = React.createContext();

export default class AccountProvider extends Component {
  state = {
    isLoggedIn: false,
    failedLoggin: false,
    username: '',
    password: '',
  }
  handleChange = event => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleLogin = () => {
    fetch('http://localhost:5000/login',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    }).then( res => res.json()).then(data => 
        {
          if (data.username){
            this.setState(
              {
                accessToken: data.access_token,
                refresh_token: data.refresh_token,
                username: data.username,
                password: '',
                isLoggedIn: true,
                failedLoggin: false
              }
            )
          }else {
            this.setState(
              {
                password: '',
                isLoggedIn: false,
                failedLoggin: true,
                message: data.message
              }
            )
          }
          return null
        }
      )
  }
  render() {
    return (
      <AccountContext.Provider value={{
        state: this.state,
        handleLogin: this.handleLogin,
        handleChange: this.handleChange
      }}>
        {this.props.children}
      </AccountContext.Provider>
    )
  }
}
