import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';


const styles = () => (

    {


    }

)


class ContactMe extends Component{

    constructor() {

        super();

        this.state = {

            contactDetails: {
                phone_no: "0892345345",
                email: "kasndfas@slfks.com"
            }

        }

    }

    render() {

        const { contactDetails } = this.state; // Should be obtained form props

        return (

            <div className="contactMe">

             <Grid container spacing={8} style={{ height: "100%" }}>

                {/* Phone number  */}
                <Grid item xs={12} sm={6} md={4}>

                    <span> </span>

                    <h3>Phone</h3>

                    <h5>{ contactDetails.phone_no }</h5>

                </Grid>


                {/* Email  */}
                <Grid item xs={12} sm={6} md={4}>

                    <span> </span>

                    <h3>Email</h3>

                    <h5>{ contactDetails.email }</h5>

                </Grid>

             </Grid>

            </div>

        )

    }

}

export default withStyles(styles)(ContactMe);