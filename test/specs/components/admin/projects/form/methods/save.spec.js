import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'
import GlobalMethods from '@/services/global_methods'

const $appMethods = { isEmpty: (value) => { return GlobalMethods.isEmpty(value) } }
const mocks = { $appMethods }

describe('create', () => {

  it('should close the dialog', () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.dialog = true

    wrapper.vm.save()
    expect(wrapper.vm.dialog).to.be.false
  });

  it('should emit form data to the parent component', async () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.setData({ form: {
      name: "test-example",
      regexp_of_grouping: "\ATT-\d+"
    } })

    await wrapper.vm.save()

    expect(wrapper.emitted("processData")[0]).to.eql([{
      name: "test-example",
      regexp_of_grouping: "\ATT-\d+"
    }])
  });

  it('should clean the form if it is a new project', () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.form = { name: "test" }

    wrapper.vm.save()
    expect(wrapper.vm.form).to.eql({
      name: "",
      regexp_of_grouping: ""
    })
  });

  it('should not clean the form if it is an existed project', () => {
    const propsData = { project: { id: 1, name: 'test-project' } }
    const wrapper = createWrapper(form, { propsData, mocks }, fakeStoreData())
    wrapper.vm.form = {
      name: "test",
      regexp_of_grouping: "\ATT-\d+"
    }

    wrapper.vm.save()
    expect(wrapper.vm.form).to.eql({
      name: "test",
      regexp_of_grouping: "\ATT-\d+"
    })
  });

});
