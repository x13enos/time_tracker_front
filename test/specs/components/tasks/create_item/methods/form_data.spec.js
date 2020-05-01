import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

describe('formData', () => {
  
  const propsData = {
    day: DateTime.local(),
    activeDay: false
  }

  const newData = {
    project: "1",
    description: "test",
    spentTime: 0.5
  }

  it('should return task data', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    wrapper.vm.btnStartFocused = false
    Object.assign(wrapper.vm, newData)
    expect(wrapper.vm.formData()).to.eql(Object.assign(newData, { active: false }))
  });

  it('should return default data', () => {
    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    expect(wrapper.vm.formData()).to.eql({
      active: false,
      description: null,
      spentTime: 0.0,
      project: null
    })
  });

});
