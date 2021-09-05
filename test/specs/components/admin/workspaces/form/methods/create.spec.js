import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/workspaces/form'

describe('create', () => {
  const $api = {
    createWorkspace: () => {}
  }

  const mocks = { $api }
  const successResponse = { data: { name: 'new-test-workspace', id: 1 } }


  context('successful creating', () => {
    let apiStub;


    beforeEach(() => {
      apiStub = sinon.stub(mocks.$api, 'createWorkspace').returns(successResponse)
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should clean up the errorMessage attribute', () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      wrapper.vm.errorMessage = "error"

      wrapper.vm.create()
      expect(wrapper.vm.errorMessage).to.be.empty
    });

    it('should call formSubmit method and pass callbacks', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      const successCallbackStub = sinon.stub(wrapper.vm, 'successCreatedCallback').returns("successCallback")
      const errorCallbackStub = sinon.stub(wrapper.vm, 'errorCallback').returns("errorCallback")
      const formSubmitStub = sinon.stub(wrapper.vm, "$formSubmit")

      await wrapper.vm.create()
      expect(formSubmitStub.calledOnce).to.be.true
      expect(formSubmitStub.args[0][1]).to.eq("successCallback")
      expect(formSubmitStub.args[0][2]).to.eq("errorCallback")
    });
  });
});
