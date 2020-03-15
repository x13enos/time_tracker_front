import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'
import { DateTime } from 'luxon'

const propsData = { activeDay: true, day: DateTime.local(), task: {} }
const $appMethods = { isEmpty: () => false }

describe('internalId', () => {
  it('should be string', () => {
    const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
    expect(typeof wrapper.vm.internalId).to.eq("string")
  });
});
