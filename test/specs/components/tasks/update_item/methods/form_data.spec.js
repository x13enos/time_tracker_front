import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/update_item'

const taskData = {
  id: 125,
  project: 1,
  description: "test",
  spentTime: 0.5
}

const propsData = { activeDay: false, task: taskData }
const $appMethods = { isEmpty: () => { return true} }

const newData = {
  description: "new text"
}

it('should return task data', () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  Object.assign(wrapper.vm, newData)
  expect(wrapper.vm.formData()).to.eql({
    id: 125,
    project: 1,
    description: "new text",
    spentTime: 0.5
  })
});
