# mobx-connect

<p>&nbsp;</p>
<p align="center">
<img src="http://infernojs.org/img/inferno.png" width="150px">
<font size="20">&nbsp; + &nbsp;</font>
<img src="https://raw.githubusercontent.com/mobxjs/mobx/master/docs/mobx.png" width="150px">
<font size="20">&nbsp; + </font>
<img src="https://camo.githubusercontent.com/d18a06dffe0778d6be8b91f4e0cd5a18d5287063/687474703a2f2f7777772e6e6967656c736d6974682e636f2f696d616765732f72656163746a732e706e67" width="150px">
</p>
<p>&nbsp;</p>

Super lightweight (2 kb uncompressed) [MobX](https://github.com/mobxjs/mobx) `@connect` decorator for react/inferno components.
Similar to `@connect` from react-redux.

## Installation

    npm install --save mobx-connect

You also **need to have** either `mobx-react` or `mobx-inferno` installed 
since we don't bundle the dependencies with this package.

    npm install --save mobx-react
    
or
    
    npm install --save mobx-inferno
    
**You can't have both.**

## How it works

By decorating your react/inferno component with `@connect` 2 things happen:

+ Your components becomes observable (so no need to define @observable, since @connect does it for you).
+ Your state and the store actions are inject into `this.context`.


## Usage example (React.JS)

```javascript
import React from 'react'
import { connect } from 'mobx-connect'

@connect
class App extends React.Component {

    toggleSetting(key) {
        const { settings} = this.context.state
        settings[key] = !settings[key]
    }

    render() {
        const { settings } = this.context.state

        return <div>
            <SettingsView/>
            <button onClick={() => this.toggleSetting('fullscreen')}>
                Turn {settings.fullscreen ? 'OFF' : 'ON'}
            </button>
            <button onClick={() => this.toggleSetting('logger')}>
                Turn {settings.logger ? 'OFF' : 'ON'}
            </button>
        </div>
    }
}

const SettingsView = connect(function(props, context) {
    const { settings } = context.state

    return <div>
        <h1>Settings</h1>
        <p>Fullscreen: {settings.fullscreen ? 'OFF' : 'ON'}</p>
        <p>Logger: {settings.fullscreen ? 'OFF' : 'ON'}</p>
    </div>
})
```


## Usage example (inferno.JS)

```javascript
import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'mobx-connect/inferno' // <----

@connect
class App extends Component {
    // Everything else same as with React...
}
```

## Configuration

Ccreate a file called `ContextProvider.js`.
We need to wrap our root component (`App` in this case) around this `ContextProvider` before rendering.

```javascript
const React = require('react')
const { contextTypes } = require('mobx-connect')

class ContextProvider extends React.Component {
    getChildContext() {
        return this.props.context;
    }
    render() {
        return this.props.children;
    }
}

ContextProvider.childContextTypes = contextTypes;
```

Then we define our default state and our store methods which affect the state.

```javascript
const { observable } = require('mobx')

const context = {
    // An observable mobx object
    state: observable({
        username: ''
    }),
    store: {
        // Your methods that affect the state here
        // You can make this object deeper for more complicated structures
        // or import from another file
        setUsername(username) {
            context.state.username = username;
        }
    }
}
```

Finally we inject context into our app and render HTML on the browser

```javascript
ReactDOM.render(<ContextProvider context={context}>
    <App/>
</ContextProvider>, document.getElementById('content'));
```



## Usage with React-router

```javascript
const React = require('react')
const ReactDOM = require('react-dom')
const { observable } = require('mobx')
const { Router, RouterContext, browserHistory } = require('react-router')
const ContextProvider = require('./ContextProvider') // or where ever you put it
const routes = require('./routes') // or where ever you put it

const context = {
    state: observable({}),
    store: {}
}

function createElement(props) {
    return <ContextProvider context={context}>
        <RouterContext {...props} />
    </ContextProvider>
}

// Render HTML on the browser
ReactDOM.render(<Router history={browserHistory}
               render={createElement}
               routes={routes}/>,
document.getElementById('container'))
```

## Usage with Inferno-router

```javascript
import Inferno from 'inferno'
import Component from 'inferno-component'
import InfernoDOM from 'inferno-dom'
import { observable } from 'mobx'
import ContextProvider from './ContextProvider'
import routes from './routes'

const context = {
    state: observable({}),
    store: {}
}
// Render HTML on the browser
InfernoDOM.render(<ContextProvider context={context}>
    {routes}
</ContextProvider>,
document.getElementById('root'))

ReactDOM.render(<Router history={browserHistory}
               render={createElement}
               routes={routes}/>,
document.getElementById('container'))
```

# Author

    https://github.com/nightwolfz
