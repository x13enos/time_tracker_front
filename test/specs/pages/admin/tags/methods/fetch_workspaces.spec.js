import createWrapper from '@/test/support/create_wrapper.js'
import Tags from '@/pages/admin/tags'

describe('fetchTags', () => {
  const mocks = {
    $api: {
      allTags: () => {}
    }
  }

  const successResponse = {
    data: [{ name: 'Tag', id: 11 }]
  }

  it("should call api method for fetching tags", async () => {
    const methodStub = sinon.stub(mocks.$api, 'allTags').returns(successResponse)
    const wrapper = createWrapper(Tags, { mocks }, fakeStoreData())

    await wrapper.vm.fetchTags()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep projects from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "allTags").returns(successResponse)
    const wrapper = createWrapper(Tags, { mocks }, fakeStoreData())

    await wrapper.vm.fetchTags()
    expect(wrapper.vm.tags).to.eql([{ name: 'Tag', id: 11 }])

    sinon.restore()
  })

});
