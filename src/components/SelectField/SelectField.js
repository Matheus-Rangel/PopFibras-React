import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select, MenuItem, LinearProgress } from '@material-ui/core'
class SelectField extends Component {
  componentDidMount(){
    if (this.props.data.didInvalidate){
      this.props.requestData()
    }
  }
  render() {
    const {itens, requesting} = this.props.data;
    return (
      <Select
        value={this.props.value}
        onChange={this.props.onChange}
        inputProps={{
          nome: this.props.inputName,
        }}
      >
        {requesting ?  
          <LinearProgress variant='query'/>: 
          itens.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <em>{item.nome}</em>
            </MenuItem>
          ))
        }
      </Select>
    )
  }
}
SelectField.propTypes = {
  requestData: PropTypes.func,
  value: PropTypes.number,
  onChange: PropTypes.func,
  inputName:PropTypes.string,
  data: PropTypes.shape({
    requesting:PropTypes.bool,
    didInvalidate:PropTypes.bool,
    itens:PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      nome: PropTypes.string,
    }))
  })
}
export default SelectField