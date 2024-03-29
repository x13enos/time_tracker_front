import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/workspaces/form'

describe('successCreatedCallback', () => {
  const $api = {
    createWorkspace: () => {}
  }

  const mocks = { $api }
  const successResponse = { data: { name: 'new-test-workspace', id: 1 } }

  let apiStub;

  beforeEach(() => {
    apiStub = sinon.stub(mocks.$api, 'createWorkspace').returns(successResponse)
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should close the dialog', async () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.dialog = true

    await wrapper.vm.successCreatedCallback()(successResponse.data)
    expect(wrapper.vm.dialog).to.be.false
  });

  it('should emit form data to the parent component', async () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.setData({ form: {
      name: "test-example"
    } })

    await wrapper.vm.successCreatedCallback()(successResponse.data)
    expect(wrapper.emitted("processData")[0]).to.eql([{ name: 'new-test-workspace', id: 1 }])
  });

  it('should clean the form', async () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    wrapper.vm.form = { name: "test" }

    await wrapper.vm.successCreatedCallback()(successResponse.data)
    expect(wrapper.vm.form).to.eql({ name: "" })
  });

  it('should call the mutation for adding new workspace to the user info', async () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData());
    const mutationStub = sinon.stub(wrapper.vm, 'addWorkspaceToUserInfo');

    await wrapper.vm.successCreatedCallback()(successResponse.data)
    expect(mutationStub.calledOnceWith(successResponse.data)).to.be.true;
  });

  it('should show snack message', async () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    const snackStub = sinon.stub(wrapper.vm, 'updateSnack')
    wrapper.vm.form = { name: "test" }

    await wrapper.vm.successCreatedCallback()(successResponse.data)
    expect(snackStub.calledOnceWith({ message: 'workspaces.was_created', color: "green" })).to.be.true
  });
})