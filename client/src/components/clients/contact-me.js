import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { removeWebKit, servicesAlignment } from './global-component-styles/styles.js'
import ContactForm from './contact-form';


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
            ...servicesAlignment,
            color: "#0c2e8a"
        },
        underLine: {
            background: "#50d8af",
            width: "3%",
            height: "3px",
            float: "left",
            border: "1px solid #50d8af",
            ...removeWebKit
        },
        iconStyle: {
            color: "#50d8af",
            fontSize: "48px"
        }

    }

)


class ContactMe extends Component{

    state = {

        contactDetails: {
            phone_no: "",
            email: ""
        }

    }

    componentWillMount = () => {

        this.initializeStateWithProps()

    }

    initializeStateWithProps = () => {

        console.log("contact",this.props);

        const { contactMe } = this.props;

        this.setState({ contactDetails: {
                phone_no: contactMe.phone_no,
                email: contactMe.email
            }  
        })

    }

    render() {

        const { contactDetails } = this.state; // Should be obtained form props

        const { classes } = this.props;

        return (

            <div className="contactMe">

            <div className={ classes.sectionHeader }>
                <h1 className={ classes.removeWebKit }>CONTACT ME</h1>
                <hr className={ classes.underLine } />
            </div>

             <Grid className={ classes.container } container spacing={8} style={{ height: "100%" }}>

                {/* Phone number */}
                <Grid className={ classes.containerChild } item xs={12} sm={6} md={4}>

                    <span>
                        <Icon className={ classes.iconStyle }>phone_in_talk</Icon>
                    </span>

                    <h3 className={ classes.contactDetailsHeader }>Phone</h3>

                    <p>{ contactDetails.phone_no }</p>

                </Grid>


                {/* Email */}
                <Grid className={ classes.containerChild } item xs={12} sm={6} md={4}>

                    <span>
                        <Icon className={ classes.iconStyle }>email</Icon>
                    </span>

                    <h3 className={ classes.contactDetailsHeader }>Email</h3>

                    <p>{ contactDetails.email }</p>

                </Grid>

             </Grid>

             { /* Contact form is displayed here */ }

             <Grid container spacing={0}>

                   <ContactForm />

             </Grid>

            </div>

        )

    }

}

export default withStyles(styles)(ContactMe);