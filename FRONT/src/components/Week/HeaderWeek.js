// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import french from 'date-fns/locale/fr';
import classNames from 'class-names';


// == Import : local


// == Composant
const HeaderWeek = ({ prevWeek, nextWeek, currentDate, activeItem }) => {

  const dateFormat = 'MMMM YYYY';

  // call function from reducer to change Week on click
  const clickLeftHandler = () => {
    prevWeek();
  };
  const clickRightHandler = () => {
    nextWeek();
  };
  const newsPartHidden = classNames({
    hidden: activeItem === 'news',
  });

  return (
    <div className={`header row flex-middle ${newsPartHidden}`}>
      <div className="col col-start">
        <div className="icon" onClick={clickLeftHandler}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>{dateFns.format(currentDate, dateFormat, { locale: french })}</span>
      </div>
      <div className="col col-end" onClick={clickRightHandler}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
};

HeaderWeek.propTypes = {
  currentDate: PropTypes.string.isRequired,
  nextWeek: PropTypes.func.isRequired,
  prevWeek: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
};

// == Export
export default HeaderWeek;
