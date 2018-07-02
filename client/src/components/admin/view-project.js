import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { keys } from '../../keys';

import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Carousel } from 'react-responsive-carousel';


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
            
            project: {
                title: "Custom cms project",
                description: "A website management system",
                slides:[
                ]
            },
            slide:{
                title:"",
                description: "",
                image_path: ""
                
            }

        }

    }

    addSlide() {

        const { project, project: { slides } } = this.state;

        slides.push(this.state.slide);

        this.setState({

            "project": {
                ...project,
                "slides":slides
            }

        })

        this.setState({
            slide:{
                title:"",
                description: "",
                image_path: ""
            }
        })
        

        console.log(this.state.project);

    }

    updateFormParametersObject(value, formField) {

        const { slide } = this.state;

        this.setState({
            "slide": {
                ...slide,
                [formField]: value
            }
        }) 

        console.log(this.state.slide);

    }

    deleteSlide(slide) {

        console.log(slide);

        // Make a graphql mutation call to delete slide

        //Remove slide from the list of slides in project
        const { project, project: { slides } } = this.state;

        const slideIndex = slides.indexOf(slide);

        (slideIndex > -1) ? slides.splice(slideIndex, 1) : '';

        // Update the state of slides
        this.setState({
            "project":{
                ...project,
                "slides": slides
            }
        })
        
    }

    editSlide(slide) {

        console.log("editing slide", slide);

        // Confirm if currently working on attaching a new slide

        this.setState({
            slide: slide
        })

    }


    render() {


        const { classes } = this.props;

        const { project, slide: { image_path, title } } = this.state;

        return (
            <Grid container spacing={0} className={ classes.topPageStyles }>
                
                <Grid item xs={12} sm={12} md={8}>
                    <h4> Title: </h4> { project.title }
                    <h4> Description: </h4> { project.description }
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                    {/* Carousel slides of the project images are rendered here */}
                    <Carousel>
                        { (project.slides.length > 0) ? project.slides.map( slide => ( 
                            
                            <div style={{ position: "relative", height: "100%" }} key={slide}>
                                
                                <img src = { slide.image_path } 
                                    alt = {slide.title} 
                                    style = {{ height: "100%" }} />

                                <p className="legend">
                                    { slide.title }
                                    
                                    {/* Slide delete button */}
                                    <Button variant="contained" 
                                            color="primary" 
                                            className={classes.button}
                                            onClick = { () => this.deleteSlide(slide) }>
                                        <Icon></Icon>Delete
                                    </Button>

                                    {/* Slide edit button */}
                                    <Button variant="contained" 
                                            color="primary" 
                                            className={classes.button}
                                            onClick = { () => this.editSlide(slide) }>
                                        <Icon></Icon>Edit
                                    </Button>
                                 </p>

                            </div>
                            
                            )
                            ): ""
                        }
                    </Carousel>
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                    <Button variant="contained" 
                            color="primary" 
                            className={classes.button}
                            onClick = { () => this.addSlide() }>
                        <Icon></Icon>Attach Slide
                    </Button>
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
                    {/* Editor to attach new slide for project */}
                    <Editor
                            apiKey={ keys.tinymce_api_key }
                            initialValue={ image_path }
                            init={{
                            plugins: 'link image code',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                            }}
                            onChange={event => this.updateFormParametersObject(event.target.getContent(),
                                                    "slide_image") }
                        />
                </Grid>

            </Grid>
        )

    }

}

export default withStyles(styles)(AddProject);