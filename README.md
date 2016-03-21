# mobx-connect

Super simple and lightweight [MobX](https://github.com/mobxjs/mobx) `@connect` decorator for react components.
Similar to `@connect` from react-redux.

**Documentation is still in progress...**

## Idea

By decorating your react component with `@connect`, your component becomes reactive
to any changes that happened to the contextTypes that you inject into your context.

## Installation

    npm install mobx-connect

## Example 1 (custom context)

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'mobx-connect';

@connect('sayHello', 'sayGoodBye')
class App extends React.Component {
    render() {
        const { sayHello, sayGoodBye } = this.context;

        return <div>{sayHello()} and maybe {sayGoodBye()}</div>
    }
}

/**
 * We wrap our root component (App in this case)
 * around a ContextProvider before rendering
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
    sayHello: function() { return 'Hello...'; },
    sayGoodBye: function() { return 'sayGoodBye !'; }
}

// Render HTML on the browser
ReactDOM.render(<ContextProvider context={context}>
    <App/>
</ContextProvider>, document.getElementById('content'));
```



## Example 2 (using defaults)

By default, we get access to the following contextTypes: `state, store, cache, router.`
For most of my projects, this seems enough.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'mobx-connect';

// If connect contains no arguments then
// default arguments are used: state, store, cache, router
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
 */
import React from 'react';
import {contextTypes} from 'mobx-connect';

class ContextProvider extends React.Component {

    // Here we are using default context types
    // See Example 1 for using custom contexts
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
    state: {}, // an observable mobx object
    store: {
        // Your methods here
        setUsername(username) {
            context.state.username = username;
        },
        getUsername() {
            return context.state.username;
        }
    }
}

// Render HTML on the browser
ReactDOM.render(<ContextProvider context={context}>
    <App/>
</ContextProvider>, document.getElementById('content'));
```

# Author

    https://github.com/nightwolfz
