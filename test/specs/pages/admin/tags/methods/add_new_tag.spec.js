import createWrapper from '@/test/support/create_wrapper.js'
import Tags from '@/pages/admin/tags'

describe('addNewTag', () => {

  const methods = {
    fetchTags: () => {}
  }

  const tagData = { name: "test-tag" }

  it("should add passed data to the list of tags", () => {
    const wrapper = createWrapper(Tags, { methods }, fakeStoreData())

    wrapper.vm.addNewTag(tagData)
    expect(wrapper.vm.tags[0]).to.eql(tagData)
  });

});
