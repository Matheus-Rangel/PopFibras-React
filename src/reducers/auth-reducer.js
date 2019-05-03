import {
  REFRESHING_TOKEN, REFRESH_EXPIRED,
  INVALID_TOKEN, SET_REFRESH_TOKEN, 
  SET_ACCESS_TOKEN, REQUESTING_LOGIN,
  LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT
} from '../actions/auth-actions';
const initialState = {
  refreshToken: '',
  accessToken: '',
  username: '',
  refreshExpired: false,
  tokenRefrehing: false,
  refreshingToken: false,
  invalidToken: true,
  requestingLogin: false,
  isLoggedIn: false,
  loginFailure: false,
}
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case REFRESHING_TOKEN:
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