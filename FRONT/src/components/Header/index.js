import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

import './header.scss';

const Header = () => {

  // creation of hookState for the events who match with the search
  const [eventsFind, setEventsFind] = useState({});
  // method who compare the search whith the events title. 
  const searchEvent = (eventsData, search) => {
    const searchLength = search.length;
    // Reg for select the same length string than the letter search
    if (searchLength !== 0) {
      const limited = new RegExp('\\w{'+searchLength+'}', 'gi');
      eventsData.filter((eventData) => {
        const eventString = eventData[0].title;
        const limitedStringEvents= eventString.match(limited);
        if (limitedStringEvents !== null) {
          limitedStringEvents.forEach((limitedStringEvent) => {
            if (search === limitedStringEvent) {
              console.log(eventsFind)
              const oldEventsFind = eventsFind;
              setEventsFind(
                ...oldEventsFind,
                {
                  key: eventData[0].id,
                  id: eventData[0].id,
                  title: eventData[0].title,
                },
              );
            }
          });
        }
      });
    }
  };
  
  const changeSearchHandler = (evnt) => {
    setEventsFind([]);
    evnt.persist();
    axios.get('http://95.142.174.217/api/events')
      .then((res) => {
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
              <FontAwesomeIcon icon={faSun} /> Yellow Tribe
            </div>
            <div className="ui input">
              <Input placeholder='State' icon="search" search selection onChange={changeSearchHandler} />
              {console.log(eventsFind)}
            </div>
          </div>
          <div className="headerRight">
            <div className="username">
              Barbara Adams
            </div>
            <Button.Group>
              <Button.Or text="" />
              <Button basic color="black" className="groupButton">nom de tribes </Button>
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
