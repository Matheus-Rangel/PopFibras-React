import React, { Component } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import MoreHorizontalIcon from '@material-ui/icons/MoreHoriz'
import {
  TableRow, TableCell, Dialog, 
  DialogTitle, DialogContent, DialogContentText,
  DialogActions, Checkbox,  TextField, Button, IconButton,  
} from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';

const sytles = theme => ({
  gridWrapper: {
    diplay: 'grid',
  },
});

export default class TabelaPortaRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      portaDestino: this.props.data.porta_destino,
      portaBypass: this.props.data.porta_bypass,
      switchPorta: this.props.data.switch_porta,
      estado: this.props.data.estado_link,
      observacao: this.props.data.observacao,
      cabo: this.props.data.fibra_cabo,
      numero: this.props.data.numero_porta,

      estados: [],
      locais: [],
      dios: [],
      portas: [],
    }
  }

  checkClick = (event) => {
    this.props.handleSelectClick(this.props.data)
  }
  
  handleOpen = () => {
    console.log('abree diabo')
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleEstadoChange = (event) => {
    const { value } = event.target;
    const { estados } = this.state;
    const i = estados.map((estado) => (estado.id)).indexOf(value)
    this.setState({ estado: estados[i] })
  }
  render() {
    const { portaDestino,
      portaBypass,
      switchPorta,
      estado,
      observacao,
      cabo,
      numero,
      estados } = this.state
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
            <DonutLargeIcon style={{ color: estado ? estado.cor : '' }} />
          </TableCell>
          <TableCell align="left">{numero}</TableCell>
          <TableCell align="center">{portaDestino ? portaDestino.dio.local.nome : 'Sem destino'}</TableCell>
          <TableCell align="center">{portaDestino ? portaDestino.dio.nome : ''}</TableCell>
          <TableCell align="center">{portaDestino ? portaDestino.numero_porta : ''}</TableCell>
          <TableCell onClick={this.handleOpen}>
            <IconButton onClick={this.handleOpen}>
              <MoreHorizontalIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullScreen
        >
          <DialogTitle id="form-dialog-title">Informações da Porta</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="Local Destino"
              value={portaDestino ? portaDestino.dio.local.nome : ''}
              label="Local de destino"
              type="email"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Fechar
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}
