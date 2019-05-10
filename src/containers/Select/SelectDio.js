import {connect} from 'react-redux'
import SelectField from '../../components/SelectField'
import PropTypes from 'prop-types'

const mapStatetoProps = (state, ownProps) =>{
  const {dios} = state.getIn(['dios', ownProps.localId])
  return {
    data: dios
  }
}
const SelectDio = connect(mapStatetoProps)(SelectField)

SelectDio.propTypes = {
  requestData: PropTypes.func,
  value: PropTypes.number,
  onChange: PropTypes.func,
  inputName:PropTypes.string,
}

export default SelectDio