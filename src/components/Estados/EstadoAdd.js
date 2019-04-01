import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { Collapse, Grid, TextField, Button, Divider } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {CirclePicker} from 'react-color';

export default class EstadoAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      observacao: '',
      cor: '#f44336',
      open: false,
      save: false,
      nameError: false,
    }
  }
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  checkSave = () => {
    if ((this.state.nome != '') && !this.props.list.find((estado) => (
        estado.nome == this.state.nome && estado.id != this.props.data.id
      ))
    ){
      this.setState({save:true});
    }else{
      this.setState({save:false});
    }
  }
  
  handleColor = (color, event) => {
    this.setState({cor:color.hex},() => {
    });
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.checkSave();
  }
  handleSave = () => {
    this.setState({save:false})
    let token = localStorage.getItem('access_token')
    fetch('/estado-link',{
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nome: this.state.nome, observacao: this.state.observacao, cor: this.state.cor})
    }).then(res => {
      if (res.status == 401) {
        console.log(token)
        this.props.refreshToken().then((data) => {data && this.handleSave();});
        return null;
      }else if(res.status != 200){
        console.log(res)
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
            Adicionar Estado
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
              <Grid item xs={12}>
                <CirclePicker value={this.state.cor} onChange={this.handleColor} width='100%'/>
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
