// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';



// == Import : local
import Calendar from 'src/containers/Calendar';
import Month from 'src/components/Month';
import 'semantic-ui-css/semantic.min.css';
import './app.scss';

// == Composant
const App = ({ addEventDate, eventDate }) => {
  // const clickHandler = (evt) => {
  //   evt.preventDefault();
  //   console.log(eventDate);
  //   const { value } = evt.target;
  //   console.log('value :', evt.target.value);
  //   addEventDate(value);
  // }
  return (
    <div className="App">
      <header>
        <div id="logo">
          Yellow Tribe
        </div>
        <div class="ui input"><input type="text" placeholder="Search..." /></div>
      </header>

      <Router>
        <main>
          <Link to="/calendar">calendar</Link>
          <Link to="/">return</Link>
          <Route exact path="/calendar" component={Calendar} />
        </main>
      </Router>

    </div>
  );
};

App.propTypes = {
  addEventDate: PropTypes.func.isRequired,
  eventDate: PropTypes.string.isRequired,
};

// == Export
export default App;
