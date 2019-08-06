// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Sidebar from 'src/components/Sidebar';

// Action Creators
import { showModalNewEvent } from 'src/store/reducer';


const mapStateToProps = ({ modalNewEvent, idOpenEvent }) => ({
  modalNewEvent,
  idOpenEvent,
});


const mapDispatchToProps = dispatch => ({
  showModalNewEvent: () => {
    dispatch(showModalNewEvent());
  },
  addCategorieInState: categoriesTable => {
    dispatch(addCategorieInState(categoriesTable));
  },
});

// Container
const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);

// == Export
export default SidebarContainer;

/* = export à la volée
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
*/
