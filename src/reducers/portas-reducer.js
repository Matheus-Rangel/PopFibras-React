import {
  REQUESTING_PORTAS, RECEIVE_PORTAS,
  PATCH_PORTA, PATCHING_PORTA, INVALIDATE_PORTAS
} from '../actions/portas-actions';
import {fromJS, set, merge, remove, isMap, setIn, Map} from 'immutable';
// As portas seram armazenazanados por dio em um mapa,
// A chave do mapa é o id do Local dos quais os portas pertencem.
function setPortas(state, dioId){
  let portas = get(state, dioId)
  if (!isMap(portas)){
    return set(state, dioId, fromJS({
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
export const portas = (state = initialState, action) => {
  const {dioId} = action
  state = setPortas(state, dioId)
  let dioPortas = get(state, dioId)
  switch (action.type) {
    case REQUESTING_PORTAS:
      return setIn(state, [dioId, 'requesting'], true);
    
    case  RECEIVE_PORTAS:
      dioPortas = merge(dioPortas, {requesting:false, itens:action.payload, didInvalidate:false})
      return set(state, dioId, dioPortas);
    
    case PATCH_PORTA:
      let itens = dioPortas.get('itens')
      let index = itens.findKey((porta) => {
        return porta.id === action.payload.id
      })
      return setIn(state, [dioId, 'itens', index], action.payload)
    
    case PATCHING_PORTA:
      return setIn(state, [dioId, 'posting'], true);
    
    case INVALIDATE_PORTAS:
      return setIn(state, [dioId, 'didInvalidate'], true);
    
    default:
      return state
  }
}