import React, { Component } from 'react';
import  Navbar  from './navbar';
import Header from './header';
  
export default class ClientIndex extends Component {

    render() {
        
        return (

            <div className="ClientIndex">
                <Navbar />
                <Header />
            </div>

        );

    }

}


