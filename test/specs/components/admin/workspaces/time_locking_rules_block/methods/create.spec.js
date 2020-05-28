import createWrapper from '@/test/support/create_wrapper.js'
import RulesBlock from '@/components/admin/workspaces/time_locking_rules_block'
import GlobalMethods from '@/services/global_methods'

describe('create', () => {

  const propsData = {
    workspace: {
      id: 1,
      name: "test-workspace",
    },

    rules: [{ period: "monthly", id: 33 }]
  }

  const mocks = {
    $api: {
      createTimeLockingRule: () => {}
    }
  }

  const successResponse = { data: "rule"  }

  it('should set loading state', () => {
    const methodStub = sinon.stub(mocks.$api, "createTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.loading = false

    wrapper.vm.create('weekly')
    expect(wrapper.vm.loading).to.be.true

    sinon.restore()
  });

  it('should call api for creating new rule', () => {
    const methodStub = sinon.stub(mocks.$api, "createTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())

    wrapper.vm.create('weekly')
    expect(methodStub.calledOnceWith({ workspace_id: 1, period: "weekly"  })).to.be.true

    sinon.restore()
  });

  it('should emit received data', async () => {
    const methodStub = sinon.stub(mocks.$api, "createTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())

    await wrapper.vm.create('weekly')
    expect(wrapper.emitted("addRule")[0]).to.eql([successResponse.data])

    sinon.restore()
  });

  it('should drop loading state', async () => {
    const methodStub = sinon.stub(mocks.$api, "createTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.loading = true

    await wrapper.vm.create('weekly')
    expect(wrapper.vm.loading).to.be.false

    sinon.restore()
  });

});
