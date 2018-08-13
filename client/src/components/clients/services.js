import React, { Component } from 'react';
import { withStyles, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from 'react-reveal/Slide';

import { servicesAlignment } from './global-component-styles/styles.js'
import { styles } from './global-component-styles/services-styles';
import { extractImageSrc } from './utils/utils';


class Services extends Component {

    constructor() {

        super();

        this.slideAnimationDirections = [ "slideInLeft", "slideInRight" ];

    }

    render() {

        const { classes, services } = this.props;

        // console.log(services);

        return (

            <div className="Services" id="services" style={{ width: "100%", marginTop: "40px" }}>
                <div className={ classes.sectionHeader }>
                    <h1 className={ classes.removeWebKit }>SERVICES</h1>
                    <hr className={ classes.underLine } />
                </div>
                

                {/* Brief service description goes here */}
                <div className={`${classes.container} ${classes.siteTextColor}`} 
                     style={{ marginTop: "4em", marginBottom:'2em', ...servicesAlignment }}>
                     The services I provide are listed below
                </div>


                {/* <div className={classes.container} style={{ marginTop: "4em", ...servicesAlignment }}> */}
                    <Grid container spacing={0}>
                    {/* Services are listed here */}
                    {
                        services.length > 0 
                        
                        &&

                        services.map( (service, index) => (
                            <Grid item sm={12} md={6} className={ classes.containerChild } key={index}>
                                
                                <Slide left={ index % 2 === 0 }  right={ index % 2 !== 0 }>
                                        <Card className={ `${classes.card} ${classes.serviceContainer}` }>
                                            <CardContent style={{ width: '100%', padding: '0px' }}>
                                            <Grid container spacing={0} style={{ width: '100%' }}>
                                                <Grid item sm={4} md={4}>
                                                    <div style={
                                                                    { 
                                                                        overflow:'hidden', 
                                                                        height: '90px', 
                                                                        width: '100%',
                                                                        margin: '18px 4%' 
                                                                    }
                                                                }>
                                                        <img src={ extractImageSrc(service.service_img) } 
                                                            alt={service.title}
                                                            style={{ width: 'inherit' }} />
                                                    </div>
                                                </Grid>

                                                <Grid item sm={8} md={8}>
                                                    <div className={ classes.cardChildDescription }>
                                                        

                                                            <Typography 
                                                                className={classes.title} 
                                                                color="textSecondary"
                                                                dangerouslySetInnerHTML={{__html: service.title}}>
                                                                
                                                            </Typography>

                                                            <p className={classes.siteTextColor} dangerouslySetInnerHTML={{__html: service.description}}>
                                                                
                                                            </p>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            </CardContent>
                                        </Card>
                                    </Slide>
                            </Grid>
                        ))    

                    }
                    </Grid>
                </div>

            // </div>

        );

    }

}


export default withStyles(styles)(Services);