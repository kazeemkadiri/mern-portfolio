import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProjectComponent from '../projects';

export const adminRoutes = () => (


    <BrowserRouter> 
        <Switch>
            <Route path="/admin/projects" component={ ProjectComponent } />
        </Switch>
    </BrowserRouter>

);
    
