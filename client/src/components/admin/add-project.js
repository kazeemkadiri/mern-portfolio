import React, { Component } from 'react';
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

        console.log(this.state.formObject);

    }

    createProject() {

        // Use graphql tag to send a mutation query
        if(!true) {
            return;
        }

        // Navigate to View Project
        this.navigateToViewProject();

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
                                                apiKey={ keys.tinymce_api_key }
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

export default withStyles(styles)(AddProject);