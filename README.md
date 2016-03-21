# Installation

    npm install mobx-connect

# Example 1 (using defaults)

The goal is to provide contextTypes through higher-order components
By default, we get access to the following contextTypes: `state, store, cache, router.`


    import React from 'react';
    import ReactDOM from 'react-dom';
    import {connect} from 'mobx-connect';

    @connect
    class App extends React.Component {
        render() {
            const { state, store } = this.context;

            // store methods available at all times
            store.getUsername()

            // state available at all times
            return <div>{state.username}</div>
        }
    }

    /**
     * But first we need to wrap our root component (App in this case)
     * around a ContextProvider before rendering
     * @returns {Component}
     */
    import React from 'react';
    import {contextTypes} from 'mobx-connect';

    class ContextProvider extends React.Component {

        // Here we are using default context types
        // See Example 2 for using custom contexts
        static childContextTypes = contextTypes;

        getChildContext() {
            return this.props.context;
        }
        render() {
            return this.props.children;
        }
    }

    /**
     * Then we put it all together.
     * Initialize stores & inject state into our context
     */
    const context = {
        state: window.__STATE, // an observable mobx object
        store: {
            // Your methods here
            setUsername(username) {
                window.__STATE.username = username;
            },
            getUsername() {
                return window.__STATE.username;
            }
        }
    }

    // Render HTML on the browser
    ReactDOM.render(<ContextProvider context={context}>
        <App/>
    </ContextProvider>, document.getElementById('content'));


# Example 2 (custom context)

    import React from 'react';
    import ReactDOM from 'react-dom';
    import {connect} from 'mobx-connect';

    @connect('sayHello', 'sayGoodBye')
    class App extends React.Component {
        render() {
            const { sayHello, sayBye } = this.context;

            return <div>{sayHello()} and maybe {sayGoodBye()}</div>
        }
    }

    /**
     * We wrap our root component (App in this case)
     * around a ContextProvider before rendering
     * @returns {Component}
     */
    import React from 'react';

    class ContextProvider extends React.Component {

        // Here we are passing a custom contextType to @connect
        static childContextTypes = {
            sayHello: React.PropTypes.func,
            sayGoodBye: React.PropTypes.func
        };

        getChildContext() {
            return this.props.context;
        }
        render() {
            return this.props.children
        }
    }

    /**
     * Then we put it all together.
     * Initialize stores & inject state into our context
     */
    const context = {
        sayHello: function() { return 'Hello...'; }
        sayGoodBye: function() { return 'sayGoodBye !'; }
    }

    // Render HTML on the browser
    ReactDOM.render(<ContextProvider context={context}>
        <App/>
    </ContextProvider>, document.getElementById('content'));


# Author

    https://github.com/nightwolfz
