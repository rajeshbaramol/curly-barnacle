import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import middlewares from './middlewares';
import reducers from './reducer';

const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk, ...middlewares)
    ),
);

export default store;