import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, Divider, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

import {getAccessToken} from '../../services/AccessToken';
const styles = theme => ({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // background: 'linear-gradient(120deg, #8a2387, #e94057, #f27121)',
  },
  divider: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  loginPaper: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: theme.spacing.unit * 50,
  },
  loginMenu: {
    margin: theme.spacing.unit * 3,
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
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleLogin = () => {
    if (this.state.loading){
      return null
    }
    this.setState({
      loading: true,
      serverError: false,
      incorrectCredencials: false,
    });
    getAccessToken(this.state.username, this.state.password).then(
      res => {
        if (res === 200){
          this.props.history.push('/')
        }else if(res === 401){
          this.setState({loading: false, incorrectCredencials: true, serverError: false})
        }else{
          this.setState({loading: false, serverError: true, incorrectCredencials: false})
        }
      }
    );
  }
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className={classes.background}></div>
        <Paper className={classes.loginPaper} elevation={4}>
          <div className={classes.loginMenu}>
            <Typography color='inherit' component="h1" variant="h3">
              PoP Fibras
            </Typography>
            <Divider className={classes.divider}/>
            <div className={classes.form}>
              {(this.state.serverError || this.state.incorrectCredencials) &&
                <FormHelperText error={true}>Usuario ou senha incorretos.</FormHelperText>
              }
              <FormControl margin="normal" required fullWidth error={this.state.incorrectCredencials || this.state.serverError}>
                <InputLabel htmlFor="username">Usuário</InputLabel>
                <Input id="username" name="username" autoFocus value={this.state.username} onChange={this.handleChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth error={this.state.incorrectCredencials || this.state.serverError}>
                <InputLabel htmlFor="password">Senha</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange} />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={this.state.loading}
                color="primary"
                className={classes.submit}
                onClick={this.handleLogin}
              >
                {this.state.loading ? 
                  <CircularProgress className={classes.progress} color="inherit" />:
                  'Entrar'
                }
              </Button>
            </div>
          </div>
        </Paper>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);