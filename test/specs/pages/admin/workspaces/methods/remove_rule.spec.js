import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('removeRule', () => {
  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {},
    fetchTimeLockingRules: () => {}
  }

  it("should find and remove rule's data from the list", () => {
    const wrapper = createWrapper(Workspaces, { methods }, fakeStoreData())
    wrapper.vm.timeLockingRules = [{ period: "weekly", id: 1 }]

    wrapper.vm.removeRule(1)
    expect(wrapper.vm.timeLockingRules).to.eql([])
  });
});