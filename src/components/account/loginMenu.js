import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { AccountContext } from './accountContext';
const styles = theme => ({
  loginMenu: {
    padding: theme.spacing.unit * 3
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '50', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
class LoginMenu extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.loginMenu}>
        <AccountContext.Consumer>
          {context => (
            <React.Fragment>
              <Typography component="h1" variant="h5">
                  Login
              </Typography>
              <div className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username">Usuário</InputLabel>
                  <Input id="username" name="username" autoFocus value={context.state.username} onChange={context.handleChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Senha</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" value={context.state.password} onChange={context.handleChange} />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={context.handleLogin}
                >
                  Entrar
              </Button>
              </div>
            </React.Fragment>
          )}
        </AccountContext.Consumer>
      </div>
    )
  }
}

LoginMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginMenu);