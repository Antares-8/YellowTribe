// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import MonthYear from 'src/components/Year/MonthsYear';

// Action Creators


const mapStateToProps = ({ currentDate }) => ({
  currentDate,
});


const mapDispatchToProps = dispatch => ({
});

// Container
const MonthYearContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonthYear);

// == Export
export default MonthYearContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonthYear);
*/
