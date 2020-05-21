import createWrapper from '@/test/support/create_wrapper.js'
import Tags from '@/pages/admin/tags'

describe('updateTagData', () => {

  const methods = {
    fetchTags: () => {}
  }
  const tagData = { name: "new-test-tag", id: 1  }

  it("should replace tag's data in the list of tags", async () => {
    const wrapper = createWrapper(Tags, { methods }, fakeStoreData())
    wrapper.vm.tags = [{ id: 1, name: 'test-workspace' }]

    await wrapper.vm.updateTagData(1, tagData)
    expect(wrapper.vm.tags[0]).to.eql({ id: 1, name: "new-test-tag" })

  });

});
