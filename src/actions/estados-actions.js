import {invalidToken} from './auth-actions';
import {apiGetEstados, apiPatchEstado, apiPostEstado, apiDeleteEstado} from '../services/fetch-estado';
export const REQUESTING_ESTADOS = 'REQUESTING_ESTADOS';
export const RECEIVE_ESTADOS = 'RECEIVE_ESTADOS';
export const POST_ESTADO = 'POST_ESTADO';
export const POSTING_ESTADO = 'POSTING_ESTADO';
export const PATCH_ESTADO = 'PATCH_ESTADO';
export const PATCHING_ESTADO = 'PATCHING_ESTADO';
export const DELETE_ESTADO = 'DELETE_ESTADO';
export const DELETING_ESTADO = 'DELETING_ESTADO';
export const INVALIDADE_ESTADOS = 'INVALIDATE_ESTADOS';

export const invalidateEstado = () => ({
  type: INVALIDADE_ESTADOS,
});
export const requestingEstados = () => ({
  type: REQUESTING_ESTADOS,
});

export const receiveEstados = (estados) => ({
  type: RECEIVE_ESTADOS,
  payload: estados,
});

export const requestEstados = () => (dispatch, getState) => {
  const state = getState();
  if (state.estados.isFetching){
    return
  }
  return apiGetEstados(state.auth.accessToken).then(res => {
      if (res.status !== 200){
        return dispatch(invalidToken())
      }else {
        return dispatch(receiveEstados(res.data.estados))
      }
  });
}
export const patchingEstado = () => ({
  type: PATCHING_ESTADO,
});
export const patchEstado = (estado) => ({
  type: PATCH_ESTADO,
  payload: estado,
});
export const postingEstado = () => ({
  type: POSTING_ESTADO,
});
export const postEstado = (estado) => ({
  type: POST_ESTADO,
  payload: estado,
});
export const createEstado = (nome, observacao, cor) => (dispatch, getState) => {
  const state = getState()
  dispatch(postingEstado())
  return apiPostEstado(state.auth.accessToken, nome, observacao, cor).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(postEstado(res.data))
  });
};
export const updateEstado = (id, nome, observacao, cor ) => (dispatch, getState) => {
  const state = getState()
  dispatch(patchingEstado())
  return apiPatchEstado(state.auth.accessToken, id, nome, observacao, cor).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(patchEstado(res.data))
  });
};

export const _deleteEstado = (id) => ({
  type: DELETE_ESTADO,
  payload: id,
});
export const deletingEstado = (id) => ({
  type: DELETING_ESTADO,
  payload: id,
})
export const deleteEstado = (id) => (dispatch, getState) => {
  const state = getState()
  dispatch(deletingEstado(id))
  return apiDeleteEstado(state.auth.accessToken, id).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(_deleteEstado(id))
  });
};
