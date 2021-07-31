import createWrapper from '@/test/support/create_wrapper.js'
import RulesBlock from '@/components/admin/workspaces/time_locking_rules_block'

describe('dialog', () => {

  const propsData = {
    workspace: {
      id: 111,
      name: "test-workspace"
    },
  }

  it('should call method for fetching time locking rules if dialog attribite was changed and it is true', async () => {
    const storeData = fakeStoreData()
    const wrapper = createWrapper(RulesBlock, { propsData }, storeData)
    const methodStub = sinon.stub(wrapper.vm, "fetchRules")
    wrapper.vm.dialog = false

    wrapper.vm.dialog = true
    await wrapper.vm.$nextTick();
    expect(methodStub.called).to.be.true
    sinon.restore()
  });

  it('should not call method for fetching time locking rules if dialog attribite was changed and it is false', async () => {
    const storeData = fakeStoreData()
    const wrapper = createWrapper(RulesBlock, { propsData }, storeData)
    wrapper.vm.dialog = true
    const methodStub = sinon.stub(wrapper.vm, "fetchRules")

    wrapper.vm.dialog = false
    await wrapper.vm.$nextTick();
    expect(methodStub.called).to.be.false

    sinon.restore()
  });
});
