import React, {Component} from 'react';
import ReactModal from 'react-modal';

class Modal extends Component {

    constructor() {

        super();

        this.overlayRef = null;
        this.contentRef = null;
    }

    componentDidMount() {
    
        console.log(this.overlayRef, this.contentRef);

    }

    render() {

        const { modalOpen } = this.props;

        return (
            <ReactModal
            isOpen={ modalOpen }
            overlayRef={node => this.overlayRef = node}
            contentRef={node => this.contentRef = node}
            >
                <p>Modal Content.</p>
            </ReactModal>
        )
    }

}

export default Modal;