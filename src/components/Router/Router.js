import React from 'react';
import App from '../App';
import Login from '../Login'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/login" component={Login} />
      </Switch>
    </ BrowserRouter>
  )
}
