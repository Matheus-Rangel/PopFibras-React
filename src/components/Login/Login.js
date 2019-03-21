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
import { withRouter } from 'react-router-dom'
import ls from 'local-storage'
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
class Login extends Component {
  state = {
    username: '',
    password: '',
    incorrectCredencials: false,
    serverError: false,
    loading: false,
  }
  handleChange = event => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleLogin = () => {
    fetch('/login',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    }
    ).then( res => {
        if(res.status == 200){
          this.setState({incorrectCredencials:false, serverError:false});
          return res.json();
        }else if(res.status == 401){
          this.setState({incorrectCredencials:true});
          return null;
        }
        else{
          this.setState({serverError:true});
          return null;
        }
      }
    ).then(data => {
        if (!data){
          return null
        }
        ls.setItem('username', data.username);
        ls.setItem('access_token', data.access_token);
        ls.setItem('refresh_token', data.refresh_token);
        return null
      }
    )
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.loginMenu}>
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);