import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sessionService } from 'redux-react-session';

import { Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
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


const LoginMutation = gql`
    mutation($email: String!, $password: String!) {
        loginUser(email: $email, password: $password){
            userExists
        }
    }

` 

const styles = () => ({

    mainContent: {
        marginTop: "10%"
    }

})




class AdminIndex extends Component{

    componentWillMount() {

        //sessionService.deleteSession();

    }

    logoutUser = (param) => {

        if(param)
        sessionService.deleteSession()

    }

    loginUser = (formData) => {

        this.props.LoginMutation({
            variables:{
                ...formData
            },
            update: (_, { data: { loginUser } }) => {

                // console.log(loginUser);
                if(loginUser.userExists){
                    sessionService.saveSession( { formData } )
                }
                

                this.setState({ isLoggedIn: loginUser.userExists });

            }
        })


    }

    render() {

        const { classes, authenticated, checked } = this.props;

        return (
            
            <div className="AdminIndex" style={{ width: "100%" }}>
                <Navbar logoutButton={true} logoutUser={this.logoutUser} />
                <Grid container spacing={0} style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}>
                { checked && authenticated &&
                        <Fragment>
                        <Grid item xs={12} sm={12} md={3}>
                            
                            <Sidebar style={{ position:"fixed", top:"20%" }}/>

                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={9}>
                            <div className={ classes.mainContent } style={{ marginTop: "10%" }}> 
                                
                                <Route path="/admin/projects" exact component={ ProjectComponent } />
                                <Route path="/admin/projects/add-project" exact component={ ProjectComponent } />
                                <Route path="/admin/projects/view-project" exact component={ ViewProjectComponent } />
                                <Route path="/admin/bio" exact component={ BioComponent } />  
                                <Route path="/admin/services" exact component={ ServicesComponent } />    
                            </div>
                        </Grid>
                        </Fragment>
                }

                {
                    checked && !authenticated  &&
                    
                        <Grid item xs={12} sm={12} md={9}>
                            <LoginComponent submit={this.loginUser} />
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

export default connect(mapState)(graphql(LoginMutation, {name:'LoginMutation'})(withStyles(styles)(AdminIndex)));