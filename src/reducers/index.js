import { applyMiddleware, createStore} from 'redux';
import {
  combineReducers
} from 'redux-immutable';
import {auth, initialState as authState} from './auth-reducer';
import {cabos, initialState as cabosState} from './cabos-reducer';
import {dios, initialState as diosState} from './dios-reducer';
import {estados, initialState as estadosState} from './estados-reducer';
import {locais, initialState as locaisState} from './locais-reducer';
import {portas, initialState as portasState} from './portas-reducer';
import { fromJS } from 'immutable';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import jwtrefresh from '../middleware/jwt-refresh'

const defaultState = fromJS({
  auth: authState,
  cabos: cabosState,
  dios: diosState,
  estados: estadosState,
  locais: locaisState,
  portas: portasState,
})

const rootReducer = combineReducers({
  auth, cabos, dios, estados, locais, portas
}, defaultState)

const store = createStore(
  rootReducer,
  applyMiddleware([thunk, logger, jwtrefresh])
)
export default store 