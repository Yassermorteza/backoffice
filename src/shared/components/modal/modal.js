import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import Form from '../form';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4
    }
});

class SimpleModal extends React.Component {
    render() {
        const { classes, open, handleClose } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Car Sharing
                        </Typography>
                        <Typography
                            variant="subheading"
                            id="simple-modal-description"
                        >
                            Car Sharing Co. vehicle details.
                        </Typography>
                        <Form handleClose={handleClose} />
                    </div>
                </Modal>
            </div>
        );
    }
}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
};

export default withStyles(styles)(SimpleModal);
