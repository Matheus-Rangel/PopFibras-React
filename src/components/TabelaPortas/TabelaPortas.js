import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, Typography, Paper, TableBody } from '@material-ui/core';
import TabelaPortasToolbar from './TabelaPortasToolbar';
import TabelaPortasHead from './TabelaPortasHead';
import TabelaPortasRow from './TabelaPortaRow';
import {getDio} from '../../services/FetchDio';
const styles = theme => ({
  root : {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const rows = [
  { id: 'estado', numeric: false, disablePadding: true, label: 'Estado de Link' },
  { id: 'numero_porta', numeric: true, disablePadding: false, label: 'Numero da Porta' },
  { id: 'local_destino', numeric: false, disablePadding: false, label: 'Local de Destino' },
  { id: 'dio_destino', numeric: false, disablePadding: false, label: 'Dio de Destino' },
  { id: 'porta_destino', numeric: true, disablePadding: false, label: 'Porta de Destino' },
];

class TabelaPortas extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      selected: [],
      currentDio: null,
      order: 'desc',
      orderBy: 'numero_porta'
    }
  }
  
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.portas}), () => console.log(this.state));
      return;
    }
    this.setState({ selected: [] });
  };

  handleSelectClick = (porta) => {
    const { selected } = this.state;
    const selectedIndex = selected.map((element) => element.id).indexOf(porta.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, porta);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };

  isSelected = (id) => this.state.selected.map((porta)=> (porta.id)).indexOf(id) !== -1;
  
  fetchData = async (id) => {
    let data = await getDio(id)
    if (!data) {
      await this.props.refreshToken().then(this.fetchData);
      data = await getDio(id)
    }
    console.log(data)
    this.setState({data:data})
  }

  componentDidMount(){
    this.fetchData(this.props.currentDio)
  }

  componentDidUpdate(prevProps){
    if (prevProps.currentDio != this.props.currentDio){
      this.setState({data:null})
      this.fetchData(this.props.currentDio)
    }
  }

  render() {
    const {classes} = this.props
    console.log(this.state.data)
    return (
      <Paper className={classes.root}>
        {this.state.data ?
          <React.Fragment>
            <TabelaPortasToolbar 
              currentLocal={this.state.data.local.nome} 
              currentDio={this.state.data.nome} 
              selected={this.state.selected}
            /> 
            
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <TabelaPortasHead
                  order={this.state.order}
                  orderBy={this.state.orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={this.state.data ? this.state.data.portas.length : 0}
                  numSelected={this.state.selected.length}
                />
                <TableBody>
                  {this.state.data.portas.map((porta) => 
                    <TabelaPortasRow 
                      key={porta.id}
                      data={porta}
                      handleSelectClick={this.handleSelectClick}
                      isSelected={this.isSelected(porta.id)}
                    />
                  )}
                </TableBody>
              </Table>
            </div>
          </React.Fragment>
          :
          <Typography>
            Loading
          </Typography>
        }
      </Paper>
    )
  }
}

TabelaPortas.propTypes = {
  currentDio: PropTypes.any,
  refreshToken : PropTypes.func.isRequired,

}
export default withStyles(styles)(TabelaPortas);
