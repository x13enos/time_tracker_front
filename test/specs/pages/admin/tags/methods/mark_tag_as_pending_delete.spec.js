import createWrapper from '@/test/support/create_wrapper.js'
import Tags from '@/pages/admin/tags'

describe('markTagAsPendingDelete', () => {

  const mocks = {
    $api: {
      allTags: () => ({})
    }
  }

  it("should keep tag id", () => {
    const wrapper = createWrapper(Tags, { mocks }, fakeStoreData())

    wrapper.vm.markTagAsPendingDelete(1)
    expect(wrapper.vm.deletingTagId).to.eq(1)
  });

  it("should open dialog for approving process of deleting tag", () => {
    const wrapper = createWrapper(Tags, { mocks }, fakeStoreData())
    wrapper.vm.deleteDialog = false

    wrapper.vm.markTagAsPendingDelete(1)
    expect(wrapper.vm.deleteDialog).to.be.true
  });

});
