import PropTypes from 'prop-types';
import { SnackbarContent, Snackbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    error: {
        '& > div': {
            backgroundColor: 'darkred'
        }
    }
}));

const Notification = ({ notification, setNotification }) => {
    const classes = useStyles();

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={notification.open}
            onClose={() => { setNotification({ open: false, errors: [] }) }}
            className={notification.error ? classes.error : ''}
        >
            <SnackbarContent
                message={notification.message}
                action={
                    (<Button onClick={() => { setNotification({ open: false, errors: [] }) }} color="secondary" size="small">
                        close
                    </Button>)
                } />
        </Snackbar>
    )
};

Notification.propTypes = {
    notification: PropTypes.object,
    setNotification: PropTypes.func
};

Notification.defaultProps = {
    notification: {},
    setNotification: () => { }
};

export default Notification;
