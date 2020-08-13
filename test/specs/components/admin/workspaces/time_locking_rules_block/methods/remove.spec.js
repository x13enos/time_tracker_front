import createWrapper from '@/test/support/create_wrapper.js'
import RulesBlock from '@/components/admin/workspaces/time_locking_rules_block'

describe('remove', () => {

  const propsData = {
    workspace: {
      id: 1,
      name: "test-workspace",
    },
  }

  const mocks = {
    $api: {
      deleteTimeLockingRule: () => {}
    }
  }

  const successResponse = { data: "rule"  }

  it('should set loading state', () => {
    const methodStub = sinon.stub(mocks.$api, "deleteTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.rules = [{ period: "monthly", id: 33 }]
    wrapper.vm.loading = false

    wrapper.vm.remove('monthly')
    expect(wrapper.vm.loading).to.be.true

    sinon.restore()
  });

  it('should call api for removing rule', () => {
    const methodStub = sinon.stub(mocks.$api, "deleteTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.rules = [{ period: "monthly", id: 33 }]

    wrapper.vm.remove('monthly')
    expect(methodStub.calledOnceWith(33)).to.be.true

    sinon.restore()
  });

  it('should remove rule from rules list', async () => {
    const methodStub = sinon.stub(mocks.$api, "deleteTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.rules = [{ period: "monthly", id: 33 }]

    await wrapper.vm.remove('monthly')
    expect(wrapper.vm.rules).to.eql([])

    sinon.restore()
  });

  it('should drop loading state', async () => {
    const methodStub = sinon.stub(mocks.$api, "deleteTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.rules = [{ period: "monthly", id: 33 }]
    wrapper.vm.loading = true

    await wrapper.vm.remove('monthly')
    expect(wrapper.vm.loading).to.be.false

    sinon.restore()
  });

});
