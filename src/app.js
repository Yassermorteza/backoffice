import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { Provider } from 'mobx-react';
import { Shell } from './shell';

import store from './stores/vehicleStore';

import 'babel-polyfill';

export class App extends React.Component {
    render() {
        const palette = {
            primary: blue,
            secondary: pink,
            error: red,
            type: 'light'
        };

        const typography = {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        };

        const theme = createMuiTheme({ palette, typography });

        return (
            <MuiThemeProvider theme={theme}>
                <Provider VehicleStore={store}>
                    <Router>
                        <Shell />
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}
