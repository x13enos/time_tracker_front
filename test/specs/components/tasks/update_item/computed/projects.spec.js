import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

describe('projects', () => {

  it('should return list of projects from store', () => {
    const propsData = {
      task: { timeStart: 'now' },
      activeDay: false
    }
    const store = fakeStoreData()
    store.state.projects = [1,2,3]
    const wrapper = createWrapper(task, { propsData }, store)
    expect(wrapper.vm.projects).to.eql([1,2,3])
  });

});
