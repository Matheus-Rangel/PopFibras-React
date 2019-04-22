import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, 
  DialogActions, Divider, FormControl, InputLabel,
  Button, TextField} from '@material-ui/core';
import SelectEstado from './Select/SelectEstado';
import SelectLocal from './Select/SelectLocal';
import SelectDio from './Select/SelectDio';
import SelectPorta from './Select/SelectPorta';
import SelectCabo from './Select/SelectCabo';

const styles = theme => ({
  content : {
    display: 'flex',
  }
});
class PortaDialog extends Component {
  constructor(props){
    super(props);
    const {porta_destino, porta_bypass} = this.props.data;
    this.state = {
      localDestinoId: porta_destino ? porta_destino.dio.local.id : 0, 
      dioDestinoId : porta_destino ? porta_destino.dio.id : 0,
      portaDestinoId: porta_destino ? porta_destino.dio.id : 0,
      dioBypassId: porta_bypass ? porta_bypass.dio.id : 0,
      portaBypassId: porta_bypass ? porta_bypass.id : 0,
      switchPorta: this.props.data.switch_porta,
      estadoId: this.props.data.estado_link ? this.props.data.estado_link.id : 0,
      observacao: this.props.data.observacao,
      caboId: this.props.data.fibra_cabo? this.props.data.fibra_cabo.id : 0,
      numero: this.props.data.numero_porta,
    }
  }
  render() {
    const {classes} = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        fullWidth
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth='md'
      >
        <DialogTitle>
          Porta - {this.state.numero}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <FormControl>
            <InputLabel>Estado de Link</InputLabel>
            <SelectEstado 
              value={this.state.estadoId} 
              onChange={this.handleChange}
            />
          </FormControl>
          
          <Divider variant='middle'/>
          
          <FormControl>
            <InputLabel>Local de Destino</InputLabel>
            <SelectLocal 
              value={this.state.localDestinoId}
              onChange={this.handleChange}
            />
          </FormControl>
          
          <FormControl>
            <InputLabel>DIO de Destino</InputLabel>
            <SelectDio
              localId = {this.state.localDestinoId}
              value={this.state.dioDestinoId}
              onChange={this.handleChange}
              inputName='dioDestinoId'
            />
          </FormControl>

          <FormControl>
            <InputLabel>Porta de Destino</InputLabel>
            <SelectPorta 
              dioId = {this.state.dioDestinoId}
              value={this.state.portaDestinoId}
              onChange={this.handleChange}
              inputName='portaDestinoId'
            />
          </FormControl>
          
          <Divider variant='middle' />

          <FormControl>
            <InputLabel>DIO de Bypass</InputLabel>
            <SelectDio
              localId={this.props.data.localId}
              value={this.state.dioBypassId}
              onChange={this.handleChange}
              inputName='dioBypassId'
            />
          </FormControl>

          <FormControl>
            <InputLabel>Porta de Bypass</InputLabel>
            <SelectPorta
              dioId={this.state.dioBypassId}
              value={this.state.portaBypassId}
              onChange={this.handleChange}
              inputName='portaBypassId'
            />
          </FormControl>
          
          <Divider variant='middle'/>
          <FormControl>
            <InputLabel>Cabo</InputLabel>
            <SelectCabo 
              value={this.state.caboId}
              onChange={this.handleChange}
              inputName='caboId'
            />
          </FormControl>
          <Divider variant='middle' />  
          <TextField
            label="Porta do Switch"
            name="switchPorta"
            value={this.state.switchPorta}
            onChange={this.handleChange}
            multiline={true}
            fullWidth={true}
          />

          <TextField
            label="Observação"
            name="observacao"
            value={this.state.observacao}
            onChange={this.handleChange}
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
    )
  }
}

export default withStyles(styles)(PortaDialog);