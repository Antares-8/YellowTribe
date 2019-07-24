// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import HeaderMonth from 'src/components/Month/HeaderMonth';

// Action Creators
import { nextMonth, prevMonth } from 'src/store/reducer';


const mapStateToProps = ({ currentMonth }) => ({
  currentMonth,
});


const mapDispatchToProps = dispatch => ({
  nextMonth: () => {
    dispatch(nextMonth());
  },
  prevMonth: () => {
    dispatch(prevMonth());
  },
});

// Container
const HeaderMonthContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderMonth);

// == Export
export default HeaderMonthContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderMonth);
*/
