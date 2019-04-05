import React, { Component } from 'react';
import PropTypes, { number } from 'prop-types';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Dio from './Dio'
import DioAdd from './DioAdd';
import { ListSubheader } from '@material-ui/core';
const styles = theme => ({
});
class Dios extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
  }
  fetchDios = () => {
    let token = localStorage.getItem('access_token')
    fetch('/local?id='+this.props.currentLocal,{
      headers: {
        Authorization : 'Bearer '+ token
      },
    }).then(res => {
      if (res.status == 401) {
        console.log(token)
        this.props.refreshToken().then((success) => (success ? this.fetchDios() : null));
        return null;
      }else if(res.status == 500){
        return null
      }else{
        return res.json();
      }
    }).then( data => {
      console.log(data)
      if (!data){
        return null
      }
      data.dios.sort((a,b) => {
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
    if (this.props.currentLocal){
      this.fetchDios()
    }
  }
  render() {
    const { classes } = this.props;
    return (
      
      <List subheader={<ListSubheader>{this.state.data ? this.state.data.nome : 'Nenhum Local Selecionado'}</ListSubheader>}>
        { this.state.data &&
        this.state.data.dios.map(dio => 
        (
        <Dio 
          refreshToken={this.props.refreshToken} 
          key={dio.id} 
          data={dio}
          list={this.state.data.dios} 
          fetch={this.fetchDios}
          currentDio={this.props.currentDio}
          setDio={this.props.setDio}
          />
          ))
        }
        { this.state.data && 
        <DioAdd refreshToken={this.props.refreshToken} fetch={this.fetchDios} currentLocal={this.props.currentLocal} list={this.state.data ? this.state.data.dios: null}/>
        }
      </List>
    )
  }
}
Dios.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dios);
