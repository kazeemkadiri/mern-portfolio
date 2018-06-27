import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Carousel } from 'react-responsive-carousel';

const styles = () => ({

    root: {
        flexGrow: "1"
    }


});

class FullProjectDisplay extends Component {


    render() {

        const { classes , project  } = this.props;
        
        console.log(project);
        
        return (
            <div className={ classes.root } >
                <Grid container spacing={2}>
                    
                    <Grid item xs={12} sm={6} md={8}>
                        {/* Carousel slides of the project images are rendered here */}
                        <Carousel>
                            { project.slides.map( slide => ( <div>
                                <img src = { slide.image_path } 
                                     alt={slide.title} />
                                    <p className="legend"> { slide.title } </p>
                                </div>)
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