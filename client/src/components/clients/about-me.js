import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { extractImageSrc } from './utils/utils';
  

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

        const { aboutMe: { description, about_me_img } } = this.props;

        return (

            <div className="AboutMe" style={{ width: "100%", marginTop: "40px" }}>
                <div className={classes.container}>
                    <div className={ classes.containerChild }>
                        <img src={ extractImageSrc(about_me_img) } style={{ maxWidth: "100%" }} alt="about_me_background_image"/>
                    </div>
                    <div className={ classes.containerChild } 
                         dangerouslySetInnerHTML={{__html: description}}>
                        
                    </div>
                </div>
            </div>

        );

    }

}


export default withStyles(styles)(AboutMe);