// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import SearchBar from 'src/components/Header/SearchBar';
// import dataCategories from 'src/components/Data/events.json';

// Action Creators
import {  } from 'src/store/reducer';

// const categories = dataCategories.map(dataCategory => dataCategory.category);

const mapStateToProps = ({ profile, events }) => ({
  profile,
  events,
});


const mapDispatchToProps = dispatch => ({

});

// Container
const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);

// == Export
export default SearchBarContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
*/
