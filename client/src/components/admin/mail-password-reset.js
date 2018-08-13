import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import LinkNotFound from './link-not-found';
import Navbar from '../clients/navbar';


const ConfirmPasswordResetTokenMutation = gql`
    mutation($token: String!){
        confirmPasswordResetToken(token: $token){
            userId
        }
    }
`;

const NewPasswordMutation = gql`
    mutation($userId: ID!, $password: String!) {
        newPasswordUpdate(userId: $userId, password: $password){
            updateStatus
        }
    }

` 

const styles = () => ({

    mainContent: {
        marginTop: "10%"
    }

})


class MailPasswordReset extends Component{

    state = {
        data: {
            password: '',
            confirmPassword: ''
        },
        userId: false,
        formError: false,
        updateStatus: false
    }

    
    componentWillMount() {

        this.confirmToken(this.props.match.params.token);

    }

    confirmToken = (token) => {

        this.props.confirmPasswordReset({
            variables: {
                token: token
            },
            update: async (_, {data: { confirmPasswordResetToken }}) => {

                // console.log(confirmPasswordResetToken);

                this.setState({
                    userId: confirmPasswordResetToken.userId
                })

            }
        })

    }

    saveNewPassword = () => {
    
        if( this.state.formError ) return;

        const { data, userId } = this.state;

        this.props.newPasswordUpdate({
            variables:{
                 ...data,
                 userId: userId
            },
            update: (_, { data: { newPasswordUpdate } }) => {

                // console.log(newPasswordUpdate);

                this.setState({ updateStatus: newPasswordUpdate.operationStatus });

            }
        })

    }

    updateFormParametersObject = (event) => {

        this.setState({
            data: { 
                ...this.state.data, 
                [event.target.id]: event.target.value 
            }
        });

        this.confirmPasswordsMatch(event)

    }

    confirmPasswordsMatch = e => {

        const { data } = this.state;

        if( !data.confirmPassword ) return;

        this.setState({ 
            formError: e.target.value !== data.password
        })

    }

    render() {

        if( this.state.userId === false ) return '';

        if( this.state.userId === null ) return <LinkNotFound />            
        
        const { classes } = this.props;

        const { data, updateStatus } = this.state;

        return (
            
            <div className="resetPassword" 
                 style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                <Navbar />

                <div  style={{ marginTop: "10%" }}>
                { 
                    updateStatus  && 
                
                    <SnackbarContent className={classes.snackbar} 
                                    autoHideDuration={5000}
                                    message={ updateStatus ? "Your password has been reset successfully"
                                                            : `Password reset failed` } 
                                    />

                }
                </div>

                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" 
                                style={{ fontSize: "20px" }}>
                        Reset Password
                    </Typography>
                        <Grid container spacing={0}>
                            
                            <Grid item xs={12} sm={12} md={12}>

                                <TextField
                                    id="password"
                                    label="New password"
                                    className={ classes.textField }
                                    value={ data.password }
                                    onChange={ this.updateFormParametersObject }
                                    style={{ display: "flex", justifyContent: "center" }}
                                    margin="normal"
                                    
                                    fullWidth
                                    />

                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>

                                <TextField
                                    id="confirmPassword"
                                    label="Confirm password"
                                    className={ classes.textField }
                                    value={ data.confirmPassword }
                                    onChange={ this.updateFormParametersObject }
                                    style={{ display: "flex", justifyContent: "center" }}
                                    margin="normal"
                                    fullWidth
                                    />

                            </Grid>
                            
                            { 
                                this.state.formError && 
                                <Grid item xs={12} sm={12} md={12} >
                                    <span style={{ color: "rgb(230,0,0,0.8)" }}>Passwords do not match</span>
                                </Grid>
                            }

                            <Grid item xs={12} sm={12} md={12}>
                                <Button variant="contained" color="primary"
                                        className={`sendButton ${classes.button}`}
                                        onClick={ this.saveNewPassword }
                                        disabled={ updateStatus }
                                        style={{ display: "flex", justifyContent: "center" }}>
                                    <Icon>send</Icon>&nbsp; &nbsp; Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )

    }

}

export default compose( graphql(NewPasswordMutation, {name:'newPasswordUpdate'}), graphql(ConfirmPasswordResetTokenMutation, {name:'confirmPasswordReset'}))(withStyles(styles)(MailPasswordReset));