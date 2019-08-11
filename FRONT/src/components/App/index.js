// == Import : npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';


// == Import : local
import PageMain from 'src/containers/PageMain';

import './app.scss';

// == Composant
const App = ({ getProfile, fetchEventsCalendar }) => {

  useEffect(() => {
    getProfile();
    fetchEventsCalendar();
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
  fetchEventsCalendar: PropTypes.func.isRequired,
};

// == Export
export default App;
