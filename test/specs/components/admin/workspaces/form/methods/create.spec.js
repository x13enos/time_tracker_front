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

    it('should close the dialog', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      wrapper.vm.dialog = true

      await wrapper.vm.create()
      expect(wrapper.vm.dialog).to.be.false
    });

    it('should emit form data to the parent component', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      wrapper.setData({ form: {
        name: "test-example"
      } })

      await wrapper.vm.create()

      expect(wrapper.emitted("processData")[0]).to.eql([{ name: 'new-test-workspace', id: 1 }])
    });

    it('should clean the form', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      wrapper.vm.form = { name: "test" }

      await wrapper.vm.create()
      expect(wrapper.vm.form).to.eql({ name: "" })
    });

    it('should show snack message', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      const snackStub = sinon.stub(wrapper.vm, 'updateSnack')
      wrapper.vm.form = { name: "test" }

      await wrapper.vm.create()
      expect(snackStub.calledOnceWith({ message: 'workspaces.was_created', color: "green" })).to.be.true
    });

  });

  it('should record message in case of exception was raised', async () => {
    sinon.stub(mocks.$api, "createWorkspace").rejects("test error")
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.errorMessage = ""


    try{
      await wrapper.vm.create()
    } catch(error) {
      expect(wrapper.vm.errorMessage).to.eq("test error")
      sinon.restore()
    }
  });
});
