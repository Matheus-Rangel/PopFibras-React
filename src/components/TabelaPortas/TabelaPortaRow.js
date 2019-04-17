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
      localDestinoId: this.props.data.porta_destino.dio.local.id, 
      dioDestinoId : this.props.data.porta_destino.dio.id,
      dioBypassId: this.props.data.porta_bypass.dio.id,
      portaBypassId: this.props.data.porta_bypass.id,
      switchPorta: this.props.data.switch_porta,
      estado: this.props.data.estado_link.id,
      observacao: this.props.data.observacao,
      caboId: this.props.data.fibra_cabo.id,
      numero: this.props.data.numero_porta,
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    const { portaDestino,
      portaBypass,
      switchPorta,
      estado,
      observacao,
      cabo,
      numero,} = this.state;
    const { classes } = this.props;
    const locais = [];
    const dios = [];
    const portas = [];
    const diosBypass = [];
    const portasBypass = [];
    const cabos = [];

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
          fullWidth
          maxWidth='md'
        >
          <DialogTitle id="form-dialog-title">Porta - {numero}</DialogTitle>
          <DialogContent className={classes.detailBox}>
            
            <FormControl>
              <InputLabel>Estado de Link</InputLabel>
              <SelectEstado 
                value={estado ? estado.id : 0} 
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl>
              <InputLabel>Local de Destino</InputLabel>
              <Select
                value={portaDestino ? portaDestino.dio.local.id : 0}
                onChange={this.handleChange}
                inputProps={{
                  name: 'local',
                }}
              >
                {locais.map((local) => (
                  <MenuItem key={local.id} value={local.id}>
                    <em>local.nome</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>DIO de Destino</InputLabel>
              <Select
                value={portaDestino ? portaDestino.dio.id : 0}
                onChange={this.handleChange}
                inputProps={{
                  name: 'dio',
                }}
                >
                {dios.map((dio) => (
                  <MenuItem key={dio.id} value={dio.id}>
                    <em>dio.nome</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Porta de Destino</InputLabel>
              <Select
                value={portaDestino ? portaDestino.id : 0}
                onChange={this.handleChange}
                inputProps={{
                  name: 'porta',
                }}
                >
                {portas.map((porta) => (
                  <MenuItem key={porta.id} value={porta.id}>
                    <em>porta.numero_porta</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>DIO de Bypass</InputLabel>
              <Select
                value={portaBypass ? portaBypass.dio.id : 0}
                onChange={this.handleChange}
                inputProps={{
                  name: 'dioBypass',
                }}
                >
                {diosBypass.map((dio) => (
                  <MenuItem key={dio.id} value={dio.id}>
                    <em>dio.nome</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Porta de Bypass</InputLabel>
              <Select
                value={portaBypass ? portaBypass.id : 0}
                onChange={this.handleChange}
                inputProps={{
                  name: 'portaBypass',
                }}
                >
                {portasBypass.map((porta) => (
                  <MenuItem key={porta.id} value={porta.id}>
                    <em>porta.numero_porta</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Cabo</InputLabel>
              <Select
                value={cabo ? cabo : 0}
                onChange={this.handleChange}
                inputProps={{
                  name: 'cabo',
                }}
                >
                {cabos.map((cabo) => (
                  <MenuItem key={cabo.id} value={cabo.id}>
                    <em>cabo.nome</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
                  label="Porta do Switch"
                  name="switchPorta"
                  value={switchPorta}
                  onChange={this.handleInput}
                  multiline={true}
                  fullWidth={true}
                />

            <TextField
                  label="Observação"
                  name="observacao"
                  value={observacao}
                  onChange={this.handleInput}
                  multiline={true}
                  fullWidth={true}
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

export default withStyles(styles)(TabelaPortaRow);