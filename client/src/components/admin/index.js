import React, { Component } from 'react';
import { adminRoutes as AdminRoutes } from './routes';
import Grid from '@material-ui/core/Grid';
import Sidebar from './sidebar';


export default class AdminIndex extends Component{

    render() {

        return (

            <div className="AdminIndex" style={{ width: "100%" }}>

                <Grid container spacing={0}>
                    
                    {/* Sidebar */} 
                    <Grid item xs={12} sm={12} md={3} 
                          style={{ position:"fixed", top:"20%" }}>
                        
                        <Sidebar />

                    </Grid>

                    {/* Main View (Routes) */}
                    <Grid item xs={12} sm={12} md={3}>
                        <AdminRoutes />
                    </Grid>

                </Grid>
            </div>
        )

    }

}