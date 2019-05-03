import {
  REQUESTING_CABOS, RECEIVE_CABOS,
  POST_CABO, POSTING_CABO,
  PATCH_CABO, PATCHING_CABO,
  DELETE_CABO, DELETING_CABO,
  INVALIDADE_CABOS
} from '../actions/cabos-actions';
const initialState = {
  didInvalidate: true,
  requesting: false,
  posting: false,
  deleting: false,
  itens: [],
}
export const cabos = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTING_CABOS:
      return {
        ...state,
        refreshingToken:true
      }
    case REFRESH_EXPIRED:
      return {
        ...state,
        refreshExpired: true,
        refreshingToken: false,
      }
    case INVALID_TOKEN:
      return {
        ...state,
        invalidToken:true
      }
    case SET_REFRESH_TOKEN:
      return{
        ...state,
        refreshToken: action.refreshToken
      }
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken:action.accessToken,
      }
    case REQUESTING_LOGIN:
      return {
        ...state,
        requestingLogin: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loginFailure: true,
      }
    case LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}