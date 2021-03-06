import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('stateClass', () => {
  it('should return class for active state if task was launched', () => {
    const propsData = {
      task: { timeStart: 'now', tagIds: []  },
      activeDay: false,
      dayIsBlocked: false
    }

    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    expect(wrapper.vm.stateClass).to.eq("amber lighten-3")
  });

  it('should return row class if task is not active', () => {
    const propsData = {
      task: { timeStart: "", tagIds: [] },
      activeDay: false,
      dayIsBlocked: false
    }

    const wrapper = createWrapper(task, { propsData }, fakeStoreData())
    wrapper.vm.rowClass = "test"
    expect(wrapper.vm.stateClass).to.eq("test")
  });

});
