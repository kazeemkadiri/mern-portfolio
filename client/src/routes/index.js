import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ClientIndex from '../components/clients';
import AdminIndex from '../components/admin';


export default () => (

    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={ClientIndex} />
            <Route path="/admin" component={AdminIndex} />
        </Switch>
    </BrowserRouter>

);