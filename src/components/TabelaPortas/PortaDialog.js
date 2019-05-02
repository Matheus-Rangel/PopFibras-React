import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Divider, FormControl, InputLabel,
  Button, TextField, Grid, DialogContentText
} from '@material-ui/core';
import SelectEstado from './Select/SelectEstado';
import SelectLocal from './Select/SelectLocal';
import SelectDio from './Select/SelectDio';
import SelectPorta from './Select/SelectPorta';
import SelectCabo from './Select/SelectCabo';

const styles = theme => {{
  console.log(theme)
  return {
    contentText : {
      color: theme.palette.primary.dark
    },
    contentDivider: {
      width: 'calc(100% + 25px)',
      transform: 'translateX(-15px)'
    }
  }
}};
class PortaDialog extends Component {
  constructor(props) {
    super(props);
    const { porta_destino, porta_bypass } = this.props.data;
    this.state = {
      localDestinoId: porta_destino ? porta_destino.dio.local.id : 0,
      dioDestinoId: porta_destino ? porta_destino.dio.id : 0,
      portaDestinoId: porta_destino ? porta_destino.dio.id : 0,
      dioBypassId: porta_bypass ? porta_bypass.dio.id : 0,
      portaBypassId: porta_bypass ? porta_bypass.id : 0,
      switchPorta: this.props.data.switch_porta,
      estadoId: this.props.data.estado_link ? this.props.data.estado_link.id : 0,
      observacao: this.props.data.observacao,
      caboId: this.props.data.fibra_cabo ? this.props.data.fibra_cabo.id : 0,
      numero: this.props.data.numero_porta,
    }
  }
  resetState = () => {
    const { porta_destino, porta_bypass } = this.props.data;
    this.setState({
      localDestinoId: porta_destino ? porta_destino.dio.local.id : 0,
      dioDestinoId: porta_destino ? porta_destino.dio.id : 0,
      portaDestinoId: porta_destino ? porta_destino.dio.id : 0,
      dioBypassId: porta_bypass ? porta_bypass.dio.id : 0,
      portaBypassId: porta_bypass ? porta_bypass.id : 0,
      switchPorta: this.props.data.switch_porta,
      estadoId: this.props.data.estado_link ? this.props.data.estado_link.id : 0,
      observacao: this.props.data.observacao,
      caboId: this.props.data.fibra_cabo ? this.props.data.fibra_cabo.id : 0,
      numero: this.props.data.numero_porta,
    });
  }
  componentDidUpdate(prevProps){
    if (prevProps.open && !this.props.open){
      this.resetState();
    }
  }
  handleChange = (event) => {
    console.log({name:event.target.name, value:event.target.value})
    this.setState({[event.target.name] : event.target.value})
  }
  render() {
    const { classes } = this.props;
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
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <DialogContentText className={classes.contentText}>
                Estado
              </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Estado de Link</InputLabel>
                <SelectEstado
                  value={this.state.estadoId}
                  onChange={this.handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.contentDivider}/>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText className={classes.contentText}>
                Destino
              </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Local de Destino</InputLabel>
                <SelectLocal
                  value={this.state.localDestinoId}
                  onChange={this.handleChange}
                  inputName='localDestinoId'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>DIO de Destino</InputLabel>
                <SelectDio
                  localId={this.state.localDestinoId}
                  value={this.state.dioDestinoId}
                  onChange={this.handleChange}
                  inputName='dioDestinoId'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Porta de Destino</InputLabel>
                <SelectPorta
                  dioId={this.state.dioDestinoId}
                  value={this.state.portaDestinoId}
                  onChange={this.handleChange}
                  inputName='portaDestinoId'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.contentDivider} />
            </Grid>
            <Grid item xs={12}>
              <DialogContentText className={classes.contentText}>
                Bypass
              </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>DIO de Bypass</InputLabel>
                <SelectDio
                  localId={this.props.localId}
                  value={this.state.dioBypassId}
                  onChange={this.handleChange}
                  inputName='dioBypassId'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Porta de Bypass</InputLabel>
                <SelectPorta
                  dioId={this.state.dioBypassId}
                  value={this.state.portaBypassId}
                  onChange={this.handleChange}
                  inputName='portaBypassId'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.contentDivider}/>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText className={classes.contentText}>
                Cabo
              </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Cabo</InputLabel>
                <SelectCabo
                  value={this.state.caboId}
                  onChange={this.handleChange}
                  inputName='caboId'
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.contentDivider}/>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText className={classes.contentText}>
                Ativo
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Porta do Switch"
                name="switchPorta"
                value={this.state.switchPorta}
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.contentDivider}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observação"
                name="observacao"
                value={this.state.observacao}
                onChange={this.handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Fechar
          </Button>
          <Button onClick={this.props.onClose} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(PortaDialog);