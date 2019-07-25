// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';


// == Import : local
import Calendar from 'src/containers/Calendar';
import './app.scss';

// == Composant
const App = ({ addEventDate, eventDate }) => {
  const clickHandler = (evt) => {
    evt.preventDefault();
    console.log(eventDate);
    const { value } = evt.target;
    console.log('value :', evt.target.value);
    addEventDate(value);
  }
  console.log(eventDate);
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
      <div className="sidebar">
        <form>
          <input type="date" name="start" />
          <input type="date" name="end" />
          <button type="submit" onClick={clickHandler} >submit</button>
        </form>
      </div>
      <main>
        <Calendar />
      </main>
    </div>
  );
};

App.propTypes = {
  addEventDate: PropTypes.func.isRequired,
  eventDate: PropTypes.string.isRequired,
};

// == Export
export default App;
