import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionReducer, sessionService } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
    uri: `http://${window.location.host}:4000`
})

const reducers = {
    // ... your other reducers here ...
    session: sessionReducer
};

const reducer = combineReducers(reducers);

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)))
 
sessionService.initSessionService(store);


ReactDOM.render(   <ApolloProvider client={client}>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </ApolloProvider>, 
                    document.getElementById('root')
                );

registerServiceWorker();
