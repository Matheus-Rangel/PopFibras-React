import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {TextField, Button, Dialog, DialogTitle,
DialogContent, DialogContentText, DialogActions} from '@material-ui/core'; 

import {deleteLocal} from '../../services/FetchLocal';
export default class DeleteDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      incorrectPassword: false,
      password: "",
    }
  }
  handlePassword = (event) => {
    this.setState({password:event.target.value});
  }

  handleDelete = async () => {
    this.setState({save:false})
    await this.props.refreshToken();
    let res = await deleteLocal(this.props.id, this.state.password);
    console.log(res)
    if (res === 401){
      await this.props.refreshToken();
      res = await deleteLocal(this.props.id, this.state.password);
    }
    if (res !== 200){
      this.setState({incorrectPassword:true});
      return null
    }
    this.props.onClose()
    this.props.fetch()
  }

  render() {
    return (
      <Dialog
          open={this.props.open}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Deletar Local</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ao deletar o local todas as informações sobre os DIOS presentes neste local também serão
              deletadas. Para deletar um local é necessario confirmar a sua senha:
            </DialogContentText>
            <TextField
              autoFocus
              error={this.state.incorrectPassword}
              margin="dense"
              name="password"
              label="Senha"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

DeleteDialog.propTypes = {
  id: PropTypes.number.isRequired,
  open: PropTypes.bool,
};