import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';


const removeWebKit = {
    "-webkit-margin-before": "0em"
}

const servicesAlignment = {
    paddingLeft: "5%",
    justifyContent: "start"
}

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


class MyPortfolio extends Component {

    render() {
        
        const { classes } = this.props;

        return (

            <div className="MyPortfolio" id="portfolio" style={{ width: "100%", marginTop: "40px" }}>
                <div className={ classes.sectionHeader }>
                    <h1 className={ classes.removeWebKit }>MY PORTFOLIO</h1>
                    <hr className={ classes.underLine } />
                </div>
                

                {/* Brief service description goes here */}
                <div className={classes.container} style={{ marginTop: "4em", ...servicesAlignment }}>
                    MY Portfolio tiled images of projects are displayed here
                </div>

            </div>

        );

    }

}


export default withStyles(styles)(MyPortfolio);