import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

describe('toggleBtnStatus', () => {

  const propsData = {
    day: DateTime.local(),
    activeDay: false,
    dayIsBlocked: false
  }

  it('should set the opposite status for start button', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    wrapper.vm.btnStartFocused = false
    wrapper.vm.toggleBtnStatus()
    expect(wrapper.vm.btnStartFocused).to.be.true
  });

});
