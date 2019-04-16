import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {ListItemIcon, Divider, Button, TextField, Grid, Checkbox }from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DeleteDialog from './DeleteDialog';
import Tooltip from '@material-ui/core/Tooltip';

import {patchLocal} from '../../services/FetchLocal';

export default class Local extends Component {
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
    !this.props.list.find((local) => (local.nome == this.state.nome && local.id != this.props.data.id))){
      this.setState({save: true})
    }else if(this.state.nome == this.props.data.nome && this.state.observacao != this.props.data.observacao){
      this.setState({save: true})
    }else{
      this.setState({save:false})
    }
    console.log(this.props.data)
  }
  handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]:value}, this.checkSave)
  }
  handleUpdate = async () => {
    this.setState({save:false})
    let data = await patchLocal(this.props.data.id, this.state.nome, this.state.observacao);
    if (!data){
      this.props.refreshToken();
      data = await patchLocal(this.props.data.id, this.state.nome, this.state.observacao);
    }
    await this.props.fetch();
  }
  deleteDialog = () =>{
    this.setState(state => ({deleteDialog:!state.deleteDialog}))
  }
  render() {
    return (
      <div>
        <ListItem button style={{paddingBottom:0, paddingTop:0}}>
          <ListItemIcon>
            <Tooltip title="Selecionar" placement="bottom">
              <Checkbox
                checked={this.props.currentLocal == this.props.data.id}
                onChange={this.props.setLocal}
                value={this.props.data.id.toString()}
              />
            </Tooltip>
          </ListItemIcon>
          <ListItemText style={{lineHeight: '48px'}} disableTypography onClick={this.handleClick}>
            {this.props.data.nome}
          </ListItemText>
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
          refreshToken={this.props.refreshToken}
          open={this.state.deleteDialog}
          onClose={this.deleteDialog}
          id={this.props.data.id}
          fetch={this.props.fetch}
        />
      </div>
    )
  }
}
