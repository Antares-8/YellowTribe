import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react'
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';

import './header.scss';

const SearchBar = ({ profile, events }) => {

  // creation of hookState for the events who match with the search
  const [eventsFind, setEventsFind] = useState([]);

  const formatNumber = 'DD';
  const formatMonth = 'MM';

  // method who compare the search whith the events title
  const searchEvent = (search) => {
    const searchLength = search.length;
    // Reg for select the same length string than the letter search
    if (searchLength !== 0) {
      const limited = new RegExp(search, 'gi');
      setEventsFind(
        events
          .filter(event => event.title.match(limited))
          .map(event => ([
            <div className="eventFind">
              <div className="number">{dateFns.format(new Date(event.beginingDate), formatNumber, { locale: french })}/</div>
              <div className="month">{dateFns.format(new Date(event.beginingDate), formatMonth, { locale: french })} </div>
              <div className="title">{event.title}</div>
            </div>,
            <hr/>,
          ])),
      );
    }
  };

  const changeSearchHandler = (evnt) => {
    evnt.persist();
    setEventsFind([]);
    searchEvent(evnt.target.value);
  };

  return (
    <div className="searchBar">
      <div className="ui input">
        <Input placeholder='State' icon="search" search selection onChange={changeSearchHandler} />
      </div>
      <div className="results">
        {eventsFind}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  profile: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
};

// == Export
export default SearchBar
;
