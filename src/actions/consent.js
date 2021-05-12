import consentService from '../services/consentService';
import { FETCHING_TOGGLE, GET_CONSENT, POST_CONSENT } from '../constants/consent';

const fetchingStart = dispatch => dispatch({ type: FETCHING_TOGGLE, fetching: true });
const fetchingEnd = dispatch => dispatch({ type: FETCHING_TOGGLE, fetching: false });
export const fetchConsent = (dispatch, consents) => {
    fetchingStart(dispatch);
    dispatch({ type: GET_CONSENT, consents });
    return fetchingEnd(dispatch);
}
export const postConsent = (dispatch, consents) => {
    fetchingStart(dispatch);
    dispatch({ type: POST_CONSENT, consents });
    return fetchingEnd(dispatch);
}