import createWrapper from '@/test/support/create_wrapper.js'
import TagsMenu from '@/components/tasks/inputs/tags_menu'

describe('tagsOptions', () => {
  it('should return list of options for multiple select', () => {
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

    expect(wrapper.vm.tagsOptions).to.eql([
      { value: 1, name: "first tag" },
      { value: 2, name: "second tag" },
      { value: 3, name: "third tag" }
    ])
  });
});
