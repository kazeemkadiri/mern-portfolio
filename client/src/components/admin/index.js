import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';

import { Route } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Navbar from '../clients/navbar';
import Sidebar from './sidebar';


import ProjectComponent from './projects';
import ViewProjectComponent from './view-project';
import BioComponent from './my-bio';
import ServicesComponent from './my-services';
import LoginComponent from './login-form';
import EditProjectComponent from './edit-project';
import { justify_align_center } from './css/global'
import './css/global.css'


const LoginMutation = gql`
    mutation($email: String!, $password: String!) {
        loginUser(email: $email, password: $password){
            userExists
        }
    }`
    
const bioQuery = gql`
    {
        getBioData{
            email,
            phone_no
        }
    }
`

const styles = () => ({

    justifyAlignCenter: justify_align_center,
    mainContent: {
        marginTop: "10%"
    }

})




class AdminIndex extends Component{

    state = {
        isLoggedIn: false,
        authenticationState: 'pending'
    }

    componentWillMount() {

        if(this.props.authenticated) {
            this.setState({
                isLoggedIn: true
            })
        }

    }

    logoutUser = (logoutClicked) => {

        if(!logoutClicked) return

        sessionService.deleteSession()
        this.setState({ isLoggedIn: false, authenticationState: 'pending' })

    }

    loginUser = (formData) => {

        this.props.LoginMutation({
            variables:{
                ...formData
            },
            update: (_, { data: { loginUser: { userExists } } }) => {
            
                if(!userExists){

                    this.setState({authenticationState: 'failed' })

                    return
                }

                sessionService.saveSession( { formData } )
                
                this.setState({ isLoggedIn: userExists });

            }
        })


    }

    render() {

        const { 
            classes, 
            authenticated, 
            checked, 
            bio: { 
                getBioData
            }  
        } = this.props

        const { authenticationState } = this.state
        return (
            
            <div className="AdminIndex" style={{ width: "100%", height: '100%' }}>
                <Navbar 
                    email={ getBioData !== undefined ? getBioData.email : ''} 
                    phone_no={ getBioData !== undefined ? getBioData.phone_no : ''} 
                    authenticated = { authenticated }
                    navbarFixed = {true}
                    logoutUser={this.logoutUser} />
                
                <Grid container 
                      spacing={0} 
                      style={{ 
                          flexGrow: 1, 
                          justifyContent: "center", 
                          marginTop: "8vh",
                          height: '92vh'
                        }}>
                
                { checked && authenticated &&
                        <Fragment>
                        <Grid item xs={12} sm={4} md={3}>
                            
                            <Sidebar style={{ position:"fixed" }}/>

                        </Grid>
                        
                        <Grid item xs={12} sm={8} md={9}>
                            <div className={ classes.mainContent } style={{ marginTop: '20px', marginBottom: '20px' }}> 
                                
                                <Route path="/admin/projects" exact component={ ProjectComponent } />
                                <Route path="/admin/projects/add-project" exact component={ ProjectComponent } />
                                <Route path="/admin/projects/edit-project" exact component={ EditProjectComponent } />
                                <Route path="/admin/projects/view-project" exact component={ ViewProjectComponent } />
                                <Route path="/admin/bio" exact component={ BioComponent } />  
                                <Route path="/admin/services" exact component={ ServicesComponent } />  

                            </div>
                        </Grid>
                        </Fragment>
                }

                {
                    checked && !authenticated  &&
                    
                        <Grid item xs={12} sm={12} md={9} className={ classes.justifyAlignCenter }>
                            <LoginComponent 
                                submit={this.loginUser} 
                                authenticationState={authenticationState} />
                        </Grid>
                }
                                
                </Grid>
            </div>
        )

    }

}

const { bool } = PropTypes;

AdminIndex.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(
    compose(
        graphql(LoginMutation, {name:'LoginMutation'}),
        graphql(bioQuery, {name: 'bio'})
    )(withStyles(styles)(AdminIndex)));