import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios';

import './header.scss';

const Header = () => {

  const [search, setSearch] = useState('');
  
  const searchEvent = (eventsData) => {
    const searchLength = search.length();
    const firstWord = /^\w+/g;
    const match = eventsData.filter((eventData) => {
      const eventString = eventData[0].title;
      console.log(searchWord);
      const firstWordSearch = searchWord.match(firstWord);
      console.log(firstWordSearch[0]);
      console.log(search);
      if (search === firstWordSearch[0]) {console.log('yes')} else {console.log('no')};
    });
    console.log(match);
  };

  const changeSearchHandler = (evnt) => {
    console.log(evnt.target.value);
    setSearch(evnt.target.value);
    axios.get('http://95.142.174.217/api/events')
      .then((res) => {
        const eventsData = res.data;
        console.log(eventsData);
        searchEvent(eventsData);
      });
  };
  

  return (
    <>
      <header>
        <div className="headerRow">
          <div className="headerLeft">
            <div id="logo">
              Yellow Tribe
            </div>
            <div className="ui input"><Input icon="search" placeholder="Search..." onChange={changeSearchHandler} /></div>
            <div className="iconeNews">
              <FontAwesomeIcon icon={faBell} />
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
