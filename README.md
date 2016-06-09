# mobx-connect

Super simple and lightweight [MobX](https://github.com/mobxjs/mobx) `@connect` decorator for react components.
Similar to `@connect` from react-redux.

## Idea

By decorating your react component with `@connect` 2 things happen:

+ Your components becomes observable (@observable is added automatically to the component, so no need to define it).
+ Your state and the store actions you defined become accessible from Reacts' context.
+ Any changes to the state automatically and efficiently update the component.

## Installation

    npm install mobx-connect --save
    
    
    
## Usage example
```js
@connect
class Settings extends React.Component {

    setSetting(key) {
        const { settings} = this.context.state
        settings[key] = !settings[key]
    }

    render() {
        const { settings } = this.context.state

        return <div>
            <p>
                <a onClick={() => this.setSetting('fullscreen')}>
                    Turn {settings.fullscreen ? 'OFF' : 'ON'}
                </a>
            </p>
            <p>
                <a onClick={() => this.setSetting('logger')}>
                    Turn {settings.logger ? 'OFF' : 'ON'}
                </a>
            </p>
        </div>
    }
}
```




## Configuration
First we need to wrap our root component (App in this case)
around a ContextProvider before rendering. You can call this file ContextProvider.js
 
```js
import React from 'react';
import {contextTypes} from 'mobx-connect';

class ContextProvider extends React.Component {
    static childContextTypes = contextTypes;
    
    getChildContext() {
        return this.props.context;
    }
    render() {
        return this.props.children;
    }
}
```

Then we define our default state and our store methods which affect the state.

```js
const context = {
    // An observable mobx object
    state: {
        username: ''
    },
    // Your actions
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
```

Finally we inject context into our app and render HTML on the browser
```js
ReactDOM.render(<ContextProvider context={context}>
    <App/>
</ContextProvider>, document.getElementById('content'));
```



## Another Example (using a custom context)

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

# Author

    https://github.com/nightwolfz
