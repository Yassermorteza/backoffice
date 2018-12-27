import React, { Component } from 'react';

// import Button from 'material-ui/Button';
// import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';
// import AddIcon from 'material-ui-icons/Add';

import Titlebar from 'shared/components/basics';
import Vtable from 'shared/components/table';
import Map from 'shared/components/map';
import Modal from 'shared/components/modal';

import { observer } from 'mobx-react';

const styles = theme => ({
    root: {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        height: '50%',
        padding: theme.spacing.unit
    },
    demoTitle: {
        margin: '1.5em 0 0.5em 0'
    },
    demoContainer: {
        backgroundColor: theme.palette.background.contentFrame,
        padding: theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit
    },
    input: {
        margin: theme.spacing.unit
    }
});

@observer
class HomePageBase extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <a name="top" />
                <Titlebar>BackOffice</Titlebar>
                <div className={classes.content}>
                    <Map />
                </div>
                <div className={classes.content}>
                    <Vtable handleOpen={this.handleOpen} />
                </div>
                <Modal handleClose={this.handleClose} open={this.state.open} />
                <a href="#top" className="top-btn">
                    &#8657;
                </a>
            </div>
        );
    }
}

export const HomePage = withStyles(styles)(HomePageBase);
