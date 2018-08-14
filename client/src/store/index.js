import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionReducer, sessionService } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import projectReducer from '../reducers/projectReducer'

const reducers = {
    // ... your other reducers here ...
    session: sessionReducer,
    project: projectReducer
};

const reducer = combineReducers(reducers);

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)))
 
sessionService.initSessionService(store);

export default store