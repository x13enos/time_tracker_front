import createWrapper from '@/test/support/create_wrapper.js';
import TagsMenu from '@/components/tasks/inputs/tags_menu';
import { expect } from 'chai';

describe('watched tagIds', () => {
  const propsData = {
    tagIds: [1,2,3]
  }

  it('should emit method for updating tag ids', async () => {
    const wrapper = createWrapper(TagsMenu, { propsData }, fakeStoreData());

    wrapper.setProps({ tagIds: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedTags).to.be.empty;
  });

});
