// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';


// == Import : local
import PageMain from 'src/containers/PageMain';
import PageEvents from 'src/containers/PageEvents';

import './app.scss';

// == Composant
const App = ({ getProfile }) => {

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={PageMain} />
        <Route path="/calendar" component={PageMain} />
        <Route path="/news" component={PageMain} />
      </BrowserRouter>
    </div>
  );
};

App.propTypes = {
  getProfile: PropTypes.func.isRequired,
};

// == Export
export default App;
