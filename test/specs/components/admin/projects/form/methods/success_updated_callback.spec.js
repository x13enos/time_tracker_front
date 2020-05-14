import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'

describe('successUpdatedCallback', () => {

  it('should return function that updates snack', function(){
    const wrapper = createWrapper(form, {}, fakeStoreData())
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")
    const callback = wrapper.vm.successUpdatedCallback()

    callback()
    expect(snackStub.calledOnceWith({ message: wrapper.vm.$t("projects.was_updated_succesfully"), color: "green" }))
    sinon.restore()
  });

  it('should return function that change dialog to false', function(){
    const wrapper = createWrapper(form, {}, fakeStoreData())
    const callback = wrapper.vm.successUpdatedCallback()
    wrapper.vm.dialog = true

    callback()
    expect(wrapper.vm.dialog).to.be.false
    sinon.restore()
  });

  it('should return function that emit passed data', function(){
    const wrapper = createWrapper(form, {}, fakeStoreData())
    const callback = wrapper.vm.successUpdatedCallback()
    const data = { name: 'new-test-project', id: 1 }

    callback(data)
    expect(wrapper.emitted("processData")[0]).to.eql([{ name: 'new-test-project', id: 1 }])
    sinon.restore()
  });

})
