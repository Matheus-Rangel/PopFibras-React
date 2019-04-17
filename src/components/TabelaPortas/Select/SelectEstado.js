import React, { Component } from 'react'
import { Select, MenuItem, LinearProgress } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {getEstados} from '../../../services/FetchEstado';

export default class SelectEstado extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:null,
      loading:true,
    }
  }
  async fetchData(){
    this.setState({loading:true})
    let data = await getEstados();
    if (!data){
      await this.props.refreshToken();
      data = await getEstados();
    }
    console.log(data);
    this.setState({loading:false, data:data.estados})
  }
  componentDidMount(){
    this.fetchData();
  }
  render() {
    return (
      <Select
        value={this.props.value}
        onChange={this.props.onChange}
        inputProps={{
          name: 'estadoId',
        }}
      >
      {this.state.loading ? 
        <MenuItem>
          <LinearProgress 
          variant='query'
          />
        </MenuItem>
        : this.state.data.map((e) => (
          <MenuItem key={e.id} value={e.id}>
            <DonutLargeIcon style={{color: e.cor, marginRight: '0.5rem'}} />
            <em>{e.nome}</em>
          </MenuItem>
        ))}
      </Select>
    )
  }
}
