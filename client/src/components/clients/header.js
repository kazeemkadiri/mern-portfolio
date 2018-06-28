import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
  

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      color: "white"
    },
    input: {
      display: 'none',
    },
  });

const theme =  createMuiTheme({
    palette: {
      primary: green,
    },
  });

class Header extends Component {

    render() {
        
        const { classes } = this.props;

        return (

            <div className="Header" style={{ width: "100%" }}>

                <img src="header_bg_img.jpg" style={{ maxWidth: "100%", height: "auto" }} alt="header_background_image"/>

                <div style={{ position: "absolute", right: "10%", top: "50%"  }}>
                    <MuiThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" href="#contained-buttons" className={classes.button}>
                            My Projects
                        </Button>
                    </MuiThemeProvider>
                </div>
            </div>

        );

    }

}


export default withStyles(styles)(Header);