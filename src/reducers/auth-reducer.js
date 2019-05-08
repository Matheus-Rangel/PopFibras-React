import {
  REFRESHING_TOKEN, REFRESH_EXPIRED,
  INVALID_TOKEN, SET_REFRESH_TOKEN, 
  SET_ACCESS_TOKEN, REQUESTING_LOGIN,
  LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT
} from '../actions/auth-actions';
import {fromJS, set, merge} from 'immutable';
export const initialState = fromJS({
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
});

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case REFRESHING_TOKEN:
      return set(state, 'refreshingToken', true);
    case REFRESH_EXPIRED:
      return merge(state, {
        refreshExpired: true,
        refreshingToken: false,
      });
    case INVALID_TOKEN:
      return set(state, 'invalidToken', true);
    case SET_REFRESH_TOKEN:
      return set(state, 'refreshToken', action.refreshToken);
    case SET_ACCESS_TOKEN:
      return set(state, 'accessToken', action.accessToken);
    case REQUESTING_LOGIN:
      return set(state, 'requestingLogin', true);
    case LOGIN_SUCCESS:
      return set(state,'isLoggedIn', true);
    case LOGIN_FAILURE:
      return set(state, 'loginFailure', true);
    case LOGOUT:
      return merge(state, initialState);
    default:
      return state
  }
}