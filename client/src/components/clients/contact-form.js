import React,{ Component } from'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';


const styles = (theme) => (

    {
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
        }

    }



    updateFormParametersObject = (value, formField) => {

        const { formObject } = this.state;

        this.setState({ formObject: { ...formObject, [formField]: value  } });

    }

    render() {

        const { classes } = this.props;

        const { subject, name, email, message } = this.state.formObject;

        return (

               <div className="contactForm" style={{ width: "100%" }}>

                <Grid container spacing={0} className={ classes.formContainer } >

                       {/* Grid holds the first two input fields */}
                       <Grid item xs={12} sm={12} md={8}>

                            <Grid container spacing={0} style={{ justifyContent: "space-between" }}>
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

                       </Grid>

                       <Grid item xs={12} sm={12} md={12} style={{ justifyContent: "center", display: "flex" }}>

                           <Button variant="contained" color="primary" className={`sendButton ${classes.button}`}>
                                <Icon>send</Icon>&nbsp; &nbsp; Send
                           </Button>

                       </Grid>
                </Grid>

               </div>

        )

    }

}

export default withStyles(styles)(ContactForm);