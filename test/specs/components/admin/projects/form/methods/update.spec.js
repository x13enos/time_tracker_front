import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'

describe('update', () => {
  const $api = {
    updateProject: () => {}
  }

  const mocks = { $api }
  const successResponse = { data: { name: 'new-test-project', id: 1 } }


  context('successful updating', () => {
    let apiStub;

    beforeEach(() => {
      apiStub = sinon.stub(mocks.$api, 'updateProject').returns(successResponse)
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should clean up the errorMessage attribute', () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      wrapper.vm.errorMessage = "error"

      wrapper.vm.update()
      expect(wrapper.vm.errorMessage).to.be.empty
    });

    it('should call the api method', async () => {
      const propsData = { project: { id: 1, name: "test" } }
      const wrapper = createWrapper(form, { mocks, propsData }, fakeStoreData())
      wrapper.setData({ form: {
        name: "test-example",
        regexp_of_grouping: "\ATT-\d+"
      } })

      await wrapper.vm.update()
      expect(apiStub.calledOnceWith(1, {
        name: "test-example",
        regexp_of_grouping: "\ATT-\d+"
      } )).to.be.true
    });

    it('should close the dialog', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      wrapper.vm.dialog = true

      await wrapper.vm.update()
      expect(wrapper.vm.dialog).to.be.false
    });

    it('should emit form data to the parent component', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      wrapper.setData({ form: {
        name: "test-example",
        regexp_of_grouping: "\ATT-\d+"
      } })

      await wrapper.vm.update()

      expect(wrapper.emitted("processData")[0]).to.eql([{ name: 'new-test-project', id: 1 }])
    });

    it('should show snack message', async () => {
      const wrapper = createWrapper(form, { mocks }, fakeStoreData())
      const snackStub = sinon.stub(wrapper.vm, 'updateSnack')
      wrapper.vm.form = { name: "test" }

      await wrapper.vm.update()
      expect(snackStub.calledOnceWith({ message: 'projects.was_updated', color: "green" })).to.be.true
    });

  });

  it('should record message in case of exception was raised', async () => {
    sinon.stub(mocks.$api, "updateProject").rejects("test error")
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.errorMessage = ""


    try{
      await wrapper.vm.update()
    } catch(error) {
      expect(wrapper.vm.errorMessage).to.eq("test error")
      sinon.restore()
    }
  });
});
