import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'

describe('updateAttribute', () => {

  it('should set value for passed attribute', () => {
    const wrapper = createWrapper(task, {}, fakeStoreData())
    wrapper.vm.description = null;

    wrapper.vm.updateAttribute('text', 'description');
    expect(wrapper.vm.description).to.eq('text');
    sinon.restore();
  });

})
