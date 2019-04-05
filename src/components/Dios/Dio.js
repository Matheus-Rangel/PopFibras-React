import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {ListItemIcon, Divider, Button, TextField, Grid, Radio }from '@material-ui/core';
import ShortTextIcon from '@material-ui/icons/ShortText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DeleteDialog from './DeleteDialog';

export default class Dio extends Component {
  constructor(props){
    super(props);
    this.state = {
      openDetails : false,
      deleteDialog: false,
      nome : props.data.nome,
      observacao : props.data.observacao,
      save: false,
    }
  }
  handleClick = () => {
    this.setState(state => ({open : !state.open}))
  }
  checkSave = () => {
    if(this.state.nome != '' &&
    this.state.nome != this.props.data.nome &&
    !this.props.list.find((dio) => (dio.nome == this.state.nome && dio.id != this.props.data.id))){
      this.setState({save: true})
    }else if(this.state.nome == this.props.data.nome && this.state.observacao != this.props.data.observacao){
      this.setState({save: true})
    }else{
      this.setState({save:false})
    }
  }
  handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]:value}, this.checkSave)
  }
  handleUpdate = () => {
    this.setState({save:false})
    let token = localStorage.getItem('access_token')
    fetch('/dio',{
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: this.props.data.id, nome: this.state.nome, observacao: this.state.observacao })
    }).then(res => {
      if (res.status == 401) {
        console.log(token)
        this.props.refreshToken();
        this.handleUpdate();
        return null;
      }else if(res.status == 500){
        return null
      }else{
        return res.json();
      }
    }).then( data => {
      console.log(data)
      if (!data){
        return null
      }
      this.props.fetch()
      return null;
    });
  }
  deleteDialog = () =>{
    this.setState(state => ({deleteDialog:!state.deleteDialog}))
  }
  render() {
    return (
      <div>
        <ListItem button>
          <ListItemIcon>
            <Radio 
              checked={this.props.currentDio == this.props.data.id}
              onChange={this.props.setDio}
              value={this.props.data.id}
            />
          </ListItemIcon>
          <ListItemText onClick={this.handleClick}>{this.props.data.nome}</ListItemText>
          {this.state.open ? <ExpandLess onClick={this.handleClick}/> : <ExpandMore onClick={this.handleClick}/>}
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
                <TextField
                  label="Quantidade de Portas"
                  name="quantidadePortas"
                  disabled
                  value={this.props.data.quantidade_portas}
                />
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
          refreshToken={this.props.refreshToken}
        />
      </div>
    )
  }
}
