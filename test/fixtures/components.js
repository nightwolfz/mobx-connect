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
        const { props } = this;
        return h('div', props,
            [
                h('h1', { key: '1' }, props.title),
                props.children ? h(props.children, { key: '2'}) : null
            ]
        );
    }
}

function ChildComponent(props, context) {
    return h('p', null, 'Some text here');
}

exports.ContextProvider = ContextProvider
exports.ParentComponent = connect(ParentComponent)
exports.ChildComponent = connect(ChildComponent)

