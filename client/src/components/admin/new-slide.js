import React from 'react'
import { withStyles } from '@material-ui/core'
import { Editor } from '@tinymce/tinymce-react';
import { keys } from '../../keys';
import { environment } from '../../environment';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

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
    carouselContainer: {
        height: '400px !important'
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    }

})

class NewSlide extends React.Component{

    state = {

        slide: {
            title: '',
            description: '',
            image_path: ''
        }
    }

    componentWillMount() {

        this.checkEditingSlide()

    }

    checkEditingSlide = () => {

        if(!this.props.hasOwnProperty('editSlide') || 
            (this.props.hasOwnProperty('newSlide')) )
            return

        this.setState({ slide: this.props.editSlide })

        
    }

    updateFormParametersObject(value, formField) {

        const { slide } = this.state;

        this.setState({
            "slide": {
                ...slide,
                [formField]: value
            }
        }) 
    }

    render(){

        const { classes, editSlide } = this.props

        const { slide: { title, description, image_path } } = this.state

        return (
                <Grid container>
                { 
                    (editSlide === null) && 
                    <Grid item xs={12} sm={12} md={8}>
                        <Typography>    
                            <AddIcon className={ classes.icon } /> Attach Slide
                        </Typography>
                    </Grid>
                }

                <Grid item xs={12} sm={12} md={8}>
                    <TextField
                        id="slidetitle"
                        label="Slide title"
                        className={ classes.textField }
                        style={{ width: "100%" }}
                        value={ title }
                        onChange={ event => this.updateFormParametersObject(event.target.value, "title") }
                        margin="normal"
                        />
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
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

                <Grid item xs={12} sm={12} md={8}>
                    {/* Editor to attach new slide for project */}
                    <Editor
                            apiKey={ keys.tinymce_api_key }
                            initialValue={ image_path }
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
                                                    "image_path") }
                        />
                </Grid>

                <Grid item xs={12} sm={12} md={8} style={{ textAlign: 'center' }}>
                    <Button variant="contained" 
                            color="primary" 
                            className={classes.button}
                            onClick = { () => this.props.addSlide(this.state.slide) }>
                        <AddIcon className={classes.icon} /> 
                        { this.props.editSlide ? 'Update slide' : 'Attach Slide' }
                    </Button>
                </Grid>
                </Grid>
        )


    }

}

export default withStyles(styles)(NewSlide)