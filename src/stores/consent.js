import { FETCHING_TOGGLE, POST_CONSENT, GET_CONSENT } from '../constants/consent';

const initialState = {
  consents: [],
  fetching: false
};

const actionHandlers = {
  [FETCHING_TOGGLE]: ({ state, action }) => ({
    ...state,
    fetching: action.fetching
  }),
  [GET_CONSENT]: ({ state, action }) => ({
    ...state,
    consents: action.consents
  }),
  [POST_CONSENT]: ({ state, action }) => ({
    ...state,
    consents: [action.consents].concat(state.consents)
  })
};

export default (state = initialState, action) =>
  actionHandlers[action.type] ? actionHandlers[action.type]({ state, action }) : state;
