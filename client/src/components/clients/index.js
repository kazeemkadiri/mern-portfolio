import React, { Component } from 'react';
import  Navbar  from './navbar';
import Header from './header';
import AboutMe from './about-me';
import Services from './services';
import MyPortfolio from './my-portfolio';
import ContactMe from './contact-me';
  
export default class ClientIndex extends Component {

    render() {
        
        return (

            <div className="ClientIndex">
                <Navbar />
                <Header />
                <AboutMe />
                <Services />
                <MyPortfolio />
                <ContactMe />
            </div>

        );

    }

}


