import React, { Component } from 'react'
import { Select, MenuItem, LinearProgress } from '@material-ui/core';
import {getCabos} from '../../../services/FetchCabo'; 
export default class SelectLocal extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      loading: false,
    }
  }
  fetchData = async () => {
    this.setState({loading:true})
    let data = await getCabos();
    if (!data){
      await this.props.refreshToken();
      data = await getCabos();
    }
    console.log(data);
    this.setState({loading:false, data:data.cabos});
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
          data.map((cabo) => (
            <MenuItem key={cabo.id} value={cabo.id}>
              <em>{cabo.nome}</em>
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
