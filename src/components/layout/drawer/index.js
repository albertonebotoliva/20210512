import { h } from 'preact';
import { Link } from 'preact-router/match';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const routes = [
	{ key: "Give Consent", value: "/give-consent" },
	{ key: "Collected Consent", value: "/collected-consent" }
];

const useStyles = makeStyles({
	link: {
		textDecoration: "none",
		color: "black"
	}
});

const Drawer = () => {
	const classes = useStyles();
	return (
		<List>
			{routes.map(route => (
				<Link className={classes.link} activeClassName="active" href={route.value}>
					<ListItem button key={route.key}>
						<ListItemText primary={route.key} />
					</ListItem>
				</Link>
			))}
		</List>
	)
};

Drawer.propTypes = {}
Drawer.defaultProps = {}

export default Drawer;
