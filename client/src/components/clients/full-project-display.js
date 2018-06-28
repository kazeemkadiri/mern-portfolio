import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
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

    constructor() {

        super();

        this.gridNodeRef = null;

    }

    adjustGridInnerDivHeight() {

       // console.log(this.gridNodeRef.childNodes[0]);

    }

    componentDidMount() {

        console.log(this.gridNodeRef);

        this.adjustGridInnerDivHeight();

    }

    gridNodeRef = (node) => {
        console.log(node);
    }

    render() {

        const { classes , project  } = this.props;
        
        console.log(project);
        
        return (
            <div className={ classes.root } style = {{ position: "relative", height: "100%" }}>
                <Grid container spacing={8} style={{ height: "100%" }}>
                    
                    <Grid className="carousel-grid-wrapper" item xs={12} sm={6} md={8} style={{ height: "100% !important" }}
                          ref={node => this.gridNodeRef = node}>

                        {/* Carousel slides of the project images are rendered here */}
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
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        {/*  Implementation details are rendered here */}
                        <h5> For each image slide diplay implementatio details </h5>
                    </Grid>

                </Grid>    
            </div>
        )

    }

}

export default withStyles(styles)(FullProjectDisplay);