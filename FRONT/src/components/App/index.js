// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


// == Import : local
import Calendar from 'src/containers/Calendar';
import Month from 'src/components/Month';
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
  console.log(window.location.origin);
  return (
    <div className="App">
      <header>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>
            react<b>calendar</b>
          </span>
        </div>
      </header>


      ////
      <div className="sidebar">
        <form>
          <input type="date" name="start" />
          <input type="date" name="end" />
          <button type="submit">submit</button>
        </form>
      </div>
      /////

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
