// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import HeaderWeek from 'src/components/Week/HeaderWeek';

// Action Creators
import { nextWeek, prevWeek } from 'src/store/reducer';


const mapStateToProps = ({ currentDate }) => ({
  currentDate,
});


const mapDispatchToProps = dispatch => ({
  nextWeek: () => {
    dispatch(nextWeek());
  },
  prevWeek: () => {
    dispatch(prevWeek());
  },
});

// Container
const HeaderWeekContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderWeek);

// == Export
export default HeaderWeekContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderWeek);
*/
