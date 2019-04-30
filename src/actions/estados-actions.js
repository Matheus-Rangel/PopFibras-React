import {invalidToken} from './auth-actions';
import {apiGetEstados, apiPatchEstado, apiPostEstado, apiDeleteEstado} from '../services/fetch-estado';
export const REQUESTING_ESTADOS = 'REQUESTING_ESTADOS';
export const RECEIVE_ESTADOS = 'RECEIVE_ESTADOS';
export const PUT_ESTADO = 'PUT_ESTADO';
export const PUTTING_ESTADO = 'PUTTING_ESTADO';
export const DELETE_ESTADO = 'DELETE_ESTADO';
export const DELETING_ESTADO = 'DELETING_ESTADO';
export const INVALIDADE_ESTADOS = 'INVALIDATE_ESTADOS';

export const invalidateEstado = () => ({
  type: INVALIDADE_ESTADOS,
})
export const requestingEstados = (estados) => ({
  type: REQUESTING_ESTADOS,
  payload: estados,
});

export const receiveEstados = (estados) => ({
  type: RECEIVE_ESTADOS,
  payload: estados,
});

export const requestEstados = () => (dispatch, getState) => {
  const state = getState();
  if (state.portas.isFetching){
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
export const puttingEstado = () => ({
  type: PUTTING_ESTADO,
});
export const putEstado = (estado) => ({
  type: PUT_ESTADO,
  payload: estado,
});

export const createEstado = (estado) => dispatch => {
  dispatch(puttingEstado())
  return apiPostEstado(estado.nome, estado.observacao, estado.cor).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(putEstado(res.data))
  });
};
export const updateEstado = (estado) => dispatch => {
  dispatch(puttingEstado())
  return apiPatchEstado(estado.id, estado.nome, estado.observacao, estado.cor).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(putEstado(res.data))
  });
};

export const deleteEstado = (estado) => ({
  type: DELETE_ESTADO,
  payload: estado,
});
export const deletingEstado = (estado) => ({
  type: DELETING_ESTADO,
  payload: estado,
})
export const deleteEstado = (estado) => dispatch => {
  dispatch(deletingEstado(estado))
  return apiDeleteEstado(estado.id).then(res => {
    if(res.state !== 200){
      return dispatch(invalidToken())
    }
    return dispatch(deleteEstado(estado))
  });
};
