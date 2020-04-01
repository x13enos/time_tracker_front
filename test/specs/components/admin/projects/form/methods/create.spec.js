import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'

describe('create', () => {

  it('should close the dialog', () => {
    const wrapper = createWrapper(form, {}, fakeStoreData())
    wrapper.vm.dialog = true

    wrapper.vm.create()
    expect(wrapper.vm.dialog).to.be.false
  });

  it('should emit form data to the parent component', async () => {
    const wrapper = createWrapper(form, {}, fakeStoreData())
    wrapper.setData({ form: { name: "test-example" } })

    await wrapper.vm.create()

    expect(wrapper.emitted("processData")[0]).to.eql([{ name: "test-example" }])
  });

  it('should clean the form', () => {
    const wrapper = createWrapper(form, {}, fakeStoreData())
    wrapper.vm.form = { name: "test" }

    wrapper.vm.create()
    expect(wrapper.vm.form).to.eql({ name: "" })
  });

});

// create(){
//   this.dialog = false
//   this.$emit("processData", this.form)
//   this.form = { name: "" }
// }
