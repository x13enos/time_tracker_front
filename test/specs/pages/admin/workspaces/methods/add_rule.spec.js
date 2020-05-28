import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/admin/workspaces'

describe('addRule', () => {
  const methods = {
    fetchWorkspaces: () => {},
    fetchUsers: () => {},
    fetchTimeLockingRules: () => {}
  }

  it("should add rule's data to the list", () => {
    const wrapper = createWrapper(Workspaces, { methods }, fakeStoreData())
    wrapper.vm.timeLockingRules = [{ period: "weekly", id: 1 }]

    wrapper.vm.addRule({ period: "monthly", id: 2 })
    expect(wrapper.vm.timeLockingRules).to.eql(
      [
        { period: "weekly", id: 1 },
        { period: "monthly", id: 2 }
      ]
    )
  });
});
