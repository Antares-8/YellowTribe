// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import HeaderYear from 'src/components/Year/HeaderYear';

// Action Creators
import { nextYear, prevYear } from 'src/store/reducer';


const mapStateToProps = ({ currentDate }) => ({
  currentDate,
});


const mapDispatchToProps = dispatch => ({
  nextYear: () => {
    dispatch(nextYear());
  },
  prevYear: () => {
    dispatch(prevYear());
  },
});

// Container
const HeaderYearContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderYear);

// == Export
export default HeaderYearContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderYear);
*/
