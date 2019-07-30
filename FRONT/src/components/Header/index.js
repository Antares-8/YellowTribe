import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, Input } from 'semantic-ui-react';

import './header.scss';

const Header = () => {
  return (
    <>
      <header>
        <div className='headerLeft'>
          <div id="logo">
            Yellow Tribe
          </div>
          <div className="ui input"><Input icon="search" placeholder="Search..." /></div>
          <div className='iconeNews'>
            <FontAwesomeIcon
              icon={faBell} />
          </div>
        </div>
        <div className='headerRight'>
          <div className='username'>
            Barbara Adams
          </div>
          <Button.Group>
            <Button.Or text=''/>
            <Button basic color='black' className="groupButton">nom de tribes </Button>
          </Button.Group>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  
};

// == Export
export default Header;
