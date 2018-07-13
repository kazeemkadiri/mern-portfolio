import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Validator from 'validator';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const ResetPasswordMutation = gql`
    mutation($email: String!) {
        resetPassword(email: $email){
            emailExists,
            mailStatus
        }
    }

` 

const styles = theme => ({

    mainContent: {
        marginTop: "10%"
    },
    snackbar: {
        margin: theme.spacing.unit,
    }

})


class ResetPassword extends Component{

    state = {
        data: {
            email: ''
        },
        formError: false,
        mailStatus: null
    }

    doResetPassword = () => {
    
        if(!this.formValid()) return;

        const { data } = this.state;

        this.props.resetPassword({
            variables:{
                email: data.email
            },
            update: (_, { data: { resetPassword: { emailExists, mailStatus } } }) => {

                this.setState({ mailStatus: emailExists && mailStatus });

            }
        })

    }

    updateFormParametersObject = (event) => {

        this.setState({data: { email: event.target.value }});

    }

    formValid = () => {

        const isEmail = Validator.isEmail(this.state.data.email) ? true : false;

        this.setState({ formError: !isEmail});
       
        return isEmail;

    }
    
    mailStatusChanged = () => {

        return this.state.mailStatus !== null 

    }

    render() {

        const { classes } = this.props;

        const { data, mailStatus } = this.state;

        return (
            <Grid container spacing={0} style={{ display: "flex", justifyContent: "center" }}>
            <div className={ classes.mainContent } style={{ marginTop: "10%" }}>
                    
            
            <div className="resetPassword" 
                 style={{ width: "100%"}}>
                
                {/* Snackbar to display mail status notification */}
                <Grid container spacing={0}>
                    { 
                        this.mailStatusChanged()  && 
                        
                        <Grid item xs={12} sm={12} md={12}>

                            <SnackbarContent className={classes.snackbar} 
                                            autoHideDuration={5000}
                                            message={ mailStatus ? "Password recovery mail sent"
                                                                    : `User with email ${data.email} was not found` } 
                                            />

                        </Grid>
                    }
                </Grid>

                <Grid container spacing={0}>

                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        Reset Password
                    </Typography>
                        <Grid container spacing={0}>
                            
                            <Grid item xs={12} sm={12} md={12}>

                                <TextField
                                    id="email"
                                    label="Email"
                                    className={ classes.textField }
                                    value={ data.email }
                                    onChange={ this.updateFormParametersObject }
                                    style={{ display: "flex", justifyContent: "center" }}
                                    margin="normal"
                                    fullWidth
                                    />

                            </Grid>
                            
                            { 
                                this.state.formError && 
                                <Grid item xs={12} sm={12} md={8} >
                                    <span style={{ color: "rgb(230,0,0,0.8)" }}>Invalid email</span>
                                </Grid>
                            }

                            <Grid item xs={12} sm={12} md={12} style={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" color="primary"
                                        className={`sendButton ${classes.button}`}
                                        onClick={ this.doResetPassword }
                                        >
                                    <Icon>send</Icon>&nbsp; &nbsp; Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </Grid>
            </div>
            </div>
        </Grid>
        )

    }

}

export default graphql(ResetPasswordMutation, {name:'resetPassword'})(withStyles(styles)(ResetPassword));