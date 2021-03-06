import React, { Component } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';
import Link from 'react-router-dom/Link';
//import {ResponsiveMenu} from 'material-ui-responsive-menu'

const styles = theme => ({
    sideBarLinks: {
        width: '100%',
        display: "flex",
        justifyContent: "center",
        textDecoration: "none",
        padding: '12px 24px'
    },
    textWhite: {
        color: theme.palette.common.white,
        ' > span': {
            color: theme.palette.common.white
        }
    },
    sideBarTitleHeader: {
        fontWeight: 700,
        fontSize: 'large',
        padding: '14px',
        textAlign: 'center'
    }
});


class Sidebar extends Component {

    styleMenuList = node => {

        if (!node) {
            setTimeout(() => {
                this.styleMenuList(node)
            }, 1000)
            return
        }

        const menuNode = node._reactInternalFiber.child.child.stateNode.childNodes[0]

        menuNode.style.color = "inherit"

    }

    render() {

        const { classes } = this.props;

        return (

            <aside className="sideBar" {...this.props}>

                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div" className={classes.sideBarTitleHeader}>Main menu</ListSubheader>
                    }
                >
                    <ListItem button style={{ padding: 'none' }}>
                        <Link to="/admin/projects" className={classes.sideBarLinks}>

                            <Icon className={classes.textWhite}>
                                work
                            </Icon>

                            <ListItemText
                                inset
                                primary="Projects"
                                className={classes.textWhite}
                                ref={node => this.styleMenuList(node)} />

                        </Link>
                    </ListItem>

                    <ListItem button className={classes.textWhite}>
                        <Link to="/admin/bio" className={classes.sideBarLinks}>

                            <Icon className={classes.textWhite}>
                                person
                            </Icon>

                            <ListItemText
                                inset
                                primary="Bio"
                                className={classes.textWhite}
                                ref={node => this.styleMenuList(node)} />
                        </Link>
                    </ListItem>

                    <ListItem button className={classes.textWhite}>
                        <Link to="/admin/services" className={classes.sideBarLinks}>

                            <Icon className={classes.textWhite}>
                                settings
                            </Icon>

                            <ListItemText
                                inset
                                primary="Services"
                                className={classes.textWhite}
                                ref={node => this.styleMenuList(node)} />
                        </Link>
                    </ListItem>
                </List>

            </aside>

        )

    }

}

export default withStyles(styles)(Sidebar);