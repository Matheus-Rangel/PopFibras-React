import {refreshAccessToken, getAccessToken, invalidateAccessToken, invalidateRefreshToken} from '../services/access-token';

export const REFRESHED_TOKEN = 'AUTH_TOKEN_REFRESHED';
export const TOKEN_REFRESING = 'AUTH_REFRESHING_TOKEN';
export const REFRESH_EXPIRED = 'AUTH_REFRESH_EXPIRED';
export const INVALID_TOKEN = 'AUTH_INVALID_TOKEN';
export const SET_REFRESH_TOKEN = 'AUTH_SET_REFRESH_TOKEN'
export const SET_ACCESS_TOKEN = 'AUTH_SET_ACCESS_TOKEN'

export const invalidToken = () => ({
  type: INVALID_TOKEN
})

export const refreshExpired = () => ({
  type: REFRESH_EXPIRED
})

export const refreshedToken = () => ({
  type: REFRESHED_TOKEN
})

export const refreshingToken = () => ({
  type: REFRESHING_TOKEN
});

export const setRefreshToken = (refreshToken) => ({
  type: SET_REFRESH_TOKEN,
  refreshToken,
});

export const setAccessToken = (accessToken) => ({
  type: SET_ACCESS_TOKEN,
  accessToken,
});

export const tokenRefresh = () => (dispatch, getState) => {
  dispatch(refreshingToken())
  return refreshAccessToken(getState().auth.refreshToken).then(res => {
    if (res.status == 200){
      dispatch(setAccessToken(res.data.accessToken))
      dispatch(refreshedToken());
    }else{
      dispatch(refreshExpired());
    }
  });
}

export const REQUESTING_LOGIN = 'AUTH_REQUESTING_LOGIN';
export const LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'; 
export const LOGOUT = 'AUTH_LOGOUT';

export const requestingLogin = () => ({
  type: REQUESTING_LOGIN
});
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});
export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

export const requestLogin = (username, password, rememberToken) => dispatch => {
  dispatch(requestingLogin())
  return getAccessToken(username, password).then(res => {
    if (res.status == 200){
      if (rememberToken){
        localStorage.setItem('refreshToken', res.data.refreshToken);
      }
      dispatch(setAccessToken(res.data.accessToken));
      dispatch(setRefreshToken(res.data.refreshToken))
      dispatch(loginSuccess());
    }else{
      dispatch(loginFailure());
    }
  })
}

export const logout = () => (dispatch, getState) => {
  state = getState()
  invalidateAccessToken(state.auth.accessToken);
  invalidateRefreshToken(state.auth.refreshToken);
  return dispatch({type:LOGOUT});
}