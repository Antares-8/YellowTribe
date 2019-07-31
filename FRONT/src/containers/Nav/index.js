// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Nav from 'src/components/Nav';
// import dataCategories from 'src/components/Data/events.json';

// Action Creators
import { nextCalendarType, prevCalendarType } from 'src/store/reducer';

// const categories = dataCategories.map(dataCategory => dataCategory.category);

const mapStateToProps = ({ calendarType }) => ({
  calendarType,
});


const mapDispatchToProps = dispatch => ({
  nextCalendarType: () => {
    dispatch(nextCalendarType());
  },
  prevCalendarType: () => {
    dispatch(prevCalendarType());
  },
});

// Container
const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);

// == Export
export default NavContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
*/
