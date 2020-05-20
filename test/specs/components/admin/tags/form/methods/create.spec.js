import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/tags/form'

describe('create', () => {
  const $api = {
    createTag: () => {}
  }

  const mocks = { $api }
  const successResponse = { data: { name: 'new-test-tag', id: 1 } }


  context('successful creating', () => {
    let apiStub;


    beforeEach(() => {
      apiStub = sinon.stub(mocks.$api, 'createTag').returns(successResponse)
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should call formSubmit method and pass callbacks', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      const successCallbackStub = sinon.stub(wrapper.vm, 'successCreatedCallback').returns("successCallback")
      const errorCallbackStub = sinon.stub(wrapper.vm, 'errorCallback').withArgs(wrapper.vm.$t("tags.was_not_created")).returns("errorCallback")
      const formSubmitStub = sinon.stub(wrapper.vm, "$formSubmit")

      await wrapper.vm.create()
      expect(formSubmitStub.calledOnce).to.be.true
      expect(formSubmitStub.args[0][1]).to.eq("successCallback")
      expect(formSubmitStub.args[0][2]).to.eq("errorCallback")
    });


    it('should call the api method', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      wrapper.setData({ form: {
        name: "test-example"
      } })

      await wrapper.vm.create()
      expect(apiStub.calledOnceWith({
        name: "test-example"
      })).to.be.true
    });
  });
});
