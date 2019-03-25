import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ListIcon from '@material-ui/icons/List';
import LinkIcon from '@material-ui/icons/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn'


class ListItems extends Component {
  handleClick = () => {
    console.log('oi');
  } 
  render() {
    return (
      <div>
        <ListItem button onClick={this.props.handleClick('locais', true)} name='locais'>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Locais" />
        </ListItem>
        <ListItem button onClick={this.props.handleClick('cabos', true)} name='cabos'>
          <ListItemIcon>
            <GroupWorkIcon />
          </ListItemIcon>
          <ListItemText primary="Cabos" />
        </ListItem>
        <ListItem button onClick={this.props.handleClick('estados', true)} name='estados_link'>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="Estados de Link" />
        </ListItem>
        <ListItem button onClick={this.props.handleClick('dios', true)} name='dios'>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Dios" />
        </ListItem>
      </div>
    )
  }
}

export default ListItems