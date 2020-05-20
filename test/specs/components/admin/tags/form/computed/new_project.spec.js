import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/tags/form'

describe('newTag', () => {

  it('should return true if project was not passed in props', () => {
    const propsData = {}
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())

    expect(wrapper.vm.newTag).to.be.true
  });

  it('should return false if project was passed in props', () => {
    const propsData = { tag: { id: 1, name: "test" } }
    const wrapper = createWrapper(form, { propsData }, fakeStoreData())

    expect(wrapper.vm.newTag).to.be.false
  });

});
