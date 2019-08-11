import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';
import { BrowserRouter, Link } from 'react-router-dom';


import './header.scss';

const SearchBar = ({ events }) => {

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
            <BrowserRouter forceRefresh={true}>
              <Link to={`/calendar/event/${event.id}`}>
                <div className="eventFind">
                  <div className="number">{dateFns.format(new Date(event.beginingDate), formatNumber, { locale: french })}/</div>
                  <div className="month">{dateFns.format(new Date(event.beginingDate), formatMonth, { locale: french })} </div>
                  <div className="title">{event.title}</div>
                </div>
              </Link>
            </BrowserRouter>,
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
        <Input placeholder="Chercher un évènement" icon="search" search onChange={changeSearchHandler} />
      </div>
      <div className="results">
        {eventsFind}
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  events: PropTypes.array.isRequired,
};

// == Export
export default SearchBar
;
