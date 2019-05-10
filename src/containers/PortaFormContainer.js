import {requestPorta, updatePorta} from '../actions/portas-actions'

mapStateToProps = (state, ownProps) => ({
  porta: state.getIn(['portas', ownProps.dioId, ownProps.portaId]),
  didInvalidate: state.getIn(['portas', ownProps.dioId, didInvalidate])
})
mapDispatchToProps = (dispatch, ownProps) => {
  requestData: () => dispatch(requestPorta(ownProps.dioId));
  save: (estadoId, destinoId, bypassId, caboId, switchPorta, observacao) =>
    dispatch(updatePorta(ownProps.dioId, ownProps.porta.id, estadoId, destinoId, bypassId, caboId, switchPorta,observacao))
}

export default