import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { extractImageSrc } from './utils/utils';


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
        
        const { classes } = this.props
        
        const { header: { header_bg_img } } = this.props

        return (

            <div className="Header" style={{ width: "100%", marginTop: "20px" }}>

                <img src={ extractImageSrc(header_bg_img) } style={{ maxWidth: "100%", height: "auto" }} alt="header_background_image"/>

                <div style={{ position: "absolute", right: "10%", top: "4rem"  }}>
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