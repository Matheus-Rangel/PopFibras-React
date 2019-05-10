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

class PortaFormDialog extends Component {
  resetState = () => {
    this.setState({
      destinoLocalId: this.props.porta.portaDestino.localId,
      destinoDioId: this.props.porta.portaDestino.dioId,
      destinoPortaId: this.props.porta.portaDestino.id,
      bypassLocalId: this.props.porta.portaBypass.localId,
      bypassDioId: this.props.porta.portaBypass.dioId,
      bypassPortaId: this.props.porta.portaBypass.id,
      observacao: this.props.porta.observacao,
      estadoId: this.props.porta.estadoId,
      switchPorta: this.props.porta.switchPorta,
    })
  }
  handleChange = (event) => {
    const prop = event.target.name
    const value = event.target.value
    this.setState({[prop]:value})
  }
  componentDidMount(){
    if (this.props.didInvalidate){
      this.props.requestData()
    }
  }
  componentDidUpdate(prevProps){
    if (!prevProps.open && this.props.open){
      this.resetState();
    }
  }
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="porta-form-dialog"
        fullWidth
        maxWidth='md'
      >
      <DialogTitle>
        Porta - {this.props.porta.numero}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container spacing={24}>
          <SelectEstado 
            value={this.state.estadoId}
            onChange={this.handleChange} 
            inputName='estadoId'
          />
          <SelectCabo 
            value={this.state.estadoId}
            onChange={this.handleChange} 
            inputName='estadoId'
          />
          <SelectLocal
            value={this.state.destinoLocalId}
            onChange={this.handleChange} 
            inputName='destinoLocalId'
          />
          <SelectDio
            localId={this.state.destinoLocalId}
            value={this.state.destinoDioId}
            onChange={this.handleChange}
            inputName='destinoDioId'
          />
          <SelectPorta 
            dioId={this.state.destinoDioId}
            value={this.state.destinoPortaId}
            onChange={this.handleChange}
            inputName='destinoPortaId' 
          />
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
        <SelectEstado 
          value={this.state.estadoId}
          onChange={this.handleChange} 
          inputName='estadoId'
        />
    )
  }
}