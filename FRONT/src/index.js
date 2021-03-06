// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// == Import : local
import 'semantic-ui-css/semantic.min.css';
import App from 'src/containers/App';

import store from 'src/store';

// == Render
const rootComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(rootComponent, document.getElementById('root'));
