import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql  from 'graphql-tag';

import  Navbar  from './navbar';
import Header from './header';
import AboutMe from './about-me';
import Services from './services';
import MyPortfolio from './my-portfolio';
import ContactMe from './contact-me';
  

const portfolioQuery = gql`
    {
        allPortfolioData {
            bio {
                id,
                description,
                about_me_img,
                header_bg_img,
                header_bg_img_text,
                phone_no,
                email
            },
            projects {
                id,
                title,
                description,
                implementation_details,
                slides {
                    title,
                    implemented_functionality,
                    image_path
                }
            },
            services {
                id,
                title,
                description,
                service_img
            }
        }
    
    }
`;



class ClientIndex extends Component {

    state = {
        allPortfolioData:{ bio: '', services: '', projects: '', contactMe: ''}
    }

    initializePortfolioData = (allPortfolioData) => {

        this.setState({
            allPortfolioData: {
                "bio": allPortfolioData.bio,

                "projects": allPortfolioData.projects,

                "services": allPortfolioData.services,

                "contactMe": allPortfolioData.contactMe || ''
            }
        })

    }

    componentWillReceiveProps(nextProps) {

        if( !nextProps.data.hasOwnProperty('allPortfolioData') ) return;

        this.initializePortfolioData(nextProps.data.allPortfolioData);
    }

    render() {

        if(this.state.allPortfolioData.bio === '') return '';

        const { allPortfolioData: { bio, services, projects } } = this.state;

        console.log(bio);

        return (

            <div className="ClientIndex">
                <Navbar />
                <Header header={ bio } />
                <AboutMe aboutMe={ bio } />
                <Services services={ services } />
                <MyPortfolio projects={ projects } />
                <ContactMe contactMe={ bio }  />
            </div>

        );

    }

}

export default graphql( portfolioQuery )(ClientIndex)

