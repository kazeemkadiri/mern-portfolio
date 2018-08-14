import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux'
import store from './store'


import App from './App';
import registerServiceWorker from './registerServiceWorker';

const host = window.location.host

const graphqlServerEndPoint = host.match(/(.\.com)/) ? 
                                `https://${host}/graphql` : 
                                `http://${host.split(':')[0]}:4000/graphql`

const client = new ApolloClient({
    uri: graphqlServerEndPoint
})


ReactDOM.render(   <ApolloProvider client={client}>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </ApolloProvider>, 
                    document.getElementById('root')
                );

registerServiceWorker();
