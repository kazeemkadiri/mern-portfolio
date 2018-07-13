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
    navLinks: {
        width: "100%",
        height: "100%",
        color: "white",
        textDecoration: "none"
    }
  };

class Navbar extends Component {

render() {    
    
    const { classes, logoutButton, logoutUser } = this.props;

    return (
        <div className="Navbar">
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
                                <a href="#home" className={classes.navLinks}>HOME</a>
                            </li>
                            <li variant="title" color="inherit" className={classes.flex}>
                                <a href="#about-me" className={classes.navLinks}>ABOUT ME</a>
                            </li>
                            <li variant="title" color="inherit" className={classes.flex}>
                                <a href="#services" className={classes.navLinks}>SERVICES</a>
                            </li>
                            <li variant="title" color="inherit" className={classes.flex}>
                                <a href="#portfolio" className={classes.navLinks}>WORKS</a>
                            </li>
                            <li variant="title" color="inherit" className={classes.flex}>
                                <a href="#contact" className={classes.navLinks}>CONTACT ME</a>
                            </li>
                        </ul>
                    {/* Do handle logout */}
                </Toolbar>
            </AppBar>
        </div>
    );
    }
}

export default withStyles(styles)(Navbar);