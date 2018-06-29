import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from 'react-reveal/Slide';
import { removeWebKit, servicesAlignment } from './global-component-styles/styles.js'



const styles = () => ({
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    containerChild: {
        flex: 1,
        flexBasis: "40%",
        position: "relative",
        margin: "10px 2%"
    },
    cardChildImg: {
        flex: 1,
        margin: "10px 2%"
    },
    cardChildDescription: {
        flex: 2,
        margin: "10px 2%"
    },
    removeWebKit: removeWebKit,
    servicesAlignment: servicesAlignment,
    sectionHeader: {
        ...servicesAlignment,
        color: "#0c2e8a"
    },
    underLine: {
        background: "#50d8af",
        width: "3%",
        height: "3px",
        float: "left",
        ...removeWebKit
    },
    card: {
        minWidth: 275,
        display: "flex"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
  });



class Services extends Component {

    constructor() {

        super();

        this.slideAnimationDirections = [ "slideInLeft", "slideInRight" ];

    }

    render() {

        const { classes } = this.props;

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
                    <div className={ classes.containerChild }>
                       <Slide left={true} >
                            <Card className={classes.card}>
                                <div className={ classes.cardChildImg }>
                                    <img src='https://placehold.it/100x100' alt="A service bg"/>
                                </div>

                                <div className={ classes.cardChildDescription }>
                                    <CardContent>
                                    <Typography className={classes.title} color="textSecondary">
                                        Service Description
                                    </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Button size="small">Learn More</Button>
                                    </CardActions>
                                </div>
                            </Card>
                        </Slide>
                    </div>

                    <div className={ classes.containerChild }>
                       <Slide right={ true } >
                            <Card className={classes.card}>
                                <div className={ classes.cardChildImg }>
                                    <img src='https://placehold.it/100x100' alt="A service bg" />
                                </div>

                                <div className={ classes.cardChildDescription }>
                                    <CardContent>
                                    <Typography className={classes.title} color="textSecondary">
                                        Service Description
                                    </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Button size="small">Learn More</Button>
                                    </CardActions>
                                </div>
                            </Card>
                        </Slide>
                    </div>

                </div>

            </div>

        );

    }

}


export default withStyles(styles)(Services);