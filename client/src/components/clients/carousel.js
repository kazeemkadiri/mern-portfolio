import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { extractImageSrc } from './utils/utils';


class MyCarouselComponent extends React.Component{

    state = {
        slides: null
    }

    componentWillMount() {
        this.initializeActiveCarouselSlideImage()
        this.registerListenerForCarouselSlideChange()
    }

    getCarouselContainer = () => {
        return document.querySelector('div.carousel-grid-wrapper')
    }

    initializeActiveCarouselSlideImage = () => {

        let carouselContainer = this.getCarouselContainer()

        if(!carouselContainer) {
            setTimeout(() => this.initializeActiveCarouselSlideImage(), 1000);
            return;
        }

        let activeSlideImg = this.getActiveSlide(carouselContainer)

        this.props.setActiveSlide(activeSlideImg.alt)
        
    }

    registerListenerForCarouselSlideChange = () => {

        const slidesListElement = document.querySelectorAll('div.carousel-grid-wrapper li.slide')

        if(!slidesListElement.length > 0) {
            setTimeout(() => this.registerListenerForCarouselSlideChange(), 1000);
            return;
        }
        
        let carouselContainer = this.getCarouselContainer()

        carouselContainer.addEventListener('click', () => {

            setTimeout(() => {
                
                let activeSlideImg = this.getActiveSlide(this.getCarouselContainer())


                this.props.setActiveSlide(activeSlideImg.alt)

            }, 1000);


        });

        // const observer = 

        // slidesListElement.forEach( slideElement => {
         
        //     new MutationObserver(observedElement => {
        //         //console.log(observedElement)
    
        //         // setTimeout(() => {}, 3000)
    
        //         // observedElements.forEach( observedElement => {
    
        //             const slideListElement = observedElement[0].target
    
        //             console.log(slideListElement.classList)
    
        //             if(!slideListElement.classList.contains('selected') && this.state.settingActiveSlide)
        //                 return
    
        //             this.setState({ settingActiveSlide: true })

        //             console.log('setting active slide')
    
        //             const activeSlideImgAlt = slideListElement.querySelector('img').alt
    
        //             this.setActiveSlide(activeSlideImgAlt)
    
        //         // })
                
        //     }).observe(
        //         slideElement, 
        //         {
        //             attributes: true, 
        //             attributeFilter: ['class'],
        //             childList: false, 
        //             characterData: false
        //         }
        //     )

        // })

    }

    getActiveSlide = carouselContainer => {

        return carouselContainer.querySelector('li.slide.selected img')

        // return Array.from(carouselContainer.firstChild.firstChild.childNodes[1].firstChild.childNodes)
        //         .find(nodeElement => {

        //             return nodeElement.classList['value'] === 'slide selected'

        //         }).firstChild.firstChild

    }

    shouldComponentUpdate(nextProps, nextState) {

        return !this.props.slides

    }

    render() {
        
        const { slides } = this.props

        return(
            <Carousel>
                { slides.map( slide => ( 
                    
                    <div style={{ position: "relative", height: "100%" }} key={slide}>
                        
                        <img src = { extractImageSrc(slide.image_path) } 
                            alt = {slide.title} 
                            style = {{ height: "100%" }} />

                        <p className="legend"> { slide.title } </p>

                    </div>
                    
                    )
                ) 
                }
            </Carousel>
        )
    }

}

export default MyCarouselComponent