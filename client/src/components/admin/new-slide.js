import React from 'react'
import { withStyles } from '@material-ui/core'
import { Editor } from '@tinymce/tinymce-react';
import { keys } from '../../keys';
import { environment } from '../../environment';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { site_text_color } from './css/global'

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
    },
    siteTextColor: site_text_color

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

        const { editSlide } = this.props

        if( !editSlide )
            return

        this.setState({ slide: {...this.props.editSlide} })

        
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
                    <Grid item xs={12} sm={12} md={8}>
                        <Typography style={{ display: "flex", justifyContent: 'flex-start' }}>    
                        
                        { editSlide ?
                            <React.Fragment>
                                <EditIcon className={ classes.icon } /> 
                                <h3 className={classes.siteTextColor}>
                                    Edit Slide
                                </h3>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <AddIcon className={ classes.icon } /> 
                                <h3 className={classes.siteTextColor}>
                                    New Slide
                                </h3>
                            </React.Fragment>
                        }
                        </Typography>
                    </Grid>

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
                    
                    {/* Editor for slide description/details */}
                    <Editor
                            apiKey={ keys.tinymce_api_key }
                            initialValue={ description }
                            init={{
                                theme: "modern",
                                height: 300,
                                plugins: ['link image code'],
                                toolbar: `undo redo | bold italic | alignleft aligncenter alignright | code
                                         | image | link`,
                                file_browser_callback_types: 'file image media',
                                images_upload_url: `${environment.serverUrl}/file-upload`
                               
                            }}
                            onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                    "description") }
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
                            onClick = { () => {
                                this.props.editSlide ? 
                                    this.props.updateSlide(this.state.slide):
                                    this.props.addSlide(this.state.slide)
                                }
                            }>
                        <AddIcon className={classes.icon} /> 
                        { this.props.editSlide ? 'Update slide' : 'Attach Slide' }
                    </Button>
                </Grid>
                </Grid>
        )


    }

}

export default withStyles(styles)(NewSlide)