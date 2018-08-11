import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import AddProjectComponent from './add-project'
import MyPortfolioComponent from '../clients/my-portfolio'

import { Route, Redirect } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import EditProject from './edit-project';

const styles = theme => ({

    topPageStyles: {
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

const ProjectsQuery = gql`
    {
        projects{
            id
            title
            description
            implementation_details
            slides {
                title
                implemented_functionality
                image_path
                description
            } 
        }
    }
`


class ProjectComponent extends Component {

    constructor() {

        super()

        this.state = {

            redirectToAddProject: false,
            editProject: null

        }

    }

    editProject = editProject => {

        this.setState({ editProject })

    }

    redirectToAddProject() {

        this.setState({ redirectToAddProject: true })

    }

    render() {

        if (this.state.redirectToAddProject === true) {
            // console.log('Redirecting')

            return <Redirect to="/admin/projects/add-project" />
        }

        const { classes, projects: { projects, loading } } = this.props;

        const { editProject } = this.state

        return (

            <div className="projectComponent">

                { !editProject && <Grid container spacing={0}>

                    {/* Projects page title */}
                    <Grid item xs={12} sm={12} md={12}>

                        <Grid container spacing={0} className={classes.topPageStyles}>
                            <Grid item xs={12} sm={12} md={2}>
                                <h3>Projects</h3>
                            </Grid>

                            <Grid item xs={12} sm={12} md={10} style={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => this.redirectToAddProject()}>
                                    <Icon></Icon>Add Project
                                </Button>
                            </Grid>

                            {/* Existing projects are listed here */}
                            <Grid item xs={12} sm={12} md={12} style={{ display: "flex", justifyContent: "center" }}>
                                {
                                    !loading && (projects.length > 0) &&
                                    <MyPortfolioComponent 
                                        editProject={this.editProject}
                                        projects={projects}
                                        authenticated={true} />

                                }
                            </Grid>

                        </Grid>

                        {/* Routes for sub-project operations are displayed here*/}

                        <Route path="/admin/projects/add-project" exact component={AddProjectComponent} />

                    </Grid>

                </Grid>
                } 
                {/* The above is displayed if not editing project */}
                

                {/* Below is displayed if editing project */}
                {
                    editProject && <EditProject project={this.state.editProject} />
                }

            </div>

        )

    }

}

export default graphql(ProjectsQuery, { name: 'projects' })(withStyles(styles)(ProjectComponent))