const { PropTypes, Component, createElement: h } = require('react')
const { connect } = require('../../src/connect')

// Our context provider
class ContextProvider extends Component {
    getChildContext() {
        return this.props.context;
    }
    render() {
        return this.props.children
    }
}

// Here we are passing methods to @connect
ContextProvider.childContextTypes = {
    state: PropTypes.object,
    store: PropTypes.object
}

// Our components created for testing purposes
class ParentComponent extends Component {
    render() {
        return h('main', this.props,
            [
                h('button', { key: 'button-key' }, this.props.title),
                h(ChildComponent, { key: 'child-key'})
            ]
        );
    }
}

class ChildComponent extends Component {
    render() {
        return h('div', null,
            h('p', null, this.context.state.toggle ? '--ON' : '--OFF')
        );
    }
}

exports.ContextProvider = ContextProvider
exports.ParentComponent = connect(ParentComponent)
exports.ChildComponent = connect(ChildComponent)

