import { route } from 'preact-router'
import { useEffect } from 'preact/hooks';

import { useSelector, useDispatch } from 'react-redux';
import { postConsent, fetchConsent } from '../../actions/consent';
import consentService from '../../services/consentService';
import { onChangeInput, onChangeConsent, resetForm, setNotification } from '../../actions/form';

import { Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Notification from '../../components/layout/notification';
import CheckBox from '../../components/layout/checkbox';
import Layout from '../../components/layout';

import { validation } from './../../utils/validation';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > * > *': {
			margin: theme.spacing(1)
		},
	}
}));

const GiveConsent = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const consentCollection = useSelector(state => state.consentCollection);
	const formCollection = useSelector(state => state.formCollection);
	const disabled = !formCollection.consents.some(item => item.checked === true);

	useEffect(async () => {
		//NOTE: Load the data from the API
		if (consentCollection.consents.length === 0) {
			const consents = await consentService.get();
			fetchConsent(dispatch, consents);
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (disabled) return false;

		const errors = validation(event, formCollection);
		if (errors.length > 0)
			return setNotification(dispatch, { open: true, error: true, message: errors[0] });

		const consents = await consentService.post(formCollection);
		postConsent(dispatch, consents);

		resetForm(dispatch);

		return route('/collected-consent', true);
	}

	return (
		<Layout>
			{/* NOTE: We can use Formik or similars. */}
			<form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
				<Notification notification={formCollection.notification} setNotification={(data) => setNotification(dispatch, data)} />
				<Grid item xs={12}>
					{/* //NOTE: Generalize */}
					<TextField onChange={(event) => onChangeInput(dispatch, event)} name="name" id="name" label="Name" variant="outlined" type="text" required />
					<TextField onChange={(event) => onChangeInput(dispatch, event)} name="email" id="email" label="Email Address" variant="outlined" type="email" required />
				</Grid>
				<Grid item xs={12}>
					<CheckBox legend={"I agree to:"} items={formCollection.consents} handleChange={(event) => onChangeConsent(dispatch, event, formCollection)} />
				</Grid>
				<Grid item xs={12}>
					{!formCollection.notification.open &&
						(
							<Button disabled={disabled} type="submit" variant="contained" color="primary">
								Give Consent
							</Button>
						)
					}
				</Grid>
			</form>
		</Layout >
	)
};

GiveConsent.propTypes = {};

GiveConsent.defaultProps = {};

export default GiveConsent;
