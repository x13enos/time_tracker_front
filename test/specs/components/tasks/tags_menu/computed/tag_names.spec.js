import createWrapper from '@/test/support/create_wrapper.js'
import TagsMenu from '@/components/tasks/tags_menu'

describe('tagNames', () => {
  it('should return list of tag names', () => {
    const propsData = {
      tagIds: [1, 3]
    }

    const storeData = fakeStoreData()
    storeData.state.tags = [
      { id: 1, name: "first tag" },
      { id: 2, name: "second tag" },
      { id: 3, name: "third tag" }
    ]
    const wrapper = createWrapper(TagsMenu, { propsData }, storeData)

    expect(wrapper.vm.tagNames).to.eq("first tag, third tag")
  });
});
