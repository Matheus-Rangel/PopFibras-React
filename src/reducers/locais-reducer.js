import {
  REQUESTING_LOCAIS, RECEIVE_LOCAIS,
  POST_LOCAL, POSTING_LOCAL,
  PATCH_LOCAL, PATCHING_LOCAL,
  DELETE_LOCAL, DELETING_LOCAL,
  INVALIDATE_LOCAIS, DELETE_LOCAL_INVALID_PASSWORD
} from '../actions/locais-actions';
import {fromJS, set, merge, remove} from 'immutable';

const initialState = fromJS({
  didInvalidate: true,
  requesting: false,
  posting: false,
  deleting: false,
  deleteInvalidPassword: false,
  itens: [],
})
export const locais = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTING_LOCAIS:
      return set(state, 'requesting', true)
    
    case  RECEIVE_LOCAIS:
      return merge(state, {
        requesting: false,
        itens: action.payload,
        didInvalidate: false,
      }) 
      
    case POST_LOCAL:
      let index = state.get('itens').findKey((local) => {
        return local.nome > action.payload.nome
      })
      const itens = state.get('itens').insert(index, action.payload)
      return merge(state, {itens: itens, posting:false})
    
    case POSTING_LOCAL:
      return set(state, 'posting', true)
    
    case PATCH_LOCAL:
      let itens = state.get('itens')
      let index = itens.findKey((local) => {
        return local.id === action.payload.id
      })
      remove(itens, index)
      index = itens.findKey((local) => {
        return local.nome > action.payload.nome
      })
      itens.insert(index, action.payload)
      return merge(state, {itens : itens, posting:false})
    
    case PATCHING_LOCAL:
      return set(state, 'posting', true)
    
    case DELETE_LOCAL:
      const itens = state.get('itens')
      const index = itens.findKey((local) => {
        return local.id === action.payload
      })
      return merge(state, {
        itens: remove(itens, index),
        deleting: false,
        deleteInvalidPassword: false,
      })
    
    case DELETING_LOCAL:
      return merge(state, 'deleting', true);
    
    case INVALIDATE_LOCAIS:
      return set(state, 'didInvalidate', true);
    
    case DELETE_LOCAL_INVALID_PASSWORD:
      return merge(state, {deleting:false, deletingInvalidPassword:true})
    
    default:
      return state
  }
}