import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('fetchTimeLockingRules', () => {
  const mocks = {
    $api: {
      allUsers: () => { return { data: "" } },
      allWorkspaces: () => { return { data: "" } },
      allTimeLockingRules: () => {}
    },
    $config: {
      extensionEnabled: true
    }
  }

  const successResponse = {
    data: [{ period: "weekly", id: 11 }]
  }

  it("should call api method for fetching rules", async () => {
    const methodStub = sinon.stub(mocks.$api, 'allTimeLockingRules').returns(successResponse)
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())

    await wrapper.vm.fetchTimeLockingRules()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep rules from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "allTimeLockingRules").returns(successResponse)
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())

    await wrapper.vm.fetchTimeLockingRules()
    expect(wrapper.vm.timeLockingRules).to.eql([{ period: "weekly", id: 11 }])

    sinon.restore()
  })

});
