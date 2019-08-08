import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { BrowserRouter, Link } from 'react-router-dom';


import './header.scss';

const Header = ({ profile }) => {

  const [userProfile, setUserProfile] = useState([]);
  const [tribeProfile, setTribeProfile] = useState([]);
  console.log(userProfile);
  
  useEffect(() => {
    const profilePart = profile.map(profile0 => profile0[0]);
    if (profilePart[0]) {
      setUserProfile(profilePart[0]);
    } 
    if (profilePart[1]) {
      setTribeProfile(profilePart[1]);
    } 
  }, [profile]);
  const Avatar = styled.div`
    background-image: url(${tribeProfile.avatar});
    background-size: cover;
  `;

  return (
    <>
      <header>
        <div className="headerRow">
          <div className="headerLeft">
            <div id="logo">
            </div>
          </div>
          <div className="headerRight">
            <div className="username">
              {userProfile.firstname}
            </div>
            <Button.Group>
              <Avatar className="avatar" />
                <BrowserRouter forceRefresh={true}>
                  <Link to='/profile'>
                    <Button basic color="black" className="groupButton"> <div className="tribeName">{tribeProfile.name}</div></Button>
                  </Link>
                </BrowserRouter>
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
