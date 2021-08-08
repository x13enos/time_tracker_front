import createWrapper from '@/test/support/create_wrapper.js'
import Tags from '@/pages/admin/tags'

describe('mounted', () => {

  const mocks = {
    $api: { allTags: () => ({}) }
  }

  const successResponse = {
    data: [{ name: 'Tag', id: 11 }]
  }

  it("should call endpoint for getting tags", async () => {
    const endpointStub = sinon.stub(mocks.$api, 'allTags').returns(successResponse)
    await createWrapper(Tags, { mocks }, fakeStoreData())

    expect(endpointStub.calledOnce).to.be.true

    sinon.restore()
  });

  it('should keep projects from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "allTags").returns(successResponse)
    const wrapper = await createWrapper(Tags, { mocks }, fakeStoreData())

    expect(wrapper.vm.tags).to.eql([{ name: 'Tag', id: 11 }])

    sinon.restore()
  })

});
