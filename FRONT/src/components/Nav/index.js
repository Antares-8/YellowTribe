// == Import : npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import classNames from 'class-names';


// == Import : local
import HeaderMonth from 'src/containers/Month/HeaderMonth';
import HeaderWeek from 'src/containers/Week/HeaderWeek';
import HeaderYear from 'src/containers/Year/HeaderYear';

// == Composant
const Nav = ({ prevCalendarType, nextCalendarType, calendarType }) => {

  const [activeItem, setActiveItem] =
  window.location.pathname === '/calendar' || window.location.pathname === '/'
  ? useState('calendar')
  : window.location.pathname === '/news'
  ? useState('news')
  : useState('event')

  const navHandle = (evt) => {
    const evtN = evt.target.closest('.link');
    return (
      setActiveItem({ activeItem: evtN.name })
    )};
  

  const clickLeftHandler = () => {
    prevCalendarType();
  };
  const clickRightHandler = () => {
    nextCalendarType();
  };

  const eventPartHidden = classNames({
    hidden: activeItem === 'event',
  });
  const newsPartHidden = classNames({
    hidden: activeItem === 'news',
  });


  return (
    <>
      <div className={`navigation ${eventPartHidden}`}>
        <nav>
          <Menu tabular>
            <Link to="/calendar" name="calendar" className="link" onClick={navHandle}><Menu.Item active={activeItem.activeItem === 'calendar' || activeItem === 'calendar'}>calendrier</Menu.Item></Link>
            <Link to="/news" name="news" className="link" onClick={navHandle}><Menu.Item active={activeItem.activeItem === 'news' || activeItem === 'news'}>fil d'actu</Menu.Item></Link>
          </Menu>
        </nav>
        {/* // calendar type choices //  */}
          <div className={`type row flex-middle ${newsPartHidden}`}>
            <div className="col col-start">
              <div className="icon" onClick={clickLeftHandler}>
                chevron_left
              </div>
            </div>
            <div className="col col-center">
              <span>{calendarType}</span>
            </div>
            <div className="col col-end" onClick={clickRightHandler}>
              <div className="icon">chevron_right</div>
            </div>
          </div>
        {calendarType === 'mois' && <HeaderMonth activeItem={activeItem} />}
        {calendarType === 'semaines' && <HeaderWeek activeItem={activeItem} />}
        {calendarType === 'années' && <HeaderYear activeItem={activeItem} />}
            
        {/* <Route exact path="/news" component={News} /> */}
      </div>
    </>
  );
};

Nav.propTypes = {
  nextCalendarType: PropTypes.func.isRequired,
  prevCalendarType: PropTypes.func.isRequired,
  calendarType: PropTypes.string.isRequired,
};

// == Export
export default Nav;
