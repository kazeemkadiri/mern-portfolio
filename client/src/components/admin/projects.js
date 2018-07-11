import React, { Component } from 'react'
import AddProjectComponent from './add-project'

import { Route, Redirect } from 'react-router-dom'
import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({

    topPageStyles:{
        alignItems: "center"
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

})


class ProjectComponent extends Component{

    constructor() {

        super()

        this.state = {

            redirectToAddProject: false

        }

    }


    redirectToAddProject() {

        this.setState({ redirectToAddProject: true })

    }

    render(){

        if(this.state.redirectToAddProject === true) {
            console.log('Redirecting')

            return <Redirect to="/admin/projects/add-project" />
        }

        const { classes } = this.props;

        return (

            <div className="projectComponent">

                <Grid container spacing={0}>
                    
                    {/* Projects page title */} 
                    <Grid item xs={12} sm={12} md={12}>
                        
                        <Grid container spacing={0} className={ classes.topPageStyles }>
                            <Grid item xs={12} sm={12} md={2}>
                                <h3>Projects</h3>
                            </Grid>

                            <Grid item xs={12} sm={12} md={3}>
                                <Button variant="contained" 
                                        color="primary" 
                                        className={classes.button}
                                        onClick = { () => this.redirectToAddProject() }>
                                    <Icon></Icon>Add Project
                                </Button>
                            </Grid>

                        </Grid>

                        {/* Routes for sub-project operations are displayed here*/}
                        
                        <Route path="/admin/projects/add-project" exact component={ AddProjectComponent } />

                    </Grid>

                </Grid>

            </div>

        )

    }

}

export default withStyles(styles)(ProjectComponent);