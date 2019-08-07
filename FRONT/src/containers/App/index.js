// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import App from 'src/components/App';
// import dataCategories from 'src/components/Data/events.json';

// Action Creators
import { getIdUser } from 'src/store/reducer';

// const categories = dataCategories.map(dataCategory => dataCategory.category);

const mapStateToProps = ({ idOpenEvent }) => ({
  idOpenEvent,
});

const mapDispatchToProps = dispatch => ({
  getIdUser: (id) => {
    dispatch(getIdUser(id));
  }
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
