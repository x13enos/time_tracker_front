import createWrapper from '@/test/support/create_wrapper.js'
import TagsMenu from '@/components/tasks/tags_menu'

describe('watched menuOpened', () => {
  const propsData = {
    tagIds: []
  }

  it('should emit method for updating tag ids', async () => {
    const wrapper = createWrapper(TagsMenu, { propsData }, fakeStoreData())

    wrapper.vm.menuOpened = true
    wrapper.vm.menuOpened = false

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().change.length).to.eq(1)
  });

});
