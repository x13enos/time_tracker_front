import createWrapper from '@/test/support/create_wrapper.js'
import RulesBlock from '@/components/admin/workspaces/time_locking_rules_block'
import GlobalMethods from '@/services/global_methods'

describe('remove', () => {

  const propsData = {
    workspace: {
      id: 1,
      name: "test-workspace",
    },

    rules: [{ period: "monthly", id: 33 }]
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
    wrapper.vm.loading = false

    wrapper.vm.remove('monthly')
    expect(wrapper.vm.loading).to.be.true

    sinon.restore()
  });

  it('should call api for removing rule', () => {
    const methodStub = sinon.stub(mocks.$api, "deleteTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())

    wrapper.vm.remove('monthly')
    expect(methodStub.calledOnceWith(33)).to.be.true

    sinon.restore()
  });

  it('should emit rule id', async () => {
    const methodStub = sinon.stub(mocks.$api, "deleteTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())

    await wrapper.vm.remove('monthly')
    expect(wrapper.emitted("removeRule")[0]).to.eql([33])

    sinon.restore()
  });

  it('should drop loading state', async () => {
    const methodStub = sinon.stub(mocks.$api, "deleteTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.loading = true

    await wrapper.vm.remove('monthly')
    expect(wrapper.vm.loading).to.be.false

    sinon.restore()
  });

});
