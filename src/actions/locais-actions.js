import {invalidToken} from './auth-actions';
import {apiGetLocais, apiPatchLocal, apiPostLocal, apiDeleteLocal} from '../services/fetch-local';
export const REQUESTING_LOCAIS = 'REQUESTING_LOCAIS';
export const RECEIVE_LOCAIS = 'RECEIVE_LOCAIS';
export const POST_LOCAL = 'POST_LOCAL';
export const POSTING_LOCAL = 'POSTING_LOCAL';
export const PATCH_LOCAL = 'PATCH_LOCAL';
export const PATCHING_LOCAL = 'PATCHING_LOCAL';
export const DELETE_LOCAL = 'DELETE_LOCAL';
export const DELETING_LOCAL = 'DELETING_LOCAL';
export const DELETE_LOCAL_INVALID_PASSWORD = 'DELETE_LOCAL_INVALID_PASSWORD'
export const INVALIDADE_LOCAIS = 'INVALIDATE_LOCAIS';

export const invalidateLocal = () => ({
  type: INVALIDADE_LOCAIS,
});
export const requestingLocais = () => ({
  type: REQUESTING_LOCAIS,
});

export const receiveLocais = (locais) => ({
  type: RECEIVE_LOCAIS,
  payload: locais,
});

export const requestLocais = () => (dispatch, getState) => {
  const state = getState();
  if (state.locais.isFetching){
    return
  }
  return apiGetLocais(state.auth.accessToken).then(res => {
      if (res.status !== 200){
        return dispatch(invalidToken())
      }else {
        return dispatch(receiveLocais(res.data.locais))
      }
  });
}
export const patchingLocal = () => ({
  type: PATCHING_LOCAL,
});
export const patchLocal = (local) => ({
  type: PATCH_LOCAL,
  payload: local,
});
export const postingLocal = () => ({
  type: POSTING_LOCAL,
});
export const postLocal = (local) => ({
  type: POST_LOCAL,
  payload: local,
});
export const createLocal = (nome, observacao) => (dispatch, getState) => {
  const state = getState()
  dispatch(postingLocal());
  return apiPostLocal(state.auth.accessToken, nome, observacao).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(postLocal(res.data));
  });
};
export const updateLocal = (id, nome, observacao, quantidadeFibras) => (dispatch, getState) => {
  const state = getState()
  dispatch(patchingLocal())
  return apiPatchLocal(state.auth.accessToken, id, nome, observacao, quantidadeFibras)
    .then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(patchLocal(res.data))
  });
};

const _deleteLocal = (id) => ({
  type: DELETE_LOCAL,
  payload: id,
});

export const deletingLocal = (id) => ({
  type: DELETING_LOCAL,
  payload: id,
});

export const deleteLocalInvalidPassword = (id) => ({
  type: DELETE_LOCAL_INVALID_PASSWORD,
  payload: id,
})
export const deleteLocal = (id, password) => (dispatch, getState) => {
  const state = getState()
  dispatch(deletingLocal(id))
  return apiDeleteLocal(state.auth.accessToken, id, password).then(res => {
    if(res.state === 412){
      return dispatch(deleteLocalInvalidPassword(id))
    }
    else if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(_deleteLocal(id))
  });
};
