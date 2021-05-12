import { h } from 'preact';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    content: {
        padding: 20,
        textAlign: "center"
    }
});

const Content = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.content}>{children}</div>
    )
};

Content.propTypes = {
    children: PropTypes.object
};

Content.defaultProps = {
    children: {}
};

export default Content;
