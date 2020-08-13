import createWrapper from '@/test/support/create_wrapper.js'
import RulesBlock from '@/components/admin/workspaces/time_locking_rules_block'

describe('dialog', () => {

  const propsData = {
    workspace: {
      id: 111,
      name: "test-workspace"
    },
  }

  const methods = {
    fetchRules: () => {}
  }

  it('should call method for fetching time locking rules if dialog attribite was changed and it is true', () => {
    const storeData = fakeStoreData()
    const wrapper = createWrapper(RulesBlock, { methods, propsData }, storeData)
    const methodStub = sinon.stub(wrapper.vm, "fetchRules")
    wrapper.vm.dialog = false

    wrapper.vm.dialog = true

    expect(methodStub.called).to.be.true
    sinon.restore()
  });

  it('should not call method for fetching time locking rules if dialog attribite was changed and it is false', () => {
    const storeData = fakeStoreData()
    const wrapper = createWrapper(RulesBlock, { methods, propsData }, storeData)
    wrapper.vm.dialog = true
    const methodStub = sinon.stub(wrapper.vm, "fetchRules")

    wrapper.vm.dialog = false
    expect(methodStub.called).to.be.false

    sinon.restore()
  });
});
