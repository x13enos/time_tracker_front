import createWrapper from '@/test/support/create_wrapper.js'
import TagsMenu from '@/components/tasks/tags_menu'

describe('updateTags', () => {
  const propsData = {
    tagIds: []
  }

  it('should emit method for updating tag ids', () => {
    const wrapper = createWrapper(TagsMenu, { propsData }, fakeStoreData())
    wrapper.vm.selectedTags = [1]

    wrapper.vm.updateTags();
    expect(wrapper.emitted("updateTags")[0]).to.eql([[1]])
  });

});
