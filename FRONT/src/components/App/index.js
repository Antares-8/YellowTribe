// == Import : npm
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import classNames from 'class-names';


// == Import : local
import PageMain from 'src/containers/PageMain';
import PageEvents from 'src/containers/PageEvents';

import './app.scss';

// == Composant
const App = ({ getIdUser }) => {

  useEffect(() => {
    const userId = document.getElementById('root');
    // getIdUser(userId.className);
    getIdUser('8');
  }, []);

const userName = document.getElementById('root');
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={PageMain} />
        <Route path="/calendar" component={PageMain} />
        <Route path="/news" component={PageMain} />
        <Route path="/event" component={PageEvents} />
      </BrowserRouter>
    </div>
  );
};

App.propTypes = {
  idOpenEvent: PropTypes.number.isRequired,
};

// == Export
export default App;
