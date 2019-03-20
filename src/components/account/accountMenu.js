import React, { Component } from 'react'
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core';
const styles = theme => ({
  accountMenu : {
    position: 'absolute',
    height: 40,
    width: 30,
  }
});
class AccountMenu extends Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.accountMenu}>
        <MenuItem>
          accountmenu
        </MenuItem>
      </div>
    )
  }
}
AccountMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountMenu);