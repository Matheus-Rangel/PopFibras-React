import {
  logout,
  refreshToken,
  INVALID_TOKEN
} from '../actions/auth-actions';

let buffer = []; // create an empty array which will be populated with all actions dispatched by Redux

export const jwt = store => next => action => {
  buffer.push(action);
  if (action.type === INVALID_TOKEN) {
    let theStore = store.getState();
    if (
      theStore.auth &&
      theStore.auth.refreshToken
    ) {
      if (!theStore.auth.refreshingToken) {
        store.dispatch(refreshToken(theStore.auth.refreshToken)).then(() => {
          //get the action before the last INVALID_TOKEN (the one which got denied because of token expiration)
          let pos = buffer.map(e => e.type).indexOf('INVALID_TOKEN') - 1;
          // count back from the invalid token dispatch, and fire off the last dispatch again which was
          // a function. These are to be dispatched, and have the dispatch function passed through to them.
          for (var i = pos; i > -1; i -= 1) {
            if (typeof buffer[i] === 'function') {
              store.dispatch({
                type: 'RESEND',
                action: buffer[i](store.dispatch, store.getState)
              });
              break;
            }
          }
          buffer = [];
        });
      }
    }
  } else if (action.type === 'REFRESH_EXPIRED') {
    buffer = [];
    store.dispatch(logout());
  } else {
    if (buffer.length > 20) {
      //remove all items but keep the last 20 which forms the buffer, else the array would keep growing
      buffer.splice(0, buffer.length - 20);
    }
    return next(action);
  }
};