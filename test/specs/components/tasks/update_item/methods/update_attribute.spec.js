import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('updateAttribute', () => {
  const propsData = { task: { tagIds: [] }, activeDay: false, dayIsBlocked: false }

  it('should set value for passed attribute', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData());
    wrapper.vm.description = null;

    wrapper.vm.updateAttribute('text', 'description');
    expect(wrapper.vm.description).to.eq('text');
  });

})
