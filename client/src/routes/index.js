import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ClientIndex from '../components/clients';
import AdminIndex from '../components/admin';
import MailPasswordReset from '../components/admin/mail-password-reset';
import ResetPasswordComponent from '../components/admin/reset-password';


export default () => (

    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={ClientIndex} />
            <Route path="/admin" component={AdminIndex} />
            <Route path="/reset-password" exact component={ ResetPasswordComponent } />
            <Route path="/password-reset/:token" component={MailPasswordReset} />
        </Switch>
    </BrowserRouter>

);