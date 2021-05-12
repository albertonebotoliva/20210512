import { SET_CURRENT_PAGE, SET_START } from '../constants/table';

const initialState = {
  currentPage: 0,
  rowsPerPage: 2,
  start: 0
};

const actionHandlers = {
  [SET_CURRENT_PAGE]: ({ state, action }) => ({
    ...state,
    currentPage: action.page
  }),
  [SET_START]: ({ state, action }) => ({
    ...state,
    start: action.start
  })
};

export default (state = initialState, action) =>
  actionHandlers[action.type] ? actionHandlers[action.type]({ state, action }) : state;
