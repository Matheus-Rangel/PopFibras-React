import React, { Component } from 'react'
import { Select, MenuItem, LinearProgress } from '@material-ui/core';
import {getPortas} from '../../../services/FetchPorta';

export default class SelectPorta extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      loading: true,
    }
  }
  fetchData = async () => {
    this.setState({loading:true})
    let data = await getPortas(this.props.dioId, true);
    if (!data){
      await this.props.refreshToken();
      data = await getPortas(this.props.dioId, true);
    }
    console.log(data);
    this.setState({loading:false, data:data});
  }
  componentDidMount(){
    if(this.props.dioId){
      this.fetchData();
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.dioId != this.props.dioId && this.props.dioId){
      this.fetchData();
    }
  }
  render() {
    return (
      <Select
        localId = {this.state.localDestinoId}
        value={this.state.portaDestinoId}
        onChange={this.handleChange}
        inputProps={{
          name: this.props.inputName,
        }}
        >
        {this.state.data ? 
        this.state.data.map((porta) => (
          <MenuItem key={porta.id} value={porta.id}>
            <em>porta.numero_porta</em>
          </MenuItem>))
        :
        <MenuItem>
          <LinearProgress 
          variant='query'
          />
        </MenuItem>
        }
      </Select>
    )
  }
}
