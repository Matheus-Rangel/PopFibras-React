import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ListIcon from '@material-ui/icons/List';
import LinkIcon from '@material-ui/icons/Link';
import LocationOnIcon from '@material-ui/icons/LocationOn'
export default function ListItems(props) {
  return (
    <div>
      <ListItem button onClick={props.handleClick} name='locais'>
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Locais" />
      </ListItem>
      <ListItem button onClick={props.handleClick} name='cabos'>
        <ListItemIcon>
          <GroupWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Cabos" />
      </ListItem>
      <ListItem button onClick={props.handleClick} name='estados_link'>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary="Estados de Link" />
      </ListItem>
      <ListItem button onClick={props.handleClick} name='dios'>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Dios" />
      </ListItem>
    </div>
  )
}