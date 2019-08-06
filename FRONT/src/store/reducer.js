import dateFns from 'date-fns';


// == Initial State
const initialState = {
  currentDate: new Date(),
  selectedDate: new Date(),
  eventDate: new Date(2019, 7, 24),
  calendarType: 'mois',
  modalNewEvent: false,
  idOpenEvent: '',
  categories: [],
  events: [],
  news: [],
};


// == Types
const DATE_CLICK = 'DATE_CLICK';
const NEXT_MONTH = 'NEXT_MONTH';
const PREV_MONTH = 'PREV_MONTH';
const NEXT_CALENDAR_TYPE = 'NEXT_CALENDAR_TYPE';
const PREV_CALENDAR_TYPE = 'PREV_CALENDAR_TYPE';
const NEXT_WEEK = 'NEXT_WEEK';
const PREV_WEEK = 'PREV_WEEK';
const NEXT_YEAR = 'NEXT_YEAR';
const PREV_YEAR = 'PREV_YEAR';
const ADD_EVENT = 'ADD_EVENT';
const ADD_CATEGORY = 'ADD_CATEGORY';
const MODAL_EVENT = 'MODAL_EVENT';
const OPEN_EVENT = 'OPEN_EVENT';
const CLOSE_EVENT = 'CLOSE_EVENT';
const ADD_CATEGORIES_IN_STATE = 'ADD_CATEGORIES_IN_STATE';
export const FETCH_EVENT_CALENDAR = 'FETCH_EVENT_CALENDAR';
const GET_DATA_EVENTS = 'GET_DATA_EVENTS';
export const FETCH_NEWS = 'FETCH_NEWS';
const GET_DATA_NEWS = 'GET_DATA_NEWS';


// == Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DATE_CLICK:
      return {
        ...state,
        selectedDate: action.semaines,
      };

    case NEXT_YEAR:
      return {
        ...state,
        currentDate: dateFns.addYears(state.currentDate, 1),
      };

    case PREV_YEAR:
      return {
        ...state,
        currentDate: dateFns.subYears(state.currentDate, 1),
      };

    case NEXT_MONTH:
      return {
        ...state,
        currentDate: dateFns.addMonths(state.currentDate, 1),
      };

    case PREV_MONTH:
      return {
        ...state,
        currentDate: dateFns.subMonths(state.currentDate, 1),
      };

    case NEXT_CALENDAR_TYPE: {
      if (state.calendarType === 'mois') {
        return {
          ...state,
          calendarType: 'années',
        };
      } if (state.calendarType === 'années') {
        return {
          ...state,
          calendarType: 'semaines',
        };
      }
      return {
        ...state,
        calendarType: 'mois',
      };
    }

    case PREV_CALENDAR_TYPE: {
      if (state.calendarType === 'mois') {
        return {
          ...state,
          calendarType: 'années',
        };
      } if (state.calendarType === 'années') {
        return {
          ...state,
          calendarType: 'semaines',
        };
      }
      return {
        ...state,
        calendarType: 'mois',
      };
    }

    case NEXT_WEEK:
      return {
        ...state,
        currentDate: dateFns.addWeeks(state.currentDate, 1),
      };

    case PREV_WEEK:
      return {
        ...state,
        currentDate: dateFns.subWeeks(state.currentDate, 1),
      };

    case ADD_EVENT:
      return {
        ...state,
        eventDate: action.value,
      };

    case ADD_CATEGORY: {
      const { category } = action;
      return {
        ...state,
        [category]: true,
      };
    }

    case MODAL_EVENT:
      return {
        ...state,
        modalNewEvent: !state.modalNewEvent,
      };

    case OPEN_EVENT:
      return {
        ...state,
        idOpenEvent: action.id,
      };

    case CLOSE_EVENT:
      return {
        ...state,
        idOpenEvent: '',
      };
    case ADD_CATEGORIES_IN_STATE:
      return {
        ...state,
        categories: action.categories,
      };
    case GET_DATA_EVENTS:
      return {
        ...state,
        events: action.data,
      };

    case GET_DATA_NEWS:
      return {
        ...state,
        news: action.data,
      };

    default:
      return state;
  }
};

// == Action Creators
export const onDateClick = semaines => ({
  type: DATE_CLICK,
  semaines,
});
export const nextMonth = () => ({
  type: NEXT_MONTH,
});
export const prevMonth = () => ({
  type: PREV_MONTH,
});
export const nextCalendarType = () => ({
  type: NEXT_CALENDAR_TYPE,
});
export const prevCalendarType = () => ({
  type: PREV_CALENDAR_TYPE,
});
export const nextWeek = () => ({
  type: NEXT_WEEK,
});
export const prevWeek = () => ({
  type: PREV_WEEK,
});
export const nextYear = () => ({
  type: NEXT_YEAR,
});
export const prevYear = () => ({
  type: PREV_YEAR,
});
export const addEventDate = value => ({
  type: ADD_EVENT,
  value,
});
export const addCategory = category => ({
  type: ADD_CATEGORY,
  category,
});
export const showModalNewEvent = () => ({
  type: MODAL_EVENT,
});
export const openEvent = id => ({
  type: OPEN_EVENT,
  id,
});
export const closeEvent = () => ({
  type: CLOSE_EVENT,
});
export const addCategorieInState = categories => ({
  type: ADD_CATEGORIES_IN_STATE,
  categories,
});
export const fetchEventsCalendar = () => ({
  type: FETCH_EVENT_CALENDAR,
});
export const getDataEvents = data => ({
  type: GET_DATA_EVENTS,
  data,
});
export const fetchNews = () => ({
  type: FETCH_NEWS,
});
export const getDataNews = data => ({
  type: GET_DATA_NEWS,
  data,
});

// == Selectors


// == Export
export default reducer;
