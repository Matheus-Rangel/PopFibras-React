import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import LoginMenu from './loginMenu'
import AccountMenu from './accountMenu'
import { AccountContext } from './accountContext';

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
    return (
      <AccountContext.Consumer>
        {context => (
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
              >
                {context.state.isLoggedIn ?
                  <AccountMenu /> : <LoginMenu />
                }
              </Menu>
            </div>
          </React.Fragment>
        )
        }
      </AccountContext.Consumer>
    )
  }
}

export default Account