import { h } from 'preact';
import PropTypes from 'prop-types';
import { useErrorBoundary } from "preact/hooks";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from './drawer';
import Content from './content';

const useStyles = makeStyles({
    content: {
        background: "white",
        borderLeft: "1px solid #ccc",
        height: "100vh"
    },
    centered: {
        textAlign: "center"
    }
});

const Layout = ({ children }) => {
    const classes = useStyles();
    const [error, resetError] = useErrorBoundary();

    if (error) {
        return (
            <Grid container spacing={0}>
                <Grid className={classes.centered} item xs={12} >
                    <h1>Error</h1>
                    <p>{error.message}</p>
                    <button onClick={resetError}>Try again</button>
                </Grid>
            </Grid >
        );
    } else {
        return (
            <Grid container spacing={0}>
                <Grid item xs={2} >
                    <Drawer />
                </Grid>
                <Grid item xs={10} className={classes.content} >
                    <Content children={children} />
                </Grid>
            </Grid>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.object
};

Layout.defaultProps = {
    children: {}
};

export default Layout;
