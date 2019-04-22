import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import MoreHorizontalIcon from '@material-ui/icons/MoreHoriz'
import {
  TableRow, TableCell, Dialog,
  DialogTitle, DialogContent, DialogContentText,
  DialogActions, Checkbox, TextField, Button, IconButton, Typography, MenuItem, Select, FormControl, InputLabel,
} from '@material-ui/core';
import SelectEstado from './Select/SelectEstado';
import PortaDialog from './PortaDialog';


const styles = theme => ({
  gridWrapper: {
    diplay: 'grid',
  },
  portaDialog: {
    width: '90vh',
    height: '90vh',
  },
  detailBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  estadoLinkBox: {
    display: 'flex',
  },
  estadoSelect:{
    maxWidth: '200px'
  }
});

class TabelaPortaRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  checkClick = (event) => {
    this.props.handleSelectClick(this.props.data)
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const {porta_destino, estado_link, numero_porta} = this.props.data;
    return (
      <React.Fragment>
        <TableRow role='checkbox' hover>
          <TableCell>
            <Checkbox
              checked={this.props.isSelected}
              onClick={this.checkClick}
            />
          </TableCell>
          <TableCell>
            <DonutLargeIcon style={{ color: estado_link ? estado_link.cor : '' }} />
          </TableCell>
          <TableCell align="left">{numero_porta}</TableCell>
          <TableCell align="center">{porta_destino ? porta_destino.dio.local.nome : ''}</TableCell>
          <TableCell align="center">{porta_destino ? porta_destino.dio.nome : ''}</TableCell>
          <TableCell align="center">{porta_destino ? porta_destino.numero_porta : ''}</TableCell>
          <TableCell onClick={this.handleOpen}>
            <IconButton onClick={this.handleOpen}>
              <MoreHorizontalIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <PortaDialog
          data={this.props.data}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(TabelaPortaRow);