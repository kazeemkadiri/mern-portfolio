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

    state = {
        header_bg_img_src: ''
    }

    setImageSrc = (imageHtmlMarkup) => {

        this.setState({
            header_bg_img_src: extractImageSrc(imageHtmlMarkup)
        })

    }

    componentWillReceiveProps(nextProps) {

        if( !nextProps.hasOwnProperty('header') ) return;

        this.setImageSrc(nextProps.header.header_bg_img);

    }

    render() {
        
        const { classes } = this.props;
        
        const { header_bg_img_src } = this.state;

        if( !header_bg_img_src ) return '';

        return (

            <div className="Header" style={{ width: "100%", marginTop: "20px" }}>

                <img src={header_bg_img_src} style={{ maxWidth: "100%", height: "auto" }} alt="header_background_image"/>

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