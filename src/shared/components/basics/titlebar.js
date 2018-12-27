// Example: <Titlebar>Home</Titlebar>

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import { inject, observer } from 'mobx-react';

import Menu from '../menu';

const styles = {
    root: {
        flexGrow: 1
    }
};

@inject('VehicleStore')
@observer
class Titlebar extends React.Component {
    render() {
        const { classes, children } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            type="title"
                            color="inherit"
                            className={classes.root}
                        >
                            {children}
                        </Typography>
                        <div className={classes.root} />
                        <Menu {...this.props} />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Titlebar);
