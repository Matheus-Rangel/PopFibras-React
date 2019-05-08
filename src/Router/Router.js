import React from 'react';
import PropTypes from 'prop-types'
import Login from '../pages/Login';
import Main from '../pages/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {Provider} from 'react-redux'

export default function Router({store}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/login" component={Login} />
        </Switch>
      </ BrowserRouter>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
