import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {ListItemIcon, Divider, Button, TextField, Grid, }from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DeleteDialog from './DeleteDialog';
import {CirclePicker} from 'react-color';
import { patchEstado } from '../../services/FetchEstado';

export default class Estado extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDetails : false,
      deleteDialog: false,
      nome : props.data.nome,
      observacao : props.data.observacao,
      cor: props.data.cor,
      save: false,
    }
  }
  handleClick = () => {
    this.setState(state => ({open : !state.open}))
  }
  checkSave = () => {
    let s = false
    if (this.state.nome != this.props.data.nome
      && this.state.nome != ''
      && !this.props.list.find((estado) => (
        estado.nome == this.state.nome && estado.id != this.props.data.id
      ))
    ){
      s = true;
    }
    if(this.state.cor != this.props.data.cor){
      s = true;
    }
    if(this.state.observacao != this.props.data.observacao){
      s = true;
    }
    this.setState({save:s})
  }
  handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]:value}, ()=> {
      this.checkSave()
    })
  }
  handleColor = (color, event) => {
    this.setState({cor:color.hex},() => {
      this.checkSave()
    })
  }
  handleUpdate = async () => {
    this.setState({save:false})
    let res = await patchEstado(this.props.data.id, this.state.nome, this.state.observacao, this.state.cor);
    if (res.status == 401) {
      await this.props.refreshToken()
      res = await patchEstado(this.props.data.id, this.state.nome, this.state.observacao, this.state.cor);
    }
    this.props.fetch()
  }
  deleteDialog = () =>{
    this.setState(state => ({deleteDialog:!state.deleteDialog}))
  }
  render() {
    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <DonutLargeIcon style={{color:this.state.cor}}/>
          </ListItemIcon>
          <ListItemText>{this.props.data.nome}</ListItemText>
          {this.state.open ? <ExpandLess /> : <ExpandMore/>}
        </ListItem>
        <Divider/>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <ListItem component="div">
            <Grid container spacing={16}>
              <Grid item xs={12} md={4} lg={3}>
                <TextField 
                  label="Nome" 
                  name="nome" 
                  value={this.state.nome} 
                  onChange={this.handleInput}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} md={8} lg={6}>
                <TextField
                  label="Observação" 
                  name="observacao" 
                  value={this.state.observacao} 
                  onChange={this.handleInput}
                  multiline={true}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <CirclePicker value={this.state.cor} onChange={this.handleColor} width='100%'/>
              </Grid>
              <Grid item lg={3}>
              </Grid>
              <Grid item>
                <Button color='primary' variant='contained' disabled={!this.state.save} onClick={this.handleUpdate}>
                  Salvar
                </Button>
              </Grid>
              <Grid item>
                <Button color='secondary' variant='contained' onClick={this.deleteDialog}>
                  Deletar
                </Button>
              </Grid>
            </Grid>
          </ListItem>
          <Divider/>
        </Collapse>
        <DeleteDialog 
          open={this.state.deleteDialog}
          onClose={this.deleteDialog}
          id={this.props.data.id}
          fetch={this.props.fetch}
        />
      </div>
    )
  }
}
