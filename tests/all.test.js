import { h } from 'preact';
import configureStore from 'redux-mock-store';

import Drawer from '../src/components/layout/drawer';
import Content from '../src/components/layout/content';
import Layout from '../src/components/layout';
import { ListItem } from '@material-ui/core';
import { shallow } from 'enzyme';
import { fetchConsent, postConsent } from '../src/actions/consent';
import { onChangeInput, onChangeConsent, resetForm, setNotification } from '../src/actions/form';
import { setCurrentPage, setStart } from '../src/actions/table';
import consentService from '../src/services/consentService';
const mockData = require('../src/services/mockData.json');
const mockStore = configureStore();
const store = mockStore();

describe('Services', () => {
	test('consentService.get ', async () => {
		const data = await consentService.get();
		expect(data).toEqual(mockData);
	});
	test('consentService.post ', async () => {
		const data = await consentService.post({
			name: 'John Smith',
			email: 'john@gmail.com',
			consents: [
				{ checked: false, name: "newsletter", label: "Receive newsletter" },
				{ checked: true, name: "ads", label: "Be shown targeted ads" },
				{ checked: false, name: "statistics", label: "Contribute to anonymous visit statistics" }
			]
		});
		expect(data).toEqual({
			name: 'John Smith',
			email: 'john@gmail.com',
			consents: [
				{ checked: false, name: "newsletter", label: "Receive newsletter" },
				{ checked: true, name: "ads", label: "Be shown targeted ads" },
				{ checked: false, name: "statistics", label: "Contribute to anonymous visit statistics" }
			]
		});
	});
});

describe('Layout', () => {
	test('<Content> Must admit children', () => {
		const wrapper = shallow(
			<Content>
				<div className="unique" />
			</Content>
		);
		expect(wrapper.contains(<div className="unique" />));
	});
	test('<Drawer /> Has 2 elements', () => {
		const wrapper = shallow(<Drawer />);
		expect(wrapper.find(ListItem).length).toBe(2);
	});
	test('<Layout /> ErrorBoundary - If error we display Error', () => {
		const wrapper = shallow(<Layout />);
		const error = new Error('test');
		wrapper.find(Content).simulateError(error);
		expect(wrapper.find('h1').text()).toBe('Error');
	});
});

describe('Actions', () => {
	beforeEach(() => {
		store.clearActions();
	});
	test('fetchConsents', () => {
		const expectedActions = [
			{ type: 'FETCHING_TOGGLE', fetching: true },
			{ type: 'GET_CONSENT', consents: [] },
			{ type: 'FETCHING_TOGGLE', fetching: false }
		];
		fetchConsent(store.dispatch, []);
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('postConsents', () => {
		const expectedActions = [
			{ type: 'FETCHING_TOGGLE', fetching: true },
			{ type: 'POST_CONSENT', consents: [] },
			{ type: 'FETCHING_TOGGLE', fetching: false }
		];
		postConsent(store.dispatch, []);
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('onChangeInput', () => {
		const expectedActions = [{ type: 'ON_CHANGE_INPUT', event: null }];
		onChangeInput(store.dispatch, null);
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('onChangeConsent', () => {
		const expectedActions = [
			{
				type: 'ON_CHANGE_CONSENT', consents: [
					{ checked: false, name: "newsletter", label: "Receive newsletter" },
					{ checked: true, name: "ads", label: "Be shown targeted ads" },
					{ checked: false, name: "statistics", label: "Contribute to anonymous visit statistics" }
				]
			}
		];
		onChangeConsent(store.dispatch, { target: { checked: true, name: 'ads' } }, {
			notification: { open: false, errors: [] },
			name: false,
			email: false,
			consents: [
				{ checked: false, name: "newsletter", label: "Receive newsletter" },
				{ checked: false, name: "ads", label: "Be shown targeted ads" },
				{ checked: false, name: "statistics", label: "Contribute to anonymous visit statistics" }
			]
		});
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('resetForm', () => {
		const expectedActions = [{ type: 'RESET_FORM' }];
		resetForm(store.dispatch, []);
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('setNotification', () => {
		const expectedActions = [
			{ type: 'SET_NOTIFICATION', notification: { open: true, errors: [] } }
		];
		setNotification(store.dispatch, { open: true, errors: [] });
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('setCurrentPage', () => {
		const expectedActions = [{ type: 'SET_CURRENT_PAGE', page: 0 }];
		setCurrentPage(store.dispatch, 0);
		expect(store.getActions()).toEqual(expectedActions);
	});
	test('setStart', () => {
		const expectedActions = [{ type: 'SET_START', start: 0 }];
		setStart(store.dispatch, 0);
		expect(store.getActions()).toEqual(expectedActions);
	});
});
