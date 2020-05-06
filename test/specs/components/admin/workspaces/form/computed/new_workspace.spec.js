import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/workspaces/form'

describe('newWorkspace', () => {

  it('should return true if workspace was not passed in props', () => {
    const propsData = {}
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())

    expect(wrapper.vm.newWorkspace).to.be.true
  });

  it('should return false if workspace was passed in props', () => {
    const propsData = { workspace: { id: 1, name: "test" } }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())

    expect(wrapper.vm.newWorkspace).to.be.false
  });

});
