import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { Collapse, Grid, TextField, Button, Divider, Input } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {postCabo} from '../../services/FetchCabo';
export default class LocalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      quantidadeFibras: 0,
      observacao: '',
      open: false,
      save: false,
      nameError: false,
    }
  }
  
  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }
  
  checkSave = () => {
    if (this.state.nome != '' &&
        this.state.quantidadeFibras != 0 &&
        !this.props.list.find((cabo) => (cabo.nome == this.state.nome && this.props.data.id != cabo.id))
    ){
      this.setState({save:true})
    }else{
      this.setState({save:false})
    }
  }
  
  handleInput = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value }, this.checkSave)
  }

  handleSave = async () => {
    this.setState({save:false})
    let res = await postCabo(this.state.nome, this.state.observacao, this.state.quantidadeFibras);
    if (res.status == 401) {
      this.props.refreshToken();
      res = await postCabo(this.state.nome, this.state.observacao, this.state.quantidadeFibras);
    }
    this.props.fetch();
  }

  render() {
    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText>
            Adicionar Cabo
          </ListItemText>
          {this.state.open ? <ExpandLess /> : <ExpandMore/>}
        </ListItem>
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
                  required={true}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Quantidade de Fibras"
                  name="quantidadeFibras"
                  value={this.state.quantidadeFibras}
                  onChange={this.handleInput}
                  type="number"
                  required={true}
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
                <Button color='primary' disabled={!this.state.save} onClick={this.handleSave} variant='contained'>
                  Adicionar
                </Button>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </Collapse>
      </React.Fragment>
    )
  }
}
