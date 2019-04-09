import React, { Component } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { TableRow, TableCell, Collapse, Typography, Checkbox } from '@material-ui/core';

export default class TabelaPortaRow extends Component {
  render() {
    const {estado_link, porta_destino, numero_porta} = this.props
    return (
      <React.Fragment>
        <TableRow onClick={this.handleColapse}>
          <TableCell>
            <Checkbox

            />
          </TableCell>
          <TableCell>
            <DonutLargeIcon style={{color:estado_link ? estado_link.cor: ''}}/>
          </TableCell>
          <TableCell>
            <Typography></Typography>
          </TableCell>
        </TableRow>
        <Collapse>

        </Collapse>
      </React.Fragment>
    )
  }
}
