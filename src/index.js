import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import RouterCombiner from './router';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './css/main.less';

const store = configureStore();
const Root = () => (
  <Provider store={store}>
    <RouterCombiner/>
  </Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
window.location.origin.match(/http/i) && registerServiceWorker();
