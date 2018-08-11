import React, { Component } from 'react';
import  AppBar  from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { site_text_color, justify_align_center, align_center } from './global-component-styles/styles'
import './css/global.css'


const styles = () => ({
    siteTextColor: site_text_color,
    justifyAlignCenter: justify_align_center,
    alignCenter: align_center,
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
  });

class Navbar extends Component {

    state = {
        anchorEl: null,
        navbarPositioning: 'static'
    }

    toggleLinksDisplay = ({target}) => {

        this.setState({ anchorEl: target })

    }

    handleClose = () => {

        this.setState({ anchorEl: null })

    }

    componentWillMount(){

        this.registerListenerForWindowScroll();

    }

    registerListenerForWindowScroll = () => {

        window.onscroll = () => {

            if (window.scrollY >= 22) {
      
              if (this.state.navbarPositioning === true) { return; }
      
              this.setState({ navbarPositioning: 'fixed' })
      
            } else if (window.scrollY <= 22 ) {
      
              if (this.state.navbarPositioning === false) { return; }
      
              this.setState({ navbarPositioning: 'static' })
      
            }
      
        };
    }

    changeSubMenuStyles = node => {

        console.log(node)

        const menuContainer = node.childNodes[1]

        menuContainer.style.width = '100%'

        menuContainer.style.paddingLeft = '0px'

    }

    render() {    
        
        const { classes, logoutButton, logoutUser, email, phone_no } = this.props

        const {  anchorEl, navbarPositioning } = this.state

        const open = Boolean(anchorEl)

        return (
            <React.Fragment>
                {/* Contact info placed before main navbar*/}
                <Grid container spacing={0} className={ classes.siteTextColor } style={{ padding: '4px 0px' }}>
                    <Grid item sm={4} md={3} className={ classes.justifyAlignCenter }> 
                        <Icon style={{ fontSize: '14px', padding: '4px' }}>mail</Icon> &nbsp;
                        { email }
                    </Grid>
                    <Grid item 
                          sm={4} 
                          md={3} 
                          className={ classes.justifyAlignCenter } 
                          style={{ borderLeft: `1px solid ${site_text_color.color}` }}>
                        <Icon style={{ fontSize: '14px', padding: '4px' }}>phone</Icon> &nbsp; { phone_no }
                    </Grid>
                    <Grid item sm={4} md={4}  className={ classes.alignCenter } >
                        <a href='https://www.facebook.com' 
                            style={{ color: 'inherit', textDecoration: 'none' }}>
                            <i  style={{ fontSize: '14px', padding: '4px' }} className='fa fa-facebook' aria-hidden="true"></i></a>
                    </Grid>
                </Grid>

                <AppBar position={navbarPositioning}>
                    <Toolbar>
                        <Hidden mdUp>
                            <IconButton 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="Menu"
                                aria-haspopup="true"
                                aria-owns={open ? 'menu-appbar' : null}
                                onClick={ (e) => this.toggleLinksDisplay(e) }>
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                        My Portfolio
                        </Typography>
                        
                        <Hidden smDown>
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
                        </Hidden>

                        {/* Used to display links for smaller devices on click menu button */}
                        <Hidden mdUp>
                        
                        <Menu   id="menu-appbar"
                                className="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={open}
                                onClose={this.handleClose}>
                                <MenuItem 
                                    onClick={this.handleClose} >
                                    <a href="#home" className={classes.navLinks}>HOME</a>
                                </MenuItem>

                                <MenuItem onClick={this.handleClose}>
                                    <a href="#about-me" className={classes.navLinks}>ABOUT ME</a>
                                </MenuItem>

                                <MenuItem onClick={this.handleClose}>
                                        <a href="#services" className={classes.navLinks}>SERVICES</a>
                                </MenuItem>
                                
                                <MenuItem onClick={this.handleClose}>
                                        <a href="#portfolio" className={classes.navLinks}>WORKS</a>
                                </MenuItem>
                                
                                <MenuItem onClick={this.handleClose}>
                                        <a href="#contact" className={classes.navLinks}>CONTACT ME</a>
                                </MenuItem>
                            </Menu>
                        </Hidden>

                        {/* Do handle logout if authenticated*/}
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
        }
}

export default withStyles(styles)(Navbar);