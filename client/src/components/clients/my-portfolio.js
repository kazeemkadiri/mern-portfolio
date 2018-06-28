import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import ReactModal from 'react-modal';
import FullProjectDisplay from './full-project-display';
import { removeWebKit, servicesAlignment } from './global-component-styles/styles.js'


const styles = () => ({
    
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
        maxHeight: "100%",
        margin: "10px 0px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
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
        height: "auto",
        width: "auto"
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
                {
                    title: "First Project",
                    description: "Description of first project",
                    implementation: "Built using laravel",
                    slides: [
                        {
                            title: "App homepage",
                            implemented_functionality: "Displays the dashboard of the application",
                            image_path: "https://unsplash.it/500x500"
                        },
                        {
                            title: "Contact Form",
                            implemented_functionality: "A contact form to send messages from clients to app mail server",
                            image_path: "https://unsplash.it/500/500"
                        },
                        {
                            title: "About us page",
                            implemented_functionality: "Displays the about us page of application",
                            image_path: "https://unsplash.it/500/500"
                        }
                    ]
                },
                {
                    title: "Second Project",
                    description: "Description of second project",
                    implementation: "Built using MEAN stack",
                    slides: [
                        {
                            title: "App homepage",
                            implemented_functionality: "Displays the dashboard of the application",
                            image_path: "https://unsplash.it/500x500"
                        },
                        {
                            title: "Contact Form",
                            implemented_functionality: "A contact form to send messages from clients to app mail server",
                            image_path: "https://unsplash.it/500/500"
                        },
                        {
                            title: "About us page",
                            implemented_functionality: "Displays the about us page of application",
                            image_path: "https://unsplash.it/500/500"
                        }
                    ]
                },
                {
                    title: "Third Project",
                    description: "Description of third project",
                    implementation: "Built using MEVN stack",
                    slides: [
                        {
                            title: "App homepage",
                            implemented_functionality: "Displays the dashboard of the application",
                            image_path: "https://unsplash.it/500x500"
                        },
                        {
                            title: "Contact Form",
                            implemented_functionality: "A contact form to send messages from clients to app mail server",
                            image_path: "https://unsplash.it/500/500"
                        },
                        {
                            title: "About us page",
                            implemented_functionality: "Displays the about us page of application",
                            image_path: "https://unsplash.it/500/500"
                        }
                    ]
                },
                {
                    title: "Fourth Project",
                    description: "Description of third project",
                    implementation: "Built using MEVN stack",
                    slides: [
                        {
                            title: "App homepage",
                            implemented_functionality: "Displays the dashboard of the application",
                            image_path: "https://unsplash.it/500x500"
                        },
                        {
                            title: "Contact Form",
                            implemented_functionality: "A contact form to send messages from clients to app mail server",
                            image_path: "https://unsplash.it/500/500"
                        },
                        {
                            title: "About us page",
                            implemented_functionality: "Displays the about us page of application",
                            image_path: "https://unsplash.it/500/500"
                        }
                    ]
                }
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

    }

    displayMaskOnHoveredProject(hoveredElement){

        const projectBlackOverlay = this.getOverlayDiv(hoveredElement);

        projectBlackOverlay.style.opacity = "0.6";

    }

    displayFullProjectInModal = (project) => {

        // Change the state of the modal to open,
        this.setState({ modalIsOpen: true, currentViewingProject: project });

    }

    // This methid gets the overlay div used to render a dark mask on hovering a project
    getOverlayDiv(hoveredElement) {
        
        let blackOverlay = '';

        if( Array.from(hoveredElement.classList).join('').match(/black-overlay/) ) {
        
            blackOverlay = hoveredElement;

        }else if( (Array.from(hoveredElement.classList).join('').match(/(text-mask)/) ) ) {

            blackOverlay = hoveredElement.parentNode.childNodes[1];

        }else {

            blackOverlay = hoveredElement.parentNode.parentNode.childNodes[1];            

        }

        return blackOverlay;
                    
    }

    render() {
        
        const { classes } = this.props;

        // Obtain the projects from the state object 
        const { projects, currentViewingProject, modalIsOpen } = this.state;

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
                
                <div className={ classes.sectionHeader }>
                    <h1 className={ classes.removeWebKit }>MY PORTFOLIO</h1>
                    <hr className={ classes.underLine } />
                </div>
                

                {/* Brief service description goes here */}
                <div className={classes.container} style={{ marginTop: "4em", ...servicesAlignment }}>
                    { projects.map( (project, index) => (
                                    <div className={ classes.containerChild } 
                                         onMouseOver={ ($event) => this.projectHovered($event) }
                                         onMouseOut={ ($event) => this.removeMask($event) }
                                         key={index}>
                                        <img src={project.slides[0].image_path} 
                                             alt={project.slides[0].title} 
                                             style={{ width:"100%" }} />

                                        {/* Overlay displayed on hover of project */}
                                        <div className={`black-overlay ${classes.mask}`} 
                                             style={{ background: "black", opacity: "0", top: 0, bottom: 0, left: 0, right: 0 }}>
                                            
                                        </div>
                                        
                                        {/* The overlay holds the title of the image */}
                                        <div className={`text-mask ${classes.mask}`} 
                                             style={{ cursor: "pointer" }}
                                             onClick={() => this.displayFullProjectInModal(project)}>

                                            <h3 style={{ color: "white", cursor: "pointer" }}>{ project.title.toUpperCase() }</h3>
                                        </div>

                                    </div>
                                    )
                                )
                    }
                </div>

            </div>

        );

    }

}


export default withStyles(styles)(MyPortfolio);