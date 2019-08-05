// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Calendar from 'src/components/Calendar';

// Action Creators
import { nextCalendarType, prevCalendarType, addCategorieInState } from 'src/store/reducer';


const mapStateToProps = ({ calendarType, idOpenEvent }) => ({
  calendarType,
  idOpenEvent,
});


const mapDispatchToProps = dispatch => ({
  nextCalendarType: () => {
    dispatch(nextCalendarType());
  },
  prevCalendarType: () => {
    dispatch(prevCalendarType());
  },
  addCategorieInState: (categories) => {
    dispatch(addCategorieInState(categories));
  }
});

// Container
const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);

// == Export
export default CalendarContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
*/
