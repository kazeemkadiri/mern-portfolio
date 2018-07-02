import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';

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
            }

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


    render() {


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
                                                apiKey="sa36zz9cj49l40y40bjt5xoy6xtu1hiansfynn2p79spjez1"
                                                initialValue="<p>This is the initial content of the editor</p>"
                                                init={{
                                                plugins: 'link image code',
                                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                                }}
                                                onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                                     "implementation_details") }
                                            />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
        )

    }

}

export default withStyles(styles)(AddProject);