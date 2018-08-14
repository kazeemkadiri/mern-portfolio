import React, { Component } from 'react';
import { graphql } from 'react-apollo'

import { extractImageSrc } from '../clients/utils/utils'

import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { Carousel } from 'react-responsive-carousel';
import './css/custom-carousel.css'
import { Typography } from '@material-ui/core';

import NewSlideComponent from './new-slide'

import { updateProjectSlideMutation } from './graphql/mutations'

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



class AddProject extends Component{

    constructor() {

        super()

        this.slide = {
            title:"",
            description: "",
            image_path: ""
        }

        this.state = {
            
            project: {
            },
            slide: this.slide
        }

    }

    componentWillMount() {

        // console.log(JSON.parse(localStorage.getItem("project")))
        
        this.setState({
            project: JSON.parse(localStorage.getItem("project"))
        })

    }

    addSlide = (slide) => {

        // console.log(slide)

        // Run mutation to update the project slides`
        const { project } = this.state;


        this.props.updateProjectSlide({
            variables:{
                projectId: project.id,
                ...slide
            },
            update: (store, { data: { addProjectSlide } }) => {

                // console.log(addProjectSlide)

                const slides = addProjectSlide

                this.setState({

                    "project": {
                        ...project,
                        slides
                    },
                    slide:this.slide
                })

                // console.log(this.state.project)
            }
        })

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

    deleteSlide(slide) {

        const { project, project: { slides } } = this.state;

        const slideIndex = slides.indexOf(slide);

        if(slideIndex > -1) slides.splice(slideIndex, 1);

        // Update the state of slides
        this.setState({
            "project":{
                ...project,
                "slides": slides
            }
        })
        
    }

    editSlide(slide) {

        this.setState({
            slide: slide
        })

    }


    render() {


        const { classes } = this.props;

        const { project } = this.state;


        return (
            <Grid container spacing={0} className={ classes.topPageStyles }>
                
                <Grid item xs={12} sm={12} md={8}>
                    <h4> Title: </h4> { project.title }
                    <h4> Description: </h4> { project.description }
                </Grid>

                <Grid item xs={12} sm={12} md={8} style={{ marginTop: '2rem' }}>
                    
                    {/* Carousel slides of the project images are rendered here */}
                    <Typography><strong>Slides ({project.title})</strong></Typography>

                    { (project.slides.length > 0) 
                            && 
                        <Carousel 
                            style={{ height: '100%' }} 
                            className={ `${classes.carouselContainer} carousel-container` } >
                           
                           {project.slides.map( slide => ( 
                            
                            <div style={{ position: "relative", height: "100%" }} key={slide}>
                                
                                <img src = { extractImageSrc(slide.image_path) }
                                    alt = {slide.title} 
                                    style = {{ height: '100%', width: 'auto' }} />

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
                            ) }
                        
                    </Carousel>
                }
                </Grid>

                <NewSlideComponent 
                    addSlide={this.addSlide} />

            </Grid>
        )

    }

}

export default graphql(updateProjectSlideMutation, 
                        {name: 'updateProjectSlide'})(withStyles(styles)(AddProject))