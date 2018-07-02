import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Navbar from '../clients/navbar';
import Sidebar from './sidebar';
import { Route } from 'react-router-dom';
import ProjectComponent from './projects';
import ViewProjectComponent from './view-project';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = () => ({

    mainContent: {
        marginTop: "10%"
    }

})


class AdminIndex extends Component{

    render() {

        const { classes } = this.props;

        return (

            <div className="AdminIndex" style={{ width: "100%" }}>
                <Navbar />
                <Grid container spacing={0}>
                    
                    {/* Sidebar */} 
                    <Grid item xs={12} sm={12} md={3}>
                        
                        <Sidebar style={{ position:"fixed", top:"20%" }}/>

                    </Grid>

                    {/* Main View (Routes) */}
                    <Grid item xs={12} sm={12} md={9}>
                        <div className={ classes.mainContent } style={{ marginTop: "10%" }}> 
                            <Route path="/admin/projects" exact component={ ProjectComponent } />    
                            <Route path="/admin/projects/add-project" exact component={ ProjectComponent } />
                            <Route path="/admin/projects/view-project" exact component={ ViewProjectComponent } />    
                        </div>
                    </Grid>

                </Grid>
            </div>
        )

    }

}

export default withStyles(styles)(AdminIndex);