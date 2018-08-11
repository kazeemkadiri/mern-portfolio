import React from 'react'
import Navbar from './navbar'

class LoadingComponent extends React.Component{


    render() {

        return (
            <React.Fragment>
                <Navbar />
                <div>Loading...</div>
            </React.Fragment>
        )

    }

}

export default LoadingComponent