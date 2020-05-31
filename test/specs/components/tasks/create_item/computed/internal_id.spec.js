import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const propsData = { activeDay: true, day: DateTime.local(), dayIsBlocked: false }

describe('internalId', () => {

  it('should be string', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    expect(typeof wrapper.vm.internalId).to.eq("string")
  });

});
