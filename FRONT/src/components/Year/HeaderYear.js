// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import french from 'date-fns/locale/fr';
import classNames from 'class-names';


// == Import : local


// == Composant
const HeaderYear = ({ prevYear, nextYear, currentDate, activeItem }) => {

  const dateFormat = 'YYYY';

  // call function from reducer to change month on click
  const clickLeftHandler = () => {
    prevYear();
  };
  const clickRightHandler = () => {
    nextYear();
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

HeaderYear.propTypes = {
  currentDate: PropTypes.string.isRequired,
  nextYear: PropTypes.func.isRequired,
  prevYear: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
};

// == Export
export default HeaderYear;
