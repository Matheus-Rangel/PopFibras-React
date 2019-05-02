import {invalidToken} from './auth-actions';
import {apiGetCabos, apiPatchCabo, apiPostCabo, apiDeleteCabo} from '../services/fetch-cabo';
export const REQUESTING_CABOS = 'REQUESTING_CABOS';
export const RECEIVE_CABOS = 'RECEIVE_CABOS';
export const POST_CABO = 'POST_CABO';
export const POSTING_CABO = 'POSTING_CABO';
export const PATCH_CABO = 'PATCH_CABO';
export const PATCHING_CABO = 'PATCHING_CABO';
export const DELETE_CABO = 'DELETE_CABO';
export const DELETING_CABO = 'DELETING_CABO';
export const INVALIDADE_CABOS = 'INVALIDATE_CABOS';

export const invalidateCabo = () => ({
  type: INVALIDADE_CABOS,
});
export const requestingCabos = () => ({
  type: REQUESTING_CABOS,
});

export const receiveCabos = (cabos) => ({
  type: RECEIVE_CABOS,
  payload: cabos,
});

export const requestCabos = () => (dispatch, getState) => {
  const state = getState();
  if (state.cabos.isFetching){
    return
  }
  return apiGetCabos(state.auth.accessToken).then(res => {
      if (res.status !== 200){
        return dispatch(invalidToken())
      }else {
        return dispatch(receiveCabos(res.data.cabos))
      }
  });
}
export const patchingCabo = () => ({
  type: PATCHING_CABO,
});
export const patchCabo = (cabo) => ({
  type: PATCH_CABO,
  payload: cabo,
});
export const postingCabo = () => ({
  type: POSTING_CABO,
});
export const postCabo = (cabo) => ({
  type: POST_CABO,
  payload: cabo,
});
export const createCabo = (nome, observacao, quantidadeFibras) => (dispatch, getState) => {
  const state = getState()
  dispatch(postingCabo());
  return apiPostCabo(state.auth.accessToken, nome, observacao, quantidadeFibras).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(postCabo(res.data));
  });
};
export const updateCabo = (id, nome, observacao, quantidadeFibras) => (dispatch, getState) => {
  const state = getState()
  dispatch(patchingCabo())
  return apiPatchCabo(state.auth.accessToken, id, nome, observacao, quantidadeFibras)
    .then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(patchCabo(res.data))
  });
};

const _deleteCabo = (id) => ({
  type: DELETE_CABO,
  payload: id,
});

export const deletingCabo = (id) => ({
  type: DELETING_CABO,
  payload: id,
});

export const deleteCabo = (id) => (dispatch, getState) => {
  const state = getState()
  dispatch(deletingCabo(id))
  return apiDeleteCabo(state.auth.accessToken, id).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(_deleteCabo(id))
  });
};
