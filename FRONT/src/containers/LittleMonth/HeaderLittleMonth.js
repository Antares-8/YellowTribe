// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import HeaderLittleMonth from 'src/components/LittleMonth/HeaderLittleMonth';

// Action Creators
import { nextMonth, prevMonth } from 'src/store/reducer';


const mapStateToProps = ({ currentDate }) => ({
  currentDate,
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
const HeaderLittleMonthContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderLittleMonth);

// == Export
export default HeaderLittleMonthContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderLittleMonth);
*/
