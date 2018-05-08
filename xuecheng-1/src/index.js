import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './Routes';
import {Provider} from 'react-redux';
import store from './Store';

ReactDOM.render(
     <Provider store={store}>
           <Routes/>
     </Provider>,
      document.getElementById('root')
);
registerServiceWorker();
