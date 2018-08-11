import React from 'react'
import ReactModal from 'react-modal'

import { extractImageSrc } from '../clients/utils/utils';
import { justify_align_center } from './css/global';
import { withStyles, Grid } from '@material-ui/core';

const styles = () => ({

    justifyAlignCenter: justify_align_center

})

const modalCustomStyles = {

    top: '20px'

}

class SlidePreview extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            modalIsOpen: true
        }

        // Modal properties
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal = () =>  {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
        
        //uninitializes the slide being previewed on the parent component
        this.props.slidePreviewClosed(null)
    }

    adjustModalPositioning = (overlayRef) => {

        if ( overlayRef === null ) return;

        overlayRef.style.top = "8%";

        overlayRef.style.background = "rgba(0, 0, 0, 0.75)";

    }

    render() {

        const { slide, classes } = this.props

        const { modalIsOpen } = this.state

        console.log(slide)

        return (
            <React.Fragment>
                
                <ReactModal
                    isOpen = { modalIsOpen }
                    onAfterOpen = {this.afterOpenModal}
                    onRequestClose = {this.closeModal}
                    style = {modalCustomStyles}
                    contentLabel = { slide.title } 
                    overlayRef = {node => this.adjustModalPositioning(node) }
                    contentRef = {node => this.contentRef = node}
                    >

                    <Grid container spacing={0} style={{ height: '100%' }}>

                        <Grid item md={12} className={ classes.justifyAlignCenter }>

                            <img src={ extractImageSrc(slide.image_path) } alt={ slide.title } />

                        </Grid>

                    </Grid>
                       
                </ReactModal>

            </React.Fragment>
        )

    }

}

export default withStyles(styles)(SlidePreview)