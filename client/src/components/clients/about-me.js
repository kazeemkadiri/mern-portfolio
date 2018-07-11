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

    state = {
        aboutMeDescription: '',
        aboutMeImg: ''
    }

    
    setAboutMeDataInState = (aboutMe) => {

        this.setState({
            aboutMeDescription: aboutMe.description,
            aboutMeImg: extractImageSrc(aboutMe.about_me_img)
        })

    }


    componentWillReceiveProps(nextProps) {

        if( !nextProps.hasOwnProperty('aboutMe') ) return;

        this.setAboutMeDataInState(nextProps.aboutMe);

    }

    render() {
        
        const { classes } = this.props;

        const { aboutMeDescription, aboutMeImg } = this.state;

        if( !aboutMeImg ) return '';

        // console.log(aboutMeImg);

        return (

            <div className="AboutMe" style={{ width: "100%", marginTop: "40px" }}>
                <div className={classes.container}>
                    <div className={ classes.containerChild }>
                        <img src={aboutMeImg} style={{ maxWidth: "100%" }} alt="header_background_image"/>
                    </div>
                    <div className={ classes.containerChild }>
                        { aboutMeDescription }
                    </div>
                </div>
            </div>

        );

    }

}


export default withStyles(styles)(AboutMe);