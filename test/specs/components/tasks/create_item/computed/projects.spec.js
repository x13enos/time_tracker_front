import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

describe('projects', () => {
  
  it('should return list of projects from store', () => {
    const propsData = { activeDay: true, day: DateTime.local() }
    const store = fakeStoreData()
    store.state.projects = [1,2,3]
    const wrapper = createWrapper(task, { propsData }, store)
    expect(wrapper.vm.projects).to.eql([1,2,3])
  });

});
