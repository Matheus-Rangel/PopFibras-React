import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { Collapse, Grid, TextField, Button, Divider, Input } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
export default class LocalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      quantidadeFibras: null,
      observacao: '',
      open: false,
      save: false,
      nameError: false,
    }
  }
  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }
  handleInput = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value }, () => {
      if(this.state.nome != '' && 
      !this.props.data.cabos.find((cabo)=> (cabo.nome==this.state.nome)) &&
      this.state.quantidadeFibras > 0){
        this.setState({save:true})
      }else{
        this.setState({save:false})
      }
    })
  }
  handleSave = () => {
    this.setState({save:false})
    let token = localStorage.getItem('access_token')
    fetch('/cabo',{
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nome: this.state.nome, observacao: this.state.observacao, quantidade_fibras: this.state.quantidadeFibras})
    }).then(res => {
      if (res.status == 401) {
        console.log(token)
        this.props.refreshToken();
        this.handleSave();
        return null;
      }else if(res.status != 200){
        console.log(res)
        this.setState({nameError:true})
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
