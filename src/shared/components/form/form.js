import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 120
    },
    textFieldB: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    menu: {
        width: 200
    },
    button: {
        width: 100,
        margin: theme.spacing.unit,
        fontSize: 16
    },
    buttonDiv: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

const currencies = [
    {
        value: 'USD',
        label: '$'
    },
    {
        value: 'EUR',
        label: '€'
    },
    {
        value: 'BTC',
        label: '฿'
    },
    {
        value: 'JPY',
        label: '¥'
    }
];

@inject('VehicleStore')
@observer
class Form extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR'
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        const { clickedVehicle } = this.props.VehicleStore;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="provide"
                    label="Provider"
                    className={classes.textField}
                    defaultValue={clickedVehicle.provider}
                    onChange={this.handleChange('provider')}
                    margin="normal"
                />
                <TextField
                    id="status"
                    label="Status"
                    className={classes.textField}
                    defaultValue={clickedVehicle.status}
                    onChange={this.handleChange('status')}
                    margin="normal"
                />
                <TextField
                    id="model"
                    label="Model"
                    className={classes.textField}
                    defaultValue={clickedVehicle.details.model}
                    onChange={this.handleChange('model')}
                    margin="normal"
                />
                <TextField
                    required
                    id="color"
                    label="Color"
                    className={classes.textField}
                    defaultValue={clickedVehicle.details.color}
                    onChange={this.handleChange('color')}
                    margin="normal"
                />
                <TextField
                    id="engine"
                    label="Engine"
                    className={classes.textField}
                    defaultValue={clickedVehicle.details.engine}
                    onChange={this.handleChange('engine')}
                    margin="normal"
                />
                <TextField
                    id="brand"
                    label="Brand"
                    className={classes.textField}
                    defaultValue={clickedVehicle.details.brand}
                    onChange={this.handleChange('brand')}
                    margin="normal"
                />
                <TextField
                    id="licensePlate"
                    label="License plate"
                    className={classes.textField}
                    defaultValue={clickedVehicle.details.licensePlate}
                    onChange={this.handleChange('licensePlate')}
                    margin="normal"
                />
                <TextField
                    id="transmission"
                    label="Transmission"
                    className={classes.textField}
                    defaultValue={clickedVehicle.details.transmission}
                    onChange={this.handleChange('transmision')}
                    margin="normal"
                />
                <TextField
                    id="damages"
                    label="Damages"
                    className={classes.textField}
                    defaultValue={
                        clickedVehicle.condition.damages.length > 0 ? (
                            clickedVehicle.condition.damages.length
                        ) : (
                            'No damages'
                        )
                    }
                    onChange={this.handleChange('damages')}
                    margin="normal"
                />
                <TextField
                    id="createdAt"
                    label="Created at"
                    className={classes.textField}
                    defaultValue={clickedVehicle.createdAt.substring(0, 10)}
                    onChange={this.handleChange('createdAt')}
                    margin="normal"
                />
                <TextField
                    id="pricing-ride"
                    label="Pricing Ride"
                    className={classes.textField}
                    defaultValue={`${clickedVehicle.pricing[0]
                        .amount} ${currencies[1].label}/min`}
                    onChange={this.handleChange('pricing-ride')}
                    margin="normal"
                />
                <TextField
                    id="pricing-stopover"
                    label="Pricing Stopover"
                    className={classes.textField}
                    defaultValue={`${clickedVehicle.pricing[1]
                        .amount} ${currencies[1].label}/min`}
                    onChange={this.handleChange('pricing-stopover')}
                    margin="normal"
                />
                <TextField
                    id="fuel-level"
                    label="Fuel level"
                    className={classes.textField}
                    defaultValue={clickedVehicle.condition.fuelLevel}
                    onChange={this.handleChange('fuel-level')}
                    margin="normal"
                />
                <TextField
                    id="inner"
                    label="Inner"
                    className={classes.textField}
                    defaultValue={clickedVehicle.condition.inner}
                    onChange={this.handleChange('inner')}
                    margin="normal"
                />
                <TextField
                    id="outer"
                    label="Outer"
                    className={classes.textField}
                    defaultValue={clickedVehicle.condition.outer}
                    onChange={this.handleChange('outer')}
                    margin="normal"
                />
                <TextField
                    id="pricing-ride-formatted"
                    label="Formatted Ride"
                    className={classes.textFieldB}
                    defaultValue={clickedVehicle.pricing[0].formatted}
                    onChange={this.handleChange('pricing-ride-formatted')}
                    margin="normal"
                />
                <TextField
                    id="pricing-stopover-formatted"
                    label="Formatted Stopover"
                    className={classes.textFieldB}
                    defaultValue={clickedVehicle.pricing[1].formatted}
                    onChange={this.handleChange('pricing-stopover-formatted')}
                    margin="normal"
                />
                <TextField
                    id="vin"
                    label="Vin"
                    className={classes.textFieldB}
                    defaultValue={clickedVehicle.details.vin}
                    margin="normal"
                />
                <TextField
                    id="address"
                    label="Address"
                    className={classes.textFieldB}
                    value={clickedVehicle.address}
                    margin="normal"
                />
                <div className={classes.buttonDiv}>
                    <Button
                        onClick={() => this.props.handleClose()}
                        variant="contained"
                        size="small"
                        color="primary"
                        className={classes.button}
                    >
                        Save
                    </Button>
                </div>
            </form>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
