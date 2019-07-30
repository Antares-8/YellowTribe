// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import App from 'src/components/App';
import dataCategories from 'src/components/Data/events.json';

// Action Creators
import { addEventDate } from 'src/store/reducer';

const categories = dataCategories.map(dataCategory => dataCategory.category);

const mapStateToProps = ({ eventDate }) => ({
  eventDate,
});


const mapDispatchToProps = dispatch => ({
  addEventDate: (value) => {
    dispatch(addEventDate(value));
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
