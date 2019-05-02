import {invalidToken} from './auth-actions';
import {apiGetPortas, apiPatchPorta} from '../services/fetch-porta';

export const REQUESTING_PORTAS = 'REQUESTING_PORTAS';
export const RECEIVE_PORTAS = 'RECEIVE_PORTAS';
export const POST_PORTA = 'POST_PORTA';
export const POSTING_PORTA = 'POSTING_PORTA';
export const PATCH_PORTA = 'PATCH_PORTA';
export const PATCHING_PORTA = 'PATCHING_PORTA';
export const DELETE_PORTA = 'DELETE_PORTA';
export const DELETING_PORTA = 'DELETING_PORTA';
export const INVALIDADE_PORTAS = 'INVALIDATE_PORTAS';

export const invalidatePortas = (dioId) => ({
  type: INVALIDADE_PORTAS,
  dioId
});
export const requestingPortas = (dioId) => ({
  type: REQUESTING_PORTAS,
  dioId
});

export const receivePortas = (dioId, portas) => ({
  type: RECEIVE_PORTAS,
  payload: portas,
  dioId
});

export const requestPortas = (dioId) => (dispatch, getState) => {
  const state = getState();
  if (state.portas.get(dioId) && state.portas.get(dioId).isFetching){
    return
  }
  dispatch(requestingPortas(dioId))
  return apiGetPortas(state.auth.accessToken, dioId).then(res => {
      if (res.status !== 200){
        return dispatch(invalidToken())
      }else {
        return dispatch(receivePortas(dioId, res.data.portas))
      }
  });
}
export const patchingPorta = (dioId) => ({
  type: PATCHING_PORTA,
  dioId
});
export const patchPorta = (dioId, porta) => ({
  type: PATCH_PORTA,
  payload: porta,
  dioId
});
export const updatePorta = (dioId, id, estadoId, destinoId, bypassId, caboId, switchPorta, observacao) => (dispatch, getState) => {
  const state = getState()
  dispatch(patchingPorta())
  return apiPatchPorta(state.auth.accessToken, id, estadoId, destinoId, bypassId, caboId, switchPorta, observacao)
    .then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(patchPorta(dioId, res.data))
  });
};