import React, { Component } from 'react';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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


const sendMailMutation = gql`
    mutation($name: String!, $email: String!, $subject: String!, $message: String!){

        sendMail(name:$name, email:$email, subject:$subject, message:$message){
            status
        }

    }
`

class ContactMe extends Component{

    state = {

        contactDetails: {
            phone_no: "",
            email: ""
        },
        mailStatus: undefined

    }

    componentWillMount = () => {

        this.initializeStateWithProps()

    }

    initializeStateWithProps = () => {

        const { contactMe } = this.props;

        this.setState({ contactDetails: {
                phone_no: contactMe.phone_no,
                email: contactMe.email
            }  
        })

    }

    onSubmit = contactFormObject => {

        this.props.sendMail({
            variables: {
                ...contactFormObject
            },
            update: async (store, { data: { sendMail } }) => {

                console.log(sendMail)
                
                this.setState({
                    mailStatus: sendMail.status
                })

            }
        })

    }

    render() {

        const { contactDetails, mailStatus } = this.state; // Should be obtained form props

        const { classes } = this.props;

        return (

            <div className="contactMe" id="contact">

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

                   <ContactForm onSubmit={this.onSubmit} mailStatus={mailStatus}/>

             </Grid>

            </div>

        )

    }

}

export default graphql( sendMailMutation, { name: "sendMail" })(withStyles(styles)(ContactMe))