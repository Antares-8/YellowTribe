// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';


// == Import : local
import Calendar from 'src/containers/Calendar';
import Event from 'src/components/Event';
// import News from 'src/components/News';
import Month from 'src/components/Month';
import Header from 'src/components/Header';
import Sidebar from 'src/containers/Sidebar';
import './app.scss';

// == Composant
const App = ({ }) => {
  const [activeItem, setActiveItem] = 
  window.location.pathname === '/calendar' 
  ? useState('calendar')
  : window.location.pathname === '/'
  ? useState('calendar')
  : useState('news')

  const navHandle = evt => setActiveItem({ activeItem: evt.target.name });
  console.log(activeItem);

  return (
    <div className="App">
      <Router>
        <Header />
          <main>
            <nav>
              <Menu tabular>
                <Menu.Item active={activeItem.activeItem === 'calendar' || activeItem === 'calendar'} onClick={navHandle}><Link to="/calendar" name="calendar">calendar</Link></Menu.Item>
                <Menu.Item active={activeItem.activeItem === 'news' || activeItem === 'news'} onClick={navHandle}><Link to="/news" name="news">fil d'actu</Link></Menu.Item>
              </Menu>
            </nav>
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/" component={Calendar} />
            {/* <Route exact path="/news" component={News} /> */}
            <Route exact path="/event/name1" component={Event} />
            <Route exact path="/event" component={Event} />
          </main>
        <Sidebar />
        <Link to="/event">event</Link>
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
