import React, { Component } from 'react';
import PropTypes, { number } from 'prop-types';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Local from './Local';
import LocalAdd from './LocalAdd';
import {getLocais} from '../../services/FetchLocal';

const styles = theme => ({
});
class Locais extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
  }
  fetchData = async () => {
    let data = await getLocais(true)
    if (!data){
      await this.props.refreshToken()
      data = await getLocais(true)
    }
    this.setState({data:data})
  }
  componentDidMount(){
    this.fetchData()
  }
  render() {
    const { classes } = this.props;
    return (
      
      <List>
        { this.state.data &&
        this.state.data.locais.map(local => 
        (
        <Local 
          refreshToken={this.props.refreshToken} 
          key={local.id} 
          data={local} 
          list={this.state.data.locais} 
          fetch={this.fetchData}
          currentLocal={this.props.currentLocal}
          setLocal={this.props.setLocal}
          />
          ))
        }
        <LocalAdd 
          refreshToken={this.props.refreshToken} 
          fetch={this.fetchData} 
          list={this.state.data ? this.state.data.locais: null}/>
      </List>
    )
  }
}
Locais.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locais);
