import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'

describe('errorCallback', () => {

  it('should return function that updates snack', function(){
    const wrapper = createWrapper(form, {}, fakeStoreData())
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")
    const callback = wrapper.vm.errorCallback()
    const message = "error-message"

    callback(message)
    expect(snackStub.calledOnceWith({ message: "error-message", color: "red" }))
    sinon.restore()
  });

})
