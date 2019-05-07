import {
  REQUESTING_ESTADOS, RECEIVE_ESTADOS,
  POST_ESTADO, POSTING_ESTADO,
  PATCH_ESTADO, PATCHING_ESTADO,
  DELETE_ESTADO, DELETING_ESTADO,
  INVALIDATE_ESTADOS
} from '../actions/estado-actions';
import {fromJS, set, merge, remove} from 'immutable';

const initialState = fromJS({
  didInvalidate: true,
  requesting: false,
  posting: false,
  deleting: false,
  itens: [],
})
export const estados = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTING_ESTADOS:
      return set(state, 'requesting', true);
    case  RECEIVE_ESTADOS:
      return merge(state, {
        requesting: false,
        itens: action.payload,
        didInvalidate: false,
      })
      
    case POST_ESTADO:
      let index = state.get('itens').findKey((estado) => {
        return estado.nome > action.payload.nome
      })
      const itens = state.get('itens').insert(index, action.payload)
      return merge(state, {itens: itens, posting:false})
    case POSTING_ESTADO:
      return set(state, 'posting', true);
    case PATCH_ESTADO:
      let itens = state.get('itens')
      let index = itens.findKey((estado) => {
        return estado.id === action.payload.id
      })
      remove(itens, index)
      index = itens.findKey((estado) => {
        return estado.nome > action.payload.nome
      })
      itens.insert(index, action.payload)
      return merge(state, {itens : itens, posting:false});
    case PATCHING_ESTADO:
      return set(state, 'posting', true);
    case DELETE_ESTADO:
      const itens = state.get('itens')
      const index = itens.findKey((estado) => {
        return estado.id === action.payload
      })
      return merge(state, {
        itens: remove(itens, index),
        deleting: false,
      })
    case DELETING_ESTADO:
      return set(state, 'deleting', true);
    
      case INVALIDATE_ESTADOS:
      return set(state, 'didInvalidate', true);
    default:
      return state
  }
}