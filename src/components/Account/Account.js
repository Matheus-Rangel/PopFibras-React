import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  accountMenu: {
    position: 'absolute',
    height: 40,
    width: 30,
  }
});

class Account extends Component {
  state = {
    anchorEl: null,
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div>
          <Button color="inherit" onClick={this.handleClick}>
            <AccountCircleIcon />
            <Typography color='inherit'
              component="h1"
              variant="subtitle1"
              style={{ paddingLeft: 3 }}
            >
              Login
            </Typography>
          </Button>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            className={classes.accountMenu}
          >
            <MenuItem>
              <Typography color='inherit'
                component="h1"
                variant="subtitle1"
              >
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </React.Fragment>
    )
  }
}
Account.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Account);