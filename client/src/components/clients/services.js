import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
                <div className={classes.container} style={{ marginTop: "4em", ...servicesAlignment }}>
                    My service description goes here
                </div>

                <div className={classes.container} style={{ marginTop: "4em", ...servicesAlignment }}>
                    {/* Services are listed here */}
                    {
                        services.length > 0 
                        
                        &&

                        services.map( (service, index) => (
                            <div className={ classes.containerChild } key={index}>
                                <Slide left={ index % 2 === 0 }  right={ index % 2 !== 0 }>
                                    <Card className={classes.card}>
                                        <div className={ classes.cardChildImg } style={{ paddingTop: "16px" }}>
                                            <img src={ extractImageSrc(service.service_img) } 
                                                 alt="A service bg"/>
                                        </div>
        
                                        <div className={ classes.cardChildDescription }>
                                            <CardContent>
                                                <Typography className={classes.title} color="textSecondary">
                                                    <span style={{ fontSize: "20px" }}>{ service.title }</span>
                                                </Typography>
                                                { service.description }
                                            </CardContent>
                                            <CardActions>
                                            <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </div>
                                    </Card>
                                </Slide>
                            </div>
                        ))    

                    }

                </div>

            </div>

        );

    }

}


export default withStyles(styles)(Services);