import {
  REQUESTING_CABOS, RECEIVE_CABOS,
  POST_CABO, POSTING_CABO,
  PATCH_CABO, PATCHING_CABO,
  DELETE_CABO, DELETING_CABO,
  INVALIDATE_CABOS
} from '../actions/cabos-actions';
import {fromJS, set, merge, remove} from 'immutable';

export const initialState = fromJS({
  didInvalidate: true,
  requesting: false,
  posting: false,
  deleting: false,
  itens: [],
})
export const cabos = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTING_CABOS:
      return set(state, 'requesting', true);
    case  RECEIVE_CABOS:
      return merge(state, {
        requesting: false,
        itens: action.payload,
        didInvalidate: false,
      }) 
      
    case POST_CABO:
      let index = state.get('itens').findKey((cabo) => {
        return cabo.nome > action.payload.nome
      })
      const itens = state.get('itens').insert(index, action.payload)
      return merge(state, {itens: itens, posting:false})
    case POSTING_CABO:
      return set(state, 'posting', true);
    case PATCH_CABO:
      let itens = state.get('itens')
      let index = itens.findKey((cabo) => {
        return cabo.id === action.payload.id
      })
      remove(itens, index)
      index = itens.findKey((cabo) => {
        return cabo.nome > action.payload.nome
      })
      itens.insert(index, action.payload)
      return merge(state, {itens : itens, posting:false});
    case PATCHING_CABO:
      return set(state, 'posting', true);
    case DELETE_CABO:
      const itens = state.get('itens')
      const index = itens.findKey((cabo) => {
        return cabo.id === action.payload
      })
      return merge(state, {
        itens: remove(itens, index),
        deleting: false,
      })
    case DELETING_CABO:
      return set(state, 'deleting', true);
    
      case INVALIDATE_CABOS:
      return set(state, 'didInvalidate', true);
    default:
      return state
  }
}