import createWrapper from '@/test/support/create_wrapper.js';
import TagsMenu from '@/components/tasks/inputs/tags_menu';

describe('watched menuOpened', () => {
  const propsData = {
    tagIds: []
  }

  it('should emit method for updating tag ids', async () => {
    const wrapper = createWrapper(TagsMenu, { propsData }, fakeStoreData());
    
    wrapper.vm.selectedTags = [1, 2, 3];
    wrapper.vm.menuOpened = true;
    wrapper.vm.menuOpened = false;

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().update[0][0]).to.eql([1, 2, 3]);
    expect(wrapper.emitted().update.length).to.eq(1);
  });

});
