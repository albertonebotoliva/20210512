import { createStore, combineReducers } from 'redux';
import consentCollection from './consent';
import formCollection from './form';
import tableCollection from './table';


const rootReducer = combineReducers({
    consentCollection,
    formCollection,
    tableCollection
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
