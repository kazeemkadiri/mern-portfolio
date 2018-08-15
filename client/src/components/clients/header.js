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
    w100: {
        width: '100% !important'
    }
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

            <div className="Header" id="home" style={{ width: "100%"}}>

                <img className={classes.w100} src={ extractImageSrc(header_bg_img) } style={{ width: "100% !important", height: "auto" }} alt="header_background_images"/>

                <div style={{ position: "absolute", right: "10%", top: "20rem"  }}>
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