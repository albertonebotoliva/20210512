import { useEffect } from 'preact/hooks';

import { useSelector, useDispatch } from 'react-redux';
import { fetchConsent } from '../../actions/consent';
import { setCurrentPage, setStart } from '../../actions/table';
import consentService from '../../services/consentService';

import {
	Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
	Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';

const useStyles = makeStyles({});

const CollectedConsents = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const consentCollection = useSelector(state => state.consentCollection);
	const tableCollection = useSelector(state => state.tableCollection);

	const handleChangePage = (event, page) => {
		setCurrentPage(dispatch, page);
		setStart(dispatch, page * tableCollection.rowsPerPage);
	}

	useEffect(async () => {
		//NOTE: Load the data from the API
		if (consentCollection.consents.length === 0) {
			const consents = await consentService.get();
			fetchConsent(dispatch, consents);
		}
	}, []);

	return (
		<Layout>
			<div>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Consent given for</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								consentCollection.consents
									.slice(tableCollection.start, tableCollection.start + tableCollection.rowsPerPage)
									.map(row => (
										<TableRow key={row.name}>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell>{row.email}</TableCell>
											<TableCell>{
												row.consents
													.filter(item => item.checked === true)
													.map(item => item.label)
													.join(', ')}
											</TableCell>
										</TableRow>
									))
							}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[]}
					component="div"
					count={consentCollection.consents.length}
					rowsPerPage={tableCollection.rowsPerPage}
					page={tableCollection.currentPage}
					onChangePage={handleChangePage}
				/>
			</div>
		</Layout>
	)
};

CollectedConsents.propTypes = {};

CollectedConsents.defaultProps = {};

export default CollectedConsents;