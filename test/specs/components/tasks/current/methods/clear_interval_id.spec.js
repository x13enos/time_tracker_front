import createWrapper from '@/test/support/create_wrapper.js'
import currentTask from '@/components/tasks/current'
import { DateTime } from 'luxon'

const day = DateTime.local();
const propsData = { day, days: [] }

describe('clearIntervalId', () => {

  it('should clean up interval id', () => {
    const wrapper = createWrapper(currentTask, { propsData }, fakeStoreData())
    wrapper.vm.intervalId = 1;

    wrapper.vm.clearIntervalId()
    expect(wrapper.vm.intervalId).to.be.null;
  });

})
