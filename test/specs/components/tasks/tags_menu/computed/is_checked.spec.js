import createWrapper from '@/test/support/create_wrapper.js'
import TagsMenu from '@/components/tasks/tags_menu'

describe('isChecked', () => {
  const propsData = {
    tagIds: []
  }

  it('should return true if tag was selected', () => {
    const wrapper = createWrapper(TagsMenu, { propsData }, fakeStoreData())
    wrapper.vm.selectedTags = [1]

    expect(wrapper.vm.isChecked(1)).to.be.true
  });

  it('should return true if tag was selected', () => {
    const wrapper = createWrapper(TagsMenu, { propsData }, fakeStoreData())
    wrapper.vm.selectedTags = []

    expect(wrapper.vm.isChecked(1)).to.be.false
  });


});
