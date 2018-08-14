import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import { Redirect } from 'react-router-dom';

import  withStyles  from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({

    topPageStyles:{
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
})

class Login extends React.Component{

    state = {
        data: {
            email: '',
            password: ''
        },
        errors: {
        },
        passwordReset: false
    }

    updateFormParametersObject = e => {

        this.setState({
            data: { ...this.state.data, [e.target.id]: e.target.value}
        })

    }

    onSubmit = () => {

        const errors = this.validateFormData();

        if( Object.keys(errors).length > 0 )
        {
            this.setState({
                errors: errors
            })

            return
        }

        this.props.submit(this.state.data);

    }

    validateFormData = () => {

        let errors = {};

        const { data } = this.state;

        if(!Validator.isEmail(data.email)) errors.email = "Invalid email";

        if(!data.password) errors.password= "Password field is required";

        return errors;
    }

    displayResetPasswordForm = () => {
        this.setState({passwordReset: true});
    }

    render() {

        const { classes } = this.props;

        const { data, errors } = this.state;

        if(this.state.passwordReset){
            return <Redirect to="/reset-password" />
        }

        return (
            <Card style={{ }}>
            <CardContent>
            <Grid   container 
                    spacing={0} 
                    className={ classes.topPageStyles } 
                    styles={{ display: "flex", justifyContent: "center" }} >

                <Grid item xs={12} sm={12} md={8}>
                    <TextField
                        id="email"
                        label="Email"
                        className={ classes.textField }
                        style={{ width: "100%" }}
                        value={ data.email || '' }
                        onChange={ this.updateFormParametersObject }
                        margin="normal"
                        />
                    { 
                        errors.hasOwnProperty('email') && 
                        <span style={{ color: '#f36e62', marginLeft: "0.5rem" }}>
                            { errors.email }
                        </span> 
                    }
                </Grid>

                <Grid item xs={12} sm={12} md={8}>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        className={ classes.textField }
                        style={{ width: "100%"}}
                        value={ data.password || '' }
                        onChange={ this.updateFormParametersObject }
                        margin="normal"
                        />
                        { errors.hasOwnProperty('password') && 
                            <span style={{ color: '#f36e62', marginLeft: "0.5rem" }}>
                                { errors.password }
                            </span>
                        }
                </Grid>

                <Grid item xs={12} sm={12} md={8} style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="primary"
                            className={`sendButton ${classes.button}`}
                            onClick={ this.onSubmit }>
                        <Icon>send</Icon>&nbsp; &nbsp; Login
                    </Button>
                </Grid>

                <Grid item xs={12} sm={12} md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <span onClick={this.displayResetPasswordForm}
                          style={{ color: "red", cursor: "pointer" }}>Forgot password ? </span>
                </Grid>

            </Grid>

            </CardContent>
            </Card>
        )

    }

}

Login.propTypes = {
    submit: PropTypes.func.isRequired
}

export default withStyles(styles)(Login);