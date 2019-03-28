import React from 'react'
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';

function Account (props) {
  return (
      <React.Fragment>
          <Button color="inherit" onClick={props.onClick}>
            <ExitToAppIcon />
            <Typography color='inherit'
              component="h1"
              variant="subtitle1"
              style={{ paddingLeft: 3 }}
            >
              Sair
            </Typography>
          </Button>
      </React.Fragment>
  )
}

export default Account;