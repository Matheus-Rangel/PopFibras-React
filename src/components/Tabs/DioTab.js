import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LinearProgress } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});


function LocalTab(props) {
  const { classes, data, value, onChange } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        {this.props.data ?
          <Tabs
            value={value}
            onChange={onChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {data.map((element => {
              <Tab value={element.id} key={element.id} label={element.nome} />
            }))}
          </Tabs>
          :
          <LinearProgress />
        }
      </AppBar>
    </div>
  );
}


export default withStyles(styles)(LocalTab);