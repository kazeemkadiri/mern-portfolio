import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { graphql } from 'react-apollo'
import  gql  from 'graphql-tag';


import { Editor } from '@tinymce/tinymce-react';
import Redirect  from 'react-router-dom/Redirect'
import { keys } from '../../keys';

import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



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

// Mutation to add a newly created project
const AddProjectMutation = gql`
    mutation($title: String!, $description: String!, $implementation_details: String!){
        addProject( title: $title, 
                    description: $description, 
                    implementation_details: $implementation_details){
                        id,
                        title,
                        description,
                        implementation_details,
                        slides {
                            title,
                            implemented_functionality,
                            image_path
                        }
                    }
    }
`

class AddProject extends Component{

    constructor() {

        super()

        this.state = {
            formObject:{
                title: '',
                description: '',
                implementation_details: ''
            },
            navigateToViewProject: false 
        }

    }

    updateFormParametersObject(value, formField) {

        const { formObject } = this.state;

        this.setState({
            "formObject": {
                ...formObject,
                [formField]: value
            }
        }) 

        //console.log(this.state.formObject);

    }

    createProject() {

        const { formObject: { title, description, implementation_details } } = this.state;

        // Use graphql tag to send a mutation query
        this.props.addProject({
            variables: {
                title: title,
                description: description,
                implementation_details: implementation_details
            },
            update: (store, { data: { addProject } }) => {

                console.log(addProject);
                if(!addProject.hasOwnProperty('id')){

                    // Display error notification
                    toast.error("Operation failed");

                    return;

                }

                this.saveProjectIdInLocalStorage(addProject);

                // Navigate to View Project
                this.navigateToViewProject();

            }
        })        

    }

    saveProjectIdInLocalStorage(project) {

        localStorage.setItem("project", JSON.stringify( project) );

    }

    navigateToViewProject() {

        this.setState({ navigateToViewProject: true });

    }

    render() {

        if( this.state.navigateToViewProject ) {
            return <Redirect to="/admin/projects/view-project" />
        }

        const { classes } = this.props;

        const { formObject: { title, description, implementation_details } } = this.state;

        return (
            <Grid container spacing={0} className={ classes.topPageStyles }>
                            <Grid item xs={12} sm={12} md={8}>
                                <Grid container spacing={0} className={ classes.topPageStyles }>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            id="title"
                                            label="Title"
                                            className={ classes.textField }
                                            style={{ width: "100%" }}
                                            value={ title }
                                            onChange={ event => this.updateFormParametersObject(event.target.value, "title") }
                                            margin="normal"
                                            />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            id="description"
                                            label="Description"
                                            multiline
                                            rows="3"
                                            className={ classes.textField }
                                            style={{ width: "100%" }}
                                            value={ description }
                                            onChange={ event => this.updateFormParametersObject(event.target.value, "description") }
                                            margin="normal"
                                            />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        {/* Editor to save new project */}
                                        <Editor
                                                initialValue={ implementation_details }
                                                init={{
                                                plugins: 'link image code',
                                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                                }}
                                                onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                                     "implementation_details") }
                                            />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button variant="contained" color="primary"
                                                className={`sendButton ${classes.button}`}
                                                onClick={ () => this.createProject() }>
                                            <Icon>send</Icon>&nbsp; &nbsp; Send
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
        )

    }

}

export default withStyles(styles)(graphql(AddProjectMutation, {name: "addProject"})(AddProject));