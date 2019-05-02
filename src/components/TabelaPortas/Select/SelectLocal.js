import React, { Component } from 'react'
import { Select, MenuItem, LinearProgress } from '@material-ui/core';
import {getLocais} from '../../../services/FetchLocal'; 
export default class SelectLocal extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      loading: true,
    }
  }
  fetchData = async () => {
    this.setState({loading:true})
    let data = await getLocais();
    if (!data){
      await this.props.refreshToken();
      data = await getLocais();
    }
    console.log(data);
    this.setState({loading:false, data:data.locais});
  }
  componentDidMount(){
    this.fetchData();
  }
  render() {
    const {data} = this.state;
    return (
      <Select
        value={this.props.value}
        onChange={this.props.onChange}
        inputProps={{
          name: this.props.inputName,
        }}
      >
        {this.state.data ? 
          data.map((local) => (
            <MenuItem key={local.id} value={local.id}>
              <em>{local.nome}</em>
            </MenuItem>
            ))
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
