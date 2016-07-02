const sinon = require('sinon')
const { expect } = require('chai')
const { observable } = require('mobx')
const { render, shallow } = require('enzyme')
const { createElement: h } = require('react')
const { ContextProvider, ParentComponent, ChildComponent } = require('./fixtures/components')

describe('<Foo />', () => {

    const context = {
        state: observable({
            toggle: false
        }),
        store: {
            handleToggle: (bool) => context.state.toggle = bool
        }
    }

    it('ParentComponent should be observable', (done) => {
        const {unrendered} = shallow(h(ParentComponent, { title: 'unique' }));
        expect(unrendered.type.contextTypes).to.be.object;
        expect(unrendered.type.contextTypes.state).to.be.function;
        expect(unrendered.type.contextTypes.store).to.be.function;
        expect(unrendered.type.isMobXReactObserver).to.equal(true);
        done()
    })

    it('ChildComponent should be observable', (done) => {
        const {unrendered} = shallow(h(ChildComponent));
        expect(unrendered.type.contextTypes).to.be.object;
        expect(unrendered.type.contextTypes.state).to.be.function;
        expect(unrendered.type.contextTypes.store).to.be.function;
        expect(unrendered.type.isMobXReactObserver).to.equal(true);
        done()
    })

    it.skip('updates observable state', (done) => {
        // Work in progress...
        done()
        //const handleClick = sinon.spy()
        /*const wrapper = render(
            h(ContextProvider, { context },
                h(ParentComponent, {
                    title: 'unique'
                })
            )
        );
        console.log('1. ', wrapper.text())

        context.store.handleToggle(true)

        setTimeout(() => {
            console.log('2. ', wrapper.text())
            expect(ParentComponent.prototype.componentDidMount.calledOnce).to.be.true;
            ParentComponent.prototype.componentDidMount.restore();
            done()
        }, 1000)*/
        //expect(wrapper.text()).to.contain('unique');
        //expect(wrapper.prototype.componentDidMount.calledOnce).to.equal(true);
    });

});
