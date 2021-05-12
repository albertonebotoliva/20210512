import { SET_CURRENT_PAGE, SET_START } from '../constants/table';

export const setCurrentPage = async (dispatch, page) => (dispatch({ type: SET_CURRENT_PAGE, page }));
export const setStart = async (dispatch, start) => (dispatch({ type: SET_START, start }));