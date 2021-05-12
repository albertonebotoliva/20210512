import { Provider } from 'react-redux';
import './style';
import store from "./stores/Root.js";
import App from './components/app';

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);