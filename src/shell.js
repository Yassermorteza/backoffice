import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Route, Switch, withRouter } from 'react-router-dom';
import { HomePage } from './features';
import { observer } from 'mobx-react';

// import DevTools from 'mobx-react-devtools';

const styles = theme => ({
    '@global': {
        html: {
            height: '100%',
            boxSizing: 'border-box'
        },
        '*, *:before, *:after': {
            boxSizing: 'inherit'
        },
        body: {
            height: '100%',
            margin: 0,
            background: theme.palette.background.default,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            color: theme.palette.text.primary,

            // Helps fonts on OSX look more consistent with other systems
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',

            // Use momentum-based scrolling on iOS devices
            WebkitOverflowScrolling: 'touch'
        },
        '#root': {
            height: '100%'
        }
    },
    root: {
        height: '100%'
    }
});

@observer
class ShellBase extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                </Switch>
                {/* <DevTools position={{top: 46, left: 25}} /> */}
            </div>
        );
    }
}

export const Shell = withRouter(withStyles(styles)(ShellBase));
