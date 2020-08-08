import createWrapper from '@/test/support/create_wrapper.js'
import profile from '@/pages/profile'

describe('fetchWorkspaces', () => {
  const mocks = {
    $api: {
      allWorkspaces: () => {}
    },
    $config: {
      extensionEnabled: false
    }
  }

  const methods = {
    setNotificationValues: () => {}
  }

  it('should call api method for fetching workspaces', async () => {
    const apiStub = sinon.stub(mocks.$api, "allWorkspaces").returns({ data: [] })
    await createWrapper(profile, { mocks, methods }, fakeStoreData())

    expect(apiStub.called).to.be.true
    sinon.restore()
  });

  it('should update list of workspaces', async () => {
    const apiStub = sinon.stub(mocks.$api, "allWorkspaces").returns({ data: [
      { name: "test-workspace", id: 105 }
    ] })
    const wrapper = await createWrapper(profile, { mocks, methods }, fakeStoreData())

    expect(wrapper.vm.workspaceList).to.eql([{ text: "test-workspace", value: 105 }])
    sinon.restore()
  });

});
