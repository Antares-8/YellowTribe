import dateFns from 'date-fns';

// == Initial State
const initialState = {
  currentMonth: new Date(),
  selectedDate: new Date(),
};

// == Types
const DATE_CLICK = 'DATE_CLICK';
const NEXT_MONTH = 'NEXT_MONTH';
const PREV_MONTH = 'NEXT_MONTH';

// == Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DATE_CLICK:
      return {
        ...state,
        selectedDate: action.day,
      };
    case NEXT_MONTH:
      return {
        ...state,
        currentMonth: dateFns.addMonths(state.currentMonth, 1),
      };
    case PREV_MONTH:
      return {
        ...state,
        currentMonth: dateFns.subMonths(state.currentMonth, 1),
      };

    default:
      return state;
  }
};

// == Action Creators
export const onDateClick = day => ({
  type: DATE_CLICK,
  day,
});
export const nextMonth = () => ({
  type: NEXT_MONTH,
});
export const prevMonth = () => ({
  type: PREV_MONTH,
});


// == Selectors


// == Export
export default reducer;
