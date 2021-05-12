import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        width: 'auto',
        padding: 20
    }
}));

const CheckBox = ({ items, legend, handleChange }) => {
    const classes = useStyles();
    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup>
                {items && items.map(item =>
                    <FormControlLabel
                        control={<Checkbox checked={item.checked} onChange={handleChange} name={item.name} />}
                        label={item.label}
                    />
                )}
            </FormGroup>
        </FormControl>
    )
};

CheckBox.propTypes = {
    items: PropTypes.array,
    legend: PropTypes.string,
    handleChange: PropTypes.func,
};

CheckBox.defaultProps = {
    items: [],
    legend: "I agree to:",
    handleChange: () => { }
};

export default CheckBox;
