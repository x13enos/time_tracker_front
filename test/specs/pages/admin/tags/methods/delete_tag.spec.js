import createWrapper from '@/test/support/create_wrapper.js'
import Tags from '@/pages/admin/tags'

describe('deleteTag', () => {

  const mocks = {
    $api: { 
      deleteTag: () => {},
      allTags: () => ({}) 
    }
  }
  const successResponse = { data: { name: 'new-test-tag', id: 1 } }

  it("should close dialog of deleting tag", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteTag').returns(successResponse)
    const wrapper = createWrapper(Tags, { mocks }, fakeStoreData())
    wrapper.vm.tags = [{ id: 1, name: 'test-tag' }]
    wrapper.vm.deletingTagId = 1
    wrapper.vm.deleteDialog = true

    await wrapper.vm.deleteTag()
    expect(wrapper.vm.deleteDialog).to.be.false

    sinon.restore()
  });

  it("should call api method for deleting tag", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteTag').returns(successResponse)
    const wrapper = createWrapper(Tags, { mocks }, fakeStoreData())
    wrapper.vm.tags = [{ id: 1, name: 'test-tag' }]
    wrapper.vm.deletingTagId = 1

    await wrapper.vm.deleteTag()
    expect(methodStub.calledOnceWith(1)).to.be.true

    sinon.restore()
  });

  it("should remove tag from the list of tags", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteTag').returns(successResponse)
    const wrapper = createWrapper(Tags, { mocks }, fakeStoreData())
    wrapper.vm.tags = [{ id: 1, name: 'test-tag' }]
    wrapper.vm.deletingTagId = 1

    await wrapper.vm.deleteTag()
    expect(wrapper.vm.tags.length).to.eq(0)

    sinon.restore()
  });

  it("should show snack message", async () => {
    const methodStub = sinon.stub(mocks.$api, 'deleteTag').returns(successResponse)
    const wrapper = createWrapper(Tags, { mocks }, fakeStoreData())
    wrapper.vm.tags = [{ id: 1, name: 'test-tag' }]
    wrapper.vm.deletingTagId = 1
    const snackStub = sinon.stub(wrapper.vm, "updateSnack")

    await wrapper.vm.deleteTag()
    expect(snackStub.calledOnceWith({ message: 'tags.was_deleted', color: "green" })).to.be.true

    sinon.restore()
  });

});
