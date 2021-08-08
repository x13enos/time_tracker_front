import createWrapper from '@/test/support/create_wrapper.js'
import UsersBlock from '@/components/admin/workspaces/users_block'
import GlobalMethods from '@/services/global_methods'

describe('dialog', () => {

  const propsData = {
    workspace: {
      id: 111,
      name: "test-workspace"
    },
  }

  it('should call method for fetching users if dialog attribite was changed and it is true', async () => {
    const storeData = fakeStoreData()
    const wrapper = createWrapper(UsersBlock, { propsData }, storeData)
    const methodStub = sinon.stub(wrapper.vm, "fetchUsersByWorkspace")
    wrapper.vm.dialog = false

    wrapper.vm.dialog = true
    await wrapper.vm.$nextTick();
    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

  it('should not call method for fetching users if dialog attribite was changed and it is false', async () => {
    const storeData = fakeStoreData()
    const wrapper = createWrapper(UsersBlock, { propsData }, storeData)
    wrapper.vm.dialog = true
    const methodStub = sinon.stub(wrapper.vm, "fetchUsersByWorkspace")

    wrapper.vm.dialog = false
    await wrapper.vm.$nextTick();
    expect(methodStub.called).to.be.false

    sinon.restore()
  });
});
