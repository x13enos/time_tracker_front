import createWrapper from '@/test/support/create_wrapper.js';
import form from '@/components/admin/workspaces/form';

describe('errorCallback', () => {

  it('should return function that updates snack', function(){
    const wrapper = createWrapper(form, {}, fakeStoreData());
    const snackStub = sinon.stub(wrapper.vm, "updateSnack");
    const callback = wrapper.vm.errorCallback();
    const errors = { base: ["error-message"] };

    callback(errors);
    expect(snackStub.calledOnceWith({ message: "error-message", color: "red" }));
    sinon.restore();
  });

})
