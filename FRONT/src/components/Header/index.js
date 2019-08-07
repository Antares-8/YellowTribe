import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Dropdown } from 'semantic-ui-react'
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';

import './header.scss';

const Header = ({ profile }) => {

  return (
    <>
      <header>
        <div className="headerRow">
          <div className="headerLeft">
            <div id="logo">
              Yellow Tribes
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
  profile: PropTypes.array.isRequired,
};

// == Export
export default Header;
