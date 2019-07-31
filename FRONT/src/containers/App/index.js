// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import App from 'src/components/App';
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
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

// == Export
export default AppContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
*/
