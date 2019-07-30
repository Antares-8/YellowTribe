// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'semantic-ui-react';


// == Import : local
import Calendar from 'src/containers/Calendar';
import './app.scss';

// == Composant
const App = ({ addEventDate, eventDate }) => {
  return (
    <div className="App">
      <Header />
      <Router>
        <main>
          <Link to="/calendar">calendar</Link>
          <Link to="/">return</Link>
          <Route exact path="/calendar" component={Calendar} />
        </main>
      </Router>
      <Sidebar />

    </div>
  );
};

App.propTypes = {
  addEventDate: PropTypes.func.isRequired,
  eventDate: PropTypes.string.isRequired,
};

// == Export
export default App;