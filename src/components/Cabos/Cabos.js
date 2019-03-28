import React, { Component } from 'react'
import { List } from '@material-ui/core';
import CaboAdd from './CaboAdd'
import Cabo from './Cabo'
class Cabos extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
  }
  fetchCabos = () => {
    let token = localStorage.getItem('access_token')
    fetch('/cabos',{
      headers: {
        Authorization : 'Bearer '+ token
      }
    }).then(res => {
      if (res.status == 401) {
        this.props.refreshToken();
        this.fetchCabos();
        return null;
      }else if(res.status == 500){
        console.log(res)
        return null
      }else{
        return res.json();
      }
    }).then( data => {
      if (!data){
        return null
      }
      data.cabos.sort((a,b) => {
        if (a.nome > b.nome) {
          return 1;
        }
        if (a.nome < b.nome) {
          return -1;
        }
        return 0;
      })
      this.setState({data:data});
      return null;
    });
  }
  componentDidMount(){
    this.fetchCabos()
  }
  render() {
    return (
      <List>
        { this.state.data &&
          this.state.data.cabos.map(cabo => 
          (<Cabo refreshToken={this.props.refreshToken} key={cabo.id} data={cabo} fetch={this.fetchCabos}/>))
        }
        <CaboAdd refreshToken={this.props.refreshToken} fetch={this.fetchCabos} data={this.state.data}/>
      </List>
    )
  }
}

export default Cabos