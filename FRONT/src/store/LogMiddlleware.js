import { FETCH_EVENT_CALENDAR, FETCH_NEWS, getDataEvents, getDataNews, getDataProfile, getDataTags, fetchNews, getIdUser, fetchEventsCalendar, getBirthday, GET_PROFILE, getDataCategories } from 'src/store/reducer';
import axios from 'axios';

const logMiddleware = store => next => (action) => {

  switch (action.type) {
    case FETCH_EVENT_CALENDAR: {
      const storeData = store.getState();
      const userId = storeData.userIdConnected;
      const tribeId = storeData.tribeIdConnected;
      
      axios.get(`http://95.142.174.217/api/${tribeId}/events`)
        .then((response) => {
          const { data } = response;
          store.dispatch(getDataEvents(data));
        })
        .catch();

      axios.get(`http://95.142.174.217/api/${tribeId}/tags`)
        .then((response) => {
          const { data } = response;
          store.dispatch(getDataTags(data));
        })
        .catch();

      axios.get(`http://95.142.174.217/api/${tribeId}/birthdays`)
        .then((response) => {
          const { data } = response;
          store.dispatch(getBirthday(data));
        })
        .catch();

      axios.get(`http://95.142.174.217/api/${tribeId}/${userId}/`)
        .then((response) => {
          const { data } = response;
          store.dispatch(getDataProfile(data));
        })
        .catch();

      axios.get(`http://95.142.174.217/api/categories`)
        .then((response) => {
          const { data } = response;
          store.dispatch(getDataCategories(data));
        })
        .catch();

      break;
    };

    case FETCH_NEWS: {
      const storeData = store.getState();
      const tribeId = storeData.tribeIdConnected;
      axios.get(`http://95.142.174.217/api/${tribeId}/news`)
        .then((response) => {
          const { data } = response;
          const filtedDatas = data.sort((dataN, b) => new Date(b.createdAt) - new Date(dataN.createdAt));
          store.dispatch(getDataNews(filtedDatas));
        })
        .catch();
      break;
    }
    case GET_PROFILE: {
      const userIdR = document.getElementById('root');
      const tribe = userIdR.getAttribute('tribe');
      const user = userIdR.getAttribute('user');
      store.dispatch(getIdUser(tribe, user));
      store.dispatch(fetchEventsCalendar());
      store.dispatch(fetchNews());

      break;
    }

    default:
       next(action);
  }
};

export default logMiddleware;
