import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  TextField, Button, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
export default class DeleteDialog extends Component {

  handleDelete = () => {
    this.setState({ save: false })
    let token = localStorage.getItem('access_token')
    fetch('/cabo', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (res.status == 401) {
        this.props.refreshToken();
        this.handleDelete();
        return null;
      } else if (res.status != 200) {
        console.log(res)
        this.setState({ incorrectPassword: true })
        return null
      } else {
        return res.json();
      }
    }).then(data => {
      console.log(data)
      if (!data) {
        return null
      }
      this.props.onClose()
      this.props.fetch()
      return null;
    });
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