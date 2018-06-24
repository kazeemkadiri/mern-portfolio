import React, { Component } from 'react';
import  AppBar  from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';


const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

  
class ClientIndex extends Component {

    render() {

        const { classes } = this.props;

        return (

            <div className="ClientIndex">
                <AppBar>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                        My Portfolio
                        </Typography>
                        
                            <ul style={{ display: "flex", flex: "1", listStyle: "none" }}>
                                <li variant="title" color="inherit" className={classes.flex}>
                                    HOME
                                </li>
                                <li variant="title" color="inherit" className={classes.flex}>
                                    ABOUT
                                </li>
                                <li variant="title" color="inherit" className={classes.flex}>
                                    SERVICES
                                </li>
                                <li variant="title" color="inherit" className={classes.flex}>
                                    WORKS
                                </li>
                                <li variant="title" color="inherit" className={classes.flex}>
                                    CONTACT ME
                                </li>
                            </ul>
                        
                    </Toolbar>
                </AppBar>
            </div>

        );

    }

}

export default withStyles(styles)(ClientIndex);
