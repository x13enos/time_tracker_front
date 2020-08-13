import createWrapper from '@/test/support/create_wrapper.js'
import RulesBlock from '@/components/admin/workspaces/time_locking_rules_block'

describe('fetchRules', () => {

  const propsData = {
    workspace: {
      id: 1,
      name: "test-workspace",
    }
  }

  const mocks = {
    $api: {
      getTimeLockingRulesByWorkspace: () => {}
    }
  }

  const successResponse = { data: [{ period: "monthly", id: 33 }]  }


  it('should call api for fetching rules by workspace', async () => {
    const apiStub = sinon.stub(mocks.$api, "getTimeLockingRulesByWorkspace").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())

    await wrapper.vm.fetchRules()
    expect(apiStub.calledOnceWith({ workspace_id: 1 })).to.be.true

    sinon.restore()
  });

  it('should add rules to the list', async () => {
    sinon.stub(mocks.$api, "getTimeLockingRulesByWorkspace").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.rules = []

    await wrapper.vm.fetchRules()
    expect(wrapper.vm.rules).to.eql([{ period: "monthly", id: 33 }])
    sinon.restore()
  });

  it('should set monthlyPeriod as true if monthly rule was found in received data', async () => {
    sinon.stub(mocks.$api, "getTimeLockingRulesByWorkspace").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.rules = []
    wrapper.vm.monthlyPeriod = false

    await wrapper.vm.fetchRules()
    expect(wrapper.vm.monthlyPeriod).to.be.true
    sinon.restore()
  });

  it('should set weeklyPeriod as false if weekly rule was not found in received data', async () => {
    sinon.stub(mocks.$api, "getTimeLockingRulesByWorkspace").returns(successResponse)
    const wrapper = createWrapper(RulesBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.rules = []
    wrapper.vm.weeklyPeriod = true

    await wrapper.vm.fetchRules()
    expect(wrapper.vm.weeklyPeriod).to.be.false
    sinon.restore()
  });
});
