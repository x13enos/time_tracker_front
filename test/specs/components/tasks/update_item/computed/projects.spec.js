import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'
import GlobalMethods from '@/services/global_methods'

const $appMethods = { isEmpty: (value) => { return GlobalMethods.isEmpty(value) } }

const propsData = {
  task: { timeStart: 'now' },
  activeDay: false
}

it('should return list of projects from store', () => {
  const store = fakeStoreData()
  store.state.projects = [1,2,3]
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, store)
  expect(wrapper.vm.projects).to.eql([1,2,3])
});
