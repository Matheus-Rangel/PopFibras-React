import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
import {deleteCabo} from '../../services/FetchCabo';
export default class DeleteDialog extends Component {

  handleDelete = async () => {
    let res = await deleteCabo(this.props.id);
    if (res === 401){
      this.props.refreshToken();
      res = await deleteCabo(this.props.id);
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
        <DialogTitle id="form-dialog-title">Deletar Cabo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ao deletar um cabo todas as portas associadas a esse cabo ficaram sem associação.
            </DialogContentText>
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