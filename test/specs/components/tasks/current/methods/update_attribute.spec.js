import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'
import { DateTime } from 'luxon'

const day = DateTime.local();
const propsData = { day }

describe('updateAttribute', () => {

  it('should set value for passed attribute', () => {
    const wrapper = createWrapper(currentTask, { propsData }, fakeStoreData());
    wrapper.vm.description = null;

    wrapper.vm.updateAttribute('text', 'description');
    expect(wrapper.vm.description).to.eq('text');
  });

})
