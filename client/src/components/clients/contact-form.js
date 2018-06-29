import React,{ Component } from'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const styles = () => (

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
        }

    }

)

class ContactForm extends Component {

    constructor() {
        super();

        this.state = {

            formObject: {
                name: "",
                email: "",
                subject: "",
                message: ""
            }

        }
    }


    updateFormParametersObject = (value, formField) => {

        let newFormFieldValue = {};

/*        switch(formField) {

            case "name":
                newFormFieldValue = { "name": value };
                break;

            case "email":
                    newFormFieldValue = { "email": value };
                break;

            case "subject":
                    newFormFieldValue = { "subject": value };
                break;

            case "message":
                    newFormFieldValue = { "message": value };
                break;


        }*/

        newFormFieldValue = { [formField]: value }

        const { formObject } = this.state;

        this.setState({ formObject: { ...formObject, ...newFormFieldValue } });

        console.log({ ...formObject, ...newFormFieldValue });

    }

    render() {

        const { classes } = this.props;

        return (

               <div className="contactForm">

                <Grid container spacing={8}>

                       {/* Grid holds the first two input fields */}
                       <Grid item xs={12} sm={12} md={12}>

                            <Grid item xs={12} sm={12} md={6}>
                                <input type="text"
                                       className={ classes.fullWidth }
                                       placeholder="Name"
                                       onKeyUp={ event => this.updateFormParametersObject(event.target.value, "name") } />
                            </Grid>


                            <Grid item xs={12} sm={12} md={6}>
                                <input type="text"
                                   className={ classes.fullWidth }
                                   placeholder="Email"
                                   onKeyUp={ event => this.updateFormParametersObject(event.target.value, "email") } />
                            </Grid>

                       </Grid>


                       {/* Grid holds the first two input fields */}
                       <Grid item xs={12} sm={12} md={12}>

                          <input className={ classes.fullWidth }
                                 type="text"
                                 placeholder="subject"
                                 onKeyUp={ event => this.updateFormParametersObject(event.target.value, "subject") } />

                       </Grid>

                       {/* Grid holds the first two input fields */}
                       <Grid item xs={12} sm={12} md={12}>

                               <textarea row="4"
                                         className={ classes.fullWidth }
                                         onKeyUp={ event => this.updateFormParametersObject(event.target.value, "message") }
                                         ></textarea>

                       </Grid>
                </Grid>

               </div>

        )

    }

}

export default withStyles(styles)(ContactForm);