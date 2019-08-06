import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import './header.scss';

const Header = () => {

  // creation of hookState for the events who match with the search
  const [eventsFind, setEventsFind] = useState([]);
  // method who compare the search whith the events title. 
  const searchEvent = (eventsData, search) => {
    const searchLength = search.length;
    // Reg for select the same length string than the letter search
    if (searchLength !== 0) {
      const limited = new RegExp(search, 'gi');
      console.log(eventsData);
      setEventsFind(
        eventsData
          .filter(eventData => {
            console.log(eventData[0].title.match(limited));
            return eventData[0].title.match(limited)
          })
          .map(eventData => ({
            key: eventData[0].id,
            id: eventData[0].id,
            title: eventData[0].title,
          })),
      );
    }
  };
  console.log('out :', eventsFind);

  const set = () => setEventsFind([]);

  const changeSearchHandler = (evnt) => {
    evnt.persist();
    axios.get('http://95.142.174.217/api/events')
      .then((res) => {
        set();
        const eventsData = res.data;
        searchEvent(eventsData, evnt.target.value);
      });
  };

  // eventsFind.forEach(eventFind => (<div className="eventFind">{eventFind.title}</div>))
              

  return (
    <>
      <header>
        <div className="headerRow">
          <div className="headerLeft">
            <div id="logo">
              Yellow Tribes
            </div>
            <div className="ui input">
              <Input placeholder='State' icon="search" search selection onChange={changeSearchHandler} />
            </div>
          </div>
          <div className="headerRight">
            <div className="username">
              Barbara Adams
            </div>
            <Button.Group>
              <Button.Or text="" />
              <Button basic color="black" className="groupButton"> <div className="tribeName">nom de tribes</div></Button>
            </Button.Group>
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  
};

// == Export
export default Header;
