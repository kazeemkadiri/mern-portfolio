import React,{ Component } from'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import { justify_align_center } from './global-component-styles/styles'

import Validator from 'validator'

const styles = (theme) => (

    {
        justifyAlignCenter: justify_align_center,
        container: {
            display: "flex",
            position: "relative",
            justifyContent: "center"
        },
        containerChild: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        contactDetailsHeader: {
            color: "#999"
        },
        sectionHeader: {
            color: "#0c2e8a"
        },
        fullWidth: {
            width: "100%"
        },
        sendButton: {
            background: "#0c2e8a"
        },
        button: {
            margin: theme.spacing.unit,
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,
        },
        formContainer:{
            justifyContent: "center"
        }
    }

)

class ContactForm extends Component {

    state = {

        formObject: {
            name: "",
            email: "",
            subject: "",
            message: ""
        },
        errors: false,
        sendingMail: false

    }

    componentWillReceiveProps(nextProps) {

        this.checkMailStatusChanged(nextProps)

    }

    checkMailStatusChanged = props => {

        if(props.mailStatus !== undefined)
        this.displaySendingIcon(false)

    }

    updateFormParametersObject = (value, formField) => {

        const { formObject } = this.state;

        this.setState({ formObject: { ...formObject, [formField]: value  } });

    }

    onSubmit = (event = null) => {

        const errors = this.validateFormData();

        this.setState({
            errors: errors
        })

        if( Object.keys(errors).length > 0 )
            return

        this.displaySendingIcon(true)

        this.props.onSubmit(this.state.formObject);

    }

    displaySendingIcon = displayed => {

        this.setState({
            sendingMail : displayed
        })

    }

    validateFormData = () => {

        let errors = {};

        const { formObject } = this.state;

        if(!Validator.isEmail(formObject.email)) errors.email = "Invalid email";

        if(!formObject.name) errors.name = "Name field is required";

        if(!formObject.subject) errors.subject = "Subject field is required";

        if(!formObject.message) errors.message = "Message field is required";

        return errors;

    }

    render() {

        const { classes, mailStatus } = this.props;

        const { formObject: { subject, name, email, message }, errors, sendingMail }= this.state;

        return (

               <div className="contactForm" style={{ width: "100%" }}>

                <Grid container spacing={0} className={ classes.formContainer } >

                       {/* Grid holds the first two input fields */}
                       <Grid item xs={12} sm={12} md={8}>

                            <Grid container spacing={0} style={{ justifyContent: "space-between" }}>
                                <Grid item xs={12} sm={12} md={12} 
                                      className={ 
                                          classes.justifyAlignCenter 
                                          }>
                                {  
                                    ( (mailStatus !== undefined) && mailStatus ? 
                                        <strong style={{ color: (mailStatus ? '#50d8af': 'orangered') }}>
                                           {
                                                (mailStatus === true ) ?  
                                                'Mail sent' : 'Errors encountered' 
                                            }
                                        </strong> : 
                                        ''
                                    )
                                }

                                {
                                    sendingMail ? 
                                    (
                                        <React.Fragment>
                                            <NotificationsActiveIcon /> 
                                            <span style={{ color: 'orange' }}>Sending </span>
                                        </React.Fragment>   
                                    ) : ''
                                }
                                </Grid>

                                <Grid item xs={12} sm={12} md={5}>
                                    <TextField
                                          id="name"
                                          label="Name"
                                          className={ classes.textField }
                                          style={{ width: "100%" }}
                                          value={ name }
                                          onChange={ event => this.updateFormParametersObject(event.target.value, "name") }
                                          margin="normal"
                                        />
                                        { 
                                            errors.hasOwnProperty('name') && 
                                            <span style={{ color: '#f36e62', marginLeft: "0.5rem" }}>
                                                { errors.name }
                                            </span> 
                                        }
                                </Grid>


                                <Grid item xs={12} sm={12} md={5}>
                                    <TextField
                                          id="email"
                                          label="Email"
                                          className={ classes.textField }
                                          style={{ width: "100%" }}
                                          value={ email }
                                          onChange={ event => this.updateFormParametersObject(event.target.value, "email") }
                                          margin="normal"
                                        />
                                        { 
                                            errors.hasOwnProperty('email') && 
                                            <span style={{ color: '#f36e62', marginLeft: "0.5rem" }}>
                                                { errors.email }
                                            </span> 
                                        }
                                </Grid>
                            </Grid>

                       </Grid>


                       {/* Grid holds the first two input fields */}
                       <Grid item xs={12} sm={12} md={8}>
                          <TextField
                                id="subject"
                                label="Subject"
                                className={ classes.textField }
                                style={{ width: "100%" }}
                                value={ subject }
                                onChange={ event => this.updateFormParametersObject(event.target.value, "subject") }
                                margin="normal"
                              />
                                { 
                                    errors.hasOwnProperty('subject') && 
                                    <span style={{ color: '#f36e62', marginLeft: "0.5rem" }}>
                                        { errors.subject }
                                    </span> 
                                }

                       </Grid>

                       {/* Grid holds the first two input fields */}
                       <Grid item xs={12} sm={12} md={8}>
                               <TextField
                                    id="multiline-static"
                                    label="Message"
                                    multiline
                                    rows="4"
                                    defaultValue={ message }
                                    className={classes.textField}
                                    style={{ width: "100%" }}
                                    onChange={ event => this.updateFormParametersObject(event.target.value, "message") }
                                    margin="normal"
                                    />
                                { 
                                    errors.hasOwnProperty('message') && 
                                    <span style={{ color: '#f36e62', marginLeft: "0.5rem" }}>
                                        { errors.message }
                                    </span> 
                                }

                       </Grid>

                       <Grid item xs={12} sm={12} md={12} style={{ justifyContent: "center", display: "flex" }}>

                           <Button variant="contained" 
                                   color="primary" 
                                   className={`sendButton ${classes.button}`}
                                   onClick={ this.onSubmit }>
                                <Icon>send</Icon>&nbsp; &nbsp; Send
                           </Button>

                       </Grid>
                </Grid>

               </div>

        )

    }

}

export default withStyles(styles)(ContactForm);