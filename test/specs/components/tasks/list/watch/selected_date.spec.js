import createWrapper from '@/test/support/create_wrapper.js';
import List from '@/components/tasks/list';
import { DateTime } from 'luxon'

describe('watched selectedDate', () => {

  const $api = { allTimeRecords: () => { return { data: [] } } }

  it('should set showNewTask value as false', async () => {
    const storeData = fakeStoreData();
    const wrapper = createWrapper(List, {}, fakeStoreData());
    wrapper.vm.showNewTask = true;

    wrapper.vm.$store.state.selectedDate = DateTime.local(2019, 10, 27);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showNewTask).to.be.false;
  });

});
