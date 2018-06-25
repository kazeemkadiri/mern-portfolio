import React, { Component } from 'react';
import  Navbar  from './navbar';
import Header from './header';
import AboutMe from './about-me';
  
export default class ClientIndex extends Component {

    render() {
        
        return (

            <div className="ClientIndex">
                <Navbar />
                <Header />
                <AboutMe />
            </div>

        );

    }

}


