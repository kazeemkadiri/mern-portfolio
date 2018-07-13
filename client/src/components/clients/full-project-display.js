import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/custom-carousel.css';


const styles = () => ({

    root: {
        flexGrow: "1"
    }

});

class FullProjectDisplay extends Component {

    state = {
        projectSlidesExist: false
    }

    componentWillMount() {

        this.setState({
            projectSlidesExist: this.props.project.slides.length > 0
        })

    }

    gridNodeRef = (node) => {
        // console.log(node);
    }

    render() {

        const { classes , project  } = this.props;
                
        const { projectSlidesExist } = this.state;

        return (
            <div className={ classes.root } style = {{ position: "relative", height: "100%" }}>
                <Grid container spacing={8} style={{ height: "100%" }}>
                    
                    <Grid className="carousel-grid-wrapper"
                           item xs={12} sm={6} md={8} style={{ height: "100% !important" }}>

                        {/* Carousel slides of the project images are rendered here */}
                        { 
                            projectSlidesExist > 0 && 
                            <Carousel>
                                { project.slides.map( slide => ( 
                                    
                                    <div style={{ position: "relative", height: "100%" }} key={slide}>
                                        
                                        <img src = { slide.image_path } 
                                            alt = {slide.title} 
                                            style = {{ height: "100%" }} />

                                        <p className="legend"> { slide.title } </p>

                                    </div>
                                    
                                    )
                                ) 
                                }
                            </Carousel>
                        }
                    </Grid>

                    <Grid item xs={12} sm={6} md={ projectSlidesExist ? 4 : 12 } 
                                style={{ display: "flex", justifyContent: "center" }}>
                        {/*  Implementation details are rendered here */}
                        { 
                            projectSlidesExist && 
                            <h5> For each image slide diplay implementation details </h5> 
                        }
                        {
                            !projectSlidesExist && 
                            <h3 style={{ fontWeight: "bold" }}> There are no slides for this project. </h3> 
                        }

                    </Grid>

                </Grid>    
            </div>
        )

    }

}

export default withStyles(styles)(FullProjectDisplay);