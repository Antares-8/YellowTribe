// == Import : npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import classNames from 'class-names';


// == Import : local
import PageMain from 'src/containers/PageMain';
import PageEvents from 'src/containers/PageEvents';

import './app.scss';

// == Composant
const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={PageMain} />
        <Route path="/event" component={PageEvents} />
      </Router>
    </div>
  );
};

App.propTypes = {
  idOpenEvent: PropTypes.number.isRequired,
};

// == Export
export default App;
