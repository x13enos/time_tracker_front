import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

describe('defaultData', () => {

  const propsData = {
    day: DateTime.local(),
    activeDay: false
  }

  it('should return default data', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    expect(wrapper.vm.defaultData()).to.eql({
      rowClass: "",
      btnStartFocused: false,
      description: null,
      spentTime: null,
      project: null
    })
  });

});
