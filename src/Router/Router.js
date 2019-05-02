import React from 'react';
import App from '../App';
import Login from '../pages/Login';
import Main from '../pages/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserProvider from '../context/UserProvider'
export default function Router() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/login" component={Login} />
        </Switch>
      </ BrowserRouter>
    </UserProvider>
  );
}
