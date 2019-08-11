// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import News from 'src/components/News';
// import dataCategories from 'src/components/Data/events.json';

// Action Creators
import { fetchNews, closeEvent } from 'src/store/reducer';

// const categories = dataCategories.map(dataCategory => dataCategory.category);

const mapStateToProps = ({ news }) => ({
  news,
});


const mapDispatchToProps = dispatch => ({
  fetchNews: () => {
    dispatch(fetchNews());
  },
  closeEvent: () => {
    dispatch(closeEvent());
  },
});

// Container
const NewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(News);

// == Export
export default NewsContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(News);
*/
