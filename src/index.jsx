import React from 'react';
import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from "redux-devtools-extension"
import moviesApp from './reducers/reducers';
import { MainView } from './components/main-view/main-view';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];
const root = createRoot(container);
// Tell React to render our app in the root DOM element
root.render(React.createElement(MyFlixApplication));