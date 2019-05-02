import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { Collapse, Grid, TextField, Button, Divider } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {postDio} from '../../services/FetchDio';
export default class LocalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      observacao: '',
      quantidadePortas: '',
      open: false,
      save: false,
      nameError: false,
    }
  }
  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }
  checkSave = () => {
    if(this.state.nome != '' &&
    !this.props.list.find((dio) => (dio.nome == this.state.nome )) &&
    this.state.quantidadePortas > 0
    ){
      this.setState({save: true})
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
    let token = localStorage.getItem('access_token')
    let res = await postDio(this.props.currentLocal, this.state.nome, this.state.observacao, this.state.quantidadePortas);
    if (res === 401) {
      await this.props.refreshToken();
      res = await postDio(this.props.currentLocal, this.state.nome, this.state.observacao, this.state.quantidadePortas);
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
            Adicionar DIO
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
              <Grid item xs={12}>
                <TextField
                  label="Quantidade de Portas"
                  name="quantidadePortas"
                  value={this.state.quantidadePortas}
                  onChange={this.handleInput}
                  required={true}
                />
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
