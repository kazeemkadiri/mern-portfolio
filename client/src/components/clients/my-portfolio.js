import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import { withStyles, Button, Icon } from '@material-ui/core';

import ReactModal from 'react-modal';
import FullProjectDisplay from './full-project-display';
import { removeWebKit, servicesAlignment, justify_align_center } from './global-component-styles/styles.js'
import { extractImageSrc } from './utils/utils';

const styles = () => ({
    justifyAlignCenter: justify_align_center,
    ReactModal__Content: {
        height: "20% !important"
    },
    container: {
        display: "flex",
        position: "relative",
    },
    containerChild: {
        flex: 1,
        flexBasis: "25%",
        height: "200px !important",
        margin: "10px 0px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
        overflow: 'hidden'
    },
    cardChildImg: {
        flex: 1,
        margin: "10px 2%"
    },
    cardChildDescription: {
        flex: 2,
        margin: "10px 2%"
    },
    mask: {
        position: "absolute",
        margin: "auto",
        height: "200px !important",
        width: "100%",
        transition: 'opacity 0.4s'
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
        border: "1px solid #50d8af",
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
    },
    transition: {
        transition: 'zoom 0.4s'
    }
  });

const modalCustomStyles = {

    top: "20px"

};


ReactModal.setAppElement('#root');

class MyPortfolio extends Component {

    constructor(){

        super();

        this.state = {
            projects: [
            ]
            ,modalIsOpen: false,
            currentViewingProject: ''
        }

        // Modal properties
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    adjustModalPositioning = (overlayRef) => {

        if ( overlayRef === null ) return;

        overlayRef.style.top = "8%";

        overlayRef.style.background = "rgba(0, 0, 0, 0.75)";

    }


    projectHovered = ($event) => {

        const hoveredElement = $event.target;

        this.displayMaskOnHoveredProject(hoveredElement);

    }

    removeMask = ($event) => {

        const hoveredElement = $event.target;

        const projectBlackOverlay = this.getOverlayDiv(hoveredElement); 

        projectBlackOverlay.style.opacity = "0";

        projectBlackOverlay.parentNode.childNodes[0].style.zoom = 0

    }

    displayMaskOnHoveredProject(hoveredElement){

        const projectBlackOverlay = this.getOverlayDiv(hoveredElement);

        if(projectBlackOverlay === '') return

        projectBlackOverlay.style.opacity = "0.6";

        projectBlackOverlay.parentNode.childNodes[0].style.zoom = 1.2

    }

    displayFullProjectInModal = (project) => {

        // Change the state of the modal to open,
        this.setState({ modalIsOpen: true, currentViewingProject: project });

    }

    // This methid gets the overlay div used to render a dark mask on hovering a project
    getOverlayDiv(hoveredElement) {
        
        let blackOverlay = '';

        // if( Array.from(hoveredElement.classList).join('').match(/black-overlay/) ) {
        
        //     blackOverlay = hoveredElement;

        // }else 
        if( (Array.from(hoveredElement.classList).join('').match(/(text-mask)/) ) ) {

            blackOverlay = hoveredElement.parentNode.childNodes[1];

        }
        else {

            blackOverlay = hoveredElement.parentNode.parentNode.childNodes[1];            

        }

        return blackOverlay;
                    
    }

    render() {
        
        const { classes, projects, authenticated } = this.props;

        // Obtain the projects from the state object 
        const { currentViewingProject, modalIsOpen } = this.state;

        return (

            <div className="MyPortfolio" id="portfolio" style={{ width: "100%", marginTop: "40px" }}>
                
                {/* Modal to display the images and description of projects */}
                              
                <ReactModal
                    isOpen = { modalIsOpen }
                    onAfterOpen = {this.afterOpenModal}
                    onRequestClose = {this.closeModal}
                    style = {modalCustomStyles}
                    contentLabel = { currentViewingProject.title } 
                    overlayRef = {node => this.adjustModalPositioning(node) }
                    contentRef = {node => this.contentRef = node}
                    >

                    <FullProjectDisplay project = {currentViewingProject} />
                       
                </ReactModal>
                
                <div className={ classes.sectionHeader } style={ authenticated ? { paddingLeft: '0%' }: {}}>
                    <h1 className={ classes.removeWebKit }>MY PORTFOLIO</h1>
                    <hr className={ classes.underLine } />
                </div>

                {/* Brief service description goes here */}
                <div className={classes.container} style={ authenticated ? { paddingLeft: '0%' }: { marginTop: "4em", ...servicesAlignment }}>
                    { projects.map( (project, index) => (
                                    <Grid item sm={12} md={4} 
                                          className={ `${classes.containerChild} ${classes.justify_align_center}` } 
                                          key={index}
                                          style={{ height: '240px !important' }}>

                                        <img src={ 
                                                    (project.slides.length > 0) ?
                                                     extractImageSrc(project.slides[0].image_path) : 
                                                     'https://placehold.it/300x300'
                                                } 
                                            alt={ 
                                                    (project.slides.length > 0) ?
                                                     project.slides[0].title :
                                                     'No slides for project' 
                                                } 
                                            className={ classes.transition }
                                            style={{ maxWidth:"100% !important", height: '200px !important' }} />

                                        {/* Overlay displayed on hover of project */}
                                        <div className={`black-overlay ${classes.mask} `} 
                                             style={{ background: "black", opacity: "0", top: 0, bottom: 0, left: 0, right: 0 }}>
                                            
                                        </div>
                                        
                                        {/* The overlay holds the title of the image */}
                                        <div className={`text-mask ${classes.mask} ${ classes.justifyAlignCenter }`} 
                                             style={{ 
                                                        cursor: "pointer", 
                                                        textAlign: 'center', 
                                                        display: (authenticated ? 'block': 'flex') 
                                                    }}
                                             onMouseOver={ ($event) => this.projectHovered($event) }
                                             onMouseOut={ ($event) => this.removeMask($event) }
                                             onClick={() => this.displayFullProjectInModal(project)}>
       
                                                <h3 style={{ color: "white", cursor: "pointer" }}>
                                                    { project.title.toUpperCase() }
                                                </h3>

                                                {/* This button is displayed when editing project */}
                                                { 
                                                    authenticated && 
                                                    <Button variant="contained" color="primary"
                                                            className={`sendButton ${classes.button}`}
                                                            onMouseOver={ e => e.stopPropagation() }
                                                            onMouseOut={ e => e.stopPropagation() }
                                                            onClick={ e => {
                                                                        e.stopPropagation()
                                                                        this.props.editProject(project) 
                                                                    }
                                                                }>
                                                        <Icon>edit</Icon>&nbsp; &nbsp; Edit
                                                    </Button> 
                                                }
                                        </div>


                                    </Grid>
                                    )
                                )
                    }
                </div>

            </div>

        );

    }

}


export default withStyles(styles)(MyPortfolio);