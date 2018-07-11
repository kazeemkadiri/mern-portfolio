import React, { Component, Fragment } from 'react';
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
import ResetPasswordComponent from './reset-password';
import MailPasswordResetComponent from './mail-password-reset';


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

    state = {
        isLoggedIn: false
    }

    componentWillMount() {

        this.verifyLoggedIn()

    }

    resetPasswordUrl = () => {

        console.log(this.props)

        return this.props.location.pathname.match(/reset-password/);

    } 

    verifyLoggedIn = () => {

        if(localStorage.getItem("isLoggedIn")) this.setState({ isLoggedIn: true });

    }

    loginUser = (formData) => {

        console.log(formData);

        this.props.LoginMutation({
            variables:{
                ...formData
            },
            update: (_, { data: { loginUser } }) => {

                console.log(loginUser);

                this.setState({ isLoggedIn: loginUser.userExists });

            }
        })


    }

    render() {

        const { classes } = this.props;

        const { isLoggedIn, isResetPassword } = this.state;

        return (

            <div className="AdminIndex" style={{ width: "100%" }}>
                <Navbar />
                <Grid container spacing={0} style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}>
                { isLoggedIn &&
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
                    !isLoggedIn && !this.resetPasswordUrl() &&
                    
                        <Grid item xs={12} sm={12} md={9}>
                            <LoginComponent submit={this.loginUser} />
                        </Grid>
                }
                <Grid item xs={12} sm={12} md={9} style={{ display: "flex", justifyContent: "center" }}>
                    <div className={ classes.mainContent } style={{ marginTop: "10%" }}>
                        <Route path="/admin/reset-password" component={ ResetPasswordComponent } />    
                    </div>
                </Grid>
                
                                
                </Grid>
            </div>
        )

    }

}

export default graphql(LoginMutation, {name:'LoginMutation'})(withStyles(styles)(AdminIndex));