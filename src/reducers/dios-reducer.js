import {
  REQUESTING_DIOS, RECEIVE_DIOS,
  POST_DIO, POSTING_DIO, PATCH_DIO,
  PATCHING_DIO, DELETE_DIO, DELETING_DIO,
  DELETE_DIO_INVALID_PASSWORD, INVALIDATE_DIOS
} from '../actions/dios-actions';
import {fromJS, set, merge, remove, isMap, setIn, Map} from 'immutable';
// Os dios seram armazenazanados por local em um mapa,
// A chave do mapa é o id do Local dos quais os dios pertencem.
function setDios(state, localId){
  let dios = get(state, localId)
  if (!isMap(dios)){
    return set(state, localId, fromJS({
      didInvalidate: true,
      requesting: false,
      posting: false,
      deleting: false,
      deletingInvalidPassword: false,
      itens: []
    }))
  }
  return state
}
export const initialState = fromJS({})
export const dios = (state = initialState, action) => {
  const {localId} = action
  state = setDios(state, localId)
  let localDios = get(state, localId)
  switch (action.type) {
    case REQUESTING_DIOS:
      return setIn(state, [localId, 'requesting'], true);
    
    case  RECEIVE_DIOS:
      localDios = merge(localDios, {requesting:false, itens:action.payload, didInvalidate:false})
      return set(state, localId, localDios);
    
    case POST_DIO:
      let index = localDios.get('itens').findKey((dio) => {
        return dio.nome > action.payload.nome
      })
      const itens = localDios.get('itens').insert(index, action.payload)
      localDios = merge(localDios, {itens: itens, posting:false})
      return set(state, localId, localDios)
    
    case POSTING_DIO:
      return setIn(state, [localId, 'posting'], true)
    
    case PATCH_DIO:
      let itens = localDios.get('itens')
      let index = itens.findKey((dio) => {
        return dio.id === action.payload.id
      })
      remove(itens, index)
      index = itens.findKey((dio) => {
        return dio.nome > action.payload.nome
      })
      itens = itens.insert(index, action.payload)
      localDios = merge(localDios, {itens: itens, posting:false})
      return set(state, localId, localDios)

    case PATCHING_DIO:
      return setIn(state, [localId, 'posting'], true);
    
    case DELETE_DIO:
      const itens = localDios.get('itens')
      const index = itens.findKey((dio) => {
        return dio.id === action.payload
      })
      localDios = merge(localDios, {
        itens: remove(itens, index),
        deleting: false,
        deletingInvalidPassword: false,
      })
      return set(state, localId, localDios)
    
    case DELETING_DIO:
      return setIn(state, [localId, 'deleting'], true);
    
    case INVALIDATE_DIOS:
      return setIn(state, [localId, 'didInvalidate'], true);
    
    case DELETE_DIO_INVALID_PASSWORD:
      localDios = merge(localDios, {deletingInvalidPassword: true, deleting: false})
      return set(state, localId, localDios);
    
    default:
      return state
  }
}