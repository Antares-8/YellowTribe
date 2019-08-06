import { FETCH_EVENT_CALENDAR, FETCH_NEWS, getDataEvents, getDataNews } from 'src/store/reducer';
import axios from 'axios';

const logMiddleware = store => next => (action) => {
  switch (action.type) {
    case FETCH_EVENT_CALENDAR: {
      axios.get('http://95.142.174.217/api/23/events')
        .then((response) => {
          const { data } = response;
          store.dispatch(getDataEvents(data));
        })
        .catch();
      break;
    };

    case FETCH_NEWS: {
      axios.get('http://solenne-mazabraud.vpnuser.oclock.io/api/20/news')
        .then((response) => {
          const { data } = response;
          const filtedDatas = data.sort((dataN, b) => new Date(dataN.createdAt) - new Date(b.createdAt));
          console.log(filtedDatas);
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
