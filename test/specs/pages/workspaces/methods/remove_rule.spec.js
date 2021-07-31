import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/workspaces'

describe('removeRule', () => {
  const mocks = {
    $config: { extensionEnabled: false },
    $api: { allWorkspaces: () => ({}) }
  }

  it("should find and remove rule's data from the list", () => {
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())
    wrapper.vm.timeLockingRules = [{ period: "weekly", id: 1 }]

    wrapper.vm.removeRule(1)
    expect(wrapper.vm.timeLockingRules).to.eql([])
  });
});
