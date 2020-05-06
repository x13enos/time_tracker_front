import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'

describe('newProject', () => {

  it('should return true if project was not passed in props', () => {
    const propsData = {}
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())

    expect(wrapper.vm.newProject).to.be.true
  });

  it('should return false if project was passed in props', () => {
    const propsData = { project: { id: 1, name: "test" } }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())

    expect(wrapper.vm.newProject).to.be.false
  });

});
