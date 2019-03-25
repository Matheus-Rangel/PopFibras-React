import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { access } from 'fs';

const styles = theme => ({
});
class Locais extends Component {
  
  componentDidMount(){
    token = localStorage.getItem('access_token')
  }
  render() {
    const { classes } = this.props;
    return (
      <div>Locais</div>
    )
  }
}
Locais.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locais);
