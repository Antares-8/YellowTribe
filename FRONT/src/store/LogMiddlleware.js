import { FETCH_EVENT_CALENDAR, FETCH_NEWS, getDataEvents, getDataNews, getDataProfile, getDataTags, getBirthday } from 'src/store/reducer';
import axios from 'axios';

const logMiddleware = store => next => (action) => {
  const storeData = store.getState();
  const id = storeData.userIdConnected;
  switch (action.type) {
    case FETCH_EVENT_CALENDAR: {
      axios.get(`http://95.142.174.217/api/${id}/events`)
        .then((response) => {
          const { data } = response;
          store.dispatch(getDataEvents(data));
        })
        .catch();
      axios.get(`http://95.142.174.217/api/${id}/tags`)
      .then((response) => {
        const { data } = response;
        store.dispatch(getDataTags(data));
      })
      .catch();
      axios.get(`http://95.142.174.217/api/${id}/tags`)
      .then((response) => {
        const { data } = response;
        store.dispatch(getDataProfile(data));
      })
      .catch();
      axios.get(`http://95.142.174.217/api/${id}/birthdays`)
      .then((response) => {
        const { data } = response;
        store.dispatch(getBirthday(data));
      })
      .catch();
      break;
    };

    case FETCH_NEWS: {
      axios.get(`http://95.142.174.217/api/${id}/news`)
        .then((response) => {
          const { data } = response;
          const filtedDatas = data.sort((dataN, b) => new Date(dataN.createdAt) - new Date(b.createdAt));
          store.dispatch(getDataNews(filtedDatas));
        })
        .catch();
      break;
    }

    default:
       next(action);
  }
};

export default logMiddleware;
