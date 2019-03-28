import React, { Component } from 'react';
import PropTypes, { number } from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import LocationOffIcon from '@material-ui/icons/LocationOff'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import { withStyles } from '@material-ui/core/styles';
import Local from './Local'
const styles = theme => ({
});
class Locais extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
    }
  }
  fetchLocais = () => {
    let token = localStorage.getItem('access_token')
    fetch('/locais',{
      headers: {
        Authorization : 'Bearer '+ token
      }
    }).then(res => {
      if (res.status == 401) {
        console.log(token)
        this.props.refreshToken();
        this.fetchLocais();
        return null;
      }else if(res.status == 500){
        return null
      }else{
        return res.json();
      }
    }).then( data => {
      if (!data){
        return null
      }
      data.locais.sort((a,b) => {
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
    this.fetchLocais()
  }
  render() {
    const { classes } = this.props;
    return (
      <List>
        {this.state.data ? this.state.data.locais.map(local => 
          (<Local refreshToken={this.props.refreshToken} key={local.id} data={local} fetch={this.fetchLocais}/>)): 
          <ListItem>
            <ListItemIcon>
              <LocationOffIcon />
            </ListItemIcon>
            <ListItemText>
              Nenhum Local Cadastrado
            </ListItemText>
          </ListItem>
        }
        <ListItem button>
          <ListItemIcon>
            <AddLocationIcon />
          </ListItemIcon>
          <ListItemText>
            Adicionar Local
          </ListItemText>
        </ListItem>
      </List>
    )
  }
}
Locais.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locais);
