import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ClientIndex from '../components/clients';

export default () => (

    <BrowserRouter>
        <Switch>
            <Route path="/" component={ClientIndex} />
        </Switch>
    </BrowserRouter>

);