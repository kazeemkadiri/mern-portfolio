import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
  

const styles = theme => ({
    container: {
        display: "flex",
        justifyContent: "space-between"
    },
    containerChild: {
        flex: 1,
        flexBasis: "40%",
        position: "relative",
        margin: "10px 5%"
    }
  });


class AboutMe extends Component {

    render() {
        
        const { classes } = this.props;

        return (

            <div className="AboutMe" style={{ width: "100%", marginTop: "40px" }}>
                <div className={classes.container}>
                    <div className={ classes.containerChild }>
                        <img src="header_bg_img.jpg" style={{ maxWidth: "100%" }} alt="header_background_image"/>
                    </div>
                    <div className={ classes.containerChild }>
                        My About me description goes here
                    </div>
                </div>
            </div>

        );

    }

}


export default withStyles(styles)(AboutMe);