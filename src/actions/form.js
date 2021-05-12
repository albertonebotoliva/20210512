import { ON_CHANGE_INPUT, ON_CHANGE_CONSENT, RESET_FORM, SET_NOTIFICATION } from '../constants/form';

export const onChangeInput = async (dispatch, event) => (dispatch({ type: ON_CHANGE_INPUT, event }));
export const onChangeConsent = async (dispatch, event, state) => {
    const item = state.consents.find(consent => consent.name === event.target.name);
    item.checked = event.target.checked;
    const consents = state.consents;
    return dispatch({ type: ON_CHANGE_CONSENT, consents })
};
export const resetForm = async (dispatch) => (dispatch({ type: RESET_FORM }));
export const setNotification = async (dispatch, notification) => (dispatch({ type: SET_NOTIFICATION, notification }));