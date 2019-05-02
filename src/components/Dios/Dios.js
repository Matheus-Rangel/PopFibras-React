import React, { Component } from 'react';
import PropTypes, { number } from 'prop-types';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Dio from './Dio';
import DioAdd from './DioAdd';
import { ListSubheader } from '@material-ui/core';
import {getLocal} from '../../services/FetchLocal';
const styles = theme => ({
});
class Dios extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
  }
  fetchDios = async () => {
    let data = await getLocal(this.props.currentLocal);
    if (!data) {
      await this.props.refreshToken();
      data = await getLocal(this.props.currentLocal);
    }
    this.setState({data:data});
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
