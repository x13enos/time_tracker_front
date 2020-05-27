import createWrapper from '@/test/support/create_wrapper.js'
import RulesBlock from '@/components/admin/workspaces/time_locking_rules_block'
import GlobalMethods from '@/services/global_methods'

describe('handlePeriod', () => {

  const propsData = {
    workspace: {
      id: 1,
      name: "test-workspace",
    },

    rules: [{ period: "monthly", id: 33 }]
  }

  it('should call method for creating if value is true', () => {
    const wrapper = createWrapper(RulesBlock, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "create")

    wrapper.vm.handlePeriod(true, 'weekly')
    expect(methodStub.calledOnceWith('weekly')).to.be.true

    sinon.restore()
  });

  it('should call method of removing if valus is false', () => {
    const wrapper = createWrapper(RulesBlock, { propsData }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, "remove")

    wrapper.vm.handlePeriod(false, 'monthly')
    expect(methodStub.calledOnceWith("monthly")).to.be.true

    sinon.restore()
  });
});
