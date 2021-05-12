import { ON_CHANGE_INPUT, ON_CHANGE_CONSENT, RESET_FORM, SET_NOTIFICATION } from '../constants/form';

const initialState = {
  notification: { open: false, errors: [] },
  name: false,
  email: false,
  consents: [
    { checked: false, name: "newsletter", label: "Receive newsletter" },
    { checked: false, name: "ads", label: "Be shown targeted ads" },
    { checked: false, name: "statistics", label: "Contribute to anonymous visit statistics" }
  ]
};

const actionHandlers = {
  [ON_CHANGE_INPUT]: ({ state, action }) => ({
    ...state,
    [action.event.target.name]: action.event.target.value
  }),
  [ON_CHANGE_CONSENT]: ({ state, action }) => ({
    ...state,
    consents: action.consents
  }),
  [RESET_FORM]: ({ state, action }) => ({
    ...initialState,
    consents: [
      { checked: false, name: "newsletter", label: "Receive newsletter" },
      { checked: false, name: "ads", label: "Be shown targeted ads" },
      { checked: false, name: "statistics", label: "Contribute to anonymous visit statistics" }
    ]
  }),
  [SET_NOTIFICATION]: ({ state, action }) => ({
    ...state,
    notification: action.notification
  })

};

export default (state = initialState, action) =>
  actionHandlers[action.type] ? actionHandlers[action.type]({ state, action }) : state;
