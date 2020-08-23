import createWrapper from '@/test/support/create_wrapper.js'
import RulesBlock from '@/components/admin/workspaces/time_locking_rules_block'

describe('create', () => {

  const propsData = {
    workspace: {
      id: 1,
      name: "test-workspace",
    }
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

  it('should add received data to the list of rules', async () => {
    const methodStub = sinon.stub(mocks.$api, "createTimeLockingRule").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.rules = []

    await wrapper.vm.create('weekly')
    expect(wrapper.vm.rules).to.eql(["rule"])

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
