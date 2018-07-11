import React, { Component } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Work from '@material-ui/icons/Work';
import Link from 'react-router-dom/Link';

const styles = theme => ({
    sideBarLinks: {
        width: '100%',
        display: "flex",
        justifyContent: "center",
        textDecoration: "none"
    }
});


class Sidebar extends Component{

    
    render(){

        const { classes } = this.props;

        return (

            <aside className="sideBar" {...this.props}>

                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Main menu</ListSubheader>}
                    >
                    <ListItem button>
                        <Link to="/admin/projects" className={ classes.sideBarLinks }>
                        
                            <ListItemIcon>
                                <Work />
                            </ListItemIcon>
                        
                            <ListItemText inset primary="Projects" />

                        </Link>
                    </ListItem>

                    <ListItem button>
                        <Link to="/admin/bio" className={ classes.sideBarLinks }>
                            <ListItemIcon>
                                <Work />
                            </ListItemIcon>
                            <ListItemText inset primary="Bio" />
                        </Link>
                    </ListItem>

                    <ListItem button>
                        <Link to="/admin/services" className={ classes.sideBarLinks }>
                            <ListItemIcon>
                                <Work />
                            </ListItemIcon>
                            <ListItemText inset primary="Services" />
                        </Link>
                    </ListItem>
                </List>
                
            </aside>

        )

    }

}

export default withStyles(styles)(Sidebar);