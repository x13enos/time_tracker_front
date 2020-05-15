import createWrapper from '@/test/support/create_wrapper.js'
import form from '@/components/admin/projects/form'

describe('update', () => {
  const $api = {
    updateProject: () => {}
  }

  const mocks = { $api }
  const successResponse = { data: { name: 'new-test-project', id: 1 } }


  let apiStub;


  beforeEach(() => {
    apiStub = sinon.stub(mocks.$api, 'updateProject').returns(successResponse)
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call formSubmit method and pass callbacks', async () => {
    const wrapper = createWrapper(form, { mocks }, fakeStoreData())
    const successCallbackStub = sinon.stub(wrapper.vm, 'successUpdatedCallback').returns("successCallback")
    const errorCallbackStub = sinon.stub(wrapper.vm, 'errorCallback').withArgs(wrapper.vm.$t("projects.was_not_updated")).returns("errorCallback")
    const formSubmitStub = sinon.stub(wrapper.vm, "$formSubmit")

    await wrapper.vm.update()
    expect(formSubmitStub.calledOnce).to.be.true
    expect(formSubmitStub.args[0][1]).to.eq("successCallback")
    expect(formSubmitStub.args[0][2]).to.eq("errorCallback")
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
});
