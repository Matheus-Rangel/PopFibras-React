
import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Checkbox';

const rows = [
  { id: 'estado', numeric: false, disablePadding: true, label: 'Estado de Link' },
  { id: 'numero_porta', numeric: true, disablePadding: true, label: 'Numero da Porta' },
  { id: 'local_destino', numeric: false, disablePadding: false, label: 'Local de Destino' },
  { id: 'dio_destino', numeric: false, disablePadding: false, label: 'Dio de Destino' },
  { id: 'porta_destino', numeric: true, disablePadding: false, label: 'Porta de Destino' },
];

export default class TabelaPortasHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    console.log({selecioado: numSelected, total: rowCount})
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </TableCell>
            ),
          )}
          <TableCell>
            
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

TabelaPortasHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
