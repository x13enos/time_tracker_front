import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/workspaces'

describe('removeRule', () => {
  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {},
    fetchTimeLockingRules: () => {}
  }

  const mocks = {
    $config: {
      extensionEnabled: true
    }
  }

  it("should find and remove rule's data from the list", () => {
    const wrapper = createWrapper(Workspaces, { mocks, methods }, fakeStoreData())
    wrapper.vm.timeLockingRules = [{ period: "weekly", id: 1 }]

    wrapper.vm.removeRule(1)
    expect(wrapper.vm.timeLockingRules).to.eql([])
  });
});
