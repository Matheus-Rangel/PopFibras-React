import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
const styles = theme => ({

});
class PortaDialog extends Component {
  render() {
    const {classes} = this.props; 
    return (
      <Dialog
        fullWidth
        classes={{
          container: {classes.DialogContainer},
          
        }}
      >

      </Dialog>
    )
  }
}

export default withStyles(PortaDialog)(styles);