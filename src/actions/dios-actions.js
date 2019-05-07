import {invalidToken} from './auth-actions';
import {apiGetDios, apiPatchDio, apiPostDio, apiDeleteDio} from '../services/fetch-dio';
export const REQUESTING_DIOS = 'REQUESTING_DIOS';
export const RECEIVE_DIOS = 'RECEIVE_DIOS';
export const POST_DIO = 'POST_DIO';
export const POSTING_DIO = 'POSTING_DIO';
export const PATCH_DIO = 'PATCH_DIO';
export const PATCHING_DIO = 'PATCHING_DIO';
export const DELETE_DIO = 'DELETE_DIO';
export const DELETING_DIO = 'DELETING_DIO';
export const DELETE_DIO_INVALID_PASSWORD = 'DELETE_DIO_INVALID_PASSWORD';
export const INVALIDATE_DIOS = 'INVALIDATE_DIOS';

export const invalidateDios = (localId) => ({
  type: INVALIDATE_DIOS,
  localId
});
export const requestingDios = (localId) => ({
  type: REQUESTING_DIOS,
  localId
});

export const receiveDios = (localId, dios) => ({
  type: RECEIVE_DIOS,
  payload: dios,
  localId
});

export const requestDios = (localId) => (dispatch, getState) => {
  const state = getState();
  if (state.dios.get(localId) && state.dios.get(localId).isFetching){
    return
  }
  dispatch(requestingDios(localId))
  return apiGetDios(state.auth.accessToken, localId).then(res => {
      if (res.status !== 200){
        return dispatch(invalidToken())
      }else {
        return dispatch(receiveDios(localId, res.data.dios))
      }
  });
}
export const patchingDio = (localId) => ({
  type: PATCHING_DIO,
  localId
});
export const patchDio = (localId, dio) => ({
  type: PATCH_DIO,
  payload: dio,
  localId
});
export const postingDio = (localId) => ({
  type: POSTING_DIO,
  localId
});
export const postDio = (localId, dio) => ({
  type: POST_DIO,
  payload: dio,
  localId
});
export const createDio = (localId, nome, observacao, quantidadePortas) => (dispatch, getState) => {
  const state = getState()
  dispatch(postingDio(localId));
  return apiPostDio(state.auth.accessToken, localId, nome, observacao, quantidadePortas).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(postDio(localId, res.data));
  });
};
export const updateDio = (localId, id, nome, observacao, quantidadeFibras) => (dispatch, getState) => {
  const state = getState()
  dispatch(patchingDio())
  return apiPatchDio(state.auth.accessToken, id, nome, observacao, quantidadeFibras)
    .then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(patchDio(localId, res.data))
  });
};

const _deleteDio = (localId, id) => ({
  type: DELETE_DIO,
  payload: id,
  localId,
});

export const deletingDio = (localId, id) => ({
  type: DELETING_DIO,
  payload: id,
  localId,
});
export const deleteDioInvalidPassword = (localId, id) => ({
  type: DELETE_DIO_INVALID_PASSWORD,
  payload: id,
  localId
})
export const deleteDio = (localId, id, password) => (dispatch, getState) => {
  const state = getState()
  dispatch(deletingDio(id))
  return apiDeleteDio(state.auth.accessToken, id, password).then(res => {
    if (res.status === 412) {
      return dispatch(deleteDioInvalidPassword(localId, id))
    }
    else if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(_deleteDio(localId, id))
  });
};
