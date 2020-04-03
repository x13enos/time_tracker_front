import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'
import GlobalMethods from '@/services/global_methods'

const $appMethods = { isEmpty: (value) => { return GlobalMethods.isEmpty(value) } }
const mocks = { $appMethods }

describe('new_project', () => {

  it('should return true if project was not passed in props', () => {
    const propsData = {}
    const wrapper = createWrapper(form, { mocks, propsData }, fakeStoreData())

    expect(wrapper.vm.newProject).to.be.true
  });

  it('should return false if project was passed in props', () => {
    const propsData = { project: { id: 1, name: "test" } }
    const wrapper = createWrapper(form, { mocks, propsData }, fakeStoreData())

    expect(wrapper.vm.newProject).to.be.false
  });
});
