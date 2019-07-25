import dateFns from 'date-fns';

// == Initial State
const initialState = {
  currentDate: new Date(),
  selectedDate: new Date(),
  eventDate: new Date (2019, 7, 24),
  calendarType: 'mois',
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


// == Selectors


// == Export
export default reducer;
