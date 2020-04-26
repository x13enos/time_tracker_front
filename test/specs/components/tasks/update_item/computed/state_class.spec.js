import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'
import GlobalMethods from '@/services/global_methods'

describe('stateClass', () => {

  const $appMethods = { isEmpty: (value) => { return GlobalMethods.isEmpty(value) } }

  const propsData = {
    task: { timeStart: 'now' },
    activeDay: false
  }

  it('should return class for active state if task was launched', () => {
    const propsData = {
      task: { timeStart: 'now' },
      activeDay: false
    }

    const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
    expect(wrapper.vm.stateClass).to.eq("amber lighten-3")
  });

  it('should return row class if task is not active', () => {
    const propsData = {
      task: { timeStart: "" },
      activeDay: false
    }

    const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
    wrapper.vm.rowClass = "test"
    expect(wrapper.vm.stateClass).to.eq("test")
  });

});
