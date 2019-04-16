import React, { Component } from 'react';
import { List } from '@material-ui/core';
import CaboAdd from './CaboAdd';
import Cabo from './Cabo';
import {getCabos} from '../../services/FetchCabo';
class Cabos extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
  }
  fetchData = async () => {
    let res = await getCabos(); 
    if (!res) {
      await this.props.refreshToken();
      res = await getCabos();
    }
    this.setState({data:res});
  }

  componentDidMount(){
    this.fetchData()
  }
  render() {
    return (
      <List>
        { this.state.data &&
          this.state.data.cabos.map(cabo => 
          (<Cabo 
            refreshToken={this.props.refreshToken} 
            key={cabo.id} 
            data={cabo} 
            list={this.state.data.cabos} 
            fetch={this.fetchData}/>))
        }
        <CaboAdd refreshToken={this.props.refreshToken} fetch={this.fetchData} list={this.state.data ? this.state.data.cabos : []} data={this.state.data}/>
      </List>
    )
  }
}

export default Cabos