import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { graphql } from 'react-apollo'
import  gql  from 'graphql-tag';


import { Editor } from '@tinymce/tinymce-react';
import Redirect  from 'react-router-dom/Redirect'
import { keys } from '../../keys';
import { environment } from '../../environment';

import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { site_text_color } from './css/global'


const styles = theme => ({

    topPageStyles:{
        alignItems: 'center',
        marginTop: '4rem'
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    title: {
        marginBottom: 16,
        fontSize: 24,
    },
    siteTextColor: site_text_color

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

    componentWillMount = () => {
        
        this.checkEditProject()

    }

    checkEditProject = () => {
        
        if(!this.props.hasOwnProperty('editProject'))
            return

        this.setState({ formObject: this.props.editProject })

    }

    updateFormParametersObject(value, formField) {

        const { formObject } = this.state;

        this.setState({
            "formObject": {
                ...formObject,
                [formField]: value
            }
        }) 

    }

    createProject() {

        // Use graphql tag to send a mutation query
        this.props.addProject({
            variables: {
                ...this.state.formObject
            },
            update: (store, { data: { addProject } }) => {

                // console.log(addProject);
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

        const { classes, editProject } = this.props;

        const { formObject: { title, description, implementation_details } } = this.state;

        if( this.state.navigateToViewProject ) {
            return <Redirect to="/admin/projects/view-project" />
        }

        return (
            
                    <Grid container spacing={0} className={ classes.topPageStyles }>
                        <Grid item xs={12} sm={12} md={11}>
                            <Card className={classes.card}>
                                <CardContent>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Typography className={classes.title} color="textSecondary">
                                           <Icon>playlist_add</Icon> { editProject ? 'Edit Project' : 'Add new project' }
                                        </Typography>
                                    </Grid>
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

                                    <Grid item xs={12} sm={12} md={12} style={{ marginLeft: '8px' }}>
                                        {/* Editor to save new project */}
                                        <h4  className={ classes.siteTextColor }>Implementation details </h4>
                                        <Editor
                                                apiKey={ keys.tinymce_api_key }
                                                initialValue={ implementation_details }
                                                init={{
                                                    theme: "modern",
                                                    height: 350,
                                                    plugins: ['link image code'],
                                                    toolbar: `undo redo | bold italic | alignleft aligncenter alignright | code
                                                             | image | link`,
                                                    file_browser_callback_types: 'file image media',
                                                    images_upload_url: `${environment.serverUrl}/file-upload`
                                                   
                                                }}
                                                onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                                     "implementation_details") }
                                            />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12}  style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="contained" color="primary"
                                                className={`sendButton ${classes.button}`}
                                                onClick={ () => this.createProject() }>
                                            <Icon>send</Icon>&nbsp; { editProject ? 'Update' : 'Submit' }
                                        </Button>
                                    </Grid>
                                </Grid>
                                </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    
        )

    }

}

export default withStyles(styles)(graphql(AddProjectMutation, {name: "addProject"})(AddProject));