import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MyCarouselComponent from './carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './css/custom-carousel.css';


const styles = () => ({

    root: {
        flexGrow: "1"
    }

});

class FullProjectDisplay extends Component {

    state = {
        projectSlidesExist: false,
        activeSlide: null,
        settingActiveSlide: false
    }

    componentWillMount() {

        this.initializeProjectSlidesExist()

    }

    initializeProjectSlidesExist = () => {
        
        this.setState({
            projectSlidesExist: this.props.project.slides.length > 0
        })

    }

    setActiveSlide = activeSlideImgAlt => {

        let activeSlide = {}
        
        Object.assign( 
            activeSlide ,
            this.props.project.slides
                .find( slide => {
                    return slide.title === activeSlideImgAlt
                }))

        this.setState({ activeSlide })

    }

    gridNodeRef = (node) => {
        // console.log(node);
    }

    render() {

        const { classes , project  } = this.props;
                
        const { projectSlidesExist, activeSlide } = this.state;

        return (
            <div className={ classes.root } style = {{ position: "relative", height: "100%" }}>
                <Grid container spacing={8} style={{ height: "100%" }}>
                    
                    <Grid className="carousel-grid-wrapper"
                           item xs={12} sm={6} md={8} style={{ height: "100% !important" }}>

                        {/* Carousel slides of the project images are rendered here */}
                        { 
                            projectSlidesExist && 
                            <MyCarouselComponent 
                                slides={ project.slides } 
                                setActiveSlide={ this.setActiveSlide } />
                        }
                    </Grid>

                    <Grid item xs={12} sm={6} md={ projectSlidesExist ? 4 : 12 } 
                                style={{ display: "flex", justifyContent: "center" }}>
                        {/*  Implementation details are rendered here */}
                        { 
                            projectSlidesExist && 
                            <React.Fragment>
                            <h5> Implementation Details </h5> 
                            <p>
                                { activeSlide && activeSlide.description }
                            </p>
                            </React.Fragment>
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